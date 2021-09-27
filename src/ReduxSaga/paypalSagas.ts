import {call, put, takeLatest} from 'redux-saga/effects';

import * as RootNavigation from '../Screens/RootNavigation';

import Api from '../Services/Api';
import {
  GET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN_FAILURE,
  GET_ACCESS_TOKEN_SUCCESS,
  PAYPAL_PAYMENT,
  PAYPAL_PAYMENT_EXECUTE,
  PAYPAL_PAYMENT_EXECUTE_FAILURE,
  PAYPAL_PAYMENT_EXECUTE_SUCCESS,
  PAYPAL_PAYMENT_FAILURE,
  PAYPAL_PAYMENT_SUCCESS,
} from 'src/Store/Ducks/paypalDuck';
import {
  ExecutePaymentRequest,
  GetAccessTokenRequest,
  PaymentRequest,
} from 'src/Models/PayPal';
import {Action} from 'src/Models/ReduxModels';
import {Toast} from 'src/Models/Toast';
import {INSERT_TOAST_TO_QUEUE} from 'src/Store/Ducks/toastDucks';

function* getAccessTokenSaga(action: Action<GetAccessTokenRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_ACCESS_TOKEN_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_ACCESS_TOKEN_FAILURE, payload: e});

    RootNavigation.navigate('OrderRequest');

    const data: Toast = {
      message:
        'Houve um erro ao iniciar o pagamento. Por favor tente novamente.',
      type: 'error',
    };

    yield put({type: INSERT_TOAST_TO_QUEUE, payload: {data}});
  }
}

function* paypalPaymentSaga(action: Action<PaymentRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: PAYPAL_PAYMENT_SUCCESS, payload});
  } catch (e) {
    yield put({type: PAYPAL_PAYMENT_FAILURE, payload: e});

    const data: Toast = {
      message:
        'Houve um erro ao iniciar o pagamento. Por favor tente novamente.',
      type: 'error',
    };

    yield put({type: INSERT_TOAST_TO_QUEUE, payload: {data}});

    RootNavigation.navigate('OrderRequest');
  }
}

function* paypalPaymentExecuteSaga(action: Action<ExecutePaymentRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: PAYPAL_PAYMENT_EXECUTE_SUCCESS, payload});
  } catch (e) {
    yield put({type: PAYPAL_PAYMENT_EXECUTE_FAILURE, payload: e});

    const data: Toast = {
      message:
        'Houve um erro ao concluir o pagamento. Por favor tente novamente.',
      type: 'error',
    };

    yield put({type: INSERT_TOAST_TO_QUEUE, payload: {data}});

    RootNavigation.navigate('OrderRequest');
  }
}

export default [
  takeLatest(GET_ACCESS_TOKEN, getAccessTokenSaga),
  takeLatest(PAYPAL_PAYMENT, paypalPaymentSaga),
  takeLatest(PAYPAL_PAYMENT_EXECUTE, paypalPaymentExecuteSaga),
];
