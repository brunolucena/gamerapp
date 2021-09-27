import {
  SignupModel,
  CreateUserRequest,
  ForgotPasswordRequest,
} from '../../Models/Signup';
import {Action, ActionAnyPayload} from 'src/Models/ReduxModels';

export const CLEAR_SIGNUP = 'CLEAR_SIGNUP';

export const SAVE_SIGNUP_DATA = 'SAVE_SIGNUP_DATA';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_FAIL = 'CREATE_USER_FAIL';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE';

export const UPDATE_HEARTS = 'UPDATE_HEARTS';

export const SEND_VERIFICATION_CODE_SIGNUP = 'SEND_VERIFICATION_CODE_SIGNUP';
export const SEND_VERIFICATION_CODE_SIGNUP_FAIL =
  'SEND_VERIFICATION_CODE_SIGNUP_FAIL';
export const SEND_VERIFICATION_CODE_SIGNUP_SUCCESS =
  'SEND_VERIFICATION_CODE_SIGNUP_SUCCESS';

export const VALIDATE_VERIFICATION_CODE = 'VALIDATE_VERIFICATION_CODE';
export const VALIDATE_VERIFICATION_CODE_FAIL =
  'VALIDATE_VERIFICATION_CODE_FAIL';
export const VALIDATE_VERIFICATION_CODE_SUCCESS =
  'VALIDATE_VERIFICATION_CODE_SUCCESS';

export interface ClearSignup {
  type: typeof CLEAR_SIGNUP;
}

function getSignupErrorFromCode(code: string) {
  if (code === 'DuplicateUserName') {
    return 'Usuário já cadastrado';
  }

  return 'Não foi possível criar o usuário';
}

export interface State extends SignupModel {
  error: string;
  hearts: number;
  loading: boolean;
}

const initialState: State = {
  error: '',
  loading: false,
  cpf: '',
  email: '',
  hearts: 4,
  isCompleted: false,
  isPhoneAlreadyRegistered: false,
  name: '',
  password: '',
  passwordCreated: false,
  phoneAuthenticated: false,
  phoneNumber: '',
  userCreated: false,
  verificationCode: '',
  verificationCodeSent: false,
  verificationCodeValidated: false,
};

export default function reducer(
  state = initialState,
  action: Action<any> | ActionAnyPayload,
): State {
  switch (action.type) {
    case UPDATE_HEARTS: {
      return {
        ...state,
        hearts: action.payload,
      };
    }

    case CLEAR_SIGNUP: {
      return {
        ...initialState,
      };
    }

    case FORGOT_PASSWORD: {
      return {
        ...state,
        loading: true,
      };
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }

    case FORGOT_PASSWORD_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }

    case CREATE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_USER_FAIL: {
      const {code, data} = action.payload;

      return {
        ...state,
        loading: false,
        error: data
          ? data.message
          : code
          ? getSignupErrorFromCode(code)
          : 'Não foi possível criar o usuário',
        userCreated: false,
      };
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        error: '',
        loading: false,
        userCreated: true,
      };
    }

    case SAVE_SIGNUP_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SEND_VERIFICATION_CODE_SIGNUP: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEND_VERIFICATION_CODE_SIGNUP_FAIL: {
      return {
        ...state,
        loading: false,
        error:
          action.error && action.error.message
            ? action.error.message
            : 'Não foi possível enviar o código para o telefone informado',
      };
    }
    case SEND_VERIFICATION_CODE_SIGNUP_SUCCESS: {
      return {
        ...state,
        error: action.payload.data
          ? action.payload.data.message || 'Número já cadastrado'
          : !action.payload.data.codeSent
          ? action.payload.data.message ||
            'Não foi possível enviar o código para o telefone informado'
          : '',
        loading: false,
        verificationCodeSent: action.payload.data.codeSent,
        isPhoneAlreadyRegistered: action.payload.data.isPhoneAlreadyRegistered,
      };
    }

    case VALIDATE_VERIFICATION_CODE: {
      return {
        ...state,
        loading: true,
      };
    }
    case VALIDATE_VERIFICATION_CODE_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível validar o código',
        verificationCodeValidated: false,
      };
    }
    case VALIDATE_VERIFICATION_CODE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error:
          !action.payload.data || !action.payload.data.success
            ? action.payload.data.message || 'Não foi possível validar o código'
            : '',
        verificationCodeValidated: action.payload.data.success,
      };
    }

    default: {
      return state;
    }
  }
}

export function clearSignup(): ClearSignup {
  return {
    type: CLEAR_SIGNUP,
  };
}

export function forgotPassword(
  data: ForgotPasswordRequest,
): Action<ForgotPasswordRequest> {
  return {
    type: FORGOT_PASSWORD,
    payload: {
      request: {
        method: 'POST',
        url: '/Auth/ForgotPassword/v1',
        data,
      },
    },
  };
}

export function updateHearts(heartsQty: number): ActionAnyPayload {
  return {
    type: UPDATE_HEARTS,
    payload: heartsQty,
  };
}

export function createUser(data: CreateUserRequest): Action<CreateUserRequest> {
  const {userType} = data;

  data.userType = userType || '1';

  return {
    type: CREATE_USER,
    payload: {
      request: {
        method: 'POST',
        url: '/Auth/Register/v1',
        data,
      },
    },
  };
}

export function saveSignupData(data: SignupModel): ActionAnyPayload {
  return {
    type: SAVE_SIGNUP_DATA,
    payload: data,
  };
}

export function sendVerificationCodeSignup(phoneNumber: string): Action<any> {
  return {
    type: SEND_VERIFICATION_CODE_SIGNUP,
    payload: {
      request: {
        method: 'POST',
        url: '/sendVerificationCodeSignup',
        data: {phoneNumber},
      },
    },
  };
}

export function validateVerificationCode(
  code: string,
  phoneNumber: string,
): Action<any> {
  return {
    type: VALIDATE_VERIFICATION_CODE,
    payload: {
      request: {
        method: 'POST',
        url: '/validateVerificationCode',
        data: {code, phoneNumber},
      },
    },
  };
}
