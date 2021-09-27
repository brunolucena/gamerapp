import React, {useCallback, useEffect, useRef} from 'react';
import {
  Dimensions,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Image, View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';

import {
  getGamerCollection,
  setGamerCollectionData,
  selectIsMyCollectionOrWishlist,
  setActiveAddGameToCollection,
} from 'src/Store/Ducks/gamerCollection';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import MyButton from 'src/Components/Button';

import {
  CarouselItemBottom,
  CarouselItemContainer,
  CarouselItemSubTitle,
  CarouselItemTitle,
  CarouselTitleLeft,
  CarouselTitleRight,
  CarouselTitleRightText,
  CarouselTitleWrapper,
  MyCollectionSafeAreaView,
  MyCollectionScrollView,
  MyCollectionText,
  Overview,
  OverviewText,
  TextContainer,
} from './CollectionStyles';
import {ProductType} from '../../../Models/GamerProductCollection';
import {GamerAppReduxStore} from 'src/Store';
import {deleteGamerProductMyCatalog} from 'src/Store/Ducks/myCollection';
import {setActiveTrade} from 'src/Store/Ducks/tradeActive';

interface CarouselProduct {
  category: ProductType;
  description?: string;
  forSale: boolean;
  forTrade: boolean;
  id: string;
  imageUrl: string;
  name: string;
  platformName: string;
  price: number;
}

const {width: screenWidth} = Dimensions.get('window');
const itemWidth = screenWidth - 60;
const itemHeight = screenWidth - 60;

const Collection = () => {
  const carouselRef = useRef(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {gamerCollection: gamerCollectionRedux, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId} = userRedux.user;

  const {
    accessories,
    activeGamerId,
    gamer,
    games,
    loading,
    platforms,
    refreshing,
    shouldReload,
  } = gamerCollectionRedux;

  useEffect(() => {
    if (gamerId) {
      dispatch(
        getGamerCollection({
          gamerId: activeGamerId,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gamerId]);

  useFocusEffect(
    React.useCallback(() => {
      if (shouldReload) {
        dispatch(
          getGamerCollection({
            gamerId: activeGamerId,
          }),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gamerId, shouldReload]),
  );

  const onRefresh = useCallback(() => {
    dispatch(setGamerCollectionData({refreshing: true}));

    dispatch(
      getGamerCollection({
        gamerId: activeGamerId,
      }),
    );
  }, [dispatch, gamerId]);

  const isMyCollection = selectIsMyCollectionOrWishlist(
    gamerCollectionRedux,
    userRedux,
  );

  const isEmpty =
    accessories.length === 0 && games.length === 0 && platforms.length === 0;

  const carouselData: CarouselProduct[] = [];

  games.forEach(game => {
    const {
      forSale,
      forTrade,
      gamerProductCatalogId,
      productImageUrl,
      productName,
      platform,
      price,
    } = game;

    carouselData.push({
      category: 'Game',
      forSale,
      forTrade,
      id: gamerProductCatalogId,
      imageUrl: productImageUrl,
      name: productName,
      platformName: platform,
      price,
    });
  });

  accessories.forEach(accessory => {
    const {
      forSale,
      forTrade,
      gamerProductCatalogId,
      platform,
      price,
      productImageUrl,
      productName,
    } = accessory;

    carouselData.push({
      category: 'Acessorio',
      forSale,
      forTrade,
      id: gamerProductCatalogId,
      imageUrl: productImageUrl,
      name: productName,
      platformName: platform,
      price,
    });
  });

  platforms.forEach(platform => {
    const {
      forSale,
      forTrade,
      gamerProductCatalogId,
      price,
      productImageUrl,
      productName,
    } = platform;

    carouselData.push({
      category: 'Plataforma',
      forSale,
      forTrade,
      id: gamerProductCatalogId,
      imageUrl: productImageUrl,
      name: productName,
      platformName: '',
      price,
    });
  });

  function renderContent() {
    function _renderItem(
      {item, index}: {item: CarouselProduct; index: number},
      parallaxProps: object,
    ) {
      const {
        category,
        forSale,
        forTrade,
        id,
        imageUrl,
        name,
        platformName,
        price,
      } = item;

      const hasIcon = forSale || forTrade;

      const handleEdit = () => {
        dispatch(
          setActiveAddGameToCollection({
            category,
            gamerProductCatalogId: id,
          }),
        );

        navigation.navigate('AddToCollection');
      };

      const handleRemove = () => {
        Alert.alert(`Remover ${name} da coleção`, '', [
          {
            text: 'Cancelar',
          },
          {
            onPress: function() {
              dispatch(
                deleteGamerProductMyCatalog({gamerProductCatalogId: id}),
              );
            },
            text: 'Confirmar',
          },
        ]);
      };

      const handleTradeRequest = () => {
        dispatch(
          setActiveTrade({
            fromGamerId: gamerId,
            toGamerId: activeGamerId,
            selectedGamerProductCatalogId: id,
          }),
        );

        navigation.navigate('TradeRequest');
      };

      return (
        <CarouselItemContainer key={`${id} - ${index}`}>
          <View style={styles.overlay}>
            <Image
              resizeMode="cover"
              source={{uri: imageUrl}}
              style={[styles.image, styles.imageContainer]}
              {...parallaxProps}
            />
          </View>

          <CarouselTitleWrapper
            justifyContent={!forSale && !forTrade ? 'center' : 'space-between'}>
            <CarouselTitleLeft>
              {price > 0 && <CarouselItemTitle>R$ {price}</CarouselItemTitle>}

              <CarouselItemSubTitle>
                {platformName ? `${platformName}, ` : ''}
                {name}
              </CarouselItemSubTitle>
            </CarouselTitleLeft>

            {hasIcon && (
              <CarouselTitleRight>
                <Image
                  source={require('../../../Assets/images/trade/confirm.png')}
                  style={styles.confirm}
                />

                <CarouselTitleRightText>
                  {forSale && forTrade ? 'Aceita troca' : ''}
                  {!forSale && forTrade ? 'Só troca' : ''}
                </CarouselTitleRightText>
              </CarouselTitleRight>
            )}
          </CarouselTitleWrapper>

          {isMyCollection ? (
            <CarouselItemBottom>
              <MyButton onPress={handleEdit} label="Editar" clear />

              <MyButton onPress={handleRemove} label="Remover" clear />
            </CarouselItemBottom>
          ) : (
            <CarouselItemBottom>
              {!forSale && !forTrade ? (
                <>
                  <Image
                    source={require('../../../Assets/images/mycollection/treasure-blue.png')}
                    style={styles.treasure}
                  />

                  <MyButton label="Item da coleção" clear />
                </>
              ) : (
                <MyButton
                  type="secondary"
                  iconSource={require('../../../Assets/images/trade/confirm-white.png')}
                  iconStyle={styles.confirmWhite}
                  onPress={handleTradeRequest}
                  label="Iniciar troca"
                />
              )}
            </CarouselItemBottom>
          )}
        </CarouselItemContainer>
      );
    }

    return (
      <MyCollectionSafeAreaView>
        <MyCollectionScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <TouchableWithoutFeedback>
            <TextContainer>
              <MyCollectionText>
                Bem vindo a coleção de {gamer.name}
              </MyCollectionText>
            </TextContainer>
          </TouchableWithoutFeedback>

          <Overview>
            <OverviewText>
              {games.length} game{games.length !== 1 && 's'}
            </OverviewText>

            <OverviewText borderWidth="2">
              {platforms.length} console{platforms.length !== 1 && 's'}
            </OverviewText>

            <OverviewText borderWidth="2">
              {accessories.length} acessório{accessories.length !== 1 && 's'}
            </OverviewText>
          </Overview>

          <Carousel
            containerCustomStyle={styles.containerCustom}
            data={carouselData}
            itemWidth={itemWidth}
            layout="default"
            loop
            ref={carouselRef}
            renderItem={_renderItem}
            sliderHeight={itemHeight}
            sliderWidth={screenWidth}
          />
        </MyCollectionScrollView>

        <CustomActivityIndicator isVisible={loading} />
      </MyCollectionSafeAreaView>
    );
  }

  return renderContent();
};

const styles = StyleSheet.create({
  confirm: {height: 25, width: 25},
  confirmWhite: {height: 20, width: 20},
  person: {height: 100, width: 100},
  person1: {position: 'absolute', top: 20, left: -50},
  person2: {position: 'absolute', bottom: 80, right: -40},
  myButton: {position: 'absolute', bottom: 0, left: 0, right: 0},
  treasure: {height: 60, width: 65},
  containerCustom: {marginTop: 10, marginBottom: 20},
  card: {
    width: 200,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  highlightText: {
    color: '#1957ba',
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
  },
  imageContainer: {
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    width: screenWidth - 60,
  },
  overviewLeft: {
    height: 50,
    justifyContent: 'space-between',
    color: '#474747',
  },
  overviewRight: {
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    width: screenWidth,
    height: itemHeight - 100,
  },
  sectionContainer: {
    margin: 10,
    paddingTop: 10,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  textMedium: {
    fontSize: 22,
  },
});

export default Collection;
