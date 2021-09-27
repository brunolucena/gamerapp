import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import MyTextField from './';
import SearchTextField from './SearchTextField';

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
});

const MaskExample = () => {
  const [celular, setCelular] = useState('');

  return (
    <MyTextField
      handleChangeText={setCelular}
      maxLength={15}
      placeholder="(19) 00000-0000"
      title="Celular"
      type="celular"
      value={celular}
    />
  );
};

storiesOf('MyTextField', module)
  .addDecorator((getStory: any) => (
    <View style={styles.view}>{getStory()}</View>
  ))
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <MyTextField handleChangeText={() => console.log('oi')} />
  ))
  .add('Title e Placeholder', () => (
    <>
      <MyTextField
        handleChangeText={() => console.log('oi')}
        title="Nome"
        placeholder="Digite seu nome"
      />
      <MyTextField
        handleChangeText={() => console.log('oi')}
        title="Sobrenome"
        placeholder="Digite seu sobrenome"
      />
    </>
  ))
  .add('Com erro', () => (
    <MyTextField
      handleChangeText={() => console.log('oi')}
      title="Telefone"
      placeholder="(19) 00000-0000"
      error="Telefone inválido"
      value="19992"
    />
  ))
  .add('Com máscara', () => {
    return <MaskExample />;
  })
  .add('Senha', () => (
    <MyTextField
      handleChangeText={() => console.log('oi')}
      secureTextEntry
      title="Sua senha"
      placeholder="Digite sua senha"
      type="password"
    />
  ))
  .add('KeyboardTypes', () => (
    <ScrollView>
      <MyTextField
        handleChangeText={() => console.log('oi')}
        title="Telefone"
        placeholder="(19) 00000-0000"
        type="celular"
      />

      <MyTextField
        handleChangeText={() => console.log('oi')}
        secureTextEntry
        title="Password"
        placeholder="Digite sua senha"
        type="password"
      />

      <MyTextField
        handleChangeText={() => console.log('oi')}
        title="E-mail"
        placeholder="Digite seu e-mail"
        type="email"
      />
    </ScrollView>
  ))
  .add('Ícone (com click)', () => (
    <MyTextField
      handleChangeText={() => console.log('oi')}
      title="E-mail"
      placeholder="Digite seu e-mail"
      rightButtonProps={{
        iconSource: require('../../Assets/images/email.png'),
        iconColor: 'gray',
        onPress: () => action('clicked icon'),
      }}
    />
  ))
  .add('Centered Text', () => (
    <MyTextField
      handleChangeText={() => console.log('oi')}
      placeholder="Pesquisar marca"
      title=""
      centered
      value="Teste"
    />
  ))
  .add('Search', () => (
    <SearchTextField
      onBlur={() => action('blur')}
      handleChangeText={() => action('change text')}
      value=""
    />
  ));
