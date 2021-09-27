import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

export const Confirm = styled.View`
  padding-horizontal: 20px;
  padding-vertical: 20px;
  border-radius: 2px;
  background-color: #ffffff;
`;

export const ConfirmText = styled.Text`
  margin-horizontal: 15px;
  color: ${MyColors.warn};
  font-size: 20px;
  text-align: center;
`;

export const ConfirmTrade = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-vertical: 25px;
`;

export const ConfirmTradeText = styled.Text`
  font-size: 20px;
  text-align: center;
`;

export const Bottom = styled.View`
  align-items: center;
`;
