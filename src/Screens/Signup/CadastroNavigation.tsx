import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import Name from './Name';
import Email from './Email';
import Password from './Password';
import Welcome from './Welcome';
import {MyColors} from 'src/Theme/FoundationConfig';
import {useNavigation} from '@react-navigation/native';
import {defaultHeader} from '../NavigationHelpers';

type LoginStackParamList = {
  Email: undefined;
  Name: undefined;
  Password: undefined;
  Welcome: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();

function CadastroNavigation() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="Name"
      screenOptions={{
        ...defaultScreenOptions,
        headerTitle: 'Criar conta',
        headerStyle: {
          ...defaultScreenOptions.headerStyle,
          backgroundColor: '#f0f0f0',
        },
        headerTitleStyle: {
          color: MyColors.primary,
        },
      }}>
      <Stack.Screen
        name="Name"
        component={Name}
        options={defaultHeader(navigation, 'Criar Conta')}
      />

      <Stack.Screen name="Email" component={Email} />

      <Stack.Screen name="Password" component={Password} />

      <Stack.Screen name="Welcome" component={Welcome} />
    </Stack.Navigator>
  );
}

export default CadastroNavigation;
