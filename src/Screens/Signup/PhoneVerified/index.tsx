import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-navigation';

import {InjectedNavigation} from '../../../Models/Utils';
import {ReactNativeElementsTheme} from '../../../Themes';
import ButtonSecondary from '../../../Components/Buttons/ButtonSecondary';

function PhoneVerified({navigation}: InjectedNavigation) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.text}>
          Seu celular foi autenticado com sucesso!
        </Text>
      </View>

      <View style={styles.bottom}>
        <ButtonSecondary
          containerStyle={styles.buttonContainerStyle}
          onPress={() => navigation.navigate('CPF')}
          title="Entendi"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonContainerStyle: {
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    textAlign: 'center',
  },
  inputContainerStyle: {
    marginTop: 30,
  },
  inputError: {
    color: MyColors.warn,
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#4e4e4e',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default PhoneVerified;
