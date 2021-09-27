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

export const OverlayWrapper = styled.View`
  padding-vertical: 20px;
  border-radius: 2px;
  background-color: #ffffff;
`;
