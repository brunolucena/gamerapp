import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  HomeWarningText,
  HomeWarningContainer,
  HomeWarningFiller,
} from './HomeWarningStyles';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  text: string;
  onPress: (event: GestureResponderEvent) => any;
}

const HomeWarning = (props: Props) => {
  const {onPress, text} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <HomeWarningContainer>
        <HomeWarningFiller />

        <HomeWarningText>{text}</HomeWarningText>

        <Icon name="md-arrow-forward" color="#ffffff" size={20} />
      </HomeWarningContainer>
    </TouchableOpacity>
  );
};

export default HomeWarning;
