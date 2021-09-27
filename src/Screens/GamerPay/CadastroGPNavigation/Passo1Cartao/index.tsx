import React from 'react';
import {
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import {FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {setGPUser} from 'src/Store/Ducks/gamerPayUser';
import {View} from 'react-native-ui-lib';

interface FormValues {
  cor_cartao: string;
}

const Passo1Cartao = (props: FormikProps<FormValues>) => {
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

  const gamerPayUserStore = useSelector(
    (state: GamerAppReduxStore) => state.gamerPayUser,
  );

  const goToNextScreen = (color: String) => {
    dispatch(setGPUser({corCartao: color}));
    console.log(color);
    navigation.navigate('Passo2NickName');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-20 paddingT-30>
          <View>
            <Text style={styles.mainText}>Para começar, escolha</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                margin: 0,
                marginBottom: 10,
                padding: 0,
              }}>
              <Text style={styles.mainText}>o seu modelo de cartão</Text>
              <Text style={styles.mainTextSuperScript}>1</Text>
            </View>
            <Text style={styles.infoText1}>
              (100% grátis e sem anuidade, na versão crédito)
            </Text>
          </View>

          <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => goToNextScreen('black')}>
              <Image
                style={styles.card}
                source={require('../../../../Assets/images/logo/GamerPay/Cards/black.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToNextScreen('green')}>
              <Image
                style={styles.card}
                source={require('../../../../Assets/images/logo/GamerPay/Cards/green.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToNextScreen('red')}>
              <Image
                style={styles.card}
                source={require('../../../../Assets/images/logo/GamerPay/Cards/red.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToNextScreen('blue')}>
              <Image
                style={styles.card}
                source={require('../../../../Assets/images/logo/GamerPay/Cards/blue.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goToNextScreen('silver')}>
              <Image
                style={styles.card}
                source={require('../../../../Assets/images/logo/GamerPay/Cards/silver.png')}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.infoText2}>
              (1) O cartão padrão é apenas simbólico e pode ser usado apenas
              como pagamento instantâneo (QRCode). Os pedidos de cartão de
              crédito serão analisados posteriormente.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 22,
    fontFamily: 'Montserrat-Semibold',
    color: '#2B2B2B',
  },

  mainTextSuperScript: {
    fontSize: Math.floor(22 * 0.5),
    lineHeight: Math.floor(22 * 0.5) * 1,
  },

  infoText1: {
    fontSize: 11,
    color: '#9A9A9A',
    fontFamily: 'Montserrat',
  },

  infoText2: {
    fontSize: 11,
    color: '#B1B1B1',
    fontFamily: 'Montserrat',
  },

  // containers de cartão
  cardContainer: {
    alignItems: 'center',
  },

  card: {
    margin: 0,
    padding: 0,
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Passo1Cartao;
