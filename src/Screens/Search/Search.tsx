import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import {
  searchProducts,
  setSearchActivePage,
  setSelectedCategory,
  setSearchData,
} from 'src/Store/Ducks/searchProducts';

import SearchGames from './SearchGames/SearchGames';

import {
  CategoriesContainer,
  ListContainer,
  SearchSafeAreaView,
} from './SearchStyles';
import SearchAccessories from './SearchAccessories/SearchAccessories';
import SearchGamers from './SearchGamers/SearchGamers';
import SearchPlatforms from './SearchPlatforms/SearchPlatforms';
import SearchStores from './SearchStores/SearchStores';
import {GamerAppReduxStore} from 'src/Store';
import {SearchCategory} from '../../Models/SearchProducts';
import {logEvent} from '../../Analytics/analyticsFunctions';
import MyButton from 'src/Components/Button';
import SearchTextField from 'src/Components/TextField/SearchTextField';

interface Category {
  name: SearchCategory;
  count: number;
}

function Search() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {searchProducts: searchProductsRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {
    accessoriesCount,
    accessoriesFound,
    gamersCount,
    gamersFound,
    gamesCount,
    gamesFound,
    loading,
    platformsCount,
    platformsFound,
    search,
    searchActivePage,
    selectedCategory,
    storesCount,
    storesFound,
  } = searchProductsRedux;

  useEffect(() => {
    dispatch(
      searchProducts({
        SearchText: search,
        Page: searchActivePage,
        Category: selectedCategory,
      }),
    );
  }, [dispatch]);

  const pageSize = 20;

  const totalPages = () => {
    let count = 0;

    switch (selectedCategory) {
      case 'Acessorios':
        count = accessoriesCount;
        break;

      case 'Gamers':
        count = gamersCount;
        break;

      case 'Games':
        count = gamesCount;
        break;

      case 'Lojas':
        count = storesCount;
        break;

      case 'Plataformas':
        count = platformsCount;
        break;

      default:
        break;
    }

    return Math.ceil(count / pageSize);
  };

  const hasNextPage = searchActivePage < totalPages();

  // const clear = () => {
  //   setSearch('');
  //   dispatch(searchProducts({SearchText: search, Page: 1, Category: 'Games'}));
  //   dispatch(setSearchActivePage(1));
  // };

  const nextPage = () => {
    if (hasNextPage) {
      dispatch(setSearchActivePage(searchActivePage + 1));

      dispatch(
        searchProducts({
          SearchText: search,
          Page: searchActivePage + 1,
          Category: selectedCategory,
        }),
      );
    }
  };

  const onChangeText = (searchText: string) => {
    dispatch(
      setSearchData({
        search: searchText,
      }),
    );
  };

  const handleSearch = () => {
    logEvent('search', {search: search || ''});

    dispatch(
      setSearchData({
        searchActivePage: 1,
      }),
    );

    dispatch(
      searchProducts({SearchText: search, Page: 1, Category: selectedCategory}),
    );
  };

  function renderSearchBar() {
    return (
      <SearchTextField
        handleChangeText={onChangeText}
        onBlur={handleSearch}
        value={search}
      />
    );
  }

  function renderCategories() {
    const keyExtractor = (item: Category, index: number) => index.toString();

    const renderCategory = ({item}: {item: Category}) => {
      const {count, name} = item;

      function handleChangeCategory() {
        dispatch(setSelectedCategory(name));
        dispatch(setSearchActivePage(1));
        dispatch(
          searchProducts({
            SearchText: search,
            Page: 1,
            Category: name,
          }),
        );
      }

      return (
        <MyButton
          onPress={handleChangeCategory}
          label={`${
            name === 'Games'
              ? 'Jogos'
              : name === 'Plataformas'
              ? 'Consoles'
              : name === 'Acessorios'
              ? 'Acessórios'
              : name
          } ${count}`}
          paddingVertical={5}
          style={styles.buttonStyle}
          labelStyle={styles.buttonLabelStyle}
          outline
        />
      );
    };

    const data: Category[] = [
      {
        count: gamesCount,
        name: 'Games',
      },
      {
        count: gamersCount,
        name: 'Gamers',
      },
      // {
      //   count: platformsCount,
      //   name: 'Plataformas',
      // },
      // {
      //   count: accessoriesCount,
      //   name: 'Acessorios',
      // },
    ];

    return (
      <CategoriesContainer>
        <FlatList
          data={data}
          horizontal
          keyExtractor={keyExtractor}
          renderItem={renderCategory}
        />
      </CategoriesContainer>
    );
  }

  function renderContent() {
    return (
      <ListContainer>
        {renderSearchBar()}
        {/* {renderCategories()} */}

        {selectedCategory === 'Acessorios' && (
          <SearchAccessories
            hasNextPage={hasNextPage}
            nextPage={nextPage}
            accessories={accessoriesFound}
          />
        )}

        {selectedCategory === 'Gamers' && (
          <SearchGamers
            hasNextPage={hasNextPage}
            nextPage={nextPage}
            gamers={gamersFound}
          />
        )}

        {selectedCategory === 'Games' && (
          <SearchGames
            hasNextPage={hasNextPage}
            nextPage={nextPage}
            products={gamesFound}
            loading={loading}
            searchActivePage={searchActivePage}
          />
        )}

        {selectedCategory === 'Lojas' && (
          <SearchStores
            hasNextPage={hasNextPage}
            nextPage={nextPage}
            stores={storesFound}
          />
        )}

        {selectedCategory === 'Plataformas' && (
          <SearchPlatforms
            hasNextPage={hasNextPage}
            nextPage={nextPage}
            platforms={platformsFound}
          />
        )}
      </ListContainer>
    );
  }

  return <SearchSafeAreaView>{renderContent()}</SearchSafeAreaView>;
}

const styles = StyleSheet.create({
  buttonLabelStyle: {fontSize: 12},
  buttonStyle: {paddingHorizontal: 7, borderRadius: 30, marginHorizontal: 3},
  button: {
    paddingVertical: 13,
    backgroundColor: '#555555',
  },
});

export default Search;
