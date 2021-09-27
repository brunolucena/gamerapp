import {
  Comment,
  CommentReactionRequest,
  CommentReactionResponse,
  DeleteCommentRequest,
  DeleteCommentResponse,
  LoadPostCommentsRequest,
  LoadPostCommentsResponse,
  SendCommentRequest,
  SendCommentResponse,
  SetPostCommentDuckDataRequest,
} from 'src/Models/Comment';
import {
  ActionPayload,
  BaseErrorResponse,
  BaseResponse,
} from 'src/Models/ReduxModels';
import { SendCommentReply, SEND_COMMENT_REPLY } from './postCommentReplyDuck';

export const LOAD_POST_COMMENTS = 'LOAD_POST_COMMENTS';
export const LOAD_POST_COMMENTS_SUCCESS = 'LOAD_POST_COMMENTS_SUCCESS';
export const LOAD_POST_COMMENTS_FAILURE = 'LOAD_POST_COMMENTS_FAILURE';

export const SEND_COMMENT = 'SEND_COMMENT';
export const SEND_COMMENT_SUCCESS = 'SEND_COMMENT_SUCCESS';
export const SEND_COMMENT_FAILURE = 'SEND_COMMENT_FAILURE';

export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const COMMENT_REACTION = 'COMMENT_REACTION';
export const COMMENT_REACTION_SUCCESS = 'COMMENT_REACTION_SUCCESS';
export const COMMENT_REACTION_FAILURE = 'COMMENT_REACTION_FAILURE';

export const SET_POST_COMMENT_DUCK_DATA = 'SET_POST_COMMENT_DUCK_DATA';

export interface LoadPostsComments {
  type: typeof LOAD_POST_COMMENTS;
  payload: ActionPayload<LoadPostCommentsRequest>;
}

export interface LoadPostsCommentsSuccess {
  type: typeof LOAD_POST_COMMENTS_SUCCESS;
  payload: BaseResponse<LoadPostCommentsResponse>;
}

export interface LoadPostsCommentsFailure {
  type: typeof LOAD_POST_COMMENTS_FAILURE;
  payload: BaseErrorResponse;
}

export interface SendComment {
  type: typeof SEND_COMMENT;
  payload: ActionPayload<SendCommentRequest>;
  gamerName: string;
  gamerImageUrl: string;
}

export interface SendCommentSuccess {
  type: typeof SEND_COMMENT_SUCCESS;
  payload: BaseResponse<SendCommentResponse>;
}

export interface SendCommentFailure {
  type: typeof SEND_COMMENT_FAILURE;
  payload: BaseErrorResponse;
}

export interface DeleteComment {
  type: typeof DELETE_COMMENT;
  payload: ActionPayload<DeleteCommentRequest>;
}

export interface DeleteCommentSuccess {
  type: typeof DELETE_COMMENT_SUCCESS;
  payload: BaseResponse<DeleteCommentResponse>;
}

export interface DeleteCommentFailure {
  type: typeof DELETE_COMMENT_FAILURE;
  payload: BaseErrorResponse;
}

export interface CommentReaction {
  type: typeof COMMENT_REACTION;
  payload: ActionPayload<CommentReactionRequest>;
}

export interface CommentReactionSuccess {
  type: typeof COMMENT_REACTION_SUCCESS;
  payload: BaseResponse<CommentReactionResponse>;
}

export interface CommentReactionFailure {
  type: typeof COMMENT_REACTION_FAILURE;
  payload: BaseErrorResponse;
}

export interface SetPostCommentDuckData {
  type: typeof SET_POST_COMMENT_DUCK_DATA;
  payload: SetPostCommentDuckDataRequest;
}

export type PostCommentActions =
  | CommentReaction
  | CommentReactionFailure
  | CommentReactionSuccess
  | DeleteComment
  | DeleteCommentFailure
  | DeleteCommentSuccess
  | LoadPostsComments
  | LoadPostsCommentsFailure
  | LoadPostsCommentsSuccess
  | SendComment
  | SendCommentFailure
  | SendCommentReply
  | SendCommentSuccess
  | SetPostCommentDuckData;

export interface PostCommentState {
  error: string;
  loaded: boolean;
  loading: boolean;
  refreshing: boolean;
  activeComment: Comment;
  count: number;
  comments: Comment[];
  page: number;
}

export const initialState: PostCommentState = {
  comments: [],
  count: 0,
  error: '',
  activeComment: {
    comment: '',
    downvoteCount: 0,
    downvoted: false,
    gamerName: '',
    imageUrl: '',
    postCommentId: '',
    repliesCount: 0,
    upvoteCount: 0,
    upvoted: false,
  },
  loaded: false,
  loading: false,
  refreshing: false,
  page: 1,
};

