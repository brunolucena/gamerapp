import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {Image, Text, View} from 'react-native-ui-lib';
import CheckBox from 'react-native-check-box';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import formatDistance from '../../../Helpers/formatDistance';

import {
  AddQuickProductProducts,
  AddQuickProductRequest,
} from '../../../Models/Gamer';
import {
  AvailableGamerProductCatalog,
  AddToWishlistSelection,
  AddToWishlistSelectionAvailablePlatform,
} from '../../../Models/Product';
import {getAvailableGamerProductsCatalog, selectProductDetailsHasNextPage, getAvailableStoreProductsCatalog} from 'src/Store/Ducks/productDetails';
import {setActiveAddGameToCollection} from 'src/Store/Ducks/gamerCollection';
import {addQuickProducts} from 'src/Store/Ducks/gamer';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  Action,
  ActionText,
  EmptyListText,
  Header,
  ItemContainer,
  ItemLeft,
  ItemLeftCity,
  ItemLeftCityContainer,
  ItemLeftCityDistance,
  ItemLeftName,
  ItemLeftStars,
  ItemPlatformName,
  ItemPrice,
  ItemPriceLineThrough,
  ItemRight,
  ItemRightText,
  Items,
  ModalHeader,
  ModalHeaderText,
  ModalHeaderTitle,
  ModalItem,
  ModalWrapper,
  ProductDetailsSafeAreaView,
  ProductDetailsScrollView,
} from './ProductDetailsStyles';
import {logEvent} from '../../../Analytics/analyticsFunctions';
import getColorByPlatform from 'src/Helpers/getColorByPlatform';
import { GamerAppReduxStore } from 'src/Store';
import { MyColors } from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';
import CashbackBadge from 'src/Components/CashbackBadge';
import { setActiveGamerProductDetails } from 'src/Store/Ducks/gamerProductDetailsDuck';
import { formatCurrency } from 'src/Helpers/formatCurrency';

const {width} = Dimensions.get('window');

type ActiveTab = "gamers" | "stores";

