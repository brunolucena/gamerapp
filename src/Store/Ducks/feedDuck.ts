import { ActionPayload, BaseResponse } from 'src/Models/ReduxModels';
import { BaseErrorResponse } from 'src/Models/Login';
import { TagModel } from 'src/Models/Tag';
import {
  DeletePostRequest,
  DeletePostResponse,
  FeedModel,
  FilterPostRequest,
  FilterPostResponse,
  PostReactionRequest,
  PostReactionResponse,
  SetFeedDataRequest,
} from 'src/Models/Feed';
import { SendComment, SEND_COMMENT } from './postCommentDuck';

export const FILTER_POST = 'FILTER_POST';
export const FILTER_POST_SUCCESS = 'FILTER_POST_SUCCESS';
export const FILTER_POST_FAILURE = 'FILTER_POST_FAILURE';

export const POST_REACTION = 'POST_REACTION';
export const POST_REACTION_SUCCESS = 'POST_REACTION_SUCCESS';
export const POST_REACTION_FAILURE = 'POST_REACTION_FAILURE';

export const SET_FEED_DATA = 'SET_FEED_DATA';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';


export interface DeletePost {
  type: typeof DELETE_POST;
  payload: ActionPayload<DeletePostRequest>;
}

export interface DeletePostSuccess {
  type: typeof DELETE_POST_SUCCESS;
  payload: BaseResponse<DeletePostResponse>;
}

export interface DeletePostFailure {
  type: typeof DELETE_POST_FAILURE;
  payload: BaseErrorResponse;
}

export interface FilterPost {
  type: typeof FILTER_POST;
  payload: ActionPayload<FilterPostRequest>;
}

export interface FilterPostSuccess {
  type: typeof FILTER_POST_SUCCESS;
  payload: BaseResponse<FilterPostResponse>;
}

export interface FilterPostFailure {
  type: typeof FILTER_POST_FAILURE;
  payload: BaseErrorResponse;
}

export interface PostReaction {
  type: typeof POST_REACTION;
  payload: ActionPayload<PostReactionRequest>;
}

export interface PostReactionSuccess {
  type: typeof POST_REACTION_SUCCESS;
  payload: BaseResponse<PostReactionResponse>;
}

export interface PostReactionFailure {
  type: typeof POST_REACTION_FAILURE;
  payload: BaseErrorResponse;
}

export interface SetFeedData {
  type: typeof SET_FEED_DATA;
  payload: SetFeedDataRequest;
}

export type FeedActions =
  | FilterPost
  | FilterPostSuccess
  | FilterPostFailure
  | PostReaction
  | PostReactionSuccess
  | PostReactionFailure
  | SetFeedData
  | DeletePost
  | DeletePostSuccess
  | DeletePostFailure
  | SendComment
  | SetFeedData;

export interface FeedState {
  count: number;
  posts: FeedModel[];
  loaded: boolean;
  loading: boolean;
  page: number;
  refreshing: boolean;
  error: string;
  selectedPost: FeedModel;
  selectedTags: TagModel[];
}

export const initialState: FeedState = {
  count: 0,
  error: '',
  loaded: false,
  loading: false,
  page: 1,
  refreshing: false,
  posts: [],
  selectedPost: {
    commentCount: 0,
    content: '',
    dateCreated: '',
    downvoteCount: 0,
    downvoted: false,
    gamerId: '',
    gamerName: '',
    imageUrl: '',
    keywords: [],
    postId: '',
    shareCount: 0,
    tagId: '',
    tagName: '',
    tagUrl: '',
    type: 'Coleção',
    upvoteCount: 0,
    upvoted: false,
  },
  selectedTags: [],
};

