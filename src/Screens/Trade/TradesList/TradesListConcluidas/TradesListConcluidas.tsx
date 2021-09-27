import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';

import {TradesListItem} from '../../../../Models/TradeRequest';
import {
  getTradesList,
  setTradesListRefreshing,
} from 'src/Store/Ducks/tradeList';

import CustomActivityIndicator from '../../../../Components/CustomActivityIndicator';
import TradesListConcluidasCard from '../TradesListConcluidasCard/TradesListConcluidasCard';

import {
  EmptyStateContainer,
  TradesListContainer,
  TradesListSafeAreaView,
} from './TradesListConcluidasStyles';
import Soldier from '../../../../Components/EmptyScreens/Soldier/Soldier';
import {GamerAppReduxStore} from 'src/Store';
import {useFocusEffect} from '@react-navigation/native';

function TradesListConcluidas() {
  const dispatch = useDispatch();

  const {tradeList, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {loading, refreshing, tradesList} = tradeList;
  const {gamerId} = userRedux.user;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTradesList({gamerId}));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gamerId]),
  );

  const onRefresh = useCallback(() => {
    dispatch(setTradesListRefreshing(true));
    dispatch(getTradesList({gamerId}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamerId]);

  function _keyExtractor(item: TradesListItem) {
    return item.tradeId;
  }

  function _renderItem({item}: {item: TradesListItem}) {
    return <TradesListConcluidasCard item={item} />;
  }

  return (
    <TradesListSafeAreaView>
      {tradesList.length ? (
        <FlatList
          data={tradesList}
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
            <Soldier text="Não se esqueça de acompanhar suas negociações!" />
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

TradesListConcluidas.navigationOptions = () => ({
  header: null,
});

export default TradesListConcluidas;
