import {
  NavigationNavigateActionPayload,
  NavigationScreenProp,
} from 'react-navigation';
import {Theme} from 'react-native-elements';

type Navigation = NavigationScreenProp<NavigationNavigateActionPayload>;

export interface InjectedNavigation {
  navigation: Navigation;
}

export interface InjectedTheme {
  theme: Theme;
}
