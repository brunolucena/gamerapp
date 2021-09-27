import {
  GamerRankingItem,
  GetGamerRankingListRequest,
  GetGamerRankingListResponse,
  GetGamerRankingResponse,
  GetGamerRankingRequest,
  GamerRanking,
} from '../../Models/Achievement';
import {Action, ActionAnyData, ActionResponse} from '../../Models/Redux';

export const GET_GAMER_RANKING = 'GET_GAMER_RANKING';
export const GET_GAMER_RANKING_FAILURE = 'GET_GAMER_RANKING_FAILURE';
export const GET_GAMER_RANKING_SUCCESS = 'GET_GAMER_RANKING_SUCCESS';

export const GET_RANKING_LIST = 'GET_RANKING_LIST';
export const GET_RANKING_LIST_FAILURE = 'GET_RANKING_LIST_FAILURE';
export const GET_RANKING_LIST_SUCCESS = 'GET_RANKING_LIST_SUCCESS';

export const SET_ACTIVE_GAMER_RANKING_ID = 'SET_ACTIVE_GAMER_RANKING_ID';

export const SET_RANKING_ACTIVE_PAGE = 'SET_RANKING_ACTIVE_PAGE';

export const SET_RANKING_REFRESH = 'SET_RANKING_REFRESH';

export interface State {
  error: string;
  loading: boolean;
  refreshing: boolean;
  activePage: number;
  activeGamerRanking: GamerRanking;
  rankings: GamerRankingItem[];
  me: GamerRankingItem;
}

const initialState: State = {
  error: '',
  loading: false,
  refreshing: false,
  activePage: 1,
  activeGamerRanking: {
    experiencePoints: 0,
    gamerId: '',
    imageUrl: '',
    name: '',
    position: 0,
    rankTitle: '',
    averageRating: 0,
    city: '',
    distance: 0,
    negotiationsCount: 0,
    nextLevelRank: '',
    nextLevelTotalExperiencePoints: 0,
    state: '',
    tradesFinishedCount: 0,
  },
  rankings: [],
  me: {
    experiencePoints: 0,
    gamerId: '',
    imageUrl: '',
    name: '',
    position: 0,
    rankTitle: '',
  },
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any>,
): State {
  const {payload, type} = action;

  switch (type) {
    case GET_GAMER_RANKING:
      return {
        ...state,
        loading: true,
        activeGamerRanking: {
          ...initialState.activeGamerRanking,
          gamerId: state.activeGamerRanking.gamerId,
        },
      };

    case GET_GAMER_RANKING_FAILURE:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: 'Não foi possivel carregar o Ranking do Gamer',
      };

    case GET_GAMER_RANKING_SUCCESS: {
      const data: GetGamerRankingResponse = payload.data;

      return {
        ...state,
        error: '',
        loading: false,
        refreshing: false,
        activeGamerRanking: data,
      };
    }

    case GET_RANKING_LIST:
      return {
        ...state,
        rankings: [],
        loading: true,
      };

    case GET_RANKING_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: 'Não foi possivel carregar o ranking',
      };

    case GET_RANKING_LIST_SUCCESS: {
      const data: GetGamerRankingListResponse = payload.data;

      const {me, rankings} = data;

      return {
        ...state,
        error: '',
        loading: false,
        refreshing: false,
        rankings:
          state.activePage === 1 ? rankings : [...state.rankings, ...rankings],
        me,
      };
    }

    case SET_ACTIVE_GAMER_RANKING_ID: {
      const data: string = payload.data;

      return {
        ...state,
        activeGamerRanking: {
          ...state.activeGamerRanking,
          gamerId: data,
        },
      };
    }

    case SET_RANKING_ACTIVE_PAGE: {
      const page: number = payload.data;

      return {
        ...state,
        activePage: page,
      };
    }

    case SET_RANKING_REFRESH: {
      const data: boolean = payload.data;

      return {
        ...state,
        refreshing: data,
      };
    }

    default:
      return state;
  }
}

export function getGamerRanking(
  data: GetGamerRankingRequest,
): Action<GetGamerRankingRequest> {
  return {
    type: GET_GAMER_RANKING,
    payload: {
      request: {
        method: 'POST',
        url: '/Achievements/GetGamerRanking/v1',
        data,
      },
    },
  };
}

export function getRankingList(
  data: GetGamerRankingListRequest,
): Action<GetGamerRankingListRequest> {
  return {
    type: GET_RANKING_LIST,
    payload: {
      request: {
        method: 'POST',
        url: '/Achievements/GetRanking/v1',
        data,
      },
    },
  };
}

export function setActiveGamerRankingId(
  gamerId: string,
): ActionAnyData<string> {
  return {
    type: SET_ACTIVE_GAMER_RANKING_ID,
    payload: {data: gamerId},
  };
}

export function setRankingActivePage(page: number): ActionAnyData<number> {
  return {
    type: SET_RANKING_ACTIVE_PAGE,
    payload: {
      data: page,
    },
  };
}

export function setRankingRefresh(data: boolean): ActionAnyData<boolean> {
  return {
    type: SET_RANKING_REFRESH,
    payload: {data},
  };
}
