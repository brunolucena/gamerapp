import React from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {setActiveGamerRankingId} from 'src/Store/Ducks/ranking';
// import {setActiveGamerRankingId} from 'src/Store/Ducks/ranking';

import {
  ItemContainer,
  Position,
  NameContainer,
  Name,
  Rank,
  XpContainer,
  Xp,
  XpTextContainer,
  XpText,
} from './ItemStyles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  gamerId: string;
  isMe: boolean;
  key: string;
  name: string;
  position: number;
  title: string;
  xp: number;
}

const Item = (props: Props) => {
  const {gamerId, isMe, key, name, position, title, xp} = props;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  function onPress() {
    dispatch(setActiveGamerRankingId(gamerId));

    navigation.navigate('GamerRank');
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} key={key}>
      <ItemContainer isMe={isMe}>
        <Position isMe={isMe}>#{position}</Position>

        <NameContainer>
          <Name isMe={isMe}>{name}</Name>

          <Rank isMe={isMe}>{title}</Rank>
        </NameContainer>

        <XpContainer>
          <Xp isMe={isMe}>{xp}</Xp>

          <XpTextContainer isMe={isMe}>
            <XpText>XP</XpText>
          </XpTextContainer>
        </XpContainer>
      </ItemContainer>
    </TouchableOpacity>
  );
};

export default Item;
