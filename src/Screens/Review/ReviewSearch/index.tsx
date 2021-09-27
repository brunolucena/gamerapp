import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import MyListItem from 'src/Components/MyListItem';
import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {GamerAppReduxStore} from 'src/Store';
import {GamerProductCollectionGame} from 'src/Models/GamerProductCollection';
import {getMyCollection} from 'src/Store/Ducks/myCollection';
import {MyColors} from 'src/Theme/FoundationConfig';
import {ProductItem} from 'src/Models/SearchProducts';
import {saveSellerAddProduct} from 'src/Store/Ducks/sellerAddProduct';
import {Text, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  searchProducts,
  selectTotalPages,
  setSearchActivePage,
} from 'src/Store/Ducks/searchProducts';

const ReviewSearch = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    myCollection: myCollectionRedux,
    searchProducts: searchProductsRedux,
    sellerAddProduct,
    user,
  } = useSelector((state: GamerAppReduxStore) => state);

  const {
    filteredGames: games,
    loading: loadingMyCollection,
  } = myCollectionRedux;
  const {loading, gamesFound: products, searchActivePage} = searchProductsRedux;
  const {addProductFrom, searchText} = sellerAddProduct;
  const {gamerId} = user.user;

  useEffect(() => {
    if (addProductFrom === 'new') {
      dispatch(
        searchProducts({
          SearchText: searchText,
          Page: searchActivePage,
          Category: 'Games',
        }),
      );
    }
  }, [addProductFrom, dispatch, searchActivePage, searchText]);

  useEffect(() => {
    if (addProductFrom === 'collection') {
      dispatch(
        getMyCollection({
          gamerId,
        }),
      );
    }
  }, [addProductFrom, dispatch, gamerId]);

  const pageSize = 20;

  const totalPages = selectTotalPages(searchProductsRedux, 'Games', pageSize);

  const hasNextPage = searchActivePage < totalPages;

  function _keyExtractor(item: ProductItem | GamerProductCollectionGame) {
    return `${item.productId}`;
  }

  function _onPress(item: ProductItem) {
    dispatch(
      saveSellerAddProduct({
        selectedProductNew: item,
        productId: item.productId,
      }),
    );

    navigation.navigate('SellProductPlatforms');
  }

  function _onPressCollection(item: GamerProductCollectionGame) {
    dispatch(
      saveSellerAddProduct({
        selectedProductCollection: item,
        productId: item.productId,
        productCatalogId: item.gamerProductCatalogId,
      }),
    );

    navigation.navigate('SellProductState');
  }

  function _renderItem({item}: {item: ProductItem}) {
    function handleOnPress() {
      _onPress(item);
    }

    return (
      <MyListItem
        title={item.name}
        leftAvatar={{uri: item.imageUrl}}
        arrowColor={MyColors.secondary}
        onPress={handleOnPress}
      />
    );
  }

  function _renderItemCollection({item}: {item: GamerProductCollectionGame}) {
    function handleOnPress() {
      _onPressCollection(item);
    }

    return (
      <MyListItem
        arrowColor={MyColors.secondary}
        leftAvatar={{uri: item.productImageUrl}}
        onPress={handleOnPress}
        resizeMode="cover"
        subtitle={item.platform}
        title={item.productName}
      />
    );
  }

  const handleNextPage = () => {
    if (hasNextPage) {
      dispatch(setSearchActivePage(searchActivePage + 1));

      dispatch(
        searchProducts({
          SearchText: searchText,
          Page: searchActivePage + 1,
          Category: 'Games',
        }),
      );
    }
  };

  function renderEmptyCollection() {
    return (
      <View centerH margin-50>
        {!loadingMyCollection && (
          <View>
            <Text dark20 center>
              Você ainda não possui items na sua coleção
            </Text>
          </View>
        )}
      </View>
    );
  }

  function renderEmptyNew() {
    return (
      <View centerV centerH margin-50>
        {!loading && (
          <Text dark20 center>
            Nenhum item encontrado, refaça a busca.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View flex>
      {addProductFrom === 'new' && (
        <FlatList
          ListEmptyComponent={renderEmptyNew}
          data={products}
          keyExtractor={_keyExtractor}
          onEndReached={handleNextPage}
          onEndReachedThreshold={0.5}
          renderItem={_renderItem}
        />
      )}

      {addProductFrom === 'collection' && (
        <FlatList
          ListEmptyComponent={renderEmptyCollection}
          data={games}
          keyExtractor={_keyExtractor}
          onEndReached={handleNextPage}
          onEndReachedThreshold={0.5}
          renderItem={_renderItemCollection}
        />
      )}

      <CustomActivityIndicator isVisible={loading || loadingMyCollection} />
    </View>
  );
};

export default ReviewSearch;
