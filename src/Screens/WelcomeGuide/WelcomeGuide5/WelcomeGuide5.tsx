import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {InjectedNavigation} from '../../../Models/Utils';

import ButtonSecondary from '../../../Components/Buttons/ButtonSecondary';

import {
  H1,
  H2,
  Header,
  HeaderTextContainer,
  LottieWrapper,
  WarningContainer,
  WarningText,
  WelcomeGuide5SafeAreaView,
  WelcomeGuide5ScrollView,
} from './WelcomeGuide5Styles';
import {logEvent} from '../../../Analytics/analyticsFunctions';

function WelcomeGuide5({navigation}: InjectedNavigation) {
  useEffect(() => {
    logEvent('welcomeguide_complete');
  }, []);
  function renderContent() {
    return (
      <Header>
        <HeaderTextContainer>
          <H1>Tudo pronto!</H1>

          <H2>Você já cadastrou seus jogos e wishlist, agora é com a gente</H2>

          <WarningContainer>
            <WarningText>
              Não se esqueça de terminar o cadastro completo dos seus games para
              acumular pontos no ranking e trocas
            </WarningText>
          </WarningContainer>
        </HeaderTextContainer>
      </Header>
    );
  }

  return (
    <WelcomeGuide5SafeAreaView>
      <WelcomeGuide5ScrollView>
        <LottieWrapper>
          <LottieView
            source={require('../../../Assets/Animations/check.json')}
            autoPlay
            loop={false}
            style={{height: 120}}
          />
        </LottieWrapper>

        {renderContent()}
      </WelcomeGuide5ScrollView>

      <View style={styles.bottom}>
        <ButtonSecondary
          buttonStyle={styles.button}
          onPress={() => navigation.navigate('Home')}
          title="OK"
        />
      </View>
    </WelcomeGuide5SafeAreaView>
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
});

export default WelcomeGuide5;
