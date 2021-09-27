import React from 'react';
import {storiesOf} from '@storybook/react-native';
// @ts-ignore
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import ProductListItem from './';
import CenterView from '../CenterView';

storiesOf('ProductListItem', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <ProductListItem
      cashback="6%"
      hasDelivery
      image={require('../../Assets/images/placeholder.png')}
      title="Red Dead Redemptions 2"
      oldPrice={200}
      price={189}
      subtitle="PLAYSTATION 4"
    />
  ));
