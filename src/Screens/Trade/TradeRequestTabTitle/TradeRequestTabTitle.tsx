import React from 'react';
import {Text} from 'react-native';
import {NavigationScreenOptions} from 'react-navigation';
import {useSelector} from 'react-redux';

import splitFirstName from '../../../Helpers/splitFirstName';

import {GamerAppReduxStore} from '../../../Models/Redux';
import {selectTradePart} from 'src/Store/Ducks/tradeActive';

interface Props {
  type: 'me' | 'other';
}

function TradeRequestTabTitle({type}: Props) {
  const {tradeActive, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId} = userRedux.user;

  const tradePart = selectTradePart({
    state: tradeActive,
    gamerId,
    part: type,
  });

  const {gamerName} = tradePart;

  const name = splitFirstName(gamerName);

  return <Text>{name || '-'}</Text>;
}

TradeRequestTabTitle.navigationOptions = (): NavigationScreenOptions => ({
  header: null,
});

export default TradeRequestTabTitle;
