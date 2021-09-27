import {Environments} from '../../Models/ConfigModels';

export const SET_ENVIRONMENT = 'SET_ENVIRONMENT';

export interface State {
  environment: Environments;
}

export interface SetEnvironment {
  type: typeof SET_ENVIRONMENT;
  payload: {data: Environments};
}

const configInitialState: State = {
  environment: 'production',
};

type Actions = SetEnvironment;

export default function reducer(
  state = configInitialState,
  action: Actions,
): State {
  switch (action.type) {
    case SET_ENVIRONMENT: {
      const environment = action.payload.data;

      return {
        ...state,
        environment,
      };
    }

    default: {
      return state;
    }
  }
}

export function setEnvironment(environment: Environments): SetEnvironment {
  return {
    type: SET_ENVIRONMENT,
    payload: {
      data: environment,
    },
  };
}
