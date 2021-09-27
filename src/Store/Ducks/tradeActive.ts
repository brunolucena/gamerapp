import {
  TradeRequestDetails,
  TradeRequestItem,
  TradeRequestPart,
} from '../../Models/TradeRequest';
import {
  ActiveTrade,
  AddTradeItems,
  ChangeOfferedPrice,
  RemoveTradeItems,
  SelectTradeItems,
  SelectTradePart,
} from '../../Models/TradeActive';

import {
  GET_TRADE_REQUEST_DETAILS,
  SAVE_TRADE_REQUEST_SUCCESS,
} from './tradeRequestDetails';
import {
  ActionAnyData,
  ActionAnyPayload,
  ActionResponse,
} from 'src/Models/ReduxModels';

export const ADD_TRADE_ITEMS = 'ADD_TRADE_ITEMS';
export const REMOVE_TRADE_ITEMS = 'REMOVE_TRADE_ITEMS';
export const CHANGE_OFFERED_PRICE = 'CHANGE_OFFERED_PRICE';

export const CLEAR_ACTIVE_TRADE = 'CLEAR_ACTIVE_TRADE';
export const SET_ACTIVE_TRADE = 'SET_ACTIVE_TRADE';

export const SET_ACTIVE_TRADE_DETAILS_SUCCESS =
  'SET_ACTIVE_TRADE_DETAILS_SUCCESS';
export const SET_ACTIVE_TRADE_ITEMS_SUCCESS = 'SET_ACTIVE_TRADE_ITEMS_SUCCESS';
export const SET_ACTIVE_TRADE_PARTS_SUCCESS = 'SET_ACTIVE_TRADE_PARTS_SUCCESS';

export const SET_IS_MODAL_DECLINED_OPENED = 'SET_IS_MODAL_DECLINED_OPENED';

export interface State {
  error: string;
  loading: boolean;
  hasChanges: boolean;
  isModalDeclineOpened: boolean;
  activeTradeData: ActiveTrade;
  tradeDetails: TradeRequestDetails;
  tradeItems: TradeRequestItem[];
  tradeParts: TradeRequestPart[];
}

const initialState: State = {
  error: '',
  loading: false,
  hasChanges: false,
  isModalDeclineOpened: false,
  activeTradeData: {
    fromGamerId: '',
    selectedGamerProductCatalogId: '',
    toGamerId: '',
    tradeRequestId: '',
    tradeViewId: '',
    autoTradeId: '',
  },
  tradeDetails: {
    rootTradeId: '',
    status: '',
    statusId: 0,
    tradeRequestId: '',
  },
  tradeItems: [],
  tradeParts: [],
};

