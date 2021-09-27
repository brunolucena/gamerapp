import React from 'react';
import {FlexAlignType, StyleProp, TextStyle} from 'react-native';
import {
  Button as ButtonUI,
  ButtonProps as ButtonPropsUI,
} from 'react-native-ui-lib';
import {MyColors} from '../../Theme/FoundationConfig';

export type buttonTypes =
  | 'black'
  | 'error'
  | 'gray'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warn';

interface ButtonProps extends ButtonPropsUI {
  alignSelf?: 'auto' | FlexAlignType;
  backgroundColor?: string;
  clear?: boolean;
  fullWidth?: boolean;
  margin?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  normalWidth?: boolean;
  paddingVertical?: number;
  type?: buttonTypes;
}

const MyButton: React.SFC<ButtonProps> = props => {
  const {
    alignSelf,
    backgroundColor,
    borderRadius,
    clear,
    disabled,
    fullWidth,
    marginHorizontal,
    marginVertical,
    outline,
    outlineColor,
    paddingVertical,
    round,
    size,
    type,
  } = props;

  const buttonColor = MyColors[type!];
  const gray = MyColors.gray;
  const gray2 = MyColors.gray2;

  const buttonStyles: StyleProp<TextStyle> = {
    alignSelf: alignSelf || 'center',
    marginHorizontal: fullWidth ? 0 : marginHorizontal,
    marginVertical: fullWidth ? 0 : marginVertical,
    ...(clear && {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: disabled ? gray : buttonColor,
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginVertical: 0,
      marginHorizontal: 0,
    }),
    ...(outline && {
      borderColor: disabled ? gray : outlineColor || buttonColor,
      color: disabled ? gray2 : outlineColor || buttonColor,
    }),
    ...(!outline &&
      !clear &&
      !disabled && {
        backgroundColor: buttonColor,
      }),
    ...((paddingVertical || size === 'large') && {
      paddingVertical: paddingVertical || 15,
    }),
    ...(round && {
      alignSelf: 'center',
    }),
    ...(!round && {
      borderRadius,
    }),
    ...(backgroundColor && {backgroundColor}),
    ...(fullWidth && {width: '100%'}),
    ...(disabled && {backgroundColor: '#484848'}),
  };

  return (
    // @ts-ignore
    <ButtonUI label="Ok" {...props} style={{...buttonStyles, ...props.style}} />
  );
};

MyButton.defaultProps = {
  alignSelf: 'auto',
  borderRadius: 4,
  clear: false,
  fullWidth: false,
  marginHorizontal: 10,
  marginVertical: 10,
  size: 'large',
  type: 'primary',
};

export default MyButton;
