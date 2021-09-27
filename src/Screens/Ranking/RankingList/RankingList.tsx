import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {GamerRankingItem} from '../../../Models/Achievement';
import {getRankingList} from 'src/Store/Ducks/ranking';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import Item from './Item/Item';

import {
  Header,
  HeaderContainer,
  HeaderText,
  RankingListSafeAreaView,
  RankingText,
} from './RankingListStyles';
import {RefreshControl, FlatList, StyleSheet} from 'react-native';
import {GamerAppReduxStore} from 'src/Store';
import {Image} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

const List = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {ranking: rankingRedux, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId} = userRedux.user;
  const {loading, me, refreshing, rankings} = rankingRedux;

  useEffect(() => {
    dispatch(
      getRankingList({
        gamerId,
        page: 1,
      }),
    );
  }, [dispatch, gamerId]);

  const onRefresh = useCallback(() => {
    dispatch(
      getRankingList({
        gamerId,
        page: 1,
      }),
    );
  }, [dispatch, gamerId]);

  function _keyExtractor(item: GamerRankingItem) {
    return `${item.position}`;
  }

  function _renderItem({item}: {item: GamerRankingItem}) {
    const {
      experiencePoints,
      gamerId: gamerId2,
      name,
      position,
      rankTitle,
    } = item;

    return (
      <Item
        gamerId={gamerId2}
        isMe={false}
        key={gamerId2}
        name={name}
        position={position}
        title={rankTitle}
        xp={experiencePoints}
      />
    );
  }

  function _renderHeader() {
    return (
      <HeaderContainer>
        <RankingText>Ranking</RankingText>
      </HeaderContainer>
    );
  }

  return (
    <RankingListSafeAreaView>
      <Header>
        <Image
          source={require('../../../Assets/images/profile/trophy.png')}
          style={styles.image}
        />

        <HeaderText>Bem-vindo(a) ao GamerRanking</HeaderText>
      </Header>

      <Item
        gamerId={me.gamerId}
        isMe={true}
        key={me.gamerId}
        name={me.name}
        position={me.position}
        title={me.rankTitle}
        xp={me.experiencePoints}
      />

      <FlatList
        ListHeaderComponent={_renderHeader()}
        data={rankings}
        keyExtractor={_keyExtractor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={_renderItem}
      />

      <CustomActivityIndicator isVisible={loading} />
    </RankingListSafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {height: 42, width: 42},
});

export default List;
