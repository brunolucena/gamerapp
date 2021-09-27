import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';
import CashbackBadge from '../CashbackBadge';
import {Image, Text, View} from 'react-native-ui-lib';

import {
  ItemLeft,
  ItemLeftCity,
  ItemLeftCityContainer,
  ItemLeftCityDistance,
  ItemLeftName,
  ItemLeftStars,
  ItemPlatformName,
  ItemPrice,
} from './styles';

import formatDistance from 'src/Helpers/formatDistance';
import {formatCurrency} from 'src/Helpers/formatCurrency';

interface StoreCardProps {
  actionIsBottom?: boolean;
  actionText?: string;
  backgroundColor?: string;
  cashback?: string;
  city?: string;
  containerStyle?: ViewStyle;
  image: ImageSourcePropType;
  isCard?: boolean;
  name: string;
  onPress?: Function;
  platformName?: string;
  price?: number;
  roundImage?: boolean;
  stars?: number | string;
  distance?: number;
  state?: string;
}

const StoreCard: React.SFC<StoreCardProps> = props => {
  const {
    actionIsBottom,
    actionText,
    backgroundColor,
    cashback,
    city,
    containerStyle,
    distance,
    image,
    isCard,
    name,
    onPress,
    platformName,
    price,
    roundImage,
    state,
  } = props;
  
  const starsCount = typeof props?.stars === "number" ? props.stars : parseInt(props.stars || "5");

  const stars = props.stars ? Array(parseInt(String(starsCount))).fill(true) : [];

  const handleOnPress = () => {
    if (onPress) {
      onPress();
    }
  };

  const hasActionBottomText = !!actionText && actionIsBottom;

  return (
    <TouchableOpacity activeOpacity={onPress ? 0.6 : 1} onPress={handleOnPress}>
      <View
        style={[
          styles.itemContainer,
          isCard && styles.card,
          containerStyle,
          {backgroundColor},
        ]}>
        {cashback && (
          <View style={styles.cashbackContainer}>
            <CashbackBadge>6%</CashbackBadge>
          </View>
        )}

        <View
          marginR-15
          style={[
            styles.imageContainer,
            roundImage && styles.imageContainerRound,
          ]}>
          <Image
            resizeMode="contain"
            source={image}
            style={[styles.imageAvatar, roundImage && styles.round]}
          />
        </View>

        <View flex spread row centerV>
          <ItemLeft>
            {stars.length > 0 && (
              <ItemLeftStars>
                {stars.map((star, index) => (
                  <Image
                    source={require('../../Assets/images/trades/star-green.png')}
                    style={styles.star}
                    key={`${index}`}
                  />
                ))}

                <Text dark20 marginL-5>{starsCount}</Text>
              </ItemLeftStars>
            )}

            <ItemLeftName>{name}</ItemLeftName>

            <View row>
              {price && <ItemPrice>{formatCurrency(price)} - </ItemPrice>}

              {platformName && (
                <ItemPlatformName>{platformName}</ItemPlatformName>
              )}
            </View>

            {(!!city || !!state || !!distance) && (
              <ItemLeftCityContainer>
                <ItemLeftCity>
                  {city}
                  {city && state ? ', ' : ''}
                  {state}
                </ItemLeftCity>

                {distance && (
                  <ItemLeftCityDistance>
                    {formatDistance(distance)}
                  </ItemLeftCityDistance>
                )}
              </ItemLeftCityContainer>
            )}

            {hasActionBottomText && (
              <View marginT-2>
                <Text style={styles.link}>{actionText || ""}</Text>
              </View>
            )}
          </ItemLeft>

          {actionText && !actionIsBottom && (
            <View marginH-20>
              <Text style={styles.link}>{actionText}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: '#1563ce',
  },
  cashbackContainer: {position: 'absolute', top: 0, right: 0},
  card: {
    marginHorizontal: 5,
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 9,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  imageAvatar: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  imageContainerRound: {
    borderRadius: 20,
    backgroundColor: '#dddddd',
  },
  round: {
    borderRadius: 20,
  },
  star: {width: 14, height: 14, marginRight: 3},
});

export default StoreCard;
