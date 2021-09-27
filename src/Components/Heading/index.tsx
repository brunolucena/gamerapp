import React from 'react';
import {Text as TextUI, TextProps as TextPropsUI} from 'react-native-ui-lib';

import {MyColors} from '../../Theme/FoundationConfig';

export type textTypes = 'primary' | 'secondary' | 'error' | 'success' | 'warn';

interface HeadingProps extends TextPropsUI {
  fontSize?: number;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  type?: textTypes;
}

const Heading: React.SFC<HeadingProps> = props => {
  const {children, color, fontSize, h1, h2, h3, h4, h5, h6, size, type} = props;

  const textSize = {
    text20: h1,
    text30: h2,
    text50: h3,
    text60: h4,
    text90: h5,
    text100: h6,
  };

  return (
    <TextUI
      {...props}
      margin-s5
      text
      color={type ? MyColors[type] : color}
      {...(size === 'small' && {text100: true})}
      {...(size === 'big' && {text60: true})}
      {...(fontSize && {style: {fontSize}})}
      {...textSize}>
      {children}
    </TextUI>
  );
};

Heading.defaultProps = {
  center: true,
  color: '#2a2a2a',
  h1: true,
};

export default Heading;
