import {
  TradesRequestListItem,
  GetTradesRequestListRequest,
  GetTradesRequestListResponse,
} from '../../Models/TradeRequest';
import {Action, ActionResponse, ActionAnyData} from 'src/Models/ReduxModels';

export const ADD_TRADE_REQUEST_TO_LIST = 'ADD_TRADE_REQUEST_TO_LIST';

export const GET_TRADES_REQUEST_LIST = 'GET_TRADES_REQUEST_LIST';
export const GET_TRADES_REQUEST_LIST_FAIL = 'GET_TRADES_REQUEST_LIST_FAIL';
export const GET_TRADES_REQUEST_LIST_SUCCESS =
  'GET_TRADES_REQUEST_LIST_SUCCESS';

export const REMOVE_TRADE_REQUEST_FROM_LIST = 'REMOVE_TRADE_REQUEST_FROM_LIST';

export const SET_TRADES_REQUEST_LIST_REFRESHING =
  'SET_TRADES_REQUEST_LIST_REFRESHING';

export interface State {
  error: string;
  loading: boolean;
  loaded: boolean;
  refreshing: boolean;
  tradesList: TradesRequestListItem[];
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
    case ADD_TRADE_REQUEST_TO_LIST: {
      const data: TradesRequestListItem = payload.data;

      return {
        ...state,
        tradesList: data ? [data, ...state.tradesList] : state.tradesList,
      };
    }

    case GET_TRADES_REQUEST_LIST:
      return {
        ...state,
        loading: true,
      };

    case GET_TRADES_REQUEST_LIST_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        refreshing: false,
        error: error
          ? error.data
          : 'Não foi possível carregar a lista de trocas',
      };

    case GET_TRADES_REQUEST_LIST_SUCCESS: {
      const data: GetTradesRequestListResponse = payload.data;

      return {
        ...state,
        loading: false,
        loaded: true,
        refreshing: false,
        tradesList: data.tradeRequests,
      };
    }

    case REMOVE_TRADE_REQUEST_FROM_LIST: {
      const tradeRequestId: string = payload.data;

      const newTradesList = state.tradesList.filter(
        trade => trade.tradeRequestId !== tradeRequestId,
      );

      return {
        ...state,
        tradesList: newTradesList,
      };
    }

    case SET_TRADES_REQUEST_LIST_REFRESHING: {
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

export function getTradesRequestList(
  data: GetTradesRequestListRequest,
): Action<GetTradesRequestListRequest> {
  return {
    type: GET_TRADES_REQUEST_LIST,
    payload: {
      request: {
        method: 'POST',
        url: '/TradeRequest/GetRequests/v1',
        data,
      },
    },
  };
}

export function removeTradeRequestFromList(
  tradeRequestId: string,
): ActionAnyData<string> {
  return {
    type: REMOVE_TRADE_REQUEST_FROM_LIST,
    payload: {
      data: tradeRequestId,
    },
  };
}

// Selectors
export function setTradesRequestListRefreshing(
  refreshing: boolean,
): ActionAnyData<boolean> {
  return {
    type: SET_TRADES_REQUEST_LIST_REFRESHING,
    payload: {
      data: refreshing,
    },
  };
}
