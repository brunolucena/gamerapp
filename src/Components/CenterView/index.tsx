import React from 'react';
import PropTypes from 'prop-types';
import {FlexAlignType, View} from 'react-native';
import style from './style';

interface Props {
  children: any;
  alignItems: FlexAlignType;
  justifyContent:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}
export default function CenterView(props: Props) {
  const {alignItems, justifyContent, children} = props;

  return (
    <View style={[style.main, {alignItems, justifyContent}]}>{children}</View>
  );
}

CenterView.defaultProps = {
  children: null,
  alignItems: 'center',
  justifyContent: 'center',
};

CenterView.propTypes = {
  children: PropTypes.node,
};
