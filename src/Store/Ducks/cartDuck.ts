import {BaseAction, ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {CartItem, CartAmount, SetCartDataRequest} from 'src/Models/Cart';
import roundTo from 'src/Helpers/roundTo';
import {MyOrderAddNewRequest, MyOrderAddNewResponse, GetPostOfficeShippingRequest, GetPostOfficeShippingResponse, ShippingOption} from 'src/Models/MyOrder';
import {BaseErrorResponse} from 'src/Models/Login';
import {GamerProductStore} from 'src/Models/GamerProductDetails';
import {PaymentRequestItem} from 'src/Models/PayPal';
import { SET_COUPON_DATA, SetCouponData } from './couponDuck';
import { CoupomInfo } from 'src/Models/CouponModels';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_SHIPPING = 'UPDATE_SHIPPING';
export const UPDATE_SHIPPING_DISCOUNT = 'UPDATE_SHIPPING_DISCOUNT';
export const UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD';
export const UPDATE_INSTALLMENTS = 'UPDATE_INSTALLMENTS';

export const GET_POSTOFFICE_SHIPPING = 'GET_POSTOFFICE_SHIPPING';
export const GET_POSTOFFICE_SHIPPING_FAILURE = 'GET_POSTOFFICE_SHIPPING_FAILURE';
export const GET_POSTOFFICE_SHIPPING_SUCCESS = 'GET_POSTOFFICE_SHIPPING_SUCCESS';

export const MY_ORDER_ADD_NEW = 'MY_ORDER_ADD_NEW';
export const MY_ORDER_ADD_NEW_FAILURE = 'MY_ORDER_ADD_NEW_FAILURE';
export const MY_ORDER_ADD_NEW_SUCCESS = 'MY_ORDER_ADD_NEW_SUCCESS';

export const SET_CART_DATA = 'SET_CART_DATA';

export class MyOrderAddNew implements BaseAction {
  readonly type = MY_ORDER_ADD_NEW;
  constructor(public payload: ActionPayload<MyOrderAddNewRequest>) {}
}
export class MyOrderAddNewFailure implements BaseAction {
  readonly type = MY_ORDER_ADD_NEW_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class MyOrderAddNewSuccess implements BaseAction {
  readonly type = MY_ORDER_ADD_NEW_SUCCESS;
  constructor(public payload: BaseResponse<MyOrderAddNewResponse>) {}
}

export interface GetPostOfficeShipping {
  type: typeof GET_POSTOFFICE_SHIPPING;
  payload: ActionPayload<GetPostOfficeShippingRequest>;
}
export interface GetPostOfficeShippingFailure {
  type: typeof GET_POSTOFFICE_SHIPPING_FAILURE;
  payload: BaseErrorResponse;
}
export interface GetPostOfficeShippingSuccess {
  type: typeof GET_POSTOFFICE_SHIPPING_SUCCESS;
  payload: BaseResponse<GetPostOfficeShippingResponse>;
}

export class AddItem implements BaseAction {
  readonly type = ADD_ITEM;
  constructor(public payload: CartItem) {}
}

export class RemoveItem implements BaseAction {
  readonly type = REMOVE_ITEM;
  constructor(public payload: {id: string}) {}
}

export class ClearCart implements BaseAction {
  readonly type = CLEAR_CART;
}

export class UpdateShipping implements BaseAction {
  readonly type = UPDATE_SHIPPING;
  constructor(public payload: number) {}
}

export class UpdateShippingDiscount implements BaseAction {
  readonly type = UPDATE_SHIPPING_DISCOUNT;
  constructor(public payload: number) {}
}

export class UpdatePaymentMethod implements BaseAction {
  readonly type = UPDATE_PAYMENT_METHOD;
  constructor(public payload: 'paypal') {}
}

export class UpdateInstallments implements BaseAction {
  readonly type = UPDATE_INSTALLMENTS;
  constructor(public payload: number) {}
}

export interface SetCartData {
  type: typeof SET_CART_DATA;
  payload: SetCartDataRequest;
}

export type CartActions =
  | AddItem
  | ClearCart
  | GetPostOfficeShipping
  | GetPostOfficeShippingFailure
  | GetPostOfficeShippingSuccess
  | MyOrderAddNew
  | MyOrderAddNewFailure
  | MyOrderAddNewSuccess
  | RemoveItem
  | SetCartData
  | SetCouponData
  | UpdateInstallments
  | UpdatePaymentMethod
  | UpdateShipping
  | UpdateShippingDiscount;

export interface State {
  error: string;
  loading: boolean;
  loadingShippingOptions: boolean;
  activeStoreId: string;
  store: GamerProductStore;
  items: CartItem[];
  cashback: number;
  myOrderAddNewResponse: MyOrderAddNewResponse;
  discount: number;
  shipping: number;
  shipping_discount: number;
  paymentMethod: 'paypal';
  shippingOptions: ShippingOption[];
  selectedShippingOption: ShippingOption;
  selectedCoupon: CoupomInfo;
  installments: number;
}

const initialState: State = {
  error: '',
  loading: false,
  loadingShippingOptions: false,
  activeStoreId: '',
  store: {
    city: '',
    distance: 0,
    id: '',
    imageUrl: '',
    info: [],
    name: '',
    orderMinimumValue: 20,
    stars: 0,
    state: '',
    storeRating: 0,
    trustedDelivery: true,
    zipCode: "",
  },
  items: [],
  cashback: 0,
  myOrderAddNewResponse: {
    myOrderId: "",
    viewId: "",
  },
  discount: 0,
  shipping: 0,
  shipping_discount: 0,
  shippingOptions: [],
  selectedShippingOption: {
    postOfficeServiceId: "",
    serviceCode: "",
    serviceName: "",
    shippingDays: "",
    shippingValue: 0,
  },
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
  paymentMethod: 'paypal',
  installments: 1,
};

export default function reducer(
  state = initialState,
  action: CartActions,
): State {
  switch (action.type) {
    case ADD_ITEM: {
      const {id, store} = action.payload;

      const newItems = [...state.items];

      const foundIndex = newItems.findIndex(item => item.id === id);

      if (foundIndex === -1) {
        newItems.push(action.payload);
      }

      return {
        ...state,
        activeStoreId: store?.id || "",
        items: newItems,
        store: store || initialState.store,
      };
    }

    case CLEAR_CART: {
      return {
        ...initialState,
      };
    }

    case GET_POSTOFFICE_SHIPPING: {
      return {
        ...state,
        loadingShippingOptions: true,
        shippingOptions: [],
      }
    }
    case GET_POSTOFFICE_SHIPPING_FAILURE: {
      return {
        ...state,
        loadingShippingOptions: false,
        error: "Não foi possível carregar os opções de entrega",
      }
    }
    case GET_POSTOFFICE_SHIPPING_SUCCESS: {
      const { shippingOptions } = action.payload.data;

      const cheapestShipping = shippingOptions.length > 0 ? shippingOptions.reduce((accumulator, current) => {    
        if (current.shippingValue < accumulator.shippingValue) {
            return current;
        }
    
        return accumulator;
      }) : null;
      
      return {
        ...state,
        loadingShippingOptions: false,
        shipping: cheapestShipping?.shippingValue || 0,
        shippingOptions,
        selectedShippingOption: cheapestShipping || state.selectedShippingOption,
      }
    }
    
    case MY_ORDER_ADD_NEW: {
      return {
        ...state,
        loading: true,
        error: "",
      }
    }
    case MY_ORDER_ADD_NEW_FAILURE: {
      return {
        ...state,
        loading: false,
        error: "Não foi possível adicionar o pedido",
      }
    }
    case MY_ORDER_ADD_NEW_SUCCESS: {
      return {
        ...initialState,
        loading: false,
        myOrderAddNewResponse: action.payload.data,
      }
    }

    case REMOVE_ITEM: {
      const {id} = action.payload;

      const newItems = state.items.filter(item => item.id !== id);

      if (newItems.length === 0) {
        return {
          ...initialState,
        }
      }

      return {
        ...state,
        activeStoreId: newItems.length === 0 ? '' : state.activeStoreId,
        items: newItems,
      };
    }

    case SET_CART_DATA: {
      const { selectedCoupon } = state;
      const { selectedShippingOption } = action.payload;

      let discount = state.discount;
      let shipping_discount = state.shipping_discount;

      // Se tiver um novo valor de frete, verifica se tem um cupom aplicado e
      // calcula novamente o desconto
      if (selectedShippingOption?.shippingValue) {
        if (selectedCoupon.id && selectedCoupon.type === 'Frete Gratis') {
          // Se o valor do frete for maior, aplica somente o valor máximo do desconto
          if (selectedShippingOption.shippingValue > selectedCoupon.amount) {
            discount = selectedCoupon.amount;
            shipping_discount = selectedCoupon.amount;
          } else {
            discount = selectedShippingOption.shippingValue;
            shipping_discount = selectedShippingOption.shippingValue;
          }
        }
      }
      
      return {
        ...state,
        ...action.payload,
        discount,
        shipping_discount,
        shipping: selectedShippingOption?.shippingValue || state.shipping, 
      }
    }

    case SET_COUPON_DATA: {
      const cartAmount = selectCartAmount(state);
      
      const { selectedCoupon } = action.payload;

      let discount = 0;
      let shipping_discount = 0;

      // Verifica se um cupom foi aplicado e coloca os descontos
      // de acordo com o tipo do cupom
      if (selectedCoupon?.id) {
        const {amount} = selectedCoupon;

        switch (selectedCoupon.type) {
          case "Desconto": {
            // Aplica o desconto somente do valor da compra.
            if (cartAmount.details.subtotal > amount) {
              discount = amount;
            } else {
              discount = cartAmount.details.subtotal;
            }

            break;
          }

          case "Frete Gratis": {
            // Aplica o desconto do frete somente do valor permitido.
            if (cartAmount.details.shipping) {
              if (cartAmount.details.shipping > amount) {
                discount = amount;
                shipping_discount = amount;
              } else {
                discount = cartAmount.details.shipping;
                shipping_discount = cartAmount.details.shipping;
              }
            }

            break;
          }

          default:
            break;
        }
      }
      
      return {
        ...state,
        discount,
        shipping_discount,
        selectedCoupon: action.payload.selectedCoupon || state.selectedCoupon,
      }
    }

    case UPDATE_INSTALLMENTS: {
      return {
        ...state,
        installments: action.payload,
      };
    }

    case UPDATE_PAYMENT_METHOD: {
      return {
        ...state,
        paymentMethod: action.payload,
      };
    }

    case UPDATE_SHIPPING: {
      return {
        ...state,
        shipping: action.payload,
      };
    }

    case UPDATE_SHIPPING_DISCOUNT: {
      return {
        ...state,
        shipping_discount: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export function addItem(item: CartItem): AddItem {
  return {
    type: ADD_ITEM,
    payload: item,
  };
}

export function getPostOfficeShipping(data: GetPostOfficeShippingRequest): GetPostOfficeShipping {
  const { fromZipCode, productIds, toZipCode } = data;
  
  let url = '/PostOffice/Shipping/v1?';

  url += `toZipCode=${toZipCode}&fromZipCode=${fromZipCode}`;

  productIds.forEach(productId => {
    url += `&productIds=${productId}`;
  });

  return {
    type: GET_POSTOFFICE_SHIPPING,
    payload: {
      request: {
        method: 'GET',
        url,
      },
    },
  };
}

export function removeItem(item: {id: string}): RemoveItem {
  return {
    type: REMOVE_ITEM,
    payload: item,
  };
}

export function setCartData(data: SetCartDataRequest): SetCartData {
  return {
    type: SET_CART_DATA,
    payload: data,
  }
}

export function clearCart(): ClearCart {
  return {
    type: CLEAR_CART,
  };
}

export function updateInstallments(installments: number): UpdateInstallments {
  return {
    type: UPDATE_INSTALLMENTS,
    payload: installments,
  };
}

export function updatePaymentMethod(
  paymentMethod: 'paypal',
): UpdatePaymentMethod {
  return {
    type: UPDATE_PAYMENT_METHOD,
    payload: paymentMethod,
  };
}

export function updateShipping(shipping: number): UpdateShipping {
  return {
    type: UPDATE_SHIPPING,
    payload: shipping,
  };
}

export function updateShippingDisctoun(
  shippingDiscount: number,
): UpdateShippingDiscount {
  return {
    type: UPDATE_SHIPPING_DISCOUNT,
    payload: shippingDiscount,
  };
}

export function myOrderAddNew(data: MyOrderAddNewRequest): MyOrderAddNew {
  return {
    type: MY_ORDER_ADD_NEW,
    payload: {
      request: {
        method: 'POST',
        url: 'MyOrder/Add/v1',
        data,
      },
    },
  };
}

// selectors
export function selectCartAmount(state: State): CartAmount {
  const {cashback, discount, items, shipping, shipping_discount} = state;

  const itemsTotalEach = items.map(item => item.price.current || item.price.original * item.quantity);

  const itemsTotal = itemsTotalEach.reduce(
    (total, currentValue) => total + currentValue,
    0,
  );

  let total = itemsTotal + shipping - discount;

  total = roundTo(total, 2);

  return {
    total,
    details: {
      subtotal: roundTo(itemsTotal, 2),
      cashback,
      shipping,
      shipping_discount,
    },
    discount,
  };
}

export function selectCartIsEmpty(state: State): boolean {
  const {items} = state;

  if (items.length === 0) {
    return true;
  }

  return !items.some(item => item.quantity > 0);
}

export function selectCartItensAsPaymentRequestItens(
  state: State,
): PaymentRequestItem[] {
  const paymentRequestItens: PaymentRequestItem[] = state.items.map(item =>
    cartItemToRequestItem(item),
  );

  return paymentRequestItens;
}

// Helpers
function cartItemToRequestItem(cartItem: CartItem): PaymentRequestItem {
  const { current, original } = cartItem.price;
  
  return {
    currency: 'BRL',
    description: cartItem.name,
    name: cartItem.name,
    price: current ? current.toString() : original.toString(),
    quantity: cartItem.quantity.toString(),
    sku: cartItem.productId,
  };
}
