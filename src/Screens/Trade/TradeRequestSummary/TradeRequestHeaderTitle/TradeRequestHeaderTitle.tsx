import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import {GamerAppReduxStore} from '../../../../Models/Redux';

function TradeRequestHeaderTitle() {
  const {activeTradeData} = useSelector(
    (state: GamerAppReduxStore) => state.tradeActive,
  );

  const tradeViewId = activeTradeData.tradeViewId || 'Negociar';

  return <Text style={styles.text}>{tradeViewId}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: '#484848',
    fontSize: 16,
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center',
  },
});

export default TradeRequestHeaderTitle;
