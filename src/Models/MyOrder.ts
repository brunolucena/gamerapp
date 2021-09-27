export type OrderStatusId = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';

export interface MyOrderAddNewRequest {
  gamerId: string;
  storeId: string;
  addressId: string;
  products: MyOrderAddNewProductItem[];
  postOfficeServiceId: string;
  paypalId?: string;
  paypalExecutePayment?: string;
  shippingPrice: number;
  couponId?: string;
}

export interface MyOrderAddNewResponse {
  myOrderId: string;
  viewId: string;
}

export interface MyOrderAddNewProductItem {
  productCatalogId: string;
  price: number;
  quantity: number;
}

export interface MyOrderItem {
  myOrderId: string;
  store: string;
  price: number;
  date: Date;
  viewId: string;
  status: string;
  statusId: OrderStatusId;
}

export interface MyOrderProductItem {
  myOrderId: string;
  productId: string;
  name: string;
  platform: string;
  imageUrl: string;
  price: number;
}

export interface MyOrderListItemRequest {
  gamerId: string;
  finishedOnly: boolean;
}

export interface MyOrderListItemResponse {
  myOrders: MyOrderItem[];
  products: MyOrderProductItem[];
}

export interface MyOrderDetails {
  myOrderProduct: MyOrderProductInfo[];
  postOfficeCode: string;
  postedAt?: Date | string;
  status: string;
  /**
   * 1- "Pedido Recebido"
   * 2- "Em Separação"
   * 3- "Enviado aos Correio
   * 4- "Pedido recebido"
   * 5- "Combinar Retirada"
   */
  statusId?: number;
}

export interface GetMyOrderDetailsRequest {
  myOrderId: string;
  gamerId: string;
}

export interface GetMyOrderDetailsResponse extends MyOrderDetails {}

export interface MyOrderProductInfo {
  imageUrl: string;
  platformId: string;
  platformName: string;
  productId: string;
  productName: string;
}

export interface MyOrderSummary {
  address: MyOrderSummaryAddressInfo;
  coupons: MyOrderSummaryCoupon[];
  discounts: MyOrderSyummaryDiscount[];
  price: MyOrderSummaryPrice;
  products: MyOrderSummaryProduct[];
  store: MyOrderSummaryStore;
}

export interface GetMyOrderSummaryRequest {
  myOrderId: string;
}

export interface GetMyOrderSummaryResponse extends MyOrderSummary {}

export interface MyOrderSummaryAddressInfo {
  addressId: string;
  city: string;
  complement: string;
  name: string;
  number: string;
  state: string;
  street: string;
}

export interface MyOrderSummaryStore {
  city: string;
  corporateName: string;
  imageUrl: string;
  stars: number;
  state: string;
  storeId: string;
}

export interface MyOrderSummaryProduct {
  imageUrl: string;
  platformId: string;
  platformName: string;
  price: number;
  productId: string;
  productName: string;
  storeProductId: string;
}

export interface MyOrderSyummaryDiscount {
  amount: number;
  name: string;
}

export interface MyOrderSummaryCoupon {
  amount: number;
  name: string;
}

export interface MyOrderSummaryPrice {
  amount: number;
  finalPrice: number;
  shipping: number;
}

export interface GetMyOrderStatusRequest {
  myOrderId: string;
}

export interface GetMyOrderStatusResponse {
  histories: MyOrderStatusHistoryInfo[];
}

export interface MyOrderStatusHistoryInfo {
  date: Date | string;
  description: string;
  historyId: string;
  postOfficeCode: string;
  status: string;
  /**
   * 1- "Pedido Recebido"
   * 2- "Em Separação"
   * 3- "Enviado aos Correio
   * 4- "Pedido recebido"
   * 5- "Combinar Retirada"
   */
  statusId: string;
}

export interface GetPostOfficeShippingRequest {
  fromZipCode: string;
  productIds: string[];
  serviceCode?: string;
  toZipCode: string;
}

export interface GetPostOfficeShippingResponse {
  shippingOptions: ShippingOption[];
}

export interface ShippingOption {
  postOfficeServiceId: string;
  serviceCode: string;
  serviceName: string;
  shippingDays: string;
  shippingValue: number;
}
