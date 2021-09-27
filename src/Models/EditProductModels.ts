import {DeliveryTypeId} from './Seller';

export interface PhotoInfo {
  id: string;
  url: string;
}

export interface DeleteProductRequest {
  storeProductCatalogId: string;
}

export interface DeleteProductResponse {
  storeProductCatalogId: string;
}

export interface EditProductDetailsRequest {
  /**
   *  0- Nenhum
   *  1- Pessoalmente
   *  2- Correio
   *  3- Ambos
   */
  deliveryType?: DeliveryTypeId;
  images: string[];
  offerPrice?: number;
  price?: number;
  quantity?: number;
  storeProductCatalogId: string;
}

export interface EditProductDetailsResponse {}

export interface GetProductDetailsRequest {
  storeProductCatalogId: string;
}

export interface GetProductDetailsResponse {
  /**
   *  0- Nenhum
   *  1- Pessoalmente
   *  2- Correio
   *  3- Ambos
   */
  deliveryType: string;
  /**
   *  0- Nenhum
   *  1- Pessoalmente
   *  2- Correio
   *  3- Ambos
   */
  deliveryTypeId: DeliveryTypeId;
  imageUrl: string;
  offerPrice?: number;
  photos: PhotoInfo[];
  platformId: string;
  platformName: string;
  price: number;
  product: string;
  productId: string;
  quantity: number;
}

export interface SetEditProductDataRequest {
  activeStoreProductCatalogId?: string;
  error?: string;
  loading?: boolean;
  deliveryType?: string;
  deliveryTypeId?: DeliveryTypeId;
  imageUrl?: string;
  offerPrice?: number;
  photos?: [];
  platformId?: string;
  platformName?: string;
  price?: number;
  product?: string;
  productId?: string;
  quantity?: number;
}
