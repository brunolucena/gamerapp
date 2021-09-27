import {ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {BaseErrorResponse} from 'src/Models/Login';
import {
  CoupomInfo,
  GetCouponListRequest,
  GetCouponListResponse,
  SetCouponDataRequest,
} from 'src/Models/CouponModels';
import {formatCurrency} from 'src/Helpers/formatCurrency';

import {
  MY_ORDER_ADD_NEW_SUCCESS,
  MyOrderAddNewSuccess,
  State as CartState,
  selectCartAmount,
} from './cartDuck';

export const GET_COUPON_LIST = 'GET_COUPON_LIST';
export const GET_COUPON_LIST_FAILURE = 'GET_COUPON_LIST_FAILURE';
export const GET_COUPON_LIST_SUCCESS = 'GET_COUPON_LIST_SUCCESS';

export const SET_COUPON_DATA = 'SET_COUPON_DATA';

export interface GetCouponList {
  type: typeof GET_COUPON_LIST;
  payload: ActionPayload<GetCouponListRequest>;
}
export interface GetCouponListFailure {
  type: typeof GET_COUPON_LIST_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetCouponListSuccess {
  type: typeof GET_COUPON_LIST_SUCCESS;
  payload: BaseResponse<GetCouponListResponse>;
}

export interface SetCouponData {
  type: typeof SET_COUPON_DATA;
  payload: SetCouponDataRequest;
}

export type Actions =
  | GetCouponList
  | GetCouponListFailure
  | GetCouponListSuccess
  | MyOrderAddNewSuccess
  | SetCouponData;

export interface State {
  error: string;
  loading: boolean;
  coupoms: CoupomInfo[];
  selectedCoupon: CoupomInfo;
}

const initialState: State = {
  error: '',
  loading: false,
  coupoms: [],
  selectedCoupon: {
    amount: 0,
    code: '',
    description: '',
    id: '',
    maximumValue: 0,
    minimumValue: 0,
    title: '',
    type: '',
    validUntil: undefined,
  },
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case GET_COUPON_LIST: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }
    case GET_COUPON_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível carregar a lista de cupons',
      };
    }
    case GET_COUPON_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: '',
        coupoms: action.payload.data.coupoms,
      };
    }

    case MY_ORDER_ADD_NEW_SUCCESS: {
      return {
        ...initialState,
      };
    }

    case SET_COUPON_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export function getCouponList(data: GetCouponListRequest): GetCouponList {
  return {
    type: GET_COUPON_LIST,
    payload: {
      request: {
        method: 'POST',
        url: '/Coupon/List/v1',
        data,
      },
    },
  };
}

export function setCouponData(data: SetCouponDataRequest): SetCouponData {
  return {
    type: SET_COUPON_DATA,
    payload: data,
  };
}

// Selectors
export function selectIsCouponSelected(
  state: State,
  coupon: CoupomInfo,
): boolean {
  return state.selectedCoupon.id === coupon.id;
}

export function selectCouponTitle(coupon: CoupomInfo): string {
  let title = coupon.title;

  if (!title) {
    switch (coupon.type) {
      case 'Desconto': {
        title = `Cupom de ${formatCurrency(coupon.amount)}`;

        break;
      }

      case 'Frete Gratis': {
        title = `Cupom de Frete Grátis`;

        break;
      }

      default:
        break;
    }
  }

  return title;
}

export function selectIsCouponValid(
  cartState: CartState,
  coupon: CoupomInfo,
): {valid: boolean; message: string} {
  let isValid = {valid: true, message: ''};

  const cartAmount = selectCartAmount(cartState);

  switch (coupon.type) {
    case 'Desconto': {
      // Verifica se o valor mínimo da compra foi alcançado
      if (cartAmount.details.subtotal < coupon.minimumValue) {
        isValid.valid = false;
        isValid.message = `Válido para compras acima de ${formatCurrency(
          coupon.minimumValue,
        )}`;
      }

      break;
    }

    default:
      break;
  }

  return isValid;
}
