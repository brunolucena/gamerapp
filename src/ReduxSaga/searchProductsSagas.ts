import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {Action} from 'src/Models/ReduxModels';
import {
  WelcomeGuideProductsRequest,
  SearchProductsRequest,
} from '../Models/SearchProducts';

import {
  GET_WELCOME_GUIDE_PRODUCTS,
  GET_WELCOME_GUIDE_PRODUCTS_FAIL,
  GET_WELCOME_GUIDE_PRODUCTS_SUCCESS,
  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_FAIL,
  SEARCH_PRODUCTS_SUCCESS,
} from 'src/Store/Ducks/searchProducts';

function* getWelcomeGuideProductsSaga(
  action: Action<WelcomeGuideProductsRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_WELCOME_GUIDE_PRODUCTS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_WELCOME_GUIDE_PRODUCTS_FAIL, payload: e});
  }
}

function* searchProductsSaga(action: Action<SearchProductsRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: SEARCH_PRODUCTS_SUCCESS, payload});
  } catch (e) {
    yield put({type: SEARCH_PRODUCTS_FAIL, payload: e});
  }
}

export default [
  takeLatest(GET_WELCOME_GUIDE_PRODUCTS, getWelcomeGuideProductsSaga),
  takeLatest(SEARCH_PRODUCTS, searchProductsSaga),
];
