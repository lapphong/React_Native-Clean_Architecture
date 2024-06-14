import {AppColors, ThemeColor} from 'presentation/presentation';

export const ThemeColorLight: ThemeColor = {
  primaryColor: AppColors.purple,
  secondaryColor: AppColors.black,
  scaffoldBackground: AppColors.white,
  background: AppColors.grey12,

  // ---> Bottom Navigation Bar
  bottomBarBackground: AppColors.grey12,
  bottomBarIconSelected: AppColors.purple,
  bottomBarIconUnSelected: '#9D9D9D',
  bottomBarSelectedItemColor: AppColors.purple,
  bottomBarUnselectedItemColor: '#9D9D9D',

  // ---> AppBar
  appbarTitleColor: '#1D1E2C',

  error: AppColors.red10,
  textInputBorderColor: AppColors.grey10,
  hintTextColor: AppColors.grey10,
  disableBackgroundColor: AppColors.grey2,

  // ---> Button
  textColor: AppColors.black,
  textButtonColor: AppColors.white,
  outlinedButtonPrimary: '#000000',
  backgroundButtonColor: AppColors.purple,

  // ---> Switch
  switchThumb: AppColors.purple,

  // ---> SnackBar
  snackBarBackground: AppColors.black,
  snackBarContent: AppColors.white,

  // ---> Shimmer
  baseColor: AppColors.white,

  // ---> Loading Indicator
  backgroundIndicator: AppColors.purple,
  itemIndicator: AppColors.white,
};
