import React from 'react';
import Modal from 'react-native-modal';
import MyButton from 'src/Components/Button';

import {
  Bottom,
  Confirm,
  ConfirmText,
  ConfirmTrade,
  ConfirmTradeText,
} from './ModalConfirmDeliveredStyles';

interface Props {
  onConfirm: (status: 'entregue' | 'recebido') => any;
  opened: boolean;
  setOpened: (opened: boolean) => any;
}

const ModalConfirmDelivered = (props: Props) => {
  const {onConfirm, opened, setOpened} = props;

  function handleClose() {
    setOpened(false);
  }

  function handleOnConfirm() {
    onConfirm('entregue');
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
            Você confirma a entrega do item ao outro negociador?
          </ConfirmTradeText>
        </ConfirmTrade>

        <Bottom>
          <MyButton
            label="Sim, confirmo"
            onPress={handleOnConfirm}
            type="secondary"
          />
        </Bottom>
      </Confirm>
    </Modal>
  );
};

export default ModalConfirmDelivered;
