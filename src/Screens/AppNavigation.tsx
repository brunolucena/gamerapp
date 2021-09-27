import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native-ui-lib';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {navigationRef} from './RootNavigation';
import {MyColors} from 'src/Theme/FoundationConfig';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import {State as CartState, selectCartAmount} from 'src/Store/Ducks/cartDuck';

import {GamerAppReduxStore} from 'src/Store';
import {defaultScreenOptions} from './Helpers/NavigatorHelpers';
import {trackScreenView} from 'src/Analytics/analyticsFunctions';

import AddToCollection from './MyCollection/AddToCollection/AddToCollection';
import AdmNavigation from './Adm/AdmNavigation';
import CadastroNavigation from './Signup/CadastroNavigation';
import ChangePassword from './Profile/ChangePassword/ChangePassword';
import Coming from './Coming/Coming';
import ContactGamerApp from './ContactGamerApp';
import CouponsList from './Cupons/CuponsList';
import CreateCollection from './MyCollection/CreateCollection/CreateCollection';
import CreateWishlist from './MyCollection/CreateWishlist/CreateWishlist';
import DeclineButton from './Trade/TradeRequestSummary/DeclineButton/DeclineButton';
import DeleteProductButton from './EditProduct/DeleteProductButton';
import EditProduct from './EditProduct';
import EditProfile from './Profile/EditProfile/EditProfile';
import ForgotPasswordSuccess from './ForgotPassword/ForgotPasswordSuccess';
import GamerCollectionNavigation from './Search/Collection/GamerCollectionNavigation';
import GamerProductGamerNavigation from './Product/GamerProduct/GamerProductGamerNavigation';
import GamerProductNavigation from './Product/GamerProduct/GamerProductNavigation';
import HomeNavigation from './Home/HomeNavigation';
import LevelUp from './LevelUp/LevelUp';
import LoginNavigator from './Login/LoginNavigation';
import MyAdresses from './UserAddress/MyAdresses/MyAddresses';
import MyOrderNavigation from './MyOrder/MyOrderNavigation';
import MyOrdersNavigation from './MyOrders/MyOrdersNavigation';
import NewAddress from './UserAddress/NewAddress/NewAddress';
import NewAddressCep from './UserAddress/NewAddressCep/NewAddressCep';
import OnboardingNavigation from './Onboarding/OnboardingNavigation';
import OrderRequest from './Order/OrderRequest';
import OrderRequestSuccess from './Order/OrderRequestSuccess';
import PayPal from './Order/PayPal';
import PaymentMethods from './Order/PaymentMethods';
import PosTradeChat from './PosTrade/Chat/Chat';
import PosTradeNavigation from './PosTrade/PosTradeNavigation';
import ProductDetails from './Product/ProductDetails/ProductDetails';
import RankingNavigation from './Ranking/RankingNavigation';
import ReviewNavigation from './Review/ReviewNavigation';
import SectionList from './SectionList';
import SellProductNavigation from './SellProduct/SellProductNavigation';
import SellerStore from './Seller/SellerStore';
import StoreOrderNavigation from './StoreOrder/StoreOrderNavigation';
import StoreRegisterNavigation from './Store/StoreRegisterNavigation';
import StorybookUIRoot from '../../storybook';
import TradeCompleted from './PosTrade/TradeCompleted/TradeCompleted';
import TradeRequestCompleted from './Trade/TradeRequestCompleted/TradeRequestCompleted';
import TradeRequestNavigation from './Trade/TradeRequestNavigation';
import TradeRequestSent from './Trade/TradeRequestSent/TradeRequestSent';
import TutorialGamerApp from 'src/Components/TutorialGamerApp/TutorialGamerApp';
import PostNavigation from './Post/PostNavigation';

// GamerPay
import IntroGP from './GamerPay/IntroGP';
import CadastroGPNavigation from './GamerPay/CadastroGPNavigation';
import Dashboard from './GamerPay/Dashboard';
import SaleCoupons from './GamerPay/SaleCoupons';
import QRCode from './GamerPay/QRCode';

// Gets the current screen from navigation state
const getActiveRouteName = (
  state: NavigationState | PartialState<NavigationState> | undefined,
): any => {
  if (!state) {
    return;
  }

  const route = state.routes[state.index!];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};

