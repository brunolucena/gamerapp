import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input, Image} from 'react-native-elements';
import {SafeAreaView} from 'react-navigation';
import {Transition} from 'react-navigation-fluid-transitions';
import {MaskService} from 'react-native-masked-text';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {InjectedNavigation, InjectedTheme} from '../../../Models/Utils';
import {ReactNativeElementsTheme} from '../../../Themes';
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {useDispatch, useSelector} from 'react-redux';
import {GamerAppReduxStore} from '../../../Models/Redux';
import {saveSignupData, updateHearts} from 'src/Store/Ducks/signup';
import ButtonSecondary from '../../../Components/Buttons/ButtonSecondary';
import {
  logEvent,
  setUserProperties,
} from '../../../Analytics/analyticsFunctions';

interface FormValues {
  phoneNumber: string;
}

function Phone(
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

  const {error} = signup;

  function handleChange(fieldName: string, value: string) {
    const maskedValue = MaskService.toMask('cel-phone', value);

    props.handleChange(fieldName)(maskedValue);
    dispatch(saveSignupData({phoneNumber: value}));
  }

  function nextScreen() {
    validateForm();

    if (isValid && !isSubmitting && !isValidating) {
      setUserProperties({phoneNumber: signup.phoneNumber});
      navigation.navigate('Email');
    } else {
      const toHearts = signup.hearts - 1;

      if (toHearts >= 0) {
        dispatch(updateHearts(toHearts));
      }
    }
  }

  useEffect(() => {
    logEvent('cadastro_telefone');

    if (signup.phoneNumber) {
      setFieldValue('phoneNumber', signup.phoneNumber);
    }
  }, [setFieldValue, signup.phoneNumber]);

  const heartsArray = new Array(signup.hearts).fill(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.images}>
          <View style={styles.hearts}>
            {heartsArray.map((_, index) => (
              <Image
                key={index}
                containerStyle={styles.heart}
                source={require('../../../Assets/images/signup/heart.png')}
              />
            ))}
          </View>

          <Transition shared="lifebar">
            <Image
              source={require('../../../Assets/images/signup/lifebar2.png')}
            />
          </Transition>
        </View>

        <Text style={styles.text}>Agora, digite o seu celular</Text>

        <Input
          autoCompleteType="tel"
          autoFocus
          containerStyle={styles.inputContainerStyle}
          errorMessage={error ? error : touched ? errors.phoneNumber : ''}
          errorStyle={styles.inputError}
          inputStyle={styles.input}
          keyboardType="phone-pad"
          maxLength={15}
          onBlur={handleBlur('phoneNumber')}
          onChangeText={text => handleChange('phoneNumber', text)}
          onSubmitEditing={() => nextScreen()}
          placeholder="Celular"
          returnKeyType="next"
          textContentType="telephoneNumber"
          value={values.phoneNumber}
        />
      </View>

      <View style={styles.bottom}>
        <ButtonSecondary
          containerStyle={styles.buttonContainerStyle}
          disabled={isSubmitting || isValidating}
          onPress={() => nextScreen()}
          title="Próximo"
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
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default withFormik<any, FormValues>({
  mapPropsToValues: () => ({
    phoneNumber: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    phoneNumber: Yup.string()
      .min(15, 'Informe um telefone válido')
      .max(15, 'Informe um telefone válido')
      .required('Informe seu telefone'),
  }),
})(Phone);
