import {BaseErrorResponse} from 'src/Models/Login';
import {
  GetMyOrderDetailsRequest,
  GetMyOrderDetailsResponse,
  GetMyOrderStatusRequest,
  GetMyOrderStatusResponse,
  GetMyOrderSummaryRequest,
  GetMyOrderSummaryResponse,
  MyOrderDetails,
  MyOrderStatusHistoryInfo,
  MyOrderSummary,
} from 'src/Models/MyOrder';
import {ActionPayload, BaseAction, BaseResponse} from 'src/Models/ReduxModels';

export const GET_MY_ORDER_DETAILS = 'GET_MY_ORDER_DETAILS';
export const GET_MY_ORDER_DETAILS_SUCCESS = 'GET_MY_ORDER_DETAILS_SUCCESS';
export const GET_MY_ORDER_DETAILS_FAILURE = 'GET_MY_ORDER_DETAILS_FAILURE';

export const GET_MY_ORDER_STATUS = 'GET_MY_ORDER_STATUS';
export const GET_MY_ORDER_STATUS_SUCCESS = 'GET_MY_ORDER_STATUS_SUCCESS';
export const GET_MY_ORDER_STATUS_FAILURE = 'GET_MY_ORDER_STATUS_FAILURE';

export const GET_MY_ORDER_SUMMARY = 'GET_MY_ORDER_SUMMARY';
export const GET_MY_ORDER_SUMMARY_SUCCESS = 'GET_MY_ORDER_SUMMARY_SUCCESS';
export const GET_MY_ORDER_SUMMARY_FAILURE = 'GET_MY_ORDER_SUMMARY_FAILURE';

export const SET_ACTIVE_MY_ORDER_ID = 'SET_ACTIVE_MY_ORDER_ID';

export class GetMyOrderDetails implements BaseAction {
  readonly type = GET_MY_ORDER_DETAILS;
  constructor(public payload: ActionPayload<GetMyOrderDetailsRequest>) {}
}
export class GetMyOrderDetailsFailure implements BaseAction {
  readonly type = GET_MY_ORDER_DETAILS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetMyOrderDetailsSuccess implements BaseAction {
  readonly type = GET_MY_ORDER_DETAILS_SUCCESS;
  constructor(public payload: BaseResponse<GetMyOrderDetailsResponse>) {}
}

export class GetMyOrderStatus implements BaseAction {
  readonly type = GET_MY_ORDER_STATUS;
  constructor(public payload: ActionPayload<GetMyOrderStatusRequest>) {}
}
export class GetMyOrderStatusFailure implements BaseAction {
  readonly type = GET_MY_ORDER_STATUS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetMyOrderStatusSuccess implements BaseAction {
  readonly type = GET_MY_ORDER_STATUS_SUCCESS;
  constructor(public payload: BaseResponse<GetMyOrderStatusResponse>) {}
}

export class GetMyOrderSummary implements BaseAction {
  readonly type = GET_MY_ORDER_SUMMARY;
  constructor(public payload: ActionPayload<GetMyOrderSummaryRequest>) {}
}
export class GetMyOrderSummaryFailure implements BaseAction {
  readonly type = GET_MY_ORDER_SUMMARY_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetMyOrderSummarySuccess implements BaseAction {
  readonly type = GET_MY_ORDER_SUMMARY_SUCCESS;
  constructor(public payload: BaseResponse<GetMyOrderSummaryResponse>) {}
}

export class SetActiveMyOrderId implements BaseAction {
  readonly type = SET_ACTIVE_MY_ORDER_ID;
  constructor(public payload: {myOrderId: string}) {}
}

export type Actions =
  | GetMyOrderDetails
  | GetMyOrderDetailsFailure
  | GetMyOrderDetailsSuccess
  | GetMyOrderSummary
  | GetMyOrderSummaryFailure
  | GetMyOrderSummarySuccess
  | GetMyOrderStatus
  | GetMyOrderStatusFailure
  | GetMyOrderStatusSuccess
  | SetActiveMyOrderId;

export interface State {
  error: string;
  loaded: boolean;
  loading: boolean;
  activeMyOrderId: string;
  myOrderDetails: MyOrderDetails;
  myOrderStatus: MyOrderStatusHistoryInfo[];
  myOrderSummary: MyOrderSummary;
}

export const initialState: State = {
  error: '',
  loaded: false,
  loading: false,
  activeMyOrderId: '',
  myOrderDetails: {
    myOrderProduct: [],
    postOfficeCode: '',
    status: '',
    postedAt: undefined,
    statusId: undefined,
  },
  myOrderStatus: [],
  myOrderSummary: {
    address: {
      addressId: '',
      city: '',
      complement: '',
      name: '',
      number: '',
      state: '',
      street: '',
    },
    coupons: [],
    discounts: [],
    price: {
      amount: 0,
      finalPrice: 0,
      shipping: 0,
    },
    products: [],
    store: {
      city: '',
      corporateName: '',
      stars: 5,
      state: '',
      storeId: '',
    },
  },
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case GET_MY_ORDER_DETAILS:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };

    case GET_MY_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: 'Não foi possivel carregar os detalhes da compra',
      };

    case GET_MY_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        myOrderDetails: action.payload.data || initialState.myOrderDetails,
      };
    }

    case GET_MY_ORDER_STATUS: {
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };
    }

    case GET_MY_ORDER_STATUS_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: 'Não foi possivel carregar o histórico de status da compra',
      };
    }

    case GET_MY_ORDER_STATUS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        error: '',
        myOrderStatus: action.payload.data.histories || [],
      };
    }

    case GET_MY_ORDER_SUMMARY: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: '',
      };
    }

    case GET_MY_ORDER_SUMMARY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: 'Não foi possível carregar o resumo da compra',
      };
    }

    case GET_MY_ORDER_SUMMARY_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: '',
        myOrderSummary: action.payload.data || initialState.myOrderSummary,
      };
    }

    case SET_ACTIVE_MY_ORDER_ID: {
      return {
        ...state,
        activeMyOrderId: action.payload.myOrderId,
      };
    }

    default:
      return state;
  }
}

export function getMyOrderDetails(
  data: GetMyOrderDetailsRequest,
): GetMyOrderDetails {
  return {
    type: GET_MY_ORDER_DETAILS,
    payload: {
      request: {
        method: 'POST',
        url: '/MyOrder/Details/v1',
        data,
      },
    },
  };
}

export function getMyOrderStatus(
  data: GetMyOrderStatusRequest,
): GetMyOrderStatus {
  return {
    type: GET_MY_ORDER_STATUS,
    payload: {
      request: {
        method: 'POST',
        url: '/MyOrder/History/v1',
        data,
      },
    },
  };
}

export function getMyOrderSummary(
  data: GetMyOrderSummaryRequest,
): GetMyOrderSummary {
  return {
    type: GET_MY_ORDER_SUMMARY,
    payload: {
      request: {
        method: 'POST',
        url: '/MyOrder/Summary/v1',
        data,
      },
    },
  };
}

export function setActiveMyOrderId(myOrderId: string): SetActiveMyOrderId {
  return {
    type: SET_ACTIVE_MY_ORDER_ID,
    payload: {myOrderId},
  };
}
