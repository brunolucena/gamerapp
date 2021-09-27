import {call, put, takeLatest} from 'redux-saga/effects';
import { Action, ActionPayloadResponse } from 'src/Models/ReduxModels';

import Api from '../Services/Api';
import * as NavigationService from '../Screens/RootNavigation';

import {
  AddProductToCollectionRequest,
  AddProductToCollectionResponse,
  DeleteGamerProductCatalogImageRequest,
  DeleteGamerProductCatalogImageResponse,
  DeleteGamerProductCatalogRequest,
  DeleteGamerProductCatalogResponse,
  GamerProductCollectionRequest,
  GetGamerProductCatalogDetailsRequest,
  GetGamerProductCatalogDetailsResponse,
  GetGamerWishlistRequest,
  GetGamerWishlistResponse,
} from '../Models/GamerProductCollection';
import {
  ADD_PRODUCT_TO_GAMER_COLLECTION,
  ADD_PRODUCT_TO_GAMER_COLLECTION_FAIL,
  ADD_PRODUCT_TO_GAMER_COLLECTION_SUCCESS,
  DELETE_GAMER_PRODUCT_CATALOG,
  DELETE_GAMER_PRODUCT_CATALOG_FAIL,
  DELETE_GAMER_PRODUCT_CATALOG_IMAGE,
  DELETE_GAMER_PRODUCT_CATALOG_IMAGE_FAIL,
  DELETE_GAMER_PRODUCT_CATALOG_IMAGE_SUCCESS,
  DELETE_GAMER_PRODUCT_CATALOG_SUCCESS,
  GET_GAMER_COLLECTION,
  GET_GAMER_COLLECTION_FAIL,
  GET_GAMER_COLLECTION_SUCCESS,
  GET_GAMER_PRODUCT_CATALOG_DETAILS,
  GET_GAMER_PRODUCT_CATALOG_DETAILS_FAIL,
  GET_GAMER_PRODUCT_CATALOG_DETAILS_SUCCESS,
  GET_GAMER_WISHLIST,
  GET_GAMER_WISHLIST_FAIL,
  GET_GAMER_WISHLIST_SUCCESS,
} from 'src/Store/Ducks/gamerCollection';
import {
  DELETE_GAMER_PRODUCT_MY_CATALOG_SUCCESS,
  UPDATE_COLLECTION_ACCESSORIES,
  UPDATE_COLLECTION_GAMES,
  UPDATE_COLLECTION_PLATFORMS,
} from 'src/Store/Ducks/myCollection';

function* addProductToCollectionSaga(
  action: Action<AddProductToCollectionRequest>,
) {
  try {
    const payload: ActionPayloadResponse<AddProductToCollectionResponse> = yield call(
      Api,
      action,
    );

    const {acessory, experiencePoints, game, platform} = payload.data;

    if (game) {
      yield put({type: UPDATE_COLLECTION_GAMES, payload: {data: game}});
    } else if (acessory) {
      yield put({
        type: UPDATE_COLLECTION_ACCESSORIES,
        payload: {data: acessory},
      });
    } else if (platform) {
      yield put({type: UPDATE_COLLECTION_PLATFORMS, payload: {data: platform}});
    }

    yield put({type: ADD_PRODUCT_TO_GAMER_COLLECTION_SUCCESS, payload});

    NavigationService.navigate('MyCollection');
  } catch (e) {
    yield put({type: ADD_PRODUCT_TO_GAMER_COLLECTION_FAIL, payload: e});
  }
}

function* deleteGamerProductCatalogImageSaga(
  action: Action<DeleteGamerProductCatalogImageRequest>,
) {
  try {
    const payload: ActionPayloadResponse<DeleteGamerProductCatalogImageResponse> = yield call(
      Api,
      action,
    );

    yield put({type: DELETE_GAMER_PRODUCT_CATALOG_IMAGE_SUCCESS, payload});
  } catch (e) {
    yield put({type: DELETE_GAMER_PRODUCT_CATALOG_IMAGE_FAIL, payload: e});
  }
}

function* deleteGamerProductCatalogSaga(
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
    yield put({type: DELETE_GAMER_PRODUCT_CATALOG_FAIL, payload: e});
  }
}

function* getGamerCollectionSaga(
  action: Action<GamerProductCollectionRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_GAMER_COLLECTION_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_GAMER_COLLECTION_FAIL, payload: e});
  }
}

function* getGamerProductCatalogDetailsSaga(
  action: Action<GetGamerProductCatalogDetailsRequest>,
) {
  try {
    const payload: ActionPayloadResponse<GetGamerProductCatalogDetailsResponse> = yield call(
      Api,
      action,
    );

    yield put({type: GET_GAMER_PRODUCT_CATALOG_DETAILS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_GAMER_PRODUCT_CATALOG_DETAILS_FAIL, payload: e});
  }
}

function* getGamerWishlistSaga(action: Action<GetGamerWishlistRequest>) {
  try {
    const payload: ActionPayloadResponse<GetGamerWishlistResponse> = yield call(
      Api,
      action,
    );

    yield put({type: GET_GAMER_WISHLIST_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_GAMER_WISHLIST_FAIL, payload: e});
  }
}

export default [
  takeLatest(ADD_PRODUCT_TO_GAMER_COLLECTION, addProductToCollectionSaga),
  takeLatest(
    DELETE_GAMER_PRODUCT_CATALOG_IMAGE,
    deleteGamerProductCatalogImageSaga,
  ),
  takeLatest(DELETE_GAMER_PRODUCT_CATALOG, deleteGamerProductCatalogSaga),
  takeLatest(GET_GAMER_COLLECTION, getGamerCollectionSaga),
  takeLatest(
    GET_GAMER_PRODUCT_CATALOG_DETAILS,
    getGamerProductCatalogDetailsSaga,
  ),
  takeLatest(GET_GAMER_WISHLIST, getGamerWishlistSaga),
];
