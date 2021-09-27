import styled from 'styled-components/native';

export const ItemLeft = styled.View``;
export const ItemLeftName = styled.Text`
  color: #3c3c3c;
  font-size: 18px;
`;
export const ItemPrice = styled.Text`
  color: #000000;
  font-size: 16px;
  font-weight: 600;
`;
export const ItemPlatformName = styled.Text`
  margin-top: 2px;
  font-size: 14px;
  color: #969696;
`;
export const ItemLeftCityContainer = styled.View`
  flex-direction: row;
  margin-top: 2px;
`;
export const ItemLeftCity = styled.Text`
  margin-right: 10px;
  color: #8d8d8d;
`;
export const ItemLeftCityDistance = styled.Text`
  border-radius: 3px;
  background-color: #f5f5f5;
  padding-vertical: 2px;
  padding-horizontal: 5px;
  color: #259b17
  font-size: 12px;
`;

export const ItemRight = styled.View`
  flex-direction: row;
  max-width: 140px;
  justify-content: space-between;
  align-items: center;
`;

export const ItemLeftStars = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
`;

export const ItemRightText = styled.Text`
  margin-left: 10px;
  color: #464646;
  font-size: 13px;
`;
