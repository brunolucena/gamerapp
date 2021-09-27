import React from 'react';
import {Image} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';

import formatDate from '../../../../Helpers/formatDate';
import formatDistance from '../../../../Helpers/formatDistance';

import {TradesListItem} from '../../../../Models/TradeRequest';
import {setPosTradeId} from 'src/Store/Ducks/tradeDetails';

import {
  ItemContainer,
  ItemTopContainer,
  ItemTopLeft,
  ItemTopLeftCity,
  ItemTopLeftCityContainer,
  ItemTopLeftCityDistance,
  ItemTopLeftName,
  ItemTopLeftTitle,
  ItemTopRight,
  ItemTopRightDate,
  ItemTopRightTextAlert,
  ItemTopRightTextSecondaryBig,
  ItemTopRightTextWithImageContainer,
} from './TradesListConcluidasCardStyles';
import {useNavigation} from '@react-navigation/native';

interface Props {
  item: TradesListItem;
}

function TradesListConcluidasCard({item}: Props) {
  const {
    city,
    date,
    distance,
    name,
    state,
    status,
    tradeId,
    tradeViewId,
  } = item;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const _onPress = () => {
    dispatch(setPosTradeId(tradeId));

    navigation.navigate('PosTrade', {screen: 'PosTradeActionsNavigator'});
  };

  const renderAdditionalInfo = () => {
    if (
      status === 'Aguardando andamento' ||
      status === 'Jogadores negociando entrega'
    ) {
      return (
        <ItemTopRightTextWithImageContainer>
          <Image
            source={require('../../../../Assets/images/trades/speech-bubble.png')}
          />

          <ItemTopRightTextSecondaryBig>Chat</ItemTopRightTextSecondaryBig>
        </ItemTopRightTextWithImageContainer>
      );
    } else {
      return <ItemTopRightTextAlert>Finalizada</ItemTopRightTextAlert>;
    }
  };

  return (
    <ItemContainer>
      <TouchableOpacity activeOpacity={0.5} onPress={_onPress}>
        <ItemTopContainer>
          <ItemTopLeft>
            <ItemTopLeftTitle>Troca {tradeViewId}</ItemTopLeftTitle>

            <ItemTopLeftName>{name}</ItemTopLeftName>

            <ItemTopLeftCityContainer>
              <ItemTopLeftCity>
                {city && state ? `${city}, ${state}` : ''}
              </ItemTopLeftCity>

              <ItemTopLeftCityDistance>
                {formatDistance(distance)}
              </ItemTopLeftCityDistance>
            </ItemTopLeftCityContainer>
          </ItemTopLeft>

          <ItemTopRight>
            <ItemTopRightDate>{formatDate(date)}</ItemTopRightDate>

            {renderAdditionalInfo()}
          </ItemTopRight>
        </ItemTopContainer>
      </TouchableOpacity>
    </ItemContainer>
  );
}

TradesListConcluidasCard.navigationOptions = () => ({
  header: null,
});

export default TradesListConcluidasCard;
