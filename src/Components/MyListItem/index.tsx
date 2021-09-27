import React from 'react';
import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  SwitchProperties,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {Image, Text, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Switch,
  NativeViewGestureHandlerProperties,
} from 'react-native-gesture-handler';
import {MyColors} from 'src/Theme/FoundationConfig';

interface MyListItemProps {
  arrowColor?: string;
  containerStyle?: ViewStyle;
  hideArrow?: boolean;
  isCard?: boolean;
  leftAvatar?: ImageSourcePropType;
  leftAvatarRound?: boolean;
  leftAvatarContainerStyle?: ViewStyle;
  leftAvatarIcon?: boolean;
  leftAvatarStyle?: ImageStyle | ImageStyle[];
  leftElement?: any;
  onIconPress?: Function;
  onPress?: Function;
  onPressImage?: Function;
  resizeMode?: ImageResizeMode;
  rightIcon?: any;
  rightIconOnPress?: Function;
  subtitle?: string;
  subtitleTop?: boolean;
  switchProps?: NativeViewGestureHandlerProperties & SwitchProperties;
  title: string | any;
  titleStyle?: TextStyle;
}

const MyListItem: React.SFC<MyListItemProps> = props => {
  const {
    arrowColor,
    containerStyle,
    hideArrow,
    isCard,
    leftAvatar,
    leftAvatarRound,
    leftAvatarContainerStyle,
    leftAvatarIcon,
    leftAvatarStyle,
    leftElement,
    onIconPress,
    onPress,
    onPressImage,
    resizeMode,
    rightIcon,
    rightIconOnPress,
    subtitle,
    subtitleTop,
    switchProps,
    title,
    titleStyle,
  } = props;

  function handleOnPress() {
    if (onPress) {
      onPress();
    }
  }

  function handleIconPress() {
    if (onIconPress) {
      onIconPress();
    } else if (onPress) {
      onPress();
    }
  }

  function handlePressImage() {
    if (onPressImage) {
      onPressImage();
    }
  }

  function handleRightIconOnPress() {
    if (rightIconOnPress) {
      rightIconOnPress();
    } else if (onPress) {
      onPress();
    }
  }

  return (
    <View style={[styles.container, isCard && styles.card, containerStyle]}>
      <View flex row paddingL-10 paddingV-5>
        {leftAvatar && (
          <TouchableOpacity
            onPress={handlePressImage}
            style={[
              styles.imageContainer2,
              leftAvatarRound && [styles.imageContainer, styles.round],
              leftAvatarContainerStyle && leftAvatarContainerStyle,
            ]}>
            <View>
              <Image
                resizeMode={resizeMode}
                source={leftAvatar}
                style={[
                  styles.image,
                  leftAvatarRound && styles.round,
                  leftAvatarStyle && leftAvatarStyle,
                ]}
              />

              {leftAvatarIcon && (
                <View style={styles.imageIconContainer}>
                  <Icon name="md-camera" size={15} color={MyColors.secondary} />
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={onPress ? 0.2 : 1}
          onPress={handleOnPress}
          style={styles.textContainer}>
          {leftElement ? (
            leftElement
          ) : (
            <View row centerV>
              <View style={[styles.textWrapper, subtitleTop && styles.invert]}>
                {typeof title === 'string' ? (
                  <Text style={[styles.label, titleStyle]}>{title}</Text>
                ) : (
                  title
                )}

                {subtitle && <Text color="#898989">{subtitle}</Text>}
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View centerV centerH paddingH-25 style={styles.iconContainer}>
        {switchProps ? (
          <Switch {...switchProps} />
        ) : (
          <>
            {rightIcon ? (
              <TouchableOpacity onPress={handleRightIconOnPress}>
                {rightIcon}
              </TouchableOpacity>
            ) : (
              !hideArrow && (
                <Icon
                  name="ios-arrow-forward"
                  color={arrowColor}
                  size={22}
                  onPress={handleIconPress}
                />
              )
            )}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#ffffff',
  },
  card: {
    marginHorizontal: 5,
    borderColor: '#bcbcbc',
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  iconContainer: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  imageContainer: {
    backgroundColor: '#dddddd',
    alignItems: 'center',
    padding: 2,
  },
  imageContainer2: {
    marginRight: 15,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  imageIconContainer: {
    position: 'absolute',
    top: -1,
    right: -6,
  },
  round: {
    borderRadius: 24,
  },
  invert: {
    flexDirection: 'column-reverse',
  },
  label: {
    color: '#343434',
    fontSize: 19,
  },
  textContainer: {
    flex: 1,
  },
  textWrapper: {
    flexShrink: 1,
  },
});

MyListItem.defaultProps = {
  arrowColor: '#242424',
  leftAvatarRound: true,
  resizeMode: 'contain',
};

export default MyListItem;
