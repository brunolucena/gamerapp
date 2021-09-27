import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import InputCurrency, {InputCurrencyProps} from '..';
import Modal from 'react-native-modal';

interface InputCurrencyModalProps extends InputCurrencyProps {
  closeModal: () => any;
  opened: boolean;
}

/**
 * Modal do input para digitar valores monetários.
 */
const InputCurrencyModal: React.SFC<InputCurrencyModalProps> = props => {
  const {closeModal, opened} = props;

  return (
    <Modal
      backdropOpacity={0.2}
      isVisible={opened}
      onBackdropPress={closeModal}
      style={styles.modal}>
      <InputCurrency {...props} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
    paddingTop: 100,
  },
});

InputCurrencyModal.defaultProps = {
  initialValue: 0,
  textCancel: 'CANCELAR',
  textConfirm: 'CONCLUÍDO',
};

export default InputCurrencyModal;
