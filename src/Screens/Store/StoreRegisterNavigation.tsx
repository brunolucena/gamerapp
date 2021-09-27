import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

import MySellerStoreNavigation from '../Seller/MySellerStore';
import PlanGamerStore from './PlanGamerStore';
import PlanProStore from './PlanProStore';
import StorePlans from './StorePlans';
import StoreRegisterAddress from './StoreRegisterAddress';
import StoreRegisterCEP from './StoreRegisterCEP';
import StoreRegisterDocument from './StoreRegisterDocument';
import StoreRegisterName from './StoreRegisterName';
import StoreRegisterSuccess from './StoreRegisterSuccess';
import {defaultHeader} from '../NavigationHelpers';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';

type StoreRegisterStackParamList = {
  PlanGamerStore: undefined;
  PlanProStore: undefined;
  StoreRegisterAddress: undefined;
  StoreRegisterCEP: undefined;
  StoreRegisterDocument: undefined;
  StoreRegisterName: undefined;
  StoreRegisterSuccess: undefined;
  StoreRegisterVerification: undefined;
};

const Stack = createStackNavigator<StoreRegisterStackParamList>();

function StoreRegisterNavigation() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName={'StoreRegisterName'}
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="PlanGamerStore"
        component={PlanGamerStore}
        options={defaultHeader(navigation, '', 'gray')}
      />

      <Stack.Screen
        name="PlanProStore"
        component={PlanProStore}
        options={{
          ...defaultHeader(navigation, '', 'gray'),
          headerStyle: {
            backgroundColor: '#f2f2f2',
            elevation: 0, // for android
            shadowOpacity: 0, // for ios
            borderBottomWidth: 0, // for ios
          },
        }}
      />

      <Stack.Screen
        name="StoreRegisterAddress"
        component={StoreRegisterAddress}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {color: '#333333', fontSize: 15},
          headerStyle: {
            backgroundColor: '#f2f2f2',
            elevation: 0, // for android
            shadowOpacity: 0, // for ios
            borderBottomWidth: 0, // for ios
          },
        }}
      />

      <Stack.Screen
        name="StoreRegisterCEP"
        component={StoreRegisterCEP}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {color: '#333333', fontSize: 15},
          headerStyle: {
            backgroundColor: '#f2f2f2',
            elevation: 0, // for android
            shadowOpacity: 0, // for ios
            borderBottomWidth: 0, // for ios
          },
        }}
      />

      <Stack.Screen
        name="StoreRegisterDocument"
        component={StoreRegisterDocument}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {color: '#333333', fontSize: 15},
          headerStyle: {
            backgroundColor: '#f2f2f2',
            elevation: 0, // for android
            shadowOpacity: 0, // for ios
            borderBottomWidth: 0, // for ios
          },
        }}
      />

      <Stack.Screen
        name="StoreRegisterName"
        component={StoreRegisterName}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {color: '#333333', fontSize: 15},
          headerStyle: {
            backgroundColor: '#f2f2f2',
            elevation: 0, // for android
            shadowOpacity: 0, // for ios
            borderBottomWidth: 0, // for ios
          },
        }}
      />

      <Stack.Screen
        name="StoreRegisterSuccess"
        component={StoreRegisterSuccess}
        options={{
          headerShown: true,
          headerTitle: '',
          headerTitleStyle: {color: '#333333', fontSize: 15},
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0, // for android
            shadowOpacity: 0, // for ios
            borderBottomWidth: 0, // for ios
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default StoreRegisterNavigation;
