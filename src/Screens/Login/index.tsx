import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Image, Text, View} from 'react-native-ui-lib';
import ActivateDevMode from 'src/Components/ActivateDevMode';
import MyButton from 'src/Components/Button';
import Separator from 'src/Components/Separator';
import {MyColors} from 'src/Theme/FoundationConfig';
// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestCallback,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk';
// import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import appConfig from '../../../app.json';
import MyTextField from 'src/Components/TextField';
import {forgotPassword} from 'src/Store/Ducks/signup';
import {useDispatch, useSelector} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';

// import {logEvent} from '../../Analytics/analyticsFunctions';

// GoogleSignin.configure();

const Login: React.SFC<{}> = () => {
  const navigation = useNavigation();
  const [modalDetailsOpened, setModalDetailsOpened] = useState({opened: false});
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const {loading} = useSelector((state: GamerAppReduxStore) => state.signup);

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

  //           console.log({accessToken});

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

  function handleNavigateLogin() {
    navigation.navigate('LoginGamerApp');
  }

  function handleNavigateCadastro() {
    navigation.navigate('Cadastro');
  }

  function handleChange(e: string) {
    setForgotPasswordEmail(e);
    checkEmailError();
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

  function checkEmailError() {
    setError(!forgotPasswordEmail.includes('@'));
  }

  function renderForgotPassword() {
    function handleCloseModal() {
      setModalDetailsOpened({opened: false});
    }

    return (
      <Modal
        style={styles.modalConfirm}
        isVisible={modalDetailsOpened.opened}
        onBackButtonPress={handleCloseModal}
        onBackdropPress={handleCloseModal}>
        <View bg-white style={styles.modalContent}>
          <View centerH marginV-20 paddingH-20>
            <Text text60 dark10 marginB-30>
              Digite seu email
            </Text>

            <MyTextField
              autoCompleteType="email"
              keyboardType="email-address"
              handleChangeText={handleChange}
              placeholder=""
              returnKeyType="next"
              textContentType="emailAddress"
              title="E-mail"
              type="email"
              error={error ? 'Forneça um email valido' : ''}
              value={forgotPasswordEmail}
            />
          </View>

          <MyButton
            label="Confirmar"
            type="secondary"
            onPress={handleForgotPassword}
          />
        </View>
      </Modal>
    );
  }

  function openForgotPasswordModal() {
    setModalDetailsOpened({opened: true});
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoWrapper}>
        <View style={styles.logoContainer}>
          <Image source={require('../../Assets/images/logo/logo.png')} />
        </View>

        <View style={styles.controlsContainer}>
          <Image
            source={require('../../Assets/images/login/login-controls.png')}
          />
        </View>
      </View>

      <View style={styles.buttons}>
        <MyButton
          // buttonStyle={styles.buttonStyle}
          // containerStyle={styles.buttonContainer}
          fullWidth
          onPress={handleNavigateLogin}
          label="Login"
          type="secondary"
        />

        <Separator />

        <MyButton
          // buttonStyle={styles.buttonStyle}
          // containerStyle={styles.buttonContainer}
          fullWidth
          onPress={handleNavigateCadastro}
          label="Criar conta"
        />

        <MyButton
          clear
          type="secondary"
          label="Esqueci a senha"
          onPress={openForgotPasswordModal}
        />

        {renderForgotPassword()}

        {/* <View style={styles.alternativeLogins}> */}
        {/* <Text style={styles.text}>Ou faça login com</Text> */}

        {/* <Button
            buttonStyle={styles.googleButton}
            containerStyle={styles.googleButtonContainer}
            icon={
              <Image
                resizeMode="contain"
                style={styles.googleButtonIcon}
                source={require('../../Assets/images/login/google.png')}
              />
            }
            onPress={googleSignIn}
            title="Google"
            titleStyle={styles.googleTitle}
          /> */}
        {/* <Button
            buttonStyle={styles.facebookButton}
            containerStyle={styles.facebookButtonContainer}
            icon={<Icon name="facebook" size={20} color="#ffffff" />}
            onPress={facebookAuth}
            title="Facebook"
            titleStyle={styles.facebookTitle}
          /> */}
        {/* </View> */}

        <ActivateDevMode>
          <Text style={styles.disclaimer}>
            © Gamer App - Todos os direitos reservados - {appConfig.version}
          </Text>
        </ActivateDevMode>
      </View>

      <CustomActivityIndicator isVisible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  alternativeLogins: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
    width: '100%',
  },
  modalContent: {borderTopRightRadius: 40, borderTopLeftRadius: 40},
  modalConfirm: {justifyContent: 'flex-end', margin: 0},
  buttons: {
    flex: 1,
    width: '100%',
    padding: 10,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  controlsContainer: {
    flex: 2,
    alignItems: 'center',
    width: '100%',
  },
  disclaimer: {
    alignSelf: 'center',
    marginTop: 10,
    color: '#8d8d8d',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
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
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    marginTop: 10,
    color: '#393939',
    fontSize: 13,
  },
});

export default Login;
