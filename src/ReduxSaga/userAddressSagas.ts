import {Alert} from 'react-native';
import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import * as NavigationService from '../Screens/RootNavigation';

import {Action, ActionPayloadResponse} from '../Models/Redux';
import {
  GetAddressFromCepRequest,
  SaveUserAddressRequest,
  SaveUserAddressResponse,
} from '../Models/User';

import {
  GET_ADDRESS_FROM_CEP,
  GET_ADDRESS_FROM_CEP_FAIL,
  GET_ADDRESS_FROM_CEP_SUCCESS,
  SAVE_USER_ADDRESS,
  SAVE_USER_ADDRESS_FAIL,
  SAVE_USER_ADDRESS_SUCCESS,
} from 'src/Store/Ducks/userAddress';

function* getAddressFromCepSaga(action: Action<GetAddressFromCepRequest>) {
  try {
    const payload = yield call(Api, action);

    if (!payload.data.erro) {
      yield put({type: GET_ADDRESS_FROM_CEP_SUCCESS, payload});

      const redirectTo = action.payload?.redirectTo;

      NavigationService.navigate(redirectTo || 'ProfileNewAddress');
    } else {
      yield put({
        type: GET_ADDRESS_FROM_CEP_FAIL,
        payload: {error: 'CEP não encontrado'},
      });
    }
  } catch (e) {
    yield put({type: GET_ADDRESS_FROM_CEP_FAIL, payload: e});
  }
}

function* saveUserAddressSaga(action: Action<SaveUserAddressRequest>) {
  try {
    const payload: ActionPayloadResponse<SaveUserAddressResponse> = yield call(
      Api,
      action,
    );

    yield put({type: SAVE_USER_ADDRESS_SUCCESS, payload});

    const redirectTo = action.payload?.redirectTo;

    NavigationService.navigate(redirectTo || 'ProfileAddresses');
  } catch (e) {
    yield put({type: SAVE_USER_ADDRESS_FAIL, payload: e});
    const error =
      e.error && e.error.data
        ? e.error.data
        : 'Não foi possível salvar seu endereço';

    Alert.alert(error || 'Não foi possível salvar seu endereço');
  }
}

export default [
  takeLatest(GET_ADDRESS_FROM_CEP, getAddressFromCepSaga),
  takeLatest(SAVE_USER_ADDRESS, saveUserAddressSaga),
];
