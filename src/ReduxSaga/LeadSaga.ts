import {
  LEAD_MANUFACTURER,
  LEAD_MANUFACTURER_FAILURE,
  LEAD_MANUFACTURER_SUCCESS,
  LEAD_MOTORCYCLE,
  LEAD_MOTORCYCLE_FAILURE,
  LEAD_MOTORCYCLE_SUCCESS,
  LEAD_PHONE_NUMBER,
  LEAD_PHONE_NUMBER_FAILURE,
  LEAD_PHONE_NUMBER_SUCCESS,
  LEAD_ZIPCODE,
  LEAD_ZIPCODE_FAILURE,
  LEAD_ZIPCODE_SUCCESS,
  VALIDATE_PHONE_NUMBER,
  VALIDATE_PHONE_NUMBER_FAILURE,
  VALIDATE_PHONE_NUMBER_SUCCESS,
} from 'src/Store/Ducks/leadDuck';
import {
  LeadManufacturerRequest,
  LeadMotorcycleRequest,
  LeadPhoneNumberRequest,
  LeadZipCodeRequest,
  ValidatePhoneNumberRequest,
} from 'src/Models/Lead';
import {call, put, takeLatest} from 'redux-saga/effects';

import {Action} from 'src/Models/ReduxModels';
import Api from 'src/Services/Api';

import * as RootNavigation from '../Screens/RootNavigation';

export function* leadPhoneNumberSaga(action: Action<LeadPhoneNumberRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: LEAD_PHONE_NUMBER_SUCCESS, payload});

    RootNavigation.navigate('ValidateCode');
  } catch (e) {
    yield put({type: LEAD_PHONE_NUMBER_FAILURE, payload: e});
  }
}

export function* leadManufacturerSaga(action: Action<LeadManufacturerRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: LEAD_MANUFACTURER_SUCCESS, payload});
  } catch (e) {
    yield put({type: LEAD_MANUFACTURER_FAILURE, payload: e});
  }
}

export function* leadMotorcycleSaga(action: Action<LeadMotorcycleRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: LEAD_MOTORCYCLE_SUCCESS, payload});
  } catch (e) {
    yield put({type: LEAD_MOTORCYCLE_FAILURE, payload: e});
  }
}

export function* leadZipCodeSaga(action: Action<LeadZipCodeRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: LEAD_ZIPCODE_SUCCESS, payload});
  } catch (e) {
    yield put({type: LEAD_ZIPCODE_FAILURE, payload: e});
  }
}

export function* validatePhoneNumberSaga(
  action: Action<ValidatePhoneNumberRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: VALIDATE_PHONE_NUMBER_SUCCESS, payload});

    RootNavigation.navigate('Password');
  } catch (e) {
    yield put({type: VALIDATE_PHONE_NUMBER_FAILURE, payload: e});
  }
}

export default [
  takeLatest(LEAD_MANUFACTURER, leadManufacturerSaga),
  takeLatest(LEAD_MOTORCYCLE, leadMotorcycleSaga),
  takeLatest(LEAD_PHONE_NUMBER, leadPhoneNumberSaga),
  takeLatest(LEAD_ZIPCODE, leadZipCodeSaga),
  takeLatest(VALIDATE_PHONE_NUMBER, validatePhoneNumberSaga),
];
