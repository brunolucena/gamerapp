import Api from 'src/Services/Api';
import {Action} from 'src/Models/ReduxModels';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  NEW_POST,
  NEW_POST_FAILURE,
  NEW_POST_SUCCESS,
} from 'src/Store/Ducks/postDuck';
import {NewPostRequest} from 'src/Store/Ducks/postDuck/models';

function* newPostSaga(action: Action<NewPostRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: NEW_POST_SUCCESS, payload});
  } catch (e) {
    yield put({type: NEW_POST_FAILURE, payload: e});
  }
}

export default [takeLatest(NEW_POST, newPostSaga)];
