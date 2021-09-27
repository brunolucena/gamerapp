import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {defaultHeader, headerWithSearch} from '../NavigationHelpers';
import {defaultScreenOptions} from '../Helpers/NavigatorHelpers';
import {setSeachText} from 'src/Store/Ducks/sellerAddProduct';
import {logEvent} from 'src/Analytics/analyticsFunctions';
import {GamerAppReduxStore} from 'src/Store';
import {
  setSearchActivePage,
  searchProducts,
} from 'src/Store/Ducks/searchProducts';
import {setMyCollectionSearchText} from 'src/Store/Ducks/myCollection';

import SellProductDelivery from './SellProductDelivery';
import SellProductInit from './SellProductInit';
import SellProductPhotos from './SellProductPhotos';
import SellProductPlatforms from './SellProductPlatforms';
import SellProductPrice from './SellProductPrice';
import SellProductPromotion from './SellProductPromotion';
import SellProductReview from './SellProductReview';
import SellProductReview2 from './SellProductReview2';
import SellProductSearch from './SellProductSearch';
import SellProductState from './SellProductState';
import SellProductStock from './SellProductStock';
import SellProductSuccess from './SellProductSuccess';

type SellProductStackParamList = {
  SellProductInit: undefined;
  SellProductSearch: undefined;
  SellProductState: undefined;
  SellProductPlatforms: undefined;
  SellProductPhotos: undefined;
  SellProductPrice: undefined;
  SellProductPromotion: undefined;
  SellProductDelivery: undefined;
  SellProductStock: undefined;
  SellProductReview: undefined;
  SellProductReview2: undefined;
  SellProductSuccess: undefined;
};

const Stack = createStackNavigator<SellProductStackParamList>();

function SellProductNavigation() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {sellerAddProduct} = useSelector((state: GamerAppReduxStore) => state);

  const {addProductFrom, searchText} = sellerAddProduct;

  const handleSearch = () => {
    if (addProductFrom === 'new') {
      logEvent('storeAddSearchNew', {search: searchText});

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
      initialRouteName="SellProductInit"
      screenOptions={defaultScreenOptions}>
      <Stack.Screen
        name="SellProductInit"
        component={SellProductInit}
        options={defaultHeader(navigation, '', 'gray')}
      />

      <Stack.Screen
        name="SellProductSearch"
        component={SellProductSearch}
        options={headerWithSearch({
          addProductFrom,
          goBack: 'SellProductInit',
          handleSearch,
          navigation,
          onChangeText,
          search: searchText,
        })}
      />

      <Stack.Screen
        name="SellProductState"
        component={SellProductState}
        options={defaultHeader(navigation, '', 'white', 'SellProductSearch')}
      />

      <Stack.Screen
        name="SellProductPlatforms"
        component={SellProductPlatforms}
        options={defaultHeader(navigation, '', 'white', 'SellProductState')}
      />

      <Stack.Screen
        name="SellProductPhotos"
        component={SellProductPhotos}
        options={defaultHeader(navigation, '', 'white', 'SellProductPlatforms')}
      />

      <Stack.Screen
        name="SellProductPrice"
        component={SellProductPrice}
        options={defaultHeader(navigation, '', 'white', 'SellProductPhotos')}
      />

      <Stack.Screen
        name="SellProductPromotion"
        component={SellProductPromotion}
        options={defaultHeader(navigation, '', 'white', 'SellProductPrice')}
      />

      <Stack.Screen
        name="SellProductDelivery"
        component={SellProductDelivery}
        options={defaultHeader(navigation, '', 'white', 'SellProductPromotion')}
      />

      <Stack.Screen
        name="SellProductStock"
        component={SellProductStock}
        options={defaultHeader(navigation, '', 'white', 'SellProductDelivery')}
      />

      <Stack.Screen
        name="SellProductReview"
        component={SellProductReview}
        options={defaultHeader(navigation, '', 'gray', 'SellProductStock')}
      />

      <Stack.Screen
        name="SellProductReview2"
        component={SellProductReview2}
        options={defaultHeader(navigation, '', 'white', 'SellProductReview')}
      />

      <Stack.Screen
        name="SellProductSuccess"
        component={SellProductSuccess}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SellProductNavigation;
