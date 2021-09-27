import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import GamerProductDetails from './GamerProductDetails/GamerProductDetails';
import GamerProductGamer from './GamerProductGamer/GamerProductGamer';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from 'src/Screens/Helpers/NavigatorHelpers';

type GamerProductStackParamList = {
  GamerProductGamerDetails: undefined;
  GamerProductGamer: undefined;
};

const Tab = createMaterialTopTabNavigator<GamerProductStackParamList>();

function GamerProductGamerNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="GamerProductGamerDetails"
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
        name="GamerProductGamerDetails"
        component={GamerProductDetails}
        options={{tabBarLabel: 'Detalhe'}}
      />

      <Tab.Screen
        name="GamerProductGamer"
        component={GamerProductGamer}
        options={{tabBarLabel: 'Gamer'}}
      />
    </Tab.Navigator>
  );
}

export default GamerProductGamerNavigation;
