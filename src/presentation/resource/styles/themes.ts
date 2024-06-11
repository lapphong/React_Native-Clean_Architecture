import {TextStyle} from 'react-native';
import {
  AppColors,
  TextTheme,
  ThemeColor,
  ThemeColorDark,
  ThemeColorLight,
  ThemeText,
} from 'presentation/presentation';
import {Constants} from 'shared/shared';

export enum AppThemeType {
  light,
  dark,
}

export class ThemeData {
  get themeColor(): ThemeColor {
    return AppThemeSetting.getThemeColor();
  }

  get fontFamily(): string {
    return Constants.fontDefault;
  }

  get getTheme(): ThemeObject {
    const dataThemeColor: ThemeColor = this.themeColor;
    const themeText = new ThemeText(this.fontFamily, dataThemeColor);
    const newTextTheme: TextTheme = themeText.getTextTheme;

    return {
      fontFamily: this.fontFamily,
      textTheme: newTextTheme,
      primaryTextTheme: newTextTheme,
      primaryColor: dataThemeColor.primaryColor,
      colorScheme: {
        primary: dataThemeColor.primaryColor,
        secondary: dataThemeColor.secondaryColor,
        background: dataThemeColor.background,
        onSurface: dataThemeColor.textColor,
        surface: dataThemeColor.background,
        error: dataThemeColor.error,
      },
      textInput: {
        error: dataThemeColor.error,
        textInputBorderColor: dataThemeColor.textInputBorderColor,
        hintTextColor: dataThemeColor.hintTextColor,
        disableBackgroundColor: dataThemeColor.disableBackgroundColor,
      },
      snackBarTheme: {
        backgroundColor: dataThemeColor.snackBarBackground,
        contentTextStyle: {...newTextTheme.labelMedium, color: dataThemeColor.snackBarContent},
      },
      switchTheme: {
        thumbColor: dataThemeColor.switchThumb,
      },
      shimmer: dataThemeColor.baseColor,
      indicator: {
        backgroundIndicator: dataThemeColor.backgroundIndicator,
        itemIndicator: dataThemeColor.itemIndicator,
      },
      textSelectionTheme: {cursorColor: AppColors.purple},
      progressIndicatorTheme: {color: AppColors.purple},
      elevatedButtonTheme: {
        // minimumSize: const Size.fromHeight(45),
        // padding: EdgeInsets.zero,
        // elevation: 0,
        backgroundColor: dataThemeColor.backgroundButtonColor,
        textButtonColor: dataThemeColor.textButtonColor,
        disableBackgroundColor: dataThemeColor.disableBackgroundColor,
        // disabledForegroundColor: AppColors2.white,
        // disabledBackgroundColor: dataThemeColor.disableBackgroundColor,
        // shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
      },
    };
  }
}

export class AppThemeSetting {
  constructor() {}
  static currentAppThemeType: AppThemeType = AppThemeType.light;

  static getThemeColor(): ThemeColor {
    return this.currentAppThemeType === AppThemeType.light ? ThemeColorLight : ThemeColorDark;
  }
}

export type ThemeObject = {
  fontFamily: string;
  textTheme: TextTheme;
  primaryTextTheme: TextTheme;
  primaryColor: string;
  colorScheme: {
    primary: string;
    secondary: string;
    background: string;
    onSurface: string;
    surface: string;
    error: string;
  };
  textInput: {
    error: string;
    textInputBorderColor: string;
    hintTextColor: string;
    disableBackgroundColor: string;
  };
  snackBarTheme: {
    backgroundColor: string;
    contentTextStyle: TextStyle;
  };
  switchTheme: {
    thumbColor: string;
  };
  shimmer: string;
  textSelectionTheme: {
    cursorColor: string;
  };
  progressIndicatorTheme: {
    color: string;
  };
  elevatedButtonTheme: {
    backgroundColor: string;
    textButtonColor: string;
    disableBackgroundColor:string,
  };
  indicator: {
    backgroundIndicator: string;
    itemIndicator: string;
  };
};
