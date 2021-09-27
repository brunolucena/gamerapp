import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {GetConversationRequest} from '../Models/Chat';
import {
  GET_GAMER_DASHBOARD,
  GET_GAMER_DASHBOARD_FAILURE,
  GET_GAMER_DASHBOARD_SUCCESS,
} from 'src/Store/Ducks/dashboard';
import {Action} from 'src/Models/ReduxModels';

function* getDashboardSaga(action: Action<GetConversationRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_GAMER_DASHBOARD_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_GAMER_DASHBOARD_FAILURE, payload: e});
  }
}

export default [takeLatest(GET_GAMER_DASHBOARD, getDashboardSaga)];
