import MyButton from 'src/Components/Button';
import React, {useEffect} from 'react';
import {clearSignup} from 'src/Store/Ducks/signup';
import {GamerAppReduxStore} from 'src/Store';
import {Image, Text, View} from 'react-native-ui-lib';
import {ImageBackground, StyleSheet} from 'react-native';
import {logEvent} from '../../../Analytics/analyticsFunctions';
import {login} from 'src/Store/Ducks/user';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const OnboardingInit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {signup} = useSelector((state: GamerAppReduxStore) => state);

  const {email, password} = signup;

  function onPress() {
    navigation.navigate('OnboardingPlatforms');
  }

  useEffect(() => {
    logEvent('cadastro_finalizado');
    logEvent('sign_up');
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearSignup());
    };
  }, [dispatch]);

  useEffect(() => {
    logEvent('cadastro_login');

    if (email && password) {
      dispatch(login(email, password));
    }
  }, [dispatch]);

  return (
    <View flex style={styles.container}>
      <View flex>
        <ImageBackground
          source={require('./assets/background.png')}
          style={styles.backgroundImage}
        />
      </View>

      <View flex />

      <View>
        <Image source={require('./assets/ground.png')} style={styles.ground} />
      </View>

      <View style={styles.content}>
        <View style={styles.baloon}>
          <Text text40 marginL-10>
            Bem vindo(a)!
          </Text>

          <Text dark30 marginL-10 marginV-15>
            Conheça novos jogadores, troque e compre games, veja reviews,
            acumule pontos e muito mais! Está preparado(a)?
          </Text>

          <MyButton
            alignSelf="flex-start"
            label="Sim, vamos lá!"
            onPress={onPress}
            type="secondary"
          />
        </View>

        <View right marginT-20>
          <Image
            resizeMode="contain"
            source={require('../../../Assets/images/gamer_rex_high_quality.png')}
            style={styles.gamerRex}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  baloon: {
    marginHorizontal: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  container: {
    backgroundColor: '#fafafa',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 90,
  },
  gamerRex: {
    height: 150,
    width: 180,
  },
  ground: {
    height: 60,
  },
});

export default OnboardingInit;
