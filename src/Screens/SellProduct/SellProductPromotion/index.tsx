import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

import InputCurrencyModal from 'src/Components/InputCurrency/InputCurrencyModal';
import MyButton from 'src/Components/Button';
import ProductCard from '../ProductCard';
import {GamerAppReduxStore} from 'src/Store';
import {MyColors} from 'src/Theme/FoundationConfig';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import {saveSellerAddProduct} from 'src/Store/Ducks/sellerAddProduct';

const SellProductPromotion = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [initialValue, setInitialValue] = useState(0);
  const [opened, setOpened] = useState(false);

  const {offerPrice, price} = useSelector(
    (state: GamerAppReduxStore) => state.sellerAddProduct,
  );

  function handleNext() {
    navigation.navigate('SellProductDelivery');
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
   * Quando confirma o input currency, coloca o valor do price na redux.
   */
  function handleConfirm(value: number) {
    dispatch(saveSellerAddProduct({offerPrice: value}));

    setInitialValue(0);
    setOpened(false);
  }

  /**
   * Coloca price como valor ativo e abre o input currency.
   */
  function handlePressPrice() {
    setInitialValue(offerPrice);
    setOpened(true);
  }

  return (
    <View style={styles.container}>
      <ProductCard hasOfferPrice hasPrice />

      <View paddingT-40 paddingB-45 paddingH-20>
        <Text dark20 text60>
          Quer fazer uma promoção?
        </Text>

        <Text dark40 text70>
          (opcional)
        </Text>

        <View marginT-20 row centerV>
          <View>
            <Text dark30 text70>
              De
            </Text>

            <Text text60 style={styles.price}>
              {formatCurrency(price)}
            </Text>
          </View>

          <View marginL-40>
            <TouchableOpacity onPress={handlePressPrice}>
              <Text dark30 text70>
                Por
              </Text>

              <Text text60>{formatCurrency(offerPrice)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <MyButton
        disabled={!price || price === 0}
        label="Próximo"
        onPress={handleNext}
        type="secondary"
      />

      <Text dark30 marginH-20 marginT-10 center>
        Lembre-se de considerar o valor de comissão do GamerApp e acrescentar no
        seu preço de venda.
      </Text>

      <InputCurrencyModal
        closeModal={handleCloseModal}
        initialValue={initialValue}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        opened={opened}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  price: {
    color: MyColors.secondary,
  },
});

export default SellProductPromotion;
