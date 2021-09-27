import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {
  GET_TRADES_LIST,
  GET_TRADES_LIST_FAIL,
  GET_TRADES_LIST_SUCCESS,
} from 'src/Store/Ducks/tradeList';
import {
  GET_TRADES_REQUEST_LIST,
  GET_TRADES_REQUEST_LIST_FAIL,
  GET_TRADES_REQUEST_LIST_SUCCESS,
} from 'src/Store/Ducks/tradeRequestList';

import {Action} from '../Models/Redux';

function* getTradesListSaga(action: Action<any>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_TRADES_LIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_TRADES_LIST_FAIL, payload: e});
  }
}

function* getTradesRequestListSaga(action: Action<any>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_TRADES_REQUEST_LIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_TRADES_REQUEST_LIST_FAIL, payload: e});
  }
}

export default [
  takeLatest(GET_TRADES_LIST, getTradesListSaga),
  takeLatest(GET_TRADES_REQUEST_LIST, getTradesRequestListSaga),
];
