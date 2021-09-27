export interface GamerProductDetails {
  cashback: number;
  forSale?: boolean;
  forTrade?: boolean;
  gamer: GamerProductGamer | null;
  gamerId: string;
  hasDelivery: boolean;
  id: string;
  imageUrl: string;
  name: string;
  photos: string[];
  platform: string;
  price: GamerProductDetailsPrice2;
  productId: string;
  store: GamerProductStore | null;
}

export interface GamerProductGamer {
  averageRating: number;
  city: string | null;
  distance: number;
  experiencePoints: number;
  gamerId: string;
  imageUrl: string;
  name: string;
  negotiationsCount: number;
  nextLevelRank: string;
  nextLevelTotalExperiencePoints: number;
  orderMinimumValue: number;
  position: number;
  rankTitle: string;
  state: string | null;
  tradesFinishedCount: number;
  zipCode: string;
}

export interface GamerProductStore {
  id: string;
  name: string;
  city: string;
  state: string;
  distance: number;
  imageUrl: string;
  orderMinimumValue: number;
  proStore: boolean;
  stars: number | null;
  storeRating: number | null;
  trustedDelivery: boolean;
  info: StoreInfo[];
  zipCode: string;
}

export interface StoreInfo {
  title: string;
  text: string;
}

export interface GamerProductDetailsPrice {
  offerPrice: number;
  price: number;
}

export interface GamerProductDetailsPrice2 {
  current: number;
  original: number;
}

export interface GetGamerProductDetailsRequest {
  /** Id do produto*/
  catalogId: string;
  /**
   * 1- Store
   * 2- Gamer
   */
  catalogType: 1 | 2;
  /** Id do gamer logado */
  gamerId: string;
  /** Id da loja ou gamer */
  id: string;
}

export interface GetGamerProductDetailsResponse extends GamerProductDetails {}
