import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RefreshControl, StyleSheet, FlatList} from 'react-native';
import {TradesRequestListItem} from '../../../../Models/TradeRequest';
import {
  getTradesRequestList,
  setTradesRequestListRefreshing,
} from 'src/Store/Ducks/tradeRequestList';

import CustomActivityIndicator from '../../../../Components/CustomActivityIndicator';
import TradesListCard from '../TradesListCard/TradesListCard';

import {
  EmptyStateContainer,
  TradesListSafeAreaView,
  TradesListContainer,
} from './TradesListEmAndamentoStyles';
import Soldier from '../../../../Components/EmptyScreens/Soldier/Soldier';
import {GamerAppReduxStore} from 'src/Store';
import {useFocusEffect} from '@react-navigation/native';

function TradesListEmAndamento() {
  const dispatch = useDispatch();

  const {tradeRequestList, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {loading, refreshing, tradesList} = tradeRequestList;
  const {gamerId} = userRedux.user;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTradesRequestList({gamerId}));
    }, [dispatch, gamerId]),
  );

  const onRefresh = useCallback(() => {
    dispatch(setTradesRequestListRefreshing(true));
    dispatch(getTradesRequestList({gamerId}));
  }, [dispatch, gamerId]);

  function _keyExtractor(item: TradesRequestListItem) {
    return item.tradeRequestId;
  }

  function _renderItem({item}: {item: TradesRequestListItem}) {
    return <TradesListCard item={item} />;
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
            <Soldier
              text={`Negocie com outros gamers seus jogos.\nÉ bem simples e prático!`}
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

TradesListEmAndamento.navigationOptions = () => ({
  header: null,
});

export default TradesListEmAndamento;
