import styled from 'styled-components/native';

interface BackgroundColor {
  backgroundColor: string;
}

interface Color {
  color: string;
}

export const SoldierContainer = styled.View`
  align-items: center;
  width: 100%;
`;

export const SoldierWrapper = styled.View`
  width: 300px;
`;

export const Balloon = styled.View<BackgroundColor>`
  padding-vertical: 20px;
  padding-horizontal: 30px;
  width: 235px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

export const Text = styled.Text<Color>`
  color: ${({color}) => color};
`;

export const ImageContainer = styled.View`
  flex-direction: row-reverse;
  position: relative;
  bottom: 28px;
`;
