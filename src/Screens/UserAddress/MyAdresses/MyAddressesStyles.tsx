import styled from 'styled-components/native';

import {Border} from '../../../Models/CSS';

export const MyAddressesSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #efefef;
`;

export const MyAddressesScrollView = styled.ScrollView`
  padding: 10px;
`;

export const Addresses = styled.View``;

export const AddressContainer = styled.View<Border>`
  margin-bottom: 14px;
  padding-horizontal: 13px;
  padding-vertical: 12px;
  border-radius: 6px;
  border-color: #205cde;
  border-width: ${({borderWidth}) => (borderWidth ? borderWidth : 0)}
  background-color: #ffffff;
`;

export const AddressTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AddressText = styled.Text`
  color: #383838;
`;

export const AddressTextSecondary = styled.Text`
  margin-bottom: 3px;
  color: #1c60d6;
  font-size: 17px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  margin-bottom: 20px;
`;
