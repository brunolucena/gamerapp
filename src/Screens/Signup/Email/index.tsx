import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {useSelector, useDispatch} from 'react-redux';
import {saveSignupData, updateHearts} from 'src/Store/Ducks/signup';
// import {Transition} from 'react-navigation-fluid-transitions';
import {
  logEvent,
  setUserProperties,
} from '../../../Analytics/analyticsFunctions';
import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';
import Separator from 'src/Components/Separator';
import MyTextField from 'src/Components/TextField';
import {Image} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {GamerAppReduxStore} from 'src/Store';

interface FormValues {
  email: string;
}

function Email(props: FormikProps<FormValues>) {
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
  const navigation = useNavigation();

  const signup = useSelector((state: GamerAppReduxStore) => state.signup);

  function handleChange(fieldName: string, value: string) {
    dispatch(saveSignupData({email: value}));
    props.handleChange(fieldName)(value);
  }

  function nextScreen() {
    validateForm();

    if (isValid) {
      setUserProperties({email: signup.email});
      navigation.navigate('Password');
    } else {
      const toHearts = signup.hearts - 1;

      if (toHearts >= 0) {
        dispatch(updateHearts(toHearts));
      }
    }
  }

  useEffect(() => {
    logEvent('cadastro_email');

    if (signup.email) {
      setFieldValue('email', signup.email);
    }
  }, [setFieldValue, signup.email]);

  const heartsArray = new Array(signup.hearts).fill(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.images}>
          <View style={styles.hearts}>
            {heartsArray.map((_, index) => (
              <Image
                key={index}
                source={require('../../../Assets/images/signup/heart.png')}
                style={{marginRight: 5}}
              />
            ))}
          </View>

          {/* <Transition shared="lifebar"> */}
          <Image
            source={require('../../../Assets/images/signup/lifebar3.png')}
          />
          {/* </Transition> */}
        </View>

        <Text style={styles.text}>Qual o seu e-mail?</Text>

        <Separator height={30} />

        <View
          style={{
            marginHorizontal: 20,
          }}>
          <MyTextField
            centered
            error={touched ? errors.email : ''}
            handleChangeText={text => handleChange('email', text)}
            onBlur={handleBlur('email')}
            placeholder="E-mail"
            title=""
            type="email"
            value={values.email}
          />
        </View>
      </View>

      <View style={styles.bottom}>
        <MyButton
          disabled={isSubmitting || isValidating}
          onPress={() => nextScreen()}
          label="Próximo"
          type="secondary"
        />
      </View>

      {(isSubmitting || isValidating) && <CustomActivityIndicator />}
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
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default withFormik<any, FormValues>({
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('Informe um email'),
  }),
})(Email);
