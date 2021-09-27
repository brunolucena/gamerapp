import styled from 'styled-components/native';

export const SummarySafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
`;

export const SummaryContainer = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: #f7f4f4;
`;

export const SummaryContent = styled.ScrollView`
  margin-top: 20px;
`;

export const Divisor = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 8px;
`;

export const DivisorText = styled.Text`
  margin-horizontal: 12px;
  color: #3b3b3b;
  font-size: 17px;
`;

export const SummaryBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 15px;
  margin-bottom: 10px;
`;

export const Confirm = styled.View`
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  background-color: #ffffff;
`;

export const ConfirmText = styled.Text`
  margin-horizontal: 15px;
  max-width: 180px;
  color: #333333;
  font-size: 20px;
  text-align: center;
`;

export const ConfirmTrade = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-vertical: 25px;
`;

export const ConfirmTradeText = styled.Text`
  margin-horizontal: 5px;
  font-size: 20px;
`;

export const FullWidth = styled.View``;
