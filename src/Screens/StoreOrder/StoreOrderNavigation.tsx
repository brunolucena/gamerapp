import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import StoreOrderDetails from './StoreOrderDetails';
import StoreOrderStatus from './StoreOrderStatus';
import StoreOrderSummary from './StoreOrderSummary';
import {defaultHeader} from '../NavigationHelpers';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import {GamerAppReduxStore} from 'src/Store';
import {useSelector} from 'react-redux';

type StoreOrderStackParamList = {
  StoreOrderDetails: undefined;
  StoreOrderStatus: undefined;
  StoreOrderSummary: undefined;
  StoreOrderChat: undefined;
};

const Stack = createStackNavigator<StoreOrderStackParamList>();

function StoreOrderNavigation() {
  const navigation = useNavigation();

  const {storeOrders} = useSelector((state: GamerAppReduxStore) => state);

  const {activeStoreOrder} = storeOrders;

  const headerTitle = `Venda #${activeStoreOrder.viewId}`;

  return (
    <Stack.Navigator
      initialRouteName="StoreOrderDetails"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="StoreOrderDetails"
        component={StoreOrderDetails}
        options={defaultHeader(navigation, headerTitle, 'white')}
      />

      <Stack.Screen
        name="StoreOrderSummary"
        component={StoreOrderSummary}
        options={{headerTitle}}
      />

      <Stack.Screen
        name="StoreOrderStatus"
        component={StoreOrderStatus}
        options={{headerTitle}}
      />
    </Stack.Navigator>
  );
}

export default StoreOrderNavigation;
