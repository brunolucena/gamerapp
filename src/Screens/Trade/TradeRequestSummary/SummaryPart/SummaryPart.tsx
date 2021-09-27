import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Avatar, Image} from 'react-native-ui-lib';

import { formatCurrency } from 'src/Helpers/formatCurrency';
import splitFirstName from '../../../../Helpers/splitFirstName';
import {
  TradeRequestItem,
  TradeRequestPart,
} from '../../../../Models/TradeRequest';

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

import Separator from 'src/Components/Separator';
import InputCurrencyModal from 'src/Components/InputCurrency/InputCurrencyModal';
import MyButton from 'src/Components/Button';
import { changeOfferedPrice } from 'src/Store/Ducks/tradeActive';

interface Props {
  avatar: any;
  backgroundColor: string;
  items: TradeRequestItem[];
  part: TradeRequestPart;
  seeAll: Function;
}

function SummaryPart(props: Props) {
  const dispatch = useDispatch();
  const [initialValue, setInitialValue] = useState(0);
  const [inputContainerOpened, setInputContainerOpened] = useState(false);

  const {avatar, backgroundColor, items, part, seeAll} = props;

  const {gamerId, gamerName, offeredPrice} = part;

  const selectedItems = items.filter((item) => item.selected);

  const item1 = selectedItems[selectedItems.length - 1];
  const item2 = selectedItems[selectedItems.length - 2];

  function handleCloseModal() {
    setInputContainerOpened(false);
  }

  /**
   * Quando confirma o input currency, coloca o valor do price na redux.
   */
  function handleConfirm(value: number) {
    dispatch(changeOfferedPrice({gamerId, value}));

    setInitialValue(0);
    setInputContainerOpened(false);
  }

  function handleSeeAll() {
    seeAll();
  }

  function handleInputOpen() {
    setInputContainerOpened(true);
  }

  return (
    <SummaryPartContainer>
      <SummaryPartLeftWrapper>
        <TouchableOpacity onPress={handleSeeAll}>
          <SummaryPartLeft>
            {selectedItems.length === 0 ? (
              <SummaryPartEmpty>
                <Image
                  source={require('../../../../Assets/images/trade-joystick/joystick_2.png')}
                  style={styles.joystick}
                />

                <EmptyListText>Adicione aqui os itens para troca</EmptyListText>
              </SummaryPartEmpty>
            ) : (
              <LeftItems>
                <Image resizeMode="contain" source={{uri: item1?.imageUrl}} style={styles.image} />

                <Separator />

                <Image resizeMode="contain" source={{uri: item2?.imageUrl}} style={styles.image} />
              </LeftItems>
            )}

            <LeftAction>
              <MyButton
                clear
                label={`Ver todos (${selectedItems.length})`}
                onPress={handleSeeAll}
                size="small"
                type="secondary"
              />
            </LeftAction>
          </SummaryPartLeft>
        </TouchableOpacity>
      </SummaryPartLeftWrapper>

      <SummaryPartRight>
        <RightTopContainer backgroundColor={backgroundColor}>
          <Avatar imageProps={{resizeMode: "contain", source: avatar}} imageSource={avatar} size={30} />

          <RightTopText>
            {gamerName ? splitFirstName(gamerName) : '-'}
          </RightTopText>
        </RightTopContainer>

        <RightBottomContainer>
          <TouchableOpacity onPress={handleInputOpen}>
            <RightBottomWrapper>
              <Image
                source={require('../../../../Assets/images/trade/money.png')}
                style={{height: 25, width: 25}}
              />

              <RightBottomText>
                {offeredPrice ? formatCurrency(offeredPrice) : offeredPrice === 0 ? formatCurrency(0) : '-'}
              </RightBottomText>
            </RightBottomWrapper>
          </TouchableOpacity>
        </RightBottomContainer>
      </SummaryPartRight>

      <InputCurrencyModal
        closeModal={handleCloseModal}
        initialValue={initialValue}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
        opened={inputContainerOpened}
      />
    </SummaryPartContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: 5,
    height: 80,
  },
  joystick: {height: 45, width: 32},
});

export default SummaryPart;
