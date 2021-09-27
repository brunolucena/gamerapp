import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {DeliveryTypeId} from 'src/Models/Seller';

import {GamerAppReduxStore} from 'src/Store';
import {saveSellerAddProduct} from 'src/Store/Ducks/sellerAddProduct';

import {MyColors} from 'src/Theme/FoundationConfig';
import MyButton from 'src/Components/Button';
import ProductCard from '../ProductCard';

const SellProductDelivery = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {deliverType} = useSelector(
    (state: GamerAppReduxStore) => state.sellerAddProduct,
  );

  function handleNext() {
    navigation.navigate('SellProductStock');
  }

  function handleTogglePessoalmente() {
    let newDeliverType: DeliveryTypeId = 1;

    if (deliverType === 0) {
      newDeliverType = 1;
    } else if (deliverType === 1) {
      newDeliverType = 0;
    } else if (deliverType === 2) {
      newDeliverType = 3;
    } else if (deliverType === 3) {
      newDeliverType = 2;
    }

    dispatch(
      saveSellerAddProduct({
        deliverType: newDeliverType,
      }),
    );
  }

  function handleToggleCorreios() {
    let newDeliverType: DeliveryTypeId = 1;

    if (deliverType === 0) {
      newDeliverType = 2;
    } else if (deliverType === 1) {
      newDeliverType = 3;
    } else if (deliverType === 2) {
      newDeliverType = 0;
    } else if (deliverType === 3) {
      newDeliverType = 1;
    }

    dispatch(
      saveSellerAddProduct({
        deliverType: newDeliverType,
      }),
    );
  }

  function renderCorreios() {
    const isCorreiosSelected = deliverType === 2 || deliverType === 3;

    return (
      <TouchableOpacity
        style={[styles.card, isCorreiosSelected && styles.cardSelected]}
        onPress={handleToggleCorreios}>
        <View>
          <View row spread>
            <View>
              {isCorreiosSelected ? (
                <Ionicon name="md-checkmark" size={20} color="#ffffff" />
              ) : (
                <View style={styles.square} />
              )}
            </View>

            <View centerV>
              {isCorreiosSelected ? (
                <Image
                  source={require('../../../Assets/images/truck.png')}
                  style={styles.truck}
                />
              ) : (
                <Image
                  source={require('../../../Assets/images/delivery-truck.png')}
                  style={styles.truck}
                />
              )}
            </View>

            <View style={styles.squareEmpty} />
          </View>

          <View centerH marginT-6>
            <Text
              text70
              style={[styles.text, isCorreiosSelected && styles.textSelected]}>
              Correios
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function renderPessoalmente() {
    const isPessoalmenteSelected = deliverType === 1 || deliverType === 3;

    return (
      <TouchableOpacity
        style={[styles.card, isPessoalmenteSelected && styles.cardSelected]}
        onPress={handleTogglePessoalmente}>
        <View>
          <View row spread>
            <View>
              {isPessoalmenteSelected ? (
                <Ionicon name="md-checkmark" size={20} color="#ffffff" />
              ) : (
                <View style={styles.square} />
              )}
            </View>

            <View centerV>
              <Ionicon
                name="md-person"
                size={40}
                color={isPessoalmenteSelected ? '#ffffff' : MyColors.secondary}
              />
            </View>

            <View style={styles.squareEmpty} />
          </View>

          <View centerH marginT-6>
            <Text
              text70
              style={[
                styles.text,
                isPessoalmenteSelected && styles.textSelected,
              ]}>
              Pessoalmente
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProductCard hasOfferPrice hasPrice />

        <View paddingT-40 paddingB-45 paddingH-20>
          <Text dark20 text60>
            Escolha como será a entrega
          </Text>

          <View marginT-30 row centerV spread>
            {renderPessoalmente()}
            {renderCorreios()}
          </View>
        </View>

        <View row centerV paddingH-20 marginB-15>
          <Image
            source={require('../../../Assets/images/clipboard.png')}
            style={styles.clipboard}
          />

          <View paddingR-40>
            <Text text80 dark20 marginL-5>
              O processo de logística usando Correios é automatizado. O
              pagamento é feito antecipado pelo comprador do produto.
            </Text>
          </View>
        </View>

        <MyButton
          disabled={deliverType === 0}
          label="Próximo"
          onPress={handleNext}
          type="secondary"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: 300,
    marginHorizontal: 8,
    padding: 15,
    borderColor: '#cecece',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#ffffff',
    height: '100%',
  },
  cardSelected: {
    backgroundColor: MyColors.secondary,
    borderColor: MyColors.secondary,
  },
  clipboard: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  container: {
    borderTopWidth: 1,
    borderColor: '#f2f2f2',
  },
  square: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: MyColors.secondary,
  },
  squareEmpty: {
    height: 15,
    width: 15,
  },
  text: {
    color: '#292929',
  },
  textSelected: {
    color: '#ffffff',
  },
  truck: {
    height: 40,
    width: 65,
    resizeMode: 'contain',
  },
});

export default SellProductDelivery;
