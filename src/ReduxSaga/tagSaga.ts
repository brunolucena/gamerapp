import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {Action} from 'src/Models/ReduxModels';
import {GetCustomerAccountRequest} from 'src/Models/CustomerAccount';
import {
  LOAD_TAGS,
  LOAD_TAGS_FAILURE,
  LOAD_TAGS_SUCCESS,
  SAVE_GAMER_TAGS,
  SAVE_GAMER_TAGS_FAILURE,
  SAVE_GAMER_TAGS_SUCCESS,
} from 'src/Store/Ducks/tagsDuck';
import {LoadTagsRequest, SaveGamerTagsRequest} from 'src/Models/Tag';

function* loadTagsSaga(action: Action<LoadTagsRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: LOAD_TAGS_SUCCESS, payload});
  } catch (e) {
    yield put({type: LOAD_TAGS_FAILURE, payload: e});
  }
}

function* saveGamerTagsSaga(action: Action<SaveGamerTagsRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: SAVE_GAMER_TAGS_SUCCESS, payload});
  } catch (e) {
    yield put({type: SAVE_GAMER_TAGS_FAILURE, payload: e});
  }
}

export default [
  takeLatest(LOAD_TAGS, loadTagsSaga),
  takeLatest(SAVE_GAMER_TAGS, saveGamerTagsSaga),
];
