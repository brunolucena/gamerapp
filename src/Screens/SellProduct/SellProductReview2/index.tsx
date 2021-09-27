import React, {useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';
import ProductCard from '../ProductCard';
import {useSelector, useDispatch} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import {Image as IImage} from 'react-native-image-crop-picker';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import {
  sellerAddProduct,
  saveSellerAddProduct,
} from 'src/Store/Ducks/sellerAddProduct';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import InputCurrencyModal from 'src/Components/InputCurrency/InputCurrencyModal';
import {DeliveryTypeId, SaveSellerAddProductRedux} from 'src/Models/Seller';

const SellProductReview2 = () => {
  const dispatch = useDispatch();
  const [activeInput, setActiveInput] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const [opened, setOpened] = useState(false);

  const {sellerAddProduct: sellerAddProductState, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {
    deliverType,
    fromCatalog,
    images,
    imagesNormalized,
    loading,
    offerPrice,
    platformId,
    price,
    productCatalogId,
    productId,
    quantity,
    state,
  } = sellerAddProductState;
  const {gamerId} = user.user;

  function handleNext() {
    dispatch(
      sellerAddProduct({
        deliverType,
        fromCatalog,
        images,
        offerPrice,
        platformId,
        price,
        productCatalogId,
        productId,
        quantity,
        state,
        storeId: gamerId,
      }),
    );
  }

  /**
   * Alterna o status do pessoalmente.
   */
  function handlePressPessoalmente() {
    let toDeliveryTypeId: DeliveryTypeId = 0;

    if (deliverType === 0) {
      // Se nada estiver selecionado, seleciona o Pessoalmente
      toDeliveryTypeId = 1;
    } else if (deliverType === 1) {
      // Se estiver selecionado somente o Pessoalmente, tira tudo
      toDeliveryTypeId = 0;
    } else if (deliverType === 2) {
      // Se estiver selecionado somente o Correios, seleciona tudo
      toDeliveryTypeId = 3;
    } else if (deliverType === 3) {
      // Se estiver selecionado tudo, deixa somente o Correios
      toDeliveryTypeId = 2;
    }

    dispatch(
      saveSellerAddProduct({
        deliverType: toDeliveryTypeId,
      }),
    );
  }

  /**
   * Alterna o status do correios.
   */
  function handlePressCorreios() {
    let toDeliveryTypeId: DeliveryTypeId = 0;

    if (deliverType === 0) {
      // Se nada estiver selecionado, seleciona o Correios
      toDeliveryTypeId = 2;
    } else if (deliverType === 1) {
      // Se estiver selecionado somente o Pessoalmente, seleciona tudo
      toDeliveryTypeId = 3;
    } else if (deliverType === 2) {
      // Se estiver selecionado somente o Correios, tira tudo
      toDeliveryTypeId = 0;
    } else if (deliverType === 3) {
      // Se estiver selecionado tudo, deixa somente o Pessoalmente
      toDeliveryTypeId = 1;
    }

    dispatch(
      saveSellerAddProduct({
        deliverType: toDeliveryTypeId,
      }),
    );
  }

  /**
   * Fecha a modal ao cancelar o input currency.
   */
  function handleCancel() {
    setOpened(false);
  }

  /**
   * Fecha a modal.
   */
  function handleCloseModal() {
    setOpened(false);
  }

  /**
   * Quando confirma o input currency, verifica qual o atributo
   * ativo e coloca o valor na redux.
   */
  function handleConfirm(value: number) {
    const data: SaveSellerAddProductRedux = {};

    if (activeInput === 'price') {
      data.price = value;
    } else if (activeInput === 'offerPrice') {
      data.offerPrice = value;
    } else if (activeInput === 'quantity') {
      data.quantity = value;
    }

    dispatch(saveSellerAddProduct(data));

    setActiveInput('');
    setInitialValue(0);
    setOpened(false);
  }

  /**
   * Coloca price como valor ativo e abre o input currency.
   */
  function handlePressPrice() {
    setActiveInput('price');
    setInitialValue(price);
    setOpened(true);
  }
  /**
   * Coloca offerPrice como valor ativo e abre o input currency.
   */
  function handlePressOfferPrice() {
    setActiveInput('offerPrice');
    setInitialValue(offerPrice || 0);
    setOpened(true);
  }

  /**
   * Coloca quantity como valor ativo e abre o input currency.
   */
  function handlePressQuantity() {
    setActiveInput('quantity');
    setInitialValue(quantity);
    setOpened(true);
  }

  function _keyExtractor(item: IImage, index: number): string {
    return String(index);
  }

  function _renderItem({item}: {item: IImage}) {
    return (
      <View marginR-15>
        <Image source={{uri: item.path}} style={styles.image} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProductCard hasOfferPrice hasPrice />

        <View paddingH-20 paddingV-15>
          <View marginB-15>
            <Text dark20 text70 marginB-10>
              Fotos
            </Text>

            <FlatList
              data={imagesNormalized}
              horizontal
              keyExtractor={_keyExtractor}
              renderItem={_renderItem}
              contentContainerStyle={styles.flatListContainer}
            />
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              onPress={handlePressPrice}
              style={[styles.cardItem, styles.valueRow]}>
              <Text dark10 text70 style={styles.cardItemText}>
                Valor
              </Text>

              <Text text60>{formatCurrency(price)}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePressOfferPrice}
              style={[styles.cardItem, styles.valueRow]}>
              <Text dark10 text70 style={styles.cardItemText}>
                Valor promocional
              </Text>

              <Text text60>{formatCurrency(offerPrice)}</Text>
            </TouchableOpacity>

            <View style={styles.cardItem}>
              <View row centerV spread>
                <Text dark10 text70 style={styles.cardItemText}>
                  Tipo de frete
                </Text>

                <View>
                  <TouchableOpacity
                    onPress={handlePressPessoalmente}
                    style={styles.checkboxRow}>
                    {deliverType === 1 || deliverType === 3 ? (
                      <View style={styles.square} marginR-10>
                        <Ionicon
                          name="md-checkmark"
                          size={15}
                          color="#ffffff"
                        />
                      </View>
                    ) : (
                      <View
                        style={[styles.square, styles.squareEmpty]}
                        marginR-10
                      />
                    )}

                    <Text>Pessoalmente</Text>
                  </TouchableOpacity>

                  <View marginV-5 />

                  <TouchableOpacity
                    onPress={handlePressCorreios}
                    style={styles.checkboxRow}>
                    {deliverType === 2 || deliverType === 3 ? (
                      <View style={styles.square} marginR-10>
                        <Ionicon
                          name="md-checkmark"
                          size={15}
                          color="#ffffff"
                        />
                      </View>
                    ) : (
                      <View
                        style={[styles.square, styles.squareEmpty]}
                        marginR-10
                      />
                    )}

                    <Text>Entrega Correios</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handlePressQuantity}
              style={[styles.cardItem, styles.cardItemLast, styles.valueRow]}>
              <Text dark10 text70 style={styles.cardItemText}>
                Itens disponíveis a venda (estoque)
              </Text>

              <Text text60>{quantity}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View marginH-10 marginT-5>
          <MyButton label="Anunciar" onPress={handleNext} type="secondary" />
        </View>

        <CustomActivityIndicator isVisible={loading} />
      </View>

      <InputCurrencyModal
        closeModal={handleCloseModal}
        initialValue={initialValue}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        opened={opened}
        type={activeInput === 'quantity' ? 'int' : 'currency'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardItem: {
    paddingVertical: 15,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 2,
  },
  cardItemLast: {
    borderBottomWidth: 0,
  },
  cardItemText: {
    maxWidth: 130,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  flatListContainer: {
    marginBottom: 15,
    paddingRight: 10,
  },
  image: {
    height: 120,
    width: 180,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    resizeMode: 'contain',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 18,
    width: 18,
    borderWidth: 1,
    borderColor: MyColors.secondary,
    backgroundColor: MyColors.secondary,
  },
  squareEmpty: {
    height: 18,
    width: 18,
    backgroundColor: '#ffffff',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SellProductReview2;
