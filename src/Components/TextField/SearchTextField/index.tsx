import React, { createRef } from 'react';
import MyTextField, {MyTextFieldProps} from '..';
import {StyleSheet, ViewStyle} from 'react-native';
import {MyColors} from 'src/Theme/FoundationConfig';
import { TextField } from 'react-native-ui-lib';

interface Props extends MyTextFieldProps {
  iconStyles?: ViewStyle;
  onIconPress?: Function;
}

const SearchTextField: React.SFC<Props> = props => {
  const {
    handleChangeText,
    iconStyles,
    onBlur,
    onIconPress,
    placeholder,
    value,
  } = props;

  const searchBarRef = createRef<React.RefObject<TextField> | any>();
  
  function handleIconPress() {
    if (onIconPress) {
      onIconPress();
      
    }

    searchBarRef?.current?.blur();
  }

  return (
    <MyTextField
      {...props}
      containerStyle={props.containerStyle}
      handleChangeText={handleChangeText}
      hideUnderline
      onBlur={onBlur}
      placeholder={placeholder || 'Pesquisar'}
      // @ts-ignore
      ref={searchBarRef}
      rightButtonProps={{
        iconColor: MyColors.primary,
        iconSource: require('../../../Assets/images/search.png'),
        onPress: handleIconPress,
        style: [
          {
            marginRight: 10,
            paddingBottom: 15,
          },
          iconStyles,
        ],
      }}
      style={[styles.style, props.style]}
      title=""
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  style: {
    borderColor: '#eaeaea',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
});

export default SearchTextField;
