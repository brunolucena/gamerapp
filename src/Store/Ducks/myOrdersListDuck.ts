import {BaseErrorResponse} from 'src/Models/Login';
import {
  MyOrderItem,
  MyOrderListItemRequest,
  MyOrderListItemResponse,
  MyOrderProductItem,
} from 'src/Models/MyOrder';
import {ActionPayload, BaseAction, BaseResponse} from 'src/Models/ReduxModels';

export const GET_MY_ORDERS_DELIVERED = 'GET_MY_ORDERS_DELIVERED';
export const GET_MY_ORDERS_DELIVERED_SUCCESS =
  'GET_MY_ORDERS_DELIVERED_SUCCESS';
export const GET_MY_ORDERS_DELIVERED_FAILURE =
  'GET_MY_ORDERS_DELIVERED_FAILURE';

export const GET_MY_ORDERS_PENDING = 'GET_MY_ORDERS_PENDING';
export const GET_MY_ORDERS_PENDING_SUCCESS = 'GET_MY_ORDERS_PENDING_SUCCESS';
export const GET_MY_ORDERS_PENDING_FAILURE = 'GET_MY_ORDERS_PENDING_FAILURE';

export class GetMyOrdersDelivered implements BaseAction {
  readonly type = GET_MY_ORDERS_DELIVERED;
  constructor(public payload: ActionPayload<MyOrderListItemRequest>) {}
}

export class GetMyOrdersDeliveredSuccess implements BaseAction {
  readonly type = GET_MY_ORDERS_DELIVERED_SUCCESS;
  constructor(public payload: BaseResponse<MyOrderListItemResponse>) {}
}

export class GetMyOrdersDeliveredFailure implements BaseAction {
  readonly type = GET_MY_ORDERS_DELIVERED_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}

export class GetMyOrdersPending implements BaseAction {
  readonly type = GET_MY_ORDERS_PENDING;
  constructor(public payload: ActionPayload<MyOrderListItemRequest>) {}
}

export class GetMyOrdersPendingSuccess implements BaseAction {
  readonly type = GET_MY_ORDERS_PENDING_SUCCESS;
  constructor(public payload: BaseResponse<MyOrderListItemResponse>) {}
}

export class GetMyOrdersPendingFailure implements BaseAction {
  readonly type = GET_MY_ORDERS_PENDING_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}

export type MyOrderListActions =
  | GetMyOrdersDelivered
  | GetMyOrdersDeliveredSuccess
  | GetMyOrdersDeliveredFailure
  | GetMyOrdersPending
  | GetMyOrdersPendingSuccess
  | GetMyOrdersPendingFailure;

export interface State {
  error: string;
  loaded: boolean;
  loading: boolean;
  myOrdersDelivered: MyOrderItem[];
  productsDelivered: MyOrderProductItem[];
  myOrdersPending: MyOrderItem[];
  productsPending: MyOrderProductItem[];
}

export const initialState: State = {
  error: '',
  loaded: false,
  loading: false,
  myOrdersDelivered: [],
  myOrdersPending: [],
  productsDelivered: [],
  productsPending: [],
};

export default function reducer(
  state = initialState,
  action: MyOrderListActions,
): State {
  switch (action.type) {
    case GET_MY_ORDERS_DELIVERED:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };

    case GET_MY_ORDERS_DELIVERED_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        myOrdersDelivered: action.payload.data.myOrders,
        productsDelivered: action.payload.data.products,
      };

    case GET_MY_ORDERS_DELIVERED_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: 'Não foi possivel carregar seus pedidos',
      };

    case GET_MY_ORDERS_PENDING:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };

    case GET_MY_ORDERS_PENDING_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        myOrdersPending: action.payload.data.myOrders,
        productsPending: action.payload.data.products,
      };

    case GET_MY_ORDERS_PENDING_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: 'Não foi possivel carregar seus pedidos',
      };

    default:
      return state;
  }
}

export function getMyOrdersDelivered(
  data: MyOrderListItemRequest,
): GetMyOrdersDelivered {
  return {
    type: GET_MY_ORDERS_DELIVERED,
    payload: {
      request: {
        method: 'POST',
        url: '/MyOrder/ListByGamer/v1',
        data,
      },
    },
  };
}

export function getMyOrdersPending(
  data: MyOrderListItemRequest,
): GetMyOrdersPending {
  return {
    type: GET_MY_ORDERS_PENDING,
    payload: {
      request: {
        method: 'POST',
        url: '/MyOrder/ListByGamer/v1',
        data,
      },
    },
  };
}

// Selectors
export function selectMyOrderItemFromId(
  state: State,
  myOrderId: string,
): MyOrderItem {
  const myOrder =
    state.myOrdersDelivered.find(order => order.myOrderId === myOrderId) ||
    state.myOrdersPending.find(order => order.myOrderId === myOrderId);

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

export function selectProductsFromMyOrder(
  state: State,
  myOrderId: string,
  type?: 'delivered' | 'pending',
): MyOrderProductItem[] {
  const productsDelivered = state.productsDelivered.filter(
    product => product.myOrderId === myOrderId,
  );

  const productsPending = state.productsPending.filter(
    product => product.myOrderId === myOrderId,
  );

  if (type === 'delivered') {
    return productsDelivered;
  } else if (type === 'pending') {
    return productsPending;
  } else {
    const products: MyOrderProductItem[] = [
      ...productsDelivered,
      ...productsPending,
    ];

    return products;
  }
}
