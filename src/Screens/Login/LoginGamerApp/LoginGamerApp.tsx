import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Image, Text as TextUI, View as ViewUI} from 'react-native-ui-lib';
// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
//   GraphRequestCallback,
// } from 'react-native-fbsdk';
import Ionicon from 'react-native-vector-icons/Ionicons';
// import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import Modal from 'react-native-modal';

import {withFormik, FormikProps} from 'formik';
import * as Yup from 'yup';

import appConfig from '../../../../app.json';

import {logEvent} from '../../../Analytics/analyticsFunctions';
import {GamerAppReduxStore} from 'src/Store';
import Spinner from 'src/Components/CustomActivityIndicator';
import {useNavigation} from '@react-navigation/native';
import MyTextField from 'src/Components/TextField';
import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';
import {login} from 'src/Store/Ducks/user';
import ActivateDevMode from 'src/Components/ActivateDevMode';
import {forgotPassword} from 'src/Store/Ducks/signup';

interface FormValues {
  email: string;
  password: string;
}

// GoogleSignin.configure();

const LoginGamerApp = (props: FormikProps<FormValues>) => {
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    isValid,
    isValidating,
    submitCount,
    touched,
    validateForm,
    values,
  } = props;

  const [errorPassword, setErrorPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(
    values.email || '',
  );
  const [modalDetailsOpened, setModalDetailsOpened] = useState({opened: false});
  const navigation = useNavigation();

  const {signup, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {error} = userRedux;

  const loading = userRedux.loading || signup.loading;

  const dispatch = useDispatch();

  const handleLogin = () => {
    validateForm();
    handleSubmit();

    if (isValid) {
      const {email, password} = values;

      logEvent('login');
      dispatch(login(email, password));
    }
  };

  // const googleSignOut = async () => {
  //   logEvent('google_sigout');

  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const googleSignIn = async () => {
  //   logEvent('google_signin');

  //   try {
  //     await GoogleSignin.hasPlayServices();

  //     const userInfo = await GoogleSignin.signIn();

  //     console.log({userInfo});
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  // const facebookSignOut = () => {
  //   logEvent('facebook_signout');
  //   LoginManager.logOut();
  // };

  // const facebookAuth = () => {
  //   logEvent('facebook_signin');

  //   LoginManager.logInWithPermissions(['public_profile', 'email']).then(
  //     function(result) {
  //       const {grantedPermissions, isCancelled} = result;

  //       if (isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         console.log(
  //           'Login success with permissions: ' + grantedPermissions!.toString(),
  //         );

  //         AccessToken.getCurrentAccessToken().then(data => {
  //           if (!data) {
  //             return;
  //           }

  //           let accessToken = data.accessToken;

  //           const responseInfoCallback: GraphRequestCallback = (
  //             error,
  //             result,
  //           ) => {
  //             if (error) {
  //               console.log({error});
  //             } else {
  //               console.log({result});
  //             }
  //           };

  //           const infoRequest = new GraphRequest(
  //             '/me',
  //             {
  //               accessToken,
  //               parameters: {
  //                 fields: {
  //                   string: 'email,name,first_name,middle_name,last_name',
  //                 },
  //               },
  //             },
  //             responseInfoCallback,
  //           );

  //           new GraphRequestManager().addRequest(infoRequest).start();
  //         });
  //       }
  //     },
  //     function(error) {
  //       console.log('Login fail with error: ' + error);
  //     },
  //   );
  // };

  // function handleNavigateForgotPassword() {
  //   navigation.navigate('ForgotPassword');
  // }

  function handleNavigateCadastro() {
    navigation.navigate('Cadastro');
  }

  function handleNavigateLogin() {
    navigation.navigate('Login');
  }

  function openForgotPasswordModal() {
    setModalDetailsOpened({opened: true});
  }

  function renderForgotPassword() {
    function checkEmailError() {
      setErrorPassword(!forgotPasswordEmail.includes('@'));
    }

    function handleChange(e: string) {
      setForgotPasswordEmail(e);
      checkEmailError();
    }

    function handleCloseModal() {
      setModalDetailsOpened({opened: false});
    }

    function handleForgotPassword() {
      dispatch(
        forgotPassword({
          email: forgotPasswordEmail,
        }),
      );

      setModalDetailsOpened({opened: false});
      setForgotPasswordEmail('');
    }

    return (
      <Modal
        style={styles.modalConfirm}
        isVisible={modalDetailsOpened.opened}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}>
        <ViewUI bg-white style={styles.modalContent}>
          <ViewUI centerH marginV-20 paddingH-20>
            <TextUI text60 dark10 marginB-30>
              Digite seu email
            </TextUI>

            <MyTextField
              autoCompleteType="email"
              keyboardType="email-address"
              handleChangeText={handleChange}
              placeholder=""
              returnKeyType="next"
              textContentType="emailAddress"
              title="E-mail"
              type="email"
              error={errorPassword ? 'Forneça um email valido' : ''}
              value={forgotPasswordEmail}
            />
          </ViewUI>

          <MyButton
            label="Confirmar"
            type="secondary"
            onPress={handleForgotPassword}
          />
        </ViewUI>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <Ionicon
          name="md-arrow-back"
          size={30}
          style={styles.arrow}
          onPress={handleNavigateLogin}
        />
        <View style={styles.logoContainer}>
          <Image source={require('../../../Assets/images/logo/logo.png')} />
        </View>
      </View>

      <KeyboardAvoidingView style={styles.content}>
        <View style={styles.inputsContainer}>
          <MyTextField
            autoCompleteType="email"
            keyboardType="email-address"
            error={
              error ? error : touched && submitCount > 0 ? errors.email : ''
            }
            handleChangeText={handleChange('email')}
            placeholder="E-mail"
            returnKeyType="next"
            textContentType="emailAddress"
            title="E-mail"
            type="email"
            onBlur={handleBlur('email')}
            value={values.email}
          />

          <MyTextField
            error={touched && submitCount > 0 ? errors.password : ''}
            handleChangeText={handleChange('password')}
            placeholder="Senha"
            returnKeyType="done"
            secureTextEntry
            title="Senha"
            type="password"
            onBlur={handleBlur('password')}
            value={values.password}
          />

          <View style={styles.separator} />

          <MyButton
            fullWidth
            onPress={handleLogin}
            label="Login"
            type="secondary"
          />

          <MyButton
            clear
            fullWidth
            onPress={handleNavigateCadastro}
            label="Criar conta"
            type="secondary"
          />

          {/* <Button
            onPress={handleNavigateForgotPassword}
            title="Esqueci a senha"
            titleStyle={{
              color: MyColors.secondary,
              fontSize: 14,
            }}
            type="clear"
          /> */}
        </View>

        <View style={styles.bottom}>
          {/* <Text style={styles.text}>Ou faça login com</Text>

          <View style={styles.alternativeLogins}>
            <Button
              buttonStyle={styles.googleButton}
              containerStyle={styles.googleButtonContainer}
              icon={
                <Image
                  resizeMode="contain"
                  style={styles.googleButtonIcon}
                  source={require('../../../Assets/images/login/google.png')}
                />
              }
              onPress={googleSignIn}
              title="Google"
              titleStyle={styles.googleTitle}
            />
            <Button
              buttonStyle={styles.facebookButton}
              containerStyle={styles.facebookButtonContainer}
              icon={<Icon name="facebook" size={20} color="#ffffff" />}
              onPress={facebookAuth}
              title="Facebook"
              titleStyle={styles.facebookTitle}
            />
          </View> */}

          <MyButton
            clear
            type="secondary"
            label="Esqueci a senha"
            size="small"
            onPress={openForgotPasswordModal}
          />

          <ViewUI marginV-5 />

          <ActivateDevMode>
            <Text style={styles.disclaimer}>
              © Gamer App - Todos os direitos reservados - {appConfig.version}
            </Text>
          </ActivateDevMode>
        </View>
      </KeyboardAvoidingView>

      {renderForgotPassword()}

      <Spinner isVisible={isSubmitting || isValidating || loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  arrow: {
    position: 'absolute',
    left: 20,
    top: 10,
    color: '#ffffff',
    zIndex: 100,
  },
  separator: {
    margin: 15,
  },
  inputsContainer: {
    marginTop: 40,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  inputContainer1: {
    marginTop: 30,
    marginBottom: 10,
  },
  bottom: {
    alignItems: 'center',
  },
  alternativeLogins: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    marginBottom: 10,
  },
  buttonStyle: {
    height: 50,
    width: '100%',
  },
  buttons: {
    width: '100%',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  disclaimer: {
    color: '#8d8d8d',
    fontSize: 12,
  },
  facebookButton: {
    backgroundColor: '#3B53A4',
    paddingRight: 20,
    paddingLeft: 20,
  },
  facebookButtonContainer: {
    marginLeft: 4,
  },
  facebookTitle: {
    marginLeft: 15,
  },
  googleButton: {
    backgroundColor: '#ffffff',
    paddingRight: 20,
    paddingLeft: 20,
  },
  googleButtonContainer: {
    marginRight: 4,
  },
  googleButtonIcon: {
    height: 25,
    width: 25,
  },
  googleTitle: {
    color: '#4e4e4e',
    marginLeft: 15,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: MyColors.primary,
  },
  logoWrapper: {
    height: 100,
    alignItems: 'center',
    width: '100%',
  },
  modalContent: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  modalConfirm: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  text: {
    marginTop: 10,
    color: '#393939',
    fontSize: 13,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputError: {
    color: MyColors.warn,
  },
});

export default withFormik<any, FormValues>({
  handleSubmit: (values: FormValues, {setSubmitting}) => {
    setSubmitting(false);
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido')
      .required('Informe seu login'),
    password: Yup.string().required('Coloque sua senha'),
  }),
})(LoginGamerApp);
