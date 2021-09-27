import {Action, ActionAnyPayload} from '../../Models/Redux';

export const BLUR_SEARCH_BAR = 'BLUR_SEARCH_BAR';
export const FOCUS_SEARCH_BAR = 'FOCUS_SEARCH_BAR';

export interface State {
  focus: boolean;
}

const initialState: State = {
  focus: false,
};

export default function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case FOCUS_SEARCH_BAR:
      return {focus: true};
    case BLUR_SEARCH_BAR:
      return {focus: false};
    default:
      return state;
  }
}

export function blurSearchBar(): ActionAnyPayload {
  return {
    type: BLUR_SEARCH_BAR,
    payload: {},
  };
}

export function focusSearchBar(): ActionAnyPayload {
  return {
    type: FOCUS_SEARCH_BAR,
    payload: {},
  };
}
