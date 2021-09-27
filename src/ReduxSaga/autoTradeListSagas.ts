import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {Action, ActionPayloadResponse} from '../Models/Redux';
import {
  GetAutoTradesListRequest,
  GetAutoTradesListResponse,
} from '../Models/TradeRequest';
import {
  GET_AUTO_TRADES_LIST_SUCCESS,
  GET_AUTO_TRADES_LIST_FAIL,
  GET_AUTO_TRADES_LIST,
} from 'src/Store/Ducks/autoTradeList';

function* getAutoTradesListSaga(action: Action<GetAutoTradesListRequest>) {
  try {
    const payload: ActionPayloadResponse<GetAutoTradesListResponse> = yield call(
      Api,
      action,
    );

    yield put({type: GET_AUTO_TRADES_LIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_AUTO_TRADES_LIST_FAIL, payload: e});
  }
}

export default [takeLatest(GET_AUTO_TRADES_LIST, getAutoTradesListSaga)];
