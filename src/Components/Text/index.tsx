import React from 'react';
import {Text as TextUI, TextProps as TextPropsUI} from 'react-native-ui-lib';

import {MyColors} from '../../Theme/FoundationConfig';

export type textTypes = 'primary' | 'secondary' | 'error' | 'success' | 'warn';
export type textSizes = 'small' | 'normal' | 'big';

interface TextProps extends TextPropsUI {
  fontSize?: number;
  size?: textSizes;
  type?: textTypes;
}

const Text: React.SFC<TextProps> = props => {
  const {children, color, fontSize, size, type} = props;

  return (
    <TextUI
      {...props}
      margin-s5
      color={type ? MyColors[type] : color}
      {...(size === 'small' && {text100: true})}
      {...(size === 'big' && {text60: true})}
      {...(fontSize && {style: {fontSize}})}>
      {children}
    </TextUI>
  );
};

Text.defaultProps = {
  center: true,
  color: '#7f7f7f',
  size: 'normal',
};

export default Text;
