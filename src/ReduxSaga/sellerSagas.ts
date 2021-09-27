import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {
  GET_MY_STORE_PRODUCTS,
  GET_MY_STORE_PRODUCTS_FAILURE,
  GET_MY_STORE_PRODUCTS_SUCCESS,
  GET_SELLER_PRODUCTS,
  GET_SELLER_PRODUCTS_FAILURE,
  GET_SELLER_PRODUCTS_SUCCESS,
  SELLER_UPDATE_PICTURE,
  SELLER_UPDATE_PICTURE_FAILURE,
  SELLER_UPDATE_PICTURE_SUCCESS,
} from 'src/Store/Ducks/sellerDucks';
import {Action} from 'src/Models/ReduxModels';
import {
  GetSellerProductsRequest,
  SellerUpdatePictureRequest,
  StoreAddProductRequest,
} from 'src/Models/Seller';
import {
  SELLER_ADD_PRODUCT,
  SELLER_ADD_PRODUCT_FAIL,
  SELLER_ADD_PRODUCT_SUCCESS,
} from 'src/Store/Ducks/sellerAddProduct';

import * as NavigationService from '../Screens/RootNavigation';

function* getMyStoreProductsSaga(action: Action<GetSellerProductsRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_MY_STORE_PRODUCTS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_MY_STORE_PRODUCTS_FAILURE, payload: e});
  }
}

function* getSellerProductsSaga(action: Action<GetSellerProductsRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_SELLER_PRODUCTS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_SELLER_PRODUCTS_FAILURE, payload: e});
  }
}

function* sellerAddProductSaga(action: Action<StoreAddProductRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: SELLER_ADD_PRODUCT_SUCCESS, payload});

    NavigationService.navigate('SellProductSuccess');
  } catch (e) {
    yield put({type: SELLER_ADD_PRODUCT_FAIL, payload: e});
  }
}

function* sellerUpdatePictureSaga(action: Action<SellerUpdatePictureRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: SELLER_UPDATE_PICTURE_SUCCESS, payload});
  } catch (e) {
    yield put({type: SELLER_UPDATE_PICTURE_FAILURE, payload: e});
  }
}

export default [
  takeLatest(GET_MY_STORE_PRODUCTS, getMyStoreProductsSaga),
  takeLatest(GET_SELLER_PRODUCTS, getSellerProductsSaga),
  takeLatest(SELLER_ADD_PRODUCT, sellerAddProductSaga),
  takeLatest(SELLER_UPDATE_PICTURE, sellerUpdatePictureSaga),
];
