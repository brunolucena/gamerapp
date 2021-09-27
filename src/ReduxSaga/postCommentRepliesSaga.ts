import Api from 'src/Services/Api';
import {Action, ActionPayloadResponse} from 'src/Models/ReduxModels';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  LoadCommentRepliesRequest,
  LoadCommentRepliesResponse,
  SendCommentRequest,
  SendCommentResponse,
} from 'src/Models/Comment';
import {
  LOAD_COMMENT_REPLIES,
  LOAD_COMMENT_REPLIES_FAILURE,
  LOAD_COMMENT_REPLIES_SUCCESS,
  SEND_COMMENT_REPLY,
  SEND_COMMENT_REPLY_FAILURE,
  SEND_COMMENT_REPLY_SUCCESS,
} from 'src/Store/Ducks/postCommentReplyDuck';

function* loadCommentRepliesSaga(action: Action<LoadCommentRepliesRequest>) {
  try {
    const payload: ActionPayloadResponse<
      LoadCommentRepliesResponse
    > = yield call(Api, action);

    yield put({type: LOAD_COMMENT_REPLIES_SUCCESS, payload});
  } catch (e) {
    yield put({type: LOAD_COMMENT_REPLIES_FAILURE, payload: e});
  }
}

function* sendCommentReplySaga(action: Action<SendCommentRequest>) {
  try {
    const payload: ActionPayloadResponse<SendCommentResponse> = yield call(
      Api,
      action,
    );

    yield put({type: SEND_COMMENT_REPLY_SUCCESS, payload});
  } catch (e) {
    yield put({type: SEND_COMMENT_REPLY_FAILURE, payload: e});
  }
}

export default [
  takeLatest(LOAD_COMMENT_REPLIES, loadCommentRepliesSaga),
  takeLatest(SEND_COMMENT_REPLY, sendCommentReplySaga),
];
