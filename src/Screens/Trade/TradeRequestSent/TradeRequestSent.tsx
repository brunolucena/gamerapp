import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';

import {clearEarnedPoints} from 'src/Store/Ducks/gamification';

import {
  Divisor,
  LottieWrapper,
  PointsContainer,
  PointsText,
  SentBottom,
  SentSafeAreaView,
  SentText,
  SentTextBig,
  SentTop,
} from './TradeRequestSentStyles';
import {useNavigation} from '@react-navigation/native';
import {GamerAppReduxStore} from 'src/Store';
import MyButton from 'src/Components/Button';

function TradeRequestSent() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    return function cleanUp() {
      dispatch(clearEarnedPoints());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {gamification, tradeActive} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {earnedPoints} = gamification;
  const {tradeViewId} = tradeActive.activeTradeData;

  function handleOk() {
    navigation.navigate('Home', {
      screen: 'Trade',
      params: {
        screen: 'TradeListEmAndamento',
      },
    });
  }

  return (
    <SentSafeAreaView>
      <SentTop>
        <LottieWrapper>
          <LottieView
            source={require('../../../Assets/Animations/check.json')}
            autoPlay
            loop={false}
            style={styles.check}
          />
        </LottieWrapper>

        <SentTextBig>Sucesso!</SentTextBig>
        <SentText>A sua proposta de troca foi enviada com sucesso.</SentText>

        <Divisor />

        <SentText>Você ganhou {earnedPoints} pontos</SentText>

        {typeof tradeViewId === 'string' && (
          <PointsContainer>
            <PointsText>Identificador da troca</PointsText>
            <PointsText>{tradeViewId}</PointsText>
          </PointsContainer>
        )}
      </SentTop>

      <SentBottom>
        <MyButton onPress={handleOk} label="Ok" />
      </SentBottom>
    </SentSafeAreaView>
  );
}

const styles = StyleSheet.create({
  check: {
    height: 120,
  },
});

export default TradeRequestSent;
