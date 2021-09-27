import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import PosTradeActions from './Actions/Actions';
import PosTradeChat from './Chat/Chat';
import PosTradeSummary from './Summary/Summary';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type PosTradeStackParamList = {
  PosTradeActionsNavigator: undefined;
  PosTradeChat: undefined;
  PosTradeSummary: undefined;
};

const Tab = createMaterialTopTabNavigator<PosTradeStackParamList>();

function PosTradeNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="PosTradeActionsNavigator"
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
        name="PosTradeActionsNavigator"
        component={PosTradeActions}
        options={{
          tabBarLabel: 'Acompanhar',
        }}
      />

      <Tab.Screen
        name="PosTradeSummary"
        component={PosTradeSummary}
        options={{
          tabBarLabel: 'Resumo',
        }}
      />

      <Tab.Screen
        name="PosTradeChat"
        component={PosTradeChat}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
    </Tab.Navigator>
  );
}

export default PosTradeNavigation;
