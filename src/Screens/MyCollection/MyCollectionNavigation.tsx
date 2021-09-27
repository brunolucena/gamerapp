import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MyCollection from './MyCollection/MyCollection';
import MyWishlist from './MyWishlist/MyWishlist';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type MyCollectionStackParamList = {
  MyCollection: undefined;
  MyWishlist: undefined;
};

const Tab = createMaterialTopTabNavigator<MyCollectionStackParamList>();

function MyCollectionNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="MyCollection"
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
        name="MyCollection"
        component={MyCollection}
        options={{tabBarLabel: 'Coleção'}}
      />

      <Tab.Screen
        name="MyWishlist"
        component={MyWishlist}
        options={{tabBarLabel: 'Wishlist'}}
      />
    </Tab.Navigator>
  );
}

export default MyCollectionNavigation;
