import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyColors} from 'src/Theme/FoundationConfig';

import {useNavigation} from '@react-navigation/native';

import MyButton from 'src/Components/Button';

import CardWithNickName from '../../../Components/CardWithNickName';

const Dashboard = () => {

    const navigation = useNavigation();

    const [visibleData, setVisibleData] = useState(false);

    const userData = {
        valor: 341.10,
        user: {
            nickName: 'T-REX',
            nome: '',
            sobrenome: '',
            dataNascimento: '',
            cpf:  '',
            cep: '',
            enderecoRua: '',
            enderecoNumero: '',
            enderecoCidade: '',
            enderecoEstado: '',
            enderecoComplemento: '',
            corCartao: 'black'
        }
    }


    const toggleVisibility = function () {
        setVisibleData(!visibleData)
        console.log(visibleData ? 'Visivel' : 'Oculto');
    }

    // Renderiza o botão de vísivel/oculto
    const renderVisibiltyButton = function () {
        if (visibleData === true) {
            return (
                <TouchableOpacity onPress={() => toggleVisibility()}>
                    <Icon
                        name="visibility-off"
                        color={MyColors.gray}
                        size={25}
                        style={styles.iconVisibility}
                    />
                </TouchableOpacity>
            )
        }
        return (
            <TouchableOpacity onPress={() => toggleVisibility()}>
                <Icon
                    name="visibility"
                    color={MyColors.gray}
                    size={25}
                    style={styles.iconVisibility}
                />
            </TouchableOpacity>
        )
    }

    const renderValue = function () {
        if (visibleData === true) {
            return (
                <View>
                    <Text style={styles.textoSaldo}>R$ {userData.valor.toFixed(2).replace('.', ',')}</Text>
                </View>
            )
        }
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.textoSaldo}>R$ </Text>
                <Icon
                    name="fiber-manual-record"
                    color='#E9E9E9'
                    size={20}
                />
                <Icon
                    name="fiber-manual-record"
                    color='#E9E9E9'
                    size={20}
                />
                <Icon
                    name="fiber-manual-record"
                    color='#E9E9E9'
                    size={20}
                />
                <Icon
                    name="fiber-manual-record"
                    color='#E9E9E9'
                    size={20}
                />
            </View>
        )
    }

    // formatador de valores
    var formatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
    });


    // funcoes que vão para outras telas
    const goToQrCode = () => {
        navigation.navigate('QRCode');

    }

    const goToGamerGold = () => {
        console.log('Gamer Gold');
    }

    const goToPromocoes = () => {
        navigation.navigate('SaleCoupons');
    }
    


    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.mainContainer}>
                    { /** Barra do topo */}
                    <View style={styles.topContainer}>
                        <View style={styles.topLeftContainer}> 
                            <TouchableOpacity onPress={() => goToQrCode()}>
                                <Image style={styles.imageButtonTopBar} source={require('../assets/qr-code.png')}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.topCenterContainer}>
                            <Text style={styles.textoMeuSaldo}>MEU SALDO</Text>
                            <View style={styles.topCenterValueContainer}>
                                {renderVisibiltyButton()}
                                {renderValue()}
                            </View>
                        </View>

                        <View style={styles.topRightContainer}>
                            <TouchableOpacity onPress={() => goToPromocoes()}>
                                <Image style={styles.imageButtonTopBar} source={require('../assets/etiqueta.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => goToGamerGold()}>
                                <Image style={styles.imageButtonTopBar} source={require('../assets/coin.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Cartão */}
                    <View>
                        <CardWithNickName color={userData.user.corCartao} name={userData.user.nickName}></CardWithNickName>
                    </View>

                    {/* Seleção de itens */}
                    <ScrollView horizontal={true} style={styles.botoesContainer}>
                        <TouchableOpacity style={styles.buttonFunction}>
                            <View>
                                <Image style={styles.imageButton} source={require('../assets/carregar.png')}></Image>
                                <Text style={styles.textButton}>Carregar</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonFunction}>
                            <View>
                                <Image style={styles.imageButton} source={require('../assets/enviar.png')}></Image>
                                <Text style={styles.textButton}>Enviar</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonFunction}>
                            <View>
                                <Image style={styles.imageButton} source={require('../assets/extrato.png')}></Image>
                                <Text style={styles.textButton}>Extrato</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonFunction}>
                            <View>
                                <Image style={styles.imageButton} source={require('../assets/indicar.png')}></Image>
                                <Text style={styles.textButton}>Indicar</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonFunction}>
                            <View>
                                <Image style={styles.imageButton} source={require('../assets/indicar.png')}></Image>
                                <Text style={styles.textButton}>Indicar</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>


                    {/* GamerGold */}
                    <TouchableOpacity style={styles.gamerGoldContainer} onPress={() => goToGamerGold()}>
                        <Image style={styles.gamerGoldIcon} source={require('../assets/coin.png')}></Image>
                        <View style={styles.gamerGoldTextContainer}>
                            <Text style={styles.gamerGoldTitle}>GamerGold</Text>
                            <Text style={styles.gamerGoldDescription}>Acumule gold nas suas compras, missões e atividades podendo trocar por dinheiro de verdade!</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Cupons e Promoções */}
                    <TouchableOpacity style={styles.cuponsContainer} onPress={() => goToPromocoes()}>
                        <Image style={styles.cuponsIcon} source={require('../assets/etiqueta.png')}></Image>
                        <View style={styles.cuponsTextContainer}>
                            <Text style={styles.cuponsTitle}>Cupons & Promoções</Text>
                            <Text style={styles.cuponsDescription}>Receba cupons exclusivos para utilizar no app e nas lojas credenciadas além de promoções imperdíveis!</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Imagem de final */}
                <View style={styles.endImageContainer}>
                    <Image style={styles.endImage} source={require('../assets/saga.jpg')}></Image>
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
        backgroundColor: '#F4F4F4'
    },

    topContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 100
    },

    topLeftContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    topCenterContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 2
    },

    topCenterValueContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    topRightContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    
    imageButtonTopBar: {
        height: 35,
        resizeMode: 'contain'
    },

    textoMeuSaldo: {
        fontSize: 10,
        fontFamily: 'Montserrat',
        color: '#272727'
    },

    textoSaldo: {
        fontSize: 25,
        fontFamily: 'Montserrat',
        color: '#272727'
    },
    
    iconVisibility: {
        marginRight: 5
    },

    /** Fileira de botões */
    botoesContainer: {
        flexDirection: 'row'
    },

    buttonFunction: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 5,
        marginRight: 10,
        width: 90
    }, 

    imageButton: {
        marginBottom: 10
    },

    textButton: {
        color: '#272727',
        fontFamily: 'Montserrat',
        fontSize: 14,
        marginBottom: 5
    },

    /* GamerGold Container */
    gamerGoldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 5,
        backgroundColor: '#FFFCEC',
        marginTop: 10,
        marginBottom: 10
    },

    gamerGoldIcon: {
        marginLeft: 5,
        marginRight: 20,
        height: 50,
        resizeMode: 'contain'
    },

    gamerGoldTextContainer: {
        width: '80%'
    },

    gamerGoldTitle: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'Montserrat',
        color: '#272727'
    },

    gamerGoldDescription: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'Montserrat',
        color: '#676767'
    },

    /* Cupons Container */
    cuponsContainer: {
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

    cuponsIcon: {
        marginLeft: 3,
        marginRight: 5,
        height: 50,
        resizeMode: 'contain'
    },

    cuponsTextContainer: {
        width: '80%'
    },

    cuponsTitle: {
        fontSize: 18,
        marginBottom: 5,
        fontFamily: 'Montserrat',
        color: '#272727'
    },

    cuponsDescription: {
        fontSize: 12,
        marginBottom: 5,
        fontFamily: 'Montserrat',
        color: '#676767'
    },

    /* Imagem do final */

    endImageContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end' /** Ver o que aconteceu com a imagem */
    },

    endImage: {
        width: '100%',
        resizeMode: 'contain',
        margin: 0,
        padding: 0
    }


})

export default Dashboard