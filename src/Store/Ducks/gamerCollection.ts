import {
  Action,
  ActionAnyData,
  ActionAnyPayload,
  ActionResponse,
} from 'src/Models/ReduxModels';

import {
  ActiveAddGameToCollection,
  ActiveAddGameToCollectionPlatform,
  AddProductToCollectionRequest,
  AddProductToCollectionResponse,
  ClearGamerProductCollection,
  DeleteGamerProductCatalogImageRequest,
  DeleteGamerProductCatalogImageResponse,
  DeleteGamerProductCatalogRequest,
  DeleteGamerProductCatalogResponse,
  GamerInfo,
  GamerProductCollectionAccessory,
  GamerProductCollectionGame,
  GamerProductCollectionPlatform,
  GamerProductCollectionRequest,
  GamerProductCollectionResponse,
  GamerWishlist,
  GetGamerProductCatalogDetailsRequest,
  GetGamerProductCatalogDetailsResponse,
  GetGamerWishlistRequest,
  GetGamerWishlistResponse,
  SetActiveAddGameToCollection,
  SetGamerCollectionDataRequest,
} from '../../Models/GamerProductCollection';

import {State as UserState} from './user';

export const ADD_PRODUCT_TO_GAMER_COLLECTION =
  'ADD_PRODUCT_TO_GAMER_COLLECTION';
export const ADD_PRODUCT_TO_GAMER_COLLECTION_FAIL =
  'ADD_PRODUCT_TO_GAMER_COLLECTION_FAIL';
export const ADD_PRODUCT_TO_GAMER_COLLECTION_SUCCESS =
  'ADD_PRODUCT_TO_GAMER_COLLECTION_SUCCESS';

export const CLEAR_ACTIVE_GAMER_COLLECTION_ID =
  'CLEAR_ACTIVE_GAMER_COLLECTION_ID';
export const CLEAR_GAMER_COLLECTION = 'CLEAR_GAMER_COLLECTION';

export const DELETE_GAMER_PRODUCT_CATALOG = 'DELETE_GAMER_PRODUCT_CATALOG';
export const DELETE_GAMER_PRODUCT_CATALOG_FAIL =
  'DELETE_GAMER_PRODUCT_CATALOG_FAIL';
export const DELETE_GAMER_PRODUCT_CATALOG_SUCCESS =
  'DELETE_GAMER_PRODUCT_CATALOG_SUCCESS';

export const DELETE_GAMER_MY_WISHLIST = 'DELETE_GAMER_MY_WISHLIST';
export const DELETE_GAMER_MY_WISHLIST_FAIL = 'DELETE_GAMER_MY_WISHLIST_FAIL';
export const DELETE_GAMER_MY_WISHLIST_SUCCESS =
  'DELETE_GAMER_MY_WISHLIST_SUCCESS';

export const DELETE_GAMER_PRODUCT_CATALOG_IMAGE =
  'DELETE_GAMER_PRODUCT_CATALOG_IMAGE';
export const DELETE_GAMER_PRODUCT_CATALOG_IMAGE_FAIL =
  'DELETE_GAMER_PRODUCT_CATALOG_IMAGE_FAIL';
export const DELETE_GAMER_PRODUCT_CATALOG_IMAGE_SUCCESS =
  'DELETE_GAMER_PRODUCT_CATALOG_IMAGE_SUCCESS';

export const GET_GAMER_COLLECTION = 'GET_GAMER_COLLECTION';
export const GET_GAMER_COLLECTION_FAIL = 'GET_GAMER_COLLECTION_FAIL';
export const GET_GAMER_COLLECTION_SUCCESS = 'GET_GAMER_COLLECTION_SUCCESS';

export const GET_GAMER_PRODUCT_CATALOG_DETAILS =
  'GET_GAMER_PRODUCT_CATALOG_DETAILS';
export const GET_GAMER_PRODUCT_CATALOG_DETAILS_FAIL =
  'GET_GAMER_PRODUCT_CATALOG_DETAILS_FAIL';
export const GET_GAMER_PRODUCT_CATALOG_DETAILS_SUCCESS =
  'GET_GAMER_PRODUCT_CATALOG_DETAILS_SUCCESS';

export const GET_GAMER_WISHLIST = 'GET_GAMER_WISHLIST';
export const GET_GAMER_WISHLIST_FAIL = 'GET_GAMER_WISHLIST_FAIL';
export const GET_GAMER_WISHLIST_SUCCESS = 'GET_GAMER_WISHLIST_SUCCESS';

export const SET_ACTIVE_ADD_GAME_TO_COLLECTION_FOR_SALE =
  'SET_ACTIVE_ADD_GAME_TO_COLLECTION_FOR_SALE';

