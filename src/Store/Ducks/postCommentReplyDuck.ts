import {
  Comment,
  LoadCommentRepliesRequest,
  LoadCommentRepliesResponse,
  SendCommentRequest,
  SendCommentResponse,
} from 'src/Models/Comment';
import {
  ActionPayload,
  BaseErrorResponse,
  BaseResponse,
} from 'src/Models/ReduxModels';

export const LOAD_COMMENT_REPLIES = 'LOAD_COMMENT_REPLIES';
export const LOAD_COMMENT_REPLIES_SUCCESS = 'LOAD_COMMENT_REPLIES_SUCCESS';
export const LOAD_COMMENT_REPLIES_FAILURE = 'LOAD_COMMENT_REPLIES_FAILURE';

export const SEND_COMMENT_REPLY = 'SEND_COMMENT_REPLY';
export const SEND_COMMENT_REPLY_SUCCESS = 'SEND_COMMENT_REPLY_SUCCESS';
export const SEND_COMMENT_REPLY_FAILURE = 'SEND_COMMENT_REPLY_FAILURE';

export interface LoadCommentReplies {
  type: typeof LOAD_COMMENT_REPLIES;
  payload: ActionPayload<LoadCommentRepliesRequest>;
}

export interface LoadCommentRepliesSuccess {
  type: typeof LOAD_COMMENT_REPLIES_SUCCESS;
  payload: BaseResponse<LoadCommentRepliesResponse>;
}

export interface LoadCommentRepliesFailure {
  type: typeof LOAD_COMMENT_REPLIES_FAILURE;
  payload: BaseErrorResponse;
}

export interface SendCommentReply {
  type: typeof SEND_COMMENT_REPLY;
  payload: ActionPayload<SendCommentRequest>;
  gamerName: string;
  gamerImageUrl: string;
}

export interface SendCommentReplySuccess {
  type: typeof SEND_COMMENT_REPLY_SUCCESS;
  payload: BaseResponse<SendCommentResponse>;
}

export interface SendCommentReplyFailure {
  type: typeof SEND_COMMENT_REPLY_FAILURE;
  payload: BaseErrorResponse;
}

export type PostCommentRepliesActions =
  | LoadCommentReplies
  | LoadCommentRepliesSuccess
  | LoadCommentRepliesFailure
  | SendCommentReply
  | SendCommentReplySuccess
  | SendCommentReplyFailure;

export interface PostCommentRepliesState {
  error: string;
  loaded: boolean;
  loading: boolean;
  count: number;
  comments: Comment[];
}

export const initialState: PostCommentRepliesState = {
  comments: [],
  count: 0,
  error: '',
  loaded: false,
  loading: false,
};
export default function reducer(
  state = initialState,
  action: PostCommentRepliesActions,
): PostCommentRepliesState {
  switch (action.type) {
    case LOAD_COMMENT_REPLIES:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
        comments: action.payload.request.data?.page == 1 ? [] : state.comments,
      };

    case LOAD_COMMENT_REPLIES_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: 'Não foi possivel carregar as respostas',
      };

    case LOAD_COMMENT_REPLIES_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: '',
        count: action.payload.data.count,
        comments: action.payload.data.comments,
      };

    case SEND_COMMENT_REPLY:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
        comments: [
          {
            postCommentId: 'provisory-id',
            comment: action.payload.request.data?.comment ?? '',
            downvoteCount: 0,
            downvoted: false,
            gamerName: action.gamerName ?? '',
            imageUrl: action.gamerImageUrl ?? '',
            repliesCount: 0,
            upvoteCount: 0,
            upvoted: false,
          },
          ...state.comments,
        ]
      };

    case SEND_COMMENT_REPLY_SUCCESS:
      const newComments = state.comments.map(comment => {
        if (comment.postCommentId === 'provisory-id') {
          comment.postCommentId = action.payload.data.postCommentId;
        }

        return comment
      })

      return {
        ...state,
        loaded: true,
        loading: false,
        error: '',
        comments: newComments,
      };

    case SEND_COMMENT_REPLY_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: 'Não foi possível enviar seu comentário',
      };

    default:
      return state;
  }
}

export function loadCommentReplies(
  data: LoadCommentRepliesRequest,
): LoadCommentReplies {
  return {
    type: LOAD_COMMENT_REPLIES,
    payload: {
      request: {
        method: 'GET',
        url: `/PostComment/${data.postCommentId}/Replies/v1?loggedUserId=${data.gamerId}&searchText=${
          data.searchText
        }&gamerId=${data.gamerId}&page=${data.page}`,
      },
    },
  };
}

export function sendCommentReply(data: SendCommentRequest, gamerName: string, gamerImageUrl: string): SendCommentReply {
  return {
    type: SEND_COMMENT_REPLY,
    payload: {
      request: {
        method: 'POST',
        url: `/Post/${data.postId}/Comment/v1`,
        data,
      },
    },
    gamerImageUrl,
    gamerName,
  };
}
