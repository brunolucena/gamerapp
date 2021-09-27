import {TextStyle} from 'react-native';
import styled from 'styled-components/native';

export const ChatWrapper = styled.View`
  flex: 1;
`;

export const NameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  background-color: #ffffff;
`;

export const Name = styled.Text`
  color: #343434;
  font-size: 16px;
`;

export const ChatScrollView = styled.ScrollView`
  flex: 1;
  background-color: #f7f4f4;
`;

export const MessageContainer = styled.View``;

export const MyMessage = styled.View`
  align-self: flex-end;
  margin-horizontal: 20px;
  margin-vertical: 5px;
  padding: 10px;
  background-color: #e7eefd;
  color: #343434;
`;

export const OtherMessage = styled.View`
  align-self: flex-start;
  margin-horizontal: 20px;
  margin-vertical: 5px;
  padding: 10px;
  background-color: #ffffff;
  color: #343434;
`;

export const MessageText = styled.Text<TextStyle>`
  text-align: ${({textAlign}) => textAlign || 'left'};
`;

export const MessageDate = styled.Text<TextStyle>`
  font-size: 10px;
  text-align: ${({textAlign}) => textAlign || 'left'};
`;

export const InputContainer = styled.KeyboardAvoidingView`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 10px;
  padding-vertical: 5px;
  background-color: #f7f4f4;
`;

export const GamerRexContainer = styled.View`
  align-items: center;
  margin-vertical: 10px;
  margin-horizontal: 50px;
`;
export const GamerRexMessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: #fdfde8;
`;
export const GamerRexText = styled.Text`
  margin-left: 20px;
  color: #343434;
  font-size: 12px;
`;
