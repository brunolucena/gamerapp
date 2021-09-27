import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';
import {clearSellerAddProduct} from 'src/Store/Ducks/sellerAddProduct';

const SellProductSuccess = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(clearSellerAddProduct());
  }, [dispatch]);

  function handleNext() {
    navigation.navigate('Store', {screen: 'MySellerStore'});
  }

  return (
    <View centerH centerV flex>
      <View>
        <View centerH marginB-40>
          <LottieView
            autoPlay
            loop={false}
            source={require('../../../Assets/Animations/check.json')}
            style={styles.check}
          />

          <Text style={styles.textPrimary}>Sucesso!</Text>

          <Text style={styles.text}>
            O seu anúncio estará ativo em pouco tempo!
          </Text>
        </View>

        <MyButton
          label="Ok, ir para a loja =)"
          onPress={handleNext}
          type="secondary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  check: {
    height: 120,
  },
  text: {
    marginTop: 5,
    maxWidth: 230,
    color: '#646464',
    fontSize: 16,
    textAlign: 'center',
  },
  textPrimary: {
    color: MyColors.primary,
    fontSize: 30,
    textAlign: 'center',
  },
});

export default SellProductSuccess;
