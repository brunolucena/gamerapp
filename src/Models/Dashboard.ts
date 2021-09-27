export interface Banner {
  imageUrl: string;
  link: string;
  name: string;
}

export interface DashboardGamerInfo {
  experiencePoint: number;
  name: string;
  rankTitle: string;
}

export interface DashboardWishList {
  imageUrl: string;
  platformId: string;
  platformName: string;
  productId: string;
  productName: string;
}

export interface GetDashboardRequest {
  gamerId: string;
}

export interface GetDashboardResponse {
  banners: Banner[];
  gamer: DashboardGamerInfo;
  tradeAutoCount: number;
  tradeCount: number;
  tradeRequestCount: number;
  wishListItems: DashboardWishList[];
}

export interface GetDashboardResponseV2 {
  banners: Banner[];
  gamer: DashboardGamerInfo;
  tradeAutoCount: number;
  tradeCount: number;
  tradeRequestCount: number;
  items: DashboardItem[];
}

export interface DashboardItem {
  title: string;
  items: DashboardProductItem[];
  /** Utilizado pra fazer a ordenação */
  count: number;
}

export interface DashboardProductItem {
  imageUrl: string;
  platformId: string;
  platformName: string;
  productId: string;
  productName: string;
}

export interface DashboardCounts {
  tradeRequestCount: number;
  tradeAutoCount: number;
  tradeCount: number;
}
