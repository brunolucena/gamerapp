export interface BankAccount {
  branch: string;
  bankName: string;
  bankNumber: string;
  bankId: string;
  number: string;
  ownerName: string;
}

export interface CustomerAccountAddRequest {
  bankId: string;
  branch: string;
  code: string;
  customerId: string;
  number: string;
}

export interface CustomerAccountAddResponse {
  customerAccountId: string;
}

export interface GetCustomerAccountsListRequest {
  customerId: string;
}

export interface GetCustomerAccountsListResponse {
  accounts: AccountInfo[];
}

export interface AccountInfo {
  accountId: string;
  bankId?: string;
  bankName: string;
  branch: string;
  code: string;
  number: string;
  isBankAccount: boolean;
}

export interface Bank {
  bankId: string;
  code: string;
  name: string;
}

export interface SetBankAccountDataRequest {
  accounts?: AccountInfo[];
  error?: string;
  loading?: boolean;
}

export interface TransferWithdrawRequest {
  amount: number;
  fromAccountId: string;
  toAccountId: string;
}

export interface TransferWithdrawResponse {
  accountId: string;
  amount: number;
  toDebit: number;
  toReceive: number;
}

export interface GetBanksRequest {
  page: number;
  searchText: string;
}

export interface GetBanksResponse {
  banks: BankInfo[];
  count: number;
}

export interface BankInfo {
  bankId: string;
  code: string;
  name: string;
}
