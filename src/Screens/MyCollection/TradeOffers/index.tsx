import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyButton from 'src/Components/Button';

const TradeOffers = () => {
  const navigation = useNavigation();

  function handleAddToCollection() {
    navigation.navigate('AddToCollection');
  }

  function handleChooseType() {
    navigation.navigate('ChooseType');
  }

  function handleMyCollection() {
    navigation.navigate('MyCollection');
  }

  function handleTradeOffers() {
    navigation.navigate('TradeOffers');
  }

  function handleTradeRequest() {
    navigation.navigate('TradeRequest', {
      backRoute: 'TradeOffers',
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>TradeOffers!</Text>

      <MyButton label="AddToCollection" onPress={handleAddToCollection} />
      <MyButton label="ChooseType" onPress={handleChooseType} />
      <MyButton label="MyCollection" onPress={handleMyCollection} />
      <MyButton label="TradeOffers" onPress={handleTradeOffers} />
      <MyButton label="TradeRequest" onPress={handleTradeRequest} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f4f4',
  },
  text: {
    marginBottom: 10,
  },
});

export default TradeOffers;
