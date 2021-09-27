import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import StarRating from 'react-native-star-rating';
import LottieView from 'lottie-react-native';

import {
  selectIsTradeCompleted,
  selectPosTradePart,
  selectTradeRating,
  setTradeRating,
} from 'src/Store/Ducks/tradeDetails';
import {clearEarnedPoints} from 'src/Store/Ducks/gamification';

import {LottieWrapper} from '../../WelcomeGuide/WelcomeGuide5/WelcomeGuide5Styles';
import {
  CompletedContent,
  CompletedGamerName,
  CompletedText,
  H1,
  H2,
  PointsContainer,
  PointsText,
  StarsContainer,
  TradeCompletedSafeAreaView,
  TradeCompletedWrapper,
} from './TradeCompletedStyles';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';
import {useNavigation} from '@react-navigation/native';

const TradeCompleted = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    return function cleanUp() {
      dispatch(clearEarnedPoints());
    };
  }, []);

  const {gamification, tradeDetails, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );
  const {gamerId} = userRedux.user;

  const {earnedPoints} = gamification;
  const {activeTradeId} = tradeDetails;

  const isCompleted = selectIsTradeCompleted(
    tradeDetails.tradeDetails.deliveryHistory,
  );

  const otherPart = selectPosTradePart({
    state: tradeDetails,
    gamerId,
    part: 'other',
  });

  const myRating = selectTradeRating(tradeDetails, gamerId, 'me');

  const [rating, setRating] = useState(myRating ? myRating.rating : 0);

  function handleSetTradeRating(toRating: number) {
    dispatch(
      setTradeRating({
        gamerId: gamerId,
        tradeId: activeTradeId,
        rating: toRating,
      }),
    );
  }

  function handleNavigate() {
    navigation.navigate('PosTrade');
  }

  return (
    <TradeCompletedSafeAreaView>
      <TradeCompletedWrapper>
        <LottieWrapper>
          <LottieView
            source={require('../../../Assets/Animations/check-blue.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        </LottieWrapper>

        <H1>Sucesso!</H1>
        <H2>A sua troca foi finalizada com sucesso!</H2>

        {earnedPoints > 0 && (
          <PointsContainer>
            <PointsText>
              Parabéns! você acumulou {earnedPoints} pontos!
            </PointsText>
          </PointsContainer>
        )}

        <CompletedContent>
          <CompletedText>Avalie a troca com</CompletedText>

          <CompletedGamerName>{otherPart.gamerName}</CompletedGamerName>

          <StarsContainer>
            <StarRating
              buttonStyle={styles.starStyle}
              emptyStarColor="#bcbcbc"
              fullStarColor={MyColors.primary}
              maxStars={5}
              rating={rating}
              selectedStar={stars => {
                setRating(stars);
                handleSetTradeRating(stars);
              }}
              starSize={30}
            />
          </StarsContainer>
        </CompletedContent>
      </TradeCompletedWrapper>

      <MyButton onPress={handleNavigate} label="Ok" type="secondary" />
    </TradeCompletedSafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: 120,
  },
  starStyle: {
    marginHorizontal: 4,
  },
});

export default TradeCompleted;
