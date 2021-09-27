import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Card} from 'react-native-elements';
import {NavigationScreenOptions} from 'react-navigation';

import {InjectedNavigation} from '../../../Models/Utils';

interface Props extends InjectedNavigation {}

const ChooseType = ({navigation}: Props) => {
  const [gameBackgroundColor, setGameBackgroundColor] = useState('#ffffff');
  const [gameColor, setGameColor] = useState('#3e3e3e');
  const [consoleBackgroundColor, setConsoleBackgroundColor] = useState(
    '#ffffff',
  );
  const [consoleColor, setConsoleColor] = useState('#3e3e3e');
  const [acessoryBackgroundColor, setAcessoryBackgroundColor] = useState(
    '#ffffff',
  );
  const [acessoryColor, setAcessoryColor] = useState('#3e3e3e');
  const [anythingBackgroundColor, setAnythingBackgroundColor] = useState(
    '#ffffff',
  );
  const [anythingColor, setAnythingColor] = useState('#3e3e3e');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>O que você deseja adicionar?</Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cardContainer}
            onPressIn={() => {
              setGameBackgroundColor('#074ab5');
              setGameColor('#ffffff');
            }}
            onPressOut={() => {
              setGameColor('#3e3e3e');
              setGameBackgroundColor('#ffffff');
            }}
            onPress={() =>
              navigation.navigate('SearchProduct', {productType: 'game'})
            }>
            <Card
              title="Game"
              containerStyle={[
                styles.card,
                {backgroundColor: gameBackgroundColor},
              ]}
              titleStyle={{color: gameColor}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cardContainer}
            onPressIn={() => {
              setConsoleColor('#ffffff');
              setConsoleBackgroundColor('#074ab5');
            }}
            onPressOut={() => {
              setConsoleColor('#3e3e3e');
              setConsoleBackgroundColor('#ffffff');
            }}
            onPress={() =>
              navigation.navigate('SearchProduct', {productType: 'console'})
            }>
            <Card
              title="Console"
              containerStyle={[
                styles.card,
                {backgroundColor: consoleBackgroundColor},
              ]}
              titleStyle={{color: consoleColor}}></Card>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cardContainer}
            onPressIn={() => {
              setAcessoryColor('#ffffff');
              setAcessoryBackgroundColor('#074ab5');
            }}
            onPressOut={() => {
              setAcessoryColor('#3e3e3e');
              setAcessoryBackgroundColor('#ffffff');
            }}
            onPress={() =>
              navigation.navigate('SearchProduct', {productType: 'acessory'})
            }>
            <Card
              title="Acessórios"
              containerStyle={[
                styles.card,
                {backgroundColor: acessoryBackgroundColor},
              ]}
              titleStyle={{color: acessoryColor}}></Card>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cardContainer}
            onPressIn={() => {
              setAnythingColor('#ffffff');
              setAnythingBackgroundColor('#074ab5');
            }}
            onPressOut={() => {
              setAnythingColor('#3e3e3e');
              setAnythingBackgroundColor('#ffffff');
            }}
            onPress={() =>
              navigation.navigate('SearchProduct', {productType: 'anything'})
            }>
            <Card
              title="Qualquer Coisa"
              containerStyle={[
                styles.card,
                {backgroundColor: anythingBackgroundColor},
              ]}
              titleStyle={{color: anythingColor}}></Card>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flex: 1,
  },
  cardActive: {
    backgroundColor: '#074ab5',
  },
  cardContainer: {
    flexGrow: 1,
    paddingBottom: 15,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f4f4',
  },
  row: {
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    marginBottom: 25,
    fontSize: 35,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  titleActive: {
    color: '#ffffff',
  },
});

ChooseType.navigationOptions = ({
  navigation,
}: InjectedNavigation): NavigationScreenOptions => ({
  headerTitle: '',
});

export default ChooseType;
