export type OrderStatusId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface GetSellerMyOrderDetailsRequest {
  myOrderId: string;
  storeId: string;
}

export interface GetSellerMyOrderDetailsResponse {
  deliveryAddress: SellerMyOrderAddressInfo;
  gamer: SellerMyOrderGamerInfo;
  price: SellerMyOrderPriceInfo;
  products: SellerMyOrderProductInfo[];
}

export interface SellerMyOrderAddressInfo {
  city: string;
  complement: string;
  number: string;
  state: string;
  street: string;
  zipCode: string;
}

export interface SellerMyOrderGamerInfo {
  document: string;
  name: string;
}

export interface SellerMyOrderProductInfo {
  platformName: string;
  price: number;
  productName: string;
}

export interface SellerMyOrderPriceInfo {
  liquidAmount: number;
  postOffice: number;
  postOfficeInfo: string;
  subTotal: number;
  tax: number;
  taxInfo: string;
}

export interface GetSellerMyOrderSummaryRequest {
  myOrderId: string;
  storeId: string;
}

export interface GetSellerMyOrderSummaryResponse {
  amount: number;
  lastStatusDate?: Date | string;
  nextStatus: string;
  nextStatusId: OrderStatusId;
  plpUrl: string;
  postOfficeCode: string;
  products: SellerMyOrderProductInfo[];
  status: string;
  statusId: string | number;
}

export interface SellerMyOrderProductInfo {
  imageUrl: string;
  platformName: string;
  productId: string;
  productName: string;
}

export interface SetSellerOrderDataRequest {
  activeMyOrderId?: string;
}

export interface ChangeMyOrderStatusRequest {
  auxiliarId: string;
  myOrderId: string;
  /**
   * Canceled - 0, "Pedido Cancelado"
   * Received - 1, "Pedido Recebido", "Seu pedido foi recebido pela nossa plataforma! Falta só o lojista confirmá-lo. Aguenta ai!")
   * Confirmed - 2, "Confirmado", @"Seu pedido foi confirmado pelo lojista! Logo mais ele vai para separação :D")
   * Separation - 3, "Em Separação", @"Seu pedido esta sendo colocado em alguma caixa (acho que isso chama ""SEPARAÇÃO"") e logo será despachado.")
   * Posted - 4, "Enviado aos Correios", "Seu pedido já está despachado. Logo logo ele estará em suas mãos gamers! Ah, e o código de rastreio é: ")
   * Delivered - 5, "Pedido entregue", "O produto já está em suas mãos! Faça bom proveito.")
   * CombineWithdrawal - 7, "Combinar Retirada", "Você optou por combinar a retirada com o vendedor. Assim que receber o produto, confirme que ele já está com voce!")
   */
  statusId: OrderStatusId;
  storeId: string;
}

export interface ChangeMyOrderStatusResponse {
  generatePlp: boolean;
  nextStatus: string;
  nextStatusId: OrderStatusId;
  pdfUrl: string;
  postOfficeCode: string;
}
