import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {MyColors} from 'src/Theme/FoundationConfig';

import Modal from 'react-native-modal'

import MyButton from 'src/Components/Button';

import {useNavigation} from '@react-navigation/native';

//import Clipboard from '@react-native-community/clipboard';

const QRCode = () => {

    const [visible, setVisible] = useState(false);

    const navigation = useNavigation();


    const goBack = () => {
        navigation.goBack()
    }

    const showModal = () => setVisible(true)

    const hideModal = () => setVisible(false)


    return (
        <SafeAreaView style={styles.mainContainer}>

            <View style={styles.topBar}>
                <Icon
                    name="keyboard-backspace"
                    color={MyColors.primary}
                    size={40}
                    onPress={() => goBack()}
                />
                <Image style={styles.topLogo} source={require('src/Assets/images/logo/GamerPay/Logo-GamerPay-branco_big.png')}></Image>
            </View>

            <View style={styles.message}>
                <Text style={styles.messageText}>Escaneie o QRCode</Text>
            </View>

            {/* Aqui deve ser colocado o componente de câmera */}
            <View>

            </View>



            <TouchableOpacity 
            onPress={showModal}
            style={{position: 'absolute', bottom: 0, alignSelf: 'center', justifyContent: 'center', marginTop: 50, width: '100%', borderTopLeftRadius: 5, borderTopRightRadius: 5, backgroundColor: '#FFFFFF'}}
            >
                <View style={{alignSelf: 'center', marginTop: 20, marginBottom: 20, paddingLeft: 50, paddingRight: 50, borderRadius: 5, backgroundColor: '#D8D8D8'}}>
                    <Text style={{fontSize: 8}}>&nbsp;</Text>
                </View>
            </TouchableOpacity>
            <Modal
            style={styles.modal}
            isVisible={visible}
            onBackdropPress={hideModal}
            >
                <ScrollView style={styles.modalScrollView}>
                    <View style={styles.modalView}>
                        <Text style={styles.userName}>@rafaelcifu</Text>

                        <Image style={styles.qrCodeModal} source={require('../assets/qr-code-example.png')}></Image>

                        <Text style={styles.descriptionText}>Esse é o seu código! Você pode receber pagamento por ele.</Text>
                    </View>
                    <MyButton
                        label="Compartilhar Código"
                        type="primary"
                        onPress={() => {}}
                    />
                </ScrollView>
            </Modal>
            
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#000000',
        flexGrow: 1,
    },

    topBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        padding: 10
    },

    topLogo: {
        height: 25,
        resizeMode: 'contain'
    },


    message: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 200,
    },

    messageText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontFamily: 'Montserrat'
    },

    modal: {
        margin: 0, 
        backgroundColor: 'white', 
        height: '80%', 
        flex:0 , 
        bottom: 0, 
        position: 'absolute',
        width: '100%',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderRadius: 5
    },

    modalScrollView: {
        backgroundColor: '#FFFFFF',
        padding: 20
    },

    modalView: {
        alignItems: 'center',
        width: '100%'
    },

    userName: {
        color: '#0DAC3D',
        fontSize: 24,
        fontFamily: 'Montserrat',
        textAlign: 'center'
    },

    descriptionText: {
        color: '#959595',
        fontSize: 18,
        fontFamily: 'Montserrat',
        textAlign: 'center',
        marginBottom: 50
    },

    qrCodeModal: {
        height: 200,
        resizeMode: 'contain',
        marginTop: 20,
        marginBottom: 20
    }

})

export default QRCode