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
    cpf: string;
}
  

const Passo4CPF = (props: FormikProps<FormValues>) => {

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

        if (gamerPayUserStore.GPUser.cpf) {
            setFieldValue('cpf', gamerPayUserStore.GPUser.cpf);
        }

    }, [setFieldValue, gamerPayUserStore.GPUser.nickName, gamerPayUserStore.GPUser.corCartao, gamerPayUserStore.GPUser.cpf]);

    const goToNextScreen = () => {
        validateForm();

        if (isValid) {
            navigation.navigate('Passo5CEP');
        }
    }

    function handleChange(fieldName: string, value: string) {
        dispatch(setGPUser({cpf: value}));
        props.handleChange(fieldName)(value);
    }

    

    return (
        <SafeAreaView style={styles.mainContainer}>
            
            <ScrollView>
                <View>
                    <CardWithNickName color={values.corCartao} name={values.nickName}></CardWithNickName>
                </View>

                <View>
                    <Text style={styles.mainText}>Qual o seu CPF?</Text>
                    <Separator height={20} />
                    <MyTextField
                        centered
                        placeholder="CPF"
                        error={touched ? errors.cpf : ''}
                        handleChangeText={text => handleChange('cpf', text)}
                        onBlur={handleBlur('cpf')}
                        title=""
                        type="cpf"
                        value={values.cpf}
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
        cpf: ''
    }),
    handleSubmit: (values: FormValues, {setSubmitting}) => {
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
        cpf: Yup.string().required('Informe seu CPF'),
    }),
  })(Passo4CPF);