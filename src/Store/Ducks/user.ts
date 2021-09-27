import {
  Address,
  ChangePasswordRequest,
  ChangePasswordResponse,
  ChangeUserMainAddressRequest,
  EditProfileRequest,
  EditProfileResponse,
  SetUserDataRequest,
  User,
} from '../../Models/User';

import {SAVE_USER_ADDRESS_SUCCESS, SaveUserAddressSuccess} from './userAddress';
import {ADD_QUICK_PRODUCTS_SUCCESS, AddQuickProductsSuccess} from './gamer';
import {ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {
  BaseErrorResponse,
  LoginRequest,
  LoginResponse,
  SetProfilePictureRequest,
  SetProfilePictureResponse,
} from 'src/Models/Login';
import {CreateStoreSuccess, CREATE_STORE_SUCCESS} from './registerStore';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';

export const CHANGE_USER_MAIN_ADDRESS = 'CHANGE_USER_MAIN_ADDRESS';
export const CHANGE_USER_MAIN_ADDRESS_FAIL = 'CHANGE_USER_MAIN_ADDRESS_FAIL';
export const CHANGE_USER_MAIN_ADDRESS_SUCCESS =
  'CHANGE_USER_MAIN_ADDRESS_SUCCESS';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const EDIT_PROFILE_FAIL = 'EDIT_PROFILE_FAIL';
export const EDIT_PROFILE_SUCCESS = 'EDIT_PROFILE_SUCCESS';

export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const LOGOUT = 'LOGOUT';

export const SET_ANALYTICS_USER_SET = 'SET_ANALYTICS_USER_SET';

export const SET_PROFILE_PICTURE = 'SET_PROFILE_PICTURE';
export const SET_PROFILE_PICTURE_FAILURE = 'SET_PROFILE_PICTURE_FAILURE';
export const SET_PROFILE_PICTURE_SUCCESS = 'SET_PROFILE_PICTURE_SUCCESS';

export const SET_USER = 'SET_USER';

export const SET_USER_DATA = 'SET_USER_DATA';

export const SET_TOKEN = 'SET_TOKEN';

export const SET_TUTORIAL_DONE = 'SET_TUTORIAL_DONE';

export interface ChangePassword {
  type: typeof CHANGE_PASSWORD;
  payload: ActionPayload<ChangePasswordRequest>;
}
export interface ChangePasswordFailure {
  type: typeof CHANGE_PASSWORD_FAIL;
  payload: BaseErrorResponse;
}
export interface ChangePasswordSuccess {
  type: typeof CHANGE_PASSWORD_SUCCESS;
  payload: BaseResponse<ChangePasswordResponse>;
}

export interface ChangeUserMainAddress {
  type: typeof CHANGE_USER_MAIN_ADDRESS;
  payload: ActionPayload<ChangeUserMainAddressRequest>;
}
export interface ChangeUserMainAddressFailure {
  type: typeof CHANGE_USER_MAIN_ADDRESS_FAIL;
  payload: BaseErrorResponse;
}
export interface ChangeUserMainAddressSuccess {
  type: typeof CHANGE_USER_MAIN_ADDRESS_SUCCESS;
  payload: {data: string};
}

export interface EditProfile {
  type: typeof EDIT_PROFILE;
  payload: ActionPayload<EditProfileRequest>;
}
export interface EditProfileFailure {
  type: typeof EDIT_PROFILE_FAIL;
  payload: BaseErrorResponse;
}
export interface EditProfileSuccess {
  type: typeof EDIT_PROFILE_SUCCESS;
  payload: BaseResponse<EditProfileResponse>;
}

export interface Login {
  type: typeof LOGIN;
  payload: ActionPayload<LoginRequest>;
}
export interface LoginFailure {
  type: typeof LOGIN_FAIL;
  payload: BaseErrorResponse;
}
export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: BaseResponse<LoginResponse>;
}

export interface Logout {
  type: typeof LOGOUT;
}

export interface SetAnalyticsUserSet {
  type: typeof SET_ANALYTICS_USER_SET;
  payload: {
    data: {
      isUserSet: boolean;
    };
  };
}

