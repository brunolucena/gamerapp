import React from 'react';
import {
  ImageSourcePropType,
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/AntDesign';

import {GamerAppCardContainer} from './styles';
import {MyColors} from 'src/Theme/FoundationConfig';

interface GamerAppCardProps {
  distance?: string;
  imageSource: ImageSourcePropType;
  height?: number;
  key?: string;
  marginHorizontal?: number;
  marginVertical?: number;
  name: string;
  nameDashed?: string;
  nameStyles?: TextStyle;
  onPress?: (event: GestureResponderEvent) => any;
  platformName?: string;
  platformNameStyles?: TextStyle;
  selected?: boolean;
  title?: string;
  titleColor?: string;
  width?: number;
}

const GamerAppCard: React.SFC<GamerAppCardProps> = props => {
  const {
    distance,
    height,
    imageSource,
    key,
    marginHorizontal,
    marginVertical,
    name,
    nameDashed,
    nameStyles,
    onPress,
    platformName,
    platformNameStyles,
    selected,
    title,
    titleColor,
    width,
  } = props;

  return (
    <TouchableOpacity onPress={onPress} key={key} activeOpacity={0.6}>
      <GamerAppCardContainer
        width={width}
        style={[styles.cardSelected, {marginHorizontal, marginVertical}]}>
        <Image
          resizeMode="cover"
          source={imageSource}
          style={[{width, height}, styles.image]}
        />

        {selected && (
          <Icon
            name="checkcircle"
            color={MyColors.primary}
            size={30}
            style={styles.icon}
          />
        )}

        {!!platformName && (
          <Text style={platformNameStyles}>{platformName}</Text>
        )}

        {!!title && (
          <Text color={titleColor} text90>
            {title}
          </Text>
        )}

        <View row centerV marginT-3>
          <Text color="#3c3c3c" text80 style={nameStyles}>
            {name}
          </Text>

          {nameDashed && (
            <Text color="#3c3c3c" text80 marginL-10 style={styles.dashed}>
              {nameDashed}
            </Text>
          )}
        </View>

        <View row spread centerV>
          {distance && (
            <Text color="#099a35" style={styles.distance} text80>
              {distance}
            </Text>
          )}
        </View>
      </GamerAppCardContainer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dashed: {
    textDecorationLine: 'line-through',
    color: '#aeaeae',
  },
  image: {
    marginBottom: 5,
    borderRadius: 12,
  },
  cardSelected: {},
  distance: {
    backgroundColor: '#e8e8e8',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 0,
    marginTop: 5,
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ffffff',
    borderRadius: 25,
  },
});

GamerAppCard.defaultProps = {
  height: 160,
  key: 'gamerappcard',
  marginHorizontal: 10,
  marginVertical: 0,
  titleColor: '#686868',
  width: 120,
  onPress: () => console.log('clicked'),
};

export default GamerAppCard;
