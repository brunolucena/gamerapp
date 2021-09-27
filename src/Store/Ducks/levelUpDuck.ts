import {
  LevelUpRequest,
  LevelUpResponse,
  SetLevelUpDataRequest,
} from '../../Models/LevelUpModels';
import {
  ActionPayload,
  BaseErrorResponse,
  BaseResponse,
} from 'src/Models/ReduxModels';

export const CLEAR_LEVEL_UP = 'CLEAR_LEVEL_UP';

export const LEVEL_UP = 'LEVEL_UP';
export const LEVEL_UP_FAILURE = 'LEVEL_UP_FAILURE';
export const LEVEL_UP_SUCCESS = 'LEVEL_UP_SUCESS';

export const SET_LEVEL_UP_DATA = 'SET_LEVEL_UP_DATA';

export interface ClearLevelUp {
  type: typeof CLEAR_LEVEL_UP;
}

export interface LevelUp {
  type: typeof LEVEL_UP;
  payload: ActionPayload<LevelUpRequest>;
}
export interface LevelUpFailure {
  type: typeof LEVEL_UP_FAILURE;
  payload: BaseErrorResponse;
}
export interface LevelUpSuccess {
  type: typeof LEVEL_UP_SUCCESS;
  payload: BaseResponse<LevelUpResponse>;
}

export interface SetLevelUpData {
  type: typeof SET_LEVEL_UP_DATA;
  payload: SetLevelUpDataRequest;
}

export type Actions =
  | ClearLevelUp
  | LevelUp
  | LevelUpFailure
  | LevelUpSuccess
  | SetLevelUpData;

export interface State {
  error: string;
  loading: boolean;
  backToRoute: string;
  achievementRankId: string;
  experiencePointsNeeded: number;
  levelUp: boolean;
  nextRankTitle: string;
  nextRankUrl: string;
  rankImageUrl: string;
  rankTitle: string;
  totalExperiencePoints: number;
}

const levelUpInitialState: State = {
  error: '',
  loading: false,
  backToRoute: '',
  achievementRankId: '',
  experiencePointsNeeded: 0,
  levelUp: false,
  nextRankTitle: '',
  nextRankUrl: '',
  rankImageUrl: '',
  rankTitle: '',
  totalExperiencePoints: 0,
};

export default function reducer(
  state = levelUpInitialState,
  action: Actions,
): State {
  switch (action.type) {
    case CLEAR_LEVEL_UP: {
      return {
        ...levelUpInitialState,
      };
    }

    case LEVEL_UP: {
      const {redirectTo} = action.payload;

      return {
        ...state,
        backToRoute: redirectTo || '',
        loading: true,
        error: '',
      };
    }
    case LEVEL_UP_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível verificar o LevelUp',
      };
    }

    case LEVEL_UP_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        ...action.payload.data,
      };
    }

    case SET_LEVEL_UP_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export function clearLevelUp(): ClearLevelUp {
  return {
    type: CLEAR_LEVEL_UP,
  };
}

export function levelUpRequest(
  data: LevelUpRequest,
  backToRoute: string,
): LevelUp {
  return {
    type: LEVEL_UP,
    payload: {
      redirectTo: backToRoute,
      request: {
        method: 'POST',
        url: 'Achievements/LevelUp/v1',
        data,
      },
    },
  };
}

export function setLevelUpData(data: SetLevelUpDataRequest): SetLevelUpData {
  return {
    type: SET_LEVEL_UP_DATA,
    payload: data,
  };
}
