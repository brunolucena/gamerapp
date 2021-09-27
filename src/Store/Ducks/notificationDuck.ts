import {MyOrderInfo} from 'src/Models/StoreOrder';

export const NOTIFICATION_CHAT = 'NOTIFICATION_CHAT';
export const NOTIFICATION_COUPONS_LIST = 'NOTIFICATION_COUPONS_LIST';
export const NOTIFICATION_DELIVERY_STATUS_UPDATE =
  'NOTIFICATION_DELIVERY_STATUS_UPDATE';
export const NOTIFICATION_INTERESTING_PRODUCT =
  'NOTIFICATION_INTERESTING_PRODUCT';
export const NOTIFICATION_LEVEL_UP = 'NOTIFICATION_LEVEL_UP';
export const NOTIFICATION_NEW_AUTO_TRADE = 'NOTIFICATION_NEW_AUTO_TRADE';
export const NOTIFICATION_NEW_ORDER = 'NOTIFICATION_NEW_ORDER';
export const NOTIFICATION_NEW_TRADE_REQUEST = 'NOTIFICATION_NEW_TRADE_REQUEST';
export const NOTIFICATION_ORDER_STATUS_CHANGE =
  'NOTIFICATION_ORDER_STATUS_CHANGE';
export const NOTIFICATION_TRADE_REQUEST_ACCEPTED =
  'NOTIFICATION_TRADE_REQUEST_ACCEPTED';

type types =
  | typeof NOTIFICATION_CHAT
  | typeof NOTIFICATION_COUPONS_LIST
  | typeof NOTIFICATION_DELIVERY_STATUS_UPDATE
  | typeof NOTIFICATION_INTERESTING_PRODUCT
  | typeof NOTIFICATION_LEVEL_UP
  | typeof NOTIFICATION_NEW_AUTO_TRADE
  | typeof NOTIFICATION_NEW_ORDER
  | typeof NOTIFICATION_NEW_TRADE_REQUEST
  | typeof NOTIFICATION_ORDER_STATUS_CHANGE
  | typeof NOTIFICATION_TRADE_REQUEST_ACCEPTED;

export interface NotificationChat {
  gamerId: string;
  type: typeof NOTIFICATION_CHAT;
  payload: {chatId: string};
}

export interface NotificationCouponsList {
  gamerId: string;
  type: typeof NOTIFICATION_COUPONS_LIST;
  payload: {};
}

export interface NotificationDeliveryStatusUpdate {
  gamerId: string;
  type: typeof NOTIFICATION_DELIVERY_STATUS_UPDATE;
  payload: {tradeId: string};
}

export interface NotificationInterestingProduct {
  gamerId: string;
  type: typeof NOTIFICATION_INTERESTING_PRODUCT;
  payload: {
    catalogId: string;
    ownerId: string;
  };
}

export interface NotificationLevelUp {
  gamerId: string;
  type: typeof NOTIFICATION_LEVEL_UP;
  payload: {
    achievementRankId: string;
    experiencePointsNeeded: number;
    levelUp: boolean;
    nextRankTitle: string;
    nextRankUrl: string;
    rankImageUrl: string;
    rankTitle: string;
    totalExperiencePoints: number;
  };
}

export interface NotificationNewAutoTrade {
  gamerId: string;
  type: typeof NOTIFICATION_NEW_AUTO_TRADE;
  payload: {
    fromGamerId: string;
    toGamerId: string;
    autoTradeId: string;
    tradeViewId: string;
  };
}

export interface NotificationNewOrder {
  gamerId: string;
  type: typeof NOTIFICATION_NEW_ORDER;
  payload: {
    order: MyOrderInfo;
  };
}

export interface NotificationNewTradeRequest {
  gamerId: string;
  type: typeof NOTIFICATION_NEW_TRADE_REQUEST;
  payload: {
    fromGamerId: string;
    toGamerId: string;
    tradeRequestId: string;
    tradeViewId: string;
  };
}

export interface NotificationOrderStatusChange {
  gamerId: string;
  type: typeof NOTIFICATION_ORDER_STATUS_CHANGE;
  payload: {
    myOrderId: string;
  };
}

export interface NotificationTradeRequestAccepted {
  gamerId: string;
  type: typeof NOTIFICATION_TRADE_REQUEST_ACCEPTED;
  payload: {
    tradeId: string;
  };
}

export type NotificationPayloads =
  | NotificationChat
  | NotificationCouponsList
  | NotificationDeliveryStatusUpdate
  | NotificationInterestingProduct
  | NotificationLevelUp
  | NotificationNewAutoTrade
  | NotificationNewOrder
  | NotificationNewTradeRequest
  | NotificationOrderStatusChange
  | NotificationTradeRequestAccepted;

export interface State {
  error: string;
  loaded: boolean;
  loading: boolean;
  type: types | '';
  payload: any;
}

export const initialState: State = {
  error: '',
  loaded: false,
  loading: false,
  type: '',
  payload: {},
};

export default function reducer(
  state = initialState,
  action: NotificationPayloads,
): State {
  switch (action.type) {
    default:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
  }
}

export function handleNotification(
  data: any,
  type: types,
  gamerId: string,
): NotificationPayloads {
  return {
    type,
    payload: data,
    gamerId,
  };
}
