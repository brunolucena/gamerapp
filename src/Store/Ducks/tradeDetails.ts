import {
  Action,
  ActionAnyPayload,
  ActionResponse,
  ActionAnyData,
} from '../../Models/Redux';
import {
  GetTradeDetailsRequest,
  SelectPosTradeItems,
  SelectPosTradePart,
  SetDeliveryStatusRequest,
  SetDeliveryStatusResponse,
  SetTradeRatingRequest,
  SetTradeRatingResponse,
  TradeDeliveryHistory,
  TradeDetails,
  TradeDetailsItem,
  TradeDetailsPart,
  TradeRatingHistory,
} from '../../Models/Trade';

export const CLEAR_PENDING = 'CLEAR_PENDING';
export const CLEAR_TRADE = 'CLEAR_TRADE';
export const SET_POS_TRADE_ID = 'SET_POS_TRADE_ID';

export const GET_TRADE_DETAILS = 'GET_TRADE_DETAILS';
export const GET_TRADE_DETAILS_SUCCESS = 'GET_TRADE_DETAILS_SUCCESS';
export const GET_TRADE_DETAILS_FAILURE = 'GET_TRADE_DETAILS_FAILURE';

export const GET_TRADE_DETAILS_PART_SUCCESS = 'GET_TRADE_DETAILS_PART_SUCCESS';
export const GET_TRADE_DETAILS_ITEMS_SUCCESS = 'GET_TRADE_DETAILS_ITEM_SUCCESS';

export const SET_DELIVERY_STATUS = 'SET_DELIVERY_STATUS';
export const SET_DELIVERY_STATUS_SUCCESS = 'SET_DELIVERY_STATUS_SUCCESS';
export const SET_DELIVERY_STATUS_FAILURE = 'SET_DELIVERY_STATUS_FAILURE';

export const SET_TRADE_DETAILS_REFRESHING = 'SET_TRADE_DETAILS_REFRESHING';

export const SET_TRADE_RATING = 'SET_TRADE_RATING';
export const SET_TRADE_RATING_SUCCESS = 'SET_TRADE_RATING_SUCCESS';
export const SET_TRADE_RATING_FAILURE = 'SET_TRADE_RATING_FAILURE';

export interface SetPosTradeId {
  type: typeof SET_POS_TRADE_ID;
  payload: string;
}

export interface State {
  error: string;
  loading: boolean;
  refreshing: boolean;
  activeTradeId: string;
  pending: '' | 'tudo' | 'entregar' | 'receber' | 'nada' | 'otherPart';
  tradeDetails: TradeDetails;
  tradeItems: TradeDetailsItem[];
  tradeParts: TradeDetailsPart[];
}

const initialState: State = {
  error: '',
  loading: false,
  refreshing: false,
  activeTradeId: '',
  pending: '',
  tradeDetails: {
    deliveryHistory: [],
    ratings: [],
    tradeId: '',
  },
  tradeItems: [],
  tradeParts: [],
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any> | any,
): State {
  const {error, payload, type} = action;

  switch (type) {
    case CLEAR_PENDING:
      return {
        ...state,
        pending: '',
      };

    case CLEAR_TRADE:
      return initialState;

    case GET_TRADE_DETAILS:
      return {
        ...state,
        loading: true,
      };

    case GET_TRADE_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: error ? error.data : 'Não foi possível carregar a Trade',
      };

    case GET_TRADE_DETAILS_SUCCESS: {
      const data: TradeDetails = payload;

      return {
        ...state,
        loading: false,
        refreshing: false,
        activeTradeId: data.tradeId,
        tradeDetails: data,
      };
    }

    case GET_TRADE_DETAILS_ITEMS_SUCCESS: {
      const data: TradeDetailsItem[] = payload;

      return {
        ...state,
        loading: false,
        tradeItems: data,
      };
    }

    case GET_TRADE_DETAILS_PART_SUCCESS: {
      const data: TradeDetailsPart[] = payload;

      return {
        ...state,
        loading: false,
        tradeParts: data,
      };
    }

    case SET_DELIVERY_STATUS:
      return {
        ...state,
        loading: true,
      };

    case SET_DELIVERY_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case SET_DELIVERY_STATUS_SUCCESS: {
      const d: SetDeliveryStatusResponse = payload.data;

      const {deliveryHistory: DeliveryHistory, gamerId: GamerId} = d;

      const pending = selectPartPendingDeliveryHistory(
        DeliveryHistory,
        GamerId,
        'me',
      );

      return {
        ...state,
        loading: false,
        pending,
        tradeDetails: {
          ...state.tradeDetails,
          deliveryHistory: d.deliveryHistory,
        },
      };
    }

    case SET_POS_TRADE_ID: {
      const p: string = payload;

      return {
        ...state,
        activeTradeId: p,
      };
    }

    case SET_TRADE_DETAILS_REFRESHING: {
      const data: boolean = payload.data;

      return {
        ...state,
        refreshing: data,
      };
    }

    case SET_TRADE_RATING:
      return {
        ...state,
        loading: true,
      };

    case SET_TRADE_RATING_FAILURE:
      return {
        ...state,
        loading: false,
        error:
          error && error.data
            ? error.data
            : 'Não foi possível salvar a Trade Request',
      };

    case SET_TRADE_RATING_SUCCESS: {
      const d: SetTradeRatingResponse = payload.data;

      return {
        ...state,
        loading: false,
        tradeDetails: {
          ...state.tradeDetails,
          ratings: d.ratingHistory,
        },
      };
    }

    default:
      return state;
  }
}

export function clearPending(): ActionAnyPayload<any> {
  return {
    type: CLEAR_PENDING,
    payload: {},
  };
}

