import {
  AvailableGamerProductCatalog,
  AvailablePlatform,
  GetAvailableGamerProductsCatalogRequest,
  GetAvailableGamerProductsCatalogResponse,
  SelectedProduct,
  Wishlist,
} from '../../Models/Product';
import {ADD_QUICK_PRODUCTS_SUCCESS, AddQuickProductsSuccess} from './gamer';
import {AddQuickProductProducts} from '../../Models/Gamer';
import { BaseAction, ActionPayload, BaseResponse } from 'src/Models/ReduxModels';
import { BaseErrorResponse } from 'src/Models/Login';

export const GET_AVAILABLE_GAMER_PRODUCTS_CATALOG =
  'GET_AVAILABLE_GAMER_PRODUCTS_CATALOG';
export const GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_FAIL =
  'GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_FAIL';
export const GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_SUCCESS =
  'GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_SUCCESS';

export const GET_AVAILABLE_STORE_PRODUCTS_CATALOG =
  'GET_AVAILABLE_STORE_PRODUCTS_CATALOG';
export const GET_AVAILABLE_STORE_PRODUCTS_CATALOG_FAIL =
  'GET_AVAILABLE_STORE_PRODUCTS_CATALOG_FAIL';
export const GET_AVAILABLE_STORE_PRODUCTS_CATALOG_SUCCESS =
  'GET_AVAILABLE_STORE_PRODUCTS_CATALOG_SUCCESS';

export const GET_PRODUCTS_IN_WISHLIST = 'GET_PRODUCTS_IN_WISHLIST';
export const GET_PRODUCTS_IN_WISHLIST_FAIL = 'GET_PRODUCTS_IN_WISHLIST_FAIL';
export const GET_PRODUCTS_IN_WISHLIST_SUCCESS =
  'GET_PRODUCTS_IN_WISHLIST_SUCCESS';

export const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';

