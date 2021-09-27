import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

export const HomeWarningContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  margin-horizontal: 20px;
  margin-top: 30px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  background-color: ${MyColors.secondary};
`;

export const HomeWarningFiller = styled.View``;

export const HomeWarningText = styled.Text`
  margin-right: 5px;
  color: #ffffff;
  font-size: 15px;
  text-align: center;
`;
