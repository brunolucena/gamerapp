import {
  GamerInfo,
  ProductItem,
  SearchCategory,
  SearchProductsRequest,
  SearchProductsResponse,
  SetSearchDataRequest,
  WelcomeGuideProductsRequest,
  WelcomeGuideProductsResponse,
} from '../../Models/SearchProducts';
import {WelcomeGuideProduct} from '../../Models/Product';
import {Action, ActionResponse, ActionAnyData} from 'src/Models/ReduxModels';

export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';

export const GET_WELCOME_GUIDE_PRODUCTS = 'GET_WELCOME_GUIDE_PRODUCTS';
export const GET_WELCOME_GUIDE_PRODUCTS_FAIL =
  'GET_WELCOME_GUIDE_PRODUCTS_FAIL';
export const GET_WELCOME_GUIDE_PRODUCTS_SUCCESS =
  'GET_WELCOME_GUIDE_PRODUCTS_SUCCESS';

export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const SEARCH_PRODUCTS_FAIL = 'SEARCH_PRODUCTS_FAIL';
export const SEARCH_PRODUCTS_SUCCESS = 'SEARCH_PRODUCTS_SUCCESS';

export const SET_SEARCH_ACTIVE_PAGE = 'SET_SEARCH_ACTIVE_PAGE';
export const SET_SEARCH_DATA = 'SET_SEARCH_DATA';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_SELECTED_SEARCH_PRODUCT_ITEM =
  'SET_SELECTED_SEARCH_PRODUCT_ITEM';
export const SET_SELECTED_SEARCH_PRODUCT_GAMER_INFO =
  'SET_SELECTED_SEARCH_PRODUCT_GAMER_INFO';
export const SET_WELCOME_GUIDE_ACTIVE_PAGE = 'SET_WELCOME_GUIDE_ACTIVE_PAGE';

export interface SetSearchData {
  type: typeof SET_SEARCH_DATA;
  payload: SetSearchDataRequest;
}

export interface State {
  error: string;
  loading: boolean;
  accessoriesCount: number;
  accessoriesFound: ProductItem[];
  gamersCount: number;
  gamersFound: GamerInfo[];
  gamesCount: number;
  gamesFound: ProductItem[];
  platformsCount: number;
  platformsFound: ProductItem[];
  search: string;
  searchActivePage: number;
  selectedCategory: SearchCategory;
  selectedGamerInfo: GamerInfo;
  selectedProductItem: ProductItem;
  storesCount: number;
  storesFound: GamerInfo[];
  totalItems: number;
  welcomeGuideActivePage: number;
  welcomeGuideProducts: WelcomeGuideProduct[];
}

