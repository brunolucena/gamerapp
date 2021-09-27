import React from 'react';
import {Text, View, Image} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import MyListItem from 'src/Components/MyListItem';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';
import {useSelector} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';

function PaymentMethods() {
  const navigation = useNavigation();

  const {cart} = useSelector((state: GamerAppReduxStore) => state);

  const {paymentMethod} = cart;

  function renderHeader() {
    return (
      <View paddingV-10 paddingH-20>
        <Text text50 dark-10>
          Formas de Pagamento
        </Text>

        <Text text70 dark30 marginT-5>
          Adicione ou troque a sua forma de pagamento padrão
        </Text>
      </View>
    );
  }

  function renderMethods() {
    function renderPayPalImage() {
      return (
        <Image
          source={require('../../../Assets/images/paypal.png')}
          style={styles.paypal}
        />
      );
    }

    function renderEmptyPaypal() {
      function renderEmptyPayPalText() {
        return (
          <View row centerV>
            <Text style={styles.title} marginR-10>
              Pagar com
            </Text>

            {renderPayPalImage()}
          </View>
        );
      }

      return (
        <MyListItem
          rightIcon={<Icon name="plus" color={MyColors.secondary} size={30} />}
          containerStyle={styles.itemContainer}
          title={renderEmptyPayPalText()}
        />
      );
    }

    function renderPayPal() {
      const selected = paymentMethod === 'paypal';

      function renderLeftElement() {
        return (
          <View row spread centerV marginR-10 paddingV-10>
            <View>
              {renderPayPalImage()}
              {/* <Text dark30>rafxxxx@gxxx.br</Text> */}
            </View>

            {selected && (
              <View>
                <Text color={MyColors.secondary}>Padrão</Text>
              </View>
            )}
          </View>
        );
      }

      return (
        <MyListItem
          containerStyle={styles.itemContainer}
          hideArrow
          leftElement={renderLeftElement()}
          // rightIcon={
          //   <MaterialIcon name="dots-vertical" color="#505050" size={30} />
          // }
          title=""
        />
      );
    }

    function renderCartao() {
      const selected = paymentMethod !== 'paypal';

      function renderLeftElement() {
        return (
          <View row spread centerV marginR-10 paddingV-10>
            <View>
              <Text dark10>Cartão de Crédito</Text>
              <Text dark30 marginT-1>
                VISA XXXX-XXXX-XX1921
              </Text>
            </View>

            {selected && (
              <View>
                <Text color={MyColors.secondary}>Padrão</Text>
              </View>
            )}
          </View>
        );
      }
      return (
        <MyListItem
          leftElement={renderLeftElement()}
          rightIcon={
            <MaterialIcon name="dots-vertical" color="#505050" size={30} />
          }
          containerStyle={styles.itemContainer}
          title=""
        />
      );
    }

    function renderEmptyCartao() {
      return (
        <MyListItem
          rightIcon={<Icon name="plus" color={MyColors.secondary} size={30} />}
          containerStyle={styles.itemContainer}
          title="Cartão de crédito"
          titleStyle={styles.title}
        />
      );
    }

    const hasPayPal = true;
    // const hasCartao = true;

    return (
      <View marginT-20>
        {/* {hasCartao ? renderCartao() : renderEmptyCartao()} */}
        {hasPayPal ? renderPayPal() : renderEmptyPaypal()}
      </View>
    );
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <View>
      {renderHeader()}
      {renderMethods()}

      <View>
        <MyButton
          clear
          label="Voltar para o carrinho"
          type="secondary"
          onPress={handleBack}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    maxWidth: 200,
  },
  itemContainer: {
    marginBottom: 1,
    paddingLeft: 15,
    paddingVertical: 5,
  },
  paypal: {
    height: 22,
    width: 85,
  },
  title: {
    color: '#3f3f3f',
    fontSize: 16,
  },
});

export default PaymentMethods;
