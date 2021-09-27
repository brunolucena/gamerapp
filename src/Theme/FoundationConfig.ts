import {Colors, Spacings, ThemeManager, Typography} from 'react-native-ui-lib';
import {buttonTypes} from '../Components/Button';

export const MyColors = {
  primary: '#0dac3d',
  secondary: '#1563ce',
  text: '#171717',
  error: '#ef0000',
  success: '#0dac3d',
  warn: '#ca2d51',
  gray: '#a0a0a0',
  gray2: '#8c8c8c',
  black: '#000000',
};

class FoundationConfig {
  constructor() {}

  init() {
    Colors.loadColors({
      primaryColor: MyColors.primary,
      secondaryColor: MyColors.secondary,
      textColor: MyColors.text,
      errorColor: MyColors.error,
      successColor: MyColors.success,
      warnColor: MyColors.warn,
    });

    Typography.loadTypographies({
      heading: {fontSize: 36, fontWeight: '600'},
      subheading: {fontSize: 28, fontWeight: '500'},
      body: {fontSize: 18, fontWeight: '400'},
    });

    Spacings.loadSpacings({
      page: 20,
      card: 12,
      gridGutter: 16,
    });

    // @ts-ignore
    ThemeManager.setComponentTheme('Button', (props, context) => {
      const {clear, disabled, outline, outlineColor, round} = props;

      const type: buttonTypes = props.type;

      const buttonColor = MyColors[type];
      const gray = MyColors.gray;
      const gray2 = MyColors.gray2;

      return {
        ...(clear && {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          color: disabled ? gray : buttonColor,
        }),
        ...(outline && {
          borderColor: disabled ? gray : outlineColor || buttonColor,
          color: disabled ? gray2 : outlineColor || buttonColor,
        }),
        ...(!outline &&
          !clear &&
          !disabled && {
            backgroundColor: buttonColor,
          }),
        ...(round && {
          alignSelf: 'center',
        }),
        ...(!round && {
          borderRadius: 4,
        }),
        backgroundColor: buttonColor || MyColors.primary,
      };
    });
  }
}

export default FoundationConfig;
