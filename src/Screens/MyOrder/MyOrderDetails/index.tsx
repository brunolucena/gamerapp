import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Linking, ScrollView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GamerAppReduxStore} from 'src/Store';
import {getMyOrderDetails} from 'src/Store/Ducks/myOrderDuck';
import MyOrderDetailsListItem from '../MyOrderDetailsListItem';
import {
  selectMyOrderItemFromId,
  selectProductsFromMyOrder,
} from 'src/Store/Ducks/myOrdersListDuck';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import MyButton from 'src/Components/Button';
import MyListItem from 'src/Components/MyListItem';
import formatDate from 'src/Helpers/formatDate';
import {setPosTradeId} from 'src/Store/Ducks/tradeDetails';
import {GAMERAPP_WHATSAPP_URL} from 'src/Helpers/consts';
import {MyColors} from 'src/Theme/FoundationConfig';

const MyOrderDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {myOrder, myOrderList, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {activeMyOrderId, loading, myOrderDetails} = myOrder;
  const {gamerId} = user.user;

  const {postedAt, postOfficeCode, status, statusId} = myOrderDetails;

  const myOrderListItem = selectMyOrderItemFromId(myOrderList, activeMyOrderId);
  const products = selectProductsFromMyOrder(myOrderList, activeMyOrderId);

  useEffect(() => {
    dispatch(getMyOrderDetails({gamerId, myOrderId: activeMyOrderId}));
  }, [activeMyOrderId, dispatch, gamerId]);

  // function handleConfirmReceivePress() {
  //   console.log('confirmReceivePress');
  // }

  function handleHadAProblem() {
    Linking.openURL(GAMERAPP_WHATSAPP_URL);
  }

  function handlePressChat() {
    dispatch(setPosTradeId(activeMyOrderId));
    navigation.navigate('Chat');
  }

  function handlePressStatus() {
    navigation.navigate('MyOrderStatus');
  }

  function handlePressSummary() {
    navigation.navigate('MyOrderSummary');
  }

  function renderStatus() {
    return (
      <View row>
        <MaterialCommunityIcons name="truck-fast" size={50} color="#0b8b31" />

        <View marginL-15>
          <Text style={[styles.status, statusId === 0 && styles.canceled]}>
            {status}
          </Text>

          {postedAt && (
            <Text style={styles.postedAt}>
              Despachado em {formatDate(postedAt)}
            </Text>
          )}

          {!!postOfficeCode && (
            <Text style={styles.postOfficeCode}>
              Código rastreio: {postOfficeCode ? postOfficeCode : ''}
            </Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <MyOrderDetailsListItem
            details={myOrderDetails}
            item={myOrderListItem}
            products={products}
          />
        </View>

        <View marginT-20 style={styles.itemContainer}>
          <View row centerV spread paddingH-10>
            <Text text70 dark10>
              Último status
            </Text>

            <MyButton
              clear
              label="Ver todos"
              type="secondary"
              onPress={handlePressStatus}
            />
          </View>

          <MyListItem
            arrowColor="#434343"
            leftElement={renderStatus()}
            onPress={handlePressStatus}
            title=""
          />

          <MyListItem
            arrowColor="#434343"
            subtitle="Veja mais informações da sua compra"
            title="Resumo da compra"
            onPress={handlePressSummary}
          />

          <MyListItem
            arrowColor="#434343"
            subtitle="Converse direto com o vendedor, se precisar"
            title="Chat com vendedor"
            onPress={handlePressChat}
          />
        </View>

        <View centerH marginT-20>
          {/* <TouchableOpacity onPress={handleConfirmReceivePress}>
            <View style={styles.card}>
              <Image
                source={require('../../../Assets/images/trade/checked.png')}
                style={styles.image}
              />

              <View marginH-20>
                <Text dark20 text60>
                  Já recebi o produto! =)
                </Text>

                <Text dark30 text80>
                  Confirme o recebimento do pedido
                </Text>
              </View>

              <View />
            </View>
          </TouchableOpacity> */}

          <View row marginT-12>
            <MyButton
              clear
              onPress={handleHadAProblem}
              label="Tive um problema"
              labelStyle={styles.buttonLabelStyle}
              style={styles.buttonStyle}
              type="black">
              <View marginT-3>
                <MaterialCommunityIcons
                  color="#a3a3a3"
                  name="chevron-right"
                  size={24}
                />
              </View>
            </MyButton>
          </View>
        </View>

        <CustomActivityIndicator isVisible={loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonLabelStyle: {
    color: '#848484',
  },
  buttonStyle: {
    flexDirection: 'row-reverse',
  },
  canceled: {
    color: MyColors.warn,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ffffff',
    borderColor: '#e6e6e6',
    borderWidth: 1,
    borderRadius: 9,
  },
  container: {
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  image: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  itemContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  postedAt: {
    marginTop: 1,
    marginBottom: 3,
    color: '#696969',
    fontSize: 12,
  },
  postOfficeCode: {
    backgroundColor: '#eaeaea',
    paddingVertical: 2,
    paddingHorizontal: 5,
    color: '#0b0b0b',
    fontSize: 12,
  },
  status: {
    color: '#0b8b31',
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

export default MyOrderDetails;
