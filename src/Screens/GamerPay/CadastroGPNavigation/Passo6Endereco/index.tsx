import React, {useEffect} from 'react';
import {StyleSheet, Image, Text, View, SafeAreaView, ScrollView} from 'react-native';

import MyTextField from 'src/Components/TextField';
import Separator from 'src/Components/Separator';
import MyButton from 'src/Components/Button';


import {useNavigation} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import { setGPUser } from 'src/Store/Ducks/gamerPayUser';

import CustomActivityIndicator from '../../../../Components/CustomActivityIndicator';


import CardWithNickName from '../../../../Components/CardWithNickName'

interface FormValues {
    nickName: string;
    corCartao: string;
    enderecoNumero: string;
    enderecoComplemento: string;
}
  

const Passo6Endereco = (props: FormikProps<FormValues>) => {

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

    useEffect(() => {
        
        if (gamerPayUserStore.GPUser.nickName) {
          setFieldValue('nickName', gamerPayUserStore.GPUser.nickName);
        }

        if (gamerPayUserStore.GPUser.corCartao) {
            setFieldValue('corCartao', gamerPayUserStore.GPUser.corCartao);
        }

        if (gamerPayUserStore.GPUser.nome) {
            setFieldValue('nome', gamerPayUserStore.GPUser.nome);
        }

        if (gamerPayUserStore.GPUser.sobrenome) {
            setFieldValue('sobrenome', gamerPayUserStore.GPUser.sobrenome);
        }

        console.log(gamerPayUserStore, gamerPayUserStore.GPUser.corCartao, values);

    }, [setFieldValue, gamerPayUserStore.GPUser.nickName, gamerPayUserStore.GPUser.corCartao, gamerPayUserStore.GPUser.nome, gamerPayUserStore.GPUser.sobrenome]);

    const goToNextScreen = () => {
        validateForm();

        if (isValid) {
            navigation.navigate('Passo7Final');
        }
    }

    function handleChange(fieldName: string, value: string) {
        let obj = {}
        obj[fieldName] = value
        dispatch(setGPUser(obj));
        props.handleChange(fieldName)(value);
    }

    

    return (
        <SafeAreaView style={styles.mainContainer}>
            
            <ScrollView>
                <View style={styles.infoBox}>
                    <Text style={styles.textInfo1}>O seu endereço é</Text>
                    <Text style={styles.textInfo2}>Rua Hermantino Coelho, Campinas - SP</Text>
                </View>

                <View>
                    <Separator height={20} />
                    <View style={styles.fieldsContainer}>
                        <MyTextField
                            centered
                            placeholder="Número"
                            error={touched ? errors.enderecoNumero : ''}
                            handleChangeText={text => handleChange('enderecoNumero', text)}
                            onBlur={handleBlur('enderecoNumero')}
                            title=""
                            type="text"
                            value={values.enderecoNumero}
                            style={styles.textField}
                        />
                        <MyTextField
                            centered
                            placeholder="Complemento"
                            error={touched ? errors.enderecoComplemento : ''}
                            handleChangeText={text => handleChange('enderecoComplemento', text)}
                            onBlur={handleBlur('enderecoComplemento')}
                            title=""
                            type="text"
                            value={values.enderecoComplemento}
                            style={styles.textField}
                        />
                    </View>
                    <MyButton
                        label="Próximo"
                        type="primary"
                        disabled={isSubmitting || isValidating}
                        onPress={() => goToNextScreen()}
                    />
                </View>
            </ScrollView>

            {(isSubmitting || isValidating) && <CustomActivityIndicator />}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,
        paddingTop: 30
    },

    mainText: {
        fontSize: 20,
        fontFamily: 'Montserrat-Semibold',
        color: '#2B2B2B',
        textAlign: 'center'
    },

    restContainer: {
        textAlign: 'center'
    },

    fieldsContainer: {
        //flexDirection: 'row-reverse'
    },

    textField: {
        
    },

    infoBox: {
        marginBottom: 20
    },

    textInfo1: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Semibold',
        color: '#2B2B2B',
        fontSize: 20,
    },

    textInfo2: {
        textAlign: 'center',
        fontFamily: 'Montserrat-Semibold',
        color: '#1C60D6',
        fontSize: 20,
    }

})


export default withFormik<any, FormValues>({
    mapPropsToValues: () => ({
        nickName: '',
        corCartao: '',
        enderecoNumero: '',
        enderecoComplemento: ''
    }),
    handleSubmit: (values: FormValues, {setSubmitting}) => {
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
        enderecoNumero: Yup.string().required('Informe o número'),
        enderecoComplemento: Yup.string().required('Informe o complemento de endereço'),
    }),
  })(Passo6Endereco);