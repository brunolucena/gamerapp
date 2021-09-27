import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import {MyColors} from 'src/Theme/FoundationConfig';

const {width} = Dimensions.get('window');

const borderRadius = '5px';

export const DialogContainer = styled.View`
  margin-bottom: 50px;
  width: ${width - 20};
  border-radius: ${borderRadius};
  background-color: #ffffff;
`;

export const DialogTop = styled.Text`
  padding-vertical: 5px;
  padding-horizontal: 20px;
  border-top-right-radius: ${borderRadius};
  border-top-left-radius: ${borderRadius};
  background-color: ${MyColors.primary};
  color: #ffffff;
`;

export const DialogContent = styled.View`
  padding-vertical: 10px;
  padding-horizontal: 13px;
  height: 120px;
  overflow: hidden;
`;

export const DialogBottom = styled.View`
  align-items: flex-end;
  padding-vertical: 5px;
  padding-horizontal: 13px;
`;

export const DialogText = styled.Text`
  flex-wrap: wrap;
  color: #828282;
`;
