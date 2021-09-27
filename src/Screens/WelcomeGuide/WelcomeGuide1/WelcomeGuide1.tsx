import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, Picker, StyleSheet} from 'react-native';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {
  Button,
  Card,
  CheckBox,
  Image,
  Overlay,
  SearchBar,
} from 'react-native-elements';

import {ReactNativeElementsTheme} from '../../../Themes';

import {addQuickProducts} from 'src/Store/Ducks/gamer';
import {
  getWelcomeGuideProducts,
  setWelcomeGuideActivePage,
} from 'src/Store/Ducks/searchProducts';

import {GamerAppReduxStore} from '../../../Models/Redux';
import {InjectedNavigation} from '../../../Models/Utils';
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
  ButtonCount,
  CardText,
  H1,
  H2,
  Header,
  HeaderTextContainer,
  ListContainer,
  LoadingMore,
  ModalContent,
  ModalHeader,
  ModalHeaderText,
  ModalHeaderTitle,
  ModalItem,
  ModalWrapper,
  WarningContainer,
  WarningText,
  WelcomeGuide1SafeAreaView,
} from './WelcomeGuide1Styles';
import {logEvent} from '../../../Analytics/analyticsFunctions';
import { MyColors } from 'src/Theme/FoundationConfig';

const {width} = Dimensions.get('window');

let cardWidth = (width - 110) / 3;

if (cardWidth < 120) {
  cardWidth = (width - 55) / 2;
}