export const SET_ACTIVE_ADD_GAME_TO_COLLECTION_FOR_TRADE =
  'SET_ACTIVE_ADD_GAME_TO_COLLECTION_FOR_TRADE';

export const SET_ACTIVE_ADD_GAME_TO_COLLECTION =
  'SET_ACTIVE_ADD_GAME_TO_COLLECTION';

export const SET_ACTIVE_ADD_GAME_TO_COLLECTION_MEDIA_TYPE =
  'SET_ACTIVE_ADD_GAME_TO_COLLECTION_MEDIA_TYPE';

export const SET_ACTIVE_ADD_GAME_TO_COLLECTION_PLATFORM =
  'SET_ACTIVE_ADD_GAME_TO_COLLECTION_PLATFORM';

export const SET_ACTIVE_ADD_GAME_TO_COLLECTION_PRICE =
  'SET_ACTIVE_ADD_GAME_TO_COLLECTION_PRICE';

export const SET_ACTIVE_GAMER_COLLECTION_ID = 'SET_ACTIVE_GAMER_COLLECTION_ID';

export const SET_GAMER_COLLECTION_DATA = 'SET_GAMER_COLLECTION_DATA';

export interface SetGamerCollectionData {
  type: typeof SET_GAMER_COLLECTION_DATA;
  payload: SetGamerCollectionDataRequest;
}

export interface State {
  error: string;
  loading: boolean;
  refreshing: boolean;
  shouldReload: boolean;
  activeAddGameToCollection: ActiveAddGameToCollection;
  activeGamerId: string;
  games: GamerProductCollectionGame[];
  platforms: GamerProductCollectionPlatform[];
  accessories: GamerProductCollectionAccessory[];
  gamer: GamerInfo;
  wishlist: GamerWishlist[];
}

const initialState: State = {
  error: '',
  loading: false,
  refreshing: false,
  shouldReload: false,
  activeAddGameToCollection: {
    availablePlatforms: [],
    forSale: false,
    forTrade: false,
    images: [],
    mediaType: 'Fisica',
    platformId: '',
    price: 0,
    productId: '',
    productImageUrl: '',
    productName: '',
    gamerProductCatalogId: '',
    type: 'Game',
  },
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
};

