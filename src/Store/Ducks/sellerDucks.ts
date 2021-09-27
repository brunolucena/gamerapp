import {BaseAction, ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';
import {
  GetSellerProductsRequest,
  GetSellerProductsResponse,
  SellerProduct,
  SellerProductsStore,
  SellerUpdatePictureRequest,
  SellerUpdatePictureResponse,
} from 'src/Models/Seller';
import { SELLER_ADD_PRODUCT_SUCCESS, SellerAddProductSuccess } from './sellerAddProduct';
import { EditProductDetailsRequest, DeleteProductRequest } from 'src/Models/EditProductModels';

export const GET_MY_STORE_PRODUCTS = 'GET_MY_STORE_PRODUCTS';
export const GET_MY_STORE_PRODUCTS_FAILURE = 'GET_MY_STORE_PRODUCTS_FAILURE';
export const GET_MY_STORE_PRODUCTS_SUCCESS = 'GET_MY_STORE_PRODUCTS_SUCCESS';

export const GET_SELLER_PRODUCTS = 'GET_SELLER_PRODUCTS';
export const GET_SELLER_PRODUCTS_FAILURE = 'GET_SELLER_PRODUCTS_FAILURE';
export const GET_SELLER_PRODUCTS_SUCCESS = 'GET_SELLER_PRODUCTS_SUCCESS';

export const SELLER_DELETE_PRODUCT = 'SELLER_DELETE_PRODUCT';
export const SELLER_UPDATE_PRODUCT = 'SELLER_UPDATE_PRODUCT';

export const SELLER_UPDATE_PICTURE = 'SELLER_UPDATE_PICTURE';
export const SELLER_UPDATE_PICTURE_FAILURE = 'SELLER_UPDATE_PICTURE_FAILURE';
export const SELLER_UPDATE_PICTURE_SUCCESS = 'SELLER_UPDATE_PICTURE_SUCCESS';

export const SET_ACTIVE_SELLER_ID = 'SET_ACTIVE_SELLER_ID';

export class GetMyStoreProducts implements BaseAction {
  readonly type = GET_MY_STORE_PRODUCTS;
  constructor(public payload: ActionPayload<GetSellerProductsRequest>, public refreshing: boolean) {}
}
export class GetMyStoreProductsFailure implements BaseAction {
  readonly type = GET_MY_STORE_PRODUCTS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetMyStoreProductsSuccess implements BaseAction {
  readonly type = GET_MY_STORE_PRODUCTS_SUCCESS;
  constructor(public payload: BaseResponse<GetSellerProductsResponse>) {}
}

export class GetSellerProducts implements BaseAction {
  readonly type = GET_SELLER_PRODUCTS;
  constructor(public payload: ActionPayload<GetSellerProductsRequest>, public refreshing: boolean) {}
}
export class GetSellerProductsFailure implements BaseAction {
  readonly type = GET_SELLER_PRODUCTS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetSellerProductsSuccess implements BaseAction {
  readonly type = GET_SELLER_PRODUCTS_SUCCESS;
  constructor(public payload: BaseResponse<GetSellerProductsResponse>) {}
}

export class SellerDeleteProduct implements BaseAction {
  readonly type = SELLER_DELETE_PRODUCT;
  constructor(public payload: DeleteProductRequest) {}
}
export class SellerUpdateProduct implements BaseAction {
  readonly type = SELLER_UPDATE_PRODUCT;
  constructor(public payload: EditProductDetailsRequest) {}
}
export class SellerUpdatePicture implements BaseAction {
  readonly type = SELLER_UPDATE_PICTURE;
  constructor(public payload: ActionPayload<SellerUpdatePictureRequest>) {}
}
export class SellerUpdatePictureFailure implements BaseAction {
  readonly type = SELLER_UPDATE_PICTURE_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class SellerUpdatePictureSuccess implements BaseAction {
  readonly type = SELLER_UPDATE_PICTURE_SUCCESS;
  constructor(public payload: BaseResponse<SellerUpdatePictureResponse>) {}
}

export class SetActiveSellerId implements BaseAction {
  readonly type = SET_ACTIVE_SELLER_ID;
  constructor(public payload: {sellerId: string}) {}
}

export type SellerActions =
  | GetMyStoreProducts
  | GetMyStoreProductsFailure
  | GetMyStoreProductsSuccess
  | GetSellerProducts
  | GetSellerProductsFailure
  | GetSellerProductsSuccess
  | SellerAddProductSuccess
  | SellerDeleteProduct
  | SellerUpdatePicture
  | SellerUpdatePictureFailure
  | SellerUpdatePictureSuccess
  | SellerUpdateProduct
  | SetActiveSellerId;

export interface State {
  error: string;
  loading: boolean;
  refreshing: boolean;
  shouldRefresh: boolean;
  activePage: number;
  activeSellerId: string;
  myStore: SellerProductsStore;
  myProducts: SellerProduct[];
  products: SellerProduct[];
  store: SellerProductsStore;
  totalPages: number;
}

const initialState: State = {
  error: '',
  loading: false,
  refreshing: false,
  shouldRefresh: false,
  activePage: 1,
  activeSellerId: '',
  myStore: {
    city: '',
    distance: 0,
    id: '',
    imageUrl: '',
    name: '',
    stars: 0,
    state: '',
    storeRating: 0,
    trustedDelivery: false,
    zipCode: '',
  },
  myProducts: [],
  products: [],
  store: {
    city: '',
    distance: 0,
    id: '',
    imageUrl: '',
    name: '',
    stars: 0,
    state: '',
    storeRating: 0,
    trustedDelivery: false,
    zipCode: '',
  },
  totalPages: 1,
};

export default function reducer(
  state = initialState,
  action: SellerActions,
): State {
  switch (action.type) {
    case GET_MY_STORE_PRODUCTS: {
      return {
        ...state,
        loading: true,
        refreshing: action.refreshing,
        shouldRefresh: false,
        error: '',
        activePage: action.payload.request.data?.page || 1
      };
    }
    case GET_MY_STORE_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: 'Não foi possível carregar os detalhes do produto',
      };
    }
    case GET_MY_STORE_PRODUCTS_SUCCESS: {
      const { productItems, store } = action.payload.data;
      
      return {
        ...state,
        loading: false,
        refreshing: false,
        myProducts: productItems,
        myStore: store || initialState.store,
      };
    }

    case GET_SELLER_PRODUCTS: {
      return {
        ...state,
        loading: true,
        refreshing: action.refreshing,
        shouldRefresh: false,
        error: '',
        activePage: action.payload.request.data?.page || 1
      };
    }
    case GET_SELLER_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: 'Não foi possível carregar os detalhes do produto',
      };
    }
    case GET_SELLER_PRODUCTS_SUCCESS: {
      const { productItems, store } = action.payload.data;
      
      return {
        ...state,
        loading: false,
        refreshing: false,
        products: productItems,
        store: store || initialState.store,
      };
    }

    case SELLER_ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        shouldRefresh: true,
      }
    }

    case SELLER_DELETE_PRODUCT: {
      const { storeProductCatalogId } = action.payload;
      
      // Tira o produto que recebeu no storeProductCatalogId.
      const newProducts = state.products.filter(p => p.storeProductId !== storeProductCatalogId);

      return {
        ...state,
        products: newProducts,
      }
    }

    case SELLER_UPDATE_PRODUCT: {
      const { deliveryType, offerPrice, price, quantity, storeProductCatalogId } = action.payload;

      // Cria uma cópia da lista de products.
      const newProducts = [...state.products];
      
      // Procura o index do product para ser atualizado
      let productIndex = newProducts.findIndex(p => p.storeProductId === storeProductCatalogId);
      
      // Se achar, continua
      if (productIndex > -1) {
        let newProduct = newProducts[productIndex];

        // Atualiza os dados do produto com as novas informações,
        // mantendo todo o restanto igual.
        newProduct = {
          ...newProduct,
          deliveryTypeId: deliveryType || newProduct.deliveryTypeId,
          offerPrice: offerPrice || newProduct.offerPrice,
          price: price || newProduct.price,
          quantity: quantity || newProduct.quantity,
        }

        // Atualiza o produto no array.
        newProducts[productIndex] = newProduct;
      }

      return {
        ...state,
        products: newProducts,
      }
    }

    case SELLER_UPDATE_PICTURE: {
      return {
        ...state,
        loading: true,
      };
    }
    case SELLER_UPDATE_PICTURE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível atualizar a foto da loja',
      };
    }
    case SELLER_UPDATE_PICTURE_SUCCESS: {
      const { imageUrl } = action.payload.data;

      const newStore = {...state.store};

      newStore.imageUrl = imageUrl;
      
      return {
        ...state,
        loading: false,
        store: newStore,
      };
    }

    case SET_ACTIVE_SELLER_ID: {
      return {
        ...state,
        activeSellerId: action.payload.sellerId,
      };
    }

    default: {
      return state;
    }
  }
}

export function getMyStoreProducts(
  data: GetSellerProductsRequest,
  refreshing?: boolean,
): GetMyStoreProducts {
  return {
    type: GET_MY_STORE_PRODUCTS,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Products/v1',
        data,
      },
    },
    refreshing: refreshing || false,
  };
}

export function getSellerProducts(
  data: GetSellerProductsRequest,
  refreshing?: boolean,
): GetSellerProducts {
  return {
    type: GET_SELLER_PRODUCTS,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Products/v1',
        data,
      },
    },
    refreshing: refreshing || false,
  };
}

export function sellerUpdatePicture(data: SellerUpdatePictureRequest): SellerUpdatePicture {
  return {
    type: SELLER_UPDATE_PICTURE,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Picture/v1',
        data,
      },
    },
  };
}

export function setActiveSellerId(sellerId: string): SetActiveSellerId {
  return {
    type: SET_ACTIVE_SELLER_ID,
    payload: {sellerId},
  };
}
