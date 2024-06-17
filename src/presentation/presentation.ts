/// Navigation && ExceptionHandler
import {ExceptionHandler, ExceptionHandlerListener} from './exception_handler/exception_handler';
import {AppNavigatorImpl} from './navigation/app_navigator.impl';
import {AppRoute} from './navigation/routes/AppRoute';

/// Resource
// dimens
import {ScreenType, AppDimen} from './resource/dimens/app_dimens';
// Styles
import {ThemeColorDark} from './resource/styles/colors/dark';
import {ThemeColorLight} from './resource/styles/colors/light';
import {AppColors, ThemeColor} from './resource/styles/theme_color';
import {TextTheme, ThemeText} from './resource/styles/theme_text';
import {AppThemeSetting, AppThemeType, ThemeData, ThemeObject} from './resource/styles/themes';
import {ThemeContext, useTheme} from './resource/design_system';

/// Shared-view
import {ShimmerContainerEffect} from './shared_view/common/shimmer/ShimmerContainerEffect';
import {AppButton} from './shared_view/AppButton';
import {AppLoading} from './shared_view/AppLoading';
import {AppTextField} from './shared_view/AppTextField';
import {
  CommonFlashList,
  ErrorView,
  FooterView,
  LoadingView,
  NoMoreItemView,
  PagingController,
} from './shared_view/common/flashlist_view/flashlist_view';

/// UI
import {LoginScreen} from './ui/login/LoginScreen';
import {MainScreen} from './ui/main/MainScreen';
import {AppPopupInfoMapper} from './navigation/mapper/AppPopupInfoMapper';
import {HomeScreen} from './ui/home/HomeScreen';
import {SettingScreen} from './ui/setting/SettingScreen';
import {NotiScreen} from './ui/noti/NotiScreen';

export {
  // exceptionHandler
  ExceptionHandler,
  ExceptionHandlerListener,
  // navigation
  AppPopupInfoMapper,
  AppRoute,
  AppNavigatorImpl,
  // resource
  ScreenType,
  AppDimen,
  ThemeColorDark,
  ThemeColorLight,
  AppColors,
  ThemeText,
  AppThemeType,
  ThemeData,
  AppThemeSetting,
  ThemeContext,
  useTheme,
  // shared-view
  ShimmerContainerEffect,
  AppButton,
  AppLoading,
  AppTextField,
  ErrorView,
  FooterView,
  LoadingView,
  NoMoreItemView,
  PagingController,
  CommonFlashList,
  // ui
  LoginScreen,
  MainScreen,
  HomeScreen,
  NotiScreen,
  SettingScreen,
};

export type {ThemeColor, TextTheme, ThemeObject};
