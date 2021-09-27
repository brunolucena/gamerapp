import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Feed from './Feed';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type FeedStackParamList = {
  Feed: undefined;
};

const Stack = createStackNavigator<FeedStackParamList>();

function FeedNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default FeedNavigation;
