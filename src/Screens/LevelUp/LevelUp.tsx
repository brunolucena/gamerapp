import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native-ui-lib';
import {Bar} from 'react-native-progress';
import LottieView from 'lottie-react-native';

import {clearLevelUp} from 'src/Store/Ducks/levelUpDuck';

import {
  // Bottom,
  // Header,
  // HeaderTop,
  // HeaderTopRank,
  // HeaderTopText,
  Card,
  CardGamer,
  CardGamerBottom,
  CardGamerInfo,
  CardGamerName,
  CardGamerRank,
  CardGamerTop,
  CardGamerXp,
  CardGamerXpBarContainer,
  CardGamerXpInfoContainer,
  CardGamerXpItem,
  CardGamerXpNextRank,
  CardGamerXpTotalXp,
  LevelUpSafeAreaView,
  LevelUpScrollView,
  LevelUpText,
  LevelUpTextWrapper,
  TopWrapper,
} from './LevelUpStyles';
import {logEvent} from '../../Analytics/analyticsFunctions';
import {GamerAppReduxStore} from 'src/Store';
import {useNavigation} from '@react-navigation/native';
import {MyColors} from 'src/Theme/FoundationConfig';
import {StyleSheet} from 'react-native';
import MyButton from 'src/Components/Button';

function LevelUp() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    logEvent('level_up');

    return function() {
      dispatch(clearLevelUp());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {levelUp: levelUpRedux, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {
    // achievementRankId,
    backToRoute,
    experiencePointsNeeded,
    // levelUp,
    nextRankTitle,
    // nextRankUrl,
    // rankImageUrl,
    rankTitle,
    totalExperiencePoints,
  } = levelUpRedux;
  const {firstName, lastName} = userRedux.user;

  function calcProgressPercent(): number {
    if (!totalExperiencePoints || !experiencePointsNeeded) {
      return 0;
    }

    const percentage =
      (totalExperiencePoints * 100) /
      (totalExperiencePoints + experiencePointsNeeded);

    return percentage / 100;
  }

  function handleNavigateBack() {
    if (backToRoute) {
      navigation.navigate(backToRoute);
    } else {
      navigation.goBack();
    }
  }

  return (
    <LevelUpSafeAreaView>
      <LevelUpScrollView>
        {/* <Header>
          <HeaderTop>
            <Image
              source={require('../../../Assets/images/profile/trophy.png')}
              style={{height: 42, width: 42}}
            />

            <HeaderTopRank>#{position}</HeaderTopRank>
          </HeaderTop>

          <HeaderTopText>meu ranking</HeaderTopText>
        </Header> */}

        <TopWrapper>
          <LottieView
            source={require('../../Assets/Animations/level-up.json')}
            autoPlay
            loop={false}
            style={styles.image}
          />
        </TopWrapper>

        <LevelUpTextWrapper>
          <LevelUpText>Parabéns, você subiu de nível!</LevelUpText>

          <LevelUpText>
            Continue ganhando pontos para ganhar novos títulos.
          </LevelUpText>
        </LevelUpTextWrapper>

        <Card>
          <CardGamer>
            <CardGamerTop>
              <Image
                source={require('../../Assets/images/avatars/pirate.png')}
                style={styles.pirate}
              />

              <CardGamerInfo>
                <CardGamerName>{`${firstName} ${lastName}`}</CardGamerName>

                <CardGamerRank>{rankTitle}</CardGamerRank>
              </CardGamerInfo>
            </CardGamerTop>

            <CardGamerBottom>
              <CardGamerXpBarContainer>
                <Bar
                  borderRadius={14}
                  borderWidth={0}
                  height={20}
                  color={MyColors.primary}
                  unfilledColor="#e6e6e6"
                  progress={calcProgressPercent()}
                  width={null}
                />
              </CardGamerXpBarContainer>

              <CardGamerXpInfoContainer>
                <CardGamerXpItem>
                  <CardGamerXp>{totalExperiencePoints} XP</CardGamerXp>
                </CardGamerXpItem>

                <CardGamerXpItem>
                  <CardGamerXpTotalXp>
                    {experiencePointsNeeded + totalExperiencePoints} XP
                  </CardGamerXpTotalXp>
                  <CardGamerXpNextRank>{nextRankTitle}</CardGamerXpNextRank>
                </CardGamerXpItem>
              </CardGamerXpInfoContainer>
            </CardGamerBottom>
          </CardGamer>
        </Card>
      </LevelUpScrollView>

      <MyButton
        label="Continuar"
        onPress={handleNavigateBack}
        style={styles.button}
      />
    </LevelUpSafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  image: {height: 120},
  pirate: {height: 45, width: 45},
});

export default LevelUp;
