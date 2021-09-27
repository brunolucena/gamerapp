import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import Heading from './';
import CenterView from '../CenterView';

storiesOf('Heading', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <>
      <Heading h1>Este é um H1</Heading>

      <Heading h2>Este é um H2</Heading>

      <Heading h3>Este é um H3</Heading>

      <Heading h4>Este é um H4</Heading>

      <Heading h5>Este é um H5</Heading>

      <Heading h6>Este é um H6</Heading>
    </>
  ))
  .add('Default colors', () => {
    return (
      <>
        <Heading h4>Default color</Heading>
        <Heading h4 type="primary">
          Primary color
        </Heading>
        <Heading h4 type="secondary">
          Secondary color
        </Heading>
        <Heading h4 type="error">
          Error color
        </Heading>
        <Heading h4 type="success">
          Success color
        </Heading>
        <Heading h4 type="warn">
          Warn color
        </Heading>
      </>
    );
  })
  .add('Uppercase', () => <Heading uppercase>Compre à prazo</Heading>);
