import React, {useEffect, useState, useCallback} from 'react';
import {Dimensions, FlatList, RefreshControl, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Image, Text, View} from 'react-native-ui-lib';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image as IImage} from 'react-native-image-crop-picker';
import {useNavigation, useRoute} from '@react-navigation/native';

import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import GamerAppCard from 'src/Components/GamerAppCard';
import MyButton from 'src/Components/Button';
import SearchTextField from 'src/Components/TextField/SearchTextField';
import {GamerAppReduxStore} from 'src/Store';
import {SellerProduct} from 'src/Models/Seller';
import {formatCurrency} from 'src/Helpers/formatCurrency';
import {getMyStoreProducts, sellerUpdatePicture} from 'src/Store/Ducks/sellerDucks';
import {setActiveGamerProductDetails} from 'src/Store/Ducks/gamerProductDetailsDuck';
import {setEditProductData} from 'src/Store/Ducks/editProductDuck';
import WithImagePicker from 'src/Components/WithImagePicker';
import { getBase64FormatedString } from 'src/Helpers/functions';

const {width} = Dimensions.get('window');

let cardWidth = (width - 110) / 3;

if (cardWidth < 120) {
  cardWidth = (width - 55) / 2;
}

const SellerStore = () => {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {gamerProductDetails, seller, user} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId} = user.user;
  const {activeGamerProduct} = gamerProductDetails;

  const {
    activePage,
    activeSellerId: storeId,
    loading,
    myProducts,
    myStore,
    refreshing,
    shouldRefresh,
    totalPages,
  } = seller;
  const {imageUrl, name: storeName} = myStore;

  const stars = myStore.stars ? Array(myStore.stars).fill(true) : [];

  const route = useRoute();

  const hasNextPage = activePage < totalPages;
  const isMyStore = gamerId === storeId || route.name === 'SellerStore';

  function nextPage() {
    if (hasNextPage) {
      dispatch(
        getMyStoreProducts({
          gamerId,
          page: activePage + 1,
          searchText: search,
          storeId: isMyStore ? gamerId : storeId,
        }),
      );
    }
  }

  useEffect(() => {
    // Quando chega nessa tela pelo "Ver tudo", de dentro do detalhe de um produto,
    // os produtos do vendedor já estão carregados, por isso não precisa carregar
    // novamente.
    if (route.name !== 'SellerStoreSeeAll') {
      dispatch(
        getMyStoreProducts({
          gamerId,
          page: 1,
          searchText: search,
          storeId: isMyStore ? gamerId : storeId,
        }),
      );
    }
  }, [
    dispatch,
    gamerId,
    isMyStore,
    route.name,
    search,
    seller.activeSellerId,
    shouldRefresh,
    storeId,
  ]);

  function handleImageOnPress() {
    if (isMyStore) {
      // edit image
    }
  }

  function handleAnunciarProduto() {
    navigation.navigate('SellProduct', {screen: 'SellProductInit'});
  }

  function handlePressEditar() {
    // editar
  }

  function handlePressQuestion() {
    // question
  }

  function onChangeText(searchText: string) {
    setSearch(searchText);
  }

  function handleSearch() {
    dispatch(
      getMyStoreProducts({
        gamerId: user.user.id,
        page: 1,
        searchText: search,
        storeId: isMyStore ? gamerId : storeId,
      }),
    );
  }

  function renderFooter() {
    return (
      <View centerH>
        <CustomActivityIndicator isVisible={activePage > 1 && hasNextPage} />
      </View>
    );
  }

  function renderSearchBar() {
    return (
      <SearchTextField
        handleChangeText={onChangeText}
        onBlur={handleSearch}
        value={search}
      />
    );
  }

  function keyExtractor(item: SellerProduct, index: number) {
    return `${item.storeProductId} - ${index}`;
  }

  function onPress(item: SellerProduct) {
    if (isMyStore) {
      dispatch(
        setEditProductData({
          activeStoreProductCatalogId: item.storeProductId,
        }),
      );

      navigation.navigate('EditProduct');
    } else {
      dispatch(
        setActiveGamerProductDetails({
          catalogId: item.storeProductId,
          catalogType: isMyStore ? 1 : activeGamerProduct.catalogType,
          gamerId,
          id: isMyStore ? gamerId : activeGamerProduct.id,
        }),
      );

      navigation.navigate('GamerProduct', {screen: 'GamerProductDetails'});
    }
  }

  const onRefresh = useCallback(() => {
    dispatch(
      getMyStoreProducts(
        {
          gamerId: user.user.id,
          page: 1,
          searchText: search,
          storeId: isMyStore ? gamerId : storeId,
        },
        true,
      ),
    );
  }, [dispatch, user.user.id, search, isMyStore, gamerId, storeId]);

  function renderItem({item}: {item: SellerProduct}) {
    const {offerPrice, price} = item;

    function handleOnPress() {
      onPress(item);
    }

    const priceFormated = formatCurrency(price);
    const offerPriceFormated = offerPrice ? formatCurrency(offerPrice) : null;

    const itemName = isMyStore
      ? `${item.name} \n${item.quantity} em estoque`
      : `${item.name} ${item.quantity === 0 ? '\nFora de estoque' : ''}`;

    return (
      <GamerAppCard
        imageSource={{uri: item.imageUrl}}
        height={cardWidth * 1.4}
        marginVertical={10}
        name={offerPriceFormated || priceFormated}
        nameDashed={offerPriceFormated ? formatCurrency(price) : undefined}
        nameStyles={styles.nameStyles}
        onPress={handleOnPress}
        title={itemName}
        width={cardWidth}
      />
    );
  }

  function renderEmpty() {
    const showMessage = !loading && !refreshing;

    return (
      <View marginT-20>
        {showMessage && (
          <Text dark30 style={styles.emptyText}>
            {isMyStore
              ? 'Você ainda não tem produtos cadastrados.'
              : 'Essa loja não possui produtos em estoque no momento.'}
          </Text>
        )}
      </View>
    );
  }

  function renderHeader() {
    function onImagesAdded(images: IImage[]) {
      const image = images[0];

      if (image?.data) {
        dispatch(sellerUpdatePicture({
          imageBase64: getBase64FormatedString(image.data),
          storeId: gamerId,
        }))
      }
    }

    function renderSellerImage() {
      return (
        <View>
          <Image
            source={{uri: imageUrl}}
            style={styles.image}
          />

          {isMyStore && (
            <View style={styles.pencil} margin-10>
              <MaterialCommunityIcons
                name="pencil-circle"
                color="#ffffff"
                size={30}
              />
            </View>
          )}
        </View>
      );
    }

    const width = 800;
    const height = (width / 16) * 9;

    return (
      <View style={styles.header}>
        <View>
          {isMyStore ? (
            <WithImagePicker
              height={height}
              width={width}
              onImagesAdded={onImagesAdded}>
              {renderSellerImage()}
            </WithImagePicker>
          ) : (
            renderSellerImage()
          )}

          <View style={styles.topEffect} />
        </View>

        <View row spread centerV paddingH-20>
          <View centerV row spread paddingH-40>
            <View center flex>
              <View row marginB-5>
                {stars.map((star, index) => (
                  <Image
                    source={require('../../../Assets/images/trades/star-green.png')}
                    style={styles.star}
                    key={`${index}`}
                  />
                ))}
              </View>

              <View centerV row spread>
                <Text text60>{storeName}</Text>

                {/* {isMyStore && (
                  <MyButton
                    type="primary"
                    style={styles.buttonEditar}
                    clear
                    label="editar"
                    onPress={handlePressEditar}
                  />
                )} */}
              </View>
            </View>
          </View>
        </View>

        <View marginT-30 marginL-20 marginR-10>
          {renderSearchBar()}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.flatList}
        data={myProducts}
        keyExtractor={keyExtractor}
        numColumns={cardWidth < 120 ? 3 : 2}
        onEndReached={nextPage}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
      />

      {isMyStore && (
        <View style={styles.buttonWrapper}>
          <MyButton
            type="secondary"
            label="Anunciar produto"
            onPress={handleAnunciarProduto}
          />
        </View>
      )}

      <CustomActivityIndicator isVisible={activePage === 1 && loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonEditar: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingRight: 0,
    marginRight: 0,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  emptyText: {
    maxWidth: 200,
    textAlign: 'center',
  },
  flatList: {alignItems: 'center', paddingBottom: 120},
  header: {width},
  image: {
    height: (width / 16) * 9,
    width,
    backgroundColor: '#cecece',
    resizeMode: 'contain',
  },
  nameStyles: {marginTop: 6, fontSize: 20},
  pencil: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#00000010',
    borderRadius: 20,
  },
  star: {width: 14, height: 14, marginRight: 3},
  topEffect: {
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: '#ffffff',
    width,
    height: 15,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default SellerStore;
