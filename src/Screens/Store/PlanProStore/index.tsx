import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';
import {setStoreType} from 'src/Store/Ducks/registerStore';

interface Props {}

const PlanProStore: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handlePress() {
    dispatch(setStoreType('ProStore'));
    navigation.navigate('StoreRegister', {screen: 'StoreRegisterName'});
  }

  function renderItem(text: string) {
    return (
      <View row centerV marginV-5>
        <View style={styles.circle} />

        <Text dark20 text90 marginL-4>
          {text}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View paddingV-20>
        <View marginH-20>
          <Text style={styles.header}>Ótima escolha! Crie sua</Text>

          <Text style={styles.header}>Loja Grátis em segundos.</Text>
        </View>

        <Text dark40 marginT-10 marginH-20>
          E a qualquer momento você pode fazer um upgrade para a Pro Store,
          acessando vantagens exclusivas.
        </Text>

        <View
          style={styles.card}
          marginT-30
          marginH-20
          padding-15
          row
          spread
          centerV>
          <View flex spread>
            <View row centerV>
              <Image
                source={require('../../../Assets/images/hand-graph.png')}
                style={styles.image}
              />

              <View marginL-5>
                <Text style={styles.header2}>Pro</Text>

                <Text style={styles.header2}>Store</Text>
              </View>
            </View>

            <Text dark40 marginT-5 text90>
              Para loja física ou vendedor profissional, o melhor canal de
              vendas gamer chegou!
            </Text>
          </View>

          <View flex right marginL-15>
            <View>
              {renderItem('Pagamentos e Correios')}
              {renderItem('Cupons/Cashback')}
              {renderItem('Insights Inteligentes')}
              {renderItem('Anúncions')}
            </View>
          </View>
        </View>

        <Text dark40 marginT-20 marginH-20>
          Venda para uma comunidade altamente qualificada, a sua loja no maior
          marketplace gamer do Brasil.
        </Text>

        <View marginT-15 marginH-10>
          <MyButton label="Criar Pro Store" onPress={handlePress} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 6,
  },
  circle: {
    height: 8,
    width: 8,
    backgroundColor: MyColors.primary,
    borderRadius: 4,
  },
  header: {
    color: '#292929',
    fontSize: 24,
  },
  header2: {
    color: '#292929',
    fontSize: 18,
  },
  image: {
    height: 40,
    resizeMode: 'contain',
  },
});

export default PlanProStore;