function ProductDetails() {
  const [modalActiveProduct, setModalActiveProduct] = useState<
    AddToWishlistSelection
  >();
  const [activeTab, setActiveTab] = useState<ActiveTab>("stores");
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    AddToWishlistSelection[]
  >([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    gamerCollection: gamerCollectionRedux,
    productDetails: productDetailsRedux,
    user: userRedux,
  } = useSelector((state: GamerAppReduxStore) => state);

  const {
    availableGamerProductsCatalog,
    availableStoreProductsCatalog,
    availablePlatforms,
    countGamers,
    countStores,
    isOnCollection,
    isOnWishList,
    loadingGamers,
    loadingStores,
    pageGamers,
    pageStores,
    selectedProduct,
  } = productDetailsRedux;

  const {gamerId} = userRedux.user;

  const {
    platformId,
    platformName,
    productId,
    productImagePath,
    productName,
  } = selectedProduct;

  useEffect(() => {
    logEvent('product_details', {
      productName: productName || '',
      platformName: platformName || '',
      productId: productId || '',
      platformId: platformId || '',
    });

    dispatch(
      getAvailableGamerProductsCatalog({
        catalogType: 2,
        filters: [],
        gamerId,
        page: 1,
        productId,
        platformId,
      })
    );

    dispatch(
      getAvailableStoreProductsCatalog({
        catalogType: 1,
        filters: [],
        gamerId,
        page: 1,
        productId,
        platformId,
      }),
    );
  }, []);

  function _keyExtractor(item: AvailableGamerProductCatalog, index: number) {
    return `${item.gamerProductCatalogId} - ${index}`;
  }

function _renderItem({item}: {item: AvailableGamerProductCatalog}) {
    const {
      cashback,
      city,
      distance,
      imageUrl,
      gamerName,
      gamerProductCatalogId,
      platformName,
      price,
      state,
      wantSomethingFromMyWishlist,
    } = item;

    const stars = item.stars ? Array(item.stars).fill(true) : [];

    function handleOnPress() {
      dispatch(
        setActiveGamerProductDetails({
          catalogId: item.gamerProductCatalogId,
          catalogType: activeTab === "gamers" ? 2 : 1,
          gamerId,
          id: item.gamerId,
        }),
      );

      if (activeTab === "gamers") {
        navigation.navigate("GamerProductGamer", {screen: "GamerProductGamerDetails"});
      } else {
        navigation.navigate('GamerProduct', {screen: "GamerProductDetails"});
      }
    }

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={handleOnPress}
        key={gamerProductCatalogId}>
        <ItemContainer>
          {cashback &&
            <View style={styles.cashback}>
              <CashbackBadge>
                {cashback}%
              </CashbackBadge>
            </View>
          }

          <View
            marginR-15
            style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={imageUrl ? {uri: imageUrl} : require('../../../Assets/images/avatars/man.png')}
              style={styles.imageAvatar}
            />
          </View>
          
          <View flex spread>
            <ItemLeft>
              {stars.length > 0 && 
                <ItemLeftStars>
                  {stars.map(() => (
                    <Image
                      source={require('../../../Assets/images/trades/star-green.png')}
                      style={styles.star}
                    />
                  ))}
                </ItemLeftStars>
              }

              <ItemLeftName>{gamerName}</ItemLeftName>

              <View flex row>
                {price &&
                  <View centerV row marginR-1>
                    <ItemPrice>{formatCurrency(price.offerPrice || price.price)} </ItemPrice>

                    {!!price.offerPrice &&
                      <ItemPriceLineThrough>{formatCurrency(price.price)}</ItemPriceLineThrough>
                    }

                    <Text dark40> - </Text>
                  </View>
                }
                
                <ItemPlatformName>{platformName}</ItemPlatformName>
              </View>

              {(!!city || !!state || !!distance) && (
                <ItemLeftCityContainer>
                  <ItemLeftCity>
                    {city}
                    {city && state ? ', ' : ''}
                    {state}
                  </ItemLeftCity>

                  {!!distance &&
                    <ItemLeftCityDistance>
                      {formatDistance(distance)}
                    </ItemLeftCityDistance>
                  }
                </ItemLeftCityContainer>
              )}
            </ItemLeft>

            {wantSomethingFromMyWishlist && (
              <ItemRight>
                <Image
                  source={require('../../../Assets/images/wishlist/wishlist-icon.png')}
                  style={{height: 35, width: 30}}
                  resizeMode="contain"
                />

                <ItemRightText>Você tem itens desejados</ItemRightText>
              </ItemRight>
            )}
          </View>
        </ItemContainer>
      </TouchableOpacity>
    );
  }

  function _renderEmptyContent() {
    const text = activeTab === "gamers" ? "Nenhum gamer possui esse jogo para troca ainda" : "Nenhuma loja possui esse jogo em estoque";

    const isLoading = activeTab === "gamers" ? loadingGamers : loadingStores;

    return (
      <View margin-50>
        <EmptyListText>
          {!isLoading && text}
        </EmptyListText>
      </View>
    );
  }

  function toggleProduct(product: AddToWishlistSelection, selected: boolean) {
    let newSelectedProducts = [...selectedProducts];

    const foundIndex = newSelectedProducts.findIndex(p => p.id === product.id);
    const found = newSelectedProducts[foundIndex];

    if (!found) {
      newSelectedProducts.push(product);
    } else {
      newSelectedProducts[foundIndex].selected = selected;
    }

    buttonPress(newSelectedProducts);
  }

  function toggleProductPlatform(
    product: AddToWishlistSelection,
    platform: AddToWishlistSelectionAvailablePlatform,
  ) {
    const {platforms} = product;

    const productIndex = selectedProducts.findIndex(p => p.id === product.id);
    const platformIndex = platforms.findIndex(p => p.id === platform.id);

    platform.selected = !platform.selected;

    platforms[platformIndex] = platform;

    const newSelectedProducts = [...selectedProducts];

    newSelectedProducts[productIndex] = {
      ...product,
      platforms,
    };

    setSelectedProducts(newSelectedProducts);
  }

  function activeProductHasSelectedPlatforms(): boolean {
    return modalActiveProduct
      ? modalActiveProduct.platforms.some(p => p.selected)
      : false;
  }

  function buttonPress(selectedProducts: AddToWishlistSelection[]) {
    const dataProducts: AddQuickProductProducts[] = [];

    selectedProducts.forEach(product => {
      if (product.platforms.length === 0) {
        dataProducts.push({
          productId: product.id,
        });
      } else {
        product.platforms.forEach(platform => {
          if (platform.selected) {
            dataProducts.push({
              platformId: platform.id,
              productId: product.id,
            });
          }
        });
      }
    });

    logEvent('add_to_wishlist', {
      gamerId: gamerId || '',
      products: dataProducts || ''
    });

    const data: AddQuickProductRequest = {
      gamerId,
      type: 'wishlist',
      products: dataProducts,
      welcomeGuideDone: true,
    };

    dispatch(addQuickProducts(data));
  }

  function handleAddToCollection() {
    if (isOnCollection) {
      navigation.navigate('MyCollection');
    } else {
      dispatch(
        setActiveAddGameToCollection({
          productId,
        }),
      );

      navigation.navigate('AddToCollection');
    }
  }

  function handleAddToWishlist() {
    if (isOnWishList) {
      navigation.navigate('Home', {screen: 'MyCollection', params: {screen: 'MyWishlist'}});
    } else {
      const platforms: AddToWishlistSelectionAvailablePlatform[] = [];

      availablePlatforms.forEach(platform => {
        const {id, name} = platform;

        platforms.push({
          id,
          name,
          selected: false,
        });
      });

      setModalOpened(true);
      setModalActiveProduct({
        id: productId,
        imagePath: productImagePath,
        name: productName,
        platforms,
        selected: true,
      });
    }
  }

  function handleActiveTabGamers() {
    setActiveTab("gamers");
  }

  function handleActiveTabStores() {
    setActiveTab("stores");
  }

  function handleClose() {
    setModalOpened(false);
  }

  function handleAdicionar() {
    if (modalActiveProduct) {
      toggleProduct(modalActiveProduct, true);
    }

    setModalOpened(false);
  }
  
  function handleGoBack() {
    navigation.goBack();
  }

  function handleNextPage() {
    const hasNextPage = selectProductDetailsHasNextPage(productDetailsRedux, activeTab === "gamers" ? 2 : 1);

    if (hasNextPage) {
      if (activeTab === "gamers") {
        dispatch(getAvailableGamerProductsCatalog({
          catalogType: 2,
          gamerId,
          page: pageGamers + 1,
          productId,
          platformId,
          filters: [],
        }));
      } else {
        dispatch(getAvailableStoreProductsCatalog({
          catalogType: 1,
          gamerId,
          page: pageStores + 1,
          productId,
          platformId,
          filters: [],
        }));
      }
    }
  };

  return (
    <ProductDetailsSafeAreaView>
      <ProductDetailsScrollView>
        <View flex row spread centerV paddingV-5 style={styles.topActions}>
          <MyButton
            label=""
            round
            size="xSmall"
            backgroundColor="transparent"
            style={{height: 30}}
            onPress={handleGoBack}>
            <Icon name="md-arrow-back" color="#ffffff" size={24} />
          </MyButton>

          <View row>
            <TouchableOpacity onPress={handleAddToCollection}>
              <Action>
                <MaterialIcon style={{backgroundColor: '#ffffff', borderRadius: 20}} name={isOnCollection ? 'check' : 'plus'} color={MyColors.secondary} size={24} />

                <ActionText color="#ffffff">
                  Coleção
                </ActionText>
              </Action>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleAddToWishlist}>
              <Action>
                <MaterialIcon style={{backgroundColor: '#ffffff', borderRadius: 20}} name={isOnWishList ? 'check' : 'plus'} color={MyColors.primary} size={24} />

                <ActionText color="#ffffff">
                  Wishlist
                </ActionText>
              </Action>
            </TouchableOpacity>
          </View>
        </View>

        <Header borderColor={getColorByPlatform(platformName || '')}>
          <Image source={{uri: productImagePath}} style={styles.tileImage} />

          <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'}}
          />
        </Header>

        <View background-white paddingT-20>
          <View centerH row marginB-10>
            <TouchableOpacity onPress={handleActiveTabStores}>
              <View style={[styles.buttonGroup,  styles.buttonGroup1, activeTab === "stores" && styles.buttonGroupActive]}>
                <Text dark10>
                  Comprar ({countStores})
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleActiveTabGamers}>
              <View style={[styles.buttonGroup, styles.buttonGroup2, activeTab === "gamers" && styles.buttonGroupActive]}>
                <Text dark10>
                  Trocar ({countGamers})
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Items>
            {activeTab === "gamers" ?
              <FlatList
                ListEmptyComponent={_renderEmptyContent}
                data={availableGamerProductsCatalog}
                keyExtractor={_keyExtractor}
                onEndReached={handleNextPage}
                renderItem={_renderItem}
              />
                :
              <FlatList
                ListEmptyComponent={_renderEmptyContent}
                data={availableStoreProductsCatalog}
                keyExtractor={_keyExtractor}
                onEndReached={handleNextPage}
                renderItem={_renderItem}
              />
            }
          </Items>
        </View>

        <View margin-30 />
      </ProductDetailsScrollView>

      <Modal
        isVisible={modalOpened}
        onBackdropPress={handleClose}>
        <ModalWrapper>
          <ScrollView>
            <ModalHeader>
              <ModalHeaderTitle>{modalActiveProduct?.name}</ModalHeaderTitle>

              <ModalHeaderText>
                Selecione para quais plataformas você gostaria de ter esse game
              </ModalHeaderText>
            </ModalHeader>

            {modalActiveProduct &&
              modalActiveProduct.platforms.map((platform, index) => {
                const {id: platformId, name, selected} = platform;

                function handleToggle() {
                  if (modalActiveProduct) {
                    toggleProductPlatform(modalActiveProduct, platform);
                  }
                }

                return (
                  <ModalItem key={`${platformId} - ${index}`}>
                    <CheckBox
                      checkedCheckBoxColor={MyColors.primary}
                      rightText={name}
                      isChecked={selected}
                      onClick={handleToggle}
                      style={styles.checkbox}
                    />
                  </ModalItem>
                );
              })}
          </ScrollView>

          <MyButton
            label="Adicionar"
            disabled={!activeProductHasSelectedPlatforms()}
            onPress={handleAdicionar}
          />
        </ModalWrapper>
      </Modal>

      <CustomActivityIndicator isVisible={loadingGamers || loadingStores} />
    </ProductDetailsSafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#b7b7b7",
  },
  buttonGroup1: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonGroup2: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonGroupActive: {
    backgroundColor: "#d9ecff",
  },
  cashback: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {height: 30, width: 30},
  imageAvatar: {
    width: 40,
    height: 40,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#dddddd',
    padding: 5,
  },
  star: {
    height: 14,
    width: 14,
    marginRight: 3,
  },
  tileImage: {
    height: 250,
    width,
    resizeMode: 'cover',
  },
  topActions: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingLeft: 5,
    paddingRight: 15,
    zIndex: 999,
  },
  wishlistImage: {height: 30, width: 26},
  checkbox: {
    margin: 0,
    marginLeft: 0,
    padding: 0,
    backgroundColor: '#ffffff',
    borderWidth: 0,
  },
})

export default ProductDetails;
