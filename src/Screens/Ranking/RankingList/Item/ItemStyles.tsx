import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

interface RankingListItem {
  isMe: boolean;
}

export const ItemContainer = styled.View<RankingListItem>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 8px;
  padding-horizontal: 20px;
  border-color: #eaeaea;
  border-top-width: ${({isMe}) => (isMe ? '0px' : '1px')};
  background-color: ${({isMe}) => (isMe ? MyColors.secondary : '#ffffff')};
`;

export const Position = styled.Text<RankingListItem>`
  color: ${({isMe}) => (isMe ? '#ffffff' : MyColors.secondary)}
  font-size: 22px;
`;

export const NameContainer = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const Name = styled.Text<RankingListItem>`
  color: ${({isMe}) => (isMe ? '#ffffff' : '#2b2b2b')};
  font-size: 19px;
`;

export const Rank = styled.Text<RankingListItem>`
color: ${({isMe}) => (isMe ? '#ffffff' : '#767676')}
  font-size: 15px;
`;

export const XpContainer = styled.View`
  align-items: center;
`;

export const Xp = styled.Text<RankingListItem>`
color: ${({isMe}) => (isMe ? '#ffffff' : '#3bae00')}
  font-size: 15px;
`;

export const XpTextContainer = styled.View<RankingListItem>`
  align-items: center;
  margin-top: 2px;
  padding-vertical: 1px;
  padding-horizontal: 10px;
  background-color: ${({isMe}) => (isMe ? '#000000' : '#47af00')};
`;

export const XpText = styled.Text`
  color: #ffffff;
  font-size: 14px;
`;
