import {ActionPayload, BaseAction, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';

import {
  DeleteProductRequest,
  DeleteProductResponse,
  EditProductDetailsRequest,
  EditProductDetailsResponse,
  GetProductDetailsRequest,
  GetProductDetailsResponse,
  SetEditProductDataRequest,
} from 'src/Models/EditProductModels';

export const CLEAR_EDIT_PRODUCT = 'CLEAR_EDIT_PRODUCT';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';

export const EDIT_PRODUCT_DETAILS = 'EDIT_PRODUCT_DETAILS';
export const EDIT_PRODUCT_DETAILS_FAILURE = 'EDIT_PRODUCT_DETAILS_FAILURE';
export const EDIT_PRODUCT_DETAILS_SUCCESS = 'EDIT_PRODUCT_DETAILS_SUCCESS';

export const GET_PRODUCT_DETAILS = 'GET_PRODUCT_DETAILS';
export const GET_PRODUCT_DETAILS_FAILURE = 'GET_PRODUCT_DETAILS_FAILURE';
export const GET_PRODUCT_DETAILS_SUCCESS = 'GET_PRODUCT_DETAILS_SUCCESS';

export const SET_EDIT_PRODUCT_DATA = 'SET_EDIT_PRODUCT_DATA';

export interface ClearEditProduct {
  type: typeof CLEAR_EDIT_PRODUCT;
}

export interface DeleteProduct {
  type: typeof DELETE_PRODUCT;
  payload: ActionPayload<DeleteProductRequest>;
}
export interface DeleteProductFailure {
  type: typeof DELETE_PRODUCT_FAILURE;
  payload: BaseErrorResponse;
}
export interface DeleteProductSuccess {
  type: typeof DELETE_PRODUCT_SUCCESS;
  payload: BaseResponse<DeleteProductResponse>;
}

export class EditProductDetails implements BaseAction {
  readonly type = EDIT_PRODUCT_DETAILS;
  constructor(public payload: ActionPayload<EditProductDetailsRequest>) {}
}
export class EditProductDetailsFailure implements BaseAction {
  readonly type = EDIT_PRODUCT_DETAILS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class EditProductDetailsSuccess implements BaseAction {
  readonly type = EDIT_PRODUCT_DETAILS_SUCCESS;
  constructor(public payload: BaseResponse<EditProductDetailsResponse>) {}
}

export interface GetProductDetails {
  type: typeof GET_PRODUCT_DETAILS;
  payload: ActionPayload<GetProductDetailsRequest>;
}
export interface GetProductDetailsFailure {
  type: typeof GET_PRODUCT_DETAILS_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetProductDetailsSuccess {
  type: typeof GET_PRODUCT_DETAILS_SUCCESS;
  payload: BaseResponse<GetProductDetailsResponse>;
}

export interface SetEditProductData {
  type: typeof SET_EDIT_PRODUCT_DATA;
  payload: SetEditProductDataRequest;
}

export type CartActions =
  | ClearEditProduct
  | DeleteProduct
  | DeleteProductFailure
  | DeleteProductSuccess
  | EditProductDetails
  | EditProductDetailsFailure
  | EditProductDetailsSuccess
  | GetProductDetails
  | GetProductDetailsFailure
  | GetProductDetailsSuccess
  | SetEditProductData;

export interface State extends GetProductDetailsResponse {
  error: string;
  loading: boolean;
  activeStoreProductCatalogId: string;
}

const initialState: State = {
  error: '',
  loading: false,
  activeStoreProductCatalogId: '',
  deliveryType: 'Ambos',
  deliveryTypeId: 3,
  imageUrl: '',
  offerPrice: 0,
  photos: [],
  platformId: '',
  platformName: '',
  price: 0,
  product: '',
  productId: '',
  quantity: 0,
};

export default function reducer(
  state = initialState,
  action: CartActions,
): State {
  switch (action.type) {
    case CLEAR_EDIT_PRODUCT: {
      return {
        ...initialState,
      };
    }

    case DELETE_PRODUCT: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_PRODUCT_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível excluir o produto',
      };
    }
    case DELETE_PRODUCT_SUCCESS: {
      return {
        ...initialState,
      };
    }

    case EDIT_PRODUCT_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }
    case EDIT_PRODUCT_DETAILS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível editar o produto',
      };
    }
    case EDIT_PRODUCT_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
      };
    }

    case GET_PRODUCT_DETAILS: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PRODUCT_DETAILS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível carregar os detalhes do produto',
      };
    }
    case GET_PRODUCT_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        ...action.payload.data,
      };
    }

    case SET_EDIT_PRODUCT_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export function clearEditProduct(): ClearEditProduct {
  return {
    type: CLEAR_EDIT_PRODUCT,
  };
}

export function deleteProduct(data: DeleteProductRequest): DeleteProduct {
  return {
    type: DELETE_PRODUCT,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Products/Delete/v1',
        data,
      },
    },
  };
}

export function editProductDetails(
  data: EditProductDetailsRequest,
): EditProductDetails {
  return {
    type: EDIT_PRODUCT_DETAILS,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Products/Update/v1',
        data,
      },
    },
  };
}

export function getProductDetails(
  data: GetProductDetailsRequest,
): GetProductDetails {
  return {
    type: GET_PRODUCT_DETAILS,
    payload: {
      request: {
        method: 'POST',
        url: '/Store/Products/Details/v1',
        data,
      },
    },
  };
}

export function setEditProductData(
  data: SetEditProductDataRequest,
): SetEditProductData {
  return {
    type: SET_EDIT_PRODUCT_DATA,
    payload: data,
  };
}
