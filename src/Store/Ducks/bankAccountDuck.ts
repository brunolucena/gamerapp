import {BaseAction, ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';
import {
  AccountInfo,
  BankInfo,
  CustomerAccountAddRequest,
  CustomerAccountAddResponse,
  GetBanksRequest,
  GetBanksResponse,
  GetCustomerAccountsListRequest,
  GetCustomerAccountsListResponse,
  SetBankAccountDataRequest,
  TransferWithdrawRequest,
  TransferWithdrawResponse,
} from 'src/Models/BankAccount';

export const CUSTOMER_ACCOUNT_ADD = 'CUSTOMER_ACCOUNT_ADD';
export const CUSTOMER_ACCOUNT_ADD_FAILURE = 'CUSTOMER_ACCOUNT_ADD_FAILURE';
export const CUSTOMER_ACCOUNT_ADD_SUCCESS = 'CUSTOMER_ACCOUNT_ADD_SUCCESS';

export const GET_BANKS = 'GET_BANKS';
export const GET_BANKS_FAILURE = 'GET_BANKS_FAILURE';
export const GET_BANKS_SUCCESS = 'GET_BANKS_SUCCESS';

export const GET_CUSTOMER_ACCOUNTS_LIST = 'GET_CUSTOMER_ACCOUNTS_LIST';
export const GET_CUSTOMER_ACCOUNTS_LIST_FAILURE =
  'GET_CUSTOMER_ACCOUNTS_LIST_FAILURE';
export const GET_CUSTOMER_ACCOUNTS_LIST_SUCCESS =
  'GET_CUSTOMER_ACCOUNTS_LIST_SUCCESS';

export const TRANSFER_WITHDRAW = 'TRANSFER_WITHDRAW';
export const TRANSFER_WITHDRAW_FAILURE = 'TRANSFER_WITHDRAW_FAILURE';
export const TRANSFER_WITHDRAW_SUCCESS = 'TRANSFER_WITHDRAW_SUCCESS';

export const SET_BANK_ACCOUNT_DATA = 'SET_BANK_ACCOUNT_DATA';

export class CustomerAccountAdd implements BaseAction {
  readonly type = CUSTOMER_ACCOUNT_ADD;
  constructor(public payload: ActionPayload<CustomerAccountAddRequest>) {}
}
export class CustomerAccountAddFailure implements BaseAction {
  readonly type = CUSTOMER_ACCOUNT_ADD_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class CustomerAccountAddSuccess implements BaseAction {
  readonly type = CUSTOMER_ACCOUNT_ADD_SUCCESS;
  constructor(public payload: BaseResponse<CustomerAccountAddResponse>) {}
}

export class GetBanks implements BaseAction {
  readonly type = GET_BANKS;
  constructor(public payload: ActionPayload<GetBanksRequest>) {}
}
export class GetBanksFailure implements BaseAction {
  readonly type = GET_BANKS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetBanksSuccess implements BaseAction {
  readonly type = GET_BANKS_SUCCESS;
  constructor(public payload: BaseResponse<GetBanksResponse>) {}
}

export class GetCustomerAccountsList implements BaseAction {
  readonly type = GET_CUSTOMER_ACCOUNTS_LIST;
  constructor(public payload: ActionPayload<GetCustomerAccountsListRequest>) {}
}
export class GetCustomerAccountsListFailure implements BaseAction {
  readonly type = GET_CUSTOMER_ACCOUNTS_LIST_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetCustomerAccountsListSuccess implements BaseAction {
  readonly type = GET_CUSTOMER_ACCOUNTS_LIST_SUCCESS;
  constructor(public payload: BaseResponse<GetCustomerAccountsListResponse>) {}
}

export interface SetBankAccountData {
  type: typeof SET_BANK_ACCOUNT_DATA;
  payload: SetBankAccountDataRequest;
}

export class TransferWithdraw implements BaseAction {
  readonly type = TRANSFER_WITHDRAW;
  constructor(public payload: ActionPayload<TransferWithdrawRequest>) {}
}
export class TransferWithdrawFailure implements BaseAction {
  readonly type = TRANSFER_WITHDRAW_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class TransferWithdrawSuccess implements BaseAction {
  readonly type = TRANSFER_WITHDRAW_SUCCESS;
  constructor(public payload: BaseResponse<TransferWithdrawResponse>) {}
}

export type SellerActions =
  | CustomerAccountAdd
  | CustomerAccountAddFailure
  | CustomerAccountAddSuccess
  | GetBanks
  | GetBanksFailure
  | GetBanksSuccess
  | GetCustomerAccountsList
  | GetCustomerAccountsListFailure
  | GetCustomerAccountsListSuccess
  | SetBankAccountData
  | TransferWithdraw
  | TransferWithdrawFailure
  | TransferWithdrawSuccess;

export interface State {
  error: string;
  loading: boolean;
  accounts: AccountInfo[];
  banks: BankInfo[];
  banksCount: number;
}

const initialState: State = {
  error: '',
  loading: false,
  accounts: [],
  banks: [],
  banksCount: 0,
};

export default function reducer(
  state = initialState,
  action: SellerActions,
): State {
  switch (action.type) {
    case CUSTOMER_ACCOUNT_ADD: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case CUSTOMER_ACCOUNT_ADD_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível adicionar a conta bancária',
      };
    }
    case CUSTOMER_ACCOUNT_ADD_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      };
    }

    case GET_BANKS: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case GET_BANKS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível carregar a lista bancos',
      };
    }
    case GET_BANKS_SUCCESS: {
      const {banks, count} = action.payload.data;

      return {
        ...state,
        loading: false,
        error: '',
        banks,
        banksCount: count,
      };
    }

    case GET_CUSTOMER_ACCOUNTS_LIST: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case GET_CUSTOMER_ACCOUNTS_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível carregar a lista de contas bancárias',
      };
    }
    case GET_CUSTOMER_ACCOUNTS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        accounts: action.payload.data.accounts,
      };
    }

    case SET_BANK_ACCOUNT_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case TRANSFER_WITHDRAW: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case TRANSFER_WITHDRAW_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível realizar a transferência',
      };
    }
    case TRANSFER_WITHDRAW_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      };
    }

    default: {
      return state;
    }
  }
}

