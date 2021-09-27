import {Platform} from './Platform';
import {User} from './User';
import {GamerProductDetailsPrice} from './GamerProductDetails';

export interface Product {
  id: string;
  type: number; // Game, Console, Outro
  name: string;
  platforms: Platform[]; // Plataforma, independente do tipo do produto. Array de strings pois pode ser de mais de uma plataforma. Todos se for geral. Se for um console, coloca as plataformas do mesmo jeito.
  description: string;
  imagePath: string;
  quantityForSell: number; // Quantos para venda existem no App
  quantityForTrade: number; // Quantos para troca existem no App (um mesmo produto pode estar disponivel para venda ou troca)
  lowestPriceForSell: number;
  lowestPriceForTrade: number;
  peopleInterested: number; // Quantidade de pessoas que possuem o produto em sua lista de interesses. Pela propria busca, podemos colocar uma opcao de a pessoa marcar que tem interesse e ja adiciona no perfil dela
  closestGamerProductCity: string;
  closestGamerProductState: string;
  closestGamerProductDistance: string;
  hasGamerProductVerified: boolean;
}

export interface Wishlist {
  product: Product;
  platform: Platform;
}

export interface SelectedProduct {
  platformId?: string;
  platformName?: string;
  productId: string;
  productImagePath: string;
  productName: string;
}

// Quando um usuario ou loja adiciona um Product, vira um GamerProductCatalog
export interface GamerProductCatalog {
  id: string;
  owner: User; // Pode ser de um usuario ou de uma loja
  ownerId: string;
  product: Product;
  price: number; // Opcional porque se for um usuario ele pode deixar vazio o preco
  availableForTrade: boolean;
  isFromStore: boolean; // True se o produto pertencer a uma loja e nao a um usuario
  verified: boolean;
  platform: Platform;
  photos: string[];
  verificationPhoto: string;
  quantity: number;
}

export interface AvailableGamerProductCatalog {
  city: string;
  /** In km */
  distance: number;
  gamerId: string;
  gamerName: string;
  gamerProductCatalogId: string;
  imageUrl?: string;
  platformId?: string;
  platformName?: string;
  stars: number;
  state: string;
  wantSomethingFromMyWishlist: boolean;
  price: GamerProductDetailsPrice;
  cashback?: number;
  hasDelivery: boolean;
}

export interface WelcomeGuideProduct {
  id: string;
  imagePath: string;
  name: string;
  productType: 'game' | 'console' | 'acessorio' | 'outro';
  productTypeId: number;
  platforms: WelcomeGuideProductPlatform[];
}

export interface WelcomeGuideProductPlatform {
  id: string;
  name: string;
}

export interface AddToWishlistSelection {
  id: string;
  imagePath: string;
  name: string;
  platforms: AddToWishlistSelectionAvailablePlatform[];
  selected: boolean;
}

export interface AddToWishlistSelectionAvailablePlatform
  extends AvailablePlatform {
  selected: boolean;
}

export interface WelcomeGuideProductSelection {
  id: string;
  imagePath: string;
  name: string;
  platforms: WelcomeGuideProductSelectionPlatform[];
  selected: boolean;
}

export interface WelcomeGuideProductSelectionPlatform {
  id: string;
  name: string;
  quantity: number;
  mediaType: 'fisica' | 'digital';
  selected: boolean;
}

export interface GetAvailableGamerProductsCatalogRequest {
  /**
   * 1- Store
   * 2- Gamer
   */
  catalogType: 1 | 2 | number;
  gamerId: string;
  page: number;
  platformId?: string;
  productId: string;
  filters: Filter[];
}

export interface Filter {
  name: string;
  value: any;
}

export interface GetAvailableGamerProductsCatalogResponse {
  availablePlatforms: AvailablePlatform[];
  count: number;
  isOnCollection: boolean;
  isOnWishList: boolean;
  products: AvailableGamerProductCatalog[];
}

export interface AvailablePlatform {
  id: string;
  name: string;
}
