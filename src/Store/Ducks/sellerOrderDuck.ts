import {BaseErrorResponse} from 'src/Models/Login';
import {ActionPayload, BaseAction, BaseResponse} from 'src/Models/ReduxModels';
import {
  ChangeMyOrderStatusRequest,
  ChangeMyOrderStatusResponse,
  GetSellerMyOrderDetailsRequest,
  GetSellerMyOrderDetailsResponse,
  GetSellerMyOrderSummaryRequest,
  GetSellerMyOrderSummaryResponse,
  SetSellerOrderDataRequest,
} from 'src/Models/SellerOrder';

export const CHANGE_MY_ORDER_STATUS = 'CHANGE_MY_ORDER_STATUS';
export const CHANGE_MY_ORDER_STATUS_SUCCESS = 'CHANGE_MY_ORDER_STATUS_SUCCESS';
export const CHANGE_MY_ORDER_STATUS_FAILURE = 'CHANGE_MY_ORDER_STATUS_FAILURE';

export const GET_SELLER_MY_ORDER_DETAILS = 'GET_SELLER_MY_ORDER_DETAILS';
export const GET_SELLER_MY_ORDER_DETAILS_SUCCESS =
  'GET_SELLER_MY_ORDER_DETAILS_SUCCESS';
export const GET_SELLER_MY_ORDER_DETAILS_FAILURE =
  'GET_SELLER_MY_ORDER_DETAILS_FAILURE';

export const GET_SELLER_MY_ORDER_SUMMARY = 'GET_SELLER_MY_ORDER_SUMMARY';
export const GET_SELLER_MY_ORDER_SUMMARY_SUCCESS =
  'GET_SELLER_MY_ORDER_SUMMARY_SUCCESS';
export const GET_SELLER_MY_ORDER_SUMMARY_FAILURE =
  'GET_SELLER_MY_ORDER_SUMMARY_FAILURE';

export const SET_SELLER_ORDER_DATA = 'SET_SELLER_ORDER_DATA';

export class ChangeMyOrderStatus implements BaseAction {
  readonly type = CHANGE_MY_ORDER_STATUS;
  constructor(public payload: ActionPayload<ChangeMyOrderStatusRequest>) {}
}
export class ChangeMyOrderStatusFailure implements BaseAction {
  readonly type = CHANGE_MY_ORDER_STATUS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class ChangeMyOrderStatusSuccess implements BaseAction {
  readonly type = CHANGE_MY_ORDER_STATUS_SUCCESS;
  constructor(public payload: BaseResponse<ChangeMyOrderStatusResponse>) {}
}

export class GetSellerMyOrderDetails implements BaseAction {
  readonly type = GET_SELLER_MY_ORDER_DETAILS;
  constructor(public payload: ActionPayload<GetSellerMyOrderDetailsRequest>) {}
}
export class GetSellerMyOrderDetailsFailure implements BaseAction {
  readonly type = GET_SELLER_MY_ORDER_DETAILS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetSellerMyOrderDetailsSuccess implements BaseAction {
  readonly type = GET_SELLER_MY_ORDER_DETAILS_SUCCESS;
  constructor(public payload: BaseResponse<GetSellerMyOrderDetailsResponse>) {}
}

export class GetSellerMyOrderSummary implements BaseAction {
  readonly type = GET_SELLER_MY_ORDER_SUMMARY;
  constructor(public payload: ActionPayload<GetSellerMyOrderSummaryRequest>) {}
}
export class GetSellerMyOrderSummaryFailure implements BaseAction {
  readonly type = GET_SELLER_MY_ORDER_SUMMARY_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetSellerMyOrderSummarySuccess implements BaseAction {
  readonly type = GET_SELLER_MY_ORDER_SUMMARY_SUCCESS;
  constructor(public payload: BaseResponse<GetSellerMyOrderSummaryResponse>) {}
}

export class SetSellerOrderData implements BaseAction {
  readonly type = SET_SELLER_ORDER_DATA;
  constructor(public payload: SetSellerOrderDataRequest) {}
}

export type Actions =
  | ChangeMyOrderStatus
  | ChangeMyOrderStatusFailure
  | ChangeMyOrderStatusSuccess
  | GetSellerMyOrderDetails
  | GetSellerMyOrderDetailsFailure
  | GetSellerMyOrderDetailsSuccess
  | GetSellerMyOrderSummary
  | GetSellerMyOrderSummaryFailure
  | GetSellerMyOrderSummarySuccess
  | SetSellerOrderData;

export interface State {
  error: string;
  loaded: boolean;
  loading: boolean;
  activeSellerMyOrderId: string;
  sellerMyOrderDetails: GetSellerMyOrderDetailsResponse;
  sellerMyOrderSummary: GetSellerMyOrderSummaryResponse;
}

export const initialState: State = {
  error: '',
  loaded: false,
  loading: false,
  activeSellerMyOrderId: '',
  sellerMyOrderDetails: {
    deliveryAddress: {
      city: '',
      complement: '',
      number: '',
      state: '',
      street: '',
      zipCode: '',
    },
    gamer: {
      document: '',
      name: '',
    },
    price: {
      liquidAmount: 0,
      postOffice: 0,
      postOfficeInfo: '',
      subTotal: 0,
      tax: 0,
      taxInfo: '',
    },
    products: [],
  },
  sellerMyOrderSummary: {
    amount: 0,
    lastStatusDate: '',
    nextStatus: '',
    nextStatusId: 1,
    plpUrl: '',
    postOfficeCode: '',
    products: [],
    status: '',
    statusId: '',
  },
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case CHANGE_MY_ORDER_STATUS: {
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };
    }
    case CHANGE_MY_ORDER_STATUS_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: 'Não foi possivel trocar o status do pedido',
      };
    }
    case CHANGE_MY_ORDER_STATUS_SUCCESS: {
      const {nextStatus, nextStatusId, postOfficeCode} = action.payload.data;

      const sellerMyOrderSummary = {...state.sellerMyOrderSummary};

      sellerMyOrderSummary.nextStatus = nextStatus;
      sellerMyOrderSummary.nextStatusId = nextStatusId;
      sellerMyOrderSummary.postOfficeCode = postOfficeCode;

      return {
        ...state,
        loaded: true,
        loading: false,
        sellerMyOrderSummary,
      };
    }

