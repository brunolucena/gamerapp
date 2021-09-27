import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

import {ProductItem} from '../../../Models/SearchProducts';
import {setSelectedProduct} from 'src/Store/Ducks/productDetails';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {CardText, LoadingMore} from './SearchPlatformsStyles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  hasNextPage: boolean;
  nextPage: Function;
  platforms: ProductItem[];
}

const {width} = Dimensions.get('window');

let cardWidth = (width - 110) / 3;

if (cardWidth < 120) {
  cardWidth = (width - 55) / 2;
}

function SearchPlatforms(props: Props) {
  const {hasNextPage, nextPage, platforms} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function _keyExtractor(item: ProductItem) {
    return `${item.productId}`;
  }

  function _onPress(item: ProductItem) {
    const {imageUrl, name, productId} = item;

    dispatch(
      setSelectedProduct({
        productId: productId,
        productImagePath: imageUrl,
        productName: name,
      }),
    );

    navigation.navigate('ProductDetails');
  }

  function _renderItem({item}: {item: ProductItem}) {
    function handleOnPress() {
      _onPress(item);
    }

    return (
      <TouchableOpacity
        activeOpacity={0.3}
        key={item.productId}
        onPress={handleOnPress}>
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

  function handleNextPage() {
    nextPage();
  }

  return (
    <FlatList
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.flatList}
      data={platforms}
      keyExtractor={_keyExtractor}
      numColumns={cardWidth < 120 ? 3 : 2}
      onEndReached={handleNextPage}
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

export default SearchPlatforms;
