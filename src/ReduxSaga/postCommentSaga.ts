import {call, put, takeLatest} from 'redux-saga/effects';
import {
  CommentReactionRequest,
  CommentReactionResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  LoadPostCommentsRequest,
  LoadPostCommentsResponse,
  SendCommentRequest,
  SendCommentResponse,
} from 'src/Models/Comment';
import {Action, ActionPayloadResponse} from 'src/Models/ReduxModels';
import Api from 'src/Services/Api';
import {
  COMMENT_REACTION,
  COMMENT_REACTION_FAILURE,
  COMMENT_REACTION_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  LOAD_POST_COMMENTS,
  LOAD_POST_COMMENTS_FAILURE,
  LOAD_POST_COMMENTS_SUCCESS,
  SEND_COMMENT,
  SEND_COMMENT_FAILURE,
  SEND_COMMENT_SUCCESS,
} from 'src/Store/Ducks/postCommentDuck';

function* loadCommentsSaga(action: Action<LoadPostCommentsRequest>) {
  try {
    const payload: ActionPayloadResponse<LoadPostCommentsResponse> = yield call(
      Api,
      action,
    );

    yield put({type: LOAD_POST_COMMENTS_SUCCESS, payload});
  } catch (e) {
    yield put({type: LOAD_POST_COMMENTS_FAILURE, payload: e});
  }
}

function* sendCommentSaga(action: Action<SendCommentRequest>) {
  try {
    const payload: ActionPayloadResponse<SendCommentResponse> = yield call(
      Api,
      action,
    );

    yield put({type: SEND_COMMENT_SUCCESS, payload});
  } catch (e) {
    yield put({type: SEND_COMMENT_FAILURE, payload: e});
  }
}

function* deleteCommentSaga(action: Action<DeleteCommentRequest>) {
  try {
    const payload: ActionPayloadResponse<DeleteCommentResponse> = yield call(
      Api,
      action,
    );

    yield put({type: DELETE_COMMENT_SUCCESS, payload});
  } catch (e) {
    yield put({type: DELETE_COMMENT_FAILURE, payload: e});
  }
}

function* commentReactionSaga(action: Action<CommentReactionRequest>) {
  try {
    const payload: ActionPayloadResponse<CommentReactionResponse> = yield call(
      Api,
      action,
    );

    yield put({type: COMMENT_REACTION_SUCCESS, payload});
  } catch (e) {
    yield put({type: COMMENT_REACTION_FAILURE, payload: e});
  }
}

export default [
  takeLatest(LOAD_POST_COMMENTS, loadCommentsSaga),
  takeLatest(SEND_COMMENT, sendCommentSaga),
  takeLatest(DELETE_COMMENT, deleteCommentSaga),
  takeLatest(COMMENT_REACTION, commentReactionSaga),
];
