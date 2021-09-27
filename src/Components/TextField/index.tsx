import React, {RefObject, useState} from 'react';
import {KeyboardTypeOptions, StyleSheet} from 'react-native';
import {
  TextField,
  TextFieldProps,
  TextFieldRightButtonProps,
} from 'react-native-ui-lib';

import {MyColors} from '../../Theme/FoundationConfig';
import {phoneMask, cepMask, cpfMask} from './masks';

const eye = require('./assets/eye.png');
const eyeOff = require('./assets/eye-off.png');

type types = 'text' | 'celular' | 'email' | 'password' | 'cep' | 'cpf';
type autoCompleteType =
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'email'
  | 'name'
  | 'password'
  | 'postal-code'
  | 'street-address'
  | 'tel'
  | 'username'
  | 'off';
type textContentType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode';

export interface MyTextFieldProps extends TextFieldProps {
  handleChangeText: (text: string) => void;
  type?: types;
}

const MyTextField: React.FC<MyTextFieldProps> = React.forwardRef<
  TextField,
  MyTextFieldProps
>((props, ref) => {
  const {
    centered,
    containerStyle,
    handleChangeText,
    keyboardType,
    maxLength,
    rightButtonProps,
    secureTextEntry,
    style,
    type,
    value,
  } = props;

  const [isSecureText, setIsSecuretext] = useState(secureTextEntry);

  const toggleSecureText = () => {
    setIsSecuretext(!isSecureText);
  };

  const secureTextRightButtonProps: TextFieldRightButtonProps = {
    iconSource: isSecureText ? eyeOff : eye,
    onPress: toggleSecureText,
    iconColor: isSecureText ? MyColors.gray : MyColors.primary,
  };

  const customHandleChangeText = (text: string) => {
    if (handleChangeText) {
      let newValue = maskvalue(text);

      handleChangeText(newValue);
    }
  };

  const maskvalue = (text: string): string => {
    switch (type) {
      case 'celular': {
        text = phoneMask(text);
        break;
      }

      case 'cep': {
        text = cepMask(text);
        break;
      }

      case 'cpf': {
        text = cpfMask(text);
        break;
      }

      default: {
        text = text;
      }
    }

    return text;
  };

  const getTextContentType = (): textContentType => {
    switch (type) {
      case 'cep': {
        return 'postalCode';
      }

      default: {
        return 'none';
      }
    }
  };

  const getAutoCompleteType = (): autoCompleteType => {
    switch (type) {
      case 'celular': {
        return 'tel';
      }

      case 'cep': {
        return 'postal-code';
      }

      case 'email': {
        return 'email';
      }

      default:
        return 'off';
    }
  };

  const getKeyboardType = (): KeyboardTypeOptions => {
    if (keyboardType) {
      return keyboardType;
    }

    switch (type) {
      case 'celular': {
        return 'number-pad';
      }

      case 'cpf': {
        return 'number-pad';
      }


      case 'cep': {
        return 'number-pad';
      }

      case 'email': {
        return 'email-address';
      }

      case 'password': {
        if (!isSecureText) {
          return 'visible-password';
        }

        return 'number-pad';
      }

      default:
        return keyboardType || 'default';
    }
  };

  return (
    <TextField
      {...props}
      containerStyle={[styles.container, containerStyle]}
      autoCompleteType={getAutoCompleteType()}
      maxLength={type === 'cep' ? 9 : maxLength}
      keyboardType={getKeyboardType()}
      onChangeText={customHandleChangeText}
      ref={ref}
      // @ts-ignore
      rightButtonProps={
        rightButtonProps || (secureTextEntry && secureTextRightButtonProps)
      }
      secureTextEntry={secureTextEntry}
      style={[styles.style, style, centered && styles.centered]}
      textContentType={getTextContentType()}
      value={value}
    />
  );
});

const colors = {
  default: '#000000',
  focus: MyColors.primary,
  error: MyColors.error,
};

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
  },
  container: {
    maxHeight: 100,
    width: '100%',
  },
  style: {
    textAlign: 'auto',
  },
});

MyTextField.defaultProps = {
  placeholder: 'Placeholder',
  style: {
    fontSize: 18,
  },
  title: '',
  titleColor: colors,
  titleStyle: {
    fontSize: 16,
  },
  type: 'text',
  underlineColor: {
    ...colors,
    default: '#909090',
  },
};

export default MyTextField;