const initialState: State = {
  error: '',
  loading: false,
  accessoriesCount: 0,
  accessoriesFound: [],
  gamersCount: 0,
  gamersFound: [],
  gamesCount: 0,
  gamesFound: [],
  platformsCount: 0,
  platformsFound: [],
  search: '',
  searchActivePage: 1,
  selectedCategory: 'Games',
  selectedGamerInfo: {
    experiencePoints: '',
    gamerId: '',
    gamerRankTitle: '',
    imageUrl: '',
    name: '',
  },
  selectedProductItem: {
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
  storesCount: 0,
  storesFound: [],
  totalItems: 0,
  welcomeGuideActivePage: 1,
  welcomeGuideProducts: [],
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any>,
): State {
  const {error, payload, type} = action;

  switch (type) {
    case CLEAR_PRODUCTS:
      return initialState;

    case SET_SEARCH_ACTIVE_PAGE: {
      const page: number = payload.data;

      return {
        ...state,
        searchActivePage: page,
      };
    }

    case SET_SELECTED_CATEGORY: {
      const selectedCategory = payload.data;

      return {
        ...state,
        selectedCategory,
      };
    }

    case SET_SELECTED_SEARCH_PRODUCT_GAMER_INFO: {
      const gamerInfo: GamerInfo = payload.data;

      return {
        ...state,
        selectedGamerInfo: gamerInfo,
      };
    }

    case SET_SELECTED_SEARCH_PRODUCT_ITEM: {
      const product: ProductItem = payload.data;

      return {
        ...state,
        selectedProductItem: product,
      };
    }

    case SET_WELCOME_GUIDE_ACTIVE_PAGE: {
      const page: number = payload.data;

      return {
        ...state,
        welcomeGuideActivePage: page,
      };
    }

    case GET_WELCOME_GUIDE_PRODUCTS:
      return {
        ...state,
        loading: true,
      };

    case GET_WELCOME_GUIDE_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: error ? error.data : 'Não foi possível carregar a busca',
      };

    case GET_WELCOME_GUIDE_PRODUCTS_SUCCESS: {
      const data: WelcomeGuideProductsResponse = payload.data;

      const activePage = state.welcomeGuideActivePage;

      return {
        ...state,
        loading: false,
        welcomeGuideProducts:
          activePage === 1
            ? data.products
            : [...state.welcomeGuideProducts, ...data.products],
        totalItems: data.totalItems,
      };
    }

    case SEARCH_PRODUCTS:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        error: error ? error.data : 'Não foi possível carregar a busca',
      };

    case SEARCH_PRODUCTS_SUCCESS: {
      const data: SearchProductsResponse = payload.data;

      const isFirstPage = state.searchActivePage === 1;

      const {
        accessoriesCount,
        accessoriesFound,
        gamersCount,
        gamersFound,
        gamesCount,
        gamesFound,
        platformsCount,
        platformsFound,
        storesCount,
        storesFound,
      } = data;

      return {
        ...state,
        loading: false,
        accessoriesCount,
        accessoriesFound: isFirstPage
          ? accessoriesFound
          : [...state.accessoriesFound, ...accessoriesFound],
        gamersCount,
        gamersFound: isFirstPage
          ? gamersFound
          : [...state.gamersFound, ...gamersFound],
        gamesCount,
        gamesFound: isFirstPage
          ? gamesFound
          : [...state.gamesFound, ...gamesFound],
        platformsCount,
        platformsFound: isFirstPage
          ? platformsFound
          : [...state.platformsFound, ...platformsFound],
        storesCount,
        storesFound: isFirstPage
          ? storesFound
          : [...state.storesFound, ...storesFound],
      };
    }

    case SET_SEARCH_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

export function clearProducts() {
  return {
    type: CLEAR_PRODUCTS,
    payload: {},
  };
}

export function setSearchActivePage(page: number): ActionAnyData<number> {
  return {
    type: SET_SEARCH_ACTIVE_PAGE,
    payload: {
      data: page,
    },
  };
}

export function setSearchData(data: SetSearchDataRequest): SetSearchData {
  return {
    type: SET_SEARCH_DATA,
    payload: data,
  };
}

export function setSelectedCategory(
  category: SearchCategory,
): ActionAnyData<string> {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: {
      data: category,
    },
  };
}

export function setSelectedSearchProductItem(
  product: ProductItem,
): ActionAnyData<ProductItem> {
  return {
    type: SET_SELECTED_SEARCH_PRODUCT_ITEM,
    payload: {
      data: product,
    },
  };
}

export function setSelectedSearchProductGamerInfo(
  gamerInfo: GamerInfo,
): ActionAnyData<GamerInfo> {
  return {
    type: SET_SELECTED_SEARCH_PRODUCT_GAMER_INFO,
    payload: {
      data: gamerInfo,
    },
  };
}

export function setWelcomeGuideActivePage(page: number): ActionAnyData<number> {
  return {
    type: SET_WELCOME_GUIDE_ACTIVE_PAGE,
    payload: {
      data: page,
    },
  };
}

export function searchProducts(
  data: SearchProductsRequest,
): Action<SearchProductsRequest> {
  return {
    type: SEARCH_PRODUCTS,
    payload: {
      request: {
        method: 'POST',
        url: '/Product/Filter/v1',
        data,
      },
    },
  };
}

export function getWelcomeGuideProducts(
  data: WelcomeGuideProductsRequest,
): Action<WelcomeGuideProductsRequest> {
  return {
    type: GET_WELCOME_GUIDE_PRODUCTS,
    payload: {
      request: {
        method: 'POST',
        url: '/Product/SimpleFilter/v1',
        data,
      },
    },
  };
}

// selectors
export function selectTotalPages(
  state: State,
  selectedCategory: SearchCategory,
  pageSize = 20,
): number {
  const {
    accessoriesCount,
    gamersCount,
    gamesCount,
    storesCount,
    platformsCount,
  } = state;

  let count = 0;

  switch (selectedCategory) {
    case 'Acessorios':
      count = accessoriesCount;
      break;

    case 'Gamers':
      count = gamersCount;
      break;

    case 'Games':
      count = gamesCount;
      break;

    case 'Lojas':
      count = storesCount;
      break;

    case 'Plataformas':
      count = platformsCount;
      break;

    default:
      break;
  }

  return Math.ceil(count / pageSize);
}
