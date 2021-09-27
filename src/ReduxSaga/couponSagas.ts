import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import {Action} from 'src/Models/ReduxModels';

import {GetCouponListRequest} from 'src/Models/CouponModels';
import {
  GET_COUPON_LIST,
  GET_COUPON_LIST_FAILURE,
  GET_COUPON_LIST_SUCCESS,
} from 'src/Store/Ducks/couponDuck';

function* getCouponListSaga(action: Action<GetCouponListRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_COUPON_LIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_COUPON_LIST_FAILURE, payload: e});
  }
}

export default [takeLatest(GET_COUPON_LIST, getCouponListSaga)];
