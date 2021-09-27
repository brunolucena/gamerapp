import {BaseAction, ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';
import {
  CreateStoreRequest,
  CreateStoreResponse,
  RegisterStoreModel,
  StoreType,
} from 'src/Models/RegisterStore';
import {
  GET_ADDRESS_FROM_CEP,
  GET_ADDRESS_FROM_CEP_FAIL,
  GET_ADDRESS_FROM_CEP_SUCCESS,
  GetAddressFromCep,
  GetAddressFromCepFail,
  GetAddressFromCepSuccess,
} from './userAddress';
import {findErrorMessage} from 'src/Helpers/functions';

export const CLEAR_STORE_REGISTER = 'CLEAR_STORE_REGISTER';

export const SAVE_REGISTER_STORE_DATA = 'SAVE_REGISTER_STORE_DATA';

export const SET_STORE_TYPE = 'SET_STORE_TYPE';

export const CREATE_STORE = 'CREATE_STORE';
export const CREATE_STORE_FAIL = 'CREATE_STORE_FAIL';
export const CREATE_STORE_SUCCESS = 'CREATE_STORE_SUCCESS';

export class ClearStoreRegister implements BaseAction {
  readonly type = CLEAR_STORE_REGISTER;
}

export class SaveRegisterStoreData implements BaseAction {
  readonly type = SAVE_REGISTER_STORE_DATA;
  constructor(public payload: RegisterStoreModel) {}
}

export class CreateStore implements BaseAction {
  readonly type = CREATE_STORE;
  constructor(public payload: ActionPayload<CreateStoreRequest>) {}
}

export class CreateStoreFailure implements BaseAction {
  readonly type = CREATE_STORE_FAIL;
  constructor(public payload: BaseErrorResponse) {}
}

export class CreateStoreSuccess implements BaseAction {
  readonly type = CREATE_STORE_SUCCESS;
  constructor(public payload: BaseResponse<CreateStoreResponse>) {}
}

export class SetStoreType implements BaseAction {
  readonly type = SET_STORE_TYPE;
  constructor(public payload: {storeType: StoreType}) {}
}

export type Actions =
  | ClearStoreRegister
  | CreateStore
  | CreateStoreFailure
  | CreateStoreSuccess
  | GetAddressFromCep
  | GetAddressFromCepFail
  | GetAddressFromCepSuccess
  | SaveRegisterStoreData
  | SetStoreType;

export interface State extends RegisterStoreModel {
  error: string;
  loading: boolean;
  experiencePoints: number;
  storeType: StoreType;
}

const initialState: State = {
  error: '',
  loading: false,
  storeType: 'GamerStore',
  address: '',
  experiencePoints: 0,
  city: '',
  cityId: '',
  complement: '',
  district: '',
  document: '',
  name: '',
  number: '',
  state: '',
  type: '',
  zipCode: '',
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case CLEAR_STORE_REGISTER: {
      return {...initialState};
    }

    case CREATE_STORE: {
      return {...state, loading: true};
    }

    case CREATE_STORE_FAIL: {
      return {
        ...state,
        loading: false,
        error: findErrorMessage(
          action.payload,
          'Não foi possível criar a loja',
        ),
      };
    }

    case CREATE_STORE_SUCCESS: {
      return {
        ...state,
        error: '',
        loading: false,
        experiencePoints: action.payload.data.experiencePoints,
      };
    }

    case GET_ADDRESS_FROM_CEP: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }

    case GET_ADDRESS_FROM_CEP_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível localizar seu CEP',
      };
    }

    case GET_ADDRESS_FROM_CEP_SUCCESS: {
      const {
        address,
        city,
        cityId,
        complement,
        district,
        state: estado,
      } = action.payload.data;

      return {
        ...state,
        loading: false,
        error: '',
        address,
        city,
        cityId,
        complement,
        district,
        state: estado,
      };
    }

    case SAVE_REGISTER_STORE_DATA: {
      return {...state, ...action.payload};
    }

    case SET_STORE_TYPE: {
      return {
        ...state,
        storeType: action.payload.storeType,
      };
    }

    default:
      return state;
  }
}

export function clearStoreRegister(): ClearStoreRegister {
  return {
    type: CLEAR_STORE_REGISTER,
  };
}

export function createStore(data: CreateStoreRequest): CreateStore {
  return {
    type: CREATE_STORE,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Add/v1',
        data,
      },
    },
  };
}

export function saveRegisterStoreData(
  data: RegisterStoreModel,
): SaveRegisterStoreData {
  return {
    type: SAVE_REGISTER_STORE_DATA,
    payload: data,
  };
}

export function setStoreType(storeType: StoreType): SetStoreType {
  return {
    type: SET_STORE_TYPE,
    payload: {storeType},
  };
}
