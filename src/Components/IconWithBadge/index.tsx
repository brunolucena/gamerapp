import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  badgeCount: number;
  color: string | undefined;
  name: string;
  size: number;
}

function IconWithBadge(props: Props) {
  const {badgeCount, color, name, size} = props;

  return (
    <View style={styles.container}>
      <Icon name={name} size={size} color={color} />

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
    right: -11,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: '#ef0e0e',
  },
  badgeContainerTwoDigits: {
    right: -16,
    top: -4,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
  badgeContainerThreeDigits: {
    right: -20,
    top: -5,
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
  },
  container: {
    width: 24,
    height: 24,
  },
});

export default IconWithBadge;
