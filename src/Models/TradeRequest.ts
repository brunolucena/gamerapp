import {Gamer} from './Gamer';
import {GamerProductCatalog} from './Product';

/**
 * 0- Pending
 * 1- Aceito
 * 2- Rejeitado
 * 3- Contra-Proposta
 */
export type TradeRequestStatusId = 0 | 1 | 2 | 3;

export interface TradeRequest {
  tradeRequestId: string;
  tradeRequestNumberId: string;
  fromGamerId: string;
  fromGamer: Gamer;
  fromGamerAmount: number;
  fromGamerAccepted: boolean;
  toGamerId: string;
  toGamer: Gamer;
  toGamerAmount: number;
  toGamerAccepted: boolean;
  isDone: boolean;
  tradeRequestParentId: string;
  tradeRequestParent?: TradeRequest;
  tradeRequestHistory?: TradeRequest[];
  tradeRequestItems: GamerProductCatalog[];
  saleId: string;
  //  Sale: Sale;
}

export interface GetTradesRequestListRequest {
  gamerId: string;
}

export interface GetTradesRequestListResponse {
  tradeRequests: TradesRequestListItem[];
}

export interface TradesRequestListItem {
  tradeRequestId: string;
  tradeViewId: string;
  gamerParts: TradesListItemGamerPart[];
  status: 'Pending';
  tradeRequesItens: TradesListItemTradeRequestItem[];
  city: string;
  state: string;
  distance?: number;
  date: Date;
}

export interface TradesListItemGamerPart {
  avatarURL: string;
  experiencePoints: number;
  gamerId: string;
  name: string;
  offeredPrice: number;
  rank: string;
  starter: boolean;
}

export interface TradesListItemTradeRequestItem {
  category: string;
  imageURL: string;
  name: string;
  ownerId: string;
  productId: string;
}

export interface GetAutoTradesListRequest {
  gamerId: string;
}

export interface GetAutoTradesListResponse {
  autoTradeRequests: AutoTrade[];
}

export interface AutoTrade {
  autoTradeId: string;
  city: string;
  distance: number;
  gamer: string;
  gamerId: string;
  gamerRank: string;
  productsForTrade: AutoTradeProduct[];
  stars: number;
  state: string;
  tradeViewId: string;
}

export interface AutoTradeProduct {
  gamerId: string;
  gamerProductCatalogId: string;
  imageUrl: string;
  productId: string;
  productName: string;
}

export interface GetTradeRequest {
  tradeRequestId: string;
  fromGamerId: string;
  toGamerId: string;
}

export interface SaveTradeRequestRequest {
  AutoTradeId: string;
  GamerId: string;
  GamerParts: SaveTradeRequestPart[];
  GamerProductCatalogIds: string[];
  RootTradeId: string;
  TradeRequestId: string;
}

export interface SaveTradeRequestPart {
  GamerId: string;
  OfferedPrice: number;
}

export interface SaveTradeRequestResponse {
  tradeRequestId: string;
  experiencePoints: number;
}

export interface Trade {
  TradeViewId: number;
  TradeId: string;
  Date: Date;
  Name: string;
  City: string;
  State: string;
  Distance: number;
  Status: string;
  StatusId: number;
}

export interface TradeRequestDetails {
  tradeRequestId: string;
  rootTradeId: string;
  status: string;
  statusId: number;
}

export interface TradeRequestPart {
  imageUrl: string;
  gamerId: string;
  gamerName: string;
  gamerRankTitle: string;
  gamerRating: number;
  offeredPrice: number;
  starter: boolean;
  tradeId: string | 'New';
}

export interface TradeRequestItem {
  gamerId: string;
  imageUrl: string;
  platformName: string;
  productCatalogId: string;
  productId: string;
  productInWishlist: boolean;
  productName: string;
  productVerified: boolean;
  selected: boolean;
  tradeId: string | 'New';
}

export interface GetTradesListRequest {
  gamerId: string;
}

export interface GetTradesListResponse {
  trades: TradesListItem[];
}

export interface TradesListItem {
  city: string;
  date: Date;
  distance: number;
  name: string;
  state: string;
  status:
    | 'Aguardando andamento'
    | 'Troca finalizada'
    | 'Jogadores negociando entrega';
  statusId: number;
  tradeId: string;
  tradeViewId: string | null;
}

export interface ChangeTradeRequestStatus {
  gamerId: string;
  /**
   * 1- Aceitar
   * 2- Recusar
   */
  status: 1 | 2;
  tradeRequestId: string;
}

export interface ChangeTradeRequestStatusResponse {
  experiencePoints: number;
  trade?: TradesListItem;
  /**
   * 1- Aprovado
   * 2- Recusado
   */
  status: 1 | 2;
  tradeRequestId?: string;
}

export interface GetTradeRequestDetailsRequest {
  AutoTradeId?: string;
  FromGamerId: string;
  SelectedGamerProductCatalogId: string;
  ToGamerId: string;
  TradeRequestId?: string;
}

export interface GetTradeRequestDetailsResponse {
  tradeDetails: TradeRequestDetails;
  tradeItems: TradeRequestItem[];
  tradeParts: TradeRequestPart[];
}

export interface ChangeTradeRequestStatusRequest {
  GamerId: string;
  Status: TradeRequestStatusId;
  TradeRequestId: string;
}

export interface SetTradeListStatus {
  tradeId: string;
  status: 'Aguardando andamento' | 'Troca finalizada';
}