export default function reducer(
  state = initialState,
  action: ActionResponse<any>,
): State {
  const {error, payload, type} = action;

  switch (type) {
    case ADD_PRODUCT_TO_GAMER_COLLECTION:
      return {
        ...state,
        loading: true,
      };

    case ADD_PRODUCT_TO_GAMER_COLLECTION_FAIL:
      return {
        ...state,
        loading: false,
        error: error
          ? error.data
          : 'Não foi possível adicionar o produto a sua coleção.',
      };

    case ADD_PRODUCT_TO_GAMER_COLLECTION_SUCCESS: {
      const data: AddProductToCollectionResponse = payload.data;

      const {acessory, game, platform} = data;

      let newAccessories = [...state.accessories];
      let newGames = [...state.games];
      let newPlatforms = [...state.platforms];

      if (acessory) {
        const foundIndex = newAccessories.findIndex(
          a => a.gamerProductCatalogId === acessory.gamerProductCatalogId,
        );

        if (foundIndex > -1) {
          newAccessories[foundIndex] = acessory;
        } else {
          newAccessories = [acessory, ...newAccessories];
        }
      } else if (game) {
        const foundIndex = newGames.findIndex(
          g => g.gamerProductCatalogId === game.gamerProductCatalogId,
        );

        if (foundIndex > -1) {
          newGames[foundIndex] = game;
        } else {
          newGames = [game, ...newGames];
        }
      } else if (platform) {
        const foundIndex = newPlatforms.findIndex(
          p => p.gamerProductCatalogId === platform.gamerProductCatalogId,
        );

        if (foundIndex > -1) {
          newPlatforms[foundIndex] = platform;
        } else {
          newPlatforms = [platform, ...newPlatforms];
        }
      }

      return {
        ...state,
        loading: false,
        accessories: newAccessories,
        games: newGames,
        platforms: newPlatforms,
      };
    }

    case CLEAR_ACTIVE_GAMER_COLLECTION_ID:
      return {
        ...state,
        activeGamerId: '',
      };

    case CLEAR_GAMER_COLLECTION:
      return initialState;
    case DELETE_GAMER_PRODUCT_CATALOG: {
      return {
        ...state,
        loading: true,
      };
    }

    case DELETE_GAMER_PRODUCT_CATALOG_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível excluir o produto',
      };
    }

    case DELETE_GAMER_PRODUCT_CATALOG_SUCCESS: {
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

    case DELETE_GAMER_PRODUCT_CATALOG_IMAGE: {
      return {
        ...state,
        loading: true,
      };
    }

    case DELETE_GAMER_PRODUCT_CATALOG_IMAGE_FAIL: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível excluir a imagem',
      };
    }

    case DELETE_GAMER_PRODUCT_CATALOG_IMAGE_SUCCESS: {
      const data: DeleteGamerProductCatalogImageResponse = payload.data;

      const {imageId} = data;
      const {activeAddGameToCollection} = state;

      const newImages = activeAddGameToCollection.images.filter(
        image => image.imageId !== imageId,
      );

      return {
        ...state,
        loading: false,
        activeAddGameToCollection: {
          ...activeAddGameToCollection,
          images: newImages,
        },
      };
    }

    case GET_GAMER_COLLECTION:
      return {
        ...state,
        loading: true,
        shouldReload: false,
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
      };

    case GET_GAMER_COLLECTION_FAIL:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: error ? error.data : 'Não foi possível carregar sua coleção',
      };

    case GET_GAMER_COLLECTION_SUCCESS: {
      const data: GamerProductCollectionResponse = payload.data;

      const {acessories: accessories, games, platforms, gamer} = data;

      return {
        ...state,
        loading: false,
        refreshing: false,
        shouldReload: false,
        accessories,
        games,
        platforms,
        gamer,
      };
    }

    case GET_GAMER_PRODUCT_CATALOG_DETAILS: {
      const {
        productId,
        gamerProductCatalogId,
      } = state.activeAddGameToCollection;

      return {
        ...state,
        loading: true,
        activeAddGameToCollection: {
          ...initialState.activeAddGameToCollection,
          productId,
          gamerProductCatalogId,
        },
      };
    }

    case GET_GAMER_PRODUCT_CATALOG_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: error
          ? error.data
          : 'Não foi possível carregar os dados do produto do gamer',
      };

    case GET_GAMER_PRODUCT_CATALOG_DETAILS_SUCCESS: {
      const data: GetGamerProductCatalogDetailsResponse = payload.data;

      const {mediaType} = data;

      return {
        ...state,
        loading: false,
        activeAddGameToCollection: {
          ...data,
          mediaType: mediaType || 'Fisica',
        },
      };
    }

    case GET_GAMER_WISHLIST:
      return {
        ...state,
        loading: true,
        shouldReload: false,
        wishlist: [],
      };

    case GET_GAMER_WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: error ? error.data : 'Não foi possível carregar sua wishlist',
      };

    case GET_GAMER_WISHLIST_SUCCESS: {
      const data: GetGamerWishlistResponse = payload.data;

      return {
        ...state,
        loading: false,
        refreshing: false,
        shouldReload: false,
        wishlist: data.wishList,
      };
    }

    case SET_ACTIVE_ADD_GAME_TO_COLLECTION: {
      const data: SetActiveAddGameToCollection = payload.data;

      const {gamerProductCatalogId, category: type, productId} = data;

      return {
        ...state,
        loading: true,
        activeAddGameToCollection: {
          ...initialState.activeAddGameToCollection,
          gamerProductCatalogId,
          productId: productId || '',
          type: type || 'Game',
        },
      };
    }

    case SET_ACTIVE_ADD_GAME_TO_COLLECTION_FOR_SALE: {
      const forSale: boolean = payload.data;

      return {
        ...state,
        activeAddGameToCollection: {
          ...state.activeAddGameToCollection,
          forSale,
        },
      };
    }

    case SET_ACTIVE_ADD_GAME_TO_COLLECTION_FOR_TRADE: {
      const forTrade: boolean = payload.data;

      return {
        ...state,
        activeAddGameToCollection: {
          ...state.activeAddGameToCollection,
          forTrade,
        },
      };
    }

    case SET_ACTIVE_ADD_GAME_TO_COLLECTION_MEDIA_TYPE: {
      const mediaType: 'Fisica' | 'Digital' = payload.data;

      return {
        ...state,
        activeAddGameToCollection: {
          ...state.activeAddGameToCollection,
          mediaType,
        },
      };
    }

    case SET_ACTIVE_ADD_GAME_TO_COLLECTION_PLATFORM: {
      const platform: ActiveAddGameToCollectionPlatform = payload.data;

      return {
        ...state,
        activeAddGameToCollection: {
          ...state.activeAddGameToCollection,
          platformId: platform.id,
        },
      };
    }

    case SET_ACTIVE_ADD_GAME_TO_COLLECTION_PRICE: {
      const price: number | string = payload.data;

      return {
        ...state,
        activeAddGameToCollection: {
          ...state.activeAddGameToCollection,
          price,
        },
      };
    }

    case SET_ACTIVE_GAMER_COLLECTION_ID:
      return {
        ...state,
        activeGamerId: action.payload.data,
      };

    case SET_GAMER_COLLECTION_DATA: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}

