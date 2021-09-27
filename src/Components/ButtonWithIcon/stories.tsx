import React from 'react';
import {ScrollView, StyleProp, ViewStyle, ImageStyle} from 'react-native';
import {View} from 'react-native-ui-lib';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';
import {text, number, color} from '@storybook/addon-knobs';

import Button from './';
import CenterView from '../CenterView';

const chevronIcon = require('../../Assets/images/chevron.png');
const emailIcon = require('../../Assets/images/email.png');

const viewStyle: StyleProp<ViewStyle> = {
  justifyContent: 'flex-end',
};

storiesOf('Button', module)
  .addDecorator((getStory: any) => (
    <CenterView alignItems={null} justifyContent="flex-end">
      {getStory()}
    </CenterView>
  ))
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Buttons', () => {
    const iconStyle: StyleProp<ImageStyle> = {transform: [{scale: 0.5}]};

    return (
      <View style={viewStyle}>
        <ScrollView>
          <Button label="Round" round />
          <Button label="Round" round disabled />
          <Button label="Clear" clear />
          <Button label="Clear Disabled" clear disabled />
          <Button label="Outline" outline />
          <Button label="Outline Disabled" outline disabled />
          <Button label="Default" />
          <Button label="Default Disabled" disabled />
          <Button label="With Shadow" enableShadow />
          <Button
            label="With Left Icon"
            iconSource={emailIcon}
            iconStyle={iconStyle}
          />
          <Button
            label="Outline With Icon"
            iconSource={emailIcon}
            iconStyle={iconStyle}
            outline
          />
          <Button
            label="Clear With Icon"
            iconOnRight
            iconSource={chevronIcon}
            iconStyle={iconStyle}
            clear
          />
          <Button
            label="With Right Icon"
            iconOnRight
            iconSource={emailIcon}
            iconStyle={iconStyle}
          />
        </ScrollView>
      </View>
    );
  })
  .add('Textos', () => {
    return (
      <View>
        <Button
          label={text('label', 'Texto editável com knob')}
          marginVertical={10}
        />
        <Button
          label="Este é um texto consideravelmente grande"
          marginVertical={0}
        />
        <Button label="Ok, obrigado!" />
      </View>
    );
  })
  .add('Tamanhos', () => {
    return (
      <View style={viewStyle}>
        <ScrollView>
          <Button
            label="Tamanho editável com knob"
            paddingVertical={number('paddingVertical', 15)}
          />
          <Button size="small" alignSelf="center" />
          <Button size="medium" alignSelf="center" />
          <Button size="large" alignSelf="center" />
          <Button size="small" />
          <Button size="medium" />
          <Button size="large" />
          <Button />
          <Button fullWidth />
        </ScrollView>
      </View>
    );
  })
  .add('Cores', () => {
    return (
      <View style={viewStyle}>
        <ScrollView>
          <Button
            label="Editar knob backgroundColor"
            backgroundColor={color('backgroundColor', '#1563ce')}
          />
          <Button
            label="Editar knob outlineColor"
            outline
            outlineColor={color('outlineColor', '#1563ce')}
          />
          <Button
            label="Editar knob color"
            color={color('color', '#1563ce')}
            clear
          />

          <Button label="error" type="error" />
          <Button label="warn" type="warn" />
          <Button label="success" type="success" />
          <Button label="secondary" type="secondary" />
          <Button label="primary" type="primary" />

          <Button label="error" type="error" outline />
          <Button label="warn" type="warn" outline />
          <Button label="success" type="success" outline />
          <Button label="secondary" type="secondary" outline />
          <Button label="primary" type="primary" outline />

          <Button label="error" type="error" clear />
          <Button label="warn" type="warn" clear />
          <Button label="success" type="success" clear />
          <Button label="secondary" type="secondary" clear />
          <Button label="primary" type="primary" clear />
        </ScrollView>
      </View>
    );
  });
