import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

import {GamerAppReduxStore} from 'src/Store';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

// import MyCollectionIconWithBadge from '../MyCollection/MyCollectionIconWithBadge';
// import MyCollectionNavigation from '../MyCollection/MyCollectionNavigation';
import Feed from '../Feed/Feed';
import Home from './';
import Profile from '../Profile/Profile';
import StoreNavigation from '../Store/StoreNavigation';
import StorePlans from '../Store/StorePlans';
import TradeNavigation from '../Trade/TradeNavigation';

// GamerPay
import IntroGP from '../GamerPay/IntroGP';
import Dashboard from '../GamerPay/Dashboard';

export type HomeStackParamList = {
  Home: undefined;
  Marketplace: undefined;
  MyCollection: undefined;
  Profile: undefined;
  Search: undefined;
  Store: undefined;
  Trade: undefined;
  GamerPay: undefined;
};

const Tab = createBottomTabNavigator<HomeStackParamList>();

const HomeNavigation: React.SFC<{}> = () => {
  const {user} = useSelector((state: GamerAppReduxStore) => state);

  const hasStore = user.user.isStore;
  const storeComponent = hasStore ? StoreNavigation : StorePlans;

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{headerShown: false, ...defaultScreenOptions}}
      tabBarOptions={{
        activeTintColor: '#074ab5',
        inactiveTintColor: '#b9b9b9',
      }}>
      <Tab.Screen
        name="Home"
        component={Feed}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="home" size={25} color={color} />;
          },
          tabBarLabel: 'Home',
        }}
      />

      {/** Aqui entra a questão do GamerPay*/}
      {/* <Tab.Screen
        name="GamerPay"
        component={IntroGP}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="wallet" size={25} color={color} />;
          },
          tabBarLabel: 'GamerPay',
        }}
      /> */}

      <Tab.Screen
        name="Store"
        component={storeComponent}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="tag-text-outline" size={25} color={color} />;
          },
          tabBarLabel: 'Loja',
        }}
      />

      <Tab.Screen
        name="Marketplace"
        component={Home}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="shopping" size={25} color={color} />;
          },
          tabBarLabel: 'Marketplace',
        }}
      />

      <Tab.Screen
        name="Trade"
        component={TradeNavigation}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="gamepad-variant" size={25} color={color} />;
          },
          tabBarLabel: 'Trocas',
        }}
      />

      {/* <Tab.Screen
        name="MyCollection"
        component={MyCollectionNavigation}
        options={{
          tabBarIcon: ({color}) => {
            return (
              <MyCollectionIconWithBadge
                name="treasure-chest"
                size={25}
                color={color}
              />
            );
          },
          tabBarLabel: 'Coleção',
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => {
            return <Icon name="menu" size={25} color={color} />;
          },
          tabBarLabel: 'Mais',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigation;
