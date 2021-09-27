import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RefreshControl, StyleSheet, FlatList} from 'react-native';

import {AutoTrade} from '../../../../Models/TradeRequest';
import {
  getAutoTradesList,
  setAutoTradeListRefreshing,
} from 'src/Store/Ducks/autoTradeList';

import CustomActivityIndicator from '../../../../Components/CustomActivityIndicator';
import TradesListAutoCard from '../TradesListAutoCard/TradesListAutoCard';

import {
  EmptyStateContainer,
  TradesListSafeAreaView,
  TradesListContainer,
} from './TradesListAutoStyles';
import Soldier from '../../../../Components/EmptyScreens/Soldier/Soldier';
import {GamerAppReduxStore} from 'src/Store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

function TradesListAuto() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {autoTradeList, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {loading, refreshing, autoTradesList} = autoTradeList;
  const {gamerId} = userRedux.user;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAutoTradesList({gamerId}));
    }, [dispatch, gamerId]),
  );

  const onRefresh = useCallback(() => {
    dispatch(setAutoTradeListRefreshing(true));
    dispatch(getAutoTradesList({gamerId}));
  }, [dispatch, gamerId]);

  function _keyExtractor(item: AutoTrade, index: number) {
    const {gamerId: itemGamerId} = item;

    return `${itemGamerId} - ${index}`;
  }

  function _renderItem({index, item}: {index: number; item: AutoTrade}) {
    return (
      <TradesListAutoCard index={index} item={item} navigation={navigation} />
    );
  }

  return (
    <TradesListSafeAreaView>
      {autoTradesList.length ? (
        <FlatList
          data={autoTradesList}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
          contentContainerStyle={styles.flatListContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <TradesListContainer
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <EmptyStateContainer>
            <Soldier
              text={`Cadastre seu endereço e coloque jogos na sua wishlist para começar a receber propostas automáticas!`}
            />
          </EmptyStateContainer>
        </TradesListContainer>
      )}

      <CustomActivityIndicator isVisible={loading} />
    </TradesListSafeAreaView>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 10,
  },
});

TradesListAuto.navigationOptions = () => ({
  header: null,
});

export default TradesListAuto;
