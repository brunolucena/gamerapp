import MyButton from 'src/Components/Button';
import React from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, ScrollView, StyleSheet, Linking} from 'react-native';

const {height} = Dimensions.get('window');

/**
 * Indica as URLs determinadas para o Termo de Uso e Política de Privacidade
 */
const urls = {
  termos_de_uso: 'http://www.gamerapp.com.br',
  politica_de_privacidade: 'http://www.gamerapp.com.br/politica-de-privacidade',
};

/**
 * Renderiza a Tela
 */
const IntroGP = () => {
  const navigation = useNavigation();

  /**
   * Vai para a próxima tela
   */
  const goToNextScreen = () => {
    navigation.navigate('CadastroGPNavigation');
  };

  /**
   * Abre a url determinada
   * @param url
   */
  const openUrl = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView>
      <View spread>
        <View paddingT-10 paddingR-10 right>
          <Text style={styles.freeBadge}>100% grátis</Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../Assets/images/logo/GamerPay/Logo-GamerPay.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.introText}>A carteira digital</Text>
          <Text style={styles.introTextBold}>gamer chegou!</Text>
        </View>

        <View center>
          <Image
            resizeMode="cover"
            source={require('./assets/background.png')}
          />
        </View>

        <View style={styles.bottomContainer}>
          <MyButton
            label="Eu Quero!"
            type="primary"
            style={styles.buttonCTA}
            onPress={goToNextScreen}
          />
          <Text style={styles.alertText}>
            Ao criar sua conta você concorda com os{' '}
            <Text
              style={styles.alertTextSpan}
              onPress={() => openUrl(urls.termos_de_uso)}>
              Termos de Uso
            </Text>{' '}
            e{' '}
            <Text
              style={styles.alertTextSpan}
              onPress={() => openUrl(urls.politica_de_privacidade)}>
              Política de Privacidade
            </Text>
            .
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Badge 100% Grátis
  freeBadge: {
    backgroundColor: '#1563CE',
    borderRadius: 5,
    color: '#FFFFFF',
    padding: 5,
    fontSize: 15,
    fontFamily: 'Montserrat',
  },

  // container com o texto
  mainContainer: {
    margin: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 30,
    resizeMode: 'contain',
  },
  introText: {
    color: '#2B2B2B',
    fontSize: 30,
    fontFamily: 'Montserrat',
  },
  introTextBold: {
    color: '#2B2B2B',
    fontSize: 30,
    fontFamily: 'Montserrat-Semibold',
  },
  bottomContainer: {
    margin: 20,
    marginTop: 0,
  },
  // botao
  buttonCTA: {
    fontFamily: 'Montserrat',
  },
  // aviso de privacidade
  alertText: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    color: '#B1B1B1',
  },
  alertTextSpan: {
    color: '#279F20',
  },
});

export default IntroGP;
