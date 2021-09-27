import {State as PosTradeState} from '../Store/Ducks/tradeDetails';

export interface TradeDetails {
  tradeId: string;
  deliveryHistory: TradeDeliveryHistory[];
  ratings: TradeRatingHistory[];
}

export interface TradeDeliveryHistory {
  gamerId: string;
  status: 'Entregue' | 'Recebido';
  date: Date;
}

export interface TradeRatingHistory {
  gamerId: string;
  rating: number;
}

export interface TradeDetailsPart {
  gamerId: string;
  gamerName: string;
  gamerRankTitle: string;
  gamerRating: number;
  hasSeenTradeCompleted: boolean;
  imageUrl: string;
  offeredPrice: number;
  tradeId: string | 'New';
}

export interface TradeDetailsItem {
  productCatalogId: string;
  productId: string;
  imageUrl: string;
  gamerId: string;
  productVerified: boolean;
  productName: string;
  selected: boolean;
  tradeId: string;
  productInWishlist: boolean;
}

export interface GetTradeDetailsRequest {
  gamerId: string;
  tradeId: string;
}

export interface GetTradeDetailsResponse {
  tradeDetails: TradeDetails;
  tradeItems: TradeDetailsItem[];
  tradeParts: TradeDetailsPart[];
}

export interface SetDeliveryStatusRequest {
  /**
   * 1- Entregue
   * 2- Recebido
   * 3- Não recebido
   * 4- Não entregue
   */
  deliveryStatusId: 1 | 2 | 3 | 4;
  tradeId: string;
  gamerId: string;
}

export interface SetDeliveryStatusResponse {
  deliveryHistory: TradeDeliveryHistory[];
  experiencePoints: number;
  gamerId: string;
  tradeDeliveryHistoryId: string;
}

export interface SetTradeRatingRequest {
  gamerId: string;
  rating: number;
  tradeId: string;
}

export interface SetTradeRatingResponse {
  experiencePoints: number;
  ratingHistory: TradeRatingHistory[];
  tradeDeliveryHistoryId: string;
}

export interface TradeDeliveryStatusEnum {
  status: 'entregue' | 'recebido';
  statusId?: number;
}

export interface SelectPosTradePart {
  state: PosTradeState;
  gamerId: string;
  part: 'me' | 'other';
}

export interface SelectPosTradeItems {
  state: PosTradeState;
  gamerId: string;
  part: 'me' | 'other';
}
