import {
  ChatMessage,
  GetConversationRequest,
  GetConvesationResponse as GetConversationResponse,
  SendMessageRequest,
  SendMessageResponse,
} from '../../Models/Chat';
import {SET_POS_TRADE_ID, SetPosTradeId} from './tradeDetails';
import {ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';

export const GET_CONVERSATION = 'GET_CONVERSATION';
export const GET_CONVERSATION_FAILURE = 'GET_CONVERSATION_FAILURE';
export const GET_CONVERSATION_SUCCESS = 'GET_CONVERSATION_SUCESS';

export const REFRESH_CONVERSATION = 'REFRESH_CONVERSATION';

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';

export const SET_CHAT_REFRESHING = 'SET_CHAT_REFRESHING';

export interface GetConversation {
  type: typeof GET_CONVERSATION | typeof REFRESH_CONVERSATION;
  payload: ActionPayload<GetConversationRequest>;
}
export interface GetConversationFailure {
  type: typeof GET_CONVERSATION_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetConversationSuccess {
  type: typeof GET_CONVERSATION_SUCCESS;
  payload: BaseResponse<GetConversationResponse>;
}

export interface SendMessage {
  type: typeof SEND_MESSAGE;
  payload: ActionPayload<SendMessageRequest>;
}
export interface SendMessageFailure {
  type: typeof SEND_MESSAGE_FAILURE;
  payload: BaseErrorResponse;
}
export interface SendMessageSuccess {
  type: typeof SEND_MESSAGE_SUCCESS;
  payload: BaseResponse<SendMessageResponse>;
}

export interface SetChatRefreshing {
  type: typeof SET_CHAT_REFRESHING;
  payload: {data: boolean};
}

export type Actions =
  | GetConversation
  | GetConversationFailure
  | GetConversationSuccess
  | SendMessage
  | SendMessageFailure
  | SendMessageSuccess
  | SetChatRefreshing
  | SetPosTradeId;

export interface State {
  error: string;
  loading: boolean;
  refreshing: boolean;
  messages: ChatMessage[];
  totalItems: number;
  totalPages: number;
}

const chatInitialState: State = {
  error: '',
  loading: false,
  refreshing: false,
  messages: [],
  totalItems: 0,
  totalPages: 0,
};

export default function reducer(
  state = chatInitialState,
  action: Actions,
): State {
  switch (action.type) {
    case SEND_MESSAGE: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEND_MESSAGE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível enviar a mensagem',
      };
    }
    case SEND_MESSAGE_SUCCESS: {
      const {data} = action.payload;

      return {
        ...state,
        loading: false,
        messages: [...state.messages, data],
      };
    }

    case SET_CHAT_REFRESHING: {
      const {data} = action.payload;

      return {
        ...state,
        refreshing: data,
      };
    }

    case GET_CONVERSATION: {
      return {
        ...state,
        loading: true,
        messages: [],
      };
    }
    case GET_CONVERSATION_FAILURE: {
      return {
        ...state,
        loading: false,
        refreshing: false,
      };
    }
    case GET_CONVERSATION_SUCCESS: {
      const {data} = action.payload;

      const {messages, totalItems, totalPages} = data;

      const orderedMessages = messages.sort((a, b) => {
        if (a.date > b.date) {
          return 1;
        } else if (a.date < b.date) {
          return -1;
        } else {
          return 0;
        }
      });

      return {
        ...state,
        loading: false,
        refreshing: false,
        messages: orderedMessages,
        totalItems,
        totalPages,
      };
    }

    case REFRESH_CONVERSATION: {
      return {
        ...state,
        loading: true,
      };
    }

    case SET_POS_TRADE_ID: {
      return {
        ...state,
        messages: [],
      };
    }

    default:
      return state;
  }
}

export function getConversation(
  data: GetConversationRequest,
  clearMessages = true,
): GetConversation {
  return {
    type: clearMessages ? GET_CONVERSATION : REFRESH_CONVERSATION,
    payload: {
      request: {
        method: 'POST',
        url: 'Chat/GetConversation/v1',
        data,
      },
    },
  };
}

export function sendMessage(data: SendMessageRequest): SendMessage {
  return {
    type: SEND_MESSAGE,
    payload: {
      request: {
        method: 'POST',
        url: 'Chat/SendMessage/v1',
        data,
      },
    },
  };
}

export function setChatRefreshing(refreshing: boolean): SetChatRefreshing {
  return {
    type: SET_CHAT_REFRESHING,
    payload: {
      data: refreshing,
    },
  };
}
