import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {GamerAppReduxStore} from 'src/Store';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import MyListItem from 'src/Components/MyListItem';
import {formatAddressStoreMyOrder} from 'src/Helpers/formatters';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import {getSellerMyOrderDetails} from 'src/Store/Ducks/sellerOrderDuck';

const StoreOrderSummary = () => {
  const dispatch = useDispatch();

  const {user, sellerOrder, storeOrders} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {loading, sellerMyOrderDetails} = sellerOrder;
  const {activeStoreOrder} = storeOrders;
  const {gamerId} = user.user;

  const {deliveryAddress, gamer, price, products} = sellerMyOrderDetails;

  useEffect(() => {
    dispatch(
      getSellerMyOrderDetails({
        storeId: gamerId,
        myOrderId: activeStoreOrder.myOrderId,
      }),
    );
  }, [activeStoreOrder.myOrderId, dispatch, gamerId]);

  function renderAddress() {
    return (
      <View style={styles.cardWrapper} marginT-20>
        <Text marginL-17 marginB-3 marginV-10 dark20>
          Endereço de entrega
        </Text>

        <MyListItem
          containerStyle={styles.card}
          hideArrow
          leftAvatar={require('../../../Assets/images/localization.png')}
          leftAvatarRound={false}
          title={formatAddressStoreMyOrder(deliveryAddress)}
          titleStyle={styles.titleStyle}
          subtitle={undefined}
          subtitleTop
        />
      </View>
    );
  }

  function renderPrice() {
    return (
      <View bg-white marginT-1 paddingH-20 paddingV-17>
        <View row spread centerV>
          <Text dark40>Subtotal</Text>
          <Text dark40>{formatCurrency(price.subTotal)}</Text>
        </View>

        <View row spread centerV>
          <Text dark40 marginR-5>
            {price.postOfficeInfo}
          </Text>
          <Text dark40>{formatCurrency(price.postOffice)}</Text>
        </View>

        <View row spread centerV>
          <Text dark40>{price.taxInfo}</Text>
          <Text red40>-{formatCurrency(price.tax)}</Text>
        </View>

        <View row spread centerV marginT-10>
          <Text text70 style={styles.textPrimary}>
            Líquido a receber
          </Text>
          <Text text70 style={styles.textPrimary}>
            {formatCurrency(price.liquidAmount)}
          </Text>
        </View>
      </View>
    );
  }

  function renderProduct({
    name,
    productPrice,
    platform,
    id,
  }: {
    name: string;
    productPrice: number;
    platform: string;
    id: string;
  }) {
    return (
      <View key={id} bg-white paddingV-12 paddingH-20 row spread centerV>
        <View>
          <Text text70>{name}</Text>
          <Text dark40>{platform}</Text>
        </View>

        <Text text60>{formatCurrency(productPrice)}</Text>
      </View>
    );
  }

  function renderProducts() {
    return (
      <View marginT-1>
        {products.map(product => {
          const {
            platformName: platform,
            price: productPrice,
            productName: name,
            productId: id,
          } = product;

          return renderProduct({
            name,
            productPrice,
            platform,
            id,
          });
        })}
      </View>
    );
  }

  function renderBuyer() {
    return (
      <View style={styles.cardWrapper} paddingT-2 paddingB-10>
        <Text marginL-17 marginB-3 marginV-10 dark20>
          Comprador
        </Text>

        <Text marginL-17 marginB-3 dark20 text70>
          {gamer.name}
        </Text>

        <Text marginL-17 marginB-3 dark40>
          CPF/CNPJ: {gamer.document}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text marginH-20 text60>
          Detalhe do pedido
        </Text>

        {renderAddress()}
        {renderBuyer()}
        {renderProducts()}
        {renderPrice()}

        <CustomActivityIndicator isVisible={loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 0,
    paddingTop: 4,
    paddingBottom: 10,
  },
  cardWrapper: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 40,
    backgroundColor: '#f2f2f2',
  },
  storeCard: {
    paddingVertical: 1,
    paddingHorizontal: 5,
  },
  textPrimary: {
    color: '#42b063',
  },
  titleStyle: {
    color: '#383838',
    fontSize: 15,
  },
});

export default StoreOrderSummary;
