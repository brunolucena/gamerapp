import {call, put, takeLatest} from 'redux-saga/effects';
import {GetConversationRequest, SendMessageRequest} from '../Models/Chat';
import {Action} from '../Models/Redux';

import Api from '../Services/Api';
import {
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAILURE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  GET_CONVERSATION,
  REFRESH_CONVERSATION,
  SEND_MESSAGE,
} from 'src/Store/Ducks/chat';

function* getConversationSaga(action: Action<GetConversationRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: GET_CONVERSATION_SUCCESS, payload});
  } catch (e) {
    yield put({type: GET_CONVERSATION_FAILURE, payload: e});
  }
}

function* sendMessageSaga(action: Action<SendMessageRequest>) {
  try {
    const payload = yield call(Api, action);

    yield put({type: SEND_MESSAGE_SUCCESS, payload});
  } catch (e) {
    yield put({type: SEND_MESSAGE_FAILURE, payload: e});
  }
}

export default [
  takeLatest(GET_CONVERSATION, getConversationSaga),
  takeLatest(REFRESH_CONVERSATION, getConversationSaga),
  takeLatest(SEND_MESSAGE, sendMessageSaga),
];