export default function reducer(
  state = initialState,
  action: PostCommentActions,
): PostCommentState {
  switch (action.type) {
    case LOAD_POST_COMMENTS:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
        page: action.payload.request.data?.page || 1,
        comments: action.payload.request.data?.page == 1 ? [] : state.comments
      };

    case LOAD_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        refreshing: false,
        error: '',
        ...action.payload.data,
      };

    case LOAD_POST_COMMENTS_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: true,
        refreshing: false,
        error: 'Não foi possível carregar os comentários',
      };

    case SEND_COMMENT:
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

    case SEND_COMMENT_SUCCESS:
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

    case SEND_COMMENT_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: 'Não foi possível enviar seu comentário',
      };

    case SEND_COMMENT_REPLY: {
      const comments = state.comments.map(comment => {
        if (comment.postCommentId === action.payload.request.data?.postId) {
          comment.repliesCount += 1;
        }

        return comment;
      });

      return {
        ...state,
        activeComment: {
          ...state.activeComment,
          repliesCount: state.activeComment.repliesCount + 1,
        },
        comments,
      }
    }

    case DELETE_COMMENT:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: '',
        ...action.payload.data,
      };

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: 'Não foi possível deletar o comentário',
      };

    case COMMENT_REACTION:
      const postCommentId = action.payload.request.data?.postCommentId;
      const reaction = action.payload.request.data?.reaction;

      const comment = state.comments.find(c => c.postCommentId === postCommentId) ?? {
        ...initialState.activeComment,
      };

      

      function calcDownvoteCount(): number {
        let downvoteCount = comment.downvoteCount;

        // If reaction is upvote + 1, remove downvote if it has one
        if (reaction === 1) {
          if (comment.downvoted) {
            downvoteCount -= 1;
          }
        } else if (reaction === 0) {
          if (comment.downvoted) {
            downvoteCount -= 1;
          } else {
            downvoteCount += 1;
          }
        }

        return downvoteCount;
      }

      function calcUpvoteCount(): number {
        let upvoteCount = comment.upvoteCount;

        // If reaction is downvote + 1, remove upvote if it has one
        if (reaction === 0) {
          if (comment.upvoted) {
            upvoteCount -= 1;
          }
        } else if (reaction === 1) {
          if (comment.upvoted) {
            upvoteCount -= 1;
          } else {
            upvoteCount += 1;
          }
        }

        return upvoteCount;
      }

      const newDownvoteCount = calcDownvoteCount();
      const newUpvoteCount = calcUpvoteCount();

      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
        activeComment: {
          ...state.activeComment,
          downvoteCount: newDownvoteCount,
          upvoteCount: newUpvoteCount,
          upvoted: reaction === 1 ? !comment.upvoted : false,
          downvoted: reaction === 0 ? !comment.downvoted : false,
        },
        comments: state.comments.map(c => {
          if (c.postCommentId === postCommentId) {
            c.downvoteCount = newDownvoteCount;
            c.upvoteCount = newUpvoteCount;
            c.upvoted = reaction === 1 ? !comment.upvoted : false;
            c.downvoted = reaction === 0 ? !comment.downvoted : false;
          }

          return c;
        }),
      };

    case COMMENT_REACTION_SUCCESS: {
      const { downvoteCount, upvoteCount, postCommentId, upvoted, downvoted } = action.payload.data;
      const { downvoteCount: selectedDownvoteCount, upvoteCount: selectedUpvoteCount,postCommentId: selectedPostCommentId} = state.activeComment;

      return {
        ...state,
        loaded: true,
        loading: false,
        error: '',
        ...action.payload.data,
        activeComment: {
          ...state.activeComment,
          downvoteCount: selectedPostCommentId === postCommentId ? downvoteCount : selectedDownvoteCount,
          upvoteCount: selectedPostCommentId === postCommentId ? upvoteCount : selectedUpvoteCount,
          upvoted,
          downvoted,
        },
        comments: state.comments.map(comment => {
          if (comment.postCommentId === postCommentId) {
            comment.downvoteCount = downvoteCount;
            comment.upvoteCount = upvoteCount;
            comment.upvoted = upvoted;
            comment.downvoted = downvoted;
          }

          return comment;
        })
      };
    }

    case COMMENT_REACTION_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: 'Não foi possível reagir ao comentário',
      };

      case SET_POST_COMMENT_DUCK_DATA: {
        return {
          ...state,
          ...action.payload,
        }
      }

    default:
      return state;
  }
}

export function loadComments(data: LoadPostCommentsRequest): LoadPostsComments {
  return {
    type: LOAD_POST_COMMENTS,
    payload: {
      request: {
        method: 'GET',
        url: `/Post/${data.postId}/Comment/v1?loggedUserId=${data.gamerId}&searchText=${
          data.searchText
        }&gamerId=${data.gamerId}&page=${data.page}&replyId=${data.replyId}`,
      },
    },
  };
}

export function sendComment(data: SendCommentRequest, gamerName: string, gamerImageUrl: string): SendComment {
  return {
    type: SEND_COMMENT,
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

export function deleteComment(data: DeleteCommentRequest): DeleteComment {
  return {
    type: DELETE_COMMENT,
    payload: {
      request: {
        method: 'DELETE',
        url: `/PostComment/${data.postCommentId}/v1`,
        data,
      },
    },
  };
}

export function commentReaction(data: CommentReactionRequest): CommentReaction {
  return {
    type: COMMENT_REACTION,
    payload: {
      request: {
        method: 'POST',
        url: `/PostComment/${data.postCommentId}/Reaction/v1`,
        data,
      },
    },
  };
}

export function setPostCommentDuckData(data: SetPostCommentDuckDataRequest): SetPostCommentDuckData {
  return {
    type: SET_POST_COMMENT_DUCK_DATA,
    payload: data,
  };
}

// Selectors
export function selectPostCommentHasNextPage(state: PostCommentState): boolean {
  return state.comments.length < state.count;
}
