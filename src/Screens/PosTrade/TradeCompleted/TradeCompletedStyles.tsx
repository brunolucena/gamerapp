import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

export const TradeCompletedSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
`;

export const TradeCompletedWrapper = styled.ScrollView`
  flex: 1;
`;

export const H1 = styled.Text`
  color: ${MyColors.secondary};
  font-size: 30px;
  text-align: center;
`;

export const H2 = styled.Text`
  color: #7e7e7e;
  font-size: 16px;
  text-align: center;
`;

export const PointsContainer = styled.View`
  margin: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: #f0f7ff;
`;

export const PointsText = styled.Text`
  color: #383838;
  text-align: center;
`;

export const CompletedContent = styled.View`
  align-items: center;
  padding: 10px;
`;

export const CompletedText = styled.Text`
  color: #333333;
  font-size: 16px;
`;

export const CompletedGamerName = styled.Text`
  color: ${MyColors.primary};
  font-size: 18px;
`;

export const StarsContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;
