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
    cep: string;
}
  

const Passo5CEP = (props: FormikProps<FormValues>) => {

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

        if (gamerPayUserStore.GPUser.cep) {
            setFieldValue('cep', gamerPayUserStore.GPUser.cep);
        }

    }, [setFieldValue, gamerPayUserStore.GPUser.nickName, gamerPayUserStore.GPUser.corCartao, gamerPayUserStore.GPUser.cep]);

    const goToNextScreen = () => {
        console.log(values);
        navigation.navigate('Passo6Endereco');
    }

    function handleChange(fieldName: string, value: string) {
        dispatch(setGPUser({cep: value}));
        props.handleChange(fieldName)(value);
    }

    

    return (
        <SafeAreaView style={styles.mainContainer}>
            
            <ScrollView>
                <View>
                    <CardWithNickName color={values.corCartao} name={values.nickName}></CardWithNickName>
                </View>

                <View>
                    <Text style={styles.mainText}>Para terminar, qual o seu endereço?</Text>
                    <Separator height={20} />
                    <MyTextField
                        centered
                        placeholder="CEP"
                        error={touched ? errors.cep : ''}
                        handleChangeText={text => handleChange('cep', text)}
                        onBlur={handleBlur('cep')}
                        title=""
                        type="cep"
                        value={values.cep}
                    />
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
    }

})


export default withFormik<any, FormValues>({
    mapPropsToValues: () => ({
        nickName: '',
        corCartao: '',
        cep: ''
    }),
    handleSubmit: (values: FormValues, {setSubmitting}) => {
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
        cep: Yup.string().required('Informe seu CEP'),
    }),
  })(Passo5CEP);