import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {
  badgeCount: number;
  color: string | undefined;
  text: string;
}

function TextWithBadge(props: Props) {
  const {badgeCount, color, text} = props;

  return (
    <View>
      <Text style={[styles.text, {color}]}>{text}</Text>

      {badgeCount > 0 && (
        <View
          style={[
            styles.badgeContainer,
            badgeCount > 9 && styles.badgeContainerTwoDigits,
            badgeCount > 99 && styles.badgeContainerThreeDigits,
          ]}>
          <Text style={styles.badge}>{badgeCount}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  badgeContainer: {
    position: 'absolute',
    right: -15,
    top: -4,
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: '#ef0e0e',
  },
  badgeContainerTwoDigits: {
    right: -22,
    top: -6,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  badgeContainerThreeDigits: {
    right: -28,
    top: -7,
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },
  text: {
    fontSize: 16,
  },
});

export default TextWithBadge;
