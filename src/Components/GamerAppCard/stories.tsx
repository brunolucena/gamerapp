import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import GamerAppCard from './';
import CenterView from '../CenterView';

storiesOf('GamerAppCard', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <GamerAppCard
      imageSource={{
        uri:
          'https://upload.wikimedia.org/wikipedia/pt/6/67/Zelda_-_Breath_of_the_Wild.png',
      }}
      title="Nintendo Switch"
      name="Zelda: Breath of the Wild"
    />
  ));
