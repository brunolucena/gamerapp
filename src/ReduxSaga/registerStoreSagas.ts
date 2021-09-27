import {call, put, takeLatest} from 'redux-saga/effects';
import {CreateStoreRequest} from 'src/Models/RegisterStore';
import {Action} from 'src/Models/ReduxModels';
import Api from 'src/Services/Api';
import {
  CREATE_STORE,
  CREATE_STORE_FAIL,
  CREATE_STORE_SUCCESS,
} from 'src/Store/Ducks/registerStore';
import * as NavigationService from '../Screens/RootNavigation';

function* createStoreSaga(action: Action<CreateStoreRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: CREATE_STORE_SUCCESS, payload});

    NavigationService.navigate('StoreRegister', {
      screen: 'StoreRegisterSuccess',
    });
  } catch (e) {
    yield put({type: CREATE_STORE_FAIL, payload: e});
  }
}

export default [takeLatest(CREATE_STORE, createStoreSaga)];
