import {ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';
import {
  ChangeTradeRequestStatus,
  GetTradeRequestDetailsRequest,
  SaveTradeRequestRequest,
  SaveTradeRequestResponse,
  TradeRequestDetails,
  TradeRequestItem,
  TradeRequestPart,
} from '../../Models/TradeRequest';

export const CLEAR_ACTIVE_TRADE_REQUEST_DATA =
  'CLEAR_ACTIVE_TRADE_REQUEST_DATA';

export const ACCEPT_TRADE_REQUEST = 'ACCEPT_TRADE_REQUEST';
export const ACCEPT_TRADE_REQUEST_FAILURE = 'ACCEPT_TRADE_REQUEST_FAILURE';
export const ACCEPT_TRADE_REQUEST_SUCCESS = 'ACCEPT_TRADE_REQUEST_SUCCESS';

export const GET_TRADE_REQUEST_DETAILS = 'GET_TRADE_REQUEST_DETAILS';
export const GET_TRADE_REQUEST_DETAILS_FAILURE =
  'GET_TRADE_REQUEST_DETAILS_FAILURE';
export const GET_TRADE_REQUEST_DETAILS_SUCCESS =
  'GET_TRADE_REQUEST_DETAILS_SUCCESS';

export const GET_TRADE_REQUEST_ITEMS_SUCCESS =
  'GET_TRADE_REQUEST_ITEMS_SUCCESS';

export const GET_TRADE_REQUEST_PARTS_SUCCESS =
  'GET_TRADE_REQUEST_PARTS_SUCCESS';

export const SAVE_TRADE_REQUEST = 'SAVE_TRADE_REQUEST';
export const SAVE_TRADE_REQUEST_FAILURE = 'SAVE_TRADE_REQUEST_FAILURE';
export const SAVE_TRADE_REQUEST_SUCCESS = 'SAVE_TRADE_REQUEST_SUCCESS';

export const SET_ACTIVE_TRADE_REQUEST_DATA = 'SET_ACTIVE_TRADE_REQUEST_DATA';

export interface AcceptTradeRequest {
  type: typeof ACCEPT_TRADE_REQUEST;
  payload: ActionPayload<ChangeTradeRequestStatus>;
}
export interface AcceptTradeRequestFailure {
  type: typeof ACCEPT_TRADE_REQUEST_FAILURE;
  payload: BaseErrorResponse;
}
export interface AcceptTradeRequestSuccess {
  type: typeof ACCEPT_TRADE_REQUEST_SUCCESS;
  payload: BaseResponse<any>;
}

export interface GetTradeRequestDetails {
  type: typeof GET_TRADE_REQUEST_DETAILS;
  payload: ActionPayload<GetTradeRequestDetailsRequest>;
}
export interface GetTradeRequestDetailsFailure {
  type: typeof GET_TRADE_REQUEST_DETAILS_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetTradeRequestDetailsSuccess {
  type: typeof GET_TRADE_REQUEST_DETAILS_SUCCESS;
  payload: TradeRequestDetails;
}

export interface GetTradeRequestItemsSuccess {
  type: typeof GET_TRADE_REQUEST_ITEMS_SUCCESS;
  payload: TradeRequestItem[];
}

export interface GetTradeRequestPartsSuccess {
  type: typeof GET_TRADE_REQUEST_PARTS_SUCCESS;
  payload: TradeRequestPart[];
}

export interface SaveTradeRequest {
  type: typeof SAVE_TRADE_REQUEST;
  payload: ActionPayload<SaveTradeRequestRequest>;
}
export interface SaveTradeRequestFailure {
  type: typeof SAVE_TRADE_REQUEST_FAILURE;
  payload: BaseErrorResponse;
}
export interface SaveTradeRequestSuccess {
  type: typeof SAVE_TRADE_REQUEST_SUCCESS;
  payload: BaseResponse<SaveTradeRequestResponse>;
}

export type Actions =
  | AcceptTradeRequest
  | AcceptTradeRequestFailure
  | AcceptTradeRequestSuccess
  | GetTradeRequestDetails
  | GetTradeRequestDetailsFailure
  | GetTradeRequestDetailsSuccess
  | GetTradeRequestItemsSuccess
  | GetTradeRequestPartsSuccess
  | SaveTradeRequest
  | SaveTradeRequestFailure
  | SaveTradeRequestSuccess;

export interface State {
  error: string;
  loading: boolean;
  tradeDetails: TradeRequestDetails;
  tradeItems: TradeRequestItem[];
  tradeParts: TradeRequestPart[];
}

const initialState: State = {
  error: '',
  loading: false,
  tradeDetails: {
    rootTradeId: '',
    status: '',
    statusId: 0,
    tradeRequestId: '',
  },
  tradeItems: [],
  tradeParts: [],
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ACCEPT_TRADE_REQUEST:
      return {
        ...initialState,
        loading: true,
      };

    case ACCEPT_TRADE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Não foi possível aceitar a proposta',
      };

    case ACCEPT_TRADE_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case GET_TRADE_REQUEST_DETAILS:
      return {
        ...initialState,
        loading: true,
      };

    case GET_TRADE_REQUEST_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Não foi possível carregar a Trade',
      };

    case GET_TRADE_REQUEST_DETAILS_SUCCESS: {
      const p = action.payload;

      return {
        ...state,
        loading: false,
        tradeDetails: p,
      };
    }

    case GET_TRADE_REQUEST_ITEMS_SUCCESS: {
      const p = action.payload;

      return {
        ...state,
        loading: false,
        tradeItems: p,
      };
    }

    case GET_TRADE_REQUEST_PARTS_SUCCESS: {
      const p = action.payload;

      return {
        ...state,
        loading: false,
        tradeParts: p,
      };
    }

    case SAVE_TRADE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SAVE_TRADE_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'Não foi possível salvar a Trade Request',
      };

    case SAVE_TRADE_REQUEST_SUCCESS: {
      const {data} = action.payload;

      const {tradeRequestId} = data;
      const {rootTradeId} = state.tradeDetails;

      return {
        ...state,
        loading: false,
        tradeDetails: {
          ...state.tradeDetails,
          tradeRequestId,
          rootTradeId: rootTradeId ? rootTradeId : tradeRequestId,
        },
      };
    }

    default:
      return state;
  }
}

export function changeTradeRequestStatus(
  data: ChangeTradeRequestStatus,
): AcceptTradeRequest {
  return {
    type: ACCEPT_TRADE_REQUEST,
    payload: {
      request: {
        method: 'POST',
        url: 'TradeRequest/ChangeStatus/v1',
        data,
      },
    },
  };
}

export function getTradeRequestDetails(
  data: GetTradeRequestDetailsRequest,
): GetTradeRequestDetails {
  return {
    type: GET_TRADE_REQUEST_DETAILS,
    payload: {
      request: {
        method: 'POST',
        url: 'TradeRequest/Details/v1',
        data,
      },
    },
  };
}

export function saveTradeRequest(
  data: SaveTradeRequestRequest,
): SaveTradeRequest {
  return {
    type: SAVE_TRADE_REQUEST,
    payload: {
      request: {
        method: 'POST',
        url: 'TradeRequest/SendRequest/v2',
        data,
      },
    },
  };
}
