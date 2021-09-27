import {
  ActionPayload,
  BaseResponse,
} from 'src/Models/ReduxModels';
import { BaseErrorResponse } from 'src/Models/Login';
import {
  DashboardV3Section,
  SearchDashboardV3Request,
  SearchDashboardV3Response,
  SetDashboardV3SearchDataRequest,
} from 'src/Models/DashboardV3Models';

export const SEARCH_DASHBOARD_V3 = 'SEARCH_DASHBOARD_V3';
export const SEARCH_DASHBOARD_V3_FAILURE = 'SEARCH_DASHBOARD_V3_FAILURE';
export const SEARCH_DASHBOARD_V3_SUCCESS = 'SEARCH_DASHBOARD_V3_SUCCESS';

export const SET_DASHBOARD_V3_SEARCH_DATA = 'SET_DASHBOARD_V3_SEARCH_DATA';

export interface SearchDashboardV3 {
  type: typeof SEARCH_DASHBOARD_V3;
  payload: ActionPayload<SearchDashboardV3Request>;
  refreshing: boolean;
}
export interface SearchDashboardV3Failure {
  type: typeof SEARCH_DASHBOARD_V3_FAILURE;
  payload: BaseErrorResponse;
}
export interface SearchDashboardV3Success {
  type: typeof SEARCH_DASHBOARD_V3_SUCCESS;
  payload: BaseResponse<SearchDashboardV3Response>;
}

export interface SetDashboardV3SearchData {
  type: typeof SET_DASHBOARD_V3_SEARCH_DATA;
  payload: SetDashboardV3SearchDataRequest;
}

export type Actions =
  | SearchDashboardV3
  | SearchDashboardV3Failure
  | SearchDashboardV3Success
  | SetDashboardV3SearchData;

export interface State extends DashboardV3Section {
  error: string;
  loading: boolean;
  page: number;
  refreshing: boolean;
  search: string;
}

const initialState: State = {
  error: '',
  loading: false,
  count: 0,
  groupItemId: '',
  groupType: 'Product',
  items: [],
  page: 1,
  refreshing: false,
  search: '',
  sectionId: '',
  sectionTitle: '',
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case SEARCH_DASHBOARD_V3: {      
      const { data } = action.payload.request;

      return {
        ...state,
        loading: true,
        page: data?.page || 1,
        refreshing: action.refreshing,
        search: data?.searchText || '',
      };
    }
    case SEARCH_DASHBOARD_V3_FAILURE: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: 'Não foi possível fazer a busca do dashboard v3',
      }
    }
    case SEARCH_DASHBOARD_V3_SUCCESS: {      
      const { data } = action.payload;
      
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: '',
        count: data.count,
        items: state.page === 1 ? data.items : [...state.items, ...data.items],
      }
    }

    case SET_DASHBOARD_V3_SEARCH_DATA: {
      return {
        ...state,
        ...action.payload,
      }
    }

    default:
      return state;
  }
}

export function searchDashboardV3Section(
  data: SearchDashboardV3Request,
  refreshing?: boolean,
): SearchDashboardV3 {
  return {
    type: SEARCH_DASHBOARD_V3,
    payload: {
      request: {
        method: 'POST',
        url: '/Dashboard/Section/v1',
        data,
      },
    },
    refreshing: refreshing || false,
  };
}

export function setDashboardV3SearchData(
  data: SetDashboardV3SearchDataRequest,
): SetDashboardV3SearchData {
  return {
    type: SET_DASHBOARD_V3_SEARCH_DATA,
    payload: data,
  };
}

// Selectors

/**
 * Retorna se possui uma próxima página.
 * Verifica se a quantidade de items carregados é menor do que o count.
 */
export function selectDashboardV3SearchHasNextPage(state: State): boolean {
  const { count, items } = state;

  return items.length < count;
}