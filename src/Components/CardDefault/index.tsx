import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import {View} from 'react-native-ui-lib';
import {MyColors} from 'src/Theme/FoundationConfig';

const {width: windowWidth} = Dimensions.get('window');

interface CardDefaultProps {
  backgroundColor?: string;
  subtitle: string;
  title: any;
  width?: number;
}

const CardDefault: React.SFC<CardDefaultProps> = props => {
  const {backgroundColor, subtitle, title, width} = props;

  return (
    <View style={[styles.card, {backgroundColor, width}]} centerH centerV>
      {typeof title === 'string' ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        title
      )}

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 7,
    paddingHorizontal: 6,
    maxWidth: 300,
    borderRadius: 4,
  },
  subtitle: {
    marginTop: 2,
    color: '#767676',
    fontSize: 12,
    textAlign: 'center',
  },
  title: {
    color: MyColors.secondary,
    fontSize: 30,
    textAlign: 'center',
  },
});

CardDefault.defaultProps = {
  backgroundColor: '#e2e2e2',
  width: windowWidth,
};

export default CardDefault;
