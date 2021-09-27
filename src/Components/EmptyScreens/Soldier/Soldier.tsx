import React from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native-ui-lib';

import {
  Balloon,
  ImageContainer,
  SoldierContainer,
  SoldierWrapper,
  Text,
} from './SoldierStyles';

interface Props {
  balloonColor: string;
  text: string;
  textColor: string;
}

function Soldier(props: Props) {
  const {balloonColor, text, textColor} = props;

  return (
    <SoldierContainer>
      <SoldierWrapper>
        <Balloon backgroundColor={balloonColor}>
          <Text color={textColor}>{text}</Text>
        </Balloon>

        <ImageContainer>
          <Image
            source={require('../assets/soldier.png')}
            style={styles.image}
          />
        </ImageContainer>
      </SoldierWrapper>
    </SoldierContainer>
  );
}

Soldier.defaultProps = {
  balloonColor: '#1c60d6',
  text: 'Ops, essa lista está vazia.',
  textColor: '#ffffff',
};

const styles = StyleSheet.create({
  image: {
    height: 160,
    width: 90,
  },
});

export default Soldier;
