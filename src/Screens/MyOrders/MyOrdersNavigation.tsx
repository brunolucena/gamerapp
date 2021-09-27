import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import MyOrdersDelivered from './MyOrdersDelivered';
import MyOrdersPending from './MyOrdersPending';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type MyOrdersTopTabParamList = {
  MyOrdersDelivered: undefined;
  MyOrdersPending: undefined;
};

const Tab = createMaterialTopTabNavigator<MyOrdersTopTabParamList>();

function MyOrdersNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="MyOrdersPending"
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
      }}>
      <Tab.Screen
        name="MyOrdersPending"
        component={MyOrdersPending}
        options={{
          tabBarLabel: 'Em andamento',
        }}
      />

      <Tab.Screen
        name="MyOrdersDelivered"
        component={MyOrdersDelivered}
        options={{
          tabBarLabel: 'Entregue',
        }}
      />
    </Tab.Navigator>
  );
}

export default MyOrdersNavigation;
