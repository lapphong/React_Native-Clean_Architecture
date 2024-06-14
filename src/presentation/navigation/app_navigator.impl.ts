import {inject, singleton} from 'tsyringe';
import {
  useRoute,
  useNavigation,
  useNavigationState,
  CommonActions,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppPopupInfoMapper} from './mapper/AppPopupInfoMapper';
import {AppNavigator, AppPopupInfo, BottomTab, PageRouteInfo} from 'domain/domain';
import {HomeScreen, NotiScreen, SettingScreen} from 'presentation/presentation';
import {Log, LogConfig, ViewUtils} from 'shared/shared';

@singleton()
export class AppNavigatorImpl extends AppNavigator {
  constructor(@inject('AppPopupInfoMapper') private _appPopupInfoMapper: AppPopupInfoMapper) {
    super();
  }

  initialize() {
    this.route = useRoute();
    this.navigation = useNavigation<NativeStackNavigationProp<any>>();
    this.navigationState = useNavigationState(state => state);
  }

  public route!: RouteProp<any, any>;
  public navigation!: NativeStackNavigationProp<any>;
  public navigationState: any;

  tabRoutes = [
    {name: BottomTab.home, component: HomeScreen},
    {name: BottomTab.notifications, component: NotiScreen},
    {name: BottomTab.setting, component: SettingScreen},
  ];

  get currentBottomTab(): number {
    if (this.route === null) {
      throw 'Not found any TabRouter';
    }

    return this.navigationState?.index ?? 0;
  }

  get canPopSelfOrChildren(): boolean {
    return this.navigation.canGoBack();
  }

  getCurrentRouteName(): string {
    return this.route.name;
  }

  popUntilRootOfCurrentBottomTab(): void {
    if (this.route === null) {
      throw 'Not found any TabRouter';
    }
    if (this.navigation.canGoBack() === true) {
      if (LogConfig.enableNavigatorObserverLog) {
        Log.d('popUntilRootOfCurrentBottomTab', {name: 'AppNavigator Obseverse'});
      }
      this.navigation.popToTop();
    }
  }

  push(pageRouteInfo: PageRouteInfo): void {
    if (!this.navigation) {
      throw new Error('Navigation is not initialized');
    }

    if (LogConfig.enableNavigatorObserverLog) {
      Log.d(`Push ${pageRouteInfo.name}`, {name: 'AppNavigator Observer'});
    }

    this.navigation.navigate(pageRouteInfo.name, pageRouteInfo.params);
  }

  replace(pageRouteInfo: PageRouteInfo): void {
    if (LogConfig.enableNavigatorObserverLog) {
      Log.d(`Replace ${pageRouteInfo.name}`, {name: 'AppNavigator Observer'});
    }

    this.navigation.replace(pageRouteInfo.name, pageRouteInfo.params);
  }

  replaceAll(pageRouteInfo: PageRouteInfo): void {
    if (LogConfig.enableNavigatorObserverLog) {
      Log.d(`ReplaceAll ${pageRouteInfo.name}`, {name: 'AppNavigator Observer'});
    }

    this.navigation.dispatch(CommonActions.reset({index: 0, routes: [pageRouteInfo]}));
  }

  pop({result, useRootNavigator = false}: {result?: any; useRootNavigator?: boolean}): void {
    if (LogConfig.enableNavigatorObserverLog) {
      Log.d(`Pop with result = ${result}, useRootNav = ${useRootNavigator}`, {
        name: 'AppNavigator Observer',
      });
    }

    if (result) {
    } else {
      if (useRootNavigator) {
        this.navigation.pop();
      } else {
        if (this.navigation.canGoBack() === true) {
          this.navigation.goBack();
        }
      }
    }
  }

  popAndPush<T extends object | null, R extends object | null>(
    pageRouteInfo: PageRouteInfo,
    {
      result,
      useRootNavigator,
    }: {result?: R | null | undefined; useRootNavigator?: boolean | undefined},
  ): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  popUntilRoot({useRootNavigator}: {useRootNavigator?: boolean | undefined}): void {
    throw new Error('Method not implemented.');
  }
  popUntilRouteName(routeName: string): void {
    throw new Error('Method not implemented.');
  }
  removeUntilRouteName(routeName: string): boolean {
    throw new Error('Method not implemented.');
  }
  removeAllRoutesWithName(routeName: string): boolean {
    throw new Error('Method not implemented.');
  }
  removeLast(): boolean {
    throw new Error('Method not implemented.');
  }

  async showDialog(appPopupInfo: AppPopupInfo): Promise<void> {
    if (LogConfig.enableNavigatorObserverLog) {
      Log.d(appPopupInfo.toString, {name: 'AppNavigator Observer'});
    }
    this._appPopupInfoMapper.map(appPopupInfo, this);
  }

  showGeneralDialog<T extends object | null>(
    appPopupInfo: AppPopupInfo,
    {
      transitionBuilder,
      transitionDuration,
      barrierDismissible,
      barrierColor,
      useRootNavigator,
    }: {
      transitionBuilder?:
        | ((
            context: any,
            animation: any,
            secondaryAnimation: any,
            child: JSX.Element,
          ) => JSX.Element)
        | undefined;
      transitionDuration?: number | undefined;
      barrierDismissible?: boolean | undefined;
      barrierColor?: string | undefined;
      useRootNavigator?: boolean | undefined;
    },
  ): Promise<T | null> {
    throw new Error('Method not implemented.');
  }
  showModalBottomSheet<T extends object | null>(
    appPopupInfo: AppPopupInfo,
    {
      isScrollControlled,
      useRootNavigator,
      isDismissible,
      enableDrag,
      barrierColor,
      backgroundColor,
    }: {
      isScrollControlled?: boolean | undefined;
      useRootNavigator?: boolean | undefined;
      isDismissible?: boolean | undefined;
      enableDrag?: boolean | undefined;
      barrierColor?: string | undefined;
      backgroundColor?: string | undefined;
    },
  ): Promise<T | null> {
    throw new Error('Method not implemented.');
  }

  showErrorSnackBar(message: string, duration?: number): void {
    ViewUtils.showAppSnackBar(message, duration);
  }

  showSuccessSnackBar(message: string, duration?: number): void {
    ViewUtils.showAppSnackBar(message, duration);
  }
}
