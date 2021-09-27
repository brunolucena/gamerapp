import {BaseAction, ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';
import {
  CustomerAccount,
  GetCustomerAccountRequest,
  GetCustomerAccountResponse,
} from 'src/Models/CustomerAccount';
import {
  TRANSFER_WITHDRAW_SUCCESS,
  TransferWithdrawSuccess,
} from './bankAccountDuck';

export const GET_CUSTOMER_ACCOUNT = 'GET_CUSTOMER_ACCOUNT';
export const GET_CUSTOMER_ACCOUNT_FAILURE = 'GET_CUSTOMER_ACCOUNT_FAILURE';
export const GET_CUSTOMER_ACCOUNT_SUCCESS = 'GET_CUSTOMER_ACCOUNT_SUCCESS';

export class GetCustomerAccount implements BaseAction {
  readonly type = GET_CUSTOMER_ACCOUNT;
  constructor(public payload: ActionPayload<GetCustomerAccountRequest>) {}
}
export class GetCustomerAccountFailure implements BaseAction {
  readonly type = GET_CUSTOMER_ACCOUNT_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetCustomerAccountSuccess implements BaseAction {
  readonly type = GET_CUSTOMER_ACCOUNT_SUCCESS;
  constructor(public payload: BaseResponse<GetCustomerAccountResponse>) {}
}

export type SellerActions =
  | GetCustomerAccount
  | GetCustomerAccountFailure
  | GetCustomerAccountSuccess
  | TransferWithdrawSuccess;

export interface State extends CustomerAccount {
  error: string;
  loading: boolean;
}

const initialState: State = {
  error: '',
  loading: false,
  accountId: '',
  amount: 0,
  document: '',
  name: '',
  statements: [],
  toDebit: 0,
  toReceive: 0,
};

export default function reducer(
  state = initialState,
  action: SellerActions,
): State {
  switch (action.type) {
    case GET_CUSTOMER_ACCOUNT: {
      return {
        ...state,
        error: '',
        loading: true,
      };
    }
    case GET_CUSTOMER_ACCOUNT_FAILURE: {
      return {
        ...state,
        error: 'Não foi possível carregas os dados da conta',
        loading: false,
      };
    }
    case GET_CUSTOMER_ACCOUNT_SUCCESS: {
      return {
        ...state,
        error: '',
        loading: false,
        ...action.payload.data,
      };
    }

    case TRANSFER_WITHDRAW_SUCCESS: {
      const {accountId, amount, toDebit, toReceive} = action.payload.data;

      return {
        ...state,
        accountId,
        amount,
        toDebit,
        toReceive,
      };
    }

    default: {
      return state;
    }
  }
}

export function getCustomerAccount(
  data: GetCustomerAccountRequest,
): GetCustomerAccount {
  return {
    type: GET_CUSTOMER_ACCOUNT,
    payload: {
      request: {
        method: 'GET',
        url: `/Customer/${data.customerId}/account`,
      },
    },
  };
}