export function customerAccountAdd(
  data: CustomerAccountAddRequest,
): CustomerAccountAdd {
  return {
    type: CUSTOMER_ACCOUNT_ADD,
    payload: {
      request: {
        method: 'POST',
        url: '/CustomerAccount',
        data,
      },
    },
  };
}

export function getBanks(data: GetBanksRequest): GetBanks {
  const {page, searchText} = data;

  return {
    type: GET_BANKS,
    payload: {
      request: {
        method: 'GET',
        url: `/Bank?searchText=${searchText}&page=${page}`,
        data,
      },
    },
  };
}

export function getCustomerAccountsList(
  customerId: string,
): GetCustomerAccountsList {
  return {
    type: GET_CUSTOMER_ACCOUNTS_LIST,
    payload: {
      request: {
        method: 'GET',
        url: `/CustomerAccount/${customerId}`,
      },
    },
  };
}

export function setBankAccountData(
  data: SetBankAccountDataRequest,
): SetBankAccountData {
  return {
    type: SET_BANK_ACCOUNT_DATA,
    payload: data,
  };
}

export function transferWithdraw(
  data: TransferWithdrawRequest,
): TransferWithdraw {
  return {
    type: TRANSFER_WITHDRAW,
    payload: {
      request: {
        method: 'POST',
        url: '/Transfer/Withdraw/v1',
        data,
      },
    },
  };
}

// Selectors
export function selectMyBankAccounts(state: State): AccountInfo[] {
  return state.accounts.filter(account => account.isBankAccount);
}

export function selectMyGamerPayAccount(state: State): AccountInfo | undefined {
  const gamerPayAccount = state.accounts.find(
    account => !account.isBankAccount,
  );

  return gamerPayAccount;
}
