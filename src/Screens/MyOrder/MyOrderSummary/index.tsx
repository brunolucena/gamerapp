import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {GamerAppReduxStore} from 'src/Store';
import {getMyOrderSummary} from 'src/Store/Ducks/myOrderDuck';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import MyListItem from 'src/Components/MyListItem';
import {formatAddressMyOrder} from 'src/Helpers/formatters';
import StoreCard from 'src/Components/StoreCard';
import {formatCurrency} from 'src/Helpers/formatCurrency';

const MyOrderSummary = () => {
  const dispatch = useDispatch();

  const {myOrder} = useSelector((state: GamerAppReduxStore) => state);

  const {activeMyOrderId, loading, myOrderSummary} = myOrder;

  const {address, price, products, store} = myOrderSummary;

  useEffect(() => {
    dispatch(getMyOrderSummary({myOrderId: activeMyOrderId}));
  }, [activeMyOrderId, dispatch]);

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
          title={formatAddressMyOrder(address)}
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
          <Text dark40>{formatCurrency(price.amount)}</Text>
        </View>

        <View row spread centerV>
          <View row centerV>
            <Text dark40 marginR-5>
              Entrega / SEDEX 6 dias
            </Text>
          </View>
          <Text dark40>{formatCurrency(price.shipping)}</Text>
        </View>

        <View row spread centerV marginT-10>
          <Text text60>Total</Text>
          <Text text60>{formatCurrency(price.finalPrice)}</Text>
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
            storeProductId: id,
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

  function renderSeller() {
    return (
      <View style={styles.cardWrapper} paddingT-9>
        <StoreCard
          actionText=" "
          containerStyle={styles.storeCard}
          image={{uri: store.imageUrl || ''}}
          name={store.corporateName}
          stars={store.stars || 0}
          city={store.city}
          state={store.state}
          backgroundColor="#ffffff"
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text marginH-20 text60>
          Resumo da Compra
        </Text>

        {renderAddress()}
        {renderSeller()}
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
  titleStyle: {
    color: '#383838',
    fontSize: 15,
  },
});

export default MyOrderSummary;
