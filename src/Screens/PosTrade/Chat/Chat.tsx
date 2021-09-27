import React, {useEffect, useRef, useState, useCallback} from 'react';
import {Image} from 'react-native-ui-lib';
import {StyleSheet, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

const paper = require('../../../Assets/images/paper.png');

import {ChatMessage} from '../../../Models/Chat';
import {
  getConversation,
  sendMessage,
  setChatRefreshing,
} from 'src/Store/Ducks/chat';
import {selectPosTradePart} from 'src/Store/Ducks/tradeDetails';

import formatDateTime from '../../../Helpers/formatDateTime';

import CustomActivityIndicator from '../../../Components/CustomActivityIndicator';
import {getRandomGamerRexPhrase} from './GamerRex/phrases';

import {
  ChatScrollView,
  ChatWrapper,
  GamerRexContainer,
  GamerRexMessageContainer,
  GamerRexText,
  InputContainer,
  MessageContainer,
  MessageDate,
  MessageText,
  MyMessage,
  Name,
  NameContainer,
  OtherMessage,
} from './ChatStyles';
import MyButton from 'src/Components/Button';
import {GamerAppReduxStore} from 'src/Store';
import MyTextField from 'src/Components/TextField';

interface Props {}

const PosTradeChat = () => {
  const [gamerRexPhrase, setGamerRexPhrase] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  const dispatch = useDispatch();

  const {chat, tradeDetails, user: userRedux} = useSelector(
    (state: GamerAppReduxStore) => state,
  );

  const {loading, messages, refreshing} = chat;
  const {activeTradeId} = tradeDetails;
  const {gamerId} = userRedux.user;

  const otherGamer = selectPosTradePart({
    state: tradeDetails,
    gamerId,
    part: 'other',
  });

  useEffect(() => {
    dispatch(
      getConversation({
        tradeId: activeTradeId,
      }),
    );

    setGamerRexPhrase(getRandomGamerRexPhrase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTradeId]);

  useEffect(() => {
    if (messages.length > 0) {
      adjustScroll();
    }
  }, [messages]);

  const onRefresh = useCallback(() => {
    dispatch(setChatRefreshing(true));

    dispatch(
      getConversation(
        {
          tradeId: activeTradeId,
        },
        false,
      ),
    );

    setGamerRexPhrase(getRandomGamerRexPhrase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTradeId]);

  function adjustScroll() {
    if (scrollViewRef.current) {
      // @ts-ignore
      scrollViewRef.current.scrollToEnd();
    }
  }

  function _keyExtractor(item: ChatMessage, index: number) {
    return `${item.date} - ${index}`;
  }

  function _renderItem({item}: {item: ChatMessage}) {
    return item.gamerId === gamerId
      ? renderMyMessage(item)
      : renderOtherMessage(item);
  }

  function _renderGamerRexAlert() {
    return (
      <GamerRexContainer>
        <GamerRexMessageContainer>
          <Image
            source={require('../../../Assets/images/gamer_rex.png')}
            style={styles.gamerRex}
          />

          <GamerRexText>{gamerRexPhrase}</GamerRexText>
        </GamerRexMessageContainer>
      </GamerRexContainer>
    );
  }

  function renderMyMessage({date, message}: ChatMessage) {
    return (
      <MessageContainer>
        <MyMessage>
          <MessageText textAlign="right">{message}</MessageText>

          <MessageDate textAlign="right">{formatDateTime(date)}</MessageDate>
        </MyMessage>
      </MessageContainer>
    );
  }

  function renderOtherMessage({date, message}: ChatMessage) {
    return (
      <MessageContainer>
        <OtherMessage>
          <MessageText>{message}</MessageText>

          <MessageDate>{formatDateTime(date)}</MessageDate>
        </OtherMessage>
      </MessageContainer>
    );
  }

  function handleSend() {
    if (inputMessage.length > 0) {
      // @ts-ignore
      // inputRef.current.blur();

      dispatch(
        sendMessage({
          gamerId,
          message: inputMessage,
          tradeId: activeTradeId,
        }),
      );

      setInputMessage('');
    }

    setGamerRexPhrase(getRandomGamerRexPhrase());
  }

  return (
    <ChatWrapper>
      <NameContainer>
        <Name>{otherGamer.gamerName}</Name>
      </NameContainer>
      <ChatScrollView
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          ListFooterComponent={_renderGamerRexAlert}
          data={messages}
          keyExtractor={_keyExtractor}
          renderItem={_renderItem}
        />
      </ChatScrollView>

      <InputContainer>
        <MyTextField
          containerStyle={styles.inputContainer}
          style={styles.input}
          handleChangeText={setInputMessage}
          ref={inputRef}
          title=""
          placeholder=""
          returnKeyType="send"
          value={inputMessage}
          hideUnderline
        />

        <MyButton
          iconSource={paper}
          iconStyle={styles.icon}
          onPress={handleSend}
          round
          label=""
          style={styles.buttonIcon}
        />
      </InputContainer>

      <CustomActivityIndicator isVisible={loading} />
    </ChatWrapper>
  );
};

const styles = StyleSheet.create({
  gamerRex: {height: 40, width: 40},
  icon: {
    height: 15,
    width: 15,
  },
  button: {
    borderRadius: 15,
  },
  buttonIcon: {
    borderRadius: 18,
    height: 36,
    width: 36,
  },
  input: {
    top: 8,
    left: 14,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    height: 40,
    paddingRight: 27,
    borderRadius: 20,
    backgroundColor: '#ffffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
});

export default PosTradeChat;
