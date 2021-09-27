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
    nome: string;
    sobrenome: string;
}
  

const Passo3Nome = (props: FormikProps<FormValues>) => {

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
            navigation.navigate('Passo4CPF');
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
                <View>
                    <CardWithNickName color={values.corCartao} name={values.nickName}></CardWithNickName>
                </View>

                <View>
                    <Text style={styles.mainText}>Qual o seu nome?</Text>
                    <Separator height={20} />
                    <View style={styles.fieldsContainer}>
                        <MyTextField
                            centered
                            placeholder="Nome"
                            error={touched ? errors.nome : ''}
                            handleChangeText={text => handleChange('nome', text)}
                            onBlur={handleBlur('nome')}
                            title=""
                            type="text"
                            value={values.nome}
                            style={styles.textField}
                        />
                        <MyTextField
                            centered
                            placeholder="Sobrenome"
                            error={touched ? errors.sobrenome : ''}
                            handleChangeText={text => handleChange('sobrenome', text)}
                            onBlur={handleBlur('sobrenome')}
                            title=""
                            type="text"
                            value={values.sobrenome}
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
        
    }

})


export default withFormik<any, FormValues>({
    mapPropsToValues: () => ({
        nickName: '',
        corCartao: '',
        nome: '',
        sobrenome: ''
    }),
    handleSubmit: (values: FormValues, {setSubmitting}) => {
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
        nome: Yup.string().required('Informe seu nome'),
        sobrenome: Yup.string().required('Informe seu sobrenome'),
    }),
  })(Passo3Nome);