import React from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet, View, ScrollView} from 'react-native';
import MyButton from 'src/Components/Button';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyColors} from 'src/Theme/FoundationConfig';

import {addTradeItems} from 'src/Store/Ducks/tradeActive';

import {TradeRequestItem} from '../../../../Models/TradeRequest';

import {AddGameContainer, AddGameBottom} from './ModalAddGameStyles';
import MyListItem from 'src/Components/MyListItem';

interface Props {
  items: TradeRequestItem[];
  opened: boolean;
  setModalOpened: (opened: boolean) => any;
}

function ModalAddGame(props: Props) {
  const dispatch = useDispatch();

  const {items, opened, setModalOpened} = props;

  function handleClose() {
    setModalOpened(false);
  }

  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={opened}
      onBackdropPress={handleClose}
      style={styles.modal}>
      <AddGameContainer>
        <ScrollView style={styles.scrollView}>
          {items.map(item => {
            function handlePress() {
              const data = {items: [item]};

              dispatch(addTradeItems(data));
            }

            if (!item.selected) {
              return (
                <MyListItem
                  key={item.productId}
                  leftAvatar={{uri: item.imageUrl}}
                  rightIcon={
                    <Icon
                      name="ios-add-circle"
                      color={MyColors.success}
                      size={30}
                      onPress={handlePress}
                    />
                  }
                  subtitle={`${item.platformName} ${
                    item.productInWishlist
                      ? ' - Na wishlist do outro gamer'
                      : ''
                  }`}
                  title={item.productName}
                />
              );
            }
          })}
        </ScrollView>

        <AddGameBottom>
          <MyButton label="Fechar" onPress={handleClose} type="secondary" />
        </AddGameBottom>
      </AddGameContainer>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  scrollView: {flex: 1, height: '100%'},
});

export default ModalAddGame;
