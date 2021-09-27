import React, {useEffect} from 'react';
import {StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyColors} from 'src/Theme/FoundationConfig';

import MyButton from 'src/Components/Button';

import {useNavigation} from '@react-navigation/native';

const RechargeIntro = () => {

    const navigation = useNavigation();


    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>

                <View style={styles.titleContainer}>
                    <Image style={styles.promoIcon} source={require('../../assets/recarga-color.png')}></Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Recarga de celular</Text>
                        <Text style={styles.subtitle}>10% de Cashback + 2% de Gold</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.description}>Faça sua primeira recarga de celular com a sua GamerPay e ganhe 10% de volta além de 2% de Gold.</Text>
                </View>

                <MyButton
                    label="Fazer recarga"
                    type="primary"
                    onPress={() =>{}}
                    style={styles.button}
                />

            </View>
            <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>A promoção somente é válida para pagamentos feitos com GamerPay. As operadoras de celular aceitas são: Vivo, Claro, Oi, Tim e Nextel com valores pré determinados. O valor de Gold é utilizado dentro da GamerPay, conforme regras de utilização.</Text>
            </View>
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FCFCFC',
        flexGrow: 1,
        marginBottom: 'auto'
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 20
    },

    promoIcon: {
        marginLeft: 3,
        marginRight: 10,
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },

    textContainer: {
        width: '80%'
    },

    title: {
        fontSize: 24,
        marginBottom: 5,
        fontFamily: 'Montserrat',
        color: '#272727'
    },

    subtitle: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'Montserrat',
        color: '#0DAC3D'
    },

    description: {
        fontSize: 14,
        marginBottom: 20,
        fontFamily: 'Montserrat',
        color: '#959595'
    },

    button: {
        marginBottom: 100
    },

    infoTextContainer: {
        padding: 20,
    },

    infoText: {
        color: '#959595',
        fontFamily: 'Montserrat',
        fontSize: 12,
        lineHeight: 18
    }

})

export default RechargeIntro