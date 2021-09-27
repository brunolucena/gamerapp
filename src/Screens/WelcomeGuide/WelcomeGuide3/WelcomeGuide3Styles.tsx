import styled from 'styled-components/native';

export const WelcomeGuide3SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const WelcomeGuide3ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Header = styled.View``;

export const HeaderTextContainer = styled.View`
  align-items: center;
  margin-top: 5px;
  padding: 15px;
`;

export const H1 = styled.Text`
  max-width: 200px;
  color: #0dac3d;
  font-size: 30px;
  text-align: center;
`;

export const H2 = styled.Text`
  margin-top: 10px;
  margin-bottom: 20px;
  color: #7e7e7e;
  text-align: center;
`;

export const WarningContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f0f7ff;
  border-radius: 10px;
  padding-vertical: 15px;
  padding-horizontal: 20px;
`;

export const WarningText = styled.Text`
  flex-shrink: 1;
  margin-left: 20px;
  color: #555555;
  font-size: 14px;
`;
