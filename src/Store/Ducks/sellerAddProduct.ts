import {BaseAction, ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';
import {
  AddProductFrom,
  SaveSellerAddProductRedux,
  StoreAddProductRequest,
  StoreAddProductResponse,
} from 'src/Models/Seller';
import {ProductItem} from 'src/Models/SearchProducts';
import {GamerProductCollectionGame} from 'src/Models/GamerProductCollection';
import { GetAvailableGamerProductsCatalogSuccess, GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_SUCCESS } from './productDetails';
import { Image } from 'react-native-image-crop-picker';

export const CLEAR_SELLER_ADD_PRODUCT = 'CLEAR_SELLER_ADD_PRODUCT';

export const SAVE_SELLER_ADD_PRODUCT = 'SAVE_SELLER_ADD_PRODUCT';
export const SELLER_ADD_PRODUCT_ADD_IMAGE = 'SELLER_ADD_PRODUCT_ADD_IMAGE';
export const SELLER_ADD_PRODUCT_REMOVE_IMAGE = 'SELLER_ADD_PRODUCT_REMOVE_IMAGE';

export const SET_ADD_PRODUCT_FROM = 'SET_ADD_PRODUCT_FROM';

export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

export const SELLER_ADD_PRODUCT = 'SELLER_ADD_PRODUCT';
export const SELLER_ADD_PRODUCT_FAIL = 'SELLER_ADD_PRODUCT_FAIL';
export const SELLER_ADD_PRODUCT_SUCCESS = 'SELLER_ADD_PRODUCT_SUCCESS';

export class ClearSellerAddProduct implements BaseAction {
  readonly type = CLEAR_SELLER_ADD_PRODUCT;
}

export class SaveSellerAddProduct implements BaseAction {
  readonly type = SAVE_SELLER_ADD_PRODUCT;
  constructor(public payload: SaveSellerAddProductRedux) {}
}

export class SellerAddProductAddImage implements BaseAction {
  readonly type = SELLER_ADD_PRODUCT_ADD_IMAGE;
  constructor(public payload: {imageBase64: string}) {}
}

export class SellerAddProductRemoveImage implements BaseAction {
  readonly type = SELLER_ADD_PRODUCT_REMOVE_IMAGE;
  constructor(public payload: {imageIndex: number}) {}
}

export class SellerAddProduct implements BaseAction {
  readonly type = SELLER_ADD_PRODUCT;
  constructor(public payload: ActionPayload<StoreAddProductRequest>) {}
}

export class SellerAddProductFailure implements BaseAction {
  readonly type = SELLER_ADD_PRODUCT_FAIL;
  constructor(public payload: BaseErrorResponse) {}
}

export class SellerAddProductSuccess implements BaseAction {
  readonly type = SELLER_ADD_PRODUCT_SUCCESS;
  constructor(public payload: BaseResponse<StoreAddProductResponse>) {}
}

export class SetAddProductFrom implements BaseAction {
  readonly type = SET_ADD_PRODUCT_FROM;
  constructor(public payload: {addProductFrom: AddProductFrom}) {}
}

export class SetSearchText implements BaseAction {
  readonly type = SET_SEARCH_TEXT;
  constructor(public payload: {searchText: string}) {}
}

export type Actions =
  | ClearSellerAddProduct
  | GetAvailableGamerProductsCatalogSuccess
  | SellerAddProduct
  | SellerAddProductFailure
  | SellerAddProductSuccess
  | SellerAddProductAddImage
  | SellerAddProductRemoveImage
  | SaveSellerAddProduct
  | SetAddProductFrom
  | SetSearchText;

export interface State extends StoreAddProductRequest {
  error: string;
  loading: boolean;
  addProductFrom: AddProductFrom;
  imagesNormalized: Image[];
  searchText: string;
  selectedProductNew: ProductItem;
  selectedProductCollection: GamerProductCollectionGame;
}

const initialState: State = {
  error: '',
  loading: false,
  addProductFrom: 'new',
  deliverType: 0,
  fromCatalog: false,
  images: [],
  imagesNormalized: [],
  offerPrice: 0,
  platformId: '',
  price: 0,
  productCatalogId: '',
  productId: '',
  quantity: 1,
  searchText: '',
  selectedProductNew: {
    additionalInfo: '',
    description: '',
    imageUrl: '',
    lowesPriceForTrade: 0,
    lowestPriceForSell: 0,
    name: '',
    peopleInterested: 0,
    productId: '',
    quantityForSell: 0,
    quantityForTrade: 0,
  },
  selectedProductCollection: {
    forSale: false,
    forTrade: false,
    gamerProductCatalogId: '',
    images: [],
    mediaType: '',
    platform: '',
    platformId: '',
    price: 0,
    productId: '',
    productImageUrl: '',
    productName: '',
  },
  state: 'Novo',
  storeId: '',
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case CLEAR_SELLER_ADD_PRODUCT: {
      return {
        ...initialState,
      };
    }

    case GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_SUCCESS: {
      const { availablePlatforms } = action.payload.data;
      
      return {
        ...state,
        platformId: availablePlatforms[0]?.id || '', 
      }
    }

    case SELLER_ADD_PRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }
    case SELLER_ADD_PRODUCT_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível adicionar o produto a loja',
      };
    }
    case SELLER_ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        error: '',
        loading: false,
      };
    }

    case SELLER_ADD_PRODUCT_ADD_IMAGE: {
      const { imageBase64 } = action.payload;
      
      return {
        ...state,
        images: [...state.images, imageBase64],
      }
    }

    case SELLER_ADD_PRODUCT_REMOVE_IMAGE: {
      const { imageIndex } = action.payload;
      
      const newImages = state.images;

      newImages.splice(imageIndex, 1);

      return {
        ...state,
        images: newImages,
      }
    }

    case SAVE_SELLER_ADD_PRODUCT: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SET_ADD_PRODUCT_FROM: {
      return {
        ...state,
        addProductFrom: action.payload.addProductFrom,
        fromCatalog: action.payload.addProductFrom === "collection",
      };
    }

    case SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload.searchText,
      };
    }

    default:
      return state;
  }
}

export function clearSellerAddProduct(): ClearSellerAddProduct {
  return {
    type: CLEAR_SELLER_ADD_PRODUCT,
  };
}

export function sellerAddProduct(
  data: StoreAddProductRequest,
): SellerAddProduct {
  return {
    type: SELLER_ADD_PRODUCT,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Products/Add/v1',
        data,
      },
    },
  };
}

export function saveSellerAddProduct(
  data: SaveSellerAddProductRedux,
): SaveSellerAddProduct {
  return {
    type: SAVE_SELLER_ADD_PRODUCT,
    payload: data,
  };
}

export function sellerAddProductAddImage(imageBase64: string): SellerAddProductAddImage {
  return {
    type: SELLER_ADD_PRODUCT_ADD_IMAGE,
    payload: {imageBase64},
  }
}

export function sellerAddProductRemoveImage(imageIndex: number): SellerAddProductRemoveImage {
  return {
    type: SELLER_ADD_PRODUCT_REMOVE_IMAGE,
    payload: {imageIndex},
  }
}

export function setAddProductFrom(
  addProductFrom: AddProductFrom,
): SetAddProductFrom {
  return {
    type: SET_ADD_PRODUCT_FROM,
    payload: {addProductFrom},
  };
}

export function setSeachText(searchText: string): SetSearchText {
  return {
    type: SET_SEARCH_TEXT,
    payload: {searchText},
  };
}
