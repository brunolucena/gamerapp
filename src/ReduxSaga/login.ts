import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, Login} from 'src/Store/Ducks/user';

function* loginSaga(action: Login) {
  try {
    const payload = yield call(Api, action, true);

    yield put({type: LOGIN_SUCCESS, payload});
  } catch (e) {
    yield put({type: LOGIN_FAIL, payload: e});
  }
}

export default [takeLatest(LOGIN, loginSaga)];
