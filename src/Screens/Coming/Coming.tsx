import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Coming = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Em breve</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
  },
});

export default Coming;
