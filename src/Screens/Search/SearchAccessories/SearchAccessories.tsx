import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {ProductItem} from '../../../Models/SearchProducts';
import {setSelectedProduct} from 'src/Store/Ducks/productDetails';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {CardText, LoadingMore} from './SearchAccessoriesStyles';

interface Props {
  hasNextPage: boolean;
  nextPage: Function;
  accessories: ProductItem[];
}

const {width} = Dimensions.get('window');

let cardWidth = (width - 110) / 3;

if (cardWidth < 120) {
  cardWidth = (width - 55) / 2;
}

function SearchAccessories(props: Props) {
  const {accessories, hasNextPage, nextPage} = props;

  const navigation = useNavigation();

  const dispatch = useDispatch();

  function _onPress({imageUrl, name, productId}: ProductItem) {
    dispatch(
      setSelectedProduct({
        productId: productId,
        productImagePath: imageUrl,
        productName: name,
      }),
    );

    navigation.navigate('ProductDetails');
  }

  function _keyExtractor(item: ProductItem) {
    return `${item.productId}`;
  }

  function _renderItem({item}: {item: ProductItem}) {
    function handlePress() {
      _onPress(item);
    }

    return (
      <TouchableOpacity
        activeOpacity={0.3}
        key={item.productId}
        onPress={handlePress}>
        <View style={[styles.card]}>
          <CardText>{item.name}</CardText>
        </View>
      </TouchableOpacity>
    );
  }

  function renderFooter() {
    return (
      <LoadingMore>{hasNextPage && <CustomActivityIndicator />}</LoadingMore>
    );
  }

  return (
    <FlatList
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.flatList}
      data={accessories}
      keyExtractor={_keyExtractor}
      numColumns={cardWidth < 120 ? 3 : 2}
      onEndReached={nextPage}
      onEndReachedThreshold={0.5}
      renderItem={_renderItem}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  flatList: {alignItems: 'center'},
});

export default SearchAccessories;
