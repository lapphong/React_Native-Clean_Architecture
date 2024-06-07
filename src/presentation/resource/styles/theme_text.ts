import {TextStyle} from 'react-native';
import {ThemeColor} from './theme_color';

export interface TextTheme {
  displayLarge?: TextStyle;
  displayMedium?: TextStyle;
  displaySmall?: TextStyle;
  headlineLarge?: TextStyle;
  headlineMedium?: TextStyle;
  headlineSmall?: TextStyle;
  bodyMedium?: TextStyle;
  bodySmall?: TextStyle;
  labelMedium?: TextStyle;
  labelLarge?: TextStyle;
  titleLarge?: TextStyle;
  titleSmall?: TextStyle;
  bodyLarge?: TextStyle;
  titleMedium?: TextStyle;
}

export class ThemeText {
  private themeColor: ThemeColor;
  private fontFamily: string;
  private _textTheme: TextTheme;

  constructor(fontFamily: string, themeColor: ThemeColor) {
    this.fontFamily = fontFamily;
    this.themeColor = themeColor;

    this._textTheme = {
      //headling 1
      displayLarge: this.ts({fontSize: 32, fontWeight: 'normal'}),

      //headling 2
      displayMedium: this.ts({fontSize: 28, fontWeight: 'normal'}),

      //headling 3
      displaySmall: this.ts({fontSize: 24, fontWeight: 'normal'}),

      //headling 4
      headlineLarge: this.ts({fontSize: 20, fontWeight: '600'}),

      //headling 5
      headlineMedium: this.ts({fontSize: 18, fontWeight: '500'}),

      //headling 6
      headlineSmall: this.ts({fontSize: 14, fontWeight: '600'}),

      //Paragraphh: Text normal in app
      bodyMedium: this.ts({fontSize: 16, fontWeight: '400'}),

      //Small text: TimeAgo - Share
      bodySmall: this.ts({fontSize: 12, fontWeight: '500'}),

      //Paragraph Exxtend
      labelMedium: this.ts({fontSize: 14, fontWeight: '400'}),

      // Text in Button
      labelLarge: this.ts({fontSize: 18, fontWeight: '600'}),

      // Text in AppBar
      titleLarge: this.ts({fontSize: 20, fontWeight: '600'}),
      titleSmall: this.ts({fontSize: 16, fontWeight: '600'}),
      bodyLarge: this.ts({fontSize: 15, fontWeight: '900'}),

      // Text in TextField, Title of LisTile
      titleMedium: this.ts({fontSize: 15, fontWeight: '400'}),
    };
  }

  get getTextTheme(): TextTheme {
    return this._textTheme;
  }

  get getParagraphStyle(): TextStyle {
    return this._textTheme.bodyMedium!;
  }

  get getExtendedParagraphStyle(): TextStyle {
    return this._textTheme.labelMedium!;
  }

  get getSmallTextStyle(): TextStyle {
    return this._textTheme.bodySmall!;
  }

  get getTextButtonStyle(): TextStyle {
    return {
      ...this._textTheme.labelLarge!,
      fontFamily: this.fontFamily,
      fontWeight: '700',
      fontSize: 16,
    };
  }

  get getTextTitleAppbarStyle(): TextStyle {
    return {
      ...this._textTheme.labelLarge!,
      fontFamily: this.fontFamily,
      fontWeight: '600',
      color: 'black',
      fontSize: 16,
    };
  }

  get getTabBarLabelStyle(): TextStyle {
    return {
      ...this._textTheme.bodyLarge!,
      fontFamily: this.fontFamily,
      fontSize: 20,
      fontWeight: '600',
    };
  }

  get getTabBarUnselectedLabelStyle(): TextStyle {
    return {
      ...this._textTheme.bodyLarge!,
      fontFamily: this.fontFamily,
      fontSize: 18,
      fontWeight: '400',
    };
  }

  private ts({
    fontSize,
    fontWeight,
    fontFamily,
  }: {
    fontSize: number;
    fontWeight?: FontWeight;
    fontFamily?: string;
  }): TextStyle {
    return {
      fontFamily: fontFamily || this.fontFamily,
      color: this.themeColor.textColor,
      fontSize: fontSize.rps,
      fontWeight: fontWeight,
    };
  }
}

type FontWeight = 'normal' | 'bold' | '600' | '500' | '400' | '700' | '900';
