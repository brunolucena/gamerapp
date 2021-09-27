import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';

import {createStackNavigator} from '@react-navigation/stack';

import {defaultScreenOptions} from '../../Helpers/NavigatorHelpers';
import {MyColors} from 'src/Theme/FoundationConfig';
import {useNavigation} from '@react-navigation/native';
import {defaultHeader} from '../../NavigationHelpers';


import SalesIntro from './SalesIntro';

import RechargeIntro from './RechargeIntro';
import AddCoinsAndWin from './AddCoinsAndWin';
import FirstBuyCoupon from './FirstBuyCoupon';
import FreeShipCoupon from './FreeShipCoupon';

type CadastroGPStackParamList = {
    SalesIntro: undefined,
    RechargeIntro: undefined,
    AddCoinsAndWin: undefined,
    FirstBuyCoupon: undefined,
    FreeShipCoupon: undefined
};

const Stack = createStackNavigator<CadastroGPStackParamList>();

const SaleCoupons = () => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator
            initialRouteName="SalesIntro"
            screenOptions={{
                ...defaultScreenOptions,
                headerTitle: '',
                headerStyle: {
                ...defaultScreenOptions.headerStyle,
                backgroundColor: '#FCFCFC',
                },
                headerTitleStyle: {
                color: MyColors.primary,
                },
            }}>

            <Stack.Screen
                name="SalesIntro"
                component={SalesIntro}
            />

            <Stack.Screen
                name="RechargeIntro"
                component={RechargeIntro}
            />

            <Stack.Screen
                name="AddCoinsAndWin"
                component={AddCoinsAndWin}
            />

            <Stack.Screen
                name="FirstBuyCoupon"
                component={FirstBuyCoupon}
            />

            <Stack.Screen
                name="FreeShipCoupon"
                component={FreeShipCoupon}
            />

            

        </Stack.Navigator>
    );
};

export default SaleCoupons