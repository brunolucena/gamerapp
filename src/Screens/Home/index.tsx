import ActivateDevMode from '../../Components/ActivateDevMode';
import appConfig from '../../../app.json';
import CustomActivityIndicator from '../../Components/CustomActivityIndicator';
import getColorByPlatform from 'src/Helpers/getColorByPlatform';
import HomeCarousel from './HomeCarousel';
import HomeWarning from './HomeWarning/HomeWarning';
import React, { useCallback, useEffect, useRef } from 'react';
import SearchTextField from 'src/Components/TextField/SearchTextField';
import Spinkit from 'react-native-spinkit';
import { dateDiff, getHeightProportion } from 'src/Helpers/functions';
import { formatCurrency } from 'src/Helpers/formatCurrency';
import { GamerAppReduxStore } from 'src/Store';
import { Image, Text as TextUI, View as ViewUI } from 'react-native-ui-lib';
import { logEvent } from '../../Analytics/analyticsFunctions';
import { MyColors } from 'src/Theme/FoundationConfig';
import { selectUserHasAddress } from 'src/Store/Ducks/user';
import { setActiveGamerCollectionId } from 'src/Store/Ducks/gamerCollection';
import { setActiveGamerProductDetails } from 'src/Store/Ducks/gamerProductDetailsDuck';
import { setActiveSellerId } from 'src/Store/Ducks/sellerDucks';
import { setDashboardV3SearchData } from 'src/Store/Ducks/dashboardV3SearchDuck';
import { setSelectedProduct } from 'src/Store/Ducks/productDetails';
import { setUserAddressData } from 'src/Store/Ducks/userAddress';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  CardNumber,
  CardText,
  Disclaimer,
  HomeBottom,
  HomeContainer,
  HomeH1,
} from './styles';
import {
  getDashboardV3,
  setDashboardV3Data,
} from 'src/Store/Ducks/dashboardV3Duck';
import {
  DashboardV3Count,
  DashboardV3Section,
  SectionItem,
} from 'src/Models/DashboardV3Models';

const screenWidth = Math.round(Dimensions.get('window').width);
const cardWidth = screenWidth / 3 - 10;

const sectionWidth = screenWidth - 20;
const sectionItemWidth = sectionWidth / 2;

