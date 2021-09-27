import React from 'react';
import {useDispatch} from 'react-redux';
import MyButton from 'src/Components/Button';
import Modal from 'react-native-modal';

import {changeOfferedPrice} from 'src/Store/Ducks/tradeActive';

import {Buttons, InputValueContainer} from './ModalInputValueStyles';
import MyTextField from 'src/Components/TextField';

interface Props {
  gamerId: string;
  opened: boolean;
  setModalOpened: (opened: boolean) => any;
  value: string;
}

function ModalInputValue(props: Props) {
  const dispatch = useDispatch();

  const {gamerId, opened, setModalOpened, value} = props;

  function handleClose() {
    setModalOpened(false);
  }

  function handleChange(text: string) {
    dispatch(changeOfferedPrice({gamerId, value: text ? parseFloat(text) : 0}));
  }

  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={opened}
      onBackdropPress={handleClose}>
      <InputValueContainer>
        <MyTextField
          centered
          keyboardType="number-pad"
          handleChangeText={handleChange}
          placeholder="0,00"
          title=""
          value={value}
        />

        <Buttons>
          <MyButton onPress={handleClose} label="Confirmar" type="secondary" />
        </Buttons>
      </InputValueContainer>
    </Modal>
  );
}

export default ModalInputValue;