export class GetAvailableGamerProductsCatalog implements BaseAction {
  readonly type = GET_AVAILABLE_GAMER_PRODUCTS_CATALOG;
  constructor(public payload: ActionPayload<GetAvailableGamerProductsCatalogRequest>) {}
}
export class GetAvailableGamerProductsCatalogFailure implements BaseAction {
  readonly type = GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_FAIL;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetAvailableGamerProductsCatalogSuccess implements BaseAction {
  readonly type = GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_SUCCESS;
  constructor(public payload: BaseResponse<GetAvailableGamerProductsCatalogResponse>) {}
}

export class GetAvailableStoreProductsCatalog implements BaseAction {
  readonly type = GET_AVAILABLE_STORE_PRODUCTS_CATALOG;
  constructor(public payload: ActionPayload<GetAvailableGamerProductsCatalogRequest>) {}
}
export class GetAvailableStoreProductsCatalogFailure implements BaseAction {
  readonly type = GET_AVAILABLE_STORE_PRODUCTS_CATALOG_FAIL;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetAvailableStoreProductsCatalogSuccess implements BaseAction {
  readonly type = GET_AVAILABLE_STORE_PRODUCTS_CATALOG_SUCCESS;
  constructor(public payload: BaseResponse<GetAvailableGamerProductsCatalogResponse>) {}
}

export interface GetProductsInWishlist {
  type: typeof GET_PRODUCTS_IN_WISHLIST;
  payload: any;
} 
export interface GetProductsInWishlistFail {
  type: typeof GET_PRODUCTS_IN_WISHLIST_FAIL;
  payload: BaseErrorResponse;
} 
export interface GetProductsInWishlistSuccess {
  type: typeof GET_PRODUCTS_IN_WISHLIST_SUCCESS;
  payload: any;
} 

export interface SetSelectedProduct {
  type: typeof SET_SELECTED_PRODUCT;
  payload: SelectedProduct;
}

export type Actions =
| AddQuickProductsSuccess 
| GetAvailableGamerProductsCatalog
| GetAvailableGamerProductsCatalogFailure
| GetAvailableGamerProductsCatalogSuccess
| GetAvailableStoreProductsCatalog
| GetAvailableStoreProductsCatalogFailure
| GetAvailableStoreProductsCatalogSuccess
| GetProductsInWishlist
| GetProductsInWishlistFail
| GetProductsInWishlistSuccess
| SetSelectedProduct;

export interface State {
  error: string;
  loadingGamers: boolean;
  loadingStores: boolean;
  loadedGamers: boolean;
  loadedStores: boolean;
  availableGamerProductsCatalog: AvailableGamerProductCatalog[];
  availableStoreProductsCatalog: AvailableGamerProductCatalog[];
  availablePlatforms: AvailablePlatform[];
  /**
   * 1- Store
   * 2- Gamer
   */
  catalogType: 1 | 2 | number;
  countGamers: number;
  countStores: number;
  isOnCollection: boolean;
  isOnWishList: boolean;
  pageGamers: number;
  pageStores: number;
  selectedProduct: SelectedProduct;
  wishlist: Wishlist[];
}

const initialState: State = {
  error: '',
  loadingGamers: false,
  loadingStores: false,
  availableGamerProductsCatalog: [],
  availableStoreProductsCatalog: [],
  availablePlatforms: [],
  catalogType: 1,
  countGamers: 0,
  countStores: 0,
  isOnCollection: false,
  isOnWishList: false,
  loadedGamers: false,
  loadedStores: false,
  pageGamers: 1,
  pageStores: 1,
  selectedProduct: {
    platformId: '',
    platformName: '',
    productId: '',
    productImagePath: '',
    productName: '',
  },
  wishlist: [],
};

export default function reducer(
  state = initialState,
  action: Actions,
): State {
  switch (action.type) {
    case ADD_QUICK_PRODUCTS_SUCCESS: {
      return {
        ...state,
        isOnWishList: state.selectedProduct.productId === action.payload.data?.productId,
      };
    }

    case GET_AVAILABLE_GAMER_PRODUCTS_CATALOG: {
      const { data } = action.payload.request;

      return {
        ...state,
        loadingGamers: true,
        catalogType: 2,
        availableGamerProductsCatalog: data?.page === 1 ? [] : state.availableGamerProductsCatalog,
        availablePlatforms: [],
        isOnCollection: false,
        isOnWishList: false,
        pageGamers: data?.page || 1,
      };
    }
    case GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_FAIL: {
      return {
        ...state,
        loadingGamers: false,
        error: 'Não foi possível carregar os produtos disponíveis',
        countGamers: 0,
        loadedGamers: false,
      };
    }
    case GET_AVAILABLE_GAMER_PRODUCTS_CATALOG_SUCCESS: {
      const {data} = action.payload;

      const {availablePlatforms, count, isOnCollection, isOnWishList, products} = data;

      return {
        ...state,
        loadingGamers: false,
        availableGamerProductsCatalog: [...state.availableGamerProductsCatalog, ...products],
        availablePlatforms,
        countGamers: count,
        isOnCollection,
        isOnWishList,
        loadedGamers: true,
      };
    }

    case GET_AVAILABLE_STORE_PRODUCTS_CATALOG: {
      const { data } = action.payload.request;

      return {
        ...state,
        loadingStores: true,
        catalogType: 1,
        availableStoreProductsCatalog: data?.page === 1 ? [] : state.availableStoreProductsCatalog,
        availablePlatforms: [],
        isOnCollection: false,
        isOnWishList: false,
        pageStores: data?.page || 1,
      };
    }
    case GET_AVAILABLE_STORE_PRODUCTS_CATALOG_FAIL: {
      return {
        ...state,
        loadingStores: false,
        error: 'Não foi possível carregar os produtos disponíveis',
        countStores: 0,
        loadedStores: false,
      };
    }
    case GET_AVAILABLE_STORE_PRODUCTS_CATALOG_SUCCESS: {
      const {data} = action.payload;

      const {availablePlatforms, count, isOnCollection, isOnWishList, products} = data;

      return {
        ...state,
        loadingStores: false,
        availableStoreProductsCatalog: [...state.availableStoreProductsCatalog, ...products],
        availablePlatforms,
        countStores: count,
        isOnCollection,
        isOnWishList,
        loadedStores: true,
      };
    }

    case GET_PRODUCTS_IN_WISHLIST:
      return {
        ...state,
        loadingGamers: true,
      };
    case GET_PRODUCTS_IN_WISHLIST_FAIL:
      return {
        ...state,
        loadingGamers: false,
        error: 'Não foi possível carregar os produtos na wishlist',
      };
    case GET_PRODUCTS_IN_WISHLIST_SUCCESS:
      return {
        ...state,
        loadingGamers: false,
        wishlist: action.payload.data,
      };

    case SET_SELECTED_PRODUCT: {
      return {
        ...state,
        loadingGamers: true,
        selectedProduct: action.payload,
        availableGamerProductsCatalog: [],
        availablePlatforms: [],
        isOnCollection: false,
        isOnWishList: false,
      };
    }

    default:
      return state;
  }
}

export function getAvailableGamerProductsCatalog(
  data: GetAvailableGamerProductsCatalogRequest,
): GetAvailableGamerProductsCatalog {
  return {
    type: GET_AVAILABLE_GAMER_PRODUCTS_CATALOG,
    payload: {
      request: {
        method: 'POST',
        url: '/Product/Details/v1',
        data,
      },
    },
  };
}

export function getAvailableStoreProductsCatalog(
  data: GetAvailableGamerProductsCatalogRequest,
): GetAvailableStoreProductsCatalog {
  return {
    type: GET_AVAILABLE_STORE_PRODUCTS_CATALOG,
    payload: {
      request: {
        method: 'POST',
        url: '/Product/Details/v1',
        data,
      },
    },
  };
}

export function setSelectedProduct(
  data: SelectedProduct,
): SetSelectedProduct {
  return {
    type: SET_SELECTED_PRODUCT,
    payload: data
  };
}

// Selectors
export function selectProductDetailsHasNextPage(state: State, catalogType: 1 | 2): boolean {
  const count = catalogType === 2 ? state.countGamers : state.countStores;
  const products = catalogType === 2 ? state.availableGamerProductsCatalog : state.availableStoreProductsCatalog;

  return products.length < count;
}
