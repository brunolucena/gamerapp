import React, {useEffect} from 'react';
import {useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {MaskService} from 'react-native-masked-text';
import {SafeAreaView} from 'react-navigation';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {InjectedNavigation} from '../../../Models/Utils';
import {ReactNativeElementsTheme} from '../../../Themes';
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {useDispatch, useSelector} from 'react-redux';
import {GamerAppReduxStore} from '../../../Models/Redux';
import {saveSignupData} from 'src/Store/Ducks/signup';
import ButtonSecondary from '../../../Components/Buttons/ButtonSecondary';

interface FormValues {
  cpf: string;
}

function CPF(props: InjectedNavigation & FormikProps<FormValues>) {
  const {
    errors,
    handleBlur,
    isSubmitting,
    isValid,
    isValidating,
    navigation,
    setFieldValue,
    touched,
    validateForm,
    values,
  } = props;
  const dispatch = useDispatch();
  const signup = useSelector((state: GamerAppReduxStore) => state.signup);
  const cpf = useRef(null);

  function handleChange(fieldName: string, value: string) {
    const maskedValue = MaskService.toMask('cpf', value);

    props.handleChange(fieldName)(maskedValue);
    dispatch(saveSignupData({cpf: value}));
  }

  function nextScreen() {
    validateForm();

    if (isValid) {
      navigation.navigate('Email');
    }
  }

  useEffect(() => {
    if (signup.cpf) {
      setFieldValue('cpf', signup.cpf);
    }
  }, [setFieldValue, signup.cpf]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>Qual o seu CPF?</Text>

        <Input
          autoFocus
          containerStyle={styles.inputContainerStyle}
          errorMessage={touched ? errors.cpf : ''}
          errorStyle={styles.inputError}
          inputStyle={styles.input}
          keyboardType="number-pad"
          maxLength={14}
          onBlur={handleBlur('cpf')}
          onChangeText={text => handleChange('cpf', text)}
          onSubmitEditing={() => nextScreen()}
          placeholder="CPF"
          ref={cpf}
          returnKeyType="next"
          value={values.cpf}
        />
      </View>

      <View style={styles.bottom}>
        <ButtonSecondary
          containerStyle={styles.buttonContainerStyle}
          disabled={isSubmitting || isValidating}
          onPress={() => nextScreen()}
          title="Próximo"
        />
      </View>

      {(isSubmitting || isValidating || signup.loading) && (
        <CustomActivityIndicator />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainerStyle: {
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    textAlign: 'center',
  },
  inputContainerStyle: {
    marginTop: 30,
  },
  inputError: {
    color: MyColors.warn,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#4e4e4e',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default withFormik<any, FormValues>({
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    cpf: Yup.string()
      .min(14, 'CPF inválido')
      .max(14, 'CPF inválido')
      .required('Informe seu CPF'),
  }),
})(CPF);
