import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {
  GetGamerRankingListRequest,
  GetGamerRankingListResponse,
  GetGamerRankingRequest,
  GetGamerRankingResponse,
} from '../Models/Achievement';
import {
  GET_GAMER_RANKING,
  GET_GAMER_RANKING_FAILURE,
  GET_GAMER_RANKING_SUCCESS,
  GET_RANKING_LIST,
  GET_RANKING_LIST_FAILURE,
  GET_RANKING_LIST_SUCCESS,
} from 'src/Store/Ducks/ranking';
import {Action, ActionPayloadResponse} from 'src/Models/ReduxModels';

function* getGamerRankingSaga(action: Action<GetGamerRankingRequest>) {
  try {
    const payload: ActionPayloadResponse<GetGamerRankingResponse> = yield call(
      Api,
      action,
    );

    yield put({type: GET_GAMER_RANKING_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_GAMER_RANKING_FAILURE, payload: e});
  }
}

function* getRankingListSaga(action: Action<GetGamerRankingListRequest>) {
  try {
    const payload: ActionPayloadResponse<GetGamerRankingListResponse> = yield call(
      Api,
      action,
    );

    yield put({type: GET_RANKING_LIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_RANKING_LIST_FAILURE, payload: e});
  }
}

export default [
  takeLatest(GET_GAMER_RANKING, getGamerRankingSaga),
  takeLatest(GET_RANKING_LIST, getRankingListSaga),
];
