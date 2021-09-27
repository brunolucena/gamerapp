import {
  Address,
  GetAddressFromCepRequest,
  GetAddressFromCepResponse,
  SaveUserAddressRequest,
  SaveUserAddressResponse,
  SetUserAddressDataRequest,
} from '../../Models/User';
import {BaseAction, ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';

export const GET_ADDRESS_FROM_CEP = 'GET_ADDRESS_FROM_CEP';
export const GET_ADDRESS_FROM_CEP_FAIL = 'GET_ADDRESS_FROM_CEP_FAIL';
export const GET_ADDRESS_FROM_CEP_SUCCESS = 'GET_ADDRESS_FROM_CEP_SUCCESS';

export const GET_USER_ADRESSES = 'GET_USER_ADRESSES';
export const GET_USER_ADRESSES_FAIL = 'GET_USER_ADRESSES_FAIL';
export const GET_USER_ADRESSES_SUCCESS = 'GET_USER_ADRESSES_SUCCESS';

export const SAVE_USER_ADDRESS = 'SAVE_USER_ADDRESS';
export const SAVE_USER_ADDRESS_FAIL = 'SAVE_USER_ADDRESS_FAIL';
export const SAVE_USER_ADDRESS_SUCCESS = 'SAVE_USER_ADDRESS_SUCCESS';

export const SET_USER_ADDRESS_DATA = 'SET_USER_ADDRESS_DATA';

export class GetAddressFromCep implements BaseAction {
  readonly type = GET_ADDRESS_FROM_CEP;
  constructor(public payload: ActionPayload<GetAddressFromCepRequest>) {}
}
export class GetAddressFromCepFail implements BaseAction {
  readonly type = GET_ADDRESS_FROM_CEP_FAIL;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetAddressFromCepSuccess implements BaseAction {
  readonly type = GET_ADDRESS_FROM_CEP_SUCCESS;
  constructor(public payload: BaseResponse<GetAddressFromCepResponse>) {}
}

export class SaveUserAddress implements BaseAction {
  readonly type = SAVE_USER_ADDRESS;
  constructor(public payload: ActionPayload<SaveUserAddressRequest>) {}
}
export class SaveUserAddressFail implements BaseAction {
  readonly type = SAVE_USER_ADDRESS_FAIL;
  constructor(public payload: BaseErrorResponse) {}
}
export interface SaveUserAddressSuccess {
  type: typeof SAVE_USER_ADDRESS_SUCCESS;
  payload: BaseResponse<SaveUserAddressResponse>;
}

export interface SetUserAddressData {
  type: typeof SET_USER_ADDRESS_DATA;
  payload: SetUserAddressDataRequest;
}

export type Actions =
  | GetAddressFromCep
  | GetAddressFromCepFail
  | GetAddressFromCepSuccess
  | SaveUserAddress
  | SaveUserAddressFail
  | SaveUserAddressSuccess
  | SetUserAddressData;

export interface State {
  error: string;
  loading: boolean;
  adresses: Address[];
  addressFromCep: GetAddressFromCepResponse;
  redirectTo: string;
}

const initialState: State = {
  error: '',
  loading: false,
  adresses: [],
  addressFromCep: {
    address: '',
    city: '',
    cityId: '',
    complement: '',
    district: '',
    state: '',
    zipCode: '',
  },
  redirectTo: '',
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case GET_ADDRESS_FROM_CEP: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ADDRESS_FROM_CEP_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'CEP inválido',
      };
    }

    case GET_ADDRESS_FROM_CEP_SUCCESS: {
      const {data} = action.payload;

      return {
        ...state,
        loading: false,
        error: '',
        addressFromCep: data,
      };
    }

    case SAVE_USER_ADDRESS: {
      return {
        ...state,
        loading: true,
      };
    }
    case SAVE_USER_ADDRESS_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível salvar o endereço',
      };
    }
    case SAVE_USER_ADDRESS_SUCCESS: {
      const {data} = action.payload;

      const newAddress: Address = {
        bairro: data.district,
        cep: data.zipCode,
        complemento: '',
        id: data.addressId,
        localidade: data.city,
        logradouro: data.address,
        numero: '',
        tipo: data.name,
        uf: data.state,
        userId: data.gamerId,
      };

      return {
        ...state,
        loading: false,
        redirectTo: '',
        adresses: [newAddress, ...state.adresses],
      };
    }

    case SET_USER_ADDRESS_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export function getAddressFromCep(
  zipCode: string,
  redirectTo?: string,
): GetAddressFromCep {
  return {
    type: GET_ADDRESS_FROM_CEP,
    payload: {
      redirectTo,
      request: {
        method: 'POST',
        url: '/Address/GetByZipCode/v1',
        data: {
          zipCode,
        },
      },
    },
  };
}

export function saveUserAddress(
  data: SaveUserAddressRequest,
  redirectTo?: string,
): SaveUserAddress {
  return {
    type: SAVE_USER_ADDRESS,
    payload: {
      redirectTo,
      request: {
        method: 'POST',
        url: '/Address/Add/v1',
        data,
      },
    },
  };
}

export function setUserAddressData(
  data: SetUserAddressDataRequest,
): SetUserAddressData {
  return {
    type: SET_USER_ADDRESS_DATA,
    payload: data,
  };
}
