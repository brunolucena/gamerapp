import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: space-between;
  background-color: #ffffff;
`;

export const Wrapper = styled.ScrollView`
  flex: 1;
`;

export const H1 = styled.Text`
  color: ${MyColors.primary};
  font-size: 30px;
  text-align: center;
`;

export const CardContainer = styled.View`
  margin: 20px;
  padding: 15px;
  border-radius: 10px;
  background-color: #f0f7ff;
`;

export const CardText = styled.Text`
  color: #383838;
  text-align: center;
`;
