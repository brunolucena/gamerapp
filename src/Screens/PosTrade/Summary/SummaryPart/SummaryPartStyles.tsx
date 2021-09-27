import styled from 'styled-components/native';

import {Background} from '../../../../Models/CSS';

export const SummaryPartContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-vertical: 5px;
  min-height: 150px;
  background-color: #ffffff;
`;

export const SummaryPartLeftWrapper = styled.View`
  flex: 2;
  background-color: #ffffff;
`;

export const SummaryPartLeft = styled.View``;

export const SummaryPartEmpty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  padding: 10px;
`;

export const EmptyListText = styled.Text`
  max-width: 120px;
  margin-top: 10px;
  color: #a3a3a3;
  font-size: 14px;
  text-align: center;
`;

export const LeftItems = styled.View`
  flex-direction: row;
  align-items: center;
  min-height: 100px;
  padding-horizontal: 10px;
  margin-bottom: 10px;
`;

export const LeftAction = styled.View`
  align-items: center;
`;

export const SummaryPartRight = styled.View`
  flex: 1;
`;

export const RightTopContainer = styled.View<Background>`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: ${({backgroundColor}) => backgroundColor || '#ffffff'};
`;

export const RightTopText = styled.Text`
  margin-left: 8px;
  color: #ffffff;
  font-size: 17px;
`;

export const RightBottomContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-left-width: 2px;
  border-color: #f7f4f4;
`;

export const RightBottomWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const RightBottomText = styled.Text`
  margin-left: 5px;
  color: #222222;
  font-size: 18px;
`;
