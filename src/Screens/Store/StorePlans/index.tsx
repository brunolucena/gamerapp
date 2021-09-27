import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import StorePlanCard from './StorePlanCard';
import {MyColors} from 'src/Theme/FoundationConfig';

const {width} = Dimensions.get('window');

const cardWidth = width / 2 - 20;

function StorePlans() {
  const navigation = useNavigation();

  function handlePressGamerStore() {
    navigation.navigate('StoreRegister', {screen: 'PlanGamerStore'});
  }

  function handlePressProStore() {
    // navigation.navigate('StoreRegister', {screen: 'PlanProStore'});
    console.log('PlanProStore');
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View paddingH-10>
          <View yellow40 centerH>
            <Image
              source={require('../../../Assets/images/login/login-controls.png')}
            />
          </View>

          <View marginT-10 marginH-10>
            <Text style={styles.header}>Crie sua loja hoje</Text>

            <Text style={styles.header}>e comece a vender!</Text>
          </View>

          <View flex row centerH marginT-20>
            <StorePlanCard
              color={MyColors.secondary}
              header1="Gamer"
              header2="Store"
              image={require('../../../Assets/images/tag.png')}
              onPress={handlePressGamerStore}
              subHeader="Grátis para todos"
              text="Tenha uma loja pra chamar de sua! 100% grátis, personalizada e pronta para vender jogos, consoles e mais."
              width={cardWidth}
            />

            <View marginH-10 />

            <StorePlanCard
              color={MyColors.primary}
              header1="Pro"
              header2="Store"
              image={require('../../../Assets/images/hand-graph.png')}
              onPress={handlePressProStore}
              subHeader={`(Em Breve)`}
              text="Seja Pro e tenha vantagens exclusivas: insights do público, criar anúncios, cupons, link de afiliado, cashback e mais."
              width={cardWidth}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    color: '#292929',
    fontSize: 24,
  },
});

export default StorePlans;
