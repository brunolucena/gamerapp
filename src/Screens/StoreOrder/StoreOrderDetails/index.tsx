import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Linking, ScrollView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GamerAppReduxStore} from 'src/Store';
import StoreOrderDetailsListItem from '../StoreOrderDetailsListItem';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import MyButton from 'src/Components/Button';
import MyListItem from 'src/Components/MyListItem';
import {
  selectProductsFromStoreOrder,
  selectStoreOrderItemFromId,
} from 'src/Store/Ducks/storeOrdersDuck';
import {
  changeMyOrderStatus,
  getSellerMyOrderSummary,
} from 'src/Store/Ducks/sellerOrderDuck';
import {setPosTradeId} from 'src/Store/Ducks/tradeDetails';
import {MyColors} from 'src/Theme/FoundationConfig';
import {GAMERAPP_WHATSAPP_URL} from 'src/Helpers/consts';

const StoreOrderDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [opened, setOpened] = useState(false);

  const {sellerOrder, storeOrders, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {loading, sellerMyOrderDetails, sellerMyOrderSummary} = sellerOrder;
  const {activeStoreOrder} = storeOrders;

  const {
    nextStatus,
    nextStatusId,
    postOfficeCode,
    status,
    statusId,
  } = sellerMyOrderSummary;

  const {gamerId} = user.user;

  const myOrderListItem = selectStoreOrderItemFromId(
    storeOrders,
    activeStoreOrder.myOrderId,
  );
  const products = selectProductsFromStoreOrder(
    storeOrders,
    activeStoreOrder.myOrderId,
  );

  useEffect(() => {
    dispatch(
      getSellerMyOrderSummary({
        myOrderId: activeStoreOrder.myOrderId,
        storeId: gamerId,
      }),
    );
  }, [activeStoreOrder.myOrderId, dispatch, gamerId]);

  /**
   * Cancela o pedido.
   */
  function handleCancelOrder() {
    dispatch(
      changeMyOrderStatus({
        auxiliarId: '',
        myOrderId: activeStoreOrder.myOrderId,
        statusId: 0,
        storeId: gamerId,
      }),
    );
  }

  function handleCloseModal() {
    setOpened(false);
  }

  function handleEnviarEtiqueta() {
    console.log('handleEnviarEtiqueta');
  }

  function handleHadAProblem() {
    Linking.openURL(GAMERAPP_WHATSAPP_URL);
  }

  function handlePressCancelar() {
    setOpened(true);
  }

  function handlePressChangeStatus() {
    dispatch(
      changeMyOrderStatus({
        auxiliarId: '',
        myOrderId: activeStoreOrder.myOrderId,
        statusId: nextStatusId,
        storeId: gamerId,
      }),
    );
  }

  function handlePressChat() {
    dispatch(setPosTradeId(activeStoreOrder.myOrderId));
    navigation.navigate('Chat');
  }

  function handlePressStatus() {
    navigation.navigate('StoreOrderStatus');
  }

  function handlePressSummary() {
    navigation.navigate('StoreOrderSummary');
  }

  function renderStatus() {
    return (
      <View row>
        <MaterialCommunityIcons name="truck-fast" size={50} color="#0b8b31" />

        <View marginL-15>
          <Text style={[styles.status, statusId === '0' && styles.canceled]}>
            {status}
          </Text>

          {/* {postedAt && (
            <Text style={styles.postedAt}>
              Despachado em {formatDate(postedAt)}
            </Text>
          )} */}

          {!!postOfficeCode && (
            <Text style={styles.postOfficeCode}>
              Código rastreio: {postOfficeCode ? postOfficeCode : ''}
            </Text>
          )}
        </View>
      </View>
    );
  }

  const hasActions = statusId !== '0' && !!nextStatus;
  const hasCancelButton = statusId === '1' || statusId === 1;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <StoreOrderDetailsListItem
            details={sellerMyOrderDetails}
            item={myOrderListItem}
            products={products}
            titleText={
              <Text
                style={[styles.status, statusId === '0' && styles.canceled]}>
                {status}
              </Text>
            }
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

          <View right>
            {hasActions && (
              <View row centerV>
                {hasCancelButton && (
                  <MyButton
                    label="Cancelar"
                    onPress={handlePressCancelar}
                    size="small"
                    type="warn"
                  />
                )}

                <MyButton
                  label={`${nextStatus}!`}
                  onPress={handlePressChangeStatus}
                  size="small"
                  type="secondary"
                />
              </View>
            )}
          </View>

          <MyListItem
            arrowColor="#434343"
            leftElement={renderStatus()}
            onPress={handlePressStatus}
            title=""
          />

          <MyListItem
            arrowColor="#434343"
            subtitle="Veja os detalhes da sua venda"
            title="Pedido detalhado"
            onPress={handlePressSummary}
          />

          <MyListItem
            arrowColor="#434343"
            subtitle="Converse direto com o comprador, se precisar"
            title="Chat com comprador"
            onPress={handlePressChat}
          />
        </View>

        <View centerH marginT-20>
          <View row>
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

          {/* <TouchableOpacity onPress={handleEnviarEtiqueta}>
            <View style={styles.card}>
              <View row centerV>
                <MaterialCommunityIcons
                  name="truck-fast"
                  size={35}
                  color="#0b8b31"
                />

                <View marginL-20>
                  <Text dark20 text70>
                    Enviar Etiqueta Correios
                  </Text>

                  <Text dark30 text90 style={styles.smallText}>
                    Se não recebeu no e-mail, reenvie aqui
                  </Text>
                </View>
              </View>

              <View marginL-10 centerV>
                <MaterialCommunityIcons
                  name="share-variant"
                  size={25}
                  color="#000000"
                />
              </View>
            </View>
          </TouchableOpacity> */}
        </View>

        <CustomActivityIndicator isVisible={loading} />
      </View>

      <Modal isVisible={opened} onBackdropPress={handleCloseModal}>
        <View style={styles.modal}>
          <Text dark10 text70 center marginT-5 marginH-20>
            Ao cancelar esse pedido você perderá pontos na sua avaliação. Tem
            certeza que deseja continuar?
          </Text>

          <View row centerV marginT-20>
            <MyButton
              clear
              label="Cancelar"
              onPress={handleCloseModal}
              type="black"
            />

            <MyButton
              disabled={loading}
              label="Confirmar"
              onPress={handleCancelOrder}
              type="error"
            />
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
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
  modal: {
    alignItems: 'center',
    paddingVertical: 30,
    borderRadius: 12,
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
  smallText: {
    maxWidth: 180,
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

export default StoreOrderDetails;
