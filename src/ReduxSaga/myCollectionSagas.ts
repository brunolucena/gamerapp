import {call, put, takeLatest} from 'redux-saga/effects';
import {Action, ActionPayloadResponse} from '../Models/Redux';

import Api from '../Services/Api';
import {
  DeleteGamerProductCatalogRequest,
  DeleteGamerProductCatalogResponse,
  GamerProductCollectionRequest,
  GetGamerWishlistRequest,
  GetGamerWishlistResponse,
} from '../Models/GamerProductCollection';
import {
  DELETE_GAMER_PRODUCT_MY_CATALOG,
  DELETE_GAMER_PRODUCT_MY_CATALOG_FAIL,
  DELETE_GAMER_PRODUCT_MY_CATALOG_SUCCESS,
  GET_MY_COLLECTION,
  GET_MY_COLLECTION_FAIL,
  GET_MY_COLLECTION_SUCCESS,
  GET_MY_WISHLIST,
  GET_MY_WISHLIST_FAIL,
  GET_MY_WISHLIST_SUCCESS,
} from 'src/Store/Ducks/myCollection';
import {DELETE_GAMER_PRODUCT_CATALOG_SUCCESS} from 'src/Store/Ducks/gamerCollection';

function* deleteGamerProductMyCatalogSaga(
  action: Action<DeleteGamerProductCatalogRequest>,
) {
  try {
    const payload: ActionPayloadResponse<DeleteGamerProductCatalogResponse> = yield call(
      Api,
      action,
    );

    const data = action.payload.request.data;

    const gamerProductCatalogId = data?.gamerProductCatalogId || '';

    payload.data.gamerProductCatalogId = gamerProductCatalogId;

    yield put({type: DELETE_GAMER_PRODUCT_CATALOG_SUCCESS, payload});
    yield put({type: DELETE_GAMER_PRODUCT_MY_CATALOG_SUCCESS, payload});
  } catch (e) {
    yield put({type: DELETE_GAMER_PRODUCT_MY_CATALOG_FAIL, payload: e});
  }
}

function* getMyCollectionSaga(action: Action<GamerProductCollectionRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_MY_COLLECTION_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_MY_COLLECTION_FAIL, payload: e});
  }
}

function* getMyWishlistSaga(action: Action<GetGamerWishlistRequest>) {
  try {
    const payload: ActionPayloadResponse<GetGamerWishlistResponse> = yield call(
      Api,
      action,
    );

    yield put({type: GET_MY_WISHLIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_MY_WISHLIST_FAIL, payload: e});
  }
}

export default [
  takeLatest(DELETE_GAMER_PRODUCT_MY_CATALOG, deleteGamerProductMyCatalogSaga),
  takeLatest(GET_MY_COLLECTION, getMyCollectionSaga),
  takeLatest(GET_MY_WISHLIST, getMyWishlistSaga),
];