export default function reducer(
  state = initialState,
  action: any &
    ActionAnyPayload<
      ActiveTrade &
        TradeRequestDetails &
        TradeRequestItem[] &
        TradeRequestPart[] &
        ChangeOfferedPrice
    > &
    ActionResponse<AddTradeItems & RemoveTradeItems>,
): State {
  const {payload, type} = action;

  switch (type) {
    case ADD_TRADE_ITEMS: {
      const items: TradeRequestItem[] = payload;

      let newItems = state.tradeItems.map(tradeItem => {
        const found =
          items.findIndex(
            item => item.productCatalogId === tradeItem.productCatalogId,
          ) > -1;

        if (found) {
          tradeItem.selected = true;
        }

        return tradeItem;
      });

      return {
        ...state,
        hasChanges: true,
        tradeItems: newItems,
      };
    }

    case CHANGE_OFFERED_PRICE: {
      const {gamerId, value} = payload;

      const newTradeParts = state.tradeParts.map(tradePart => {
        if (tradePart.gamerId === gamerId) {
          tradePart.offeredPrice = value;
        }

        return tradePart;
      });

      return {
        ...state,
        hasChanges: true,
        tradeParts: newTradeParts,
      };
    }

    case CLEAR_ACTIVE_TRADE: {
      return {
        ...initialState,
      };
    }

    case GET_TRADE_REQUEST_DETAILS: {
      return {
        ...initialState,
        activeTradeData: {
          ...state.activeTradeData,
        },
      };
    }

    case REMOVE_TRADE_ITEMS: {
      const items: TradeRequestItem[] = payload;

      const newItems = state.tradeItems.map(tradeItem => {
        const found =
          items.findIndex(
            item => item.productCatalogId === tradeItem.productCatalogId,
          ) > -1;

        if (found) {
          tradeItem.selected = false;
        }

        return tradeItem;
      });

      return {
        ...state,
        hasChanges: true,
        tradeItems: newItems,
      };
    }

    case SAVE_TRADE_REQUEST_SUCCESS: {
      const {data} = payload;

      const {tradeRequestId} = data;
      const {rootTradeId} = state.tradeDetails;

      return {
        ...state,
        loading: false,
        hasChanges: false,
        activeTradeData: {
          ...state.activeTradeData,
          tradeRequestId,
        },
        tradeDetails: {
          ...state.tradeDetails,
          tradeRequestId,
          rootTradeId: rootTradeId ? rootTradeId : tradeRequestId,
        },
      };
    }

    case SET_ACTIVE_TRADE: {
      const data: ActiveTrade = payload.data;

      const {tradeDetails, tradeItems, tradeParts} = initialState;

      return {
        ...state,
        hasChanges: false,
        activeTradeData: data,
        tradeDetails,
        tradeItems,
        tradeParts,
      };
    }

    case SET_ACTIVE_TRADE_DETAILS_SUCCESS: {
      const payloadCopy = {...payload};

      return {
        ...state,
        loading: false,
        tradeDetails: payloadCopy,
      };
    }

    case SET_ACTIVE_TRADE_ITEMS_SUCCESS: {
      const payloadCopy = [...payload];

      return {
        ...state,
        loading: false,
        tradeItems: payloadCopy,
      };
    }

    case SET_ACTIVE_TRADE_PARTS_SUCCESS: {
      const payloadCopy = [...payload];

      return {
        ...state,
        loading: false,
        tradeParts: payloadCopy,
      };
    }

    case SET_IS_MODAL_DECLINED_OPENED: {
      const opened: boolean = payload.data;

      return {
        ...state,
        isModalDeclineOpened: opened,
      };
    }

    default:
      return state;
  }
}

export function addTradeItems({
  items,
}: AddTradeItems): ActionAnyPayload<TradeRequestItem[]> {
  return {
    type: ADD_TRADE_ITEMS,
    payload: items,
  };
}

export function removeTradeItems({
  items,
}: RemoveTradeItems): ActionAnyPayload<TradeRequestItem[]> {
  return {
    type: REMOVE_TRADE_ITEMS,
    payload: items,
  };
}

export function changeOfferedPrice(
  data: ChangeOfferedPrice,
): ActionAnyPayload<ChangeOfferedPrice> {
  return {
    type: CHANGE_OFFERED_PRICE,
    payload: data,
  };
}

export function setActiveTrade(data: ActiveTrade): ActionAnyData<ActiveTrade> {
  return {
    type: SET_ACTIVE_TRADE,
    payload: {
      data,
    },
  };
}

export function setIsModalDeclinedOpened(
  opened: boolean,
): ActionAnyData<boolean> {
  return {
    type: SET_IS_MODAL_DECLINED_OPENED,
    payload: {
      data: opened,
    },
  };
}

export function clearActiveTrade(): ActionAnyPayload<any> {
  return {
    type: CLEAR_ACTIVE_TRADE,
    payload: {},
  };
}

// Selectors
export function selectTradeItems({
  state,
  gamerId,
  part,
}: SelectTradeItems): TradeRequestItem[] {
  const {tradeItems} = state;

  return tradeItems.filter(tradeItem =>
    part === 'me'
      ? tradeItem.gamerId === gamerId
      : tradeItem.gamerId !== gamerId,
  );
}

export function selectTradePart({
  state,
  gamerId,
  part,
}: SelectTradePart): TradeRequestPart {
  const {tradeParts} = state;

  return (
    tradeParts.find(tradePart =>
      part === 'me'
        ? tradePart.gamerId === gamerId
        : tradePart.gamerId !== gamerId,
    ) || {
      gamerId: '',
      offeredPrice: 0,
      tradeId: '',
      gamerName: '',
      gamerRankTitle: '',
      gamerRating: 0,
      starter: false,
    }
  );
}
