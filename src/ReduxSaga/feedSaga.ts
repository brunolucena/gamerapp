import {call, put, takeLatest} from 'redux-saga/effects';
import {
  DeletePostRequest,
  FilterPostRequest,
  PostReactionRequest,
} from 'src/Models/Feed';
import {Action} from 'src/Models/ReduxModels';
import Api from 'src/Services/Api';
import {
  DELETE_POST,
  DELETE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  FILTER_POST,
  FILTER_POST_FAILURE,
  FILTER_POST_SUCCESS,
  POST_REACTION,
  POST_REACTION_FAILURE,
  POST_REACTION_SUCCESS,
} from 'src/Store/Ducks/feedDuck';

function* filterPostSaga(action: Action<FilterPostRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: FILTER_POST_SUCCESS, payload});
  } catch (e) {
    yield put({type: FILTER_POST_FAILURE, payload: e});
  }
}

function* postReactionSaga(action: Action<PostReactionRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: POST_REACTION_SUCCESS, payload});
  } catch (e) {
    yield put({type: POST_REACTION_FAILURE, payload: e});
  }
}

function* deletePostSaga(action: Action<DeletePostRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: DELETE_POST_SUCCESS, payload});
  } catch (e) {
    yield put({type: DELETE_POST_FAILURE, payload: e});
  }
}

export default [
  takeLatest(DELETE_POST, deletePostSaga),
  takeLatest(FILTER_POST, filterPostSaga),
  takeLatest(POST_REACTION, postReactionSaga),
];
