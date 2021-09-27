import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {
  MyOrderDetails,
  MyOrderItem,
  MyOrderProductItem,
} from 'src/Models/MyOrder';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import formatDate from 'src/Helpers/formatDate';

interface Props {
  details: MyOrderDetails;
  item: MyOrderItem;
  products: MyOrderProductItem[];
}

const MyOrderDetailsListItem: React.FC<Props> = props => {
  const {details, item, products} = props;

  const {date, price, viewId} = item;

  return (
    <View row centerV>
      <View>
        <Image source={{uri: products[0]?.imageUrl}} style={styles.image} />
      </View>

      <View flex marginL-20>
        <View row centerV spread>
          <Text dark30 text80>
            Venda #{viewId}
          </Text>

          <Text dark30 text80>
            {products.length} produto{products.length > 1 && 's'}
          </Text>
        </View>

        <Text dark20 text80>
          {products[0]?.name}{' '}
          {products.length > 1 && `+ ${products.length - 1}`}
        </Text>

        <Text dark20 text60 marginV-2 style={styles.bold}>
          {formatCurrency(price)}
        </Text>

        <Text dark30 text90>
          {formatDate(date)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: '600',
  },
  image: {
    height: 80,
    width: 70,
    resizeMode: 'contain',
  },
});

export default MyOrderDetailsListItem;
