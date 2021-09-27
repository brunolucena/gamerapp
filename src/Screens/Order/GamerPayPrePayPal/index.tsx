import React from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import CustomActivityIndicator from 'src/Components/CustomActivityIndicator';

const GamerPayPrePayPal: React.FC = () => {
  return (
    <View flex spread paddingV-80>
      <View>
        <CustomActivityIndicator type="Circle" size={60} isVisible />
      </View>

      <View centerH>
        <View>
          <View row centerV marginB-5>
            <Image
              resizeMode="contain"
              source={require('../../../Assets/images/safe-payment.png')}
              style={styles.safePayment}
            />

            <Text dark40 text70 marginL-7>
              Pagamento seguro
            </Text>
          </View>

          <Image
            resizeMode="contain"
            source={require('../../../Assets/images/gamer_pay.png')}
            style={styles.gamerPay}
          />

          <View row marginT-60>
            <Text dark40 text80 marginR-14>
              Powered by
            </Text>

            <Image source={require('../../../Assets/images/paypal.png')} />
          </View>
        </View>
      </View>

      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  gamerPay: {
    width: 280,
  },
  safePayment: {
    width: 20,
  },
});

export default GamerPayPrePayPal;
