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
import {regexCpfCnpj} from 'src/Helpers/regex';
import {MaskService} from 'react-native-masked-text';

interface FormValues {
  document: string;
}

function StoreRegisterDocument(
  props: InjectedNavigation & InjectedTheme & FormikProps<FormValues>,
) {
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
  const {registerStore} = useSelector((state: GamerAppReduxStore) => state);

  function handleChange(fieldName: string, value: string) {
    const maskType = value.length <= 14 ? 'cpf' : 'cnpj';
    const maskedValue = MaskService.toMask(maskType, value);

    props.handleChange(fieldName)(maskedValue);

    dispatch(saveRegisterStoreData({document: maskedValue}));
  }

  function nextScreen() {
    validateForm();

    if (isValid) {
      setUserProperties({document: registerStore.document});
      navigation.navigate('StoreRegister', {screen: 'StoreRegisterCEP'});
    }
  }

  useEffect(() => {
    logEvent('cadastro_store_nome');

    if (registerStore.document) {
      setFieldValue('document', registerStore.document);
    }
  }, [setFieldValue, registerStore.document]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.top}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>Agora, cadastre o seu CPF ou CNPJ</Text>
        </View>

        <Separator height={30} />

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.textFieldWrapper}>
          <MyTextField
            autoFocus
            centered
            error={touched ? errors.document : ''}
            handleChangeText={text => handleChange('document', text)}
            keyboardType="number-pad"
            maxLength={18}
            onBlur={handleBlur('document')}
            placeholder="CPF/CNPJ"
            title=""
            type="text"
            value={values.document}
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

      <CustomActivityIndicator isVisible={isSubmitting || isValidating} />
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
    fontSize: 16,
    maxWidth: 200,
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
    document: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    document: Yup.string().matches(regexCpfCnpj, 'Informe o CPF ou CNPJ'),
  }),
})(StoreRegisterDocument);
