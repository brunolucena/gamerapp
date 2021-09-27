import React from 'react';
import {Avatar as AvatarUILib, AvatarProps} from 'react-native-ui-lib';
import getInitialLetters from 'src/Helpers/getInitialLetters';

interface Props extends AvatarProps {
  name: string;
}

const Avatar: React.FC<Props> = props => {
  return (
    <AvatarUILib
      {...props}
      imageProps={{
        resizeMode: 'contain',
        source: props.imageSource ?? props.imageProps?.source ?? {},
        ...(props.imageProps ? props.imageProps : {}),
      }}
      label={getInitialLetters(props.name)}
    />
  );
};

export default Avatar;
