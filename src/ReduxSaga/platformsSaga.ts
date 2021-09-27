import {call, put, takeLatest} from 'redux-saga/effects';
import {LoadPlatformsRequest, LoadPlatformsResponse} from 'src/Models/Platform';
import {Action, ActionPayloadResponse} from 'src/Models/ReduxModels';
import Api from 'src/Services/Api';
import {
  LOAD_PLATFORMS,
  LOAD_PLATFORMS_FAILURE,
  LOAD_PLATFORMS_SUCCESS,
  SAVE_PLATFORMS,
  SAVE_PLATFORMS_FAILURE,
  SAVE_PLATFORMS_SUCCESS,
} from 'src/Store/Ducks/platformDuck';

function* loadPlatformsSaga(action: Action<LoadPlatformsRequest>) {
  try {
    const payload: ActionPayloadResponse<LoadPlatformsResponse> = yield call(
      Api,
      action,
    );

    yield put({type: LOAD_PLATFORMS_SUCCESS, payload});
  } catch (e) {
    yield put({type: LOAD_PLATFORMS_FAILURE, payload: e});
  }
}

function* savePlatformsSaga(action: Action<LoadPlatformsRequest>) {
  try {
    const payload: ActionPayloadResponse<LoadPlatformsResponse> = yield call(
      Api,
      action,
    );

    yield put({type: SAVE_PLATFORMS_SUCCESS, payload});
  } catch (e) {
    yield put({type: SAVE_PLATFORMS_FAILURE, payload: e});
  }
}

export default [
  takeLatest(LOAD_PLATFORMS, loadPlatformsSaga),
  takeLatest(SAVE_PLATFORMS, savePlatformsSaga),
];
