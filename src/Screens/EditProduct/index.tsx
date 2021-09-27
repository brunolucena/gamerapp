import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Image, Text, View} from 'react-native-ui-lib';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {MyColors} from 'src/Theme/FoundationConfig';
import {DeliveryTypeId} from 'src/Models/Seller';
import {
  PhotoInfo,
  SetEditProductDataRequest,
} from 'src/Models/EditProductModels';
import {formatCurrency} from 'src/Helpers/formatCurrency';

import {GamerAppReduxStore} from 'src/Store';
import {
  editProductDetails,
  getProductDetails,
  setEditProductData,
} from 'src/Store/Ducks/editProductDuck';

import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import InputCurrencyModal from 'src/Components/InputCurrency/InputCurrencyModal';
import MyButton from 'src/Components/Button';
import ProductCard from './ProductCard';

const EditProduct = () => {
  const dispatch = useDispatch();

  const [activeInput, setActiveInput] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const [opened, setOpened] = useState(false);

  const {editProduct} = useSelector((state: GamerAppReduxStore) => state);

  const {
    activeStoreProductCatalogId,
    deliveryTypeId,
    imageUrl,
    loading,
    offerPrice,
    photos,
    platformName,
    price,
    product,
    quantity,
  } = editProduct;

  function _keyExtractor(item: PhotoInfo, index: number): string {
    return `${item.id} - ${index}`;
  }

  function _renderItem({item, index}: {item: PhotoInfo; index: number}) {
    function handleOnPress() {
      console.log('press image');
    }

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={handleOnPress}>
        <View marginR-15>
          <Image source={{uri: item.url}} style={styles.image} />
        </View>
      </TouchableOpacity>
    );
  }

  /**
   * Alterna o status do pessoalmente.
   */
  function handlePressPessoalmente() {
    let toDeliveryTypeId: DeliveryTypeId = 0;

    if (deliveryTypeId === 0) {
      // Se nada estiver selecionado, seleciona o Pessoalmente
      toDeliveryTypeId = 1;
    } else if (deliveryTypeId === 1) {
      // Se estiver selecionado somente o Pessoalmente, tira tudo
      toDeliveryTypeId = 0;
    } else if (deliveryTypeId === 2) {
      // Se estiver selecionado somente o Correios, seleciona tudo
      toDeliveryTypeId = 3;
    } else if (deliveryTypeId === 3) {
      // Se estiver selecionado tudo, deixa somente o Correios
      toDeliveryTypeId = 2;
    }

    dispatch(
      setEditProductData({
        deliveryTypeId: toDeliveryTypeId,
      }),
    );
  }

  /**
   * Alterna o status do correios.
   */
  function handlePressCorreios() {
    let toDeliveryTypeId: DeliveryTypeId = 0;

    if (deliveryTypeId === 0) {
      // Se nada estiver selecionado, seleciona o Correios
      toDeliveryTypeId = 2;
    } else if (deliveryTypeId === 1) {
      // Se estiver selecionado somente o Pessoalmente, seleciona tudo
      toDeliveryTypeId = 3;
    } else if (deliveryTypeId === 2) {
      // Se estiver selecionado somente o Correios, tira tudo
      toDeliveryTypeId = 0;
    } else if (deliveryTypeId === 3) {
      // Se estiver selecionado tudo, deixa somente o Pessoalmente
      toDeliveryTypeId = 1;
    }

    dispatch(
      setEditProductData({
        deliveryTypeId: toDeliveryTypeId,
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
    const data: SetEditProductDataRequest = {};

    if (activeInput === 'price') {
      data.price = value;
    } else if (activeInput === 'offerPrice') {
      data.offerPrice = value;
    } else if (activeInput === 'quantity') {
      data.quantity = value;
    }

    dispatch(setEditProductData(data));

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

  /**
   * Envia a requisição para salvar os dados.
   */
  function handleSubmit() {
    dispatch(
      editProductDetails({
        deliveryType: deliveryTypeId,
        images: [],
        offerPrice,
        price,
        quantity,
        storeProductCatalogId: activeStoreProductCatalogId,
      }),
    );
  }

  useEffect(() => {
    dispatch(
      getProductDetails({
        storeProductCatalogId: activeStoreProductCatalogId,
      }),
    );
  }, []);

  return (
    <View flex>
      <ScrollView>
        <View style={styles.container}>
          <ProductCard
            hasOfferPrice
            hasPrice
            imageUrl={imageUrl}
            name={product}
            offerPrice={offerPrice || 0}
            platformName={platformName}
            price={price || 0}
          />

          <View paddingH-20 paddingV-15>
            <View marginB-15>
              <Text dark20 text70 marginB-10>
                Fotos
              </Text>

              <FlatList
                data={photos}
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

                <Text text60>{formatCurrency(offerPrice || 0)}</Text>
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
                      {deliveryTypeId === 1 || deliveryTypeId === 3 ? (
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
                      {deliveryTypeId === 2 || deliveryTypeId === 3 ? (
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

          <CustomActivityIndicator isVisible={loading} />

          <InputCurrencyModal
            closeModal={handleCloseModal}
            initialValue={initialValue}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            opened={opened}
            type={activeInput === 'quantity' ? 'int' : 'currency'}
          />
        </View>
      </ScrollView>

      <View marginH-10 marginT-5>
        <MyButton label="Salvar" onPress={handleSubmit} type="secondary" />
      </View>
    </View>
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

export default EditProduct;
