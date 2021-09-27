import styled from 'styled-components/native';
import {TextCss} from '../../Models/StyledComponents';

export const HomeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #efefef;
`;

export const HomeContainerTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 24px;
  margin-vertical: 20px;
`;

export const SearchBarContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
  margin-horizontal: 10px;
`;

export const HomeH1 = styled.Text`
  margin-top: 12px;
  margin-bottom: 9px;
  font-size: 17px;
  font-family: Montserrat-Regular;
  color: #292929;
`;

export const CardText = styled.Text<TextCss>`
  color: ${({color}) => (color ? color : '#1563ce')};
  font-size: ${({fontSize}) => (fontSize ? fontSize : '12px')};
  text-align: center;
`;

export const CardNumber = styled.Text`
  color: #434343;
  font-size: 22px;
  text-align: center;
`;

export const HomeBottom = styled.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 28px;
`;

export const Disclaimer = styled.Text`
  color: #8d8d8d;
  font-size: 12px;
`;
