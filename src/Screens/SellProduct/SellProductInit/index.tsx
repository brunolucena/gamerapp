import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

import {MyColors} from 'src/Theme/FoundationConfig';
import {setAddProductFrom} from 'src/Store/Ducks/sellerAddProduct';

const SellProductInit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handlePressMyCollection() {
    dispatch(setAddProductFrom('collection'));
    navigation.navigate('SellProductSearch');
  }

  function handlePressNew() {
    dispatch(setAddProductFrom('new'));
    navigation.navigate('SellProductSearch');
  }

  return (
    <View>
      <View centerH padding-20>
        <Text text60 style={styles.h2}>
          Vamos lá!
        </Text>

        <Text text50 style={styles.h1}>
          De onde você quer anunciar?
        </Text>
      </View>

      <View row centerH marginV-30 marginH-20>
        <TouchableOpacity onPress={handlePressMyCollection}>
          <View style={styles.card}>
            <Image
              source={require('../../../Assets/images/mycollection/treasure-blue.png')}
              style={styles.image}
            />

            <Text style={styles.text}>Minha coleção</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressNew}>
          <View style={styles.card}>
            <Icon name="plus" size={49} color={MyColors.secondary} />

            <Text style={styles.text}>Adicionar novo</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View paddingH-20 marginT-10>
        <Text color="#3e3e3e" center>
          Todo item adicionado na sua coleção pode ser um produto na sua loja.
          Assim, você ganha tempo na hora de adicionar.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    marginHorizontal: 8,
    padding: 20,
    borderColor: '#cecece',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  h1: {
    maxWidth: 250,
    textAlign: 'center',
    color: '#292929',
  },
  h2: {
    color: MyColors.secondary,
    textAlign: 'center',
  },
  image: {
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 10,
    color: '#292929',
    fontSize: 14,
  },
});

export default SellProductInit;
