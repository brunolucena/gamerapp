import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {InjectedNavigation, InjectedTheme} from '../../../Models/Utils';
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {useSelector, useDispatch} from 'react-redux';
import {
  logEvent,
  setUserProperties,
} from '../../../Analytics/analyticsFunctions';
import {Image} from 'react-native-ui-lib';
import Separator from 'src/Components/Separator';
import MyButton from 'src/Components/Button';
import MyTextField from 'src/Components/TextField';
import {saveSignupData, updateHearts} from 'src/Store/Ducks/signup';
import {GamerAppReduxStore} from 'src/Store';
// import {Transition} from 'react-navigation-fluid-transitions';

interface FormValues {
  fullName: string;
}

function Name(
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
  const signup = useSelector((state: GamerAppReduxStore) => state.signup);

  function handleChange(fieldName: string, value: string) {
    dispatch(saveSignupData({name: value}));
    props.handleChange(fieldName)(value);
  }

  function nextScreen() {
    validateForm();

    if (isValid) {
      setUserProperties({name: signup.name});
      navigation.navigate('Email');
    } else {
      const toHearts = signup.hearts - 1;

      if (toHearts >= 0) {
        dispatch(updateHearts(toHearts));
      }
    }
  }

  useEffect(() => {
    logEvent('cadastro_nome');

    if (signup.name) {
      setFieldValue('fullName', signup.name);
    }
  }, [setFieldValue, signup.name]);

  const heartsArray = new Array(signup.hearts).fill(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.images}>
          <View style={styles.hearts}>
            {heartsArray.map((_, index) => (
              <Image
                style={styles.heartImage}
                key={index}
                // containerStyle={styles.heart}
                source={require('../../../Assets/images/signup/heart.png')}
              />
            ))}
          </View>

          {/* <Transition shared="lifebar"> */}
          <Image
            source={require('../../../Assets/images/signup/lifebar1.png')}
          />
          {/* </Transition> */}
        </View>

        <Text style={[styles.text, styles.textStrong]}>Seja bem vindo(a)!</Text>

        <Text style={styles.text}>Pra começar, qual o seu nome?</Text>

        <Separator height={30} />

        <View style={styles.textFieldWrapper}>
          <MyTextField
            centered
            error={touched ? errors.fullName : ''}
            handleChangeText={text => handleChange('fullName', text)}
            onBlur={handleBlur('fullName')}
            placeholder="Nome"
            title=""
            type="text"
            value={values.fullName}
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
  heartImage: {marginRight: 5},
  hearts: {
    flexDirection: 'row',
  },
  input: {
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#4e4e4e',
  },
  textFieldWrapper: {
    marginHorizontal: 20,
  },
  textStrong: {
    fontWeight: 'bold',
  },
  top: {
    flex: 1,
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default withFormik<any, FormValues>({
  mapPropsToValues: () => ({
    fullName: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    fullName: Yup.string().required('Informe seu nome completo'),
  }),
})(Name);
