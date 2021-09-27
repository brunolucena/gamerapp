import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import { Action } from 'src/Models/ReduxModels';
import {AddQuickProductRequest, SetDeviceTokenRequest} from '../Models/Gamer';

import {
  ADD_QUICK_PRODUCTS,
  ADD_QUICK_PRODUCTS_FAIL,
  ADD_QUICK_PRODUCTS_SUCCESS,
  SET_DEVICE_TOKEN,
  SET_DEVICE_TOKEN_FAIL,
  SET_DEVICE_TOKEN_SUCCESS,
} from 'src/Store/Ducks/gamer';
import { GET_MY_COLLECTION, GetMyCollecion, GetMyWishlist, GET_MY_WISHLIST } from 'src/Store/Ducks/myCollection';

function* addQuickProductsSaga(action: Action<AddQuickProductRequest>) {
  try {
    const payload = yield call(Api, action);

    const products = action.payload.request.data?.products;
    const type = action.payload.request.data?.type;

    const product = products ? products[0] : null;

    yield put({type: ADD_QUICK_PRODUCTS_SUCCESS, payload: {data: product}});

    const gamerId = action.payload.request.data?.gamerId;

    if (gamerId) {
      if (type === "catalog") {
        const getMyCollection: GetMyCollecion = {
          type: GET_MY_COLLECTION,
          payload: {
            request: {
              method: 'POST',
              url: '/Gamer/MyCollection/v1',
              data: {gamerId},
            },
          },
        };

        yield put(getMyCollection);
      } else if (type === "wishlist") {
        const getMyWishlist: GetMyWishlist = {
          type: GET_MY_WISHLIST,
          payload: {
            request: {
              method: 'POST',
              url: '/Gamer/WishList/v1',
              data: {gamerId},
            },
          },
        };

        yield put(getMyWishlist);
      }

    }
  } catch (e) {
    yield put({type: ADD_QUICK_PRODUCTS_FAIL, payload: e});
  }
}

function* setDeviceTokenSaga(action: Action<SetDeviceTokenRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: SET_DEVICE_TOKEN_SUCCESS, payload});
  } catch (e) {
    yield put({type: SET_DEVICE_TOKEN_FAIL, payload: e});
  }
}

export default [
  takeLatest(ADD_QUICK_PRODUCTS, addQuickProductsSaga),
  takeLatest(SET_DEVICE_TOKEN, setDeviceTokenSaga),
];
