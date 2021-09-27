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

interface FormValues {
  storeName: string;
}

function StoreRegisterName(
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
    dispatch(saveRegisterStoreData({name: value}));

    props.handleChange(fieldName)(value);
  }

  function nextScreen() {
    validateForm();

    if (isValid) {
      setUserProperties({name: registerStore.name});
      navigation.navigate('StoreRegister', {screen: 'StoreRegisterDocument'});
    }
  }

  useEffect(() => {
    logEvent('cadastro_store_nome');

    if (registerStore.name) {
      setFieldValue('storeName', registerStore.name);
    }
  }, [setFieldValue, registerStore.name]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.top}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            Para começar, qual o nome da sua loja?
          </Text>
        </View>
        <Separator height={30} />

        <KeyboardAvoidingView
          behavior="padding"
          style={styles.textFieldWrapper}>
          <MyTextField
            autoFocus
            centered
            error={touched ? errors.storeName : ''}
            handleChangeText={text => handleChange('storeName', text)}
            onBlur={handleBlur('storeName')}
            placeholder="Nome da loja"
            title=""
            type="text"
            value={values.storeName}
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
    storeName: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    storeName: Yup.string().required('Informe o nome da sua loja'),
  }),
})(StoreRegisterName);
