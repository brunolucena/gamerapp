import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface Props {
  onTimesPressedFinish: any;
  times?: number;
}

const WithTap: React.FC<Props> = props => {
  const {children, onTimesPressedFinish, times} = props;
  const [timesPressed, setTimesPressed] = useState(0);

  const onFinishTimesPressed = () => {
    setTimesPressed(0);
    onTimesPressedFinish();
  };

  const onPress = () => {
    if (timesPressed < times) {
      setTimesPressed(timesPressed + 1);
    } else {
      onFinishTimesPressed();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {children}
    </TouchableWithoutFeedback>
  );
};

WithTap.defaultProps = {
  times: 5,
};

export default WithTap;
