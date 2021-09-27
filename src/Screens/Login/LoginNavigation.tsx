import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import Login from './';
import LoginGamerApp from './LoginGamerApp/LoginGamerApp';

type LoginStackParamList = {
  Login: undefined;
  LoginGamerApp: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginGamerApp"
        component={LoginGamerApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
