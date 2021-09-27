import React from 'react';

import {storiesOf} from '@storybook/react-native';
import {text} from '@storybook/addon-knobs';
// @ts-ignore
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import CenterView from '../../CenterView';
import Soldier from './Soldier';

storiesOf('Empty Screens/Soldier', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => <Soldier />)
  .add(
    'Custom text',
    () => (
      <Soldier
        text={text('text', 'Ops, você ainda não tem trocas para ver aqui.')}
      />
    ),
    {notes: 'Componente para tela vazia.'},
  );
