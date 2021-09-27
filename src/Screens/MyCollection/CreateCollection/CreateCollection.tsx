import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, Picker, StyleSheet} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import CheckBox from 'react-native-check-box';
import Modal from 'react-native-modal';

import {addQuickProducts} from 'src/Store/Ducks/gamer';
import {
  getWelcomeGuideProducts,
  setWelcomeGuideActivePage,
} from 'src/Store/Ducks/searchProducts';

import {
  AddQuickProductProducts,
  AddQuickProductRequest,
} from '../../../Models/Gamer';
import {
  WelcomeGuideProduct,
  WelcomeGuideProductSelection,
  WelcomeGuideProductSelectionPlatform,
} from '../../../Models/Product';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  ListContainer,
  LoadingMore,
  ModalContent,
  ModalHeader,
  ModalHeaderText,
  ModalHeaderTitle,
  ModalItem,
  ModalWrapper,
  CreateCollectionSafeAreaView,
} from './CreateCollectionStyles';
import {GamerAppReduxStore} from 'src/Store';
import GamerAppCard from 'src/Components/GamerAppCard';
import SearchTextField from 'src/Components/TextField/SearchTextField';
import {View} from 'react-native-ui-lib';
import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window');

let cardWidth = (width - 110) / 3;

if (cardWidth < 120) {
  cardWidth = (width - 55) / 2;
}

