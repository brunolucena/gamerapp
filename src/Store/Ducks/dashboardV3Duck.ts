import {
  ActionPayload,
  BaseErrorResponse,
  BaseResponse,
} from 'src/Models/ReduxModels';
import {
  Banner,
  DashboardV3Count,
  DashboardV3Section,
  GetDashboardV3Request,
  GetDashboardV3Response,
  SetDashboardV3DataRequest,
} from '../../Models/DashboardV3Models';

export const GET_DASHBOARD_V3 = 'GET_DASHBOARD_V3';
export const GET_DASHBOARD_V3_FAILURE = 'GET_DASHBOARD_V3_FAILURE';
export const GET_DASHBOARD_V3_SUCCESS = 'GET_DASHBOARD_V3_SUCCESS';

export const SET_DASHBOARD_V3_DATA = 'SET_DASHBOARD_V3_DATA';

export const SET_DASHBOARD_V3_REFRESHING = 'SET_DASHBOARD_V3_REFRESHING';

export interface GetDashboardV3 {
  type: typeof GET_DASHBOARD_V3;
  payload: ActionPayload<GetDashboardV3Request>;
}
export interface GetDashboardV3Failure {
  type: typeof GET_DASHBOARD_V3_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetDashboardV3Success {
  type: typeof GET_DASHBOARD_V3_SUCCESS;
  payload: BaseResponse<GetDashboardV3Response>;
}

export interface SetDashboardV3Data {
  type: typeof SET_DASHBOARD_V3_DATA;
  payload: SetDashboardV3DataRequest;
}

export interface SetDashboardV3Refreshing {
  type: typeof SET_DASHBOARD_V3_REFRESHING;
  payload: {refreshing: boolean};
}

export type Actions =
  | GetDashboardV3
  | GetDashboardV3Failure
  | GetDashboardV3Success
  | SetDashboardV3Data
  | SetDashboardV3Refreshing;

export interface State {
  error: string;
  loading: boolean;
  loaded: boolean;
  refreshing: boolean;
  banners: Banner[];
  counts: DashboardV3Count[];
  lastUpdate: Date;
  page: number;
  pages: number;
  searchText: string;
  sections: DashboardV3Section[];
}

const initialState: State = {
  error: '',
  loading: false,
  loaded: false,
  refreshing: false,
  banners: [],
  counts: [],
  lastUpdate: new Date(),
  page: 1,
  pages: 1,
  searchText: '',
  sections: [],
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case GET_DASHBOARD_V3: {
      const { data } = action.payload.request;

      return {
        ...state,
        loading: true,
        lastUpdate: new Date(),
        page: data?.page || 1,
        searchText: data?.searchText || '',
      };
    }
    case GET_DASHBOARD_V3_FAILURE: {
      return {
        ...state,
        loading: false,
        loaded: false,
        refreshing: false,
        error: 'Não foi possivel carregar o dashboard',
      };
    }
    case GET_DASHBOARD_V3_SUCCESS: {
      const { data } = action.payload;

      const bannersLength = data.banners.length;
      const countsLength = data.counts.length;

      return {
        ...state,
        error: '',
        loading: false,
        loaded: true,
        refreshing: false,
        banners: bannersLength > 0 ? data.banners : state.banners,
        counts: countsLength > 0 ? data.counts : state.counts,
        pages: data.pages,
        sections: state.page === 1 ? data.sections : [...state.sections, ...data.sections],
      };
    }

    case SET_DASHBOARD_V3_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SET_DASHBOARD_V3_REFRESHING: {
      const {refreshing} = action.payload;

      return {
        ...state,
        refreshing,
      };
    }

    default:
      return state;
  }
}

export function getDashboardV3(data: GetDashboardV3Request): GetDashboardV3 {
  return {
    type: GET_DASHBOARD_V3,
    payload: {
      request: {
        method: 'POST',
        url: '/Dashboard/v1',
        data,
      },
    },
  };
}

export function setDashboardV3Data(
  data: SetDashboardV3DataRequest,
): SetDashboardV3Data {
  return {
    type: SET_DASHBOARD_V3_DATA,
    payload: data,
  };
}

export function setDashboardV3Refreshing(
  refreshing: boolean,
): SetDashboardV3Refreshing {
  return {
    type: SET_DASHBOARD_V3_REFRESHING,
    payload: {refreshing},
  };
}
