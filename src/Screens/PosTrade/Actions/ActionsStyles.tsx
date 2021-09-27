import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

interface ItemCompleted {
  completed: boolean;
}

interface ItemTextStatus {
  status?: 'success' | 'warn';
}

export const ActionsSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const ActionsScrollView = styled.ScrollView`
  flex: 1;
  background-color: #f7f4f4;
`;

export const TitleContainer = styled.View`
  align-items: center;
  margin-horizontal: 30px;
  margin-vertical: 10px;
`;

export const Title = styled.Text`
  color: #333333;
  font-size: 15px;
  text-align: center;
`;

export const ItemsContainer = styled.View`
  margin-top: 10px;
  margin-horizontal: 10px;
`;

export const ItemsContainer2 = styled.View`
  margin-horizontal: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-horizontal: 20px;
  border-radius: 9px;
  background-color: #ffffff;
`;

export const GamerNameContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 10px;
`;

export const GamerName = styled.Text`
  margin-bottom: 5px;
  color: #333333;
  font-size: 18px;
`;

export const ItemWrapper = styled.View<ItemCompleted>`
  align-items: center;
  margin-bottom: 10px;
  padding-vertical: 10px;
  padding-horizontal: 20px;
  border-radius: 9px;
  background-color: ${({completed}) => (completed ? '#f7f4f4' : '#ffffff')};
`;

export const ItemWrapper2 = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ItemLeft = styled.View``;

export const ItemRight = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ItemRightText = styled.Text<ItemTextStatus>`
  color: ${({status}) => (status === 'warn' ? MyColors.warn : '#333333')};
  font-size: 15px;
`;

export const ItemRightSmallText = styled.Text<ItemTextStatus>`
  margin-top: 2px;
  color: ${({status}) => (status === 'warn' ? MyColors.warn : '#a7a7a7')};
  font-size: 12px;
`;

export const EmptySpace = styled.View`
  height: 220px;
`;

export const CompletedContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
`;

export const CompletedHeader = styled.View`
  padding: 15px;
  background-color: #4d4d4d;
`;

export const CompletedHeaderText = styled.Text`
  color: #ffffff;
  text-align: center;
`;

export const CompletedContent = styled.View`
  align-items: center;
  padding: 30px;
`;

export const CompletedText = styled.Text`
  color: #333333;
  font-size: 16px;
`;

export const CompletedGamerName = styled.Text`
  color: ${MyColors.primary};
  font-size: 16px;
`;

export const StarsContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

export const StarsContainer2 = styled.View``;

export const ProblemContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-horizontal: 20px;
`;
