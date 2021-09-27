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
  padding-horizontal: 20px;
  padding-vertical: 100px;
`;

export const EmptyListText = styled.Text`
  max-width: 200px;
  font-size: 20px;
  text-align: center;
  color: #4e4e4e;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  justify-content: center;
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
