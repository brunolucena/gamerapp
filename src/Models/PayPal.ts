export interface GetAccessTokenRequest {}

export interface GetAccessTokenResponse {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

export interface PaymentResponse {
  id: string;
  intent: 'sale';
  state: string;
  payer: PaymentRequestPayer;
  transactions: PaymentResponseTransaction[];
  note_to_payer: string;
  /** In UTC */
  create_time: Date;
  links: Link[];
}

export interface PaymentResponseTransaction {
  amount: TransactionAmount;
  /** This is the payment transaction description. */
  description: string;
  /** This is a hidden value */
  custom: string;
  /** unique_invoice_number */
  invoice_number: string;
  soft_descriptor: string;
  item_list: PaymentRequestItemList;
  related_resources: any[];
}

export interface PaymentRequest {
  intent: 'sale';
  payer: PaymentRequestPayer;
  transactions: PaymentRequestTransaction[];
  note_to_payer?: string;
  redirect_urls: RedirectUrls;
}

export interface RedirectUrls {
  return_url: string;
  cancel_url: string;
}

export interface PaymentRequestTransaction {
  amount: TransactionAmount;
  /** This is the payment transaction description */
  description?: string;
  /** This is a hidden value */
  custom?: string;
  /** unique_invoice_number */
  invoice_number?: string;
  soft_descriptor?: string;
  item_list: PaymentRequestItemList;
}

export interface PaymentRequestItemList {
  items: PaymentRequestItem[];
}

export interface PaymentRequestItem {
  name: string;
  description: string;
  quantity: string;
  price: string;
  sku: string;
  currency: string;
}

export interface PaymentRequestPayer {
  payment_method: 'paypal';
}

export interface ExecutePaymentRequest {
  payer_id: string;
}

export interface ExecutePaymentResponse {
  id: string;
  intent: string;
  state: string;
  cart: string;
  payer: Payer;
  transactions: Transaction[];
  create_time: string;
  links: Link[];
}

export interface Link {
  href: string;
  rel: string;
  method: string;
}

export interface Payer {
  payment_method: string;
  status: string;
  payer_info: PayerInfo;
}

export interface PayerInfo {
  email: string;
  first_name: string;
  last_name: string;
  payer_id: string;
  shipping_address: ShippingAddress;
  country_code: string;
}

export interface ShippingAddress {
  recipient_name: string;
  line1: string;
  city: string;
  state: string;
  postal_code: string;
  country_code: string;
}

export interface Transaction {
  amount: TransactionAmount;
  payee?: TransactionPayee;
  description?: string;
  custom?: string;
  invoice_number?: string;
  item_list?: TransactionItemList;
  related_resources?: TransactionRelatedResource[];
}

export interface TransactionRelatedResource {
  sale: Sale;
}

export interface Sale {
  id: string;
  state: string;
  amount: TransactionAmount;
  payment_mode: string;
  protection_eligibility: string;
  protection_eligibility_type: string;
  transaction_fee: TransactionFee;
  parent_payment: string;
  create_time: string;
  update_time: string;
  links: Link[];
}

export interface TransactionFee {
  value: string;
  currency: string;
}

export interface TransactionItemList {
  items: TransactionItem[];
  shipping_address: ShippingAddress;
}

export interface TransactionItem {
  name: string;
  sku: string;
  description: string;
  price: string;
  currency: string;
  quantity: number;
}

export interface TransactionPayee {
  merchant_id: string;
  email: string;
}

export interface TransactionAmount {
  total: string;
  currency: string;
  details: TransactionAmountDetails;
}

export interface TransactionAmountDetails {
  subtotal: string;
  tax: string;
  shipping: string;
  insurance: string;
  handling_fee: string;
  shipping_discount: string;
}
