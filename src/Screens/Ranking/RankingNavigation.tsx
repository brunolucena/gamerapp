import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import RankingList from './RankingList/RankingList';
import GamerRank from './GamerRank/GamerRank';
import {MyColors} from 'src/Theme/FoundationConfig';
import {defaultHeader} from '../NavigationHelpers';

type LoginStackParamList = {
  GamerRank: undefined;
  RankingList: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();

function RankingNavigation() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="RankingList"
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
      <Stack.Screen name="GamerRank" component={GamerRank} />

      <Stack.Screen
        name="RankingList"
        component={RankingList}
        options={defaultHeader(navigation, '', 'gray')}
      />
    </Stack.Navigator>
  );
}

export default RankingNavigation;