const sectionItemImageWidth = sectionItemWidth - 30;
const sectionItemImageHeight = getHeightProportion(sectionItemImageWidth) + 30;

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<any> | any>();

  const {
    config,
    dashboardV3: dashboardV3Redux,
    gamer,
    user: userRedux,
  } = useSelector((state: GamerAppReduxStore) => state);

  const {environment} = config;
  const {user} = userRedux;

  const {gamerId} = user;

  const userHasAddress = selectUserHasAddress(userRedux);

  const {
    banners,
    counts,
    lastUpdate,
    loading,
    refreshing,
    page,
    pages,
    searchText,
    sections,
  } = dashboardV3Redux;

  // Pega os dados do Dashboard
  useEffect(() => {
    dispatch(
      getDashboardV3({
        gamerId,
        searchText,
        page: 1,
      }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gamerId]);

  useFocusEffect(() => {
    const now = new Date();

    const diff = dateDiff('h', lastUpdate, now);

    if (diff >= 1) {
      dispatch(
        getDashboardV3({
          gamerId,
          searchText: '',
          page: 1,
        }),
      );
    }
  });

  const onRefresh = useCallback(() => {
    dispatch(
      setDashboardV3Data({
        refreshing: true,
      }),
    );

    dispatch(
      getDashboardV3({
        gamerId,
        searchText,
        page: 1,
      }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gamerId]);



  function handleNavigateProfileNewAddressCep() {
    dispatch(
      setUserAddressData({
        redirectTo: 'Home',
      }),
    );

    navigation.navigate('ProfileNewAddressCep');
  }


  const onChangeText = (searchText: string) => {
    dispatch(
      setDashboardV3Data({
        searchText,
      }),
    );
  };
  
  /**
   * Scroll para o início da lista.
   */
  const scrollToIndex = () => {
    flatListRef.current?.scrollToIndex({animated: true, index: 0});
  }

  /**
   * Realiza a busca da página 1 com o texto de busca.
   */
  const handleSearch = () => {
    if (searchText) {
      logEvent('search', {search: searchText || ''});
    }

    dispatch(
      getDashboardV3({
        gamerId,
        searchText,
        page: 1,
      }),
    );

    scrollToIndex();
  };
  
  /**
   * Chama a próxima página mantendo a busca.
   */
  function nextPage() {
    const hasNextPage = page < pages;

    if (hasNextPage) {
      dispatch(
        getDashboardV3({
          gamerId,
          searchText,
          page: page + 1,
        }),
      );
    }
  }

  function renderSearchBar() {
    return (
      <SearchTextField
        containerStyle={styles.searchBarContainer}
        handleChangeText={onChangeText}
        iconStyles={styles.iconStyles}
        onBlur={handleSearch}
        placeholder="Procure no GamerApp"
        style={styles.searchBar}
        value={searchText}
      />
    );
  }

  /**
   * Renderiza os cards com os counts das trocas
   */
  function renderCounts() {
    const renderCount = (countItem: DashboardV3Count, index: number) => {
      const {count, name, type} = countItem;

      // Verifica qual o type do card pressionado e navega de acordo
      function handleOnPress() {
        switch (type) {
          case 'AutoTrades': {
            navigation.navigate('Trade', {screen: 'TradeListAuto'});

            break;
          }

          case 'Pedidos': {
            navigation.navigate('MyOrders');

            break;
          }

          case 'TradeRequests': {
            navigation.navigate('Trade', {screen: 'TradeListEmAndamento'});

            break;
          }

          default:
            break;
        }
      }

      // Pega a image de acordo com o type
      function getImage() {
        switch (type) {
          case 'AutoTrades': {
            return require('../../Assets/images/dashboard/magic_wand.png');
          }

          case 'Pedidos': {
            return require('../../Assets/images/dashboard/checked.png');
          }

          case 'TradeRequests': {
            return require('../../Assets/images/trade/confirm.png');
          }

          default:
            return null;
        }
      }

      return (
        <TouchableOpacity
          key={`${name} - ${index}`}
          onPress={handleOnPress}
          style={styles.cardContainer}
        >
          <Image
            resizeMode="contain"
            source={getImage()}
            style={[styles.cardImage, styles.cardImageConfirm]}
          />

          <CardText color={MyColors.primary} numberOfLines={1}>
            {name}
          </CardText>

          <CardNumber>{count}</CardNumber>
        </TouchableOpacity>
      );
    };

    return (
      <ViewUI style={styles.fullWidth} marginT-10 paddingH-10>
        <ActivateDevMode>
          <HomeH1>Minhas trocas</HomeH1>
        </ActivateDevMode>

        <ViewUI row centerV spread>
          {counts.map((countItem, index) => renderCount(countItem, index))}
        </ViewUI>
      </ViewUI>
    );
  }

  function renderHeader() {
    return (
      <ViewUI flex>
        <HomeCarousel banners={banners} />

        {!userHasAddress && (
          <HomeWarning
            onPress={handleNavigateProfileNewAddressCep}
            text="Receba propostas de troca automáticas!"
          />
        )}

        {renderCounts()}
      </ViewUI>
    )
  }

  function renderEmpty() {
    return (
      <ViewUI center marginT-30>
        {!loading &&
          <TextUI dark10 center>
            Nenhum resultado encontrado{'\n'}
            Tente mudar a busca
          </TextUI>
        }
      </ViewUI>
    )
  }

  function renderFooter() {
    return (
      <>
        <ViewUI center marginT-10>
          <Spinkit
            color={MyColors.primary}
            isVisible={page > 1 && loading}
            size={40}
            type="Circle"
          />
        </ViewUI>

        <ActivateDevMode>
          <HomeBottom>
            <Disclaimer>
              © Gamer App - Todos os direitos reservados - {appConfig.version}
            </Disclaimer>
          </HomeBottom>
        </ActivateDevMode>
      </>
    )
  }

  function keyExtractor(item: DashboardV3Section, index: number): string {
    return `${item.sectionId} - ${index}`;
  }

  /**
   * Renderiza as seções com os itens
   */
  function renderSections() {
    function renderSection({item}: {item: DashboardV3Section}) {
      const {count, groupItemId, groupType, items, sectionId, sectionTitle} = item;

      function renderItem(item: SectionItem, index: number) {
        const {
          imageUrl,
          itemId,
          name,
          gamerId: ownerId,
          platformName,
          storeId,
        } = item;

        // Verifica se tem offerPrice e coloca os valores corretos.
        const offerPrice = item.price?.offerPrice || item.price?.price || 0;
        const price = item.price?.offerPrice ? item.price?.price : 0;

        function handleOnPress() {
          switch (groupType) {
            case 'GamerProduct': {
              dispatch(
                setActiveGamerProductDetails({
                  catalogId: itemId,
                  catalogType: 2,
                  gamerId,
                  id: ownerId || '',
                }),
              );

              navigation.navigate("GamerProductGamer", {screen: "GamerProductGamerDetails"});

              break;
            }

            // ProductDetails
            case 'SearchProduct':
            case 'Product': {
              dispatch(
                setSelectedProduct({
                  productId: itemId,
                  productImagePath: imageUrl,
                  productName: name,
                  platformId: '',
                  platformName,
                }),
              );

              navigation.navigate('ProductDetails');

              break;
            }

            case 'SearchGamer': {
              if (itemId === gamerId) {
                navigation.navigate('MyCollection');
              } else {
                dispatch(setActiveGamerCollectionId(itemId));

                navigation.navigate('GamerCollection', {screen: 'GamerCollection'});
              }

              break;
            }

            // Store products
            case 'SearchStore':
            case 'Store': {
              if (storeId) {
                dispatch(setActiveSellerId(storeId));
  
                navigation.navigate('SellerStoreSee');
              }

              break;
            }

            case 'StoreProduct': {
              dispatch(
                setActiveGamerProductDetails({
                  catalogId: itemId,
                  catalogType: 1,
                  gamerId,
                  id: storeId || '',
                }),
              );

              navigation.navigate('GamerProduct', {screen: "GamerProductDetails"});

              break;
            }

            default:
              break;
          }
        }

        return (
          <TouchableOpacity
            key={`${itemId} - ${index}`}
            onPress={handleOnPress}
            style={[styles.sectionItemStyle, index > 1 && styles.sectionItemBorderStyle]}
          >
            <ViewUI style={styles.sectionItemImageWrapperStyle}>
              <Image
                resizeMode="cover"
                source={{uri: imageUrl}}
                style={[
                  styles.sectionItemImageStyle,
                  (groupType === 'Store' || groupType === 'SearchStore') && styles.sectionSellerItemImageStyle
                ]}
              />
            </ViewUI>

            <ViewUI paddingH-15 paddingV-10>

              {!!offerPrice &&
                <ViewUI row centerV marginB-2>
                  <TextUI text70>{formatCurrency(offerPrice)}</TextUI>

                  {!!price &&
                    <TextUI marginL-5 style={styles.lineThrough}>{formatCurrency(price)}</TextUI>
                  }
                </ViewUI>
              }
              
              <TextUI dark30 text80 numberOfLines={2} style={styles.sectionItemName}>
                {name}
              </TextUI>

              {platformName &&
                <TextUI marginT-6 text90 style={{color: getColorByPlatform(platformName)}}>
                  {platformName}
                </TextUI>
              }
            </ViewUI>
          </TouchableOpacity>
        );
      }

      function handleVerTudo() {
        dispatch(setDashboardV3SearchData({
          count,
          groupItemId,
          groupType,
          page: 1,
          search: searchText,
          sectionId,
          sectionTitle,
        }));

        navigation.navigate('SectionList');
      }

      return (
        <ViewUI marginV-10 style={styles.sectionContainer}>
          <ViewUI row centerV spread paddingV-10 paddingH-15 style={styles.sectionHeader}>
            <TextUI dark20 text70>
              {item.sectionTitle}
            </TextUI>

            <TouchableOpacity onPress={handleVerTudo}>
              <TextUI style={styles.verTudo}>
                Ver Todos ({count})
              </TextUI>
            </TouchableOpacity>
          </ViewUI>

          <ViewUI style={styles.itemsWrapper}>
            {items.map((item, index) => renderItem(item, index))}
          </ViewUI>
        </ViewUI>
      );
    }

    return (
      <ViewUI flex>
        <FlatList
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={styles.listheaderComponentStyle}
          contentContainerStyle={styles.flatListContainer}
          data={sections}
          keyExtractor={keyExtractor}
          onEndReached={nextPage}
          onEndReachedThreshold={0.5}
          ref={flatListRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={renderSection}
          style={styles.flatListStyle}
        />
      </ViewUI>
    );
  }


  return (
    <HomeContainer>
      {/* {renderEnvironment()} */}
      {renderSearchBar()}
      {renderSections()}

      <CustomActivityIndicator isVisible={page === 1 && loading} />
    </HomeContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    height: cardWidth,
    width: cardWidth,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    margin: 0,
    padding: 7,
  },
  cardContainerCentral: {
    marginHorizontal: 5,
  },
  card: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardImage: {
    height: 30,
    width: 25,
  },
  cardImageConfirm: {
    marginVertical: 5,
  },
  flatListContainer: {
    alignItems: 'center'
  },
  flatListStyle: {
    width: screenWidth
  },
  fullWidth: {
    width: screenWidth,
  },
  iconStyles: {
    marginRight: 15,
    paddingBottom: 0,
  },
  itemsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  lineThrough: {
    color: "#aeaeae",
    fontSize: 13,
    fontWeight: "600",
    textDecorationLine: "line-through",
  },
  listheaderComponentStyle: {
    flex: 1,
    marginTop: 15,
    marginBottom: 10,
  },
  logo: {
    height: 22,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
  },
  searchBar: {
    marginHorizontal: 10,
    paddingTop: 13,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  searchBarContainer: {
    marginTop: 20,
    maxHeight: 60,
  },
  sectionContainer: {
    width: sectionWidth,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionHeader: {
    borderColor: '#e8e8e8',
    borderBottomWidth: 1,
  },
  sectionItemName: {
    lineHeight: 18,
  },
  sectionItemStyle: {
    width: sectionItemWidth,
    paddingTop: 15,
    paddingBottom: 2,
    borderColor: '#e8e8e8',
    borderRightWidth: 1,
  },
  sectionItemBorderStyle: {
    borderTopWidth: 1,
  },
  sectionItemImageStyle: {
    height: sectionItemImageHeight,
    width: sectionItemImageHeight * 3 / 4,
    borderRadius: 12,
  },
  sectionSellerItemImageStyle: {
    width: sectionItemImageWidth,
  },
  sectionItemImageWrapperStyle: {
    alignItems: 'center',
    height: sectionItemImageHeight,
    width: sectionItemWidth,
  },
  textAuto: {
    marginLeft: 10,
  },
  verTudo: {
    color: MyColors.secondary
  },
});

export default Home;
