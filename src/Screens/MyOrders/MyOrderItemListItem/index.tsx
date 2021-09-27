import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {MyOrderItem, MyOrderProductItem} from 'src/Models/MyOrder';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import formatDate from 'src/Helpers/formatDate';
import { MyColors } from 'src/Theme/FoundationConfig';

interface Props {
  item: MyOrderItem;
  products: MyOrderProductItem[];
}

const MyOrderItemListItem: React.FC<Props> = props => {
  const {item, products} = props;

  const {date, price, status, statusId, viewId} = item;

  return (
    <View row centerV>
      <View>
        <Image source={{uri: products[0]?.imageUrl}} style={styles.image} />
      </View>

      <View flex marginL-20>
        <Text style={[styles.status, statusId === "0" && styles.canceled]}>
          {status}
        </Text>

        <View row centerV spread>
          <Text dark30 text80>
            Pedido #{viewId}
          </Text>

          <Text dark30 text80>
            {products.length} produto{products.length > 1 && 's'}
          </Text>
        </View>

        <Text dark20 text80>
          {products[0]?.name} {products.length > 1 && `+ ${products.length - 1}`}
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
  canceled: {
    color: MyColors.warn,
  },
  image: {
    height: 80,
    width: 70,
    resizeMode: 'contain',
  },
  status: {
    color: '#0b8b31',
  },
});

export default MyOrderItemListItem;
