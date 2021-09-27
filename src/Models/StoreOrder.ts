export type StoreOrderStatusId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;

export interface GetStoreOrdersRequest {
  page: number;
  /**
   * null - Todos
   * Canceled - 0, "Pedido Cancelado"
   * 1 - Received - "Pedido Recebido", "Seu pedido foi recebido pela nossa plataforma! Falta só o lojista confirmá-lo. Aguenta ai!")
   * 2 - Confirmed - "Confirmado", @"Seu pedido foi confirmado pelo lojista! Logo mais ele vai para separação :D")
   * 3 - Separation - "Em Separação", @"Seu pedido esta sendo colocado em alguma caixa (acho que isso chama ""SEPARAÇÃO"") e logo será despachado.")
   * 4 - Posted - "Enviado aos Correios", "Seu pedido já está despachado. Logo logo ele estará em suas mãos gamers! Ah, e o código de rastreio é: ")
   * 5 - Delivered - "Pedido entregue", "O produto já está em suas mãos! Faça bom proveito.")
   * 7 - CombineWithdrawal - "Combinar Retirada", "Você optou por combinar a retirada com o vendedor. Assim que receber o produto, confirme que ele já está com voce!")
   */
  statusId: StoreOrderStatusId | null;
  storeId: string;
}

export interface GetStoreOrdersResponse {
  myOrders: MyOrderInfo[];
  products: ProductInfo[];
  count: number;
}

export interface MyOrderInfo {
  date: Date | string;
  myOrderId: string;
  price: number;
  store: string;
  viewId: string;
}

export interface ProductInfo {
  imageUrl: string;
  myOrderId: string;
  name: string;
  platform: string;
  price: number;
  productId: string;
}

export interface SetStoreOrderDataRequest {
  activeStoreOrder?: MyOrderInfo;
  page?: number;
  refreshing?: boolean;
  selectedStatusId?: StoreOrderStatusId;
}
