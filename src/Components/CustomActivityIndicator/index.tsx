import React from 'react';
import Spinkit, {SpinnerProps} from 'react-native-spinkit';

import {CustomActivityIndicatorContainer} from './styles';
import {MyColors} from 'src/Theme/FoundationConfig';

interface Props extends SpinnerProps {}

const CustomActivityIndicator: React.SFC<Props> = props => {
  return (
    <CustomActivityIndicatorContainer>
      <Spinkit {...props} />
    </CustomActivityIndicatorContainer>
  );
};

CustomActivityIndicator.defaultProps = {
  color: MyColors.primary,
  size: 50,
  type: '9CubeGrid',
};

export default CustomActivityIndicator;
