import {BaseErrorResponse} from 'src/Models/Login';
import {
  LoadPlatformsRequest,
  LoadPlatformsResponse,
  PlatformWithImage,
  SavePlatformsRequest,
  SavePlatformsResponse,
} from 'src/Models/Platform';
import {ActionPayload, BaseResponse} from 'src/Models/ReduxModels';

export const LOAD_PLATFORMS = 'LOAD_PLATFORMS';
export const LOAD_PLATFORMS_SUCCESS = 'LOAD_PLATFORMS_SUCCESS';
export const LOAD_PLATFORMS_FAILURE = 'LOAD_PLATFORMS_FAILURE';

export const SAVE_PLATFORMS = 'SAVE_PLATFORMS';
export const SAVE_PLATFORMS_SUCCESS = 'SAVE_PLATFORMS_SUCCESS';
export const SAVE_PLATFORMS_FAILURE = 'SAVE_PLATFORMS_FAILURE';

export interface LoadPlatforms {
  type: typeof LOAD_PLATFORMS;
  payload: ActionPayload<LoadPlatformsRequest>;
}

export interface LoadPlatformsSuccess {
  type: typeof LOAD_PLATFORMS_SUCCESS;
  payload: BaseResponse<LoadPlatformsResponse>;
}

export interface LoadPlatformsFailure {
  type: typeof LOAD_PLATFORMS_FAILURE;
  payload: BaseErrorResponse;
}

export interface SavePlatforms {
  type: typeof SAVE_PLATFORMS;
  payload: ActionPayload<SavePlatformsRequest>;
}

export interface SavePlatformsSuccess {
  type: typeof SAVE_PLATFORMS_SUCCESS;
  payload: BaseResponse<SavePlatformsResponse>;
}

export interface SavePlatformsFailure {
  type: typeof SAVE_PLATFORMS_FAILURE;
  payload: BaseErrorResponse;
}

export type PlatformActions =
  | LoadPlatforms
  | LoadPlatformsSuccess
  | LoadPlatformsFailure
  | SavePlatforms
  | SavePlatformsSuccess
  | SavePlatformsFailure;

export interface PlatformsState {
  error: string;
  loaded: boolean;
  loading: boolean;
  platforms: PlatformWithImage[];
}

export const initialState: PlatformsState = {
  error: '',
  loaded: false,
  loading: false,
  platforms: [],
};

export default function reducer(
  state = initialState,
  action: PlatformActions,
): PlatformsState {
  switch (action.type) {
    case LOAD_PLATFORMS:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };

    case LOAD_PLATFORMS_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: '',
        platforms: action.payload.data.platforms,
      };

    case LOAD_PLATFORMS_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: 'Não foi possivel carregar as plataformas',
        platforms: [],
      };

    case SAVE_PLATFORMS:
      return {
        ...state,
        loaded: false,
        loading: true,
        error: '',
      };

    case SAVE_PLATFORMS_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: '',
      };

    case SAVE_PLATFORMS_FAILURE:
      return {
        ...state,
        loaded: false,
        loading: false,
        error: 'Não foi possivel salvar as plataformas',
      };

    default:
      return state;
  }
}

export function loadPlatforms(data: LoadPlatformsRequest): LoadPlatforms {
  return {
    type: LOAD_PLATFORMS,
    payload: {
      request: {
        method: 'GET',
        url: '/Platform/v1',
        data,
      },
    },
  };
}

export function savePlatforms(data: SavePlatformsRequest): SavePlatforms {
  return {
    type: SAVE_PLATFORMS,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/Platforms/v1',
        data,
      },
    },
  };
}
