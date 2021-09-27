import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import MyButton from 'src/Components/Button';
import {Image} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';

import {clearPending} from 'src/Store/Ducks/tradeDetails';

import {
  Container,
  Content,
  ContentText,
  Top,
  TopRight,
  TopText,
  Wrapper,
} from './ModalUhuuStyles';

interface Props {
  opened: boolean;
  pending: '' | 'tudo' | 'entregar' | 'receber' | 'nada' | 'otherPart';
}

const ModalUhuu = (props: Props) => {
  const {opened, pending} = props;

  const dispatch = useDispatch();

  useEffect(() => {
    return handleClose;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    dispatch(clearPending());
  }, [dispatch]);

  function renderPendingEntregar() {
    return (
      <Wrapper>
        <Top>
          <Image
            source={require('../../../../Assets/images/trade/checked.png')}
            style={styles.image}
          />

          <TopRight>
            <TopText>Uhuu!</TopText>

            <TopText>Produto recebido!</TopText>
          </TopRight>
        </Top>

        <Content>
          <ContentText>
            Agora, confirme que você entregou a sua parte da troca
          </ContentText>

          <MyButton onPress={handleClose} label="Ok" type="secondary" />
        </Content>
      </Wrapper>
    );
  }

  function renderPendingReceber() {
    return (
      <Wrapper>
        <Top>
          <Image
            source={require('../../../../Assets/images/trade/checked.png')}
            style={styles.image}
          />

          <TopRight>
            <TopText>Uhuu!</TopText>

            <TopText>Produto entregue!</TopText>
          </TopRight>
        </Top>

        <Content>
          <ContentText>
            Agora, confirme que você recebeu a troca do outro gamer
          </ContentText>

          <MyButton onPress={handleClose} label="Ok" type="secondary" />
        </Content>
      </Wrapper>
    );
  }

  function renderPendingOtherPart() {
    return (
      <Wrapper>
        <Top>
          <Image
            source={require('../../../../Assets/images/trade/checked.png')}
            style={styles.image}
          />

          <TopRight>
            <TopText>Uhuu!</TopText>

            <TopText>Tudo certo!</TopText>
          </TopRight>
        </Top>

        <Content>
          <ContentText>
            Agora, aguarde o outro gamer confirmar a entrega e recebimento
          </ContentText>

          <MyButton label="Ok" onPress={handleClose} type="secondary" />
        </Content>
      </Wrapper>
    );
  }

  function renderContent() {
    switch (pending) {
      case 'entregar':
        return renderPendingEntregar();

      case 'receber':
        return renderPendingReceber();

      case 'otherPart':
        return renderPendingOtherPart();

      default:
        return <View />;
    }
  }

  return (
    <Modal
      backdropOpacity={0.4}
      isVisible={opened}
      onBackdropPress={handleClose}>
      <Container>{renderContent()}</Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {width: 50, height: 50},
});

export default ModalUhuu;
