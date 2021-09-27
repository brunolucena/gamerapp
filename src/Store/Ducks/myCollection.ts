import {
  GamerInfo,
  GamerProductCollectionAccessory,
  GamerProductCollectionGame,
  GamerProductCollectionPlatform,
  GamerProductCollectionRequest,
  GamerProductCollectionResponse,
  GamerWishlist,
  GetGamerWishlistRequest,
  GetGamerWishlistResponse,
  DeleteGamerProductCatalogResponse,
  DeleteGamerProductCatalogRequest,
  SetMyCollectionDataRequest,
} from '../../Models/GamerProductCollection';
import {ADD_QUICK_PRODUCTS} from './gamer';
import {Action, ActionAnyPayload, ActionPayload} from 'src/Models/ReduxModels';

export const DELETE_GAMER_PRODUCT_MY_CATALOG =
  'DELETE_GAMER_PRODUCT_MY_CATALOG';
export const DELETE_GAMER_PRODUCT_MY_CATALOG_FAIL =
  'DELETE_GAMER_PRODUCT_MY_CATALOG_FAIL';
export const DELETE_GAMER_PRODUCT_MY_CATALOG_SUCCESS =
  'DELETE_GAMER_PRODUCT_MY_CATALOG_SUCCESS';

export const DELETE_GAMER_MY_WISHLIST = 'DELETE_GAMER_MY_WISHLIST';
export const DELETE_GAMER_MY_WISHLIST_FAIL = 'DELETE_GAMER_MY_WISHLIST_FAIL';
export const DELETE_GAMER_MY_WISHLIST_SUCCESS =
  'DELETE_GAMER_MY_WISHLIST_SUCCESS';

export const GET_MY_COLLECTION = 'GET_MY_COLLECTION';
export const GET_MY_COLLECTION_FAIL = 'GET_MY_COLLECTION_FAIL';
export const GET_MY_COLLECTION_SUCCESS = 'GET_MY_COLLECTION_SUCCESS';

export const GET_MY_WISHLIST = 'GET_MY_WISHLIST';
export const GET_MY_WISHLIST_FAIL = 'GET_MY_WISHLIST_FAIL';
export const GET_MY_WISHLIST_SUCCESS = 'GET_MY_WISHLIST_SUCCESS';

export const SET_MY_COLLECTION_DATA = 'SET_MY_COLLECTION_DATA';
export const SET_MYCOLLECTION_SEARCH_TEXT = 'SET_MYCOLLECTION_SEARCH_TEXT';

export const UPDATE_COLLECTION_ACCESSORIES = 'UPDATE_COLLECTION_ACCESSORIES';
export const UPDATE_COLLECTION_GAMES = 'UPDATE_COLLECTION_GAMES';
export const UPDATE_COLLECTION_PLATFORMS = 'UPDATE_COLLECTION_PLATFORMS';

export interface GetMyCollecion {
  type: typeof GET_MY_COLLECTION;
  payload: ActionPayload<GamerProductCollectionRequest>;
}

export interface GetMyWishlist {
  type: typeof GET_MY_WISHLIST;
  payload: ActionPayload<GetGamerWishlistRequest>;
}

export interface SetMyCollectionData {
  type: typeof SET_MY_COLLECTION_DATA;
  payload: SetMyCollectionDataRequest;
}

export interface State {
  error: string;
  loading: boolean;
  refreshing: boolean;
  shouldReload: boolean;
  activeGamerId: string;
  games: GamerProductCollectionGame[];
  platforms: GamerProductCollectionPlatform[];
  accessories: GamerProductCollectionAccessory[];
  gamer: GamerInfo;
  wishlist: GamerWishlist[];
  searchText: string;
  filteredGames: GamerProductCollectionGame[];
}

const initialState: State = {
  error: '',
  loading: false,
  refreshing: false,
  shouldReload: false,
  activeGamerId: '',
  accessories: [],
  games: [],
  platforms: [],
  gamer: {
    city: '',
    experiencePoints: 0,
    gamerId: '',
    imageUrl: '',
    name: '',
    rankTitle: '',
    state: '',
  },
  wishlist: [],
  filteredGames: [],
  searchText: '',
};

