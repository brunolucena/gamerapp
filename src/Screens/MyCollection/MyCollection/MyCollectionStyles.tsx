import styled from 'styled-components/native';

import {Border} from '../../../Models/CSS';
import {MyColors} from 'src/Theme/FoundationConfig';

interface TitleContainer {
  justifyContent?: 'center' | 'space-between';
}

export const MyCollectionSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #f5f4f4;
`;

export const MyCollectionScrollView = styled.ScrollView`
  flex: 1;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 15px;
  margin-top: 20px;
  margin-bottom: 0;
  padding-horizontal: 15px;
  padding-vertical: 10px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  background-color: ${MyColors.primary};
`;

export const MyCollectionText = styled.Text`
  color: #ffffff;
  text-align: center;
`;

export const Overview = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
  margin-top: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: #ffffff;
`;

export const OverviewText = styled.Text<Border>`
  flex: 1;
  color: #868686;
  text-align: center;
  border-color: ${MyColors.primary};
  border-left-width: ${({borderWidth}) => borderWidth || 0};
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

export const EmptyContentP = styled.Text`
  color: #797676;
  font-size: 16px;
  text-align: center;
`;

export const CarouselTitleWrapper = styled.View<TitleContainer>`
  flex-direction: row;
  justify-content: ${({justifyContent}) => justifyContent || 'space-between'};
  align-items: center;
  margin-top: 25px;
`;

export const CarouselTitleLeft = styled.View`
  flex-shrink: 1;
`;

export const CarouselItemTitle = styled.Text`
  color: #414141;
  font-size: 26px;
`;

export const CarouselItemSubTitle = styled.Text`
  margin-top: 2px;
  color: #575757;
  flex-shrink: 1;
`;

export const CarouselTitleRight = styled.View`
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  margin-left: 20px;
`;

export const CarouselTitleRightText = styled.Text`
  color: #099a35;
  font-size: 12px;
`;

export const CarouselItemContainer = styled.View`
  align-items: center;
  padding-horizontal: 20px;
  padding-bottom: 20px;
  border-radius: 6px;
  background-color: #ffffff;
`;

export const CarouselItemBottom = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;
