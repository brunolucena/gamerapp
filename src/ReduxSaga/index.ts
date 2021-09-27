import autoTradeListSagas from './autoTradeListSagas';
import bankAccountSagas from './bankAccountSagas';
import cartSagas from './cartSagas';
import chatSagas from './chatSagas';
import couponSagas from './couponSagas';
import customerAccountSagas from './customerAccountSagas';
import dashboardSagas from './dashboardSagas';
import dashboardV3Sagas from './dashboardV3Sagas';
import editProductSagas from './editProductSagas';
import feedSaga from './feedSaga';
import gamerCollectionSagas from './gamerCollectionSagas';
import gamerProductSagas from './gamerProductSagas';
import gamerSagas from './gamerSagas';
import levelUpSagas from './levelUpSagas';
import loginSagas from './login';
import myCollectionSagas from './myCollectionSagas';
import myOrderSaga from './myOrderSaga';
import notificationSagas from './notificationSagas';
import paypalSagas from './paypalSagas';
import platformSaga from './platformsSaga';
import postCommentRepliesSaga from './postCommentRepliesSaga';
import postCommentSaga from './postCommentSaga';
import posTradeSagas from './posTradeSagas';
import postSagas from './postSagas';
import productDetailsSagas from './productDetails';
import rankingSagas from './rankingSagas';
import registerStoreSagas from './registerStoreSagas';
import searchProductsSagas from './searchProductsSagas';
import sellerOrderSagas from './sellerOrderSagas';
import sellerSagas from './sellerSagas';
import signupSagas from './signup';
import storeOrdersSagas from './storeOrdersSagas';
import tagSaga from './tagSaga';
import toastSagas from './toastSagas';
import tradeDetailsSagas from './tradeDetailsSagas';
import tradesListSagas from './tradesList';
import userAddressSagas from './userAddressSagas';
import userSagas from './userSagas';
import {all} from 'redux-saga/effects';

const mySaga = function* rootSaga() {
  yield all([
    ...autoTradeListSagas,
    ...bankAccountSagas,
    ...cartSagas,
    ...chatSagas,
    ...couponSagas,
    ...customerAccountSagas,
    ...dashboardSagas,
    ...dashboardV3Sagas,
    ...editProductSagas,
    ...feedSaga,
    ...gamerCollectionSagas,
    ...gamerProductSagas,
    ...gamerSagas,
    ...levelUpSagas,
    ...loginSagas,
    ...myCollectionSagas,
    ...myOrderSaga,
    ...notificationSagas,
    ...paypalSagas,
    ...platformSaga,
    ...posTradeSagas,
    ...postCommentRepliesSaga,
    ...postCommentSaga,
    ...postSagas,
    ...productDetailsSagas,
    ...rankingSagas,
    ...registerStoreSagas,
    ...searchProductsSagas,
    ...sellerOrderSagas,
    ...sellerSagas,
    ...signupSagas,
    ...storeOrdersSagas,
    ...tagSaga,
    ...toastSagas,
    ...tradeDetailsSagas,
    ...tradesListSagas,
    ...userAddressSagas,
    ...userSagas,
  ]);
};

export default mySaga;
