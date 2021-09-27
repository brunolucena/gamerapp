import React from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native-ui-lib';

import MyButton from 'src/Components/Button';
import {CardContainer, CardText, H1, SafeAreaView, Wrapper} from './styles';
import {LottieWrapper} from 'src/Screens/WelcomeGuide/WelcomeGuide5/WelcomeGuide5Styles';

const TransferRequestSuccess = () => {
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate('Adm', {screen: 'FazerSaque'});
  }

  return (
    <SafeAreaView>
      <Wrapper>
        <LottieWrapper>
          <LottieView
            source={require('../../../Assets/Animations/check.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        </LottieWrapper>

        <H1>Sucesso!</H1>

        <View centerH>
          <Text center margin-10 style={styles.text}>
            A sua solicitação de saque foi realizada com sucesso
          </Text>
        </View>

        <CardContainer>
          <CardText>
            O saque é feito em modalidade TED e passa por análise anti-fraude,
            podendo levar até 5 dias úteis para compensar.
          </CardText>
        </CardContainer>
      </Wrapper>

      <MyButton onPress={handleNavigate} label="Continuar" type="secondary" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: 120,
  },
  text: {
    maxWidth: 200,
    color: '#7e7e7e',
    lineHeight: 18,
  },
});

export default TransferRequestSuccess;
