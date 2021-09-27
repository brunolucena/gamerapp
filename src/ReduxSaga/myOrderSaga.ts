import {call, put, takeLatest} from 'redux-saga/effects';
import {
  GetMyOrderDetailsRequest,
  GetMyOrderStatusRequest,
  GetMyOrderSummaryRequest,
  MyOrderListItemRequest,
} from 'src/Models/MyOrder';
import {Action} from 'src/Models/ReduxModels';
import Api from 'src/Services/Api';
import {
  GET_MY_ORDERS_DELIVERED,
  GET_MY_ORDERS_DELIVERED_FAILURE,
  GET_MY_ORDERS_DELIVERED_SUCCESS,
  GET_MY_ORDERS_PENDING,
  GET_MY_ORDERS_PENDING_FAILURE,
  GET_MY_ORDERS_PENDING_SUCCESS,
} from 'src/Store/Ducks/myOrdersListDuck';
import {
  GET_MY_ORDER_DETAILS,
  GET_MY_ORDER_DETAILS_FAILURE,
  GET_MY_ORDER_DETAILS_SUCCESS,
  GET_MY_ORDER_STATUS,
  GET_MY_ORDER_STATUS_FAILURE,
  GET_MY_ORDER_STATUS_SUCCESS,
  GET_MY_ORDER_SUMMARY,
  GET_MY_ORDER_SUMMARY_FAILURE,
  GET_MY_ORDER_SUMMARY_SUCCESS,
} from 'src/Store/Ducks/myOrderDuck';

function* getMyOrderDetailsSaga(action: Action<GetMyOrderDetailsRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_MY_ORDER_DETAILS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_MY_ORDER_DETAILS_FAILURE, payload: e});
  }
}

function* getMyOrderStatusSaga(action: Action<GetMyOrderStatusRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_MY_ORDER_STATUS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_MY_ORDER_STATUS_FAILURE, payload: e});
  }
}

function* getMyOrderSummarySaga(action: Action<GetMyOrderSummaryRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_MY_ORDER_SUMMARY_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_MY_ORDER_SUMMARY_FAILURE, payload: e});
  }
}

function* getMyOrderPendingListSaga(action: Action<MyOrderListItemRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_MY_ORDERS_PENDING_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_MY_ORDERS_PENDING_FAILURE, payload: e});
  }
}

function* getMyOrderDeliveryListSaga(action: Action<MyOrderListItemRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_MY_ORDERS_DELIVERED_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_MY_ORDERS_DELIVERED_FAILURE, payload: e});
  }
}

export default [
  takeLatest(GET_MY_ORDER_DETAILS, getMyOrderDetailsSaga),
  takeLatest(GET_MY_ORDER_STATUS, getMyOrderStatusSaga),
  takeLatest(GET_MY_ORDER_SUMMARY, getMyOrderSummarySaga),
  takeLatest(GET_MY_ORDERS_PENDING, getMyOrderPendingListSaga),
  takeLatest(GET_MY_ORDERS_DELIVERED, getMyOrderDeliveryListSaga),
];
