import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';

import MyButton from 'src/Components/Button';
import {CardContainer, CardText, H1, SafeAreaView, Wrapper} from './styles';
import {LottieWrapper} from '../../WelcomeGuide/WelcomeGuide5/WelcomeGuide5Styles';
import {MyColors} from 'src/Theme/FoundationConfig';
import {clearPaypal} from 'src/Store/Ducks/paypalDuck';
import {clearCart} from 'src/Store/Ducks/cartDuck';
import {GamerAppReduxStore} from 'src/Store';

const OrderRequestSuccess = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {cart} = useSelector((state: GamerAppReduxStore) => state);

  const {myOrderAddNewResponse} = cart;

  useEffect(() => {
    return () => {
      dispatch(clearCart());
      dispatch(clearPaypal());
    };
  }, [dispatch]);

  function handleNavigate() {
    navigation.navigate('Home');
  }

  function handleNavigateMinhasCompras() {
    navigation.goBack();
    navigation.navigate('MyOrders');
  }

  return (
    <SafeAreaView>
      {myOrderAddNewResponse.viewId ? (
        <Wrapper>
          <LottieWrapper>
            <LottieView
              source={require('../../../Assets/Animations/check.json')}
              autoPlay
              loop={false}
              style={styles.lottie}
            />
          </LottieWrapper>

          <H1>Sucesso!</H1>

          <View centerH>
            <TouchableOpacity onPress={handleNavigateMinhasCompras}>
              <Text dark20 center margin-10 style={styles.text}>
                O seu pedido foi efetuado com sucesso, acompanhe a entrega no
                menu <Text color={MyColors.secondary}>MinhasCompras</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <CardContainer>
            <CardText>Identificador do pedido</CardText>
            <CardText>#{myOrderAddNewResponse.viewId}</CardText>
          </CardContainer>
        </Wrapper>
      ) : (
        <View flex centerH centerV paddingV-50 paddingH-20>
          <Text dark30 center marginV-5>
            Houve um problema ao processar seu pedido.
          </Text>

          <Text dark30 center marginV-5>
            Nossa equipe já recebeu essas informações e irá verificar o que pode
            ter acontecido. Assim que for resolvido, você receberá o número de
            confirmação do pedido e sua compra aparecerá no menu MinhasCompras.
          </Text>

          <Text dark30 center marginV-5>
            Caso o pagamento já tenha sido processado, não se preocupe, sua
            compra foi realizada com sucesso.
          </Text>

          <Text dark30 center marginV-5>
            Em caso de dúvidas, entre em contato através do email
            contato@gamerapp.com.br
          </Text>
        </View>
      )}

      <MyButton onPress={handleNavigate} label="Ok" type="secondary" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: 120,
  },
  text: {
    maxWidth: 200,
    lineHeight: 18,
  },
});

export default OrderRequestSuccess;
