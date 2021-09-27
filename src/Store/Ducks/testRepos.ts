import {Action, ActionAnyPayload} from '../../Models/Redux';

export const CLEAR_REPOS = 'CLEAR_REPOS';

export const GET_REPOS = 'GET_REPOS';
export const GET_REPOS_SUCCESS = 'GET_REPOS_SUCCESS';
export const GET_REPOS_FAIL = 'GET_REPOS_FAIL';

export interface TestReposType {
  body: string;
  id: number;
  title: string;
  uri?: string;
  userId: number;
}

export interface State {
  error: string;
  loading: boolean;
  repos: TestReposType[];
}

const initialState: State = {
  error: '',
  loading: false,
  repos: [],
};

export default function reducer(
  state = initialState,
  action: Action | ActionAnyPayload,
): State {
  switch (action.type) {
    case CLEAR_REPOS:
      return initialState;
    case GET_REPOS:
      return {...state, loading: true};
    case GET_REPOS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories',
      };
    case GET_REPOS_SUCCESS:
      return {...state, loading: false, repos: action.payload.data};
    default:
      return state;
  }
}

export function clearRepos(): ActionAnyPayload {
  return {
    type: CLEAR_REPOS,
    payload: {},
  };
}

export function listRepos(user: string): Action {
  return {
    type: GET_REPOS,
    payload: {
      client: 'jsonPlaceholder',
      request: {
        url: `/posts`,
        method: 'GET',
      },
    },
  };
}
