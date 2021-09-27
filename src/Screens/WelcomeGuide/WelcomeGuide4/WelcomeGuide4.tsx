import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView, NavigationScreenOptions} from 'react-navigation';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {ReactNativeElementsTheme} from '../../../Themes';

import {saveUserAddress} from 'src/Store/Ducks/userAddress';

import {GamerAppReduxStore} from '../../../Models/Redux';
import {InjectedNavigation} from '../../../Models/Utils';

import ButtonSecondary from '../../../Components/Buttons/ButtonSecondary';
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {logEvent} from '../../../Analytics/analyticsFunctions';

interface FormValues {
  complemento: string;
  tipo: string;
  numero: string;
}

function WelcomeGuide4(props: InjectedNavigation & FormikProps<FormValues>) {
  useEffect(() => {
    logEvent('welcomeguide_address');

    handleReset();
  }, [handleReset]);

  const {
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleReset,
    isSubmitting,
    isValid,
    isValidating,
    touched,
    validateForm,
    values,
  } = props;

  const dispatch = useDispatch();

  const {user, userAddress} = useSelector((state: GamerAppReduxStore) => state);

  const {gamerId} = user.user;
  const {loading, addressFromCep} = userAddress;

  const {
    district,
    address,
    city,
    cityId,
    complement,
    state,
    zipCode,
  } = addressFromCep;

  const complementoRef = useRef(null);
  const numeroRef = useRef(null);
  const tipoRef = useRef(null);

  function next() {
    // @ts-ignore
    complementoRef.current.blur();
    // @ts-ignore
    numeroRef.current.blur();
    // @ts-ignore
    tipoRef.current.blur();

    validateForm();

    if (isValid && !isSubmitting && !isValidating && !loading) {
      const {complemento, numero, tipo} = values;

      dispatch(
        saveUserAddress(
          {
            address,
            cityId,
            complement: complemento,
            district,
            gamerId,
            number: numero,
            type: tipo,
            zipCode,
          },
          'WelcomeGuide5',
        ),
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.top, styles.topText]}>
        <Text style={styles.text}>O seu endereço é</Text>
        <Text style={[styles.text, styles.textColorSecondary]}>
          {`${address}, ${district}, ${
            complement ? complement + ', ' : ''
          } ${city} - ${state}`}
        </Text>
      </View>

      <ScrollView style={styles.inputs}>
        <KeyboardAvoidingView behavior="padding" style={styles.top}>
          <Input
            containerStyle={styles.inputContainerStyle}
            errorMessage={touched && dirty ? errors.tipo : ''}
            errorStyle={styles.inputError}
            inputStyle={styles.input}
            maxLength={50}
            onBlur={handleBlur('tipo')}
            onChangeText={handleChange('tipo')}
            placeholder="Tipo* (ex: casa, trabalho)"
            ref={tipoRef}
            returnKeyType="next"
            value={values.tipo}
          />

          <Input
            containerStyle={styles.inputContainerStyle}
            errorMessage={touched && dirty ? errors.numero : ''}
            errorStyle={styles.inputError}
            inputStyle={styles.input}
            keyboardType="number-pad"
            maxLength={6}
            onBlur={handleBlur('numero')}
            onChangeText={handleChange('numero')}
            placeholder="Número*"
            ref={numeroRef}
            returnKeyType="next"
            value={values.numero}
          />

          <Input
            containerStyle={styles.inputContainerStyle}
            errorMessage={touched && dirty ? errors.complemento : ''}
            errorStyle={styles.inputError}
            inputStyle={styles.input}
            maxLength={100}
            onBlur={handleBlur('complemento')}
            onChangeText={handleChange('complemento')}
            placeholder="Complemento (opcional)"
            ref={complementoRef}
            returnKeyType="done"
            textContentType="streetAddressLine1"
            value={values.complemento}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.bottom}>
        <ButtonSecondary
          buttonStyle={styles.button}
          disabled={isSubmitting || isValidating || loading}
          onPress={() => next()}
          title="Salvar endereço"
        />
      </View>

      {(isSubmitting || isValidating || loading) && <CustomActivityIndicator />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  button: {
    height: 55,
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
  inputs: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    maxWidth: 200,
    textAlign: 'center',
  },
  textColorSecondary: {
    color: MyColors.secondary,
  },
  top: {
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
  topText: {
    alignItems: 'center',
  },
});

export default withFormik<any, FormValues>({
  mapPropsToValues: () => ({
    complemento: '',
    tipo: '',
    numero: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    numero: Yup.string().required('Campo obrigatório'),
    tipo: Yup.string().required('Campo obrigatório'),
  }),
})(WelcomeGuide4);
