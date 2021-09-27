import React, {useState} from 'react';
import {Picker, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';

import {ModalContainer} from './styles';
import {setEnvironment} from 'src/Store/Ducks/configDuck';
import {Environments} from '../../Models/ConfigModels';
import {GamerAppReduxStore} from 'src/Store';

const ActivateDevMode: React.FC<{}> = props => {
  const {children} = props;

  const [opened, setOpened] = useState(false);
  const [timesClicked, setTimesClicked] = useState(0);

  const dispatch = useDispatch();

  const {environment} = useSelector(
    (state: GamerAppReduxStore) => state.config,
  );

  function onPress() {
    if (timesClicked < 5) {
      setTimesClicked(timesClicked + 1);
    } else {
      setOpened(true);
    }
  }

  function toggleOpened() {
    setOpened(!opened);
  }

  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        {children}
      </TouchableWithoutFeedback>

      <Modal isVisible={opened} onBackdropPress={toggleOpened}>
        <ModalContainer>
          <Picker
            selectedValue={environment}
            onValueChange={(itemValue: Environments) =>
              dispatch(setEnvironment(itemValue))
            }>
            <Picker.Item label="production" value="production" />
            <Picker.Item label="development" value="development" />
            <Picker.Item label="postman" value="postman" />
          </Picker>
        </ModalContainer>
      </Modal>
    </View>
  );
};

export default ActivateDevMode;