export function clearTrade(): ActionAnyPayload<any> {
  return {
    type: CLEAR_TRADE,
    payload: {},
  };
}

export function setPosTradeId(tradeId: string): SetPosTradeId {
  return {
    type: SET_POS_TRADE_ID,
    payload: tradeId,
  };
}

export function getTradeDetails(
  data: GetTradeDetailsRequest,
): Action<GetTradeDetailsRequest> {
  return {
    type: GET_TRADE_DETAILS,
    payload: {
      request: {
        method: 'POST',
        url: 'Trade/Details/v1',
        data,
      },
    },
  };
}

export function setTradeRating(
  data: SetTradeRatingRequest,
): Action<SetTradeRatingRequest> {
  return {
    type: SET_TRADE_RATING,
    payload: {
      request: {
        method: 'POST',
        url: 'Trade/Rating/v1',
        data,
      },
    },
  };
}

export function setTradeDeliveryStatus(
  data: SetDeliveryStatusRequest,
): Action<SetDeliveryStatusRequest> {
  return {
    type: SET_DELIVERY_STATUS,
    payload: {
      request: {
        method: 'POST',
        url: 'Trade/DeliveryStatus/v1',
        data,
      },
    },
  };
}

// Selectors
export function selectIsTradeCompleted(
  history: TradeDeliveryHistory[],
): boolean {
  if (!history) {
    return false;
  }

  const placeholder = history[0];

  if (!placeholder) {
    return false;
  }

  const history1 = history.filter(h => h.gamerId === placeholder.gamerId);
  const history2 = history.filter(h => h.gamerId !== placeholder.gamerId);

  const history1Entregues = history1.filter(h => h.status === 'Entregue');
  const history1Recebidos = history1.filter(h => h.status === 'Recebido');

  const history2Entregues = history2.filter(h => h.status === 'Entregue');
  const history2Recebidos = history2.filter(h => h.status === 'Recebido');

  const history1Ok =
    history1Entregues.length >= 1 && history1Recebidos.length >= 1;
  const history2Ok =
    history2Entregues.length >= 1 && history2Recebidos.length >= 1;

  return history1Ok && history2Ok;
}

export function selectTradeDeliveryHistory(
  state: State,
  gamerId: string,
  part: 'me' | 'other',
): TradeDeliveryHistory[] {
  const {deliveryHistory: DeliveryHistory} = state.tradeDetails;

  if (!DeliveryHistory) {
    return [];
  }

  const myDeliveryHistory = DeliveryHistory.filter(d => d.gamerId === gamerId);
  const otherDeliveryHistory = DeliveryHistory.filter(
    d => d.gamerId !== gamerId,
  );

  const deliveryHistory =
    part === 'me' ? myDeliveryHistory : otherDeliveryHistory;

  return deliveryHistory;
}

export function selectPartPendingDeliveryHistory(
  deliveryHistory: TradeDeliveryHistory[],
  gamerId: string,
  part: 'me' | 'other',
): '' | 'tudo' | 'entregar' | 'receber' | 'nada' | 'otherPart' {
  const history = deliveryHistory.filter(d =>
    part === 'me' ? d.gamerId === gamerId : d.gamerId !== gamerId,
  );

  const otherPartHistory = deliveryHistory.filter(d =>
    part === 'me' ? d.gamerId !== gamerId : d.gamerId === gamerId,
  );

  if (history.length === 2) {
    if (otherPartHistory.length === 2) {
      return '';
    } else {
      return 'otherPart';
    }
  } else if (history.length === 0) {
    return 'tudo';
  }

  if (history[0].status === 'Entregue') {
    return 'receber';
  } else if (history[0].status === 'Recebido') {
    return 'entregar';
  }

  return '';
}

export function selectPartDelivery(
  deliveryHistory: TradeDeliveryHistory[],
): TradeDeliveryHistory | undefined {
  const delivered = deliveryHistory.find(d => d.status === 'Entregue');

  return delivered;
}

export function selectPartReceive(
  deliveryHistory: TradeDeliveryHistory[],
): TradeDeliveryHistory | undefined {
  const received = deliveryHistory.find(d => d.status === 'Recebido');

  return received;
}

export function selectTradeRating(
  state: State,
  gamerId: string,
  part: 'me' | 'other',
): TradeRatingHistory | undefined {
  const {ratings: RatingHistory} = state.tradeDetails;

  if (!RatingHistory) {
    return;
  }

  const myRating = RatingHistory.find(r => r.gamerId === gamerId);
  const otherRating = RatingHistory.find(r => r.gamerId !== gamerId);

  const rating = part === 'me' ? myRating : otherRating;

  return rating;
}

export function selectPosTradeItems({
  state,
  gamerId,
  part,
}: SelectPosTradeItems): TradeDetailsItem[] {
  const {tradeItems} = state;

  return tradeItems.filter(tradeItem =>
    part === 'me'
      ? tradeItem.gamerId === gamerId
      : tradeItem.gamerId !== gamerId,
  );
}

export function selectPosTradePart({
  state,
  gamerId,
  part,
}: SelectPosTradePart): TradeDetailsPart {
  const {tradeParts} = state;

  return (
    tradeParts.find(tradePart =>
      part === 'me'
        ? tradePart.gamerId === gamerId
        : tradePart.gamerId !== gamerId,
    ) || {
      gamerId: '',
      gamerName: '',
      gamerRankTitle: '',
      gamerRating: 0,
      hasSeenTradeCompleted: false,
      offeredPrice: 0,
      tradeId: '',
      imageUrl: '',
    }
  );
}

export function setTradeDetailsRefreshing(
  refreshing: boolean,
): ActionAnyData<boolean> {
  return {
    type: SET_TRADE_DETAILS_REFRESHING,
    payload: {
      data: refreshing,
    },
  };
}
