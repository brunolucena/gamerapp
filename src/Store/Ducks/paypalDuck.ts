import {BaseAction, BaseResponse, ActionPayload} from 'src/Models/ReduxModels';
import {
  GetAccessTokenRequest,
  GetAccessTokenResponse,
  PaymentRequest,
  PaymentResponse,
  ExecutePaymentResponse,
  ExecutePaymentRequest,
} from 'src/Models/PayPal';
import {BaseErrorResponse} from 'src/Models/Login';

export const CLEAR_APPROVAL_URL = 'CLEAR_APPROVAL_URL';
export const CLEAR_PAYPAL = 'CLEAR_PAYPAL';

export const GET_ACCESS_TOKEN = 'GET_ACCESS_TOKEN';
export const GET_ACCESS_TOKEN_SUCCESS = 'GET_ACCESS_TOKEN_SUCCESS';
export const GET_ACCESS_TOKEN_FAILURE = 'GET_ACCESS_TOKEN_FAILURE';

export const PAYPAL_PAYMENT = 'PAYPAL_PAYMENT';
export const PAYPAL_PAYMENT_SUCCESS = 'PAYPAL_PAYMENT_SUCCESS';
export const PAYPAL_PAYMENT_FAILURE = 'PAYPAL_PAYMENT_FAILURE';

export const PAYPAL_PAYMENT_EXECUTE = 'PAYPAL_PAYMENT_EXECUTE';
export const PAYPAL_PAYMENT_EXECUTE_SUCCESS = 'PAYPAL_PAYMENT_EXECUTE_SUCCESS';
export const PAYPAL_PAYMENT_EXECUTE_FAILURE = 'PAYPAL_PAYMENT_EXECUTE_FAILURE';

export class ClearApprovarUrl implements BaseAction {
  readonly type = CLEAR_APPROVAL_URL;
  constructor(public payload: {}) {}
}

export interface ClearPaypal {
  type: typeof CLEAR_PAYPAL;
}

export class GetAccessToken implements BaseAction {
  readonly type = GET_ACCESS_TOKEN;
  constructor(public payload: ActionPayload<GetAccessTokenRequest>) {}
}
export class GetAccessTokenFailure implements BaseAction {
  readonly type = GET_ACCESS_TOKEN_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetAccessTokenSuccess implements BaseAction {
  readonly type = GET_ACCESS_TOKEN_SUCCESS;
  constructor(public payload: BaseResponse<GetAccessTokenResponse>) {}
}

export class PayPalPayment implements BaseAction {
  readonly type = PAYPAL_PAYMENT;
  constructor(public payload: ActionPayload<PaymentRequest>) {}
}
export class PayPalPaymentFailure implements BaseAction {
  readonly type = PAYPAL_PAYMENT_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class PayPalPaymentSuccess implements BaseAction {
  readonly type = PAYPAL_PAYMENT_SUCCESS;
  constructor(public payload: BaseResponse<PaymentResponse>) {}
}

export class PayPalPaymentExecute implements BaseAction {
  readonly type = PAYPAL_PAYMENT_EXECUTE;
  constructor(public payload: ActionPayload<ExecutePaymentRequest>) {}
}
export class PayPalPaymentExecuteFailure implements BaseAction {
  readonly type = PAYPAL_PAYMENT_EXECUTE_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class PayPalPaymentExecuteSuccess implements BaseAction {
  readonly type = PAYPAL_PAYMENT_EXECUTE_SUCCESS;
  constructor(public payload: BaseResponse<ExecutePaymentResponse>) {}
}

export type PayPalActions =
  | GetAccessTokenSuccess
  | GetAccessToken
  | GetAccessTokenFailure
  | ClearApprovarUrl
  | ClearPaypal
  | PayPalPayment
  | PayPalPaymentFailure
  | PayPalPaymentSuccess
  | PayPalPaymentExecute
  | PayPalPaymentExecuteFailure
  | PayPalPaymentExecuteSuccess;

export interface State {
  error: string;
  loading: boolean;
  bearerToken: string;
  paymentId: string;
  approvalUrl: string;
  executePaymentResponse: ExecutePaymentResponse;
}

const initialState: State = {
  error: '',
  loading: false,
  bearerToken: '',
  paymentId: '',
  approvalUrl: '',
  executePaymentResponse: {  
    id: "",
    intent: "",
    state: "",
    cart: "",
    payer: {    
      payment_method: "",
      status: "",
      payer_info: {      
        email: "",
        first_name: "",
        last_name: "",
        payer_id: "",
        shipping_address: {        
          recipient_name: "",
          line1: "",
          city: "",
          state: "",
          postal_code: "",
          country_code: "",
        },
        country_code: "",
      },
    },
    transactions: [],
    create_time: "",
    links: [],
  }
};

export default function reducer(
  state = initialState,
  action: PayPalActions,
): State {
  switch (action.type) {
    case CLEAR_APPROVAL_URL: {
      return {
        ...state,
        approvalUrl: '',
      };
    }

    case CLEAR_PAYPAL: {
      return {
        ...initialState,
      }
    }

    case GET_ACCESS_TOKEN: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ACCESS_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível concluir a solicitação',
      };
    }

    case GET_ACCESS_TOKEN_SUCCESS: {
      const {access_token} = action.payload.data;

      return {
        ...state,
        bearerToken: access_token,
      };
    }

    case PAYPAL_PAYMENT: {
      return {
        ...state,
        loading: true,
        error: '',
      };;
    }

    case PAYPAL_PAYMENT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível solicitar o pagamento',
      };;
    }

    case PAYPAL_PAYMENT_SUCCESS: {
      const {links} = action.payload.data;

      const approvalUrl = links.find(link => link.rel === 'approval_url');

      return {
        ...state,
        loading: false,
        error: '',
        approvalUrl: approvalUrl?.href || '',
      };;
    }

    case PAYPAL_PAYMENT_EXECUTE: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }
    case PAYPAL_PAYMENT_EXECUTE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível concluir o pagamento',
      }
    }
    case PAYPAL_PAYMENT_EXECUTE_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        executePaymentResponse: action.payload.data,
      }
    }

    default: {
      return state;
    }
  }
}

// Actions
export function clearApprovalUrl(): ClearApprovarUrl {
  return {
    type: CLEAR_APPROVAL_URL,
    payload: {},
  };
}

export function clearPaypal(): ClearPaypal {
  return {
    type: CLEAR_PAYPAL,
  };
}

export function getAccessToken(data: GetAccessTokenRequest): GetAccessToken {
  return {
    type: GET_ACCESS_TOKEN,
    payload: {
      request: {
        method: 'GET',
        url: '/MyOrder/GetPaymentToken/v1',
        data,
      },
    },
  };
}

export function paypalPayment(data: PaymentRequest): PayPalPayment {
  return {
    type: PAYPAL_PAYMENT,
    payload: {
      client: 'paypal',
      request: {
        method: 'POST',
        url: '/v1/payments/payment',
        data,
      },
    },
  };
}

export function paypalPaymentExecute(data: ExecutePaymentRequest, paymentId: string): PayPalPaymentExecute {
  return {
    type: PAYPAL_PAYMENT_EXECUTE,
    payload: {
      client: 'paypal',
      request: {
        method: 'POST',
        url: `/v1/payments/payment/${paymentId}/execute`,
        data
      }
    }
  }
}
