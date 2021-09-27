import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';
import {number} from '@storybook/addon-knobs';

import Text from './';
import CenterView from '../CenterView';

storiesOf('Text', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <Text>
      O Blim oferece crédito para que você faça as suas compras a prazo e tenha
      mais flexibilidade na hora do pagamento.
    </Text>
  ))
  .add('Align Left', () => (
    <Text center={false}>
      O Blim oferece crédito para que você faça as suas compras a prazo e tenha
      mais flexibilidade na hora do pagamento.
    </Text>
  ))
  .add('Default colors', () => {
    return (
      <>
        <Text type="primary">Primary color</Text>
        <Text type="secondary">Secondary color</Text>
        <Text type="error">Error color</Text>
        <Text type="success">Success color</Text>
        <Text type="warn">Warn color</Text>
      </>
    );
  })
  .add('Default sizes', () => {
    return (
      <>
        <Text size="small">Esse é um texto pequeno</Text>
        <Text size="normal">Esse é um texto normal</Text>
        <Text size="big">Esse é um texto grande</Text>
        <Text fontSize={number('fontSize', 18)}>
          Esse é um texto com o tamanho customizável
        </Text>
      </>
    );
  })
  .add('Uppercase', () => (
    <Text uppercase>
      O Blim oferece crédito para que você faça as suas compras a prazo e tenha
      mais flexibilidade na hora do pagamento.
    </Text>
  ));