export default function reducer(state = initialState, action: any): State {
  const {error, payload, type} = action;

  switch (type) {
    case ADD_QUICK_PRODUCTS: {
      return {
        ...state,
        shouldReload: true,
      };
    }

    case DELETE_GAMER_PRODUCT_MY_CATALOG: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_GAMER_PRODUCT_MY_CATALOG_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível excluir o produto',
      };
    }
    case DELETE_GAMER_PRODUCT_MY_CATALOG_SUCCESS: {
      const data: DeleteGamerProductCatalogResponse = payload.data;

      const {gamerProductCatalogId} = data;
      const {accessories, games, platforms} = state;

      const isAccessory =
        accessories.findIndex(
          accessory =>
            accessory.gamerProductCatalogId === gamerProductCatalogId,
        ) > -1;
      const isGame =
        games.findIndex(
          game => game.gamerProductCatalogId === gamerProductCatalogId,
        ) > -1;
      const isPlatform =
        platforms.findIndex(
          platform => platform.gamerProductCatalogId === gamerProductCatalogId,
        ) > -1;

      let newAccessories = accessories;
      let newGames = games;
      let newPlatforms = platforms;

      if (isAccessory) {
        newAccessories = newAccessories.filter(
          accessory =>
            accessory.gamerProductCatalogId !== gamerProductCatalogId,
        );
      } else if (isGame) {
        newGames = newGames.filter(
          game => game.gamerProductCatalogId !== gamerProductCatalogId,
        );
      } else if (isPlatform) {
        newPlatforms = platforms.filter(
          platform => platform.gamerProductCatalogId !== gamerProductCatalogId,
        );
      }

      return {
        ...state,
        loading: false,
        accessories: newAccessories,
        games: newGames,
        platforms: newPlatforms,
      };
    }

    case DELETE_GAMER_MY_WISHLIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case DELETE_GAMER_MY_WISHLIST_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível excluir o item da wishlist',
      };
    }
    case DELETE_GAMER_MY_WISHLIST_SUCCESS: {
      const data: string = payload.data;

      const newWishlist = state.wishlist.filter(
        wishlist => wishlist.gamerWishListId !== data,
      );

      return {
        ...state,
        loading: false,
        wishlist: newWishlist,
      };
    }

    case GET_MY_COLLECTION: {
      return {
        ...state,
        loading: true,
        shouldReload: false,
      };
    }
    case GET_MY_COLLECTION_FAIL: {
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: error ? error.data : 'Não foi possível carregar sua coleção',
      };
    }
    case GET_MY_COLLECTION_SUCCESS: {
      const data: GamerProductCollectionResponse = payload.data;

      const {acessories: accessories, games, platforms, gamer} = data;

      return {
        ...state,
        loading: false,
        refreshing: false,
        shouldReload: false,
        accessories,
        filteredGames: games,
        games,
        platforms,
        gamer,
      };
    }

    case GET_MY_WISHLIST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MY_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: error ? error.data : 'Não foi possível carregar sua wishlist',
      };

    case GET_MY_WISHLIST_SUCCESS: {
      const data: GetGamerWishlistResponse = payload.data;

      return {
        ...state,
        loading: false,
        refreshing: false,
        wishlist: data.wishList,
      };
    }

    case UPDATE_COLLECTION_ACCESSORIES: {
      const {accessories} = state;

      const data: GamerProductCollectionAccessory = payload.data;

      const foundIndex = accessories.findIndex(
        accessory =>
          accessory.gamerProductCatalogId === data.gamerProductCatalogId,
      );

      let newAccessories = [...accessories];

      if (foundIndex > -1) {
        newAccessories[foundIndex] = data;
      } else {
        newAccessories = [data, ...newAccessories];
      }

      return {
        ...state,
        accessories: newAccessories,
      };
    }

    case SET_MY_COLLECTION_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SET_MYCOLLECTION_SEARCH_TEXT: {
      const {searchText} = action.payload;

      const filteredGames = state.games.filter(
        game =>
          game.productName.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
      );

      return {
        ...state,
        filteredGames,
      };
    }

    case UPDATE_COLLECTION_GAMES: {
      const {games} = state;

      const data: GamerProductCollectionGame = payload.data;

      const foundIndex = games.findIndex(
        game => game.gamerProductCatalogId === data.gamerProductCatalogId,
      );

      let newGames = [...games];

      if (foundIndex > -1) {
        newGames[foundIndex] = data;
      } else {
        newGames = [data, ...newGames];
      }

      return {
        ...state,
        games: newGames,
      };
    }

    case UPDATE_COLLECTION_PLATFORMS: {
      const {platforms} = state;

      const data: GamerProductCollectionPlatform = payload.data;

      const foundIndex = platforms.findIndex(
        platform =>
          platform.gamerProductCatalogId === data.gamerProductCatalogId,
      );

      let newPlatforms = [...platforms];

      if (foundIndex > -1) {
        newPlatforms[foundIndex] = data;
      } else {
        newPlatforms = [data, ...newPlatforms];
      }

      return {
        ...state,
        platforms: newPlatforms,
      };
    }

    default:
      return state;
  }
}

// Actions
export function deleteGamerProductMyCatalog(
  data: DeleteGamerProductCatalogRequest,
): Action<DeleteGamerProductCatalogRequest> {
  return {
    type: DELETE_GAMER_PRODUCT_MY_CATALOG,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/RemoveFromCatalog/v1',
        data,
      },
    },
  };
}

export function getMyCollection(
  data: GamerProductCollectionRequest,
): GetMyCollecion {
  return {
    type: GET_MY_COLLECTION,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/MyCollection/v1',
        data,
      },
    },
  };
}

export function getMyWishlist(data: GetGamerWishlistRequest): GetMyWishlist {
  return {
    type: GET_MY_WISHLIST,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/WishList/v1',
        data,
      },
    },
  };
}

export function setMyCollectionData(
  data: SetMyCollectionDataRequest,
): SetMyCollectionData {
  return {
    type: SET_MY_COLLECTION_DATA,
    payload: data,
  };
}

export function setMyCollectionSearchText(
  searchText: string,
): ActionAnyPayload<{searchText: string}> {
  return {
    type: SET_MYCOLLECTION_SEARCH_TEXT,
    payload: {searchText},
  };
}
