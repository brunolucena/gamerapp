import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

export const LevelUpSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
`;

export const LevelUpScrollView = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View`
  align-self: center;
  align-items: center;
  padding: 20px;
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

export const TopWrapper = styled.View`
  align-items: center;
  margin-top: 35px;
  margin-bottom: 30px;
`;

export const LevelUpTextWrapper = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

export const LevelUpText = styled.Text`
  max-width: 200px;
  margin-bottom: 5px;
  color: #727272;
  font-size: 15px;
  text-align: center;
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

export const Bottom = styled.View`
  position: absolute;
  bottom: 10px;
  align-items: center;
`;
