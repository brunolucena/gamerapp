import {BaseError, BaseErrorResponse} from 'src/Models/Login';
import {ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {
  LoadTagsRequest,
  LoadTagsResponse,
  SaveGamerTagsRequest,
  SaveGamerTagsResponse,
  TagModel,
} from 'src/Models/Tag';

export const LOAD_TAGS = 'LOAD_TAGS';
export const LOAD_TAGS_SUCCESS = 'LOAD_TAGS_SUCCESS';
export const LOAD_TAGS_FAILURE = 'LOAD_TAGS_FAILURE';

export const SAVE_GAMER_TAGS = 'SAVE_GAMER_TAGS';
export const SAVE_GAMER_TAGS_SUCCESS = 'SAVE_GAMER_TAGS_SUCCESS';
export const SAVE_GAMER_TAGS_FAILURE = 'SAVE_GAMER_TAGS_FAILURE';

export interface LoadTags {
  type: typeof LOAD_TAGS;
  payload: ActionPayload<LoadTagsRequest>;
}

export interface LoadTagsSuccess {
  type: typeof LOAD_TAGS_SUCCESS;
  payload: BaseResponse<LoadTagsResponse>;
}

export interface LoadTagsFailure {
  type: typeof LOAD_TAGS_FAILURE;
  payload: BaseErrorResponse;
}

export interface SaveGamerTags {
  type: typeof SAVE_GAMER_TAGS;
  payload: ActionPayload<LoadTagsRequest>;
}

export interface SaveGamerTagsSuccess {
  type: typeof SAVE_GAMER_TAGS_SUCCESS;
  payload: BaseResponse<SaveGamerTagsResponse>;
}

export interface SaveGamerTagsFailure {
  type: typeof SAVE_GAMER_TAGS_FAILURE;
  payload: BaseErrorResponse;
}

export type TagActions =
  | LoadTags
  | LoadTagsSuccess
  | LoadTagsFailure
  | SaveGamerTags
  | SaveGamerTagsSuccess
  | SaveGamerTagsFailure;

export interface TagState {
  error: string;
  loaded: boolean;
  loading: boolean;
  tags: TagModel[];
}

export const initialState: TagState = {
  error: '',
  loaded: false,
  loading: false,
  tags: [],
};

export default function reducer(
  state = initialState,
  action: TagActions,
): TagState {
  switch (action.type) {
    case LOAD_TAGS:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };

    case LOAD_TAGS_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: '',
        tags: action.payload.data.tags,
      };

    case LOAD_TAGS_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: '',
        tags: [],
      };

    case SAVE_GAMER_TAGS:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };

    case SAVE_GAMER_TAGS_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
      };

    case SAVE_GAMER_TAGS_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
      };

    default:
      return state;
  }
}

export function loadTags(data: LoadTagsRequest): LoadTags {
  return {
    type: LOAD_TAGS,
    payload: {
      request: {
        method: 'GET',
        url: '/Tag/v1',
        data,
      },
    },
  };
}

export function saveGamerTags(data: SaveGamerTagsRequest): SaveGamerTags {
  return {
    type: SAVE_GAMER_TAGS,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/Tags/v1',
        data,
      },
    },
  };
}
