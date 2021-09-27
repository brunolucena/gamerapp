import React from 'react';
import Modal from 'react-native-modal';
import MyButton from 'src/Components/Button';

import {
  Bottom,
  Confirm,
  ConfirmText,
  ConfirmTrade,
  ConfirmTradeText,
} from './ModalConfirmReceivedStyles';

interface Props {
  onConfirm: (status: 'entregue' | 'recebido') => any;
  opened: boolean;
  setOpened: (opened: boolean) => any;
}

const ModalConfirmReceived = (props: Props) => {
  const {onConfirm, opened, setOpened} = props;

  function handleClose() {
    setOpened(false);
  }

  function handleConfirm() {
    onConfirm('recebido');
  }

  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={opened}
      onBackdropPress={handleClose}>
      <Confirm>
        <ConfirmText>Atenção</ConfirmText>

        <ConfirmTrade>
          <ConfirmTradeText>
            Você confirma que recebeu o produto?
          </ConfirmTradeText>
        </ConfirmTrade>

        <Bottom>
          <MyButton
            label="Sim, confirmo"
            onPress={handleConfirm}
            type="secondary"
          />
        </Bottom>
      </Confirm>
    </Modal>
  );
};

export default ModalConfirmReceived;
