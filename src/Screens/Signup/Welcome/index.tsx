import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

import MyButton from 'src/Components/Button';
import Separator from 'src/Components/Separator';
import {MyColors} from 'src/Theme/FoundationConfig';
import {logEvent} from '../../../Analytics/analyticsFunctions';
import {clearSignup} from 'src/Store/Ducks/signup';
import {login} from 'src/Store/Ducks/user';
import {GamerAppReduxStore} from 'src/Store';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';

function Welcome() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {signup, user} = useSelector((state: GamerAppReduxStore) => state);

  const {email, password} = signup;
  const {loading} = user;

  useEffect(() => {
    logEvent('cadastro_finalizado');
    logEvent('sign_up');
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearSignup());
    };
  }, [dispatch]);

  function handleLogin() {
    logEvent('cadastro_login');

    if (email && password) {
      dispatch(login(email, password));
    } else {
      navigation.navigate('Login', {screen: 'LoginGamerApp'});
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Image source={require('../../../Assets/images/signup/success.png')} />

        <Separator height={15} />

        <Text style={[styles.text, styles.textBig]}>Parabéns!</Text>
        <Text style={styles.text}>Seja muito bem vindo(a)</Text>
        <Text style={styles.text}>ao GamerApp!</Text>
      </View>

      <View style={styles.bottom}>
        <MyButton
          onPress={handleLogin}
          label="Uhuu, vamos lá!"
          type="secondary"
        />
      </View>

      <CustomActivityIndicator isVisible={loading} />
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
    fontSize: 16,
  },
  textBig: {
    marginBottom: 5,
    color: MyColors.primary,
    fontSize: 40,
  },
  top: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default Welcome;
