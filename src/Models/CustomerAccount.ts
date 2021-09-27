export interface CustomerAccount {
  accountId: string;
  amount: number;
  document: string;
  name: string;
  statements: StatementInfo[];
  toDebit: number;
  toReceive: number;
}

export interface GetCustomerAccountRequest {
  customerId: string;
}

export interface GetCustomerAccountResponse extends CustomerAccount {}

export interface StatementInfo {
  amount: number;
  statementId: string;
  type: string;
}
