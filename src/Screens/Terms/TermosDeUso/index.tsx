import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function TermosDeUso() {
  return (
    <View style={styles.container}>
      <Text>Termos de Uso</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
});

export default TermosDeUso;
