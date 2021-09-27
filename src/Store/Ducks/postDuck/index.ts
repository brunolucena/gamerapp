import {ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';
import {TagModel} from 'src/Models/Tag';
import {
  NewPostRequest,
  NewPostResponse,
  PostType,
  SetPostDuckDataRequest,
} from './models';

export const NEW_POST = 'NEW_POST';
export const NEW_POST_FAILURE = 'NEW_POST_FAILURE';
export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS';

export const SET_POST_DUCK_DATA = 'SET_POST_DUCK_DATA';

export interface NewPost {
  type: typeof NEW_POST;
  payload: ActionPayload<NewPostRequest>;
}
export interface NewPostFailure {
  type: typeof NEW_POST_FAILURE;
  payload: BaseErrorResponse;
}
export interface NewPostSuccess {
  type: typeof NEW_POST_SUCCESS;
  payload: BaseResponse<NewPostResponse>;
}

export interface SetPostDuckData {
  type: typeof SET_POST_DUCK_DATA;
  payload: SetPostDuckDataRequest;
}

export type Actions =
  | SetPostDuckData
  | NewPost
  | NewPostFailure
  | NewPostSuccess;

export interface State {
  error: string;
  loaded: boolean;
  loading: boolean;
  newPostImage: string;
  newPostKeywords: string[];
  newPostTags: TagModel[];
  newPostType: PostType;
  postCreated: boolean;
  title: string;
}

export const initialState: State = {
  error: '',
  loaded: false,
  loading: false,
  newPostImage: '',
  newPostKeywords: [],
  newPostTags: [],
  newPostType: 'Image',
  postCreated: false,
  title: '',
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case NEW_POST: {
      return {
        ...state,
        loading: true,
        postCreated: false,
      };
    }
    case NEW_POST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível salvar o post',
      };
    }
    case NEW_POST_SUCCESS: {
      return {
        ...initialState,
        postCreated: true,
      };
    }

    case SET_POST_DUCK_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export function newPost(data: NewPostRequest): NewPost {
  return {
    type: NEW_POST,
    payload: {
      request: {
        method: 'POST',
        url: '/Post/v1',
        data,
      },
    },
  };
}

export function setPostDuckData(data: SetPostDuckDataRequest): SetPostDuckData {
  return {
    type: SET_POST_DUCK_DATA,
    payload: data,
  };
}

// selectors
export function getNewPostPoints(postType: PostType): number {
  switch (postType) {
    case 'Image':
      return 50;

    case 'Link':
      return 50;

    case 'Question':
      return 50;

    case 'Review':
      return 500;

    default:
      return 0;
  }
}