export default function reducer(
  state = initialState,
  action: FeedActions,
): FeedState {
  switch (action.type) {
    case FILTER_POST: {
      return {
        ...state,
        loading: true,
        page: action.payload.request.data?.page ?? 1,
      };
    }

    case FILTER_POST_SUCCESS: {
      return {
        ...state,
        refreshing: false,
        loading: false,
        count: action.payload.data.count,
        posts: state.page === 1 ? [...action.payload.data.posts] : [...state.posts, ...action.payload.data.posts],
      };
    }

    case FILTER_POST_FAILURE: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: 'Houve um erro ao carregar o feed',
      };
    }

    case POST_REACTION: {
      const postId = action.payload.request.data?.postId;
      const reaction = action.payload.request.data?.reaction;

      const post = state.posts.find(p => p.postId === postId) ?? {
        ...initialState.selectedPost,
      };

      function calcDownvoteCount(): number {
        let downvoteCount = post.downvoteCount;

        // If reaction is upvote + 1, remove downvote if it has one
        if (reaction === 1) {
          if (post.downvoted) {
            downvoteCount -= 1;
          }
        } else if (reaction === 0) {
          if (post.downvoted) {
            downvoteCount -= 1;
          } else {
            downvoteCount += 1;
          }
        }

        return downvoteCount;
      }

      function calcUpvoteCount(): number {
        let upvoteCount = post.upvoteCount;

        // If reaction is downvote + 1, remove upvote if it has one
        if (reaction === 0) {
          if (post.upvoted) {
            upvoteCount -= 1;
          }
        } else if (reaction === 1) {
          if (post.upvoted) {
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
        selectedPost: {
          ...state.selectedPost,
          downvoteCount: newDownvoteCount,
          upvoteCount: newUpvoteCount,
          upvoted: reaction === 1 ? !post.upvoted : false,
          downvoted: reaction === 0 ? !post.downvoted : false,
        },
        posts: state.posts.map(p => {
          if (p.postId === postId) {
            p.downvoteCount = newDownvoteCount;
            p.upvoteCount = newUpvoteCount;
            p.upvoted = reaction === 1 ? !post.upvoted : false;
            p.downvoted = reaction === 0 ? !post.downvoted : false;
          }

          return p;
        }),
      };
    }

    case POST_REACTION_SUCCESS: {
      const { commentCount, downvoteCount, shareCount, upvoteCount, postId, upvoted, downvoted } = action.payload.data;
      const { commentCount: selectedCommentCount, downvoteCount: selectedDownvoteCount, shareCount: selectedShareCount, upvoteCount: selectedUpvoteCount, postId: selectedPostId} = state.selectedPost;
      
      return {
        ...state,
        selectedPost: {
          ...state.selectedPost,
          commentCount: selectedPostId === postId ? commentCount : selectedCommentCount,
          downvoteCount: selectedPostId === postId ? downvoteCount : selectedDownvoteCount,
          shareCount: selectedPostId === postId ? shareCount : selectedShareCount,
          upvoteCount: selectedPostId === postId ? upvoteCount : selectedUpvoteCount,
          upvoted,
          downvoted,
        },
        posts: state.posts.map(post => {
          if (post.postId === postId) {
            post.commentCount = commentCount;
            post.downvoteCount = downvoteCount;
            post.shareCount = shareCount;
            post.upvoteCount = upvoteCount;
            post.upvoted = upvoted;
            post.downvoted = downvoted;
          }

          return post;
        })
      };
    }

    case POST_REACTION_FAILURE: {
      return {
        ...state,
      };
    }

    case SEND_COMMENT: {
      const posts = state.posts.map(post => {
        if (post.postId === action.payload.request.data?.postId) {
          post.commentCount += 1;
        }

        return post;
      });

      return {
        ...state,
        posts,
        selectedPost: {
          ...state.selectedPost,
          commentCount: state.selectedPost.commentCount + 1,
        }
      }
    }

    case SET_FEED_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        loading: true
      }
    }
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        posts: state.posts.filter(post => post.postId !== action.payload.data.postId)
      }
    }
      
    case DELETE_POST_FAILURE: {
      return {
        ...state,
        loaded: false,
        loading: false,
        error: "Não foi possível deletar o post"
      }
    }
      
      
    default:
      return state;
  }
}

export function filterPosts(data: FilterPostRequest): FilterPost {
  return {
    type: FILTER_POST,
    payload: {
      request: {
        method: 'GET',
        url: `/Post/v1?loggedUserId=${data.gamerId}&searchText=${data.searchText}&page=${data.page}&tagIds=${data.tagIds}`,
      },
    },
  };
}

export function postReaction(data: PostReactionRequest): PostReaction {
  return {
    type: POST_REACTION,
    payload: {
      request: {
        method: 'POST',
        url: `/Post/${data.postId}/Reaction/v1`,
        data,
      },
    },
  };
}

export function setFeedData(data: SetFeedDataRequest): SetFeedData {
  return {
    type: SET_FEED_DATA,
    payload: data,
  };
}

export function deletePost(data: DeletePostRequest): DeletePost {
  return {
    type: DELETE_POST,
    payload: {
      request: {
        method: 'DELETE',
        url: `/Post/${data.postId}/v1`
      }
    }
  }
}


// selectors
export function selectIsTagSelected(state: FeedState, tag: TagModel): boolean {
  const isSelected =
    state.selectedTags.findIndex(selectedTag => selectedTag.id === tag.id) > -1;

  return isSelected;
}
