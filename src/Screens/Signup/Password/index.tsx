import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {InjectedNavigation} from '../../../Models/Utils';
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {useSelector, useDispatch} from 'react-redux';
import {createUser, saveSignupData, updateHearts} from 'src/Store/Ducks/signup';
import {CreateUserRequest} from '../../../Models/Signup';
// import {Transition} from 'react-navigation-fluid-transitions';
import {logEvent} from '../../../Analytics/analyticsFunctions';
import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';
import Separator from 'src/Components/Separator';
import PasswordInput from 'src/Components/PasswordInput';
import {Image} from 'react-native-ui-lib';
import {GamerAppReduxStore} from 'src/Store';

interface FormValues {
  password: string;
}

function Password(props: InjectedNavigation & FormikProps<FormValues>) {
  const {
    errors,
    isSubmitting,
    isValid,
    isValidating,
    touched,
    validateForm,
    values,
  } = props;
  const dispatch = useDispatch();
  const signup = useSelector((state: GamerAppReduxStore) => state.signup);

  useEffect(() => {
    logEvent('cadastro_password');
  }, []);

  const {error, loading} = signup;

  function handleChange(fieldName: string, value: string) {
    dispatch(saveSignupData({password: value}));
    props.handleChange(fieldName)(value);
  }

  function nextScreen() {
    validateForm();

    if (isValid && !isSubmitting && !isValidating && !loading) {
      const {email, name, password, phoneNumber} = signup;

      if (email && name && password) {
        const createUserRequest: CreateUserRequest = {
          email,
          name,
          password,
          phoneNumber: phoneNumber || '',
        };

        dispatch(createUser(createUserRequest));
      }
    } else {
      const toHearts = signup.hearts - 1;

      if (toHearts >= 0) {
        dispatch(updateHearts(toHearts));
      }
    }
  }

  const heartsArray = new Array(signup.hearts).fill(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.images}>
          <View style={styles.hearts}>
            {heartsArray.map((_, index) => (
              <Image
                key={index}
                style={styles.image}
                source={require('../../../Assets/images/signup/heart.png')}
              />
            ))}
          </View>

          {/* <Transition shared="lifebar"> */}
          <Image
            source={require('../../../Assets/images/signup/lifebar4.png')}
          />
          {/* </Transition> */}
        </View>

        <Text style={styles.text}>Cadastre uma senha de 6 números</Text>

        <Separator height={30} />

        <PasswordInput
          error={error ? error : touched ? errors.password : ''}
          handleChangeText={text => handleChange('password', text)}
          onSubmitEditing={() => nextScreen()}
          value={values.password}
        />
      </View>

      <View style={styles.bottom}>
        <MyButton
          disabled={isSubmitting || isValidating}
          onPress={() => nextScreen()}
          label="Próximo"
          type="secondary"
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
  image: {
    marginRight: 5,
  },
  input: {
    letterSpacing: 26,
    fontSize: 35,
    paddingLeft: 13,
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
  inputUnderline: {
    letterSpacing: 15,
    fontSize: 50,
    top: 5,
    position: 'absolute',
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
    password: Yup.string()
      .max(6, 'A senha deve ter 6 caracteres')
      .min(6, 'A senha deve ter 6 caracteres')
      .required('Crie uma senha'),
  }),
})(Password);
