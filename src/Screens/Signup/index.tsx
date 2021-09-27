import React from 'react';
import {useRef} from 'react';
import {ActivityIndicator, StyleSheet, View, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {NavigationScreenOptions} from 'react-navigation';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {InjectedNavigation, InjectedTheme} from '../../Models/Utils';
import {ReactNativeElementsTheme} from '../../Themes';

interface FormValues {
  cpf: string;
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
}

function Signup(
  props: InjectedNavigation & InjectedTheme & FormikProps<FormValues>,
) {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValidating,
    touched,
    values,
  } = props;

  const phoneRef = useRef(null);
  const cpfRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <View style={styles.container}>
      <View>
        <Input
          autoCompleteType="name"
          autoFocus
          containerStyle={styles.inputContainerStyle}
          errorMessage={errors.fullName ? errors.fullName : ''}
          errorStyle={styles.inputError}
          onBlur={handleBlur('fullName')}
          onChangeText={handleChange('fullName')}
          onSubmitEditing={() => phoneRef.current.focus()}
          placeholder="Digite seu nome completo"
          returnKeyType="next"
          textContentType="name"
          value={values.fullName}
        />

        <Input
          autoCompleteType="tel"
          containerStyle={styles.inputContainerStyle}
          errorMessage={
            touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''
          }
          errorStyle={styles.inputError}
          keyboardType="phone-pad"
          onBlur={handleBlur('phoneNumber')}
          onChangeText={handleChange('phoneNumber')}
          onSubmitEditing={() => cpfRef.current.focus()}
          placeholder="Digite seu celular"
          ref={phoneRef}
          returnKeyType="next"
          textContentType="telephoneNumber"
          value={values.phoneNumber}
        />

        {/* TODO: confirmacao de codigo enviado ao celular */}
        {/* <Input
          containerStyle={styles.inputContainerStyle}
          errorMessage={
            touched.code && errors.code ? errors.code : ''
          }
          errorStyle={styles.inputError}
          keyboardType="number-pad"
          onChangeText={text => setFieldValue('code', text)}
          placeholder="Digite o c'odigo"
          returnKeyType="next"
          textContentType="oneTimeCode"
          value={values.code}
        /> */}

        <Input
          containerStyle={styles.inputContainerStyle}
          errorMessage={touched.cpf && errors.cpf ? errors.cpf : ''}
          errorStyle={styles.inputError}
          onBlur={handleBlur('cpf')}
          onChangeText={handleChange('cpf')}
          onSubmitEditing={() => emailRef.current.focus()}
          placeholder="Digite seu CPF"
          ref={cpfRef}
          returnKeyType="next"
          value={values.cpf}
        />

        <Input
          autoCompleteType="email"
          containerStyle={styles.inputContainerStyle}
          errorMessage={touched.email && errors.email ? errors.email : ''}
          errorStyle={styles.inputError}
          keyboardType="email-address"
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Digite seu email"
          ref={emailRef}
          returnKeyType="next"
          textContentType="emailAddress"
          value={values.email}
        />

        <Input
          autoCompleteType="password"
          blurOnSubmit
          containerStyle={styles.inputContainerStyle}
          errorMessage={
            touched.password && errors.password ? errors.password : ''
          }
          errorStyle={styles.inputError}
          onBlur={handleBlur('password')}
          onChangeText={handleChange('password')}
          onSubmitEditing={handleSubmit}
          placeholder="Senha"
          ref={passwordRef}
          returnKeyType="done"
          secureTextEntry
          textContentType="newPassword"
          value={values.password}
        />
      </View>

      <Button
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        disabled={isSubmitting || isValidating}
        onPress={handleSubmit}
        title="Continuar"
      />

      {(isSubmitting || isValidating) && (
        <View style={styles.loading}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: '100%',
  },
  buttonContainer: {
    marginLeft: -20,
    marginRight: -20,
    marginBottom: -20,
    marginTop: 20,
    height: 70,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  inputContainerStyle: {
    marginBottom: 15,
  },
  inputError: {
    color: MyColors.warn,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Signup.navigationOptions = ({
  navigation,
}: InjectedNavigation): NavigationScreenOptions => ({
  title: 'Criar Conta',
});

export default withFormik<any, FormValues>({
  mapPropsToValues: () => ({
    cpf: '',
    email: '',
    fullName: '',
    password: '',
    phoneNumber: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting, setErrors}) => {
    setTimeout(function() {
      setSubmitting(false);
      Alert.alert('FAKE', 'Parabéns, seja bem vindo!', [
        {
          text: 'Continuar',
        },
      ]);
    }, 1000);
  },
  validationSchema: Yup.object().shape({
    cpf: Yup.string()
      .min(11, 'CPF inválido')
      .max(14, 'CPF inválido')
      .required('Informe seu CPF'),
    email: Yup.string()
      .email('E-mail inválido')
      .required('Informe um email'),
    fullName: Yup.string().required('Informe seu nome completo'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('Crie uma senha'),
    phoneNumber: Yup.string()
      .min(10, 'Informe um telefone válido')
      .required('Informe seu telefone'),
  }),
})(Signup);
