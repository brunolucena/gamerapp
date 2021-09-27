import {
  ActionAnyData,
  ActionAnyPayload,
  ActionResponse,
} from '../../Models/Redux';

export const CLEAR_EARNED_POINTS = 'CLEAR_EARNED_POINTS';
export const SET_EARNED_POINTS = 'SET_EARNED_POINTS';

export interface State {
  error: string;
  loading: boolean;
  earnedPoints: number;
}

const achievementInitialState: State = {
  error: '',
  loading: false,
  earnedPoints: 0,
};

export default function reducer(
  state = achievementInitialState,
  action: ActionResponse<any>,
): State {
  const {error, payload, type} = action;

  switch (type) {
    case SET_EARNED_POINTS: {
      const data: number = payload.data;

      return {
        ...state,
        earnedPoints: data,
      };
    }

    default:
      return state;
  }
}

export function clearEarnedPoints(): ActionAnyPayload<any> {
  return {
    type: CLEAR_EARNED_POINTS,
    payload: {},
  };
}

export function setEarnedPoints(data: number): ActionAnyData<number> {
  return {
    type: SET_EARNED_POINTS,
    payload: {
      data,
    },
  };
}