function CreateCollection() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalActiveProduct, setModalActiveProduct] = useState<
    WelcomeGuideProductSelection
  >();
  const [modalOpened, setModalOpened] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<
    WelcomeGuideProductSelection[]
  >([]);

  const pageSize = 20;
  const {searchProducts: searchProductsRedux, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {
    loading,
    searchActivePage,
    totalItems,
    welcomeGuideActivePage,
    welcomeGuideProducts,
  } = searchProductsRedux;

  useEffect(() => {
    dispatch(
      getWelcomeGuideProducts({
        search,
        page: welcomeGuideActivePage,
        quantity: pageSize,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollView = useRef(null);

  const hasSelectedProducts =
    selectedProducts.length > 0 && selectedProducts.some((p) => p.selected);

  const {user} = userRedux;

  const totalPages = Math.ceil(totalItems / pageSize);

  const hasNextPage = welcomeGuideActivePage < totalPages;

  const {gamerId} = user;

  function nextPage() {
    if (hasNextPage) {
      dispatch(setWelcomeGuideActivePage(welcomeGuideActivePage + 1));

      dispatch(
        getWelcomeGuideProducts({
          search,
          page: welcomeGuideActivePage + 1,
          quantity: pageSize,
        }),
      );
    }
  }

  const onChangeText = (search: string) => {
    setSearch(search);
  };

  const handleSearch = () => {
    dispatch(setWelcomeGuideActivePage(1));
    dispatch(getWelcomeGuideProducts({search, page: 1, quantity: pageSize}));
  };

  function _keyExtractor(item: WelcomeGuideProduct) {
    return `${item.id}`;
  }

  function _renderItem({item}: {item: WelcomeGuideProduct}) {
    const selectedProduct = selectedProducts.find((p) => p.id === item.id);
    const isSelected = selectedProduct && selectedProduct.selected;

    function handleOnPress() {
      _onPress(item)
    }

    return (
      <GamerAppCard
        imageSource={{uri: item.imagePath}}
        onPress={handleOnPress}
        name={item.name}
        marginVertical={10}
        selected={isSelected}
      />
    );
  }

  function _onPress(product: WelcomeGuideProduct) {
    const {productType} = product;

    const found = selectedProducts.find((p) => p.id === product.id);

    if (found) {
      if (productType.toLowerCase() === 'game') {
        setModalActiveProduct(found);
        setModalOpened(true);
      } else {
        toggleProduct(found, !found.selected);
      }

      return;
    }

    const newPlatforms: WelcomeGuideProductSelectionPlatform[] = product.platforms.map(
      (p) => ({
        ...p,
        quantity: 1,
        mediaType: 'fisica',
        selected: false,
      }),
    );

    const newProduct: WelcomeGuideProductSelection = {
      ...product,
      platforms: newPlatforms,
      selected: false,
    };

    selectedProducts.push(newProduct);

    setSelectedProducts(selectedProducts);

    if (product.productType.toLowerCase() === 'game') {
      setModalActiveProduct(newProduct);
      setModalOpened(true);
    } else {
      toggleProduct(newProduct, true);
    }
  }

  function toggleProduct(
    product: WelcomeGuideProductSelection,
    selected: boolean,
  ) {
    let newSelectedProducts = [...selectedProducts];

    const foundIndex = newSelectedProducts.findIndex(
      (p) => p.id === product.id,
    );
    const found = newSelectedProducts[foundIndex];

    if (!found) {
      newSelectedProducts.push(product);

      setSelectedProducts(newSelectedProducts);
    } else {
      found.selected = selected;

      if (!selected) {
        found.platforms = found.platforms.map(platform => {
          platform.selected = false;
  
          return platform;
        })
      }

      newSelectedProducts[foundIndex] = found;

      setSelectedProducts(newSelectedProducts);
    }
  }

  function toggleProductPlatform(
    product: WelcomeGuideProductSelection,
    platform: WelcomeGuideProductSelectionPlatform,
    selected?: boolean
  ) {
    const {platforms} = product;

    const productIndex = selectedProducts.findIndex((p) => p.id === product.id);
    const platformIndex = platforms.findIndex((p) => p.id === platform.id);

    platform.selected = typeof selected !== 'undefined' ? selected : !platform.selected;

    platforms[platformIndex] = platform;

    const newSelectedProducts = [...selectedProducts];

    newSelectedProducts[productIndex] = {
      ...product,
      platforms,
    };

    setSelectedProducts(newSelectedProducts);
  }

  function adjustScroll() {
    if (welcomeGuideProducts.length > 0) {
      // @ts-ignore
      scrollView.current.scrollToIndex({
        index: 0,
        animated: true,
      });
    }
  }

  function renderSearchBar() {
    return (
      <SearchTextField
        containerStyle={styles.container}
        onBlur={handleSearch}
        handleChangeText={onChangeText}
        onFocus={adjustScroll}
        placeholder="Pesquisar"
        value={search}
      />
    );
  }

  function renderContent() {
    return (
      <ListContainer>
        {renderSearchBar()}

        <FlatList
          ListFooterComponent={renderFooter}
          contentContainerStyle={styles.flatListContainer}
          data={welcomeGuideProducts}
          keyExtractor={_keyExtractor}
          numColumns={cardWidth < 120 ? 3 : 2}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          ref={scrollView}
          renderItem={_renderItem}
        />
      </ListContainer>
    );
  }

  function renderFooter() {
    return (
      <LoadingMore>
        <CustomActivityIndicator isVisible={searchActivePage > 1 && hasNextPage} />
      </LoadingMore>
    );
  }

  function buttonPress() {
    if (hasSelectedProducts) {
      const dataProducts: AddQuickProductProducts[] = [];

      selectedProducts.forEach((product) => {
        if (product.platforms.length === 0) {
          dataProducts.push({
            productId: product.id,
          });
        } else {
          product.platforms.forEach((platform) => {
            if (platform.selected) {
              dataProducts.push({
                mediaType: platform.mediaType,
                platformId: platform.id,
                productId: product.id,
              });
            }
          });
        }
      });

      const data: AddQuickProductRequest = {
        gamerId,
        type: 'catalog',
        products: dataProducts,
        welcomeGuideDone: true,
      };

      dispatch(addQuickProducts(data));

      navigation.navigate('MyCollection');
    }
  }

  function countSelectedProducts(): number {
    const filtered = selectedProducts.filter((p) => p.selected);

    return filtered.length;
  }

  function changeProductPlatformMediaType(
    product: WelcomeGuideProductSelection,
    platform: WelcomeGuideProductSelectionPlatform,
    mediaType: 'fisica' | 'digital',
  ) {
    const platformIndex = product.platforms.findIndex(
      (p) => p.id === platform.id,
    );

    platform.mediaType = mediaType;

    const newPlatforms = [...product.platforms];

    newPlatforms[platformIndex] = platform;

    const productIndex = selectedProducts.findIndex((p) => p.id === product.id);

    const newSelectedProducts = [...selectedProducts];

    newSelectedProducts[productIndex] = product;

    setSelectedProducts(newSelectedProducts);
  }

  function activeProductHasSelectedPlatforms(): boolean {
    return modalActiveProduct
      ? modalActiveProduct.platforms.some((p) => p.selected)
      : false;
  }

  function handleCloseModal() {
    setModalOpened(false);
  }

  function handleAdicionar() {
    if (modalActiveProduct) {
      toggleProduct(modalActiveProduct, true);
    }

    setModalOpened(false);
  }

  function handleRemover() {
    if (modalActiveProduct) {
      toggleProduct(modalActiveProduct, false);
    }

    setModalOpened(false);
  }

  return (
    <CreateCollectionSafeAreaView>
      {renderContent()}

      <View style={styles.buttonContainer}>
        <MyButton
          disabled={!hasSelectedProducts}
          label={`${
            hasSelectedProducts ? countSelectedProducts() : ''
          } Adicionar a coleção`}
          onPress={buttonPress}
          style={[styles.buttonStyle1, ...(hasSelectedProducts ? [styles.buttonAdicionarStyle2] : [])]}
          type="secondary"
        />
      </View>

      <Modal
        isVisible={modalOpened}
        onBackdropPress={handleCloseModal}>
        <ModalWrapper>
          <ScrollView>
            <ModalHeader>
              <ModalHeaderTitle>{modalActiveProduct?.name}</ModalHeaderTitle>

              <ModalHeaderText>
                Selecione as plataformas e o tipo de mídia que você possui
              </ModalHeaderText>
            </ModalHeader>

            {modalActiveProduct &&
              modalActiveProduct.platforms.map((platform, index) => {
                const {id: platformId, mediaType, name, selected} = platform;

                function handleToggle() {
                  if (modalActiveProduct) {
                    toggleProductPlatform(modalActiveProduct, platform);
                  }
                }

                function handleChange(itemValue: any) {
                  if (modalActiveProduct) {
                    changeProductPlatformMediaType(
                      modalActiveProduct,
                      platform,
                      itemValue,
                    );
  
                    toggleProductPlatform(modalActiveProduct, platform, true);
                  }
                }

                return (
                  <ModalItem key={`${platformId} - ${index}`}>
                    <CheckBox
                      checkedCheckBoxColor={MyColors.primary}
                      checkBoxColor={MyColors.gray2}
                      rightText={name}
                      isChecked={selected}
                      onClick={handleToggle}
                      style={styles.checkbox}
                    />

                    <ModalContent>
                      <Picker
                        selectedValue={mediaType}
                        onValueChange={handleChange}>
                        <Picker.Item label="Mídia Física" value="fisica" />
                        <Picker.Item label="Mídia Digital" value="digital" />
                      </Picker>
                    </ModalContent>
                  </ModalItem>
                );
              })}
          </ScrollView>

          <MyButton
            label="Adicionar"
            disabled={!activeProductHasSelectedPlatforms()}
            onPress={handleAdicionar}
            marginVertical={0}
          />

          {modalActiveProduct && modalActiveProduct.selected && (
            <MyButton
              type="warn"
              label="Remover"
              disabled={!activeProductHasSelectedPlatforms()}
              onPress={handleRemover}
            />
          )}
        </ModalWrapper>
      </Modal>

      <CustomActivityIndicator isVisible={searchActivePage === 1 && loading} />
    </CreateCollectionSafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {alignItems: 'center'},
  buttonStyle1: {
    paddingVertical: 13,
    backgroundColor: '#555555',
  },
  buttonAdicionarStyle2: {
    backgroundColor: MyColors.secondary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 5,
    right: 5,
  },
  card: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  container: {
    paddingTop: 12,
    paddingHorizontal: 15,
  },
  inputContainer: {
    backgroundColor: '#ededed',
  },
  checkbox: {
    margin: 0,
    marginLeft: 0,
    padding: 0,
    backgroundColor: '#ffffff',
    borderWidth: 0,
  }
});

export default CreateCollection;
