import {AppNavigator, AppPopupInfo, AppRepository, PageRouteInfo} from 'domain/domain';
import {injectable, inject} from 'tsyringe';

@injectable()
export class AppUsecase {
  constructor(
    @inject('AppRepository') private _appRepository: AppRepository,
    @inject('AppNavigator') private _navigator: AppNavigator,
  ) {}

  get getInitialHomeDataUseCase(): boolean {
    return !this._appRepository.isLoggedIn && this._appRepository.isFirstLaunchApp;
  }

  get isLoggedInUseCase(): Promise<boolean> {
    return this._appRepository.isLoggedIn;
  }

  get isDarkModeUseCase(): Promise<boolean> {
    return this._appRepository.isDarkMode;
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
    if (await this.isLoggedInUseCase) {
      await this._navigator.showDialog(
        AppPopupInfo.confirmDialog({
          message: 'Bạn có chắc muốn đăng xuất',
          onPressed: async () => {
            await this._appRepository.clearCurrentUserData();
            this._navigator.replaceAll(loginRoute);
          },
        }),
      );
    }
  }
}
