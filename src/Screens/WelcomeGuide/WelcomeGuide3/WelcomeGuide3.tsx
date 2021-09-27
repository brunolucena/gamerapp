import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {Image, Input} from 'react-native-elements';

import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';

import {ReactNativeElementsTheme} from '../../../Themes';

import {getAddressFromCep} from 'src/Store/Ducks/userAddress';

import {GamerAppReduxStore} from '../../../Models/Redux';
import {InjectedNavigation} from '../../../Models/Utils';

import ButtonSecondary from '../../../Components/Buttons/ButtonSecondary';
import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  H1,
  H2,
  Header,
  HeaderTextContainer,
  WarningContainer,
  WarningText,
  WelcomeGuide3SafeAreaView,
  WelcomeGuide3ScrollView,
} from './WelcomeGuide3Styles';
import {logEvent} from '../../../Analytics/analyticsFunctions';

const {width} = Dimensions.get('window');

let cardWidth = (width - 110) / 3;

if (cardWidth < 120) {
  cardWidth = (width - 55) / 2;
}

interface FormValues {
  cep: string;
}

function WelcomeGuide3(props: InjectedNavigation & FormikProps<FormValues>) {
  const {
    dirty,
    errors,
    handleBlur,
    handleChange,
    handleReset,
    isSubmitting,
    isValid,
    isValidating,
    navigation,
    touched,
    validateForm,
    values,
  } = props;

  useEffect(() => {
    logEvent('welcomeguide_cep');
  }, []);

  const dispatch = useDispatch();

  const userAddress = useSelector(
    (state: GamerAppReduxStore) => state.userAddress,
  );

  function next() {
    validateForm();

    if (isValid && !isSubmitting && !isValidating && !loading) {
      handleReset();
      dispatch(getAddressFromCep(values.cep, 'WelcomeGuide4'));
    }
  }

  const {error, loading} = userAddress;

  function renderHeader() {
    return (
      <Header>
        <HeaderTextContainer>
          <H1>Só mais um passo!</H1>

          <H2>
            As sugestões de trocas são baseadas na distância entre você e outros
            gamers. Para receber as melhores sugestões, nos informe seu CEP.
          </H2>

          <WarningContainer>
            <Image
              source={require('../../../Assets/images/welcome-guide/magic-wand.png')}
              style={{width: 40, height: 40}}
            />

            <WarningText>Seu endereço não será exibido.</WarningText>
          </WarningContainer>
        </HeaderTextContainer>
      </Header>
    );
  }

  function renderContent() {
    return (
      <KeyboardAvoidingView style={{paddingHorizontal: 10}}>
        <Input
          autoCompleteType="postal-code"
          containerStyle={styles.inputContainerStyle}
          errorMessage={error ? error : touched && dirty ? errors.cep : ''}
          errorStyle={styles.inputError}
          inputStyle={styles.input}
          keyboardType="number-pad"
          maxLength={8}
          onBlur={handleBlur('cep')}
          onChangeText={handleChange('cep')}
          onSubmitEditing={() => next()}
          placeholder="Digite o CEP"
          returnKeyType="go"
          textContentType="postalCode"
          value={values.cep}
        />
      </KeyboardAvoidingView>
    );
  }
  return (
    <WelcomeGuide3SafeAreaView>
      <WelcomeGuide3ScrollView>
        {renderHeader()}

        {renderContent()}
      </WelcomeGuide3ScrollView>

      <View style={styles.bottom}>
        <ButtonSecondary
          buttonStyle={styles.button}
          disabled={isSubmitting || isValidating || loading}
          onPress={() => next()}
          title="Próximo"
        />
      </View>

      {(isSubmitting || isValidating || loading) && <CustomActivityIndicator />}
    </WelcomeGuide3SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    justifyContent: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 15,
  },
  button: {
    height: 55,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
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
});

export default withFormik<any, FormValues>({
  mapPropsToValues: () => ({
    cep: '',
  }),
  handleSubmit: (values: FormValues, {setSubmitting, setErrors}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    cep: Yup.string()
      .min(8, 'Informe um CEP válido')
      .max(8, 'Informe um CEP válido')
      .matches(/^[0-9]{8}$/, 'CEP inválido'),
  }),
})(WelcomeGuide3);
