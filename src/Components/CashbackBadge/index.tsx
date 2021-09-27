import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {Text} from 'react-native-ui-lib';
import {View} from 'react-native-ui-lib';
import {MyColors} from 'src/Theme/FoundationConfig';

interface CashbackBadgeProps {
  containerStyles?: ViewStyle;
}

const CashbackBadge: React.SFC<CashbackBadgeProps> = props => {
  const {children, containerStyles} = props;

  return (
    <View style={[styles.cashback, containerStyles]}>
      <Text white>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cashback: {
    alignSelf: 'flex-start',
    backgroundColor: MyColors.primary,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});

export default CashbackBadge;
