import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import * as NavigationService from '../Screens/RootNavigation';

import {Toast} from '../Models/Toast';
import {
  ChangeTradeRequestStatus,
  ChangeTradeRequestStatusResponse,
  GetTradeRequestDetailsRequest,
  GetTradeRequestDetailsResponse,
  SaveTradeRequestRequest,
  SaveTradeRequestResponse,
} from '../Models/TradeRequest';

import {SET_EARNED_POINTS} from 'src/Store/Ducks/gamification';
import {INSERT_TOAST_TO_QUEUE} from 'src/Store/Ducks/toastDucks';
import {
  SET_ACTIVE_TRADE_DETAILS_SUCCESS,
  SET_ACTIVE_TRADE_ITEMS_SUCCESS,
  SET_ACTIVE_TRADE_PARTS_SUCCESS,
} from 'src/Store/Ducks/tradeActive';
import {
  ACCEPT_TRADE_REQUEST,
  ACCEPT_TRADE_REQUEST_FAILURE,
  ACCEPT_TRADE_REQUEST_SUCCESS,
  GET_TRADE_REQUEST_DETAILS,
  GET_TRADE_REQUEST_DETAILS_FAILURE,
  GET_TRADE_REQUEST_DETAILS_SUCCESS,
  GET_TRADE_REQUEST_ITEMS_SUCCESS,
  GET_TRADE_REQUEST_PARTS_SUCCESS,
  SAVE_TRADE_REQUEST,
  SAVE_TRADE_REQUEST_FAILURE,
  SAVE_TRADE_REQUEST_SUCCESS,
} from 'src/Store/Ducks/tradeRequestDetails';
import {REMOVE_TRADE_REQUEST_FROM_LIST} from 'src/Store/Ducks/tradeRequestList';
import {REMOVE_AUTO_TRADE_FROM_LIST} from 'src/Store/Ducks/autoTradeList';
import { Action, ActionPayloadResponse } from 'src/Models/ReduxModels';

function* acceptTradeRequestSaga(action: Action<ChangeTradeRequestStatus>) {
  try {
    const payload: ActionPayloadResponse<ChangeTradeRequestStatusResponse> = yield call(
      Api,
      action,
    );

    const {experiencePoints, status, tradeRequestId} = payload.data;

    yield put({type: ACCEPT_TRADE_REQUEST_SUCCESS, payload});
    yield put({
      type: REMOVE_TRADE_REQUEST_FROM_LIST,
      payload: {data: tradeRequestId || ''},
    });
    yield put({type: SET_EARNED_POINTS, payload: {data: experiencePoints}});

    if (status === 1) {
      NavigationService.navigate('TradeRequestCompleted');
    } else {
      const data: Toast = {
        message: 'Troca recusada!',
        type: 'error',
      };

      NavigationService.navigate('TradeListEmAndamento');
      yield put({type: INSERT_TOAST_TO_QUEUE, payload: {data}});
    }
  } catch (e) {
    yield put({type: ACCEPT_TRADE_REQUEST_FAILURE, payload: e});
  }
}

function* getTradeDetailsSaga(action: Action<GetTradeRequestDetailsRequest>) {
  try {
    const payload: ActionPayloadResponse<GetTradeRequestDetailsResponse> = yield call(
      Api,
      action,
    );

    let {tradeDetails, tradeItems, tradeParts} = payload.data;

    yield put({
      type: GET_TRADE_REQUEST_DETAILS_SUCCESS,
      payload: {...tradeDetails},
    });
    yield put({
      type: GET_TRADE_REQUEST_ITEMS_SUCCESS,
      payload: [...tradeItems],
    });
    yield put({
      type: GET_TRADE_REQUEST_PARTS_SUCCESS,
      payload: [...tradeParts],
    });

    yield put({
      type: SET_ACTIVE_TRADE_DETAILS_SUCCESS,
      payload: {...tradeDetails},
    });
    yield put({
      type: SET_ACTIVE_TRADE_ITEMS_SUCCESS,
      payload: [...tradeItems],
    });
    yield put({
      type: SET_ACTIVE_TRADE_PARTS_SUCCESS,
      payload: [...tradeParts],
    });
  } catch (e) {
    yield put({type: GET_TRADE_REQUEST_DETAILS_FAILURE, payload: e});
  }
}

function* saveTradeRequestSaga(action: Action<SaveTradeRequestRequest>) {
  try {
    const payload: ActionPayloadResponse<SaveTradeRequestResponse> = yield call(
      Api,
      action,
    );

    const oldTradeRequestId =
      action.payload.request.data?.TradeRequestId ||
      action.payload.request.data?.AutoTradeId ||
      '';

    const {experiencePoints} = payload.data;

    yield put({
      type: REMOVE_TRADE_REQUEST_FROM_LIST,
      payload: {data: oldTradeRequestId},
    });
    yield put({
      type: REMOVE_AUTO_TRADE_FROM_LIST,
      payload: {data: oldTradeRequestId},
    });
    yield put({type: SAVE_TRADE_REQUEST_SUCCESS, payload});
    yield put({type: SET_EARNED_POINTS, payload: {data: experiencePoints}});

    NavigationService.navigate('TradeRequestSent');
  } catch (e) {
    yield put({type: SAVE_TRADE_REQUEST_FAILURE, payload: e});
  }
}

export default [
  takeLatest(ACCEPT_TRADE_REQUEST, acceptTradeRequestSaga),
  takeLatest(GET_TRADE_REQUEST_DETAILS, getTradeDetailsSaga),
  takeLatest(SAVE_TRADE_REQUEST, saveTradeRequestSaga),
];
