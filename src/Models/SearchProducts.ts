import {WelcomeGuideProduct} from './Product';

export type SearchCategory =
  | 'Games'
  | 'Plataformas'
  | 'Acessorios'
  | 'Gamers'
  | 'Lojas';

export interface SearchProductsRequest {
  SearchText: string;
  Page: number;
  Category: SearchCategory;
}

export interface SearchProductsResponse {
  gamesFound: ProductItem[];
  gamesCount: number;
  platformsFound: ProductItem[];
  platformsCount: number;
  accessoriesFound: ProductItem[];
  accessoriesCount: number;
  gamersFound: GamerInfo[];
  gamersCount: number;
  storesFound: GamerInfo[];
  storesCount: number;
}

export interface ProductItem {
  additionalInfo: string;
  description: string;
  imageUrl: string;
  lowesPriceForTrade: number;
  lowestPriceForSell: number;
  name: string;
  peopleInterested: number;
  productId: string;
  quantityForSell: number;
  quantityForTrade: number;
}

export interface GamerInfo {
  experiencePoints: string;
  gamerId: string;
  gamerRankTitle: string;
  imageUrl: string;
  name: string;
}

export interface WelcomeGuideProductsRequest {
  search: string;
  page: number;
  quantity: number;
}

export interface WelcomeGuideProductsResponse {
  products: WelcomeGuideProduct[];
  totalItems: number;
}

export interface SetSearchDataRequest {
  search?: string;
  searchActivePage?: number;
}
