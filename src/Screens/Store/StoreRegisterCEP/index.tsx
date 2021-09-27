import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {InjectedNavigation, InjectedTheme} from '../../../Models/Utils';
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {useSelector, useDispatch} from 'react-redux';
import {
  logEvent,
  setUserProperties,
} from '../../../Analytics/analyticsFunctions';
import Separator from 'src/Components/Separator';
import MyButton from 'src/Components/Button';
import MyTextField from 'src/Components/TextField';
import {GamerAppReduxStore} from 'src/Store';
import {saveRegisterStoreData} from 'src/Store/Ducks/registerStore';
import {regexZipCode} from 'src/Helpers/regex';
import {MaskService} from 'react-native-masked-text';
import {getAddressFromCep} from 'src/Store/Ducks/userAddress';

interface FormValues {
  zipCode: string;
}

function StoreRegisterCEP(
  props: InjectedNavigation & InjectedTheme & FormikProps<FormValues>,
) {
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
  const {registerStore} = useSelector((state: GamerAppReduxStore) => state);

  function handleChange(fieldName: string, value: string) {
    const maskedValue = MaskService.toMask('zip-code', value);

    props.handleChange(fieldName)(maskedValue);

    dispatch(saveRegisterStoreData({zipCode: maskedValue}));
  }

  function nextScreen() {
    validateForm();

    if (isValid) {
      setUserProperties({zipCode: registerStore.zipCode});
      dispatch(getAddressFromCep(values.zipCode, 'StoreRegisterAddress'));
    }
  }

  useEffect(() => {
    logEvent('cadastro_store_nome');

    if (registerStore.zipCode) {
      setFieldValue('zipCode', registerStore.zipCode);
    }
  }, [setFieldValue, registerStore.zipCode]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.top}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            Para terminar, cadastre o endereço remetente da loja
          </Text>

          <Text style={[styles.text, styles.text2]}>
            (pode ser o seu endereço pessoal)
          </Text>
        </View>

        <Separator height={30} />

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.textFieldWrapper}>
          <MyTextField
            autoCompleteType="postal-code"
            autoFocus
            centered
            error={touched ? errors.zipCode : ''}
            handleChangeText={text => handleChange('zipCode', text)}
            keyboardType="number-pad"
            maxLength={9}
            onBlur={handleBlur('zipCode')}
            placeholder="CEP"
            title=""
            type="cep"
            value={registerStore.zipCode}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View style={styles.bottom}>
        <MyButton
          disabled={isSubmitting || isValidating}
          onPress={() => nextScreen()}
          label="Próximo"
          type={
            registerStore.storeType === 'GamerStore' ? 'secondary' : 'primary'
          }
        />
      </View>

      <CustomActivityIndicator
        isVisible={isSubmitting || isValidating || registerStore.loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    fontSize: 16,
  },
  input: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#4e4e4e',
    fontSize: 15,
    maxWidth: 240,
  },
  text2: {
    color: '#a3a3a3',
    fontSize: 14,
  },
  textFieldWrapper: {
    marginHorizontal: 20,
  },
  textWrapper: {
    alignItems: 'center',
  },
  top: {
    flex: 1,
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 20,
  },
});

export default withFormik<any, FormValues>({
  mapPropsToValues: () => ({
    zipCode: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    zipCode: Yup.string().matches(regexZipCode, 'Informe um CEP válido'),
  }),
})(StoreRegisterCEP);
