import {call, put, takeLatest} from 'redux-saga/effects';
import {Action} from 'src/Models/ReduxModels';
import Api from 'src/Services/Api';
import {
  GET_STORE_ORDERS,
  GET_STORE_ORDERS_FAILURE,
  GET_STORE_ORDERS_SUCCESS,
} from 'src/Store/Ducks/storeOrdersDuck';
import {GetStoreOrdersRequest} from 'src/Models/StoreOrder';

function* getStoreOrdersSaga(action: Action<GetStoreOrdersRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_STORE_ORDERS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_STORE_ORDERS_FAILURE, payload: e});
  }
}

export default [takeLatest(GET_STORE_ORDERS, getStoreOrdersSaga)];
