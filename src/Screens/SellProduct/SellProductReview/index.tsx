import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, ScrollView} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import MyButton from 'src/Components/Button';
import {GamerAppReduxStore} from 'src/Store';
import {sellerAddProduct} from 'src/Store/Ducks/sellerAddProduct';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';

const SellProductReview = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {sellerAddProduct: sellerAddProductState, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {
    deliverType,
    fromCatalog,
    images,
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

  function handleJump() {
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

  function handleNext() {
    navigation.navigate('SellProductReview2');
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View centerH paddingH-20 paddingV-30>
          <Image
            source={require('../../../Assets/images/clipboard_green.png')}
            style={styles.image}
          />

          <Text text60 dark10 center marginT-20 marginB-10>
            Falta pouquinho para o seu anúncio estar ativo =)
          </Text>

          <Text text70 dark20 center>
            Revise as informações e se quiser, ainda pode fazer alterações.
          </Text>
        </View>

        <MyButton
          label="Revisar anúncio"
          onPress={handleNext}
          type="secondary"
        />

        <MyButton
          clear
          type="black"
          label="Pular revisão e anunciar"
          onPress={handleJump}
        />

        <CustomActivityIndicator isVisible={loading} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
});

export default SellProductReview;
