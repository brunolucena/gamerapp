import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {GamerAppReduxStore} from 'src/Store';
import SellerItemListItem from './SellerItemListItem';
import Soldier from 'src/Components/EmptyScreens/Soldier/Soldier';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import MyButton from 'src/Components/Button';
import {
  getStoreOrders,
  selectProductsFromStoreOrder,
  selectStoreOrdersHasNextPage,
  setStoreOrderData,
} from 'src/Store/Ducks/storeOrdersDuck';
import {MyOrderInfo} from 'src/Models/StoreOrder';
import {getCustomerAccount} from 'src/Store/Ducks/customerAccountDuck';

const SellerSells = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {customerAccount, storeOrders, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {amount, toDebit, toReceive} = customerAccount;
  const {myOrders, page, refreshing, selectedStatusId} = storeOrders;
  const {gamerId} = user.user;

  const loading = storeOrders.loading || customerAccount.loading;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getStoreOrders({page: 1, statusId: null, storeId: gamerId}));
    }, [dispatch, gamerId]),
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getCustomerAccount({customerId: gamerId}));
    }, [dispatch, gamerId]),
  );

  function _keyExtractor(item: MyOrderInfo) {
    return `${item.myOrderId}`;
  }

  function handleNextPage() {
    const hasNextPage = selectStoreOrdersHasNextPage(storeOrders);

    if (hasNextPage) {
      dispatch(
        getStoreOrders({
          page: page + 1,
          statusId: selectedStatusId,
          storeId: gamerId,
        }),
      );
    }
  }

  function handlePressFazerSaque() {
    navigation.navigate('Adm', {screen: 'FazerSaque'});
  }

  const onRefresh = useCallback(() => {
    dispatch(
      getStoreOrders(
        {
          page: 1,
          statusId: null,
          storeId: gamerId,
        },
        true,
      ),
    );
  }, [dispatch, gamerId]);

  function _onPress(item: MyOrderInfo) {
    dispatch(setStoreOrderData({activeStoreOrder: item}));

    navigation.navigate('StoreOrder', {screen: 'StoreOrderDetails'});
  }

  function _renderItem({item}: {item: MyOrderInfo}) {
    function handleOnPress() {
      _onPress(item);
    }

    const products = selectProductsFromStoreOrder(storeOrders, item.myOrderId);

    return (
      <TouchableOpacity onPress={handleOnPress}>
        <View style={styles.card}>
          <SellerItemListItem item={item} products={products} />
        </View>
      </TouchableOpacity>
    );
  }

  function renderEmptyContent() {
    return (
      <View margin-20>
        {!loading && <Soldier text="Você ainda não tem pedidos." />}
      </View>
    );
  }

  function renderFooter() {
    return <CustomActivityIndicator isVisible={loading || refreshing} />;
  }

  function _renderHeader() {
    return (
      <View marginB-15>
        <View row centerV spread>
          <View paddingL-10>
            <Text dark20 text80>
              Saldo
            </Text>

            <Text dark10 text60>
              {formatCurrency(amount)}
            </Text>

            <Text dark40>{formatCurrency(toReceive)} A receber</Text>
            <Text dark40>{formatCurrency(toDebit)} A debitar</Text>
          </View>

          <View>
            <MyButton
              disabled={amount === 0}
              label="Fazer saque"
              onPress={handlePressFazerSaque}
              size="medium"
              type="secondary"
            />
          </View>
        </View>

        <View style={styles.header1}>
          <Text dark20 text70>
            Gestão dos pedidos
          </Text>
        </View>
      </View>
    );
  }

  function renderList() {
    return (
      <FlatList
        ListHeaderComponent={_renderHeader}
        ListEmptyComponent={renderEmptyContent}
        ListFooterComponent={renderFooter}
        data={myOrders}
        keyExtractor={_keyExtractor}
        onEndReached={handleNextPage}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={_renderItem}
      />
    );
  }

  return (
    <View style={styles.container}>
      {renderList()}

      <CustomActivityIndicator isVisible={loading || refreshing} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 7,
    marginHorizontal: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  header1: {
    marginTop: 12,
    paddingTop: 12,
    paddingLeft: 12,
    paddingBottom: 10,
    borderTopColor: '#efefef',
    borderTopWidth: 2,
  },
});

export default SellerSells;
