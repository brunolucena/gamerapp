import styled from 'styled-components/native';

export const WelcomeGuide2SafeAreaView = styled.SafeAreaView`
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
  padding-vertical: 15px;
  padding-horizontal: 20px;
  max-width: 100%;
  background-color: #f0f7ff;
  border-radius: 10px;
`;

export const WarningText = styled.Text`
  flex-shrink: 1;
  margin-left: 20px;
  color: #555555;
  font-size: 14px;
`;

export const ListContainer = styled.View`
  align-items: center;
  min-height: 500px;
`;

export const LoadingMore = styled.View`
  margin-top: 50px;
  margin-bottom: 180px;
`;

export const CardText = styled.Text`
  color: #9b9898;
  font-size: 14px;
`;

export const ButtonCount = styled.Text`
  margin-right: 20px;
  color: #ffffff;
  font-size: 16px;
`;

export const ModalItem = styled.View`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-color: #cccccc;
  border-bottom-width: 1px;
`;

export const ModalWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ModalContent = styled.View`
  margin-left: 26px;
`;

export const ModalHeader = styled.View``;

export const ModalHeaderTitle = styled.Text`
  font-size: 18px;
  text-align: center;
`;

export const ModalHeaderText = styled.Text`
  margin-top: 5px;
  margin-bottom: 20px;
  text-align: center;
`;
