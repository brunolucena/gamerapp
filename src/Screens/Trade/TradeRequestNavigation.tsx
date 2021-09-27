import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TradeRequestMe from './TradeRequestMe/TradeRequestMe';
import TradeRequestOtherPart from './TradeRequestOtherPart/TradeRequestOtherPart';
import TradeRequestSummary from './TradeRequestSummary/TradeRequestSummary';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import {selectTradePart} from 'src/Store/Ducks/tradeActive';
import {useSelector} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';

type TradeStackParamList = {
  TradeRequestMe: undefined;
  TradeRequestOtherPart: undefined;
  TradeRequestSummary: undefined;
};

const Tab = createMaterialTopTabNavigator<TradeStackParamList>();

function TradeRequestNavigation() {
  const {tradeActive, user} = useSelector((state: GamerAppReduxStore) => state);

  const {gamerId} = user.user;

  const other = selectTradePart({state: tradeActive, gamerId, part: 'other'});

  return (
    <Tab.Navigator
      initialRouteName="TradeRequestSummary"
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
        name="TradeRequestOtherPart"
        component={TradeRequestOtherPart}
        options={{
          tabBarLabel: other.gamerName || '-',
        }}
      />

      <Tab.Screen
        name="TradeRequestSummary"
        component={TradeRequestSummary}
        options={{
          tabBarLabel: 'Resumo',
        }}
      />

      <Tab.Screen
        name="TradeRequestMe"
        component={TradeRequestMe}
        options={{
          tabBarLabel: 'Você',
        }}
      />
    </Tab.Navigator>
  );
}

export default TradeRequestNavigation;
