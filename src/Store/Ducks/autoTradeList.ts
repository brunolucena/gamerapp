import {Action, ActionResponse, ActionAnyData} from '../../Models/Redux';
import {
  AutoTrade,
  GetAutoTradesListRequest,
  GetAutoTradesListResponse,
} from '../../Models/TradeRequest';

export const GET_AUTO_TRADES_LIST = 'GET_AUTO_TRADES_LIST';
export const GET_AUTO_TRADES_LIST_FAIL = 'GET_AUTO_TRADES_LIST_FAIL';
export const GET_AUTO_TRADES_LIST_SUCCESS = 'GET_AUTO_TRADES_LIST_SUCCESS';

export const REMOVE_AUTO_TRADE_FROM_LIST = 'REMOVE_AUTO_TRADE_FROM_LIST';

export const SET_AUTO_TRADE_LIST_REFRESHING = 'SET_AUTO_TRADE_LIST_REFRESHING';

export interface State {
  error: string;
  loading: boolean;
  refreshing: boolean;
  autoTradesList: AutoTrade[];
}

const initialState: State = {
  error: '',
  loading: false,
  refreshing: false,
  autoTradesList: [],
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any>,
): State {
  const {error, payload, type} = action;

  switch (type) {
    case GET_AUTO_TRADES_LIST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_AUTO_TRADES_LIST_FAIL: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: 'Não foi possível carregar as trocas automáticas',
      };
    }

    case GET_AUTO_TRADES_LIST_SUCCESS: {
      const data: GetAutoTradesListResponse = payload.data;

      const ordered = data.autoTradeRequests.sort((a, b) => {
        if (a.stars > b.stars) {
          return -1;
        } else if (a.stars < b.stars) {
          return 1;
        }

        return 0;
      });

      return {
        ...state,
        loading: false,
        refreshing: false,
        autoTradesList: ordered,
      };
    }

    case REMOVE_AUTO_TRADE_FROM_LIST: {
      const autoTradeId: string = payload.data;

      const newTradesList = state.autoTradesList.filter(
        trade => trade.autoTradeId !== autoTradeId,
      );

      return {
        ...state,
        autoTradesList: newTradesList,
      };
    }

    case SET_AUTO_TRADE_LIST_REFRESHING: {
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

export function getAutoTradesList(
  data: GetAutoTradesListRequest,
): Action<GetAutoTradesListRequest> {
  return {
    type: GET_AUTO_TRADES_LIST,
    payload: {
      request: {
        method: 'POST',
        url: '/TradeRequest/Auto/v1',
        data,
      },
    },
  };
}

export function removeAutoTradeFromList(
  autoTradeId: string,
): ActionAnyData<string> {
  return {
    type: REMOVE_AUTO_TRADE_FROM_LIST,
    payload: {
      data: autoTradeId,
    },
  };
}

export function setAutoTradeListRefreshing(
  refreshing: boolean,
): ActionAnyData<boolean> {
  return {
    type: SET_AUTO_TRADE_LIST_REFRESHING,
    payload: {
      data: refreshing,
    },
  };
}
