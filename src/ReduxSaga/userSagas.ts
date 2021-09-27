import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import * as NavigationService from '../Screens/RootNavigation';

import {INSERT_TOAST_TO_QUEUE} from 'src/Store/Ducks/toastDucks';
import { Action, ActionPayloadResponse } from 'src/Models/ReduxModels';
import {Toast} from '../Models/Toast';
import {
  ChangeUserMainAddressRequest,
  ChangePasswordErrorResponse,
  ChangePasswordRequest,
  EditProfileRequest,
  EditProfileResponse,
} from '../Models/User';
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_USER_MAIN_ADDRESS,
  CHANGE_USER_MAIN_ADDRESS_FAIL,
  CHANGE_USER_MAIN_ADDRESS_SUCCESS,
  EDIT_PROFILE,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_SUCCESS,
  SET_PROFILE_PICTURE,
  SET_PROFILE_PICTURE_FAILURE,
  SET_PROFILE_PICTURE_SUCCESS,
} from 'src/Store/Ducks/user';
import { SetProfilePictureRequest } from 'src/Models/Login';

function* changeUserMainAddressSaga(
  action: Action<ChangeUserMainAddressRequest>,
) {
  try {
    yield call(Api, action);

    const addressId = action.payload.request.data?.addressId;

    yield put({
      type: CHANGE_USER_MAIN_ADDRESS_SUCCESS,
      payload: {data: addressId},
    });
  } catch (e) {
    yield put({type: CHANGE_USER_MAIN_ADDRESS_FAIL, payload: e});
  }
}

function* changePasswordSaga(action: Action<ChangePasswordRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: CHANGE_PASSWORD_SUCCESS, payload});

    const data: Toast = {
      message: 'Senha alterada com sucesso',
      type: 'success',
    };

    yield put({type: INSERT_TOAST_TO_QUEUE, payload: {data}});

    NavigationService.navigate('EditProfile');
  } catch (e) {
    const error: ChangePasswordErrorResponse = e;

    const data: Toast = {
      message:
        'Não foi possível alterar sua senha. Verifique se digitou corretamente.',
      type: 'error',
    };

    yield put({type: INSERT_TOAST_TO_QUEUE, payload: {data}});
    yield put({type: CHANGE_PASSWORD_FAIL, payload: error});
  }
}

function* editProfileSaga(action: Action<EditProfileRequest>) {
  try {
    const payload: ActionPayloadResponse<EditProfileResponse> = yield call(
      Api,
      action,
    );

    yield put({type: EDIT_PROFILE_SUCCESS, payload});
  } catch (e) {
    const data: Toast = {
      message: 'Não foi possível atualizar seus dados',
      type: 'error',
    };

    yield put({type: EDIT_PROFILE_FAIL, payload: e});
    yield put({type: INSERT_TOAST_TO_QUEUE, payload: {data}});
  }
}

function* setProfilePictureSaga(action: Action<SetProfilePictureRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: SET_PROFILE_PICTURE_SUCCESS, payload});
  } catch (e) {
    yield put({type: SET_PROFILE_PICTURE_FAILURE, payload: e});
  }
}

export default [
  takeLatest(CHANGE_PASSWORD, changePasswordSaga),
  takeLatest(CHANGE_USER_MAIN_ADDRESS, changeUserMainAddressSaga),
  takeLatest(EDIT_PROFILE, editProfileSaga),
  takeLatest(SET_PROFILE_PICTURE, setProfilePictureSaga),
];
