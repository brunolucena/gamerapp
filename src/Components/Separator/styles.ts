import styled from 'styled-components/native';
import {SeparatorProps} from './';

export const SeparatorView = styled.View<SeparatorProps>`
  margin-top: ${({height}) => `${height}px`};
`;