export type RootStackParamList<T> = {
  AddCreditCard: T;
  AddToCollection: T;
  Adm: T;
  Cadastro: T;
  ChangePassword: T;
  Chat: T;
  Coming: T;
  ContactGamerApp: T;
  CreateCollection: T;
  CreateWishlist: T;
  CouponsList: T;
  EditProduct: T;
  EditProfile: T;
  ForgotPasswordSuccess: T;
  GamerCollection: T;
  GamerProduct: T;
  GamerProductGamer: T;
  Home: T;
  LevelUp: T;
  Login: T;
  MyOrder: T;
  MyOrders: T;
  Onboarding: T;
  OrderRequest: T;
  OrderRequestSuccess: T;
  PayPal: T;
  PaymentMethods: T;
  PostNavigation: T;
  PosTrade: T;
  PosTradeCompleted: T;
  ProductDetails: T;
  ProfileAddresses: T;
  ProfileNewAddress: T;
  ProfileNewAddressCep: T;
  Ranking: T;
  Review: T;
  SectionList: T;
  SellProduct: T;
  SellerStoreSee: T;
  SellerStoreSeeAll: T;
  Share: T;
  StoreOrder: T;
  StoreRegister: T;
  Storybook: T;
  TradeRequest: T;
  TradeRequestCompleted: T;
  TradeRequestSent: T;
  Wallet: T;

  IntroGP: T;
  CadastroGPNavigation: T;
  SaleCoupons: T;
  QRCode: T;
};

const Stack = createStackNavigator<RootStackParamList<any>>();

function showCartButton(cart: CartState, currentRoute: string): boolean {
  if (cart.items.length === 0) {
    return false;
  }

  switch (currentRoute) {
    case 'Chat':
    case 'EditProduct':
    case 'MyCollection':
    case 'MyWishlist':
    case 'PayPal':
    case 'PaymentMethods':
    case 'Profile':
    case 'ProfileAddresses':
    case 'ProfileNewAddress':
    case 'ProfileNewAddressCep':
    case 'SellProductDelivery':
    case 'SellProductInit':
    case 'SellProductPhotos':
    case 'SellProductPlatforms':
    case 'SellProductPrice':
    case 'SellProductPromotion':
    case 'SellProductReview':
    case 'SellProductSearch':
    case 'SellProductState':
    case 'SellProductStock':
    case 'SellerSells':
    case 'SellerStore':
    case 'SellProductReview2':
    case 'SellProductSuccess':
    case 'OrderRequest':
    case 'OrderRequestSuccess': {
      return false;
    }

    default: {
      return true;
    }
  }
}

