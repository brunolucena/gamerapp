import React, {useEffect} from 'react';
import {StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyColors} from 'src/Theme/FoundationConfig';

import MyButton from 'src/Components/Button';

import {useNavigation} from '@react-navigation/native';

const AddCoinsAndWin = () => {

    const navigation = useNavigation();


    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>

                <View style={styles.titleContainer}>
                    <Image style={styles.promoIcon} source={require('../../assets/coin.png')}></Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Adicione e ganhe</Text>
                        <Text style={styles.subtitle}>5% de Gold</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.description}>Adicione dinheiro pela primeira vez na sua GamerPay e ganhe 5% de Gold para utilizar na carteira.</Text>
                </View>

                <MyButton
                    label="Adicionar Dinheiro"
                    type="primary"
                    onPress={() =>{}}
                    style={styles.button}
                />

            </View>
            <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Limitado proporcionalmente ao valor de R$50,00. O valor de Gold é utilizado dentro da GamerPay, conforme regras de utilização.</Text>
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

export default AddCoinsAndWin