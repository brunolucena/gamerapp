import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LayoutAnimation, Platform, StyleSheet, UIManager} from 'react-native';
import {Image} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-gesture-handler';

import formatDistance from '../../../../Helpers/formatDistance';

import {InjectedNavigation} from '../../../../Models/Utils';
import {AutoTrade} from '../../../../Models/TradeRequest';
import {setActiveTrade} from 'src/Store/Ducks/tradeActive';
import {GamerAppReduxStore} from 'src/Store';

import TradesListAutoCardGames from './TradesListAutoCardGames/TradesListAutoCardGames';

import {
  ItemBottom,
  ItemBottomArrow,
  ItemBottomArrowContainer,
  ItemBottomContainer,
  ItemContainer,
  ItemTopContainer,
  ItemTopLeft,
  ItemTopLeftCity,
  ItemTopLeftCityContainer,
  ItemTopLeftCityDistance,
  ItemTopLeftName,
  ItemTopLeftTitle,
  ItemTopRight,
  ItemTopRightDate,
  ItemTopRightStars,
} from './TradesListAutoCardStyles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props extends InjectedNavigation {
  index: number;
  item: AutoTrade;
}

function TradesListAutoCard({index, item, navigation}: Props) {
  const dispatch = useDispatch();

  const [isOpened, setIsOpened] = useState(false);

  const {
    city,
    distance,
    gamer: otherName,
    gamerId: otherGamerId,
    productsForTrade,
    stars,
    state,
    autoTradeId,
    tradeViewId,
  } = item;

  const userRedux = useSelector(
    (reduxState: GamerAppReduxStore) => reduxState.user,
  );

  const {gamerId} = userRedux.user;

  const myGames = productsForTrade.filter(
    product => product.gamerId === gamerId,
  );
  const otherPartGames = productsForTrade.filter(
    game => game.gamerId === otherGamerId,
  );

  const _onPress = () => {
    dispatch(
      setActiveTrade({
        fromGamerId: gamerId,
        selectedGamerProductCatalogId: '',
        toGamerId: otherGamerId,
        autoTradeId,
        tradeViewId,
        tradeRequestId: '',
      }),
    );

    navigation.navigate('TradeRequest');
  };

  const updateLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setIsOpened(!isOpened);
  };

  const renderAdditionalInfo = () => {
    const starsArray = stars ? Array(stars).fill(true) : [true];

    return (
      <ItemTopRightStars>
        {starsArray.map(() => (
          <Image
            source={require('../../../../Assets/images/trades/star.png')}
            style={styles.star}
          />
        ))}
      </ItemTopRightStars>
    );
  };

  return (
    <ItemContainer key={`${tradeViewId} - ${index}`}>
      <TouchableOpacity activeOpacity={0.5} onPress={_onPress}>
        <ItemTopContainer>
          <ItemTopLeft>
            <ItemTopLeftTitle>{tradeViewId}</ItemTopLeftTitle>

            <ItemTopLeftName>{otherName}</ItemTopLeftName>

            <ItemTopLeftCityContainer>
              <ItemTopLeftCity>
                {city && state ? `${city}, ${state}` : ''}
              </ItemTopLeftCity>

              <ItemTopLeftCityDistance>
                {formatDistance(distance)}
              </ItemTopLeftCityDistance>
            </ItemTopLeftCityContainer>
          </ItemTopLeft>

          <ItemTopRight>
            <ItemTopRightDate />

            {renderAdditionalInfo()}
          </ItemTopRight>
        </ItemTopContainer>
      </TouchableOpacity>

      <ItemBottom>
        <ItemBottomContainer isOpened={isOpened}>
          {isOpened && (
            <>
              <TradesListAutoCardGames
                gamerName={otherName}
                games={otherPartGames}
              />

              <TradesListAutoCardGames gamerName="Você" games={myGames} />
            </>
          )}
        </ItemBottomContainer>

        <TouchableOpacity activeOpacity={0.6} onPress={updateLayout}>
          <ItemBottomArrowContainer>
            <ItemBottomArrow
              style={[
                styles.itemBottomArrow,
                isOpened && styles.itemBottomArrowOpened,
              ]}>
              >
            </ItemBottomArrow>
          </ItemBottomArrowContainer>
        </TouchableOpacity>
      </ItemBottom>
    </ItemContainer>
  );
}

const styles = StyleSheet.create({
  itemBottomArrow: {
    transform: [{rotate: '90deg'}, {scaleY: 1.9}],
  },
  itemBottomArrowOpened: {
    transform: [{rotate: '-90deg'}, {scaleY: 1.9}],
  },
  star: {
    width: 20,
    height: 20,
    marginLeft: 2,
  },
});

TradesListAutoCard.navigationOptions = () => ({
  header: null,
});

export default TradesListAutoCard;
