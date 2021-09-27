import React from 'react';
import StarRating from 'react-native-star-rating';
import {Bar} from 'react-native-progress';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

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
} from './GamerProductGamerStyles';
import MyButton from 'src/Components/Button';
import Separator from 'src/Components/Separator';
import formatDistance from 'src/Helpers/formatDistance';
import {GamerAppReduxStore} from 'src/Store';
import {Image} from 'react-native-ui-lib';
import {MyColors} from 'src/Theme/FoundationConfig';
import {setActiveGamerCollectionId} from 'src/Store/Ducks/gamerCollection';

const GamerProductGamer = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    gamerProductDetails,
    ranking: rankingRedux,
    user: userRedux,
  } = useSelector((state: GamerAppReduxStore) => state);

  const {gamerId: myGamerId} = userRedux.user;
  const { gamer } = gamerProductDetails;

  function calcProgressPercent(): number {
    if (!gamer?.experiencePoints || !gamer?.nextLevelTotalExperiencePoints) {
      return 0;
    }

    const percentage =
      (gamer?.experiencePoints * 100) / gamer?.nextLevelTotalExperiencePoints;

    return percentage / 100;
  }

  function handleVerColecao() {
    if (gamer?.gamerId) {
      dispatch(setActiveGamerCollectionId(gamer?.gamerId));
  
      if (myGamerId === gamer?.gamerId) {
        navigation.navigate('MyCollection');
      } else {
        navigation.navigate('GamerCollection', {screen: 'GamerCollection'});
      }
    }
  }

  function handleVerWishlist() {
    if (gamer?.gamerId) {
      dispatch(setActiveGamerCollectionId(gamer?.gamerId));
  
      if (myGamerId === gamer?.gamerId) {
        navigation.navigate('MyWishlist');
      } else {
        navigation.navigate('GamerCollection', {screen: 'GamerWishlist'});
      }
    }
  }

  return (
    <GamerRankSafeAreaView>
      <GamerRankScrollView>
        <Header>
          <HeaderTop>
            <Image
              source={require('../../../../Assets/images/profile/trophy.png')}
              style={styles.trophy}
            />

            <HeaderTopRank>#{gamer?.position}</HeaderTopRank>
          </HeaderTop>

          <HeaderTopText>meu ranking</HeaderTopText>
        </Header>

        <Card>
          <CardGamer>
            <CardGamerTop>
              <Image
                resizeMode="contain"
                source={
                  gamer?.imageUrl
                    ? {uri: gamer?.imageUrl}
                    : require('../../../../Assets/images/avatars/pirate.png')
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
                  maxStars={gamer?.averageRating}
                  rating={gamer?.averageRating}
                  starSize={10}
                />

                <CardGamerName>{gamer?.name}</CardGamerName>

                <CardGamerRank>{gamer?.rankTitle}</CardGamerRank>
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
                  <CardGamerXp>{gamer?.experiencePoints} XP</CardGamerXp>
                </CardGamerXpItem>

                <CardGamerXpItem>
                  <CardGamerXpTotalXp>
                    {gamer?.nextLevelTotalExperiencePoints} XP
                  </CardGamerXpTotalXp>
                  <CardGamerXpNextRank>{gamer?.nextLevelRank}</CardGamerXpNextRank>
                </CardGamerXpItem>
              </CardGamerXpInfoContainer>
            </CardGamerBottom>
          </CardGamer>
        </Card>

        <Card>
          <CardInfo>
            <CardInfoItem>
              <CardInfoItemValue>{gamer?.negotiationsCount}</CardInfoItemValue>

              <CardInfoItemLabel>Negociações</CardInfoItemLabel>
            </CardInfoItem>

            <CardInfoItem>
              <CardInfoItemValue primary={true}>
                {gamer?.tradesFinishedCount}
              </CardInfoItemValue>

              <CardInfoItemLabel>Trocas Finalizadas</CardInfoItemLabel>
            </CardInfoItem>
          </CardInfo>
        </Card>

        {!!gamer?.city && !!gamer?.state && (
          <Card>
            <CardInfo>
              <CardInfoItem>
                <CardInfoText>
                  {gamer?.city}, {gamer?.state}
                </CardInfoText>
              </CardInfoItem>

              <CardInfoItem>
                <CardInfoDistance>{formatDistance(gamer?.distance)}</CardInfoDistance>
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

export default GamerProductGamer;
