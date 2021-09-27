import {GamerProductDetails} from './GamerProductDetails';
import {ShippingOption} from './MyOrder';

export interface CartItem extends GamerProductDetails {
  quantity: number;
}

export interface CartAmount {
  total: number;
  details: CartAmountDetails;
  discount: number;
}

export interface CartAmountDetails {
  subtotal: number;
  cashback?: number;
  tax?: number;
  shipping?: number;
  handling_fee?: number;
  shipping_discount?: number;
  insurance?: number;
}

export interface SetCartDataRequest {
  selectedShippingOption?: ShippingOption;
}
