import styled from 'styled-components/native';

import {Border} from '../../../Models/CSS';
import {MyColors} from 'src/Theme/FoundationConfig';

interface Color {
  color?: string;
}

export const ProductDetailsSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #ededed;
`;

export const ProductDetailsScrollView = styled.ScrollView`
  background-color: #ffffff;
`;

export const Header = styled.View<Border>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-style: ${({borderStyle}) => borderStyle || 'solid'};
  border-bottom-color: ${({borderColor}) => borderColor || '#000000'};
  border-bottom-width: ${({borderWidth}) => borderWidth || ' 3px'};
`;

export const Items = styled.View`
  margin-top: 12px;
  padding-horizontal: 10px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  margin-bottom: 9px;
  margin-horizontal: 5px;
  padding-horizontal: 13px;
  padding-vertical: 12px;
  border-color: #bcbcbc;
  border-width: 1px;
  border-radius: 6px;
  background-color: #ffffff;
`;
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
export const ItemPriceLineThrough = styled.Text`
  margin-left: 3px;
  color: #aeaeae;
  font-size: 13px;
  font-weight: 600;
  text-decoration-line: line-through;
`;
export const ItemPlatformName = styled.Text`
  margin-top: 2px;
  font-size: 14px;
  color: #969696;
`;
export const ItemLeftCityContainer = styled.View`
  flex-direction: row;
  margin-top: 3px;
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
  margin-bottom: 1px;
`;

export const ItemRightText = styled.Text`
  margin-left: 10px;
  color: #464646;
  font-size: 13px;
`;

export const EmptyListText = styled.Text`
  color: #464646;
  font-size: 15px;
  text-align: center;
`;

export const Action = styled.View`
  align-items: center;
  margin-left: 15px;
`;
export const ActionText = styled.Text<Color>`
  margin-top: 2px;
  font-size: 12px;
  color: ${({color}) => color || MyColors.primary};
`;

export const ModalWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;
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

export const ModalItem = styled.View`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-color: #cccccc;
  border-bottom-width: 1px;
`;
