import React from 'react';
import {SeparatorView} from './styles';

export interface SeparatorProps {
  height?: number;
  width?: number;
}

const Separator: React.SFC<SeparatorProps> = (props) => {
  const {height, width} = props;

  return <SeparatorView height={height} width={width} />;
};

Separator.defaultProps = {
  height: 5,
  width: 5,
};

export default Separator;
