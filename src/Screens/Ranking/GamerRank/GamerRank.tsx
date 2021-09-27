import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import StarRating from 'react-native-star-rating';
import {Bar} from 'react-native-progress';
import {useNavigation} from '@react-navigation/native';

import formatDistance from '../../../Helpers/formatDistance';

import {getGamerRanking} from 'src/Store/Ducks/ranking';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  Bottom,
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
  CardInfo,
  CardInfoDistance,
  CardInfoItem,
  CardInfoItemLabel,
  CardInfoItemValue,
  CardInfoText,
  GamerRankSafeAreaView,
  GamerRankScrollView,
  Header,
  HeaderTop,
  HeaderTopRank,
  HeaderTopText,
} from './GamerRankStyles';
import {setActiveGamerCollectionId} from 'src/Store/Ducks/gamerCollection';
import {MyColors} from 'src/Theme/FoundationConfig';
import {Image} from 'react-native-ui-lib';
import MyButton from 'src/Components/Button';
import Separator from 'src/Components/Separator';
import {GamerAppReduxStore} from 'src/Store';

const GamerRank = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {ranking: rankingRedux, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId: myGamerId} = userRedux.user;
  const {activeGamerRanking, loading} = rankingRedux;

  const {
    averageRating,
    city,
    distance,
    experiencePoints,
    gamerId,
    imageUrl,
    name,
    negotiationsCount,
    nextLevelRank,
    nextLevelTotalExperiencePoints,
    position,
    rankTitle,
    state,
    tradesFinishedCount,
  } = activeGamerRanking;

  useEffect(() => {
    dispatch(
      getGamerRanking({
        gamerId,
        myGamerId,
      }),
    );
  }, [dispatch, gamerId, myGamerId]);

  function calcProgressPercent(): number {
    if (!experiencePoints || !nextLevelTotalExperiencePoints) {
      return 0;
    }

    const percentage =
      (experiencePoints * 100) / nextLevelTotalExperiencePoints;

    return percentage / 100;
  }

  function handleVerColecao() {
    if (myGamerId === gamerId) {
      navigation.navigate('MyCollection');
    } else {
      dispatch(setActiveGamerCollectionId(gamerId));

      navigation.navigate('GamerCollection', {screen: 'GamerCollection'});
    }
  }

  function handleVerWishlist() {
    if (myGamerId === gamerId) {
      navigation.navigate('MyWishlist');
    } else {
      dispatch(setActiveGamerCollectionId(gamerId));

      navigation.navigate('GamerCollection', {screen: 'GamerWishlist'});
    }
  }

  return (
    <GamerRankSafeAreaView>
      <GamerRankScrollView>
        <Header>
          <HeaderTop>
            <Image
              source={require('../../../Assets/images/profile/trophy.png')}
              style={styles.trophy}
            />

            <HeaderTopRank>#{position}</HeaderTopRank>
          </HeaderTop>

          <HeaderTopText>meu ranking</HeaderTopText>
        </Header>

        <Card>
          <CardGamer>
            <CardGamerTop>
              <Image
                resizeMode="contain"
                source={
                  imageUrl
                    ? {uri: imageUrl}
                    : require('../../../Assets/images/avatars/pirate.png')
                }
                style={styles.pirate}
              />

              <CardGamerInfo>
                <StarRating
                  containerStyle={styles.starsContainer}
                  buttonStyle={styles.starStyle}
                  disabled={true}
                  emptyStarColor="#ffffff"
                  fullStarColor={MyColors.secondary}
                  maxStars={averageRating}
                  rating={averageRating}
                  starSize={10}
                />

                <CardGamerName>{name}</CardGamerName>

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
                  <CardGamerXp>{experiencePoints} XP</CardGamerXp>
                </CardGamerXpItem>

                <CardGamerXpItem>
                  <CardGamerXpTotalXp>
                    {nextLevelTotalExperiencePoints} XP
                  </CardGamerXpTotalXp>
                  <CardGamerXpNextRank>{nextLevelRank}</CardGamerXpNextRank>
                </CardGamerXpItem>
              </CardGamerXpInfoContainer>
            </CardGamerBottom>
          </CardGamer>
        </Card>

        <Card>
          <CardInfo>
            <CardInfoItem>
              <CardInfoItemValue>{negotiationsCount}</CardInfoItemValue>

              <CardInfoItemLabel>Negociações</CardInfoItemLabel>
            </CardInfoItem>

            <CardInfoItem>
              <CardInfoItemValue primary={true}>
                {tradesFinishedCount}
              </CardInfoItemValue>

              <CardInfoItemLabel>Trocas Finalizadas</CardInfoItemLabel>
            </CardInfoItem>
          </CardInfo>
        </Card>

        {!!city && !!state && (
          <Card>
            <CardInfo>
              <CardInfoItem>
                <CardInfoText>
                  {city}, {state}
                </CardInfoText>
              </CardInfoItem>

              <CardInfoItem>
                <CardInfoDistance>{formatDistance(distance)}</CardInfoDistance>
              </CardInfoItem>
            </CardInfo>
          </Card>
        )}

        <Bottom>
          <Separator />

          <MyButton
            onPress={handleVerColecao}
            label="Ver coleção"
            outline
            type="secondary"
          />

          <Separator />

          <MyButton
            onPress={handleVerWishlist}
            label="Ver wishlist"
            outline
            type="secondary"
          />
        </Bottom>
      </GamerRankScrollView>

      <CustomActivityIndicator isVisible={loading} />
    </GamerRankSafeAreaView>
  );
};

const styles = StyleSheet.create({
  pirate: {height: 45, width: 45},
  starsContainer: {
    maxWidth: 60,
  },
  starStyle: {
    marginLeft: 0,
    marginRight: 3,
  },
  trophy: {height: 42, width: 42},
});

export default GamerRank;
