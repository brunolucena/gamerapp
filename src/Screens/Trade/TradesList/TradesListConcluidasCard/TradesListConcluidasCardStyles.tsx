import styled from 'styled-components/native';

interface IsOpened {
  isOpened?: boolean;
}

export const ItemContainer = styled.View`
  margin-bottom: 14px;
`;
export const ItemTopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-radius: 6px;
  background-color: white;
`;
export const ItemTopLeft = styled.View``;
export const ItemTopLeftTitle = styled.Text`
  color: #0dac3d;
  font-size: 18px;
  font-weight: 700;
`;
export const ItemTopLeftName = styled.Text`
  color: #3c3c3c;
  font-size: 16px;
`;
export const ItemTopLeftCityContainer = styled.View`
  flex-direction: row;
  margin-top: 6px;
`;
export const ItemTopLeftCity = styled.Text`
  margin-right: 10px;
  color: #8d8d8d;
`;
export const ItemTopLeftCityDistance = styled.Text`
  color: #259b17
  font-size: 14px;
`;

export const ItemTopRight = styled.View`
  justify-content: space-between;
  align-items: flex-end;
`;

export const ItemTopRightDate = styled.Text`
  margin-right: 2px;
  color: #969696;
  font-size: 14px;
`;
export const ItemTopRightTextWithImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ItemTopRightTextAlert = styled.Text`
  color: #b70202;
`;
export const ItemTopRightTextSecondaryBig = styled.Text`
  margin-left: 10px;
  color: #1c60d6;
  font-size: 20px;
`;
