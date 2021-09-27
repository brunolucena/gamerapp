import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import {useNavigation} from '@react-navigation/native';
import MyButton from 'src/Components/Button';
import {MyColors} from 'src/Theme/FoundationConfig';

const ForgotPasswordSuccess: React.FC = () => {
  const navigation = useNavigation();

  function handlePress() {
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View />

      <View center>
        <Image
          resizeMode="contain"
          source={require('../../../Assets/images/padlock.png')}
          style={styles.image}
        />

        <Text center marginT-10 style={styles.text}>
          Pronto!
        </Text>

        <Text center dark30>
          Verifique o seu e-mail para instruções {'\n'} de como redefinir sua
          senha.
        </Text>
      </View>

      <View>
        <MyButton label="Ok" onPress={handlePress} type="secondary" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
  },
  image: {
    height: 150,
    marginRight: 15,
  },
  text: {
    color: MyColors.primary,
    fontSize: 35,
  },
});

export default ForgotPasswordSuccess;
