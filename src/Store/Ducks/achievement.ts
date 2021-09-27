export const CHECK_NEXT_ACHIEVEMENT = 'CHECK_NEXT_ACHIEVEMENT';
export const CHECK_NEXT_ACHIEVEMENT_SUCCESS = 'CHECK_NEXT_ACHIEVEMENT_SUCESS';
export const CHECK_NEXT_ACHIEVEMENT_FAILURE = 'CHECK_NEXT_ACHIEVEMENT_FAILURE';

export const GET_ACHIEVEMENTS_HISTORY = 'GET_ACHIEVEMENTS_HISTORY';
export const GET_ACHIEVEMENTS_HISTORY_SUCCESS =
  'GET_ACHIEVEMENTS_HISTORY_SUCCESS';
export const GET_ACHIEVEMENTS_HISTORY_FAILURE =
  'GET_ACHIEVEMENTS_HISTORY_FAILURE';

export const GET_GAMER_POINTS_HISTORY = 'GET_GAMER_POINTS_HISTORY';
export const GET_GAMER_POINTS_HISTORY_SUCCESS =
  'GET_GAMER_POINTS_HISTORY_SUCCESS';
export const GET_GAMER_POINTS_HISTORY_FAILURE =
  'GET_GAMER_POINTS_HISTORY_FAILURE';

import {
  AchievementsHistory,
  AchievementsHistoryResponse,
  GamerPointsHistory,
  GamerPointsHistoryResponse,
  GetAchievementDataRequest,
  NextAchievement,
} from '../../Models/Achievement';
import {Action, ActionResponse} from '../../Models/Redux';

export interface State {
  error: string;
  loading: boolean;
  achievements: AchievementsHistory[];
  levelUp: boolean;
  nextAchievement: NextAchievement | null;
  experiencePointsHistory: GamerPointsHistory[];
}

const achievementInitialState: State = {
  error: '',
  loading: false,
  achievements: [],
  levelUp: false,
  nextAchievement: null,
  experiencePointsHistory: [],
};

export default function reducer(
  state = achievementInitialState,
  action: ActionResponse<
    AchievementsHistoryResponse & GamerPointsHistoryResponse & NextAchievement
  >,
): State {
  const {error, payload, type} = action;

  switch (type) {
    case CHECK_NEXT_ACHIEVEMENT:
      return {
        ...state,
        loading: true,
        levelUp: false,
        nextAchievement: null,
      };

    case CHECK_NEXT_ACHIEVEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: error ? error.data : 'Não foi possível enviar a mensagem',
      };

    case CHECK_NEXT_ACHIEVEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        levelUp: payload.data.LevelUp,
        nextAchievement: {
          LevelUp: payload.data.LevelUp,
          RankImageUrl: payload.data.RankImageUrl,
          RankTitle: payload.data.RankTitle,
          TotalExperiencePoints: payload.data.TotalExperiencePoints,
        },
      };

    case GET_ACHIEVEMENTS_HISTORY:
      return {
        ...state,
        loading: true,
      };

    case GET_ACHIEVEMENTS_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        achievements: payload.data.GamerAchievements,
      };

    case GET_ACHIEVEMENTS_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case GET_GAMER_POINTS_HISTORY:
      return {
        ...state,
        loading: true,
      };

    case GET_GAMER_POINTS_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        experiencePointsHistory: payload.data.GamerPointsHistory,
      };

    case GET_GAMER_POINTS_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

export function getGamerPointsHistory(
  data: GetAchievementDataRequest,
): Action<GetAchievementDataRequest> {
  return {
    type: GET_GAMER_POINTS_HISTORY,
    payload: {
      request: {
        method: 'POST',
        url: 'Achievement/GamerExperiencePoints/v1',
        data,
      },
    },
  };
}

export function getAchievementsHistory(
  data: GetAchievementDataRequest,
): Action<GetAchievementDataRequest> {
  return {
    type: GET_ACHIEVEMENTS_HISTORY,
    payload: {
      request: {
        method: 'POST',
        url: 'Achievements/History/v1',
        data,
      },
    },
  };
}

export function checkNextAchievement(
  data: GetAchievementDataRequest,
): Action<GetAchievementDataRequest> {
  return {
    type: CHECK_NEXT_ACHIEVEMENT,
    payload: {
      request: {
        method: 'POST',
        url: 'Achievements/Check/v1',
        data,
      },
    },
  };
}
