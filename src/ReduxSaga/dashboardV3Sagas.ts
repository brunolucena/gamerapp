import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import {Action} from 'src/Models/ReduxModels';

import {
  GetDashboardV3Request,
  SearchDashboardV3Request,
} from 'src/Models/DashboardV3Models';
import {
  GET_DASHBOARD_V3,
  GET_DASHBOARD_V3_FAILURE,
  GET_DASHBOARD_V3_SUCCESS,
} from 'src/Store/Ducks/dashboardV3Duck';
import {
  SEARCH_DASHBOARD_V3,
  SEARCH_DASHBOARD_V3_FAILURE,
  SEARCH_DASHBOARD_V3_SUCCESS,
} from 'src/Store/Ducks/dashboardV3SearchDuck';

function* getDashboardV3Saga(action: Action<GetDashboardV3Request>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_DASHBOARD_V3_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_DASHBOARD_V3_FAILURE, payload: e});
  }
}

function* searchDashboardV3Saga(action: Action<SearchDashboardV3Request>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: SEARCH_DASHBOARD_V3_SUCCESS, payload});
  } catch (e) {
    yield put({type: SEARCH_DASHBOARD_V3_FAILURE, payload: e});
  }
}

export default [
  takeLatest(GET_DASHBOARD_V3, getDashboardV3Saga),
  takeLatest(SEARCH_DASHBOARD_V3, searchDashboardV3Saga),
];
