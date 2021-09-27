import {BaseErrorResponse} from 'src/Models/Login';
import {ActionPayload, BaseAction, BaseResponse} from 'src/Models/ReduxModels';
import {
  GetStoreOrdersRequest,
  GetStoreOrdersResponse,
  MyOrderInfo,
  ProductInfo,
  SetStoreOrderDataRequest,
  StoreOrderStatusId,
} from 'src/Models/StoreOrder';

export const GET_STORE_ORDERS = 'GET_STORE_ORDERS';
export const GET_STORE_ORDERS_SUCCESS = 'GET_STORE_ORDERS_SUCCESS';
export const GET_STORE_ORDERS_FAILURE = 'GET_STORE_ORDERS_FAILURE';

export const SET_STORE_ORDER_DATA = 'SET_STORE_ORDER_DATA';

export class GetStoreOrders implements BaseAction {
  readonly type = GET_STORE_ORDERS;
  constructor(public payload: ActionPayload<GetStoreOrdersRequest>, public refreshing: boolean) {}
}
export class GetStoreOrdersSuccess implements BaseAction {
  readonly type = GET_STORE_ORDERS_SUCCESS;
  constructor(public payload: BaseResponse<GetStoreOrdersResponse>) {}
}
export class GetStoreOrdersFailure implements BaseAction {
  readonly type = GET_STORE_ORDERS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}

export class SetStoreOrderData implements BaseAction {
  readonly type = SET_STORE_ORDER_DATA;
  constructor(public payload: SetStoreOrderDataRequest) {}
}

export type Actions =
  | GetStoreOrders
  | GetStoreOrdersSuccess
  | GetStoreOrdersFailure
  | SetStoreOrderData;

export interface State extends GetStoreOrdersResponse {
  error: string;
  loaded: boolean;
  loading: boolean;
  activeStoreOrder: MyOrderInfo;
  page: number;
  refreshing: boolean;
  selectedStatusId: StoreOrderStatusId;
}

export const initialState: State = {
  error: '',
  loaded: false,
  loading: false,
  activeStoreOrder: {
    date: '',
    myOrderId: '',
    price: 0,
    store: '',
    viewId: '',
  },
  count: 0,
  myOrders: [],
  page: 1,
  products: [],
  refreshing: false,
  selectedStatusId: 1,
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case GET_STORE_ORDERS: {
      const { refreshing, payload } = action;
      
      const { data } = payload.request;
      
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
        page: data?.page || 1,
        refreshing,
        selectedStatusId: data?.statusId || null,
      };
    }
    case GET_STORE_ORDERS_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
        refreshing: false,
        error: 'Não foi possivel carregar suas vendas',
      };
    }
    case GET_STORE_ORDERS_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        refreshing: false,
        error: '',
        ...action.payload.data,
      };
    }

    case SET_STORE_ORDER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export function getStoreOrders(data: GetStoreOrdersRequest, refreshing = false): GetStoreOrders {
  return {
    type: GET_STORE_ORDERS,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Orders/v1',
        data,
      },
    },
    refreshing,
  };
}

export function setStoreOrderData(data: SetStoreOrderDataRequest): SetStoreOrderData {
  return {
    type: SET_STORE_ORDER_DATA,
    payload: data,
  };
}

// Selectors
export function selectStoreOrdersHasNextPage(state: State): boolean {
  return state.products.length < state.count;
}

export function selectStoreOrderItemFromId(
  state: State,
  myOrderId: string,
): MyOrderInfo {
  const myOrder = state.myOrders.find(order => order.myOrderId === myOrderId);

  return (
    myOrder || {
      date: new Date(),
      myOrderId: '',
      price: 0,
      store: '',
      viewId: '',
    }
  );
}

export function selectProductsFromStoreOrder(
  state: State,
  myOrderId: string,
): ProductInfo[] {
  const products = state.products.filter(
    product => product.myOrderId === myOrderId,
  );

  return products;
}
