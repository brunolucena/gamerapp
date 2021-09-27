import {Image} from 'react-native-image-crop-picker';

import {GamerProductCollectionGame} from './GamerProductCollection';
import {ProductItem} from './SearchProducts';

/**
 *  0- Nenhum
 *  1- Pessoalmente
 *  2- Correio
 *  3- Ambos
 */
export type DeliveryType = 'Nenhum' | 'Pessoalmente' | 'Correio' | 'Ambos';
/**
 *  0- Nenhum
 *  1- Pessoalmente
 *  2- Correio
 *  3- Ambos
 */
export type DeliveryTypeId = 0 | 1 | 2 | 3;
export type SellerProductState = 'Novo' | 'Usado';

export interface GetSellerProductsRequest {
  gamerId: string;
  storeId: string;
  searchText: string;
  page: number;
}

export interface GetSellerProductsResponse {
  count: number;
  productItems: SellerProduct[];
  store: SellerProductsStore;
}

export interface SellerProductsStore {
  id: string;
  name: string;
  city: string;
  state: string;
  distance: number;
  imageUrl: string;
  stars: number | null;
  storeRating: number | null;
  trustedDelivery: boolean;
  zipCode: string;
}

export interface SellerProduct {
  deliveryType: DeliveryType;
  deliveryTypeId: DeliveryTypeId;
  imageUrl: string;
  name: string;
  offerPrice: number;
  platform: string;
  platformId: string;
  price: number;
  quantity: number;
  state: SellerProductState;
  stateId: number;
  storeProductId: string;
}

export interface StoreAddProductRequest {
  deliverType: DeliveryTypeId;
  fromCatalog: boolean;
  /** Array de base64 */
  images: string[];
  offerPrice: number;
  platformId: string;
  price: number;
  productCatalogId: string;
  productId: string;
  quantity: number;
  state: SellerProductState;
  storeId: string;
}

export interface StoreAddProductResponse {}

export type AddProductFrom = 'collection' | 'new';

export interface SaveSellerAddProductRedux {
  deliverType?: DeliveryTypeId;
  fromCatalog?: boolean;
  /** Array de base64 */
  images?: string[];
  imagesNormalized?: Image[];
  offerPrice?: number;
  platformId?: string;
  price?: number;
  productCatalogId?: string;
  productId?: string;
  quantity?: number;
  selectedProductNew?: ProductItem;
  selectedProductCollection?: GamerProductCollectionGame;
  state?: 'Novo' | 'Usado';
  storeId?: string;
}

export interface SellerUpdatePictureRequest {
  imageBase64: string;
  storeId: string;
}

export interface SellerUpdatePictureResponse {
  imageUrl: string;
}
