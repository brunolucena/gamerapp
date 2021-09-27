import React, {useEffect} from 'react';
import {StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyColors} from 'src/Theme/FoundationConfig';

import {useNavigation} from '@react-navigation/native';

const SalesIntro = () => {

    const navigation = useNavigation();


    // transição de telas
    const goToRecharge = () => {
        navigation.navigate('RechargeIntro')
    }

    const goToAddCoinsAndWin = () => {
        navigation.navigate('AddCoinsAndWin')
    }

    const goToFirstBuyCoupon = () => {
        navigation.navigate('FirstBuyCoupon')
    }

    const goToFreeShipCoupon = () => {
        navigation.navigate('FreeShipCoupon')
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.mainContainer}>
                <View>
                    <View>
                        <Text style={styles.title}>Promoções e Cupons</Text>
                        <Text style={styles.subtitle}>Ganhe cupons exclusivos para usar no GamerApp e cashback + gold ao utilizar a sua GamerPay.</Text>
                    </View>

                    <View>
                        <Text style={styles.sectionTitle}>CASHBACK + GOLD</Text>

                        <TouchableOpacity style={styles.promoContainer} onPress={() => {goToRecharge()}}>
                            <Image style={styles.promoIcon} source={require('../../assets/recarga-color.png')}></Image>
                            <View style={styles.promoTextContainer}>
                                <Text style={styles.promoTitle}>Recarga de celular</Text>
                                <Text style={styles.promoDescription}>Ganhe <Text style={styles.promoDescriptionSpan}>10% de Cashback + 2% de Gold</Text> na primeira recarga.</Text>
                            </View>
                            <Icon
                                name="keyboard-arrow-right"
                                color={MyColors.primary}
                                size={25}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.promoContainer} onPress={() => {goToAddCoinsAndWin()}}>
                            <Image style={styles.promoIcon} source={require('../../assets/coin.png')}></Image>
                            <View style={styles.promoTextContainer}>
                                <Text style={styles.promoTitle}>Adicione e ganhe</Text>
                                <Text style={styles.promoDescription}>Ganhe <Text style={styles.promoDescriptionSpan}>5% de Gold</Text> ao adicionar dinheiro na gamerpay pela primeira vez.</Text>
                            </View>
                            <Icon
                                name="keyboard-arrow-right"
                                color={MyColors.primary}
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.sectionTitle}>CUPONS</Text>

                        <TouchableOpacity style={styles.promoContainer} onPress={() => goToFirstBuyCoupon()}>
                            <Image style={styles.promoIcon2} source={require('../../assets/ticket.png')}></Image>
                            <View style={styles.promoTextContainer}>
                                <Text style={styles.promoTitle}>Primeira Compra</Text>
                                <Text style={styles.promoDescription}>Ganhe <Text style={styles.promoDescriptionSpan}>10% de Cashback + 2% de Gold</Text> na primeira compra.</Text>
                            </View>
                            <Icon
                                name="keyboard-arrow-right"
                                color={MyColors.primary}
                                size={25}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.promoContainer} onPress={() => goToFreeShipCoupon()}>
                            <Image style={styles.promoIcon2} source={require('../../assets/ticket.png')}></Image>
                            <View style={styles.promoTextContainer}>
                                <Text style={styles.promoTitle}>Frete Grátis</Text>
                                <Text style={styles.promoDescription}>Ganhe <Text style={styles.promoDescriptionSpan}>frete grátis</Text> para comprar 1 jogo.</Text>
                            </View>
                            <Icon
                                name="keyboard-arrow-right"
                                color={MyColors.primary}
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#FCFCFC'
    },

    title: {
        fontSize: 25,
        fontFamily: 'Montserrat-Semibold',
        color: '#2B2B2B',
        marginBottom: 10
    },

    subtitle: {
        fontSize: 16, 
        fontFamily: 'Montserrat', 
        color: '#959595'
    },

    sectionTitle: {
        marginTop: 20,
        marginBottom: 10,
        color: '#0DAC3D',
        fontFamily: 'Montserrat-Semibold',
        fontSize: 18
    },

    /* Cupons Container */
    promoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
        marginTop: 0,
        marginBottom: 10
    },

    promoIcon: {
        marginLeft: 3,
        marginRight: 10,
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },

    promoIcon2: {
        marginLeft: 3,
        marginRight: 10,
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },

    promoTextContainer: {
        width: '76%'
    },

    promoTitle: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'Montserrat',
        color: '#272727'
    },

    promoDescription: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'Montserrat',
        color: '#676767'
    },

    promoDescriptionSpan: {
        color: '#0DAC3D'
    }


})

export default SalesIntro