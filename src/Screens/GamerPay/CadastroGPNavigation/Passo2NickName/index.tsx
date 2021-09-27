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
}
  

const Passo2NickName = (props: FormikProps<FormValues>) => {

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

        console.log(gamerPayUserStore, gamerPayUserStore.GPUser.corCartao, values);

    }, [setFieldValue, gamerPayUserStore.GPUser.nickName, gamerPayUserStore.GPUser.corCartao]);

    const goToNextScreen = () => {
        validateForm();

        if (isValid) {
            navigation.navigate('Passo3Nome');
        }
    }

    function handleChange(fieldName: string, value: string) {
        dispatch(setGPUser({nickName: value}));
        props.handleChange(fieldName)(value);      
    }

    

    return (
        <SafeAreaView style={styles.mainContainer}>
            
            <ScrollView>
                <View>
                    <CardWithNickName color={values.corCartao} name={values.nickName}></CardWithNickName>
                </View>

                <View>
                    <Text style={styles.mainText}>Agora, o nickname no cartão</Text>
                    <Separator height={20} />
                    <MyTextField
                        centered
                        placeholder="Seu Nickname"
                        error={touched ? errors.nickName : ''}
                        handleChangeText={text => handleChange('nickName', text)}
                        onBlur={handleBlur('nickName')}
                        title=""
                        type="text"
                        value={values.nickName}
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
        corCartao: ''
    }),
    handleSubmit: (values: FormValues, {setSubmitting}) => {
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
        nickName: Yup.string().required('Informe seu Nickname'),
    }),
  })(Passo2NickName);