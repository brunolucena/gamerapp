import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {
  GET_AVAILABLE_GAMER_PRODUCTS_CATALOG,
  GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_FAIL,
  GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_SUCCESS,
  GET_AVAILABLE_STORE_PRODUCTS_CATALOG,
  GET_AVAILABLE_STORE_PRODUCTS_CATALOG_FAIL,
  GET_AVAILABLE_STORE_PRODUCTS_CATALOG_SUCCESS,
  GET_PRODUCTS_IN_WISHLIST,
  GET_PRODUCTS_IN_WISHLIST_FAIL,
  GET_PRODUCTS_IN_WISHLIST_SUCCESS,
} from 'src/Store/Ducks/productDetails';

import {Action} from '../Models/Redux';
import {GetAvailableGamerProductsCatalogRequest} from '../Models/Product';
import {GetProductsInWishListRequest} from 'src/Store/Ducks/wishlistDuck';

function* getAvailableGamerProductsCatalogSaga(
  action: Action<GetAvailableGamerProductsCatalogRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_FAIL, payload: e});
  }
}

function* getAvailableStoreProductsCatalogSaga(
  action: Action<GetAvailableGamerProductsCatalogRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_AVAILABLE_STORE_PRODUCTS_CATALOG_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_AVAILABLE_STORE_PRODUCTS_CATALOG_FAIL, payload: e});
  }
}

function* getProductsInWishlistSaga(
  action: Action<GetProductsInWishListRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_PRODUCTS_IN_WISHLIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_PRODUCTS_IN_WISHLIST_FAIL, payload: e});
  }
}

export default [
  takeLatest(
    GET_AVAILABLE_GAMER_PRODUCTS_CATALOG,
    getAvailableGamerProductsCatalogSaga,
  ),
  takeLatest(
    GET_AVAILABLE_STORE_PRODUCTS_CATALOG,
    getAvailableStoreProductsCatalogSaga,
  ),
  takeLatest(GET_PRODUCTS_IN_WISHLIST, getProductsInWishlistSaga),
];
