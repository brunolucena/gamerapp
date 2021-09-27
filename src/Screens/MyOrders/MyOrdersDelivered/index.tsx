import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import {GamerAppReduxStore} from 'src/Store';
import {MyOrderItem} from 'src/Models/MyOrder';
import MyOrderItemListItem from '../MyOrderItemListItem';
import {
  getMyOrdersDelivered,
  selectProductsFromMyOrder,
} from 'src/Store/Ducks/myOrdersListDuck';
import Soldier from 'src/Components/EmptyScreens/Soldier/Soldier';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import {setActiveMyOrderId} from 'src/Store/Ducks/myOrderDuck';

const MyOrdersDelivered = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {myOrderList, user} = useSelector((state: GamerAppReduxStore) => state);

  const {loading, myOrdersDelivered: myOrders} = myOrderList;
  const {gamerId} = user.user;

  useEffect(() => {
    dispatch(getMyOrdersDelivered({finishedOnly: true, gamerId}));
  }, [dispatch, gamerId]);

  function _keyExtractor(item: MyOrderItem) {
    return `${item.myOrderId}`;
  }

  function _onPress(item: MyOrderItem) {
    dispatch(setActiveMyOrderId(item.myOrderId));
    navigation.navigate('MyOrder', {screen: 'MyOrderDetails'});
  }

  function _renderItem({item}: {item: MyOrderItem}) {
    function handleOnPress() {
      _onPress(item);
    }

    const products = selectProductsFromMyOrder(
      myOrderList,
      item.myOrderId,
      'pending',
    );

    return (
      <TouchableOpacity onPress={handleOnPress}>
        <View style={styles.card}>
          <MyOrderItemListItem item={item} products={products} />
        </View>
      </TouchableOpacity>
    );
  }

  function renderEmptyContent() {
    return (
      <View margin-20>
        {!loading && <Soldier text="Ops, você não tem compras entregues." />}
      </View>
    );
  }

  function renderList() {
    return (
      <FlatList
        data={myOrders}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    );
  }

  return (
    <View style={styles.container}>
      {myOrders.length === 0 ? renderEmptyContent() : renderList()}
      <CustomActivityIndicator isVisible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});

export default MyOrdersDelivered;
