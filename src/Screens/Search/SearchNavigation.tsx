import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import {MyColors} from 'src/Theme/FoundationConfig';
import Search from './Search';

type LoginStackParamList = {
  Search: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();

function SearchNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Search"
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
      <Stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SearchNavigation;
