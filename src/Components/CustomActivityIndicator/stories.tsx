import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import {withKnobs} from '@storybook/addon-ondevice-knobs';
import {withBackgrounds} from '@storybook/addon-backgrounds';
import Spinkit from 'react-native-spinkit';

import CenterView from '../CenterView';
import CustomActivityIndicator from '.';
import {MyColors} from 'src/Theme/FoundationConfig';

storiesOf('CustomActivityIndicator', module)
  .addDecorator(withKnobs)
  .addDecorator(
    withBackgrounds([
      {name: 'twitter', value: '#00aced', default: true},
      {name: 'facebook', value: '#3b5998'},
    ]),
  )
  .add('Default', () => (
    <CenterView>
      <CustomActivityIndicator />
    </CenterView>
  ))
  .add('Todos', () => (
    <ScrollView>
      <View style={styles.view}>
        <Spinkit color={MyColors.primary} size={50} type="9CubeGrid" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="Arc" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="ArcAlt" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="Bounce" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="ChasingDots" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="Circle" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="CircleFlip" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="FadingCircle" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="FadingCircleAlt" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="Plane" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="Pulse" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="ThreeBounce" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="WanderingCubes" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="Wave" />

        <View style={styles.margin} />

        <Spinkit color={MyColors.primary} size={50} type="WordPress" />

        <View style={styles.margin} />
      </View>
    </ScrollView>
  ));

const styles = StyleSheet.create({
  margin: {
    margin: 20,
  },
  view: {
    alignItems: 'center',
    padding: 30,
  },
});
