import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

import {ProductItem} from '../../../Models/SearchProducts';
import {setSelectedProduct} from 'src/Store/Ducks/productDetails';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {LoadingMore} from './SearchGamesStyles';
import GamerAppCard from 'src/Components/GamerAppCard';
import {useNavigation} from '@react-navigation/native';

interface Props {
  hasNextPage: boolean;
  nextPage: Function;
  loading: boolean;
  products: ProductItem[];
  searchActivePage: number;
}

const {width} = Dimensions.get('window');

let cardWidth = (width - 110) / 3;

if (cardWidth < 120) {
  cardWidth = (width - 55) / 2;
}

function SearchGames(props: Props) {
  const {hasNextPage, loading, nextPage, products, searchActivePage} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function _keyExtractor(item: ProductItem) {
    return `${item.productId}`;
  }

  function _onPress(item: ProductItem) {
    const {imageUrl, name, productId} = item;

    dispatch(
      setSelectedProduct({
        productId,
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
      <GamerAppCard
        imageSource={{uri: item.imageUrl}}
        height={cardWidth * 1.4}
        marginVertical={10}
        name={item.name}
        onPress={handleOnPress}
        width={cardWidth}
      />
    );
  }

  function renderFooter() {
    return (
      <LoadingMore>
        <CustomActivityIndicator
          isVisible={searchActivePage > 1 && hasNextPage}
        />
      </LoadingMore>
    );
  }

  function handleNextPage() {
    nextPage();
  }

  return (
    <>
      <FlatList
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.flatList}
        data={products}
        keyExtractor={_keyExtractor}
        numColumns={cardWidth < 120 ? 3 : 2}
        onEndReached={handleNextPage}
        onEndReachedThreshold={0.5}
        renderItem={_renderItem}
      />

      <CustomActivityIndicator isVisible={searchActivePage === 1 && loading} />
    </>
  );
}

const styles = StyleSheet.create({
  flatList: {alignItems: 'center'},
});

export default SearchGames;
