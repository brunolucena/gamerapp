import React from 'react';
import {GestureResponderEvent, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {MyColors} from '../../Theme/FoundationConfig';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Type = 'clear' | 'flat';

interface ButtonProps {
  color?: string;
  icon: any;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  type?: Type;
}

const ButtonWithIcon: React.SFC<ButtonProps> = props => {
  const {color, icon, label, onPress, type} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, type === 'clear' && styles.buttonClear]}>
        <View marginR-10>{icon}</View>

        <Text text70 style={{color}}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: MyColors.secondary,
    padding: 15,
  },
  buttonClear: {
    backgroundColor: 'transparent',
  },
});

ButtonWithIcon.defaultProps = {
  color: '#ffffff',
  type: 'flat',
};

export default ButtonWithIcon;
