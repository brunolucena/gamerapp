import React from 'react';
import {StyleSheet} from 'react-native';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import MyListItem from './';
import {View} from 'react-native';
import {MyColors} from 'src/Theme/FoundationConfig';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingVertical: 50,
    backgroundColor: '#ffffff',
  },
});

storiesOf('MyListItem', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <View style={styles.view}>
      <MyListItem
        arrowColor={MyColors.secondary}
        title="Title"
        leftAvatar={require('../../Assets/images/avatars/man.png')}
        subtitle="Subtitle"
        onPress={() => action('clicked')}
      />
    </View>
  ))
  .add('Vários', () => (
    <View style={styles.view}>
      <MyListItem title="Teste 1" onPress={() => action('clicked')} />
      <MyListItem title="Teste 2" onPress={() => action('clicked')} />
      <MyListItem title="Teste 3" onPress={() => action('clicked')} />
      <MyListItem title="Teste 4" onPress={() => action('clicked')} />
      <MyListItem title="Teste 5" onPress={() => action('clicked')} />
    </View>
  ));
