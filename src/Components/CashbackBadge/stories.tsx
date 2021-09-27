import React from 'react';
import {storiesOf} from '@storybook/react-native';
// @ts-ignore
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import CashbackBadge from './';
import CenterView from '../CenterView';

storiesOf('CashbackBadge', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => <CashbackBadge text="6%" />);
