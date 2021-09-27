import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import GamerProductDetails from './GamerProductDetails/GamerProductDetails';
import GamerProductSeller from './GamerProductSeller/GamerProductSeller';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from 'src/Screens/Helpers/NavigatorHelpers';

type GamerProductStackParamList = {
  GamerProductDetails: undefined;
  GamerProductSeller: undefined;
};

const Tab = createMaterialTopTabNavigator<GamerProductStackParamList>();

function GamerProductNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="GamerProductDetails"
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
        name="GamerProductDetails"
        component={GamerProductDetails}
        options={{tabBarLabel: 'Detalhe'}}
      />

      <Tab.Screen
        name="GamerProductSeller"
        component={GamerProductSeller}
        options={{tabBarLabel: 'Vendedor'}}
      />
    </Tab.Navigator>
  );
}

export default GamerProductNavigation;
