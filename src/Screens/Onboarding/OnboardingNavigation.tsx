import OnboardingInit from './OnboardingInit';
import OnboardingPlatforms from './OnboardingPlatforms';
import OnboardingTags from './OnboardingTags';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';

type SellProductStackParamList = {
  OnboardingInit: undefined;
  OnboardingPlatforms: undefined;
  OnboardingTags: undefined;
};

const Stack = createStackNavigator<SellProductStackParamList>();

function OnboardingNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="OnboardingInit"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        component={OnboardingInit}
        name="OnboardingInit"
        options={{headerShown: false}}
      />

      <Stack.Screen
        component={OnboardingPlatforms}
        name="OnboardingPlatforms"
        options={{headerShown: false}}
      />

      <Stack.Screen
        component={OnboardingTags}
        name="OnboardingTags"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default OnboardingNavigation;
