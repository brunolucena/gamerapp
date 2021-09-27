import React from 'react';
import {StyleSheet} from 'react-native';
import {Avatar, Image} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-gesture-handler';

import splitFirstName from '../../../../Helpers/splitFirstName';

import {TradeDetailsItem, TradeDetailsPart} from '../../../../Models/Trade';

import {
  EmptyListText,
  LeftAction,
  LeftItems,
  RightBottomContainer,
  RightBottomText,
  RightBottomWrapper,
  RightTopContainer,
  RightTopText,
  SummaryPartContainer,
  SummaryPartEmpty,
  SummaryPartLeft,
  SummaryPartLeftWrapper,
  SummaryPartRight,
} from './SummaryPartStyles';
import MyButton from 'src/Components/Button';
import Separator from 'src/Components/Separator';
import { formatCurrency } from 'src/Helpers/formatCurrency';

interface Props {
  avatar: any;
  backgroundColor: string;
  items: TradeDetailsItem[];
  part: TradeDetailsPart;
  seeAll: Function;
}

function SummaryPart(props: Props) {
  const {avatar, backgroundColor, items, part, seeAll} = props;

  const {gamerName: GamerName, offeredPrice: OfferedPrice} = part;

  const item1 = items[items.length - 1];
  const item2 = items[items.length - 2];

  function handleSeeAll() {
    seeAll();
  }

  return (
    <SummaryPartContainer>
      <SummaryPartLeftWrapper>
        <TouchableOpacity onPress={handleSeeAll}>
          <SummaryPartLeft>
            {items.length === 0 ? (
              <SummaryPartEmpty>
                <Image
                  source={require('../../../../Assets/images/trade-joystick/joystick_2.png')}
                  style={{height: 45, width: 32}}
                />

                <EmptyListText>Adicione aqui os itens para troca</EmptyListText>
              </SummaryPartEmpty>
            ) : (
              <LeftItems>
                <Image
                  resizeMode="contain"
                  source={{uri: item1?.imageUrl}}
                  style={styles.image}
                />

                <Separator />

                <Image
                  resizeMode="contain"
                  source={{uri: item2?.imageUrl}}
                  style={styles.image}
                />
              </LeftItems>
            )}

            <LeftAction>
              <MyButton
                clear
                label={`Ver todos (${items.length})`}
                onPress={handleSeeAll}
                type="secondary"
              />
            </LeftAction>
          </SummaryPartLeft>
        </TouchableOpacity>
      </SummaryPartLeftWrapper>

      <SummaryPartRight>
        <RightTopContainer backgroundColor={backgroundColor}>
          <Avatar
            imageProps={{resizeMode: "contain", source: avatar}}
            imageSource={avatar}
            size={30}
          />

          <RightTopText>
            {GamerName ? splitFirstName(GamerName) : '-'}
          </RightTopText>
        </RightTopContainer>

        <RightBottomContainer>
          <RightBottomWrapper>
            <Image
              source={require('../../../../Assets/images/trade/money.png')}
              style={{height: 25, width: 25}}
            />

            <RightBottomText>
              {OfferedPrice ? formatCurrency(OfferedPrice) : OfferedPrice === 0 ? formatCurrency(0) : '-'}
            </RightBottomText>
          </RightBottomWrapper>
        </RightBottomContainer>
      </SummaryPartRight>
    </SummaryPartContainer>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 25,
    height: 25
  },
  image: {
    flex: 1,
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 5,
    height: 80,
  },
});

export default SummaryPart;
