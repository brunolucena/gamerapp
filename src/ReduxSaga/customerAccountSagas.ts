import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {Action} from 'src/Models/ReduxModels';
import {GetCustomerAccountRequest} from 'src/Models/CustomerAccount';
import {
  GET_CUSTOMER_ACCOUNT,
  GET_CUSTOMER_ACCOUNT_FAILURE,
  GET_CUSTOMER_ACCOUNT_SUCCESS,
} from 'src/Store/Ducks/customerAccountDuck';

function* getCustomerAccountSaga(action: Action<GetCustomerAccountRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_CUSTOMER_ACCOUNT_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_CUSTOMER_ACCOUNT_FAILURE, payload: e});
  }
}

export default [takeLatest(GET_CUSTOMER_ACCOUNT, getCustomerAccountSaga)];
