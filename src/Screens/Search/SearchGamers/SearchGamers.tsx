import React from 'react';
import {useDispatch} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';

import {GamerInfo} from '../../../Models/SearchProducts';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {LoadingMore} from './SearchGamersStyles';
import MyListItem from 'src/Components/MyListItem';
import {useNavigation} from '@react-navigation/native';
import {setActiveSellerId} from 'src/Store/Ducks/sellerDucks';

interface Props {
  gamers: GamerInfo[];
  hasNextPage: boolean;
  nextPage: Function;
}

function SearchGamers(props: Props) {
  const {gamers, hasNextPage, nextPage} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function _keyExtractor(item: GamerInfo) {
    return `${item.gamerId}`;
  }

  function renderFooter() {
    return (
      <LoadingMore>
        <CustomActivityIndicator isVisible={hasNextPage} />
      </LoadingMore>
    );
  }

  function _renderItem({item}: {item: GamerInfo}) {
    const {gamerId, gamerRankTitle, imageUrl, name} = item;

    const image = imageUrl
      ? {uri: imageUrl}
      : require('../../../Assets/images/avatars/pirate.png');

    function _onPress() {
      dispatch(setActiveSellerId(gamerId));

      navigation.navigate('SellerStore');
    }

    return (
      <MyListItem
        key={gamerId}
        title={name}
        leftAvatar={image}
        subtitle={gamerRankTitle}
        onPress={_onPress}
      />
    );
  }

  function handleNextPage() {
    nextPage();
  }

  return (
    <FlatList
      ListFooterComponent={renderFooter}
      data={gamers}
      keyExtractor={_keyExtractor}
      onEndReached={handleNextPage}
      onEndReachedThreshold={0.5}
      renderItem={_renderItem}
    />
  );
}

export default SearchGamers;
