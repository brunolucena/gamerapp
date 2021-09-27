import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LayoutAnimation, Platform, StyleSheet, UIManager} from 'react-native';
import {Image} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-gesture-handler';

import formatDate from '../../../../Helpers/formatDate';
import formatDistance from '../../../../Helpers/formatDistance';

import {TradesRequestListItem} from '../../../../Models/TradeRequest';
import {setActiveTrade} from 'src/Store/Ducks/tradeActive';

import TradesListCardGames from './TradesListCardGames/TradesListCardGames';

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
  ItemTopRightTextPrimary,
  ItemTopRightTextSecondary,
  ItemTopRightTextWithImageContainer,
} from './TradesListCardStyles';
import {useNavigation} from '@react-navigation/native';
import { GamerAppReduxStore } from 'src/Store';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  item: TradesRequestListItem;
}

function TradesListCard({item}: Props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isOpened, setIsOpened] = useState(false);

  const {
    city,
    date,
    distance,
    gamerParts,
    state,
    tradeRequesItens,
    tradeRequestId,
    tradeViewId,
  } = item;

  const userRedux = useSelector((state: GamerAppReduxStore) => state.user);

  const {gamerId} = userRedux.user;

  const me = gamerParts.find(gamer => gamer.gamerId === gamerId);
  const myGames = tradeRequesItens.filter(item => item.ownerId === gamerId);

  const other = gamerParts.find(gamer => gamer.gamerId !== gamerId);
  const otherPartGames = tradeRequesItens.filter(
    item => item.ownerId !== gamerId,
  );

  const _onPress = () => {
    dispatch(
      setActiveTrade({
        autoTradeId: '',
        fromGamerId: gamerId,
        selectedGamerProductCatalogId: '',
        toGamerId: other?.gamerId || '',
        tradeRequestId,
        tradeViewId,
      }),
    );

    navigation.navigate('TradeRequest');
  };

  const updateLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    setIsOpened(!isOpened);
  };

  const renderAdditionalInfo = () => {
    const iStarted = me ? me.starter : false;

    if (iStarted) {
      return (
        <ItemTopRightTextWithImageContainer>
          <Image
            source={require('../../../../Assets/images/trade/change.png')}
            style={{height: 20, width: 20}}
          />

          <ItemTopRightTextSecondary>Enviado</ItemTopRightTextSecondary>
        </ItemTopRightTextWithImageContainer>
      );
    } else {
      return (
        <ItemTopRightTextWithImageContainer>
          <Image
            source={require('../../../../Assets/images/trade/confirm.png')}
            style={{height: 20, width: 20}}
          />

          <ItemTopRightTextPrimary>Recebido</ItemTopRightTextPrimary>
        </ItemTopRightTextWithImageContainer>
      );
    }
  };

  return (
    <ItemContainer>
      <TouchableOpacity activeOpacity={0.5} onPress={_onPress}>
        <ItemTopContainer>
          <ItemTopLeft>
            <ItemTopLeftTitle>Negociação {tradeViewId}</ItemTopLeftTitle>

            <ItemTopLeftName>{other?.name}</ItemTopLeftName>

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
            <ItemTopRightDate>{formatDate(date)}</ItemTopRightDate>

            {renderAdditionalInfo()}
          </ItemTopRight>
        </ItemTopContainer>
      </TouchableOpacity>

      <ItemBottom>
        <ItemBottomContainer isOpened={isOpened}>
          {isOpened && (
            <>
              <TradesListCardGames
                gamerName={other?.name || ''}
                games={otherPartGames}
                offeredPrice={other?.offeredPrice || 0}
              />

              <TradesListCardGames
                gamerName="Você"
                games={myGames}
                offeredPrice={me?.offeredPrice || 0}
              />
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

export default TradesListCard;
