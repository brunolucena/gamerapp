import React from 'react';
import {StyleSheet, ImageSourcePropType} from 'react-native';
import {Image, Text} from 'react-native-ui-lib';

import {formatCurrency} from 'src/Helpers/formatCurrency';

interface ProductListItemProps {
  cashback?: string;
  forTrade?: boolean;
  hasButton?: boolean;
  hasDelivery?: boolean;
  image: ImageSourcePropType;
  loading?: boolean;
  oldPrice?: number;
  onButtonPress?: Function;
  onStartTrade?: Function;
  price: number;
  subtitle: string;
  title: string;
}

import {View} from 'react-native-ui-lib';
import CashbackBadge from '../CashbackBadge';
import MyButton from '../Button';
import getColorByPlatform from 'src/Helpers/getColorByPlatform';

const ProductListItem: React.SFC<ProductListItemProps> = props => {
  const {
    cashback,
    forTrade,
    hasButton,
    hasDelivery,
    image,
    loading,
    oldPrice,
    onButtonPress,
    onStartTrade,
    price,
    subtitle,
    title,
  } = props;

  function handleOnButtonPress() {
    if (onButtonPress) {
      onButtonPress();
    }
  }

  function handleStartTrade() {
    if (onStartTrade) {
      onStartTrade();
    }
  }

  return (
    <View bg-white paddingH-10 paddingV-15>
      <View row centerV marginB-20>
        <View>
          <Image resizeMode="contain" source={image} style={styles.image} />
        </View>

        <View marginL-5 style={styles.wrap}>
          <View>
            <Text
              text70
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {title}
            </Text>

            <Text
              style={{color: getColorByPlatform(subtitle, '#848484')}}
              text90>
              {subtitle}
            </Text>
          </View>

          <View marginT-10 flex row spread bottom>
            <View>
              {(oldPrice || 0) > 0 && (
                <Text dark50 style={styles.lineThrough}>
                  {formatCurrency(oldPrice || 0)}
                </Text>
              )}

              <Text text50>{formatCurrency(price)}</Text>
            </View>

            <View row centerV marginL-20>
              {hasDelivery && (
                <Image
                  source={require('../../Assets/images/delivery-truck.png')}
                  style={styles.truck}
                />
              )}

              {!!cashback && <CashbackBadge>{cashback}</CashbackBadge>}
            </View>
          </View>
        </View>
      </View>

      <View>
        {hasButton && (
          <MyButton
            disabled={loading}
            label="Adicionar ao carrinho"
            onPress={handleOnButtonPress}
            type="secondary"
          />
        )}

        {forTrade && (
          <MyButton
            disabled={loading}
            label="Iniciar troca"
            onPress={handleStartTrade}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {width: 100, height: 100, resizeMode: 'contain'},
  lineThrough: {textDecorationLine: 'line-through'},
  truck: {width: 40, height: 23, marginRight: 10},
  wrap: {flexShrink: 1},
});

export default ProductListItem;
