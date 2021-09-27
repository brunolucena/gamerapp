import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import SellerSells from './SellerSells';
import SellerStore from './SellerStore';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type MySellerStoreStackParamList = {
  SellerStore: undefined;
  SellerSells: undefined;
};

const Tab = createMaterialTopTabNavigator<MySellerStoreStackParamList>();

function MySellerStoreNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="SellerStore"
      tabBarOptions={{
        activeTintColor: '#074ab5',
        allowFontScaling: true,
        inactiveTintColor: '#074ab5',
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
      }}>
      <Tab.Screen
        name="SellerStore"
        component={SellerStore}
        options={{
          tabBarLabel: 'Minha loja',
        }}
      />

      <Tab.Screen
        name="SellerSells"
        component={SellerSells}
        options={{
          tabBarLabel: 'Minhas vendas',
        }}
      />
    </Tab.Navigator>
  );
}

export default MySellerStoreNavigation;
