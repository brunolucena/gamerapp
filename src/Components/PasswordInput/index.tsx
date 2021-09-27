import React from 'react';
import {TextField, TextFieldProps} from 'react-native-ui-lib';

import {Container, Lines, Line} from './styles';
import {Platform, StyleSheet} from 'react-native';

interface PasswordInputProps extends TextFieldProps {
  handleChangeText?: (text: string) => void;
}

const fontFamily = Platform.OS === 'ios' ? 'San Francisco' : 'monospace';

const PasswordInput: React.SFC<PasswordInputProps> = props => {
  const {handleChangeText, secureTextEntry, value} = props;

  return (
    <Container>
      <TextField
        {...props}
        autoCompleteType="password"
        keyboardType="number-pad"
        onChangeText={handleChangeText}
        hideUnderline
        value={value}
        secureTextEntry={secureTextEntry}
        style={styles.text}
      />

      <Lines>
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
        <Line />
      </Lines>
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily,
    fontVariant: ['tabular-nums'],
    fontSize: 50,
    letterSpacing: 18,
    lineHeight: 50,
    width: 288,
    justifyContent: 'flex-end',
    paddingTop: 60,
  },
});

PasswordInput.defaultProps = {
  maxLength: 6,
  secureTextEntry: true,
};

export default PasswordInput;
