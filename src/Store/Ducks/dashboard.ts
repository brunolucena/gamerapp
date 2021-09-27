import {
  Banner,
  DashboardGamerInfo,
  GetDashboardRequest,
  GetDashboardResponseV2,
  DashboardItem,
} from '../../Models/Dashboard';
import {Action, ActionAnyData, ActionResponse} from 'src/Models/ReduxModels';

export const GET_GAMER_DASHBOARD = 'GET_GAMER_DASHBOARD';
export const GET_GAMER_DASHBOARD_FAILURE = 'GET_GAMER_DASHBOARD_FAILURE';
export const GET_GAMER_DASHBOARD_SUCCESS = 'GET_GAMER_DASHBOARD_SUCCESS';

export const SET_GAMER_DASHBOARD_REFRESHING = 'SET_GAMER_DASHBOARD_REFRESHING';

export interface State {
  error: string;
  loading: boolean;
  loaded: boolean;
  refreshing: boolean;
  banners: Banner[];
  gamerInfo: DashboardGamerInfo | null;
  items: DashboardItem[];
  lastUpdate: Date;
  tradeAutoCount: number;
  tradeCount: number;
  tradeRequestCount: number;
}

const initialState: State = {
  error: '',
  loading: false,
  loaded: false,
  refreshing: false,
  banners: [],
  gamerInfo: null,
  items: [],
  lastUpdate: new Date(),
  tradeAutoCount: 0,
  tradeCount: 0,
  tradeRequestCount: 0,
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any>,
): State {
  const {payload, type} = action;

  switch (type) {
    case GET_GAMER_DASHBOARD: {
      return {
        ...state,
        loading: true,
        lastUpdate: new Date(),
      };
    }
    case GET_GAMER_DASHBOARD_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        refreshing: false,
        error: 'Não foi possivel carregar o dashboard',
      };
    }
    case GET_GAMER_DASHBOARD_SUCCESS: {
      const data: GetDashboardResponseV2 = payload.data;

      const {
        banners,
        gamer,
        tradeAutoCount,
        tradeCount,
        tradeRequestCount,
        items,
      } = data;

      return {
        ...state,
        error: '',
        loading: false,
        loaded: true,
        refreshing: false,
        banners,
        gamerInfo: gamer,
        tradeAutoCount,
        tradeCount,
        tradeRequestCount,
        items,
      };
    }

    case SET_GAMER_DASHBOARD_REFRESHING: {
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

export function getGamerDashboard(
  data: GetDashboardRequest,
): Action<GetDashboardRequest> {
  return {
    type: GET_GAMER_DASHBOARD,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/Dashboard/v2',
        data,
      },
    },
  };
}

export function setGamerDashboardRefreshing(
  refreshing: boolean,
): ActionAnyData<boolean> {
  return {
    type: SET_GAMER_DASHBOARD_REFRESHING,
    payload: {data: refreshing},
  };
}
