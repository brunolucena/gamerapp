import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';

import {MyColors} from 'src/Theme/FoundationConfig';
import {formatCurrency} from 'src/Helpers/formatCurrency';

interface Props {
  hasOfferPrice?: boolean;
  hasPrice?: boolean;
  imageUrl: string;
  name: string;
  offerPrice: number;
  platformName: string;
  price: number;
}

const ProductCard: React.FC<Props> = props => {
  const {hasPrice, imageUrl, name, offerPrice, platformName, price} = props;

  const hasOfferPrice = props.hasOfferPrice && !!offerPrice;

  const hasPrices = hasPrice || hasOfferPrice;

  return (
    <View style={styles.wrapper}>
      <View>
        <Image source={{uri: imageUrl}} style={styles.image} />
      </View>

      <View marginL-15>
        <Text dark30 text60 style={styles.name}>
          {name}
        </Text>

        {!!platformName && <Text style={styles.platform}>{platformName}</Text>}

        {hasPrices && (
          <View row centerV marginT-8>
            {hasPrice && (
              <Text
                style={[
                  styles.textPrice,
                  hasOfferPrice && styles.textPriceLineThrough,
                ]}>
                {formatCurrency(price)}
              </Text>
            )}
            {hasOfferPrice && (
              <Text marginL-12 style={styles.textPrice}>
                {formatCurrency(offerPrice)}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 80,
    resizeMode: 'contain',
  },
  name: {
    maxWidth: 200,
  },
  platform: {
    color: MyColors.secondary,
  },
  textPrice: {
    color: '#262626',
    fontSize: 18,
  },
  textPriceLineThrough: {
    color: '#a5a5a5',
    textDecorationLine: 'line-through',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: '#ffffff',
  },
});

export default ProductCard;
