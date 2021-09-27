import React from 'react';
import {StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import Logo from './';

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  logoContainerWhite: {
    backgroundColor: '#ffffff',
  },
});

storiesOf('Logo', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('White (Default)', () => (
    <View style={styles.logoContainer}>
      <Logo />
    </View>
  ))
  .add('Green', () => (
    <View style={[styles.logoContainer, styles.logoContainerWhite]}>
      <Logo type="green" />
    </View>
  ));
