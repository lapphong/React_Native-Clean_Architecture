import {
  AppNavigator,
  AppPopupInfo,
  AppRepository,
  InitialAppRoute,
  PageRouteInfo,
} from 'domain/domain';
import {injectable, inject} from 'tsyringe';

@injectable()
export class AppUsecase {
  constructor(
    @inject('AppRepository') private _appRepository: AppRepository,
    @inject('AppNavigator') private _navigator: AppNavigator,
  ) {}

  get getInitialHomeDataUseCase(): boolean | Promise<boolean> {
    return !this._appRepository.isLoggedIn && this._appRepository.isFirstLaunchApp;
  }

  get isLoggedInUseCase(): boolean {
    return this._appRepository.isLoggedIn;
  }

  get isDarkModeUseCase(): boolean | Promise<boolean> {
    return this._appRepository.isDarkMode;
  }

  get loadInitialResourceUseCase(): InitialAppRoute {
    return this._appRepository.isLoggedIn ? InitialAppRoute.main : InitialAppRoute.login;
  }

  async saveIsDarkModeUseCase(isDarkMode: boolean): Promise<void> {
    await this._appRepository.saveIsDarkMode(isDarkMode);
  }

  async saveIsFirstLaunchAppUseCase(isFirstLaunchApp: boolean): Promise<void> {
    await this._appRepository.saveIsFirstLaunchApp(isFirstLaunchApp);
  }

  async saveIsFirstLoginUseCase(isFirstLogin: boolean): Promise<void> {
    await this._appRepository.saveIsFirstLogin(isFirstLogin);
  }

  async clearCurrentUserDataUseCase(): Promise<void> {
    await this._appRepository.clearCurrentUserData();
  }

  async logoutUseCase(loginRoute: PageRouteInfo): Promise<void> {
    if (this._appRepository.isLoggedIn) {
      await this._navigator.showDialog(
        AppPopupInfo.confirmDialog({
          message: 'Bạn có chắc muốn đăng xuất',
          onPressed: async () => {
            await this._appRepository.clearCurrentUserData();
            await this._navigator.replaceAll([loginRoute]);
          },
        }),
        {useRootNavigator: true},
      );
    }
  }
}
