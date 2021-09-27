import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import MySellerStoreNavigation from '../Seller/MySellerStore';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type StoreStackParamList = {
  MySellerStore: undefined;
};

const Stack = createStackNavigator<StoreStackParamList>();

function StoreNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="MySellerStore"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="MySellerStore"
        component={MySellerStoreNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default StoreNavigation;
