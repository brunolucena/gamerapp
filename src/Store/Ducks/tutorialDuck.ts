import {RootStackParamList} from 'src/Screens/AppNavigation';
import {TutorialText} from 'src/Components/TutorialGamerApp/TutorialGamerApp';

export const COMPLETE_TUTORIAL = 'COMPLETE_TUTORIAL';

export interface CompleteTutorial {
  type: typeof COMPLETE_TUTORIAL;
  payload: {screen: string};
}

export interface TutorialRedux {
  active: boolean;
  completed: boolean | null;
}

export interface State {
  active: boolean;
  Home: TutorialRedux;
  MyCollection: TutorialRedux;
  Profile: TutorialRedux;
  SellerStore: TutorialRedux;
  Store: TutorialRedux;
  TradeListEmAndamento: TutorialRedux;
  [key: string]: any;
}

export type Actions = CompleteTutorial;

const initialState: State = {
  active: false,
  Home: {
    active: true,
    completed: null,
  },
  // LevelUp: {active: false, completed: null, texts: []},
  // Login: {active: false, completed: null, texts: []},
  // MyOrder: {active: false, completed: null, texts: []},
  // MyOrders: {active: false, completed: null, texts: []},
  // OrderRequest: {active: false, completed: null, texts: []},
  // OrderRequestSuccess: {active: false, completed: null, texts: []},
  // PayPal: {active: false, completed: null, texts: []},
  // PaymentMethods: {active: false, completed: null, texts: []},
  // PosTrade: {active: false, completed: null, texts: []},
  // PosTradeCompleted: {active: false, completed: null, texts: []},
  // ProductDetails: {active: false, completed: null, texts: []},
  // ProfileAddresses: {active: false, completed: null, texts: []},
  // ProfileNewAddress: {active: false, completed: null, texts: []},
  // ProfileNewAddressCep: {active: false, completed: null, texts: []},
  // Ranking: {active: false, completed: null, texts: []},
  // SectionList: {active: false, completed: null, texts: []},
  // SellProduct: {active: false, completed: null, texts: []},
  // SellerStoreSee: {active: false, completed: null, texts: []},
  // SellerStoreSeeAll: {active: false, completed: null, texts: []},
  // Share: {active: false, completed: null, texts: []},
  MyCollection: {
    active: true,
    completed: null,
  },
  Profile: {
    active: true,
    completed: null,
  },
  SellerStore: {
    active: true,
    completed: null,
  },
  Store: {
    active: true,
    completed: null,
  },
  TradeListEmAndamento: {
    active: true,
    completed: null,
  },
  // StoreOrder: {active: false, completed: null, texts: []},
  // StoreRegister: {active: false, completed: null, texts: []},
  // Storybook: {active: false, completed: null, texts: []},
  // TradeRequest: {active: false, completed: null, texts: []},
  // TradeRequestCompleted: {active: false, completed: null, texts: []},
  // TradeRequestSent: {active: false, completed: null, texts: []},
  // Wallet: {active: false, completed: null, texts: []},
};

export default function reducer(state = initialState, action: Actions): State {
  switch (action.type) {
    case COMPLETE_TUTORIAL: {
      const {screen} = action.payload;

      const newState = {...state};

      // @ts-ignore
      newState[screen].completed = true;

      return newState;
    }

    default: {
      return state;
    }
  }
}

export function completeTutorial(screen: string): CompleteTutorial {
  return {
    type: COMPLETE_TUTORIAL,
    payload: {screen},
  };
}
