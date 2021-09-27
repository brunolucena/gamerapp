import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Collection from './Collection';
import Wishlist from '../Wishlist/Wishlist';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from 'src/Screens/Helpers/NavigatorHelpers';

type MyCollectionStackParamList = {
  GamerCollection: undefined;
  GamerWishlist: undefined;
};

const Tab = createMaterialTopTabNavigator<MyCollectionStackParamList>();

function GamerCollectionNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="GamerCollection"
      tabBarOptions={{
        activeTintColor: '#074ab5',
        allowFontScaling: true,
        inactiveTintColor: '#333333',
        indicatorStyle: {
          backgroundColor: '#074ab5',
        },
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: '#ffffff',
        },
      }}
      screenOptions={{
        ...defaultScreenOptions,
        headerTitle: '',
        headerStyle: {
          ...defaultScreenOptions.headerStyle,
          backgroundColor: '#f0f0f0',
        },
        headerTitleStyle: {
          color: MyColors.primary,
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="GamerCollection"
        component={Collection}
        options={{tabBarLabel: 'Coleção'}}
      />

      <Tab.Screen
        name="GamerWishlist"
        component={Wishlist}
        options={{tabBarLabel: 'Wishlist'}}
      />
    </Tab.Navigator>
  );
}

export default GamerCollectionNavigation;
