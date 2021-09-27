import {Action, ActionAnyPayload} from '../../Models/Redux';
import {GamerRanking} from '../../Models/GamerRanking';

export const CLEAR_GAMER_RANKING = 'CLEAR_GAMER_RANKING';

export const GET_GAMER_RANKING = 'GET_GAMER_RANKING';
export const GET_GAMER_RANKING_FAIL = 'GET_GAMER_RANKING_FAIL';
export const GET_GAMER_RANKING_SUCCESS = 'GET_GAMER_RANKING_SUCCESS';

export interface State {
  error: string;
  loading: boolean;
  gamerRanking: GamerRanking;
}

const initialState: State = {
  error: '',
  loading: false,
  gamerRanking: {
    userId: '',
    badges: [],
    currentBadge: null,
    currentTitle: null,
    position: null,
    titles: [],
  },
};

export default function reducer(
  state = initialState,
  action: Action | ActionAnyPayload,
): State {
  switch (action.type) {
    case CLEAR_GAMER_RANKING:
      return {...initialState};
    case GET_GAMER_RANKING:
      return {...state, loading: true};
    case GET_GAMER_RANKING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
          ? action.error.data
          : 'Não foi possível carregar o Gamer Ranking',
      };
    case GET_GAMER_RANKING_SUCCESS:
      return {
        ...state,
        loading: false,
        gamerRanking: action.payload.data,
      };
    default:
      return state;
  }
}

// Actions
export function clearGamerRanking() {
  return {
    type: CLEAR_GAMER_RANKING,
    payload: {},
  };
}

// export function getGamerRanking(gamerId: string) {
//   return {
//     type: GET_GAMER_RANKING,
//     payload: {
//       request: {
//         method: 'GET',
//         url: '/gamerRanking',
//         data: {gamerId},
//       },
//     },
//   };
// }
