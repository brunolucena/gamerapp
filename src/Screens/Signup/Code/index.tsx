import React, {useEffect} from 'react';
import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {InjectedNavigation, InjectedTheme} from '../../../Models/Utils';
import {ReactNativeElementsTheme} from '../../../Themes';
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {validateVerificationCode, saveSignupData} from 'src/Store/Ducks/signup';
import {GamerAppReduxStore} from '../../../Models/Redux';
import ButtonSecondary from '../../../Components/Buttons/ButtonSecondary';

interface FormValues {
  code: string;
}

function Code(
  props: InjectedNavigation & InjectedTheme & FormikProps<FormValues>,
) {
  const {
    errors,
    handleBlur,
    isSubmitting,
    isValid,
    isValidating,
    touched,
    validateForm,
    values,
  } = props;

  const dispatch = useDispatch();
  const signup = useSelector((state: GamerAppReduxStore) => state.signup);
  const codeRef = useRef(null);

  const {error, loading} = signup;

  function handleChange(fieldName: string, value: string) {
    props.handleChange(fieldName)(value);
    dispatch(saveSignupData({verificationCode: value}));
  }

  function nextScreen() {
    validateForm();

    if (isValid && !isSubmitting && !isValidating && !loading) {
      dispatch(
        validateVerificationCode(
          values.code,
          signup.phoneNumber ? signup.phoneNumber : '',
        ),
      );
    }
  }

  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.focus();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>
          Enviamos um SMS com o código de autenticação para o número:{' '}
          {signup.phoneNumber}
        </Text>

        <Input
          containerStyle={styles.inputContainerStyle}
          errorMessage={error ? error : touched ? errors.code : ''}
          errorStyle={styles.inputError}
          inputStyle={styles.input}
          keyboardType="phone-pad"
          maxLength={6}
          onBlur={handleBlur('code')}
          onChangeText={text => handleChange('code', text)}
          onSubmitEditing={() => nextScreen()}
          placeholder="Código"
          ref={codeRef}
          returnKeyType="next"
          value={values.code}
        />
      </View>

      <View style={styles.bottom}>
        <ButtonSecondary
          containerStyle={styles.buttonContainerStyle}
          disabled={isSubmitting || isValidating}
          onPress={() => nextScreen()}
          title="Continuar"
        />
      </View>

      {(isSubmitting || isValidating || loading) && <CustomActivityIndicator />}
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
  mapPropsToValues: () => ({
    code: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    code: Yup.string()
      .min(6, 'Código deve ter 6 dígitos')
      .required('Informe o código enviado para seu celular'),
  }),
})(Code);
