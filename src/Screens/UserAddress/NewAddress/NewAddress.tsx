import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {saveUserAddress} from 'src/Store/Ducks/userAddress';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {GamerAppReduxStore} from 'src/Store';
import MyTextField from 'src/Components/TextField';
import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';

interface FormValues {
  complemento: string;
  numero: string;
  tipo: string;
}

function NewAddress(props: FormikProps<FormValues>) {
  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const {addressFromCep, loading, redirectTo} = userAddress;

  const {
    address,
    city,
    cityId,
    complement,
    district,
    state,
    zipCode,
  } = addressFromCep;

  function next() {
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
          redirectTo,
        ),
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.top, styles.topText]}>
          <Text style={styles.text}>O seu endereço é</Text>
          <Text style={[styles.text, styles.textColorSecondary]}>
            {`${address}, ${district}, ${
              complement ? complement + ', ' : ''
            } ${city} - ${state}`}
          </Text>
        </View>

        <View style={styles.inputs}>
          <KeyboardAvoidingView behavior="padding" style={styles.top}>
            <MyTextField
              centered
              containerStyle={styles.inputContainerStyle}
              error={touched && dirty ? errors.tipo : ''}
              maxLength={50}
              onBlur={handleBlur('tipo')}
              handleChangeText={handleChange('tipo')}
              placeholder="Tipo* (ex: casa, trabalho)"
              returnKeyType="next"
              value={values.tipo}
            />

            <MyTextField
              centered
              containerStyle={styles.inputContainerStyle}
              error={touched && dirty ? errors.numero : ''}
              keyboardType="number-pad"
              maxLength={6}
              onBlur={handleBlur('numero')}
              handleChangeText={handleChange('numero')}
              placeholder="Número*"
              returnKeyType="next"
              value={values.numero}
            />

            <MyTextField
              centered
              containerStyle={styles.inputContainerStyle}
              error={touched && dirty ? errors.complemento : ''}
              maxLength={100}
              onBlur={handleBlur('complemento')}
              handleChangeText={handleChange('complemento')}
              placeholder="Complemento (opcional)"
              returnKeyType="done"
              textContentType="streetAddressLine1"
              value={values.complemento}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <MyButton
          disabled={isSubmitting || isValidating || loading}
          onPress={next}
          label="Salvar endereço"
          type="secondary"
        />
      </View>

      {(isSubmitting || isValidating || loading) && <CustomActivityIndicator />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-end',
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
    marginTop: 5,
    paddingHorizontal: 50,
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
})(NewAddress);
