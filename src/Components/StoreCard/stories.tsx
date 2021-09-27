import React from 'react';
import {storiesOf} from '@storybook/react-native';
// @ts-ignore
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import StoreCard from './';

storiesOf('StoreCard', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <StoreCard
      name="Loja The Games Shop"
      cashback="6%"
      image={require('../../Assets/images/avatars/man.png')}
      isCard
      backgroundColor="#ffffff"
      city="Dourados"
      state="MS"
      distance={2000}
      platformName="PLAYSTATION 4"
      price={189}
      stars={5}
    />
  ));
