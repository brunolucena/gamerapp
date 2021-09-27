import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

export const SentSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
`;

export const LottieWrapper = styled.View`
  align-items: center;
  margin-top: 20px;
`;

export const SentText = styled.Text`
  color: #4e4e4e;
  font-size: 16px;
  text-align: center;
`;

export const SentTextBig = styled.Text`
  margin-bottom: 5px;
  color: ${MyColors.primary};
  font-size: 40px;
  text-align: center;
`;

export const SentTop = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-vertical: 10px;
  margin-horizontal: 5px;
`;

export const SentBottom = styled.View`
  justify-content: flex-end;
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

export const Divisor = styled.View`
  margin: 5px;
`;
