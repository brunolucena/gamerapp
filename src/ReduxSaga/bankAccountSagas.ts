import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import * as RootNavigation from '../Screens/RootNavigation';

import {Action} from 'src/Models/ReduxModels';

import {
  CUSTOMER_ACCOUNT_ADD,
  CUSTOMER_ACCOUNT_ADD_FAILURE,
  CUSTOMER_ACCOUNT_ADD_SUCCESS,
  GET_BANKS,
  GET_BANKS_FAILURE,
  GET_BANKS_SUCCESS,
  GET_CUSTOMER_ACCOUNTS_LIST,
  GET_CUSTOMER_ACCOUNTS_LIST_FAILURE,
  GET_CUSTOMER_ACCOUNTS_LIST_SUCCESS,
  TRANSFER_WITHDRAW,
  TRANSFER_WITHDRAW_FAILURE,
  TRANSFER_WITHDRAW_SUCCESS,
  GetCustomerAccountsList,
} from 'src/Store/Ducks/bankAccountDuck';
import {
  CustomerAccountAddRequest,
  GetBanksRequest,
  GetCustomerAccountsListRequest,
  TransferWithdrawRequest,
} from 'src/Models/BankAccount';

function* customerAccountAddSaga(action: Action<CustomerAccountAddRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: CUSTOMER_ACCOUNT_ADD_SUCCESS, payload});

    const customerId = action.payload.request.data?.customerId;

    if (customerId) {
      const data: GetCustomerAccountsList = {
        type: GET_CUSTOMER_ACCOUNTS_LIST,
        payload: {
          request: {
            method: 'GET',
            url: `/CustomerAccount/${customerId}`,
          },
        },
      }

      yield put(data);
    }
  } catch (e) {
    yield put({type: CUSTOMER_ACCOUNT_ADD_FAILURE, payload: e});
  }
}

function* getBanksSaga(action: Action<GetBanksRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_BANKS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_BANKS_FAILURE, payload: e});
  }
}

function* getCustomerAccountsListSaga(
  action: Action<GetCustomerAccountsListRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_CUSTOMER_ACCOUNTS_LIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_CUSTOMER_ACCOUNTS_LIST_FAILURE, payload: e});
  }
}

function* transferAddSaga(action: Action<TransferWithdrawRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: TRANSFER_WITHDRAW_SUCCESS, payload});

    RootNavigation.navigate('Adm', {screen: 'TransferRequestSuccess'});
  } catch (e) {
    yield put({type: TRANSFER_WITHDRAW_FAILURE, payload: e});
  }
}

export default [
  takeLatest(CUSTOMER_ACCOUNT_ADD, customerAccountAddSaga),
  takeLatest(GET_BANKS, getBanksSaga),
  takeLatest(GET_CUSTOMER_ACCOUNTS_LIST, getCustomerAccountsListSaga),
  takeLatest(TRANSFER_WITHDRAW, transferAddSaga),
];
