export type CountType = 'TradeRequests' | 'AutoTrades' | 'Pedidos';
export type GroupType =
  | 'GamerProduct'
  | 'Product'
  | 'SearchGamer'
  | 'SearchProduct'
  | 'SearchStore'
  | 'Store'
  | 'StoreProduct';

export interface GetDashboardV3Request {
  gamerId: string;
  page: number;
  searchText: string;
}
export interface GetDashboardV3Response {
  banners: Banner[];
  counts: DashboardV3Count[];
  pages: number;
  sections: DashboardV3Section[];
}

export interface DashboardV3Count {
  name: string;
  count: number;
  type: CountType;
}

export interface SearchDashboardV3Request {
  gamerId: string;
  page: number;
  searchText: string;
  sectionId: string;
  groupItemId: string;
}
export interface SearchDashboardV3Response {
  count: number;
  items: SectionItem[];
}

export interface Banner {
  imageUrl: string;
  link: string;
  name: string;
}

export interface DashboardV3Section {
  count: number;
  groupItemId?: string;
  groupType: GroupType;
  items: SectionItem[];
  /** Id utilizado pra fazer a busca de cada seção individual */
  sectionId: string;
  sectionTitle: string;
}

export interface SectionItem {
  /** Id principal do item. Ex:
   * Se for store, storeId.
   * Se for product, productId.
   * Se for productCatalog, productCatalogId.
   * etc...
   */
  itemId: string;
  gamerId?: string;
  storeId?: string;
  description?: string;
  imageUrl: string;
  name: string;
  platformName?: string;
  price?: Price;
}

export interface Price {
  price: number;
  offerPrice: number;
}

export interface SetDashboardV3SearchDataRequest {
  count?: number;
  error?: string;
  groupItemId?: string;
  groupType?: GroupType;
  items?: SectionItem[];
  loading?: boolean;
  page?: number;
  search?: string;
  sectionId?: string;
  sectionTitle?: string;
}

export interface SetDashboardV3DataRequest {
  error?: string;
  loading?: boolean;
  loaded?: boolean;
  refreshing?: boolean;
  banners?: Banner[];
  counts?: DashboardV3Count[];
  lastUpdate?: Date;
  searchText?: string;
  sections?: DashboardV3Section[];
}
