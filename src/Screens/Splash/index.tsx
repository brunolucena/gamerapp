import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Image} from 'react-native-ui-lib';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../Assets/images/logo/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: MyColors.primary,
  },
});

export default Splash;
