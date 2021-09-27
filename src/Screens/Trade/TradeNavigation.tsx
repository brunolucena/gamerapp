import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TradeListAuto from './TradesList/TradesListAuto/TradesListAuto';
import TradeListConcluidas from './TradesList/TradesListConcluidas/TradesListConcluidas';
import TradeListEmAndamento from './TradesList/TradesListEmAndamento/TradesListEmAndamento';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type TradeStackParamList = {
  TradeListEmAndamento: undefined;
  TradeListAuto: undefined;
  TradeListConcluidas: undefined;
};

const Tab = createMaterialTopTabNavigator<TradeStackParamList>();

function TradeNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="TradeListEmAndamento"
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
        name="TradeListEmAndamento"
        component={TradeListEmAndamento}
        options={{
          tabBarLabel: 'Negociações',
        }}
      />

      <Tab.Screen
        name="TradeListAuto"
        component={TradeListAuto}
        options={{
          tabBarLabel: 'Auto',
        }}
      />

      <Tab.Screen
        name="TradeListConcluidas"
        component={TradeListConcluidas}
        options={{
          tabBarLabel: 'Aceitas',
        }}
      />
    </Tab.Navigator>
  );
}

export default TradeNavigation;