export interface SetProfilePicture {
  type: typeof SET_PROFILE_PICTURE;
  payload: ActionPayload<SetProfilePictureRequest>;
}
export interface SetProfilePictureFailure {
  type: typeof SET_PROFILE_PICTURE_FAILURE;
  payload: BaseErrorResponse;
}
export interface SetProfilePictureSuccess {
  type: typeof SET_PROFILE_PICTURE_SUCCESS;
  payload: BaseResponse<SetProfilePictureResponse>;
}

export interface SetUser {
  type: typeof SET_USER;
  payload: {data: {user: User}};
}

export interface SetUserData {
  type: typeof SET_USER_DATA;
  payload: SetUserDataRequest;
}

export interface SetToken {
  type: typeof SET_TOKEN;
  payload: {data: {token: string}};
}

export interface SetTutorialDone {
  type: typeof SET_TUTORIAL_DONE;
  payload: {data: {isDone: boolean}};
}

export type Actions =
  | AddQuickProductsSuccess
  | ChangePassword
  | ChangePasswordFailure
  | ChangePasswordSuccess
  | ChangeUserMainAddress
  | ChangeUserMainAddressFailure
  | ChangeUserMainAddressSuccess
  | CreateStoreSuccess
  | EditProfile
  | EditProfileFailure
  | EditProfileSuccess
  | Login
  | LoginFailure
  | LoginSuccess
  | Logout
  | SaveUserAddressSuccess
  | SetAnalyticsUserSet
  | SetProfilePicture
  | SetProfilePictureFailure
  | SetProfilePictureSuccess
  | SetToken
  | SetTutorialDone
  | SetUser
  | SetUserData;

export interface State {
  error: string;
  loading: boolean;
  user: User;
  token: string;
  tutorialDone: boolean;
  analyticsIsUserSet: boolean;
  onboardingDone: boolean;
}

const initialState: State = {
  error: '',
  loading: false,
  user: {
    id: '',
    gamerId: '',
    storeId: '',
    isStore: false,
    cpf: '',
    email: '',
    lastName: '',
    firstName: '',
    phoneNumber: '',
    averageRating: 0,
    mainAddressId: '',
    addresses: [],
    wallet: {
      balance: 0,
      cashback: 0,
      points: 0,
    },
    gamerRankingPosition: 0,
    rankTitle: '',
    welcomeGuideDone: true,
    store: {
      addressComplement: '',
      addressDistrict: '',
      addressNumber: '',
      addressStreet: '',
      addressType: '',
      averageRating: 5,
      city: '',
      cityId: '',
      corporateName: '',
      dateCreated: '',
      document: '',
      imageUrl: '',
      name: '',
      phoneNumber: '',
      state: '',
      storeId: '',
      type: 1,
      verified: false,
      zipCode: '',
    },
  },
  token: '',
  tutorialDone: false,
  analyticsIsUserSet: false,
  onboardingDone: false,
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case ADD_QUICK_PRODUCTS_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          welcomeGuideDone: true,
        },
      };
    }

    case CHANGE_PASSWORD:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Não foi possível alterar a senha',
      };

    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case CHANGE_USER_MAIN_ADDRESS:
      return {
        ...state,
        loading: true,
      };

    case CHANGE_USER_MAIN_ADDRESS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Não foi possível trocar o endereço principal do usuário',
      };

    case CHANGE_USER_MAIN_ADDRESS_SUCCESS: {
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          mainAddressId: action.payload.data || '',
        },
      };
    }

    case CREATE_STORE_SUCCESS: {
      const {user} = state;

      const newUser = {...user};

      newUser.isStore = true;
      newUser.store = action.payload.data;

      return {
        ...state,
        user: newUser,
      };
    }

    case EDIT_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case EDIT_PROFILE_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível editar o perfil',
      };
    }
    case EDIT_PROFILE_SUCCESS: {
      const {documentCpf, email, fullName, phoneNumber} = action.payload.data;
      const {user} = state;

      let name = '';
      let lastName = '';

      if (fullName) {
        let splitted = fullName.split(' ');
        name = splitted.shift() || '';
        lastName = splitted.join(' ');
      }

      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          cpf: documentCpf || user.cpf,
          email: email || user.email,
          lastName: lastName ? lastName : user.lastName,
          firstName: name || user.firstName,
          phoneNumber: phoneNumber || user.phoneNumber,
        },
      };
    }

    case LOGIN:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Verifique seu usuário e senha e tente novamente',
      };

    case LOGIN_SUCCESS: {
      const {token, user} = action.payload.data;

      return {
        ...state,
        error: '',
        loading: false,
        token,
        user: {...state.user, ...user},
      };
    }

    case LOGOUT:
      return initialState;

    case SAVE_USER_ADDRESS_SUCCESS: {
      const data = action.payload.data;

      const {
        address,
        addressId,
        city,
        district,
        gamerId,
        name,
        state: uf,
        zipCode,
      } = data;
      const {user} = state;

      const newAddress: Address = {
        bairro: district,
        cep: zipCode,
        complemento: '',
        id: addressId,
        localidade: city,
        logradouro: address,
        numero: '',
        tipo: name,
        uf,
        userId: gamerId,
      };

      return {
        ...state,
        loading: false,
        user: {
          ...user,
          mainAddressId: addressId,
          addresses: [newAddress, ...user.addresses],
        },
      };
    }

    case SET_ANALYTICS_USER_SET: {
      return {
        ...state,
        analyticsIsUserSet: action.payload.data.isUserSet,
      };
    }

    case SET_PROFILE_PICTURE: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_PROFILE_PICTURE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível alterar a imagem de perfil',
      };
    }
    case SET_PROFILE_PICTURE_SUCCESS: {
      const {imageUrl} = action.payload.data;

      const newUser = {...state.user};

      newUser.imageUrl = imageUrl;

      return {
        ...state,
        error: '',
        loading: false,
        user: newUser,
      };
    }

    case SET_TOKEN: {
      return {
        ...state,
        token: action.payload.data.token,
      };
    }

    case SET_TUTORIAL_DONE: {
      return {
        ...state,
        tutorialDone: action.payload.data.isDone,
      };
    }

    case SET_USER: {
      return {
        ...state,
        user: action.payload.data.user,
      };
    }

    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export function changePassword(data: ChangePasswordRequest): ChangePassword {
  return {
    type: CHANGE_PASSWORD,
    payload: {
      request: {
        method: 'POST',
        url: '/Auth/ChangePassword/v1',
        data,
      },
    },
  };
}

