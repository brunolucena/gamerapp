import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import ProductCard from '../ProductCard';
import MyButton from 'src/Components/Button';
import {saveSellerAddProduct} from 'src/Store/Ducks/sellerAddProduct';
import {GamerAppReduxStore} from 'src/Store';
import MyTextField from 'src/Components/TextField';

const SellProductStock = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {quantity} = useSelector(
    (state: GamerAppReduxStore) => state.sellerAddProduct,
  );

  function handleNext() {
    navigation.navigate('SellProductReview');
  }

  function handleChangeText(text: string) {
    if (text) {
      try {
        dispatch(saveSellerAddProduct({quantity: parseInt(text, 0)}));
      } catch {
        dispatch(saveSellerAddProduct({quantity: 1}));
      }
    } else {
      dispatch(saveSellerAddProduct({quantity: 0}));
    }
  }

  return (
    <View style={styles.container}>
      <ProductCard hasOfferPrice hasPrice />

      <View paddingT-40 paddingB-45 paddingH-20>
        <Text dark20 text60>
          Quantos produtos desse você está anunciando?
        </Text>

        <View marginT-30>
          <Text dark20 text70>
            Estoque
          </Text>

          <MyTextField
            handleChangeText={handleChangeText}
            keyboardType="number-pad"
            placeholder=""
            value={quantity === 0 ? '' : String(quantity)}
          />
        </View>
      </View>

      <MyButton
        disabled={!quantity}
        label="Próximo"
        onPress={handleNext}
        type="secondary"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
});

export default SellProductStock;
