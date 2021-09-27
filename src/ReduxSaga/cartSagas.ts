import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import * as RootNavigation from '../Screens/RootNavigation';

import {
  GET_POSTOFFICE_SHIPPING,
  GET_POSTOFFICE_SHIPPING_FAILURE,
  GET_POSTOFFICE_SHIPPING_SUCCESS,
  MY_ORDER_ADD_NEW,
  MY_ORDER_ADD_NEW_FAILURE,
  MY_ORDER_ADD_NEW_SUCCESS,
} from 'src/Store/Ducks/cartDuck';
import {
  GetPostOfficeShippingRequest,
  MyOrderAddNewRequest,
} from 'src/Models/MyOrder';
import {Action} from 'src/Models/ReduxModels';

function* getPostOfficeShippingSaga(
  action: Action<GetPostOfficeShippingRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_POSTOFFICE_SHIPPING_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_POSTOFFICE_SHIPPING_FAILURE, payload: e});
  }
}

function* myOrderAddNewSaga(action: Action<MyOrderAddNewRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: MY_ORDER_ADD_NEW_SUCCESS, payload});

    RootNavigation.navigate('OrderRequestSuccess');
  } catch (e) {
    yield put({type: MY_ORDER_ADD_NEW_FAILURE, payload: e});

    RootNavigation.navigate('OrderRequestSuccess');
  }
}

export default [
  takeLatest(GET_POSTOFFICE_SHIPPING, getPostOfficeShippingSaga),
  takeLatest(MY_ORDER_ADD_NEW, myOrderAddNewSaga),
];
