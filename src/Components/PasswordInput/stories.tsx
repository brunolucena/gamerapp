import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import PasswordInput from './';

storiesOf('PasswordInput', module)
  .addDecorator((getStory: any) => <View>{getStory()}</View>)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => <PasswordInput />);
