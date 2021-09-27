import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import MyOrderDetails from './MyOrderDetails';
import MyOrderStatus from './MyOrderStatus';
import MyOrderSummary from './MyOrderSummary';
import {defaultHeader} from '../NavigationHelpers';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type MyOrderStackParamList = {
  MyOrderDetails: undefined;
  MyOrderStatus: undefined;
  MyOrderSummary: undefined;
  MyOrderChat: undefined;
};

const Stack = createStackNavigator<MyOrderStackParamList>();

function MyOrderNavigation() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="MyOrderDetails"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="MyOrderDetails"
        component={MyOrderDetails}
        options={defaultHeader(navigation, 'Compra', 'white')}
      />

      <Stack.Screen
        name="MyOrderSummary"
        component={MyOrderSummary}
        options={{headerTitle: 'Compra'}}
      />

      <Stack.Screen
        name="MyOrderStatus"
        component={MyOrderStatus}
        options={{headerTitle: 'Compra'}}
      />
    </Stack.Navigator>
  );
}

export default MyOrderNavigation;