export function changeUserMainAddress(
  data: ChangeUserMainAddressRequest,
): ChangeUserMainAddress {
  return {
    type: CHANGE_USER_MAIN_ADDRESS,
    payload: {
      request: {
        method: 'POST',
        url: '/Address/SetAsCurrent/v1',
        data,
      },
    },
  };
}

export function editProfile(data: EditProfileRequest): EditProfile {
  return {
    type: EDIT_PROFILE,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/UpdateProfile/v1',
        data,
      },
    },
  };
}

export function login(email: string, password: string): Login {
  return {
    type: LOGIN,
    payload: {
      request: {
        method: 'POST',
        url: '/Auth/Login/v1',
        data: {
          email,
          password,
        },
      },
    },
  };
}

export function logout(): Logout {
  return {
    type: LOGOUT,
  };
}

export function setAnalyticsUserSet(isUserSet: boolean): SetAnalyticsUserSet {
  return {
    type: SET_ANALYTICS_USER_SET,
    payload: {
      data: {
        isUserSet,
      },
    },
  };
}

export function setProfilePicture(
  data: SetProfilePictureRequest,
): SetProfilePicture {
  return {
    type: SET_PROFILE_PICTURE,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/SetProfilePicture/v1',
        data,
      },
    },
  };
}

export function setToken(token: string): SetToken {
  return {
    type: SET_TOKEN,
    payload: {
      data: {token},
    },
  };
}

export function setTutorialDone(isDone: boolean): SetTutorialDone {
  return {
    type: SET_TUTORIAL_DONE,
    payload: {
      data: {isDone},
    },
  };
}

export function setUser(user: User): SetUser {
  return {
    type: SET_USER,
    payload: {
      data: {user},
    },
  };
}

export function setUserData(data: SetUserDataRequest): SetUserData {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
}

// Selectors
export function selectUserFullName(user: User): string {
  const {firstName, lastName} = user;

  return `${firstName ? firstName : ''}${lastName ? ' ' + lastName : ''}`;
}

export function selectUserMainAddress(state: State) {
  const {user} = state;

  return user.addresses.find(address => address.id === user.mainAddressId);
}

export function selectUserHasAddress(state: State) {
  const {addresses} = state.user;

  return addresses.length > 0;
}
