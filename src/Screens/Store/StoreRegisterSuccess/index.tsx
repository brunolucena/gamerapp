import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native-ui-lib';

import MyButton from 'src/Components/Button';
import {CardContainer, CardText, H1, SafeAreaView, Wrapper} from './styles';
import {LottieWrapper} from '../../WelcomeGuide/WelcomeGuide5/WelcomeGuide5Styles';
import {useSelector, useDispatch} from 'react-redux';
import {GamerAppReduxStore} from 'src/Store';
import {clearStoreRegister} from 'src/Store/Ducks/registerStore';
import {insertToastToQueue} from 'src/Store/Ducks/toastDucks';

const StoreRegisterSuccess = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {registerStore} = useSelector((state: GamerAppReduxStore) => state);

  const {experiencePoints, storeType} = registerStore;

  useEffect(() => {
    if (experiencePoints) {
      dispatch(
        insertToastToQueue({
          message: `Parabéns, você ganhou ${experiencePoints} pontos!`,
          type: 'success',
        }),
      );
    }

    return () => {
      dispatch(clearStoreRegister());
    };
  }, [dispatch]);

  function handleNavigate() {
    navigation.navigate('Store');
  }

  return (
    <SafeAreaView>
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
          <Text center margin-10 style={styles.text}>
            A sua loja foi criada e já está tudo pronto
          </Text>
        </View>

        <CardContainer>
          <CardText>
            Ah, não esqueça de por a capa e cadastrar seus itens para começar a
            vender! E claro, conte com a gente para te ajudar =)
          </CardText>
        </CardContainer>
      </Wrapper>

      <MyButton
        onPress={handleNavigate}
        label="Ver minha loja"
        type={storeType === 'GamerStore' ? 'secondary' : 'primary'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lottie: {
    height: 120,
  },
  text: {
    maxWidth: 200,
    color: '#7e7e7e',
    lineHeight: 18,
  },
});

export default StoreRegisterSuccess;
