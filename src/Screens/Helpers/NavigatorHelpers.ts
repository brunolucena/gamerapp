import {
  HeaderStyleInterpolators,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';

import {MyColors} from '../../Theme/FoundationConfig';

export const transitionSlide: any = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
  cardStyleInterpolator: ({current, next, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
};

export const defaultScreenOptions: StackNavigationOptions = {
  ...transitionSlide,
  headerStyle: {
    backgroundColor: '#ffffff',
    elevation: 0, // for android
    shadowOpacity: 0, // for ios
    borderBottomWidth: 0, // for ios
  },
  headerTitle: 'GamerApp',
  headerTintColor: MyColors.primary,
  headerTitleStyle: {
    color: '#000000',
  },
  headerTitleAlign: 'center',
};
