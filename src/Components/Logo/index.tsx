import React from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native-ui-lib';

const logo = require('./assets/logo-green.png');
const logoWhite = require('./assets/logo.png');

type logoTypes = 'green' | 'white';

interface Props {
  type?: logoTypes;
}

const Logo: React.SFC<Props> = props => {
  const {type} = props;

  return (
    <Image
      source={type === 'green' ? logo : logoWhite}
      resizeMode="contain"
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
});

Logo.defaultProps = {
  type: 'white',
};

export default Logo;
