import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {getAddressFromCep} from 'src/Store/Ducks/userAddress';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {GamerAppReduxStore} from 'src/Store';
import MyTextField from 'src/Components/TextField';
import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';

interface FormValues {
  cep: string;
}

function NewAddressCep(props: FormikProps<FormValues>) {
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

  const {error, loading} = useSelector(
    (state: GamerAppReduxStore) => state.userAddress,
  );

  function next() {
    validateForm();

    if (isValid && !isSubmitting && !isValidating && !loading) {
      handleReset();
      dispatch(getAddressFromCep(values.cep));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>
          Receba propostas de troca automáticas de gamers próximos a você
          cadastrando seu endereço
        </Text>

        <MyTextField
          centered
          type="cep"
          autoCompleteType="postal-code"
          containerStyle={styles.inputContainerStyle}
          error={error ? error : touched && dirty ? errors.cep : ''}
          onBlur={handleBlur('cep')}
          handleChangeText={handleChange('cep')}
          onSubmitEditing={next}
          placeholder="Digite o CEP"
          value={values.cep}
        />
      </View>

      <View style={styles.bottom}>
        <MyButton
          disabled={isSubmitting || isValidating || loading}
          onPress={next}
          label="Próximo"
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
    marginTop: 50,
    paddingHorizontal: 50,
  },
  inputError: {
    color: MyColors.warn,
    textAlign: 'center',
  },
  text: {
    maxWidth: 200,
    textAlign: 'center',
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
    cep: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    cep: Yup.string()
      .min(9, 'Informe um CEP válido')
      .max(9, 'Informe um CEP válido')
      .matches(/[0-9]{5}-[0-9]{3}/g, 'CEP inválido'),
  }),
})(NewAddressCep);