// Actions
export function addGameToGamerCollection(
  data: AddProductToCollectionRequest,
  type: 'New' | 'Update',
): Action<AddProductToCollectionRequest> {
  return {
    type: ADD_PRODUCT_TO_GAMER_COLLECTION,
    payload: {
      request: {
        method: 'POST',
        url:
          type === 'New'
            ? '/Product/AddProductToColletion/v1'
            : '/Gamer/UpdateProductCatalog/v1',
        data,
      },
    },
  };
}

export function clearGamerCollection(): ActionAnyPayload<
  ClearGamerProductCollection
> {
  return {
    type: CLEAR_GAMER_COLLECTION,
    payload: {},
  };
}

export function deleteGamerProductCatalog(
  data: DeleteGamerProductCatalogRequest,
): Action<DeleteGamerProductCatalogRequest> {
  return {
    type: DELETE_GAMER_PRODUCT_CATALOG,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/RemoveFromCatalog/v1',
        data,
      },
    },
  };
}

export function deleteGamerProductCatalogImage(
  data: DeleteGamerProductCatalogImageRequest,
): Action<DeleteGamerProductCatalogImageRequest> {
  return {
    type: DELETE_GAMER_PRODUCT_CATALOG_IMAGE,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/RemoveCatalogImage/v1',
        data,
      },
    },
  };
}

export function getGamerCollection(
  data: GamerProductCollectionRequest,
): Action<GamerProductCollectionRequest> {
  return {
    type: GET_GAMER_COLLECTION,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/MyCollection/v1',
        data,
      },
    },
  };
}

export function getGamerProductCatalogDetails(
  data: GetGamerProductCatalogDetailsRequest,
): Action<GetGamerProductCatalogDetailsRequest> {
  return {
    type: GET_GAMER_PRODUCT_CATALOG_DETAILS,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/ProductCatalogDetails/v1',
        data,
      },
    },
  };
}

export function getGamerWishlist(
  data: GetGamerWishlistRequest,
): Action<GetGamerWishlistRequest> {
  return {
    type: GET_GAMER_WISHLIST,
    payload: {
      request: {
        method: 'POST',
        url: '/Gamer/WishList/v1',
        data,
      },
    },
  };
}

export function setActiveAddGameToCollection(
  data: SetActiveAddGameToCollection,
): ActionAnyData<SetActiveAddGameToCollection> {
  return {
    type: SET_ACTIVE_ADD_GAME_TO_COLLECTION,
    payload: {
      data,
    },
  };
}

export function setActiveAddGameToCollectionForSale(
  forSale: boolean,
): ActionAnyData<boolean> {
  return {
    type: SET_ACTIVE_ADD_GAME_TO_COLLECTION_FOR_SALE,
    payload: {
      data: forSale,
    },
  };
}

export function setActiveAddGameToCollectionForTrade(
  forTrade: boolean,
): ActionAnyData<boolean> {
  return {
    type: SET_ACTIVE_ADD_GAME_TO_COLLECTION_FOR_TRADE,
    payload: {
      data: forTrade,
    },
  };
}

export function setActiveGamerCollectionId(
  gamerId: string,
): ActionAnyData<string> {
  return {
    type: SET_ACTIVE_GAMER_COLLECTION_ID,
    payload: {
      data: gamerId,
    },
  };
}

export function setActiveAddGameToCollectionMediaType(
  mediaType: 'Fisica' | 'Digital',
): ActionAnyData<'Fisica' | 'Digital'> {
  return {
    type: SET_ACTIVE_ADD_GAME_TO_COLLECTION_MEDIA_TYPE,
    payload: {
      data: mediaType,
    },
  };
}

export function setActiveAddGameToCollectionPlatform(
  platform: ActiveAddGameToCollectionPlatform,
): ActionAnyData<ActiveAddGameToCollectionPlatform> {
  return {
    type: SET_ACTIVE_ADD_GAME_TO_COLLECTION_PLATFORM,
    payload: {
      data: platform,
    },
  };
}

export function setActiveAddGameToCollectionPrice(
  price: number | string,
): ActionAnyData<number | string> {
  return {
    type: SET_ACTIVE_ADD_GAME_TO_COLLECTION_PRICE,
    payload: {
      data: price,
    },
  };
}

export function setGamerCollectionData(
  data: SetGamerCollectionDataRequest,
): SetGamerCollectionData {
  return {
    type: SET_GAMER_COLLECTION_DATA,
    payload: data,
  };
}

export function clearActiveGamerCollectionId(): ActionAnyPayload<any> {
  return {
    type: CLEAR_ACTIVE_GAMER_COLLECTION_ID,
    payload: {},
  };
}

// Selectors
export function selectIsMyCollectionOrWishlist(
  state: State,
  userState: UserState,
): boolean {
  return state.activeGamerId === userState.user.gamerId;
}
