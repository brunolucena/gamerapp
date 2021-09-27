import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';

import {
  GET_GAMER_PRODUCT_DETAILS,
  GET_GAMER_PRODUCT_DETAILS_SUCCESS,
  GET_GAMER_PRODUCT_DETAILS_FAILURE,
} from 'src/Store/Ducks/gamerProductDetailsDuck';
import {Action} from 'src/Models/ReduxModels';
import {GetGamerProductDetailsRequest} from 'src/Models/GamerProductDetails';

function* getGamerProductDetailsSaga(
  action: Action<GetGamerProductDetailsRequest>,
) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_GAMER_PRODUCT_DETAILS_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_GAMER_PRODUCT_DETAILS_FAILURE, payload: e});
  }
}

export default [
  takeLatest(GET_GAMER_PRODUCT_DETAILS, getGamerProductDetailsSaga),
];
