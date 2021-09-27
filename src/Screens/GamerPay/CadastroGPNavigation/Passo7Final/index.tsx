import React from 'react';
import {StyleSheet, Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import { setGPUser } from 'src/Store/Ducks/gamerPayUser';

import MyButton from 'src/Components/Button';

interface FormValues {
    cor_cartao: string;
}


const Passo7Final = (props: FormikProps<FormValues>) => {

    const {
        errors,
        handleBlur,
        isSubmitting,
        isValid,
        isValidating,
        setFieldValue,
        touched,
        validateForm,
        values,
    } = props;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const gamerPayUserStore = useSelector((state: GamerAppReduxStore) => state.gamerPayUser);

    const goToNextScreen = (color: String) => {
        console.log(color);
        navigation.navigate('Dashboard');
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            

            <View style={styles.infoContainer}>
                <Image style={styles.image} source={require('./assets/checked.png')} />
                <Text style={styles.title}>Sucesso!</Text>
                <Text style={styles.infoText}>A sua GamerPay foi criada com sucesso! =)</Text>
            </View>

            <View style={styles.button}>
                <MyButton
                    label="Ver minha conta"
                    type="primary"
                    disabled={isSubmitting || isValidating}
                    onPress={() => {}}
                />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        paddingTop: 30
    },

    infoContainer: {
        alignItems: 'center'
    },

    image: {
        width: 200,
        resizeMode: 'contain',
        textAlign: 'center',
        marginTop: 50
    },

    title: {
        fontSize: 40,
        color: '#0DAC3D',
        fontFamily: 'Montserrat-Semibold',
        textAlign: 'center',
        marginBottom: 20
    },

    infoText: {
        fontSize: 20,
        color: '#7E7E7E',
        fontFamily: 'Montserrat-Semibold',
        textAlign: 'center',
        marginBottom: 20
    },
    
    button: {
        marginTop: "auto"
    }
})

export default Passo7Final