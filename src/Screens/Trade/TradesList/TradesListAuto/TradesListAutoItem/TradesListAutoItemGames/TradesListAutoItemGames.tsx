import React from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native-ui-lib';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';

import {TradesListItemTradeRequestItem} from '../../../../../../Models/TradeRequest';

import {Container, GamerName} from './TradesListAutoItemGamesStyles';

interface Props {
  gamerName: string;
  games: TradesListItemTradeRequestItem[];
}

function TradesListAutoItemGames({gamerName, games}: Props) {
  function _keyExtractor(
    item: TradesListItemTradeRequestItem,
    index: number,
  ): string {
    return `${item.ownerId} - ${item.productId} - ${index}`;
  }

  function _renderItem({item}: {item: TradesListItemTradeRequestItem}) {
    const _onPress = () => {
      // TODO: abrir modal com detalhe do jogo
    };

    return (
      <TouchableWithoutFeedback onPress={_onPress}>
        <Image source={{uri: item.imageURL}} style={styles.image} />
      </TouchableWithoutFeedback>
    );
  }

  return (
    <Container>
      <GamerName>{gamerName}</GamerName>

      <FlatList
        data={games}
        horizontal
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
        contentContainerStyle={styles.flatListContainer}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    marginVertical: 5,
    marginRight: 0,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: 150,
  },
  flatListContainer: {
    paddingRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
});

TradesListAutoItemGames.navigationOptions = () => ({
  header: null,
});
export default TradesListAutoItemGames;
