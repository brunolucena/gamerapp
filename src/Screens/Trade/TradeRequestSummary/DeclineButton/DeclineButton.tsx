import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

import {setIsModalDeclinedOpened} from 'src/Store/Ducks/tradeActive';
import {GamerAppReduxStore} from 'src/Store';

function DeclineButton() {
  const dispatch = useDispatch();

  const {activeTradeData} = useSelector(
    (state: GamerAppReduxStore) => state.tradeActive,
  );

  const {tradeRequestId} = activeTradeData;

  function openModal() {
    dispatch(setIsModalDeclinedOpened(true));
  }

  return tradeRequestId ? (
    <View marginR-15>
      <TouchableOpacity onPress={openModal}>
        <Icon color="#b7b7b7" name="ios-trash" size={22} />
      </TouchableOpacity>
    </View>
  ) : (
    <View />
  );
}

export default DeclineButton;
