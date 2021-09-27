import styled from 'styled-components/native';

interface IGamerAppCard {
  width?: number;
}

export const GamerAppCardContainer = styled.View<IGamerAppCard>`
  width: ${({width}) => `${width}px` || '200px'};
`;
