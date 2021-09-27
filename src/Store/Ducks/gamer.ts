import {
  AddQuickProductProducts,
  AddQuickProductRequest,
  SetDeviceTokenRequest,
} from '../../Models/Gamer';
import { Action, ActionResponse, BaseResponse } from 'src/Models/ReduxModels';

export const ADD_QUICK_PRODUCTS = 'ADD_QUICK_PRODUCTS';
export const ADD_QUICK_PRODUCTS_FAIL = 'ADD_QUICK_PRODUCTS_FAIL';
export const ADD_QUICK_PRODUCTS_SUCCESS = 'ADD_QUICK_PRODUCTS_SUCCESS';

export const SET_DEVICE_TOKEN = 'SET_DEVICE_TOKEN';
export const SET_DEVICE_TOKEN_FAIL = 'SET_DEVICE_TOKEN_FAIL';
export const SET_DEVICE_TOKEN_SUCCESS = 'SET_DEVICE_TOKEN_SUCCESS';

export interface AddQuickProductsSuccess {
  type: typeof ADD_QUICK_PRODUCTS_SUCCESS;
  payload: BaseResponse<AddQuickProductProducts>;
}

export type Actions = AddQuickProductsSuccess;

export interface State {
  deviceToken: string;
  deviceTokenMessage: string;
  error: string;
  loading: boolean;
}

const initialState: State = {
  deviceToken: '',
  deviceTokenMessage: '',
  error: '',
  loading: false,
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any>,
): State {
  const {payload, type} = action;

  switch (type) {
    case ADD_QUICK_PRODUCTS:
      return {
        ...state,
        loading: true,
      };

    case ADD_QUICK_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Não foi possível adicionar os produtos',
      };

    case ADD_QUICK_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case SET_DEVICE_TOKEN: {
      const request: any = payload.request;

      let token = '';

      if (request) {
        token = request.data?.token || '';
      }

      return {
        ...state,
        deviceToken: token,
      };
    }

    case SET_DEVICE_TOKEN_FAIL: {
      return {
        ...state,
        deviceTokenMessage: 'Não foi possível salvar o Device Token',
      };
    }

    case SET_DEVICE_TOKEN_SUCCESS: {
      return {
        ...state,
        deviceTokenMessage: 'Device Token salvo com sucesso',
      };
    }

    default: {
      return state;
    }
  }
}

export function addQuickProducts(
  data: AddQuickProductRequest,
): Action<AddQuickProductRequest> {
  return {
    type: ADD_QUICK_PRODUCTS,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/AddQuickProducts/v1',
        data,
      },
    },
  };
}

export function setDeviceToken(
  data: SetDeviceTokenRequest,
): Action<SetDeviceTokenRequest> {
  return {
    type: SET_DEVICE_TOKEN,
    payload: {
      request: {
        method: 'POST',
        url: 'Gamer/SetDeviceToken/v1',
        data,
      },
    },
  };
}
