import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

interface ItemValueCss {
  primary?: boolean;
}

export const GamerRankSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const GamerRankScrollView = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  align-self: center;
  align-items: center;
  padding-horizontal: 20px;
  padding-bottom: 20px;
`;
export const HeaderTop = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const HeaderTopRank = styled.Text`
  margin-left: 20px;
  color: ${MyColors.secondary};
  font-size: 40px;
`;
export const HeaderTopText = styled.Text`
  margin-top: 2px;
  color: #767676;
`;

export const Card = styled.View`
  margin-vertical: 5px;
  margin-horizontal: 15px;
  border-width: 1px;
  border-color: #e5e5e5;
  border-radius: 6px;
`;

export const CardGamer = styled.View`
  margin-vertical: 20px;
  margin-horizontal: 15px;
`;
export const CardGamerTop = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const CardGamerStarsContainer = styled.View``;
export const CardGamerInfo = styled.View`
  margin-left: 15px;
`;
export const CardGamerName = styled.Text`
  color: #2b2b2b;
  font-size: 20px;
`;
export const CardGamerRank = styled.Text`
  color: #767676;
  font-size: 15px;
`;
export const CardGamerBottom = styled.View``;
export const CardGamerXpBarContainer = styled.View`
  margin-top: 20px;
`;
export const CardGamerXpInfoContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  margin-horizontal: 10px;
`;
export const CardGamerXpItem = styled.View`
  align-items: flex-end;
`;
export const CardGamerXp = styled.Text`
  color: #3e3e3e;
  font-size: 16px;
`;
export const CardGamerXpTotalXp = styled.Text`
  color: #3e3e3e;
  font-size: 16px;
  text-align: right;
`;
export const CardGamerXpNextRank = styled.Text`
  flex-shrink: 1;
  color: ${MyColors.primary};
  font-size: 15px;
  text-align: center;
`;

export const CardInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 10px;
  margin-horizontal: 15px;
`;
export const CardInfoItem = styled.View`
  align-items: center;
  margin-horizontal: 10px;
`;
export const CardInfoItemValue = styled.Text<ItemValueCss>`
  color: ${({primary}) => (primary ? MyColors.secondary : '#3e3e3e')};
  font-size: 30px;
  font-weight: 600;
`;
export const CardInfoItemLabel = styled.Text`
  color: #767676;
`;

export const CardInfoText = styled.Text`
  color: #2b2b2b;
  font-size: 18px;
`;
export const CardInfoDistance = styled.Text`
  color: ${MyColors.secondary};
  font-size: 18px;
`;

export const Bottom = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-vertical: 20px;
`;
