import styled from 'styled-components/native';

import {MyColors} from 'src/Theme/FoundationConfig';

export const MyWishlistSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f4f4;
`;

export const MyWishlistScrollView = styled.ScrollView`
  flex: 1;
`;

export const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyListText = styled.Text`
  max-width: 200px;
  font-size: 20px;
  text-align: center;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-radius: 6px;
  background-color: ${MyColors.secondary};
`;

export const MyWishlistText = styled.Text`
  color: #ffffff;
  text-align: center;
`;

export const EmptyContentContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-bottom: 150px;
  background-color: #fcfcfc;
`;

export const EmptyContentHeaderText = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  max-width: 200px;
  color: #000000;
  font-size: 24px;
  text-align: center;
`;
