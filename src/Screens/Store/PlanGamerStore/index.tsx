import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';
import {setStoreType} from 'src/Store/Ducks/registerStore';

interface Props {}

const PlanGamerStore: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handlePress() {
    dispatch(setStoreType('GamerStore'));
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
                source={require('../../../Assets/images/tag.png')}
                style={styles.image}
              />

              <View>
                <Text style={styles.header2}>Gamer</Text>

                <Text style={styles.header2}>Store</Text>
              </View>
            </View>

            <Text dark40 marginT-5 text90>
              Venda seus itens de forma simples, tenha a sua própria loja online
              e com a sua cara!
            </Text>
          </View>

          <View flex right marginL-15 marginR-10>
            <View>
              {renderItem('100% grátis')}
              {renderItem('Pagamentos')}
              {renderItem('Envio Correios')}
              {renderItem('Personalizável')}
            </View>
          </View>
        </View>

        <View marginT-15 marginH-10>
          <MyButton
            label="Criar Gamer Store"
            onPress={handlePress}
            type="secondary"
          />
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
    backgroundColor: MyColors.secondary,
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

export default PlanGamerStore;
