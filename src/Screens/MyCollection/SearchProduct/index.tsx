import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationScreenOptions, ScrollView, FlatList} from 'react-navigation';

import {focusSearchBar} from 'src/Store/Ducks/searchProductSearchBar';

import {GamerAppReduxStore} from '../../../Models/Redux';
import {InjectedNavigation} from '../../../Models/Utils';
import {Product} from '../../../Models/Product';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

interface Props extends InjectedNavigation {}

function SearchProduct({navigation}: Props) {
  const dispatch = useDispatch();
  const searchProducts = useSelector(
    (state: GamerAppReduxStore) => state.searchProducts,
  );

  const {loading, products} = searchProducts;

  const productType = navigation.getParam('productType');

  const title = (type: 'game' | 'console' | 'acessory' | 'anything') => {
    switch (type) {
      case 'game':
        return 'game';
      case 'console':
        return 'console';
      case 'acessory':
        return 'acessório';
      case 'anything':
        return '';
      default:
        return '';
    }
  };

  function _keyExtractor(item: Product) {
    return `${item.id}`;
  }

  function _renderItem({item}: {item: Product}) {
    function handlePress() {
      _onPress(item);
    }

    return (
      <TouchableOpacity activeOpacity={0.5} onPress={handlePress}>
        <Card
          containerStyle={styles.card}
          image={{uri: item.imagePath}}
          imageProps={{resizeMode: 'cover'}}>
          <Text>Id: {item.id}</Text>
        </Card>
      </TouchableOpacity>
    );
  }

  function _onPress(product: Product) {
    navigation.navigate('AddToCollection', {productId: product.id});
  }

  function handleFocus() {
    dispatch(focusSearchBar());
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomActivityIndicator isVisible={loading} />

      <View style={styles.container}>
        {!loading && !products.length && (
          <>
            <Text style={styles.title}>
              Busque o {title(productType)} que você deseja adicionar.
            </Text>

            <Button title="Buscar" onPress={handleFocus} />
          </>
        )}

        <ScrollView style={styles.scrollView}>
          <FlatList
            numColumns={3}
            data={products}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f4f4',
  },
  scrollView: {
    flex: 1,
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    color: '#3e3e3e',
  },
});

SearchProduct.navigationOptions = (): NavigationScreenOptions => ({
  headerTitle: '',
});

export default SearchProduct;
