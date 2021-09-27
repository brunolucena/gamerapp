import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';

import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import getColorByPlatform from 'src/Helpers/getColorByPlatform';

interface Props {
  hasOfferPrice?: boolean;
  hasPrice?: boolean;
}

const ProductCard: React.FC<Props> = props => {
  const {hasPrice} = props;

  const {
    addProductFrom,
    offerPrice,
    price,
    selectedProductCollection,
    selectedProductNew,
  } = useSelector((state: GamerAppReduxStore) => state.sellerAddProduct);

  const hasOfferPrice = props.hasOfferPrice && !!offerPrice;

  let imageUrl = '';
  let name = '';
  let platformName = '';

  if (addProductFrom === 'collection') {
    imageUrl = selectedProductCollection.productImageUrl;
    name = selectedProductCollection.productName;
    platformName = selectedProductCollection.platform;
  } else if (addProductFrom === 'new') {
    imageUrl = selectedProductNew.imageUrl;
    name = selectedProductNew.name;
  }

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

        {!!platformName && (
          <Text style={{color: getColorByPlatform(platformName, '#2a2a2a')}}>
            {platformName}
          </Text>
        )}

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
