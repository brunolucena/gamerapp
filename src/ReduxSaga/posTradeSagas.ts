import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import * as NavigationService from '../Screens/RootNavigation';

import {Toast} from '../Models/Toast';
import {GamerProductCollectionRequest} from '../Models/GamerProductCollection';
import {
  GetTradeDetailsRequest,
  GetTradeDetailsResponse,
  SetDeliveryStatusRequest,
  SetDeliveryStatusResponse,
  SetTradeRatingRequest,
  SetTradeRatingResponse,
} from '../Models/Trade';
import {SetTradeListStatus} from '../Models/TradeRequest';
import {INSERT_TOAST_TO_QUEUE} from 'src/Store/Ducks/toastDucks';
import {
  GET_TRADE_DETAILS,
  GET_TRADE_DETAILS_FAILURE,
  GET_TRADE_DETAILS_ITEMS_SUCCESS,
  GET_TRADE_DETAILS_PART_SUCCESS,
  GET_TRADE_DETAILS_SUCCESS,
  SET_DELIVERY_STATUS,
  SET_DELIVERY_STATUS_FAILURE,
  SET_DELIVERY_STATUS_SUCCESS,
  SET_TRADE_RATING,
  SET_TRADE_RATING_FAILURE,
  SET_TRADE_RATING_SUCCESS,
  selectIsTradeCompleted,
} from 'src/Store/Ducks/tradeDetails';
import {SET_TRADE_LIST_STATUS} from 'src/Store/Ducks/tradeList';
import {SET_EARNED_POINTS} from 'src/Store/Ducks/gamification';
import {GET_MY_COLLECTION} from 'src/Store/Ducks/myCollection';
import { Action, ActionPayloadResponse } from 'src/Models/ReduxModels';

function* getTradeDetailsSaga(action: Action<GetTradeDetailsRequest>) {
  try {
    const payload: ActionPayloadResponse<GetTradeDetailsResponse> = yield call(
      Api,
      action,
    );

    const {tradeDetails, tradeItems, tradeParts} = payload.data;

    yield put({type: GET_TRADE_DETAILS_ITEMS_SUCCESS, payload: tradeItems});
    yield put({type: GET_TRADE_DETAILS_PART_SUCCESS, payload: tradeParts});
    yield put({type: GET_TRADE_DETAILS_SUCCESS, payload: tradeDetails});
  } catch (e) {
    yield put({type: GET_TRADE_DETAILS_FAILURE, payload: e});
  }
}

function* setDeliveryStatusSaga(action: Action<SetDeliveryStatusRequest>) {
  try {
    const payload: ActionPayloadResponse<SetDeliveryStatusResponse> = yield call(
      Api,
      action,
    );

    yield put({type: SET_DELIVERY_STATUS_SUCCESS, payload});

    const {data} = payload;

    const {deliveryHistory, experiencePoints} = data;

    yield put({type: SET_EARNED_POINTS, payload: {data: experiencePoints}});

    const isCompleted = selectIsTradeCompleted(deliveryHistory);

    if (isCompleted) {
      const setStatus: SetTradeListStatus = {
        status: 'Troca finalizada',
        tradeId: action.payload.request.data?.tradeId || '',
      };

      const updateMyCollection: Action<GamerProductCollectionRequest> = {
        type: GET_MY_COLLECTION,
        payload: {
          request: {
            method: 'POST',
            url: 'Gamer/MyCollection/v1',
            data: {
              gamerId: action.payload.request.data?.gamerId || '',
            },
          },
        },
      };

      yield put(updateMyCollection);
      yield put({type: SET_TRADE_LIST_STATUS, payload: {data: setStatus}});

      NavigationService.navigate('PosTradeCompleted');
    }
  } catch (e) {
    yield put({type: SET_DELIVERY_STATUS_FAILURE, payload: e});
  }
}

function* setTradeRatingSaga(action: Action<SetTradeRatingRequest>) {
  try {
    const payload: ActionPayloadResponse<SetTradeRatingResponse> = yield call(
      Api,
      action,
    );

    yield put({type: SET_TRADE_RATING_SUCCESS, payload});

    const {data} = payload;

    const {experiencePoints} = data;

    if (experiencePoints) {
      const data: Toast = {
        message: `Parabéns, você ganhou ${experiencePoints} pontos!`,
      };

      yield put({type: INSERT_TOAST_TO_QUEUE, payload: {data}});
    }
  } catch (e) {
    yield put({type: SET_TRADE_RATING_FAILURE, payload: e});
  }
}

export default [
  takeLatest(GET_TRADE_DETAILS, getTradeDetailsSaga),
  takeLatest(SET_DELIVERY_STATUS, setDeliveryStatusSaga),
  takeLatest(SET_TRADE_RATING, setTradeRatingSaga),
];
