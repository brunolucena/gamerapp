import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

function PoliticasVendaETroca() {
  return (
    <View style={styles.container}>
      <Text>Política de Vendas e Troca</Text>
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

export default PoliticasVendaETroca;
