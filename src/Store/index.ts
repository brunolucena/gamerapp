import autoTradeList, {
  State as AutoTradeListState,
} from './Ducks/autoTradeList';
import bankAccount, {State as BankAccountState} from './Ducks/bankAccountDuck';
import cart, {State as CartState} from './Ducks/cartDuck';
import chat, {State as ChatState} from './Ducks/chat';
import config, {State as ConfigState} from './Ducks/configDuck';
import coupon, {State as CouponState} from './Ducks/couponDuck';
import customerAccount, {
  State as CustomerAccountState,
} from './Ducks/customerAccountDuck';
import dashboard, {State as DashboardState} from './Ducks/dashboard';
import dashboardV3, {State as DashboardV3State} from './Ducks/dashboardV3Duck';
import dashboardV3Search, {
  State as DashboardV3SearchState,
} from './Ducks/dashboardV3SearchDuck';
import editProduct, {State as EditProductState} from './Ducks/editProductDuck';
import gamer, {State as GamerState} from './Ducks/gamer';
import gamerCollection, {
  State as GamerCollectionState,
} from './Ducks/gamerCollection';
import gamerProductDetails, {
  State as GamerProductDetailsState,
} from './Ducks/gamerProductDetailsDuck';
import gamification, {State as GamificationState} from './Ducks/gamification';
import levelUp, {State as LevelUpState} from './Ducks/levelUpDuck';
import myCollection, {State as MyCollectionState} from './Ducks/myCollection';
import myOrder, {State as MyOrderState} from './Ducks/myOrderDuck';
import myOrderList, {State as MyOrderListState} from './Ducks/myOrdersListDuck';
import notification, {
  State as NotificationState,
} from './Ducks/notificationDuck';
import paypal, {State as PayPalState} from './Ducks/paypalDuck';
import platforms, {PlatformsState} from './Ducks/platformDuck';
import postComment, {PostCommentState} from './Ducks/postCommentDuck';
import postCommentReplies, {
  PostCommentRepliesState,
} from './Ducks/postCommentReplyDuck';
import feed, {FeedState} from './Ducks/feedDuck';
import post, {State as PostState} from './Ducks/postDuck';
import productDetails, {
  State as ProductDetailsState,
} from './Ducks/productDetails';
import ranking, {State as RankingState} from './Ducks/ranking';
import registerStore, {
  State as RegisterStoreState,
} from './Ducks/registerStore';
import searchProducts, {
  State as SearchProductsState,
} from './Ducks/searchProducts';
import searchProductSearchBar, {
  State as SearchProductSearchBarState,
} from './Ducks/searchProductSearchBar';
import sellerAddProduct, {
  State as SellerAddProductState,
} from './Ducks/sellerAddProduct';
import seller, {State as SellerState} from './Ducks/sellerDucks';
import sellerOrder, {State as SellerOrderState} from './Ducks/sellerOrderDuck';
import signup, {State as SignupState} from './Ducks/signup';
import storeOrders, {State as StoreOrdersState} from './Ducks/storeOrdersDuck';
import tags, {TagState} from './Ducks/tagsDuck';
import testRepos, {State as TestReposState} from './Ducks/testRepos';
import toasts, {State as ToastsState} from './Ducks/toastDucks';
import tradeActive, {State as TradeActiveState} from './Ducks/tradeActive';
import tradeDetails, {State as TradeDetailsState} from './Ducks/tradeDetails';
import tradeList, {State as TradeListState} from './Ducks/tradeList';
import tradeRequestDetails, {
  State as TradeRequestDetailsState,
} from './Ducks/tradeRequestDetails';
import tradeRequestList, {
  State as TradeRequestListState,
} from './Ducks/tradeRequestList';
import tutorial, {State as TutorialState} from './Ducks/tutorialDuck';
import user, {State as UserState} from './Ducks/user';
import userAddress, {State as UserAddressState} from './Ducks/userAddress';

import gamerPayUser, {State as GamerPayUserState} from './Ducks/gamerPayUser';

export interface GamerAppReduxStore {
  autoTradeList: AutoTradeListState;
  bankAccount: BankAccountState;
  cart: CartState;
  chat: ChatState;
  config: ConfigState;
  coupon: CouponState;
  customerAccount: CustomerAccountState;
  dashboard: DashboardState;
  dashboardV3: DashboardV3State;
  dashboardV3Search: DashboardV3SearchState;
  editProduct: EditProductState;
  feed: FeedState;
  gamer: GamerState;
  gamerCollection: GamerCollectionState;
  gamerProductDetails: GamerProductDetailsState;
  gamification: GamificationState;
  levelUp: LevelUpState;
  myCollection: MyCollectionState;
  myOrder: MyOrderState;
  myOrderList: MyOrderListState;
  notification: NotificationState;
  paypal: PayPalState;
  platforms: PlatformsState;
  post: PostState;
  postComment: PostCommentState;
  postCommentReplies: PostCommentRepliesState;
  productDetails: ProductDetailsState;
  ranking: RankingState;
  registerStore: RegisterStoreState;
  searchProducts: SearchProductsState;
  searchProductSearchBar: SearchProductSearchBarState;
  seller: SellerState;
  sellerAddProduct: SellerAddProductState;
  sellerOrder: SellerOrderState;
  signup: SignupState;
  storeOrders: StoreOrdersState;
  tags: TagState;
  testRepos: TestReposState;
  toasts: ToastsState;
  tradeActive: TradeActiveState;
  tradeDetails: TradeDetailsState;
  tradeList: TradeListState;
  tradeRequestDetails: TradeRequestDetailsState;
  tradeRequestList: TradeRequestListState;
  tutorial: TutorialState;
  user: UserState;
  userAddress: UserAddressState;
  gamerPayUser: GamerPayUserState;
}

const reducers: any = {
  autoTradeList,
  bankAccount,
  cart,
  chat,
  config,
  coupon,
  customerAccount,
  dashboard,
  dashboardV3,
  dashboardV3Search,
  editProduct,
  feed,
  gamer,
  gamerCollection,
  gamerProductDetails,
  gamification,
  levelUp,
  myCollection,
  myOrder,
  myOrderList,
  notification,
  paypal,
  platforms,
  post,
  postComment,
  postCommentReplies,
  productDetails,
  ranking,
  registerStore,
  searchProducts,
  searchProductSearchBar,
  seller,
  sellerAddProduct,
  sellerOrder,
  signup,
  storeOrders,
  tags,
  testRepos,
  toasts,
  tradeActive,
  tradeDetails,
  tradeList,
  tradeRequestDetails,
  tradeRequestList,
  tutorial,
  user,
  userAddress,

  gamerPayUser
};

export default reducers;
