import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import {Action} from 'src/Models/ReduxModels';

import {
  DeleteProductRequest,
  EditProductDetailsRequest,
  GetProductDetailsRequest,
} from 'src/Models/EditProductModels';

import {
  DELETE_PRODUCT,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_DETAILS,
  EDIT_PRODUCT_DETAILS_FAILURE,
  EDIT_PRODUCT_DETAILS_SUCCESS,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_DETAILS_FAILURE,
  GET_PRODUCT_DETAILS_SUCCESS,
} from 'src/Store/Ducks/editProductDuck';
import {
  SELLER_DELETE_PRODUCT,
  SELLER_UPDATE_PRODUCT,
  SellerDeleteProduct,
  SellerUpdateProduct,
} from 'src/Store/Ducks/sellerDucks';

function* deleteProductSaga(action: Action<DeleteProductRequest>) {
  try {
    const {data} = action.payload.request;

    const payload = yield call(Api, action);

    yield put({type: DELETE_PRODUCT_SUCCESS, payload});

    if (data) {
      const deleteFromList: SellerDeleteProduct = {
        type: SELLER_DELETE_PRODUCT,
        payload: {
          storeProductCatalogId: data.storeProductCatalogId,
        },
      };

      yield put(deleteFromList);
    }
  } catch (e) {
    yield put({type: DELETE_PRODUCT_FAILURE, payload: e});
  }
}

function* editProductDetailsSaga(action: Action<EditProductDetailsRequest>) {
  try {
    const {data} = action.payload.request;

    const payload = yield call(Api, action);

    yield put({type: EDIT_PRODUCT_DETAILS_SUCCESS, payload});

    if (data) {
      const updateProductDetails: SellerUpdateProduct = {
        type: SELLER_UPDATE_PRODUCT,
        payload: data,
      };

      yield put(updateProductDetails);
    }
  } catch (e) {
    yield put({type: EDIT_PRODUCT_DETAILS_FAILURE, payload: e});
  }
}

function* getProductDetailsSaga(action: Action<GetProductDetailsRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_PRODUCT_DETAILS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_PRODUCT_DETAILS_FAILURE, payload: e});
  }
}

export default [
  takeLatest(DELETE_PRODUCT, deleteProductSaga),
  takeLatest(EDIT_PRODUCT_DETAILS, editProductDetailsSaga),
  takeLatest(GET_PRODUCT_DETAILS, getProductDetailsSaga),
];