function WelcomeGuide1({navigation}: InjectedNavigation) {
  const dispatch = useDispatch();

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
    totalItems,
    welcomeGuideActivePage,
    welcomeGuideProducts,
  } = searchProductsRedux;

  useEffect(() => {
    logEvent('welcomeguide_collection');
    dispatch(
      getWelcomeGuideProducts({
        search,
        page: welcomeGuideActivePage,
        quantity: pageSize,
      }),
    );
  }, []);

  const scrollView = useRef(null);
  const searchBar = useRef(null);

  const hasSelectedProducts =
    selectedProducts.length > 0 && selectedProducts.some(p => p.selected);

  const {user} = userRedux;

  const totalPages = Math.ceil(totalItems / pageSize);

  const hasNextPage = welcomeGuideActivePage < totalPages;

  const {gamerId} = user;

  const clear = () => {
    setSearch('');
    dispatch(
      getWelcomeGuideProducts({search: '', page: 1, quantity: pageSize}),
    );
    dispatch(setWelcomeGuideActivePage(1));
  };

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

  function _onPress(product: WelcomeGuideProduct) {
    const {productType} = product;

    const found = selectedProducts.find(p => p.id === product.id);

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
      p => ({
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

  function _renderItem({item}: {item: WelcomeGuideProduct}) {
    const selectedProduct = selectedProducts.find(p => p.id === item.id);
    const isSelected = selectedProduct && selectedProduct.selected;

    function handlePress() {
      _onPress(item)
    }

    return (
      <TouchableOpacity activeOpacity={0.3} onPress={handlePress}>
        <Card
          containerStyle={[styles.card, isSelected && styles.cardSelected]}
          imageWrapperStyle={{padding: 10}}
          image={{uri: item.imagePath}}
          imageProps={{resizeMethod: 'resize', resizeMode: 'cover'}}>
          <CardText>{item.name}</CardText>
        </Card>
      </TouchableOpacity>
    );
  }

  function toggleProduct(
    product: WelcomeGuideProductSelection,
    selected: boolean,
  ) {
    let newSelectedProducts = [...selectedProducts];

    const foundIndex = newSelectedProducts.findIndex(p => p.id === product.id);
    const found = newSelectedProducts[foundIndex];

    if (!found) {
      newSelectedProducts.push(product);

      setSelectedProducts(newSelectedProducts);
    } else {
      newSelectedProducts[foundIndex].selected = selected;

      setSelectedProducts(newSelectedProducts);
    }
  }

  function toggleProductPlatform(
    product: WelcomeGuideProductSelection,
    platform: WelcomeGuideProductSelectionPlatform,
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

  function isPlatformChecked(productId: string, platformId: string): boolean {
    const product = selectedProducts.find(p => p.id === productId);

    if (!product) {
      return false;
    }

    const platform = product.platforms.find(p => p.id === platformId);

    return platform ? platform.selected : false;
  }

  function adjustScroll() {
    if (welcomeGuideProducts.length > 0) {
      // @ts-ignore
      scrollView.current.scrollToIndex({
        index: 0,
        animated: true,
      });
      // @ts-ignore
    }
  }

  function renderSearchBar() {
    return (
      <SearchBar
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        lightTheme
        onBlur={handleSearch}
        onChangeText={onChangeText}
        onClear={clear}
        onFocus={adjustScroll}
        placeholder="Pesquisar"
        ref={searchBar}
        showLoading={loading}
        value={search}
      />
    );
  }

  function renderHeader() {
    return (
      <Header>
        <HeaderTextContainer>
          <H1>Bem vindo(a) ao Gamer App!</H1>

          <H2>
            Para começar, selecione alguns games que você já tem na sua coleção
          </H2>

          <WarningContainer>
            <Image
              source={require('../../../Assets/images/welcome-guide/magic-wand.png')}
              style={{width: 40, height: 40}}
            />

            <WarningText>
              Com isso, você passa a receber propostas de troca automáticas!
            </WarningText>
          </WarningContainer>
        </HeaderTextContainer>
      </Header>
    );
  }

  function renderContent() {
    return (
      <ListContainer>
        {renderSearchBar()}

        <FlatList
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{alignItems: 'center'}}
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
      <LoadingMore>{hasNextPage && <CustomActivityIndicator />}</LoadingMore>
    );
  }

  function buttonPress() {
    if (hasSelectedProducts) {
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

      navigation.navigate('WelcomeGuide2');
    } else {
      navigation.navigate('Home');
    }
  }

  function countSelectedProducts(): number {
    const filtered = selectedProducts.filter(p => p.selected);

    return filtered.length;
  }

  function changeProductPlatformMediaType(
    product: WelcomeGuideProductSelection,
    platform: WelcomeGuideProductSelectionPlatform,
    mediaType: 'fisica' | 'digital',
  ) {
    const platformIndex = product.platforms.findIndex(
      p => p.id === platform.id,
    );

    platform.mediaType = mediaType;

    const newPlatforms = [...product.platforms];

    newPlatforms[platformIndex] = platform;

    const productIndex = selectedProducts.findIndex(p => p.id === product.id);

    const newSelectedProducts = [...selectedProducts];

    newSelectedProducts[productIndex] = product;

    setSelectedProducts(newSelectedProducts);
  }

  function activeProductHasSelectedPlatforms(): boolean {
    return modalActiveProduct
      ? modalActiveProduct.platforms.some(p => p.selected)
      : false;
  }

  function handleCloseModal() {
    setModalOpened(false);
  }

  return (
    <WelcomeGuide1SafeAreaView>
      {renderContent()}

      <Button
        title={hasSelectedProducts ? 'Adicionar a coleção' : 'Pular'}
        icon={
          hasSelectedProducts && (
            <ButtonCount>
              {hasSelectedProducts ? countSelectedProducts() : ''}
            </ButtonCount>
          )
        }
        containerStyle={styles.buttonContainer}
        buttonStyle={[
          styles.button,
          hasSelectedProducts && styles.buttonAdicionar,
        ]}
        onPress={buttonPress}
      />

      <Overlay
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

                // @ts-ignore
                const isChecked = isPlatformChecked(
                  modalActiveProduct.id,
                  platformId,
                );

                function handleToggle() {
                  toggleProductPlatform(modalActiveProduct, platform);
                }

                return (
                  <ModalItem key={`${platformId} - ${index}`}>
                    <CheckBox
                      title={name}
                      checked={selected}
                      onPress={handleToggle}
                      containerStyle={styles.checkbox}
                    />

                    <ModalContent>
                      <Picker
                        selectedValue={mediaType}
                        onValueChange={itemValue =>
                          changeProductPlatformMediaType(
                            modalActiveProduct,
                            platform,
                            itemValue,
                          )
                        }>
                        <Picker.Item label="Mídia Física" value="fisica" />
                        <Picker.Item label="Mídia Digital" value="digital" />
                      </Picker>
                    </ModalContent>
                  </ModalItem>
                );
              })}
          </ScrollView>

          <Button
            title="Adicionar"
            disabled={!activeProductHasSelectedPlatforms()}
            onPress={() => {
              if (modalActiveProduct) {
                toggleProduct(modalActiveProduct, true);
              }

              setModalOpened(false);
            }}
          />

          {modalActiveProduct && modalActiveProduct.selected && (
            <Button
              buttonStyle={{
                backgroundColor: MyColors.warn,
              }}
              containerStyle={{
                marginTop: 10,
              }}
              title="Remover"
              disabled={!activeProductHasSelectedPlatforms()}
              onPress={() => {
                if (modalActiveProduct) {
                  toggleProduct(modalActiveProduct, false);
                }

                setModalOpened(false);
              }}
            />
          )}
        </ModalWrapper>
      </Overlay>
    </WelcomeGuide1SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    backgroundColor: '#555555',
  },
  buttonAdicionar: {
    backgroundColor: MyColors.secondary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
  },
  card: {
    marginVertical: 15,
    marginHorizontal: 10,
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  cardSelected: {
    borderColor: '#1c60d6',
    borderWidth: 2,
  },
  container: {
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
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

export default WelcomeGuide1;
