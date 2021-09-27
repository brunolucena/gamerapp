import React, {useCallback, useEffect, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Spinkit from 'react-native-spinkit';
import {Text, View} from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';

import { logEvent } from 'src/Analytics/analyticsFunctions';
import {MyColors} from 'src/Theme/FoundationConfig';
import {GamerAppReduxStore} from 'src/Store';
import SearchTextField from 'src/Components/TextField/SearchTextField';
import {SectionItem} from 'src/Models/DashboardV3Models';
import getColorByPlatform from 'src/Helpers/getColorByPlatform';
import {
  searchDashboardV3Section,
  selectDashboardV3SearchHasNextPage,
  setDashboardV3SearchData,
} from 'src/Store/Ducks/dashboardV3SearchDuck';
import GamerAppCard from 'src/Components/GamerAppCard';
import { setActiveGamerProductDetails } from 'src/Store/Ducks/gamerProductDetailsDuck';
import { setSelectedProduct } from 'src/Store/Ducks/productDetails';
import { setActiveSellerId } from 'src/Store/Ducks/sellerDucks';
import { formatCurrency } from 'src/Helpers/formatCurrency';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';
import { setActiveGamerCollectionId } from 'src/Store/Ducks/gamerCollection';

const {width} = Dimensions.get('window');

const cardWidth = (width - 60) / 2;

const SectionList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList<any> | any>();

  const {
    dashboardV3Search,
    user: userRedux,
  } = useSelector((state: GamerAppReduxStore) => state);

  const {
    count,
    groupItemId,
    groupType,
    items,
    loading,
    page,
    refreshing,
    search,
    sectionId,
    sectionTitle,
  } = dashboardV3Search;
  const {gamerId} = userRedux.user;

  // Faz a busca inicial da section.
  useEffect(() => {
    dispatch(
      searchDashboardV3Section({
        gamerId,
        groupItemId: groupItemId || '',
        page: 1,
        searchText: search,
        sectionId,
      }),
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gamerId]);

  const onRefresh = useCallback(() => {
    dispatch(
      searchDashboardV3Section({
        gamerId,
        groupItemId: groupItemId || '',
        page: 1,
        searchText: search,
        sectionId,
      }, true)
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, gamerId]);

  const onChangeText = (search: string) => {
    dispatch(
      setDashboardV3SearchData({
        search,
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
    if (search) {
      logEvent('search section', {search: search || ''});
    }

    dispatch(
      searchDashboardV3Section({
        gamerId,
        groupItemId: groupItemId || '',
        page: 1,
        searchText: search,
        sectionId,
      }),
    );

    scrollToIndex();
  };
  
  /**
   * Chama a próxima página mantendo a busca.
   */
  function nextPage() {
    const hasNextPage = selectDashboardV3SearchHasNextPage(dashboardV3Search);

    if (hasNextPage) {
      dispatch(
        searchDashboardV3Section({
          gamerId,
          groupItemId: groupItemId || '',
          page: page + 1,
          searchText: search,
          sectionId,
        }),
      );
    }
  }

  function renderHeader() {
    return (
      <View marginB-15 paddingH-10>
        <Text
          marginB-15
          marginH-10
          text50
          style={{
            color: getColorByPlatform(sectionTitle, "#2c2c2c")
          }}
        >
          {sectionTitle}
        </Text>

        <SearchTextField
          containerStyle={styles.searchBarContainer}
          handleChangeText={onChangeText}
          iconStyles={styles.iconStyles}
          onBlur={handleSearch}
          placeholder="Pesquisar"
          style={styles.searchBar}
          value={search}
        />
      </View>
    )
  }

  function renderEmpty() {
    return (
      <View center marginT-30>
        {!loading &&
          <Text dark10 center>
            Nenhum resultado encontrado{'\n'}
            Tente mudar a busca
          </Text>
        }
      </View>
    )
  }

  function renderFooter() {
    return (
      <View center marginT-10 marginB-50>
        <Spinkit
          color={MyColors.primary}
          isVisible={page > 1 && loading}
          size={40}
          type="Circle"
        />
      </View>
    )
  }

  function keyExtractor(item: SectionItem, index: number): string {
    return `${item.itemId} - ${index}`;
  }

  function renderList() {
    function renderItem({item}: {item: SectionItem}) {
      const {
        gamerId: ownerId,
        imageUrl,
        itemId,
        name,
        platformName,
        price,
        storeId,
      } = item;
      
      // Verifica qual o type do card pressionado e navega de acordo
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

      function getCardHeight(): number {
        switch (groupType) {
          case "SearchStore":
          case "Store": {
            return cardWidth * 9 / 16
          }

          default:
            return cardWidth * 4 / 3;
        }
      }
  
      return (
        <GamerAppCard
          imageSource={{uri: item.imageUrl}}
          height={getCardHeight()}
          marginVertical={10}
          title={item.name}
          onPress={handleOnPress}
          platformName={platformName}
          platformNameStyles={{color: getColorByPlatform(platformName || '')}}
          name={`${price?.offerPrice ? formatCurrency(price?.offerPrice) : price?.price ? formatCurrency(price?.price) : ''}`}
          nameDashed={price?.offerPrice ? formatCurrency(price?.price) : undefined}
          width={cardWidth}
        />
      );
    }

    return (
      <FlatList
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.flatListContainer}
        data={items}
        keyExtractor={keyExtractor}
        numColumns={2}
        onEndReached={nextPage}
        onEndReachedThreshold={0.5}
        ref={flatListRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
        style={styles.flatListStyle}
      />
    );
  }

  return (
    <View flex>
      {renderHeader()}
      {renderList()}

      <CustomActivityIndicator isVisible={page === 1 && loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  flatListStyle: {
    width: width,
  },
  iconStyles: {
    marginRight: 15,
    paddingBottom: 0,
  },
  searchBar: {
    marginHorizontal: 10,
    paddingTop: 13,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  searchBarContainer: {
    maxHeight: 60,
  },
});

export default SectionList;
