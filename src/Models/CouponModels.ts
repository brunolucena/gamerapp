export type CouponTypes = 'Desconto' | 'Frete Gratis' | '';

export interface GetCouponListRequest {
  gamerId: string;
}
export interface GetCouponListResponse {
  coupoms: CoupomInfo[];
}

export interface CoupomInfo {
  amount: number;
  code: string;
  description: string;
  id: string;
  maximumValue?: number;
  minimumValue: number;
  title: string;
  /**
   * 1- Discount (1, "Desconto");
   * 2- FreeShipping (2, "Frete Gratis");
   */

  type: CouponTypes;
  validUntil?: Date | string;
}

export interface SetCouponDataRequest {
  error?: string;
  loading?: boolean;
  coupoms?: CoupomInfo[];
  selectedCoupon?: CoupomInfo;
}
