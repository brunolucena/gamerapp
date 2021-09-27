import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {changePassword} from 'src/Store/Ducks/user';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {Divider} from './ChangePasswordStyles';
import {GamerAppReduxStore} from 'src/Store';
import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';
import MyTextField from 'src/Components/TextField';

interface FormValues {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

function ChangePassword(props: FormikProps<FormValues>) {
  const {
    errors,
    handleBlur,
    isSubmitting,
    isValid,
    isValidating,
    setFieldError,
    touched,
    validateForm,
    values,
    setFieldTouched,
  } = props;
  const dispatch = useDispatch();
  const userRedux = useSelector((state: GamerAppReduxStore) => state.user);

  const {loading, user} = userRedux;
  const {gamerId} = user;

  function handleChange(fieldName: string, value: string) {
    props.handleChange(fieldName)(value);
  }

  function submit() {
    validateForm();

    if (isValid && !isSubmitting && !isValidating && !loading) {
      const {confirmPassword, currentPassword, password} = values;

      if (password !== confirmPassword) {
        setFieldTouched('confirmPassword', true);

        setTimeout(() => {
          setFieldError('confirmPassword', 'Senhas não conferem');
          setFieldError('password', 'Senhas não conferem');
        }, 100);

        return;
      }

      if (password.length < 6) {
        return;
      }

      dispatch(
        changePassword({
          gamerId,
          oldPassword: currentPassword,
          newPassword: password,
        }),
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.inputWrapper}>
          <MyTextField
            blurOnSubmit
            error={touched ? errors.currentPassword : ''}
            handleChangeText={text => handleChange('currentPassword', text)}
            onBlur={handleBlur('password')}
            placeholder="Senha atual"
            secureTextEntry
            type="password"
            value={values.currentPassword}
          />

          <Divider />

          <MyTextField
            blurOnSubmit
            error={touched ? errors.password : ''}
            handleChangeText={text => handleChange('password', text)}
            onBlur={handleBlur('password')}
            placeholder="Nova senha"
            secureTextEntry
            type="password"
            value={values.password}
          />

          <Divider />

          <MyTextField
            blurOnSubmit
            error={touched ? errors.confirmPassword : ''}
            handleChangeText={text => handleChange('confirmPassword', text)}
            onBlur={handleBlur('password')}
            placeholder="Confirmar nova senha"
            secureTextEntry
            type="password"
            value={values.confirmPassword}
          />
        </View>

        <View style={styles.bottom}>
          <MyButton
            disabled={isSubmitting || isValidating}
            onPress={submit}
            label="Salvar"
            type="secondary"
          />
        </View>
      </View>

      <CustomActivityIndicator
        isVisible={isSubmitting || isValidating || loading}
      />
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
  images: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    paddingRight: 5,
    paddingLeft: 5,
    width: '100%',
  },
  heart: {
    marginRight: 5,
  },
  hearts: {
    flexDirection: 'row',
  },
  input: {
    textAlign: 'center',
  },
  inputContainer: {
    borderBottomWidth: 0,
    width: 275,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  inputError: {
    color: MyColors.warn,
    textAlign: 'center',
  },
  inputWrapper: {
    marginTop: 30,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#4e4e4e',
  },
  top: {
    flex: 1,
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default withFormik<any, FormValues>({
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema: Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Digite sua senha atual'),
    password: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Crie uma nova senha'),
    confirmPassword: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .required('Confirme sua nova senha'),
  }),
})(ChangePassword);