const AppNavigation: React.SFC<{}> = () => {
  const routeNameRef = React.useRef();

  const [currentRoute, setCurrentRoute] = useState('');

  const {cart, tradeActive, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {tradeViewId} = tradeActive.activeTradeData;

  const {onboardingDone, token} = user;

  const isLoggedIn = !!token;

  const getInitialRouteName = (): string => {
    if (!isLoggedIn) {
      return 'Login';
    } else if (onboardingDone) {
      return 'Home';
    } else {
      return 'Onboarding';
    }
  };

  const initialRouteName = getInitialRouteName();

  const showCart = showCartButton(cart, currentRoute);

  useEffect(() => {
    // @ts-ignore
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  function handleNavigateOrderRequest() {
    // @ts-ignore
    navigationRef.current.navigate('OrderRequest');
  }

  const cartTotal = selectCartAmount(cart);

  function hasBottomTabNavigation() {
    switch (currentRoute) {
      case 'Home':
      case 'MyCollection':
      case 'MySellerStore':
      case 'MyWishlist':
      case 'Profile':
      case 'Ranking':
      case 'RankingList':
      case 'Search':
      case 'SellerSells':
      case 'SellerStore':
      case 'Store':
      case 'Trade':
      case 'Trade':
      case 'TradeListAuto':
      case 'TradeListConcluidas':
      case 'TradeListEmAndamento': {
        return true;
      }

      default: {
        return false;
      }
    }
  }

  return (
    <NavigationContainer
      onStateChange={state => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = getActiveRouteName(state);

        setCurrentRoute(currentRouteName);

        if (previousRouteName !== currentRouteName) {
          trackScreenView(currentRouteName);
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName;
      }}
      ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
          ...defaultScreenOptions,
        }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeNavigation} />

            <Stack.Screen name="Adm" component={AdmNavigation} />

            <Stack.Screen
              name="Chat"
              component={PosTradeChat}
              options={{
                headerShown: true,
                headerTitle: 'Chat',
              }}
            />

            <Stack.Screen
              name="ContactGamerApp"
              component={ContactGamerApp}
              options={{
                headerShown: true,
                headerTitle: 'Chat',
              }}
            />

            <Stack.Screen
              name="EditProduct"
              component={EditProduct}
              options={{
                headerShown: true,
                headerTitle: 'Editar',
                headerRight: () => {
                  return <DeleteProductButton />;
                },
              }}
            />

            <Stack.Screen
              name="TradeRequest"
              component={TradeRequestNavigation}
              options={{
                headerShown: true,
                headerTitle: tradeViewId
                  ? `Troca ${tradeViewId}`
                  : 'Ambiente de troca',
                headerTitleStyle: {color: '#333333', fontSize: 15},
                headerRight: () => <DeclineButton />,
              }}
            />

            <Stack.Screen
              name="TradeRequestCompleted"
              component={TradeRequestCompleted}
              options={{
                headerShown: true,
                headerTitle: 'Proposta de troca concluída',
                headerTitleStyle: {color: '#333333', fontSize: 15},
              }}
            />

            <Stack.Screen
              name="TradeRequestSent"
              component={TradeRequestSent}
              options={{
                headerShown: true,
                headerTitle: 'Proposta enviada',
                headerTitleStyle: {color: '#333333', fontSize: 15},
              }}
            />

            <Stack.Screen name="LevelUp" component={LevelUp} />

            <Stack.Screen name="MyOrder" component={MyOrderNavigation} />

            <Stack.Screen
              name="MyOrders"
              component={MyOrdersNavigation}
              options={{
                headerShown: true,
                headerTitle: 'Minhas compras',
                headerTitleStyle: {color: '#333333', fontSize: 15},
              }}
            />

            <Stack.Screen
              name="PosTrade"
              component={PosTradeNavigation}
              options={{
                headerShown: true,
                headerTitle: 'Ambiente de troca',
                headerTitleStyle: {color: '#333333', fontSize: 15},
              }}
            />

            <Stack.Screen name="PosTradeCompleted" component={TradeCompleted} />

            <Stack.Screen
              name="CreateCollection"
              component={CreateCollection}
              options={{
                headerShown: true,
                headerTitle: 'Adicionar a Coleção',
                headerTitleStyle: {fontSize: 15},
              }}
            />

            <Stack.Screen
              name="CreateWishlist"
              component={CreateWishlist}
              options={{
                headerShown: true,
                headerTitle: 'Adicionar a Wishlist',
                headerTitleStyle: {fontSize: 15},
              }}
            />

            <Stack.Screen
              name="GamerCollection"
              component={GamerCollectionNavigation}
              options={{
                headerShown: true,
                headerTitle: '',
              }}
            />

            <Stack.Screen
              name="GamerProduct"
              component={GamerProductNavigation}
              options={{
                headerShown: true,
                headerTitle: 'Produto',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />
            <Stack.Screen
              name="GamerProductGamer"
              component={GamerProductGamerNavigation}
              options={{
                headerShown: true,
                headerTitle: 'Produto',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="PayPal"
              component={PayPal}
              options={{
                headerShown: true,
                headerTitle: 'Finalizar pedido',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="OrderRequest"
              component={OrderRequest}
              options={{
                headerShown: true,
                headerTitle: 'Finalizar pedido',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="OrderRequestSuccess"
              component={OrderRequestSuccess}
            />

            <Stack.Screen
              name="PaymentMethods"
              component={PaymentMethods}
              options={{
                headerShown: true,
                headerTitle: '',
                headerStyle: {
                  elevation: 0, // for android
                  shadowOpacity: 0, // for ios
                  borderBottomWidth: 0, // for ios
                  backgroundColor: '#f2f2f2',
                },
              }}
            />

            <Stack.Screen name="PostNavigation" component={PostNavigation} />

            <Stack.Screen
              name="ProfileAddresses"
              component={MyAdresses}
              options={{
                headerShown: true,
                headerTitle: 'Endereços',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="ProfileNewAddress"
              component={NewAddress}
              options={{
                headerShown: true,
                headerTitle: 'Cadastrar endereço',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="ProfileNewAddressCep"
              component={NewAddressCep}
              options={{
                headerShown: true,
                headerTitle: 'Cadastrar endereço',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="EditProfile"
              component={EditProfile}
              options={{
                headerShown: true,
                headerTitle: 'Editar perfil',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{
                headerShown: true,
                headerTitle: 'Alterar senha',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="AddToCollection"
              component={AddToCollection}
              options={{
                headerShown: true,
                headerTitle: 'Adicionar',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen name="ProductDetails" component={ProductDetails} />

            <Stack.Screen name="Ranking" component={RankingNavigation} />

            <Stack.Screen name="Review" component={ReviewNavigation} />

            <Stack.Screen
              name="Share"
              component={Coming}
              options={{
                headerShown: true,
                headerTitle: 'Indique',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="Wallet"
              component={Coming}
              options={{
                headerShown: true,
                headerTitle: 'Carteira',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="CouponsList"
              component={CouponsList}
              options={{
                headerShown: true,
                headerTitle: 'Cupons',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="Coming"
              component={Coming}
              options={{
                headerShown: true,
                headerTitle: '',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="SellerStoreSee"
              component={SellerStore}
              options={{
                headerShown: true,
                headerTitle: 'Loja',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="SellerStoreSeeAll"
              component={SellerStore}
              options={{
                headerShown: true,
                headerTitle: 'Loja',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="SectionList"
              component={SectionList}
              options={{
                headerShown: true,
                headerStyle: {
                  elevation: 0, // for android
                  shadowOpacity: 0, // for ios
                  borderBottomWidth: 0, // for ios
                  backgroundColor: '#f2f2f2',
                },
                headerTitle: '',
                headerTitleStyle: {fontSize: 15, color: '#333333'},
              }}
            />

            <Stack.Screen
              name="SellProduct"
              component={SellProductNavigation}
            />

            <Stack.Screen name="StoreOrder" component={StoreOrderNavigation} />

            <Stack.Screen
              name="StoreRegister"
              component={StoreRegisterNavigation}
            />

            {/** Gamer Pay */}
            <Stack.Screen name="IntroGP" component={IntroGP} />

            <Stack.Screen
              name="CadastroGPNavigation"
              component={CadastroGPNavigation}
            />

            <Stack.Screen name="SaleCoupons" component={SaleCoupons} />

            <Stack.Screen name="QRCode" component={QRCode} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginNavigator} />
            <Stack.Screen name="Cadastro" component={CadastroNavigation} />
            <Stack.Screen
              name="ForgotPasswordSuccess"
              component={ForgotPasswordSuccess}
            />
          </>
        )}

        <Stack.Screen name="Onboarding" component={OnboardingNavigation} />

        <Stack.Screen
          name="Storybook"
          component={StorybookUIRoot}
          options={{headerShown: true, headerTitle: 'Storybook'}}
        />
      </Stack.Navigator>

      {/* <TutorialGamerApp screen={routeNameRef.current!} /> */}

      {showCart && (
        <View
          style={[
            styles.cartWrapper,
            hasBottomTabNavigation() && styles.marginBottom,
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleNavigateOrderRequest}>
            <View style={styles.cart}>
              <Text white style={styles.cartItem}>
                {cart.items.length}
              </Text>

              <Text white>Ver carrinho</Text>

              <Text white style={[styles.cartItem, styles.cartItem2]}>
                {formatCurrency(cartTotal.total)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    backgroundColor: MyColors.primary,
  },
  cartItem: {
    width: 80,
  },
  cartItem2: {
    textAlign: 'right',
  },
  cartWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
  },
  marginBottom: {
    bottom: 50,
  },
});

export default AppNavigation;
