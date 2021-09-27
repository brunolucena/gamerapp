import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';

import {
  removeTradeItems,
  selectTradeItems,
  selectTradePart,
} from 'src/Store/Ducks/tradeActive';

import ModalAddGame from '../Components/ModalAddGame/ModalAddGame';
import ModalInputValue from '../Components/ModalInputValue/ModalInputValue';

import {
  BottomOptions,
  Container,
  EmptyListContainer,
  EmptyListText,
  EmptyListWrapper,
  TradeSafeAreaView,
  TradeScrollView,
} from './TradeRequestMeStyles';
import {GamerAppReduxStore} from 'src/Store';
import {Image} from 'react-native-ui-lib';
import MyListItem from 'src/Components/MyListItem';
import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';

function TradeRequestMe() {
  const dispatch = useDispatch();

  const {tradeActive, tradeRequestDetails, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {gamerId} = userRedux.user;

  const tradeItems = selectTradeItems({
    state: tradeActive,
    gamerId,
    part: 'me',
  });

  const tradePart = selectTradePart({state: tradeActive, gamerId, part: 'me'});
  const loading = tradeRequestDetails.loading || tradeActive.loading;

  const {offeredPrice: OfferedPrice} = tradePart;

  const [addGameOpened, setAddGameOpened] = useState(false);
  const [inputContainerOpened, setInputContainerOpened] = useState(false);

  const hasSelected = tradeItems.some(tradeItem => tradeItem.selected);

  function handleOpen() {
    setAddGameOpened(true);
  }

  function handleInputOpen() {
    setInputContainerOpened(true);
  }

  return (
    <TradeSafeAreaView>
      <Container>
        {!hasSelected ? (
          <EmptyListContainer>
            <TouchableOpacity onPress={handleOpen}>
              <EmptyListWrapper>
                <Image
                  source={require('../../../Assets/images/trade-joystick/joystick_2.png')}
                  style={styles.joystick}
                />
                <EmptyListText>Adicione aqui os itens para troca</EmptyListText>
              </EmptyListWrapper>
            </TouchableOpacity>
          </EmptyListContainer>
        ) : (
          <TradeScrollView>
            {tradeItems.map(item => {
              function handlePressIcon() {
                const data = {items: [item]};

                dispatch(removeTradeItems(data));
              }

              if (item.selected) {
                return (
                  <MyListItem
                    title={item.productName}
                    key={item.productCatalogId}
                    leftAvatar={{uri: item.imageUrl}}
                    subtitle={item.platformName}
                    rightIcon={
                      <Icon
                        name="ios-close-circle"
                        color={MyColors.error}
                        size={30}
                        onPress={handlePressIcon}
                      />
                    }
                  />
                );
              }
            })}
          </TradeScrollView>
        )}

        <CustomActivityIndicator isVisible={loading} />

        <View>
          <BottomOptions>
            <MyButton
              clear
              disabled={loading}
              iconSource={require('../../../Assets/images/trade/joystick.png')}
              label={'Adicionar Item'}
              onPress={handleOpen}
              style={styles.buttonLeft}
            />

            <MyButton
              clear
              color="#222222"
              disabled={loading}
              iconSource={require('../../../Assets/images/trade/money.png')}
              label={`R$ ${OfferedPrice}`}
              onPress={handleInputOpen}
              style={styles.buttonRight}
            />
          </BottomOptions>
        </View>
      </Container>

      <ModalInputValue
        gamerId={tradePart.gamerId}
        opened={inputContainerOpened}
        setModalOpened={setInputContainerOpened}
        value={String(OfferedPrice)}
      />

      <ModalAddGame
        items={tradeItems}
        opened={addGameOpened}
        setModalOpened={setAddGameOpened}
      />
    </TradeSafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonLeft: {
    flex: 1,
  },
  buttonRight: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: '#f7f4f4',
    borderRadius: 0,
  },
  joystick: {
    width: 44,
    height: 60,
  },
});

TradeRequestMe.navigationOptions = () => ({
  header: null,
});

export default TradeRequestMe;
