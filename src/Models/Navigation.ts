import {
  NavigationRouteConfig,
  NavigationRouteConfigMap,
  NavigationScreenConfig,
  NavigationScreenOptions,
} from 'react-navigation';

export interface BottomTabNavigationScreenConfig
  extends NavigationScreenConfig<any> {
  tabBarAccessibilityLabel?: string;
  tabBarColor?: string;
  tabBarIcon?: any;
  tabBarLabel?: string;
  tabBarOnPress?: any;
  tabBarTestID?: string;
  title?: string;
}

export interface BottomTabNavigationRouteConfig extends NavigationRouteConfig {
  navigationOptions?: BottomTabNavigationScreenConfig;
  path?: string;
}

export interface BottomTabNavigationRouteConfigMap
  extends NavigationRouteConfigMap {
  [routeName: string]: BottomTabNavigationRouteConfig;
}

export interface InitialLayout {
  height?: string;
  width?: string;
}

export interface TabBarOptions {
  activeTintColor?: string; // Label and icon color of the active tab.
  allowFontScaling?: boolean; // Whether label font should scale to respect Text Size accessibility settings, default is true.
  iconStyle?: any; // Style object for the tab icon.
  inactiveTintColor?: string; // Label and icon color of the inactive tab.
  indicatorStyle?: any; // Style object for the tab indicator (line at the bottom of the tab).
  labelStyle?: any; // Style object for the tab label.
  pressColor?: string; // Color for material ripple (Android >= 5.0 only).
  pressOpacity?: string; // Opacity for pressed tab (iOS and Android < 5.0 only).
  renderIndicator?: Function; // Function which takes an object with the current route and returns a custom React Element to be used as a tab indicator.
  scrollEnabled?: boolean; // Whether to enable scrollable tabs.
  showIcon?: boolean; // Whether to show icon for tab, default is false.
  showLabel?: boolean; // Whether to show label for tab, default is true.
  style?: any; // Style object for the tab bar.
  tabStyle?: any; // Style object for the tab.
  upperCaseLabel?: boolean; // Whether to make label uppercase, default is true.
}

export interface TabNavigationScreenOptions extends NavigationScreenOptions {
  tabBarIcon?: any;
}

export interface TopTabNavigationTabConfig {
  animationEnabled?: boolean;
  backBehavior?: 'initialRoute' | 'order' | 'history' | 'none';
  initialLayout?: InitialLayout;
  lazy?: boolean;
  navigationOptions?: NavigationScreenOptions;
  defaultNavigationOptions?: any;
  optimizationsEnabled?: boolean;
  swipeEnabled?: boolean;
  tabBarComponent?: Element;
  tabBarOptions?: TabBarOptions;
  tabBarPosition?: 'top' | 'bottom';
}

export interface TabBarIcon {
  focused?: boolean;
  size?: boolean;
  color?: string;
}