    case GET_SELLER_MY_ORDER_DETAILS: {
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };
    }
    case GET_SELLER_MY_ORDER_DETAILS_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: 'Não foi possivel carregar os detalhes da compra',
      };
    }
    case GET_SELLER_MY_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        sellerMyOrderDetails:
          action.payload.data || initialState.sellerMyOrderDetails,
      };
    }

    case GET_SELLER_MY_ORDER_SUMMARY: {
      return {
        ...state,
        loading: true,
        loaded: false,
        error: '',
      };
    }
    case GET_SELLER_MY_ORDER_SUMMARY_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: 'Não foi possível carregar o resumo da compra',
      };
    }
    case GET_SELLER_MY_ORDER_SUMMARY_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: '',
        sellerMyOrderSummary:
          action.payload.data || initialState.sellerMyOrderSummary,
      };
    }

    case SET_SELLER_ORDER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export function changeMyOrderStatus(
  data: ChangeMyOrderStatusRequest,
): ChangeMyOrderStatus {
  return {
    type: CHANGE_MY_ORDER_STATUS,
    payload: {
      request: {
        method: 'POST',
        url: '/MyOrder/ChangeStatus/v1',
        data,
      },
    },
  };
}

export function getSellerMyOrderDetails(
  data: GetSellerMyOrderDetailsRequest,
): GetSellerMyOrderDetails {
  return {
    type: GET_SELLER_MY_ORDER_DETAILS,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/MyOrderDetails/v1',
        data,
      },
    },
  };
}

export function getSellerMyOrderSummary(
  data: GetSellerMyOrderSummaryRequest,
): GetSellerMyOrderSummary {
  return {
    type: GET_SELLER_MY_ORDER_SUMMARY,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/MyOrderSummary/v1',
        data,
      },
    },
  };
}

export function setSellerOrderData(
  data: SetSellerOrderDataRequest,
): SetSellerOrderData {
  return {
    type: SET_SELLER_ORDER_DATA,
    payload: data,
  };
}
