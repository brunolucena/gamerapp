import {call, put, takeLatest} from 'redux-saga/effects';
import {Action} from 'src/Models/ReduxModels';
import Api from 'src/Services/Api';
import {
  GetSellerMyOrderDetailsRequest,
  GetSellerMyOrderSummaryRequest,
  ChangeMyOrderStatusRequest,
} from 'src/Models/SellerOrder';
import {
  CHANGE_MY_ORDER_STATUS,
  CHANGE_MY_ORDER_STATUS_FAILURE,
  CHANGE_MY_ORDER_STATUS_SUCCESS,
  GET_SELLER_MY_ORDER_DETAILS,
  GET_SELLER_MY_ORDER_DETAILS_FAILURE,
  GET_SELLER_MY_ORDER_DETAILS_SUCCESS,
  GET_SELLER_MY_ORDER_SUMMARY,
  GET_SELLER_MY_ORDER_SUMMARY_FAILURE,
  GET_SELLER_MY_ORDER_SUMMARY_SUCCESS,
} from 'src/Store/Ducks/sellerOrderDuck';

function* changeMyOrderStatusSaga(action: Action<ChangeMyOrderStatusRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: CHANGE_MY_ORDER_STATUS_SUCCESS, payload});
  } catch (e) {
    yield put({type: CHANGE_MY_ORDER_STATUS_FAILURE, payload: e});
  }
}

function* getSellerMyOrderDetailsSaga(
  action: Action<GetSellerMyOrderDetailsRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_SELLER_MY_ORDER_DETAILS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_SELLER_MY_ORDER_DETAILS_FAILURE, payload: e});
  }
}

function* getSellerMyOrderSummarySaga(
  action: Action<GetSellerMyOrderSummaryRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_SELLER_MY_ORDER_SUMMARY_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_SELLER_MY_ORDER_SUMMARY_FAILURE, payload: e});
  }
}

export default [
  takeLatest(CHANGE_MY_ORDER_STATUS, changeMyOrderStatusSaga),
  takeLatest(GET_SELLER_MY_ORDER_DETAILS, getSellerMyOrderDetailsSaga),
  takeLatest(GET_SELLER_MY_ORDER_SUMMARY, getSellerMyOrderSummarySaga),
];
