import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';

import {createStackNavigator} from '@react-navigation/stack';

import {defaultScreenOptions} from '../../Helpers/NavigatorHelpers';
import {MyColors} from 'src/Theme/FoundationConfig';
import {useNavigation} from '@react-navigation/native';
import {defaultHeader} from '../../NavigationHelpers';


import Passo1Cartao from './Passo1Cartao';
import Passo2NickName from './Passo2NickName';
import Passo3Nome from './Passo3Nome';
import Passo4CPF from './Passo4CPF';
import Passo5CEP from './Passo5CEP';
import Passo6Endereco from './Passo6Endereco';
import Passo7Final from './Passo7Final';

type CadastroGPStackParamList = {
    Passo1Cartao: undefined;
    Passo2NickName: undefined;
    Passo3Nome: undefined;
    Passo4CPF: undefined;
    Passo5CEP: undefined;
    Passo6Endereco: undefined;
    Passo7Final: undefined;
};

const Stack = createStackNavigator<CadastroGPStackParamList>();

const CadastroGPNavigation = () => {

    const navigation = useNavigation();

    return (
        <Stack.Navigator
            initialRouteName="Passo1Cartao"
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
                name="Passo1Cartao"
                component={Passo1Cartao}
                options={defaultHeader(navigation, 'Criar conta GamerPay')}
            />

            <Stack.Screen
                name="Passo2NickName"
                component={Passo2NickName}
            />

            <Stack.Screen
                name="Passo3Nome"
                component={Passo3Nome}
            />

            <Stack.Screen
                name="Passo4CPF"
                component={Passo4CPF}
            />

            <Stack.Screen
                name="Passo5CEP"
                component={Passo5CEP}
            />

            <Stack.Screen
                name="Passo6Endereco"
                component={Passo6Endereco}
            />

            <Stack.Screen
                name="Passo7Final"
                component={Passo7Final}
            />

        </Stack.Navigator>
    );
};

export default CadastroGPNavigation