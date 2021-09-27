import React from 'react';
import {Text} from 'react-native';

interface BaseComponentProps {}

import {Container, SafeArea} from './styles';

const BaseComponent: React.SFC<BaseComponentProps> = props => {
  return (
    <SafeArea>
      <Container>
        <Text>BaseComponent</Text>
      </Container>
    </SafeArea>
  );
};

export default BaseComponent;
