export interface ThemeColor {
  primaryColor: string;
  secondaryColor: string;
  scaffoldBackground: string;
  background: string;

  // BottomNavigationBar
  bottomBarIconSelected: string;
  bottomBarIconUnSelected: string;
  bottomBarSelectedItemColor: string;
  bottomBarUnselectedItemColor: string;

  // AppBar
  appbarTitleColor: string;

  textColor: string;
  error: string;
  disableBackgroundColor: string;
  textInputBorderColor: string;
  hintTextColor: string;

  // Button
  textButtonColor: string;
  outlinedButtonPrimary: string;
  backgroundButtonColor: string;

  // Switch
  switchThumb: string;

  // SnackBar
  snackBarBackground: string;
  snackBarContent: string;

  // Shimmer
  baseColor: string;

  // Loading Indicator
  backgroundIndicator:string,
  itemIndicator:string,
}

export class AppColors {
  // grey
  static readonly lightGrey: string = '#E9F0F6';
  static readonly grey2: string = '#696969';
  static readonly grey3: string = '#EDEDED';
  static readonly grey4: string = '#B6B6B6';
  static readonly grey5: string = '#E0E0E0';
  static readonly grey6: string = '#DADADA';
  static readonly grey7: string = '#C8D3DE';
  static readonly grey8: string = '#9EAED1';
  static readonly grey9: string = '#DFDFDF';
  static readonly grey10: string = '#A6AFCE';
  static readonly grey11: string = '#9EAED1';
  static readonly grey12: string = '#F5F5F5';
  static readonly grey13: string = '#D1D1D1';
  static readonly grey14: string = '#A1A1A1';
  static readonly grey15: string = '#BDBDBD';
  static readonly grey20: string = '#828282';
  static readonly grey30: string = '#717171';
  static readonly grey40: string = '#636363';
  static readonly grey50: string = '#7B7676';
  static readonly grey69: string = '#EFEFEF';
  static readonly grey70: string = '#F2F2F2';
  static readonly grey71: string = '#FAFAFA';
  static readonly grey72: string = '#666666';
  static readonly grey73: string = '#555555';
  static readonly grey74: string = '#707070';
  static readonly greyTextColor: string = '#434343';
  static readonly greyLightTextColor: string = '#8C8C8C';
  static readonly greyBorder: string = '#E2E2E2';
  static readonly popupShadowColor: string = '#919EAB';
  static readonly grey75: string = '#90A3BF';

  // white
  static readonly white: string = '#FFFFFF';

  // black
  static readonly black10: string = 'rgba(30, 30, 30, 1)';
  static readonly black11: string = '#363636';
  static readonly black12: string = '#383838';

  // blue
  static readonly blue5: string = '#F1F8FF';
  static readonly blue6: string = '#ECF5FE';
  static readonly blue7: string = '#D4F0FF';
  static readonly blue8: string = '#54D7FF';
  static readonly blue9: string = '#2AC5F4';
  static readonly blue10: string = '#1E90FF';
  static readonly blue11: string = '#3C9DFC';
  static readonly blue12: string = '#CEE1F2';
  static readonly blue13: string = '#E1F0FF';
  static readonly blue14: string = '#73DDFF';
  static readonly blue3: string = '#EfFBFF';
  static readonly blue15: string = '#287DB2';
  static readonly blue16: string = '#2685AE';
  static readonly blue20: string = '#0E88FF';
  static readonly blue25: string = '#2F80ED';
  static readonly blue30: string = '#005BB4';
  static readonly blue31: string = '#0023C4';
  static readonly blue32: string = '#5BA3E9';
  static readonly blue33: string = '#458EF7';

  // pink
  static readonly pink10: string = '#FF7FD2';

  // green
  static readonly green10: string = '#20F943';
  static readonly green11: string = '#03A300';
  static readonly green20: string = '#5FD95C';
  static readonly green21: string = '#74C973';

  // red
  static readonly red1: string = '#DA3E39';
  static readonly red2: string = '#D92424';
  static readonly red3: string = '#FF4D4F';
  static readonly red10: string = '#D90000';
  static readonly red20: string = '#E0230D';
  static readonly red30: string = '#EB5757';
  static readonly red35: string = '#DD636E';
  static readonly red36: string = '#FF0000';
  static readonly red69: string = '#EA5F5F';

  // purple
  static readonly purple10: string = '#403666';
  static readonly purple20: string = '#A663B5';
  static readonly purple30: string = '#571BFF';
  static readonly purple35: string = '#F61AF4';
  static readonly purple50: string = '#3E0367';
  static readonly purple55: string = '#C872FF';

  // orange
  static readonly orange1: string = '#FFAD0D';

  static readonly purple: string = 'rgba(166, 168, 254, 1)';
  static readonly black: string = 'rgba(62, 62, 70, 1)';

  static readonly transparent: string = 'transparent';
  static readonly transparentWithOpacity10: string = 'rgba(0, 0, 0, 0.10)';
  static readonly yellow: string = '#EEBE16';
  static readonly blue: string = '#3179E0';
  static readonly blueAccent: string = '#38BFF8';
  static readonly purpleAccent: string = '#74549A';
  static readonly orange: string = '#F38E22';
  static readonly orangeAccent: string = '#EEBC17';
  static readonly blueGrey: string = '#425774';
  static readonly blueGreyAccent: string = '#5F758B';
  static readonly blueGreyAccent2: string = '#667C90';
  static readonly red: string = '#d90429';
  static readonly redAccent: string = '#FA5570';
  static readonly purple100: string = '#9583FF';
  static readonly grey: string = '#70787D';
  static readonly grey500: string = '#9E9E9E';
}
