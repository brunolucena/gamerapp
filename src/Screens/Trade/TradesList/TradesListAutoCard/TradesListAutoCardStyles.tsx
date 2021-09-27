import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

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
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
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

export const ItemBottom = styled.View`
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  background-color: #ffffff;
`;
export const ItemBottomContainer = styled.View<IsOpened>`
  padding-vertical: ${({isOpened}) => (isOpened ? '5px' : '0')};
  padding-horizontal: 12px;
  height: ${({isOpened}) => (isOpened ? 'auto' : 0)};
  border-color: #ededed;
  border-top-width: 1px;
  opacity: ${({isOpened}) => (isOpened ? 1 : 0)};
`;
export const ItemBottomArrowContainer = styled.View`
  align-items: center;
  padding: 2px;
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  background-color: ${MyColors.primary};
`;
export const ItemBottomArrow = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: 800;
`;

export const ItemTopRightStars = styled.View`
  flex-direction: row;
`;
