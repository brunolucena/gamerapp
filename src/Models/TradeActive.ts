import {TradeRequestItem} from './TradeRequest';
import {State as TradeActiveState} from '../Redux/Ducks/tradeActive';

export interface AddTradeItems {
  items: TradeRequestItem[];
}

export interface RemoveTradeItems {
  items: TradeRequestItem[];
}

export interface ChangeOfferedPrice {
  gamerId: string;
  value: number;
}

export interface SelectTradePart {
  state: TradeActiveState;
  gamerId: string;
  part: 'me' | 'other';
}

export interface SelectTradeItems {
  state: TradeActiveState;
  gamerId: string;
  part: 'me' | 'other';
}

export interface ActiveTrade {
  fromGamerId: string;
  selectedGamerProductCatalogId: string;
  toGamerId: string;
  tradeRequestId?: string;
  tradeViewId?: string;
  autoTradeId?: string;
}
