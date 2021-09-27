import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {Image, Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

import ProductCard from '../ProductCard';
import {saveSellerAddProduct} from 'src/Store/Ducks/sellerAddProduct';

const SellProductState = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate('SellProductPhotos');
  }

  function handlePressNew() {
    dispatch(saveSellerAddProduct({state: 'Novo'}));

    handleNavigate();
  }

  function handlePressUsed() {
    dispatch(saveSellerAddProduct({state: 'Usado'}));

    handleNavigate();
  }

  return (
    <View style={styles.container}>
      <ProductCard />

      <View padding-25>
        <View row centerV>
          <Text marginR-5 text60 dark10>
            Pronto, item escolhido!
          </Text>

          <Image
            source={require('../../../Assets/images/confetti_1.png')}
            style={styles.image}
          />
        </View>

        <Text text60 dark30 marginT-25>
          Agora, diga se é um item novo ou usado.
        </Text>
      </View>

      <View row centerH paddingH-16 marginT-20>
        <TouchableOpacity onPress={handlePressNew} style={styles.card}>
          <View>
            <Text style={styles.cardText}>Novo</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressUsed} style={styles.card}>
          <View>
            <Text style={styles.cardText}>Usado</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: 300,
    marginHorizontal: 8,
    padding: 15,
    borderColor: '#c7c7c7',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  cardText: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#343434',
    fontSize: 18,
  },
  container: {
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  image: {
    height: 35,
    resizeMode: 'contain',
  },
});

export default SellProductState;
