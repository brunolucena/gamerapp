import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import FazerSaque from './FazerSaque';
import {defaultHeader} from '../NavigationHelpers';
import {useNavigation} from '@react-navigation/native';
import TransferRequestSuccess from './TransferRequestSuccess';

type LoginStackParamList = {
  FazerSaque: undefined;
  TransferRequestSuccess: undefined;
};

const Stack = createStackNavigator<LoginStackParamList>();

function AdmNavigation() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="FazerSaque"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="FazerSaque"
        component={FazerSaque}
        options={defaultHeader(navigation, '', 'gray')}
      />

      <Stack.Screen
        name="TransferRequestSuccess"
        component={TransferRequestSuccess}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AdmNavigation;
