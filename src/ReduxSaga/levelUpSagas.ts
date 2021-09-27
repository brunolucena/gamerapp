import {call, put, takeLatest} from 'redux-saga/effects';

import Api from '../Services/Api';
import * as NavigationService from '../Screens/RootNavigation';

import {LevelUpRequest, LevelUpResponse} from '../Models/LevelUpModels';
import {
  LEVEL_UP,
  LEVEL_UP_FAILURE,
  LEVEL_UP_SUCCESS,
} from 'src/Store/Ducks/levelUpDuck';
import {Action, ActionPayloadResponse} from 'src/Models/ReduxModels';
import {ADD_PRODUCT_TO_GAMER_COLLECTION_SUCCESS} from 'src/Store/Ducks/gamerCollection';
import {
  SET_TRADE_RATING_SUCCESS,
  SET_DELIVERY_STATUS_SUCCESS,
} from 'src/Store/Ducks/tradeDetails';
import {CREATE_STORE_SUCCESS} from 'src/Store/Ducks/registerStore';
import {
  ACCEPT_TRADE_REQUEST_SUCCESS,
  SAVE_TRADE_REQUEST_SUCCESS,
} from 'src/Store/Ducks/tradeRequestDetails';
import {ADD_QUICK_PRODUCTS_SUCCESS} from 'src/Store/Ducks/gamer';
import {EDIT_PRODUCT_DETAILS_SUCCESS} from 'src/Store/Ducks/editProductDuck';
import {MY_ORDER_ADD_NEW_SUCCESS} from 'src/Store/Ducks/cartDuck';
import {SELLER_ADD_PRODUCT_SUCCESS} from 'src/Store/Ducks/sellerAddProduct';
import {SELLER_UPDATE_PICTURE_SUCCESS} from 'src/Store/Ducks/sellerDucks';
import {CHANGE_MY_ORDER_STATUS_SUCCESS} from 'src/Store/Ducks/sellerOrderDuck';
import {
  EDIT_PROFILE_SUCCESS,
  SET_PROFILE_PICTURE_SUCCESS,
} from 'src/Store/Ducks/user';
import {SAVE_USER_ADDRESS_SUCCESS} from 'src/Store/Ducks/userAddress';

function* levelUpSagas(action: Action<LevelUpRequest>) {
  try {
    const payload: ActionPayloadResponse<LevelUpResponse> = yield call(
      Api,
      action,
    );

    const {levelUp} = payload.data;

    yield put({type: LEVEL_UP_SUCCESS, payload});

    if (levelUp) {
      NavigationService.navigate('LevelUp');
    }
  } catch (e) {
    yield put({type: LEVEL_UP_FAILURE, payload: e});
  }
}

export default [
  takeLatest(
    [
      ACCEPT_TRADE_REQUEST_SUCCESS,
      ADD_PRODUCT_TO_GAMER_COLLECTION_SUCCESS,
      ADD_QUICK_PRODUCTS_SUCCESS,
      CHANGE_MY_ORDER_STATUS_SUCCESS,
      CREATE_STORE_SUCCESS,
      EDIT_PRODUCT_DETAILS_SUCCESS,
      EDIT_PROFILE_SUCCESS,
      LEVEL_UP,
      MY_ORDER_ADD_NEW_SUCCESS,
      SAVE_TRADE_REQUEST_SUCCESS,
      SAVE_USER_ADDRESS_SUCCESS,
      SELLER_ADD_PRODUCT_SUCCESS,
      SELLER_UPDATE_PICTURE_SUCCESS,
      SET_DELIVERY_STATUS_SUCCESS,
      SET_PROFILE_PICTURE_SUCCESS,
      SET_TRADE_RATING_SUCCESS,
    ],
    levelUpSagas,
  ),
];
