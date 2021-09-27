export type ProductType = 'Game' | 'Plataforma' | 'Acessorio';
export type ProductMediaType = 'Fisica' | 'Digital';

export interface GamerProductCollectionGame {
  forSale: boolean;
  forTrade: boolean;
  gamerProductCatalogId: string;
  images: GamerProductImage[];
  mediaType: string;
  platform: string;
  platformId: string;
  price: number;
  productId: string;
  productImageUrl: string;
  productName: string;
}

export interface GamerProductCollectionPlatform {
  forSale: boolean;
  forTrade: boolean;
  gamerProductCatalogId: string;
  images: GamerProductImage[];
  price: number;
  productId: string;
  productImageUrl: string;
  productName: string;
}

export interface GamerProductCollectionAccessory {
  forSale: boolean;
  forTrade: boolean;
  gamerProductCatalogId: string;
  images: GamerProductImage[];
  platform: string;
  platformId: string;
  price: number;
  productId: string;
  productImageUrl: string;
  productName: string;
}

export interface GamerProductImage {
  imageId: string;
  imageUrl: string;
}

export interface GamerProductCollectionRequest {
  gamerId: string;
}

export interface GetGamerWishlistRequest {
  gamerId: string;
}

export interface GetGamerWishlistResponse {
  wishList: GamerWishlist[];
}

export interface GamerWishlist {
  category: string;
  gamerWishListId: string;
  imageUrl: string;
  name: string;
  platformName: string;
  productId: string;
}

export interface GamerProductCollectionResponse {
  games: GamerProductCollectionGame[];
  platforms: GamerProductCollectionPlatform[];
  acessories: GamerProductCollectionAccessory[];
  gamer: GamerInfo;
}

export interface AddProductToCollectionRequest {
  productId: string;
  platformId: string;
  imagesBase64: string[];
  /**
   * 1- Fisica
   * 2- Digital
   */
  mediaType: 1 | 2;
  forTrade: boolean;
  forSale: boolean;
  price: number;
  gamerId: string;
  gamerProductCatalogId?: string;
}

export interface AddProductToCollectionResponse {
  gamerProductCatalogId: string;
  experiencePoints: number;
  game?: GamerProductCollectionGame;
  platform?: GamerProductCollectionPlatform;
  acessory?: GamerProductCollectionAccessory;
}

export interface ClearGamerProductCollection {}

export interface GamerInfo {
  city: string;
  experiencePoints: number;
  gamerId: string;
  imageUrl: string;
  name: string;
  rankTitle: string;
  state: string;
}

export interface GetGamerInfoRequest {
  gamerId: string;
}

export interface GetGamerInfoResponse {
  gamerId: string;
  name: string;
  imageUrl: string;
  gamerShowcaseUrl: string;
  experiencePoints: number;
  pointsToNextLevel: number;
  rankTitle: string;
  position: string;
  city: string;
  state: string;
  distance: string;
  tradeRequestsCount: number;
  tradesCount: number;
  averageRating: number;
  achievementRanks: AchievementRanks[];
}

export interface AchievementRanks {
  achievementId: string;
  description: string;
  date: Date;
}

export interface ActiveAddGameToCollection {
  availablePlatforms: ActiveAddGameToCollectionPlatform[];
  forSale: boolean;
  forTrade: boolean;
  gamerProductCatalogId?: string;
  images: GamerProductImage[];
  mediaType: ProductMediaType;
  platformId: string;
  price: number | string;
  productId: string;
  productImageUrl: string;
  productName: string;
  type: ProductType;
}

export interface ActiveAddGameToCollectionPlatform {
  id: string;
  name: string;
}

export interface SetActiveAddGameToCollection {
  gamerProductCatalogId?: string;
  productId?: string;
  category?: ProductType;
}

export interface GetGamerProductCatalogDetailsRequest {
  gamerProductCatalogId?: string;
  productId: string;
}

export interface GetGamerProductCatalogDetailsResponse {
  gamerProductCatalogId: string;
  productId: string;
  productImageUrl: string;
  productName: string;
  images: GamerProductImage[];
  forTrade: boolean;
  forSale: boolean;
  price: number;
  platformId: string;
  availablePlatforms: ActiveAddGameToCollectionPlatform[];
  mediaType: ProductMediaType;
  type: ProductType;
}

export interface DeleteGamerProductCatalogRequest {
  gamerProductCatalogId: string;
}

export interface DeleteGamerProductCatalogResponse {
  gamerProductCatalogId: string;
}

export interface DeleteGamerProductCatalogImageRequest {
  gamerProductCatalogId: string;
  imageId: string;
}

export interface DeleteGamerProductCatalogImageResponse {
  gamerProductCatalogId: string;
  imageId: string;
}

export interface SetMyCollectionDataRequest {
  refreshing?: boolean;
}

export interface SetGamerCollectionDataRequest {
  error?: string;
  loading?: boolean;
  refreshing?: boolean;
  shouldReload?: boolean;
  activeAddGameToCollection?: ActiveAddGameToCollection;
  activeGamerId?: string;
  games?: GamerProductCollectionGame[];
  platforms?: GamerProductCollectionPlatform[];
  accessories?: GamerProductCollectionAccessory[];
  gamer?: GamerInfo;
  wishlist?: GamerWishlist[];
}
