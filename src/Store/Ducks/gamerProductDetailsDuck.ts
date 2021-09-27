import {BaseAction, ActionPayload, BaseResponse} from 'src/Models/ReduxModels';
import {
  GamerProductDetails,
  GetGamerProductDetailsRequest,
  GetGamerProductDetailsResponse,
} from 'src/Models/GamerProductDetails';
import {BaseErrorResponse} from 'src/Models/Login';

export const SET_ACTIVE_GAMER_PRODUCT_DETAILS =
  'SET_ACTIVE_GAMER_PRODUCT_DETAILS';

export const GET_GAMER_PRODUCT_DETAILS = 'GET_GAMER_PRODUCT_DETAILS';
export const GET_GAMER_PRODUCT_DETAILS_FAILURE =
  'GET_GAMER_PRODUCT_DETAILS_FAILURE';
export const GET_GAMER_PRODUCT_DETAILS_SUCCESS =
  'GET_GAMER_PRODUCT_DETAILS_SUCCESS';

export interface SetActiveGamerProductDetailsModel {
  catalogId: string;
  catalogType: 1 | 2;
  gamerId: string;
  /** Id da loja */
  id: string;
}

export interface SetActiveGamerProductDetails {
  type: typeof SET_ACTIVE_GAMER_PRODUCT_DETAILS;
  payload: SetActiveGamerProductDetailsModel;
}

export class GetGamerProductDetails implements BaseAction {
  readonly type = GET_GAMER_PRODUCT_DETAILS;
  constructor(public payload: ActionPayload<GetGamerProductDetailsRequest>) {}
}
export class GetGamerProductDetailsFailure implements BaseAction {
  readonly type = GET_GAMER_PRODUCT_DETAILS_FAILURE;
  constructor(public payload: BaseErrorResponse) {}
}
export class GetGamerProductDetailsSuccess implements BaseAction {
  readonly type = GET_GAMER_PRODUCT_DETAILS_SUCCESS;
  constructor(public payload: BaseResponse<GetGamerProductDetailsResponse>) {}
}

export type GamerProductDetailsActions =
  | GetGamerProductDetails
  | GetGamerProductDetailsFailure
  | GetGamerProductDetailsSuccess
  | SetActiveGamerProductDetails;

export interface State extends GamerProductDetails {
  error: string;
  loading: boolean;
  activeGamerProduct: SetActiveGamerProductDetailsModel;
}

const initialState: State = {
  error: '',
  loading: false,
  activeGamerProduct: {
    catalogId: '',
    catalogType: 1,
    gamerId: '',
    id: '',
  },
  cashback: 0,
  forSale: false,
  forTrade: false,
  gamer: {
    averageRating: 0,
    city: '',
    distance: 0,
    experiencePoints: 0,
    gamerId: '',
    imageUrl: '',
    name: '',
    negotiationsCount: 0,
    nextLevelRank: '',
    nextLevelTotalExperiencePoints: 0,
    orderMinimumValue: 20,
    position: 0,
    rankTitle: '',
    state: '',
    tradesFinishedCount: 0,
    zipCode: '',
  },
  gamerId: '',
  hasDelivery: true,
  id: '',
  imageUrl: '',
  name: '',
  photos: [],
  platform: '',
  price: {
    current: 0,
    original: 0,
  },
  productId: '',
  store: {
    city: '',
    distance: 0,
    id: '',
    imageUrl: '',
    info: [],
    name: '',
    orderMinimumValue: 20,
    proStore: false,
    stars: 0,
    state: '',
    storeRating: 0,
    trustedDelivery: true,
    zipCode: '',
  },
};

export default function reducer(
  state = initialState,
  action: GamerProductDetailsActions,
): State {
  switch (action.type) {
    case SET_ACTIVE_GAMER_PRODUCT_DETAILS: {
      return {
        ...state,
        activeGamerProduct: action.payload,
      };
    }

    case GET_GAMER_PRODUCT_DETAILS: {
      return {
        ...state,
        loading: true,
        error: '',
      };
    }

    case GET_GAMER_PRODUCT_DETAILS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: 'Não foi possível carregar os detalhes do produto',
      };
    }

    case GET_GAMER_PRODUCT_DETAILS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ...action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
}

export function getGamerProductDetails(
  data: GetGamerProductDetailsRequest,
): GetGamerProductDetails {
  return {
    type: GET_GAMER_PRODUCT_DETAILS,
    payload: {
      request: {
        method: 'POST',
        url: '/Product/CatalogDetails/v1',
        data,
      },
    },
  };
}

export function setActiveGamerProductDetails(
  data: SetActiveGamerProductDetailsModel,
): SetActiveGamerProductDetails {
  return {
    type: SET_ACTIVE_GAMER_PRODUCT_DETAILS,
    payload: data,
  };
}
