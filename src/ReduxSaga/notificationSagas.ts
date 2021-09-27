import {put, takeLatest} from 'redux-saga/effects';
import {ActionAnyData} from 'src/Models/ReduxModels';

import * as RootNavigation from '../Screens/RootNavigation';

import {
  NOTIFICATION_CHAT,
  NOTIFICATION_COUPONS_LIST,
  NOTIFICATION_DELIVERY_STATUS_UPDATE,
  NOTIFICATION_INTERESTING_PRODUCT,
  NOTIFICATION_LEVEL_UP,
  NOTIFICATION_NEW_AUTO_TRADE,
  NOTIFICATION_NEW_ORDER,
  NOTIFICATION_NEW_TRADE_REQUEST,
  NOTIFICATION_ORDER_STATUS_CHANGE,
  NOTIFICATION_TRADE_REQUEST_ACCEPTED,
  NotificationChat,
  NotificationCouponsList,
  NotificationDeliveryStatusUpdate,
  NotificationInterestingProduct,
  NotificationLevelUp,
  NotificationNewAutoTrade,
  NotificationNewOrder,
  NotificationNewTradeRequest,
  NotificationOrderStatusChange,
  NotificationTradeRequestAccepted,
} from 'src/Store/Ducks/notificationDuck';
import {SET_POS_TRADE_ID, SetPosTradeId} from 'src/Store/Ducks/tradeDetails';
import {
  SET_ACTIVE_GAMER_PRODUCT_DETAILS,
  SetActiveGamerProductDetails,
} from 'src/Store/Ducks/gamerProductDetailsDuck';
import {SET_LEVEL_UP_DATA, SetLevelUpData} from 'src/Store/Ducks/levelUpDuck';
import {ActiveTrade} from 'src/Models/TradeActive';
import {SET_ACTIVE_TRADE} from 'src/Store/Ducks/tradeActive';
import {
  SET_STORE_ORDER_DATA,
  SetStoreOrderData,
} from 'src/Store/Ducks/storeOrdersDuck';
import {
  SET_ACTIVE_MY_ORDER_ID,
  SetActiveMyOrderId,
} from 'src/Store/Ducks/myOrderDuck';

function* notificationChatSaga(action: NotificationChat) {
  try {
    const data: SetPosTradeId = {
      payload: action.payload.chatId,
      type: SET_POS_TRADE_ID,
    };

    yield put(data);

    RootNavigation.navigate('Chat');
  } catch (e) {}
}

function* notificationCouponsListSaga(action: NotificationCouponsList) {
  try {
    RootNavigation.navigate('CouponsList');
  } catch (e) {}
}

function* notificationDeliveryStatusUpdateSaga(
  action: NotificationDeliveryStatusUpdate,
) {
  try {
    const data: SetPosTradeId = {
      payload: action.payload.tradeId,
      type: SET_POS_TRADE_ID,
    };

    yield put(data);

    RootNavigation.navigate('PosTrade', {screen: 'PosTradeActionsNavigator'});
  } catch (e) {}
}

function* notificationInterestingProductSaga(
  action: NotificationInterestingProduct,
) {
  try {
    const data: SetActiveGamerProductDetails = {
      payload: {
        catalogId: action.payload.catalogId,
        catalogType: 2,
        gamerId: action.gamerId,
        id: action.payload.ownerId,
      },
      type: SET_ACTIVE_GAMER_PRODUCT_DETAILS,
    };

    yield put(data);

    RootNavigation.navigate('GamerProductGamer', {
      screen: 'GamerProductGamerDetails',
    });
  } catch (e) {}
}

function* notificationLevelUpSaga(action: NotificationLevelUp) {
  try {
    const data: SetLevelUpData = {
      payload: {
        backToRoute: 'Home',
        ...action.payload,
      },
      type: SET_LEVEL_UP_DATA,
    };

    yield put(data);

    RootNavigation.navigate('LevelUp');
  } catch (e) {}
}

function* notificationNewAutoTradeSaga(action: NotificationNewAutoTrade) {
  try {
    const data: ActionAnyData<ActiveTrade> = {
      type: SET_ACTIVE_TRADE,
      payload: {
        data: {
          selectedGamerProductCatalogId: '',
          tradeRequestId: '',
          ...action.payload,
        },
      },
    };

    yield put(data);

    RootNavigation.navigate('TradeRequest');
  } catch (e) {}
}

function* notificationNewOrderSaga(action: NotificationNewOrder) {
  try {
    const data: SetStoreOrderData = {
      type: SET_STORE_ORDER_DATA,
      payload: {
        activeStoreOrder: action.payload.order,
      },
    };

    yield put(data);

    RootNavigation.navigate('StoreOrder', {screen: 'StoreOrderDetails'});
  } catch (e) {}
}

function* notificationNewTradeRequestSaga(action: NotificationNewTradeRequest) {
  try {
    const data: ActionAnyData<ActiveTrade> = {
      type: SET_ACTIVE_TRADE,
      payload: {
        data: {
          autoTradeId: '',
          selectedGamerProductCatalogId: '',
          ...action.payload,
        },
      },
    };

    yield put(data);

    RootNavigation.navigate('TradeRequest');
  } catch (e) {}
}

function* notificationOrderStatusChangeSaga(
  action: NotificationOrderStatusChange,
) {
  try {
    const data: SetActiveMyOrderId = {
      type: SET_ACTIVE_MY_ORDER_ID,
      payload: {myOrderId: action.payload.myOrderId},
    };

    yield put(data);

    RootNavigation.navigate('MyOrder', {screen: 'MyOrderDetails'});
  } catch (e) {}
}

function* notificationTradeRequestAcceptedSaga(
  action: NotificationTradeRequestAccepted,
) {
  try {
    const data: SetPosTradeId = {
      type: SET_POS_TRADE_ID,
      payload: action.payload.tradeId,
    };

    yield put(data);

    RootNavigation.navigate('PosTrade', {screen: 'PosTradeActionsNavigator'});
  } catch (e) {}
}

export default [
  takeLatest(NOTIFICATION_CHAT, notificationChatSaga),
  takeLatest(NOTIFICATION_COUPONS_LIST, notificationCouponsListSaga),
  takeLatest(
    NOTIFICATION_DELIVERY_STATUS_UPDATE,
    notificationDeliveryStatusUpdateSaga,
  ),
  takeLatest(
    NOTIFICATION_INTERESTING_PRODUCT,
    notificationInterestingProductSaga,
  ),
  takeLatest(NOTIFICATION_LEVEL_UP, notificationLevelUpSaga),
  takeLatest(NOTIFICATION_NEW_AUTO_TRADE, notificationNewAutoTradeSaga),
  takeLatest(NOTIFICATION_NEW_ORDER, notificationNewOrderSaga),
  takeLatest(NOTIFICATION_NEW_TRADE_REQUEST, notificationNewTradeRequestSaga),
  takeLatest(
    NOTIFICATION_ORDER_STATUS_CHANGE,
    notificationOrderStatusChangeSaga,
  ),
  takeLatest(
    NOTIFICATION_TRADE_REQUEST_ACCEPTED,
    notificationTradeRequestAcceptedSaga,
  ),
];
