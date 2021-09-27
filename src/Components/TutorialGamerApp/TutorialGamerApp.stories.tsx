import React from 'react';

import {storiesOf} from '@storybook/react-native';

import CenterView from '../CenterView';
import TutorialGamerApp, { TutorialText } from './TutorialGamerApp';
import { Alert } from 'react-native';

const onEnd = () => {
  Alert.alert('Tutorial storybook finalizado com sucesso');
};

const texts: TutorialText[] = [
  {
    title: 'GamerRex',
    text: 'Olá! Este é um Tutorial de exemplo para ser utilizado no storybook. Nele veremos o visual do tutorial.'
  },
  {
    title: 'Bruno',
    text: 'Aqui podemos ver como o título e o texto mudaram'
  },
  {
    text: 'E se você clickar na tela antes do texto acabar de ser digitado, ele finaliza de uma vez. Vamos lá, tente na próxima tela.'
  },
  
  {
    text: 'Este é um texto bem grande pra textar a funcionalidade de clickar na tela pra finalizar o texto de uma vez. Como eu não sei mais o que escrever, vou só escrever coisas aleatórias... bicicleta, abacate, fone de ouvido. Sei lá, as vezes parece que não sei.'
  },
  {
    text: 'Agora só falta fazer os tutoriais'
  }
]

storiesOf('Tutorial GamerApp', module)
  .addDecorator((getStory: any) => <CenterView>{getStory()}</CenterView>)
  .add('Default', () => <TutorialGamerApp onEnd={onEnd} texts={texts} />);
