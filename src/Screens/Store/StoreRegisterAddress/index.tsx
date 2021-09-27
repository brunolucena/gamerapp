import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import MyButton from 'src/Components/Button';
import MyTextField from 'src/Components/TextField';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {
  createStore,
  saveRegisterStoreData,
} from 'src/Store/Ducks/registerStore';

interface FormValues {
  complement: string;
  number: string;
  type: string;
}

function StoreRegisterAddress(props: FormikProps<FormValues>) {
  useEffect(() => {
    handleReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    dirty,
    errors,
    handleBlur,
    handleReset,
    isSubmitting,
    isValid,
    isValidating,
    touched,
    validateForm,
  } = props;

  const dispatch = useDispatch();

  const {registerStore, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId} = user.user;

  const {
    district,
    address,
    city,
    cityId,
    complement,
    document,
    loading,
    name,
    number,
    state,
    storeType,
    type,
    zipCode,
  } = registerStore;

  function handleChange(fieldName: string, value: string) {
    props.handleChange(fieldName)(value);

    dispatch(saveRegisterStoreData({[fieldName]: value}));
  }

  function next() {
    validateForm();

    if (isValid && !isSubmitting && !isValidating && !loading) {
      if (district && number && type && document && name && zipCode) {
        const data = {
          addressDistrict: district,
          addressNumber: number,
          addressStreet: address || '',
          addressType: type,
          cityId: cityId || '',
          complement: complement || '',
          document,
          gamerId,
          storeName: name,
          storeType: storeType === 'GamerStore' ? 1 : 2,
          verified: false,
          zipCode,
        };

        dispatch(createStore(data));
      }
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
              error={touched && dirty ? errors.type : ''}
              maxLength={50}
              onBlur={handleBlur('type')}
              handleChangeText={text => handleChange('type', text)}
              placeholder="Tipo (ex: casa, trabalho, etc)*"
              returnKeyType="next"
              value={registerStore.type}
            />

            <MyTextField
              centered
              containerStyle={styles.inputContainerStyle}
              error={touched && dirty ? errors.number : ''}
              keyboardType="number-pad"
              maxLength={6}
              onBlur={handleBlur('number')}
              handleChangeText={text => handleChange('number', text)}
              placeholder="Número*"
              returnKeyType="next"
              value={registerStore.number}
            />

            <MyTextField
              centered
              containerStyle={styles.inputContainerStyle}
              error={touched && dirty ? errors.complement : ''}
              maxLength={100}
              onBlur={handleBlur('complement')}
              handleChangeText={text => handleChange('complement', text)}
              placeholder="Complemento"
              returnKeyType="done"
              textContentType="streetAddressLine1"
              value={registerStore.complement}
            />
          </KeyboardAvoidingView>
        </View>
      </ScrollView>

      <View style={styles.bottom}>
        <MyButton
          onPress={next}
          label="Salvar endereço"
          type={
            registerStore.storeType === 'GamerStore' ? 'secondary' : 'primary'
          }
        />
      </View>

      <CustomActivityIndicator
        isVisible={isSubmitting || isValidating || loading}
      />
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
    complement: '',
    type: '',
    number: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    number: Yup.string().required('Campo obrigatório'),
    type: Yup.string().required('Campo obrigatório'),
  }),
})(StoreRegisterAddress);
