import {Action, ActionAnyData, ActionResponse} from '../../Models/Redux';
import {
  GetTradesListRequest,
  GetTradesListResponse,
  TradesListItem,
  SetTradeListStatus,
} from '../../Models/TradeRequest';

export const ADD_TRADE_TO_LIST = 'ADD_TRADE_TO_LIST';

export const GET_TRADES_LIST = 'GET_TRADES_LIST';
export const GET_TRADES_LIST_FAIL = 'GET_TRADES_LIST_FAIL';
export const GET_TRADES_LIST_SUCCESS = 'GET_TRADES_LIST_SUCCESS';

export const SET_TRADES_LIST_REFRESHING = 'SET_TRADES_LIST_REFRESHING';
export const SET_TRADE_LIST_STATUS = 'SET_TRADE_LIST_STATUS';

export interface State {
  error: string;
  loading: boolean;
  loaded: boolean;
  refreshing: boolean;
  tradesList: TradesListItem[];
}

const initialState: State = {
  error: '',
  loading: false,
  loaded: false,
  refreshing: false,
  tradesList: [],
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any>,
): State {
  const {error, payload, type} = action;

  switch (type) {
    case ADD_TRADE_TO_LIST: {
      const data: TradesListItem = payload.data;

      return {
        ...state,
        tradesList: data ? [data, ...state.tradesList] : state.tradesList,
      };
    }

    case GET_TRADES_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_TRADES_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        refreshing: false,
        error: error
          ? error.data
          : 'Não foi possível carregar a lista de trocas',
      };
    }

    case GET_TRADES_LIST_SUCCESS: {
      const data: GetTradesListResponse = payload.data;

      return {
        ...state,
        loading: false,
        loaded: true,
        refreshing: false,
        tradesList: data.trades,
      };
    }

    case SET_TRADE_LIST_STATUS: {
      const {tradesList} = state;
      const data: SetTradeListStatus = payload.data;

      const newTradesList = tradesList.map(trade => {
        if (trade.tradeId === data.tradeId) {
          trade.status = data.status;
        }

        return trade;
      });

      return {
        ...state,
        tradesList: newTradesList,
      };
    }

    case SET_TRADES_LIST_REFRESHING: {
      const data: boolean = payload.data;

      return {
        ...state,
        refreshing: data,
      };
    }

    default:
      return state;
  }
}

export function getTradesList(
  data: GetTradesListRequest,
): Action<GetTradesListRequest> {
  return {
    type: GET_TRADES_LIST,
    payload: {
      request: {
        method: 'POST',
        url: '/Trade/List/v1',
        data,
      },
    },
  };
}

export function setTradesListRefreshing(
  refreshing: boolean,
): ActionAnyData<boolean> {
  return {
    type: SET_TRADES_LIST_REFRESHING,
    payload: {
      data: refreshing,
    },
  };
}
