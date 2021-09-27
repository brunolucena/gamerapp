import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';

import Carousel from './';
import Heading from '../Heading';
import Text from '../Text';
import {MyColors} from '../../Theme/FoundationConfig';

const {width} = Dimensions.get('window');

const itemWidth = width - 100;

const fakeData = [
  {
    id: 1,
    text: 'Slide 1',
  },
  {
    id: 2,
    text: 'Slide 2',
  },
  {
    id: 3,
    text: 'Slide 3',
  },
  {
    id: 4,
    text: 'Slide 4',
  },
  {
    id: 5,
    text: 'Slide 5',
  },
];

interface IFakeComponent {
  id: number;
  text: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: itemWidth,
    paddingHorizontal: 20,
  },
});

function FakeComponent(props: IFakeComponent) {
  const {id, text} = props;

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: id % 2 === 0 ? MyColors.primary : MyColors.secondary},
      ]}>
      <Heading h1 color="#ffffff">
        {id}
      </Heading>

      <Text color="#ffffff">{text}</Text>
    </View>
  );
}

storiesOf('Carousel', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <Carousel data={fakeData} component={FakeComponent} itemWidth={itemWidth} />
  ));
