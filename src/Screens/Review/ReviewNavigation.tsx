import React from 'react';
import ReviewSearch from './ReviewSearch';
import {createStackNavigator} from '@react-navigation/stack';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import {GamerAppReduxStore} from 'src/Store';
import {headerWithSearch} from '../NavigationHelpers';
import {logEvent} from 'src/Analytics/analyticsFunctions';
import {setMyCollectionSearchText} from 'src/Store/Ducks/myCollection';
import {setSeachText} from 'src/Store/Ducks/sellerAddProduct';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  setSearchActivePage,
  searchProducts,
} from 'src/Store/Ducks/searchProducts';

type SellProductStackParamList = {
  ReviewComment: undefined;
  ReviewCons: undefined;
  ReviewProsConsContainer: undefined;
  ReviewRating: undefined;
  ReviewSearch: undefined;
  ReviewTitle: undefined;
  ReviewsPros: undefined;
};

const Stack = createStackNavigator<SellProductStackParamList>();

function ReviewNavigation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {sellerAddProduct} = useSelector((state: GamerAppReduxStore) => state);

  const {addProductFrom, searchText} = sellerAddProduct;

  const handleSearch = () => {
    if (addProductFrom === 'new') {
      logEvent('reviewSearch', {search: searchText});

      dispatch(setSearchActivePage(1));
      dispatch(
        searchProducts({SearchText: searchText, Page: 1, Category: 'Games'}),
      );
    } else if (addProductFrom === 'collection') {
      logEvent('storeAddSearchCollection', {search: searchText});

      dispatch(setMyCollectionSearchText(searchText));
    }
  };

  const onChangeText = (search: string) => {
    dispatch(setSeachText(search));
  };

  return (
    <Stack.Navigator
      initialRouteName="ReviewSearch"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="ReviewSearch"
        component={ReviewSearch}
        options={headerWithSearch({
          addProductFrom,
          goBack: 'ReviewSearch',
          handleSearch,
          navigation,
          onChangeText,
          search: searchText,
        })}
      />
    </Stack.Navigator>
  );
}

export default ReviewNavigation;
