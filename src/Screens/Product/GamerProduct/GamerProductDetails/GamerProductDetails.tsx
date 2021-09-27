import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

import CustomActivityIndicator from '../../../../Components/CustomActivityIndicator';

import {
  ProductDetailsSafeAreaView,
  ProductDetailsScrollView,
} from './GamerProductDetailsStyles';
import StoreCard from 'src/Components/StoreCard';
import ProductListItem from 'src/Components/ProductListItem';
import {getGamerProductDetails} from 'src/Store/Ducks/gamerProductDetailsDuck';
import {GamerAppReduxStore} from 'src/Store';
import {Dimensions, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {addItem, selectCartIsEmpty, clearCart} from 'src/Store/Ducks/cartDuck';
import MyButton from 'src/Components/Button';
import {setActiveTrade} from 'src/Store/Ducks/tradeActive';
import {GetGamerProductDetailsRequest} from 'src/Models/GamerProductDetails';

const {width: screenWidth} = Dimensions.get('window');

const cardWidth = screenWidth / 2 - 40;
const cardHeight = cardWidth * 0.8;

function GamerProductDetails() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalConfirmOpened, setModalConfirmOpened] = useState(false);

  const {cart, gamerProductDetails, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {store: cartStore} = cart;
  const {
    activeGamerProduct,
    cashback,
    gamer,
    hasDelivery,
    id,
    imageUrl,
    loading,
    name,
    photos,
    platform,
    price,
    productId,
    store,
  } = gamerProductDetails;
  const {gamerId} = user.user;

  useEffect(() => {
    const data: GetGamerProductDetailsRequest = {
      catalogId: activeGamerProduct.catalogId,
      catalogType: activeGamerProduct.catalogType,
      gamerId,
      id: activeGamerProduct.id,
    };

    dispatch(getGamerProductDetails(data));
  }, [activeGamerProduct, dispatch, gamerId]);

  function handleNavigatePerfil() {
    if (store) {
      navigation.navigate('GamerProductSeller');
    } else {
      navigation.navigate("GamerProductGamer")
    }
  }

  function handleAddItem() {
    setModalConfirmOpened(false);

    dispatch(
      addItem({
        cashback,
        gamerId,
        hasDelivery,
        id,
        imageUrl,
        name,
        photos,
        platform,
        price,
        productId,
        store,
        quantity: 1,
        gamer,
      }),
    );

    navigation.navigate('OrderRequest');
  }

  function handleAddToCart() {
    const isCartEmpty = selectCartIsEmpty(cart);
    const isSameStore = cartStore.id === store?.id;

    if (isCartEmpty || isSameStore) {
      handleAddItem();
    } else {
      setModalConfirmOpened(true);
    }
  }

  function handleClearAndAddItem() {
    dispatch(clearCart());
    handleAddItem();
  }

  function handleStartTrade() {
    dispatch(
      setActiveTrade({
        fromGamerId: gamerId,
        toGamerId: gamerProductDetails.gamerId,
        selectedGamerProductCatalogId: id,
      }),
    );

    navigation.navigate('TradeRequest');
  }

  function handleCloseModal() {
    setModalConfirmOpened(false);
  }

  function _keyExtractor(item: string, index: number): string {
    return `${item} - ${index}`;
  }

  function _renderItem({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) {
    function handleOnPress() {
      console.log('press image')
    }

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={handleOnPress}>
        <View marginR-15>
          <Image source={{uri: item}} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ProductDetailsSafeAreaView>
      <ProductDetailsScrollView>
        {photos.length > 0 &&
          <>
            <View marginT-10 marginB-10 marginH-20>
              <FlatList
                data={photos}
                horizontal
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
              />
            </View>

            <View paddingT-10 bg-white />
          </>
        }

        <ProductListItem
          cashback={cashback > 0 ? `${cashback}%` : ''}
          forTrade={activeGamerProduct.catalogType === 2}
          hasButton={activeGamerProduct.catalogType === 1}
          hasDelivery={hasDelivery}
          image={{uri: imageUrl}}
          loading={loading}
          oldPrice={price.current ? price.original : undefined}
          onButtonPress={handleAddToCart}
          onStartTrade={handleStartTrade}
          price={price.current || price.original}
          subtitle={platform}
          title={name}
        />

        <View paddingB-100>
          <StoreCard
            actionIsBottom
            actionText="Ver perfil"
            image={{uri: store?.imageUrl || gamer?.imageUrl}}
            name={store ? store.name : gamer ? `${gamer?.name} - ${gamer?.rankTitle}` : ""}
            platformName={store ? undefined : `Ranking ${gamer?.position || 0}`}
            stars={store?.stars || gamer?.averageRating ? parseFloat(gamer!.averageRating.toFixed(1)) : 0}
            city={store?.city || gamer?.city || ""}
            state={store?.state || gamer?.state || ""}
            onPress={handleNavigatePerfil}
          />
        </View>
      </ProductDetailsScrollView>

      <Modal
        style={styles.modalConfirm}
        isVisible={modalConfirmOpened}
        onBackdropPress={handleCloseModal}>
        <View bg-white style={styles.modalContent}>
          <View centerH marginV-30 paddingH-20>
            <Text text60 dark20 center>
              Você já tem itens adicionados ao seu carrinho de outra loja.
            </Text>

            <Text marginT-15 marginB-10 dark20>
              Deseja limpar o carrinho?
            </Text>
          </View>

          <View marginB-20>
            <MyButton label="Sim" type="primary" onPress={handleClearAndAddItem} />

            <MyButton
              clear
              label="Não"
              type="primary"
              onPress={handleCloseModal}
            />
          </View>
        </View>
      </Modal>

      <CustomActivityIndicator isVisible={loading} />
    </ProductDetailsSafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: cardHeight - 8,
    width: cardWidth - 8,
    padding: 3,
  },
  modalContent: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  modalConfirm: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default GamerProductDetails;
