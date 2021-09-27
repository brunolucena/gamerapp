import React, {useEffect, useRef, useCallback} from 'react';
import {
  Dimensions,
  StyleSheet,
  Platform,
  Alert,
  RefreshControl,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {
  getMyCollection,
  deleteGamerProductMyCatalog,
  setMyCollectionData,
} from 'src/Store/Ducks/myCollection';
import {setActiveAddGameToCollection} from 'src/Store/Ducks/gamerCollection';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  CarouselItemBottom,
  CarouselItemContainer,
  CarouselItemSubTitle,
  CarouselItemTitle,
  CarouselTitleLeft,
  CarouselTitleRight,
  CarouselTitleRightText,
  CarouselTitleWrapper,
  EmptyContentContainer,
  EmptyContentHeaderText,
  EmptyContentP,
  MyCollectionSafeAreaView,
  MyCollectionScrollView,
  MyCollectionText,
  Overview,
  OverviewText,
  TextContainer,
} from './MyCollectionStyles';
import {ProductType} from '../../../Models/GamerProductCollection';
import {GamerAppReduxStore} from 'src/Store';
import {Image, View} from 'react-native-ui-lib';
import MyButton from 'src/Components/Button';

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

const MyCollection = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);

  const dispatch = useDispatch();

  const userRedux = useSelector((state: GamerAppReduxStore) => state.user);
  const myCollectionRedux = useSelector(
    (state: GamerAppReduxStore) => state.myCollection,
  );

  const {gamerId} = userRedux.user;

  const {
    accessories,
    gamer,
    games,
    loading,
    platforms,
    refreshing,
    shouldReload,
  } = myCollectionRedux;

  useEffect(() => {
    if (gamerId) {
      dispatch(
        getMyCollection({
          gamerId,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gamerId]);

  useFocusEffect(
    React.useCallback(() => {
      if (shouldReload) {
        dispatch(
          getMyCollection({
            gamerId,
          }),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gamerId, shouldReload]),
  );

  const onRefresh = useCallback(() => {
    dispatch(setMyCollectionData({refreshing: true}));

    dispatch(
      getMyCollection({
        gamerId,
      }),
    );
  }, [dispatch, gamerId]);

  const isMyCollection = true;

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

  function handleAddToCollection() {
    navigation.navigate('CreateCollection');
  }

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

          <CarouselItemBottom>
            <MyButton
              onPress={handleEdit}
              outline
              label="Editar"
              marginHorizontal={5}
              size="medium"
            />

            <MyButton
              onPress={handleRemove}
              label="Remover"
              marginHorizontal={5}
              size="medium"
              type="error"
            />
          </CarouselItemBottom>
        </CarouselItemContainer>
      );
    }

    return (
      <MyCollectionSafeAreaView>
        <MyCollectionScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <TouchableOpacity onPress={handleAddToCollection}>
            <TextContainer>
              <View />

              <MyCollectionText>
                {isMyCollection
                  ? 'Adicionar a sua coleção'
                  : `Bem vindo a coleção de ${gamer.name}`}
              </MyCollectionText>

              {isMyCollection && <Icon name="plus" color="#ffffff" />}
            </TextContainer>
          </TouchableOpacity>

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

  function renderIsEmptyContent() {
    const handleCreateCollection = () =>
      navigation.navigate('CreateCollection');

    return (
      <EmptyContentContainer>
        {!loading && (
          <>
            <Image
              source={require('../../../Assets/images/mycollection/treasure.png')}
              style={styles.treasure}
            />

            <EmptyContentHeaderText>
              Seja bem vindo(a) a sua coleção!
            </EmptyContentHeaderText>

            <EmptyContentP>
              Seja destaque no Gamer Ranking, disponibilize para troca ou venda
              seus games, consoles e muito mais
            </EmptyContentP>

            <MyButton
              label="Criar coleção"
              onPress={handleCreateCollection}
              style={styles.myButton}
              type="secondary"
            />

            <Image
              source={require('../../../Assets/images/mycollection/person.png')}
              style={[styles.person, styles.person1]}
            />

            <Image
              source={require('../../../Assets/images/mycollection/person-2.png')}
              style={[styles.person, styles.person2]}
            />
          </>
        )}

        <CustomActivityIndicator isVisible={loading} />
      </EmptyContentContainer>
    );
  }

  return isEmpty && isMyCollection ? renderIsEmptyContent() : renderContent();
};

const styles = StyleSheet.create({
  confirm: {height: 25, width: 25},
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

export default MyCollection;
