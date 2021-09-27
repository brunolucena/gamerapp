import {User} from './User';
import {GamerRanking} from './GamerRanking';
import {Product, GamerProductCatalog} from './Product';

export interface Gamer {
  id: string;
  user: User;
  gamerProductCatalog: GamerProductCatalog[];
  gamerRanking?: GamerRanking;
  gamerWishLists?: Product[];
}

export interface AddGameToGamerCollectionRequest {
  userId: string;
  productId: string;
  price: number;
  availableForTrade: boolean;
  verify: boolean;
  photos: string[];
  verificationPhoto: string;
}

export interface AddGameToGamerCollectionResponse {
  success: boolean;
}

export interface AddQuickProductRequest {
  gamerId: string;
  products: AddQuickProductProducts[];
  type: 'wishlist' | 'catalog';
  welcomeGuideDone: boolean;
}

export interface AddQuickProductProducts {
  productId: string;
  platformId?: string;
  mediaType?: 'fisica' | 'digital';
}

export interface SetDeviceTokenRequest {
  gamerId: string;
  token: string;
}

export interface SetDeviceTokenResponse {}
