import React from 'react';
import {storiesOf} from '@storybook/react-native';
// @ts-ignore
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import InputCurrency from './';
import CenterView from '../CenterView';

storiesOf('InputCurrency', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <InputCurrency onCancel={() => {}} onConfirm={() => {}} />
  ));
