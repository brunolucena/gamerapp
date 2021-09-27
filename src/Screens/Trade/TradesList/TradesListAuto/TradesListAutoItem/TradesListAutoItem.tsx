import React, {useState} from 'react';
import {LayoutAnimation, StyleSheet, Platform, UIManager} from 'react-native';
import {Image} from 'react-native-ui-lib';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {GamerProductCatalog} from '../../../../../Models/Product';
import {InjectedNavigation} from '../../../../../Models/Utils';
import {TradesRequestListItem} from '../../../../../Models/TradeRequest';

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
} from './TradesListAutoItemStyles';

import TradesListAutoItemGames from './TradesListAutoItemGames/TradesListAutoItemGames';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props extends InjectedNavigation {
  item: TradesRequestListItem;
}

function TradesListAutoItem({item, navigation}: Props) {
  // const [isOpened, setIsOpened] = useState(false);

  // const formatDate = (date: Date) => {
  //   if (!date) {
  //     return '';
  //   }

  //   const dateObject = new Date(date);

  //   return dateObject.toLocaleDateString();
  // };

  // const _onPress = () => {
  //   navigation.navigate({
  //     routeName: 'TradeRequest',
  //     params: {
  //       tradeRequest: {
  //         tradeRequestId: '1',
  //         toGamerId: '1',
  //       },
  //     },
  //   });
  // };

  // const updateLayout = () => {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  //   setIsOpened(!isOpened);
  // };

  // const stars = item.stars ? Array(item.stars).fill(true) : [true];

  // let myGames: GamerProductCatalog[] = [];
  // let otherPartGames: GamerProductCatalog[] = [];

  // if (item.tradeRequestItems) {
  //   myGames = item.tradeRequestItems.filter(
  //     game => game.ownerId !== item.toGamerId,
  //   );

  //   otherPartGames = item.tradeRequestItems.filter(
  //     game => game.ownerId === item.toGamerId,
  //   );
  // }

  return (
    <ItemContainer>
      {/* <TouchableWithoutFeedback onPress={_onPress}>
        <ItemTopContainer>
          <ItemTopLeft>
            <ItemTopLeftTitle>
              Auto #{item.tradeRequestNumberId}
            </ItemTopLeftTitle>

            <ItemTopLeftName>{item.toGamerName}</ItemTopLeftName>

            <ItemTopLeftCityContainer>
              <ItemTopLeftCity>
                {item.city}, {item.state}
              </ItemTopLeftCity>

              <ItemTopLeftCityDistance>{item.distance}</ItemTopLeftCityDistance>
            </ItemTopLeftCityContainer>
          </ItemTopLeft>

          <ItemTopRight>
            <ItemTopRightDate>{formatDate(item.date)}</ItemTopRightDate>

            <ItemTopRightStars>
              {stars.map(() => (
                <Image
                  source={require('../../../../../Assets/images/trades/star.png')}
                />
              ))}
            </ItemTopRightStars>
          </ItemTopRight>
        </ItemTopContainer>
      </TouchableWithoutFeedback>

      <ItemBottom>
        <ItemBottomContainer isOpened={isOpened}>
          <TradesListAutoItemGames
            gamerName={item.toGamerName}
            games={otherPartGames}
            navigation={navigation}
          />

          <TradesListAutoItemGames
            gamerName="Você"
            games={myGames}
            navigation={navigation}
          />
        </ItemBottomContainer>

        <TouchableWithoutFeedback onPress={updateLayout}>
          <ItemBottomArrowContainer>
            <ItemBottomArrow
              style={[
                styles.itemBottomArrow,
                isOpened && styles.itemBottomArrowOpened,
              ]}>
              >
            </ItemBottomArrow>
          </ItemBottomArrowContainer>
        </TouchableWithoutFeedback>
      </ItemBottom> */}
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
});

TradesListAutoItem.navigationOptions = () => ({
  header: null,
});
export default TradesListAutoItem;
