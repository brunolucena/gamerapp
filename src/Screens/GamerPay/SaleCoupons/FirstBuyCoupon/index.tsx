import React, {useEffect} from 'react';
import {StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyColors} from 'src/Theme/FoundationConfig';

import MyButton from 'src/Components/Button';

import {useNavigation} from '@react-navigation/native';

//import Clipboard from '@react-native-community/clipboard';

const FirstBuyCoupon = () => {

    const navigation = useNavigation();

    const couponCode = "RCIFU1ACOMPRA";

    const copyToClipboard = () => {
        //Clipboard.setString(couponCode);
        console.log(couponCode);
    };


    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>

                <View style={styles.titleContainer}>
                    <Image style={styles.promoIcon} source={require('../../assets/ticket.png')}></Image>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Primeira compra</Text>
                        <Text style={styles.subtitle}>10% desconto + 2% Gold</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.description}>Faça sua primeira compra com 10% de desconto e 2% de Gold para usar na GamerPay.</Text>
                </View>

                <View style={styles.copyButtonContainer}>
                    <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard}>
                        <Icon
                            name="content-copy"
                            color={MyColors.gray}
                            size={25}
                        />
                        <Text style={styles.couponText}>{couponCode}</Text>
                    </TouchableOpacity>
                    <Text style={styles.couponDescription}>Copie o código e use no checkout.</Text>
                </View>

            </View>
            <View style={styles.infoTextContainer}>
                <Text style={styles.infoText}>Limitado ao valor de R$150,00. O valor de Gold é utilizado dentro da GamerPay, conforme regras de utilização. Não cumulativo, não contempla o valor de frete e apenas válido para a primeira compra do usuário. Válido para os primeiros 15 dias de utilização do app.</Text>
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

    copyButtonContainer: {
        alignItems: 'center',
        marginBottom: 100,
    },

    copyButton: {
        borderRadius: 5,
        borderColor: '#B4B4B4',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10
    },

    infoTextContainer: {
        padding: 20,
    },

    couponText: {
        color: '#0DAC3D',
        fontSize: 22,
        fontFamily: 'Montserrat',
        marginLeft: 10
    },

    couponDescription: {
        fontSize: 14,
        fontFamily: 'Montserrat',
        color: '#959595'
    },

    infoText: {
        color: '#959595',
        fontFamily: 'Montserrat',
        fontSize: 12,
        lineHeight: 18
    }

})

export default FirstBuyCoupon