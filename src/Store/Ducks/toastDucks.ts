import {Toast} from '../../Models/Toast';
import {ActionAnyData, ActionResponse} from 'src/Models/ReduxModels';

export const INSERT_TOAST_TO_QUEUE = 'INSERT_TOAST_TO_QUEUE';
export const REMOVE_TOAST_FROM_QUEUE = 'REMOVE_TOAST_FROM_QUEUE';

export interface State {
  error: string;
  loading: boolean;
  toasts: Toast[];
}

const initialState: State = {
  error: '',
  loading: false,
  toasts: [],
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any>,
): State {
  const {payload, type} = action;

  switch (type) {
    case INSERT_TOAST_TO_QUEUE: {
      const data: Toast = payload.data;

      return {
        ...state,
        toasts: [...state.toasts, data],
      };
    }

    case REMOVE_TOAST_FROM_QUEUE: {
      const data: Toast = payload.data;
      const newToasts = state.toasts.filter(
        toast => toast.message === data.message,
      );

      return {
        ...state,
        toasts: newToasts,
      };
    }

    default:
      return state;
  }
}

export function insertToastToQueue(toast: Toast): ActionAnyData<Toast> {
  return {
    type: INSERT_TOAST_TO_QUEUE,
    payload: {
      data: toast,
    },
  };
}

export function removeToastFromQueue(toast: Toast): ActionAnyData<Toast> {
  return {
    type: INSERT_TOAST_TO_QUEUE,
    payload: {
      data: toast,
    },
  };
}
