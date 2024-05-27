import {AppPreferences} from 'data/data';
import {AppRepository, User} from 'domain/domain';
import {Observable} from 'rxjs';
import {inject, injectable} from 'tsyringe';

@injectable()
export class AppRepositoryImpl implements AppRepository {
  constructor(@inject('AppPreferences') private _appPreferences: AppPreferences) {}

  get isLoggedIn(): Promise<boolean> {
    return this._appPreferences.isLoggedIn;
  }

  get isFirstLogin(): Promise<boolean> {
    return this._appPreferences.isFirstLogin;
  }

  get isFirstLaunchApp(): Promise<boolean> {
    return this._appPreferences.isFirstLaunchApp;
  }

  get isDarkMode(): Promise<boolean> {
    return this._appPreferences.isDarkMode;
  }

  //
  get onConnectivityChanged(): Observable<boolean> {
    return new Observable<boolean>();
  }

  async saveIsFirstLogin(isFirstLogin: boolean): Promise<void> {
    return this._appPreferences.saveIsFirstLogin(isFirstLogin);
  }

  async saveIsFirstLaunchApp(isFirstLaunchApp: boolean): Promise<void> {
    await this._appPreferences.saveIsFirstLaunchApp(isFirstLaunchApp);
  }

  getMe(): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async logout(): Promise<void> {
    await this._appPreferences.clearCurrentUserData();
  }

  async saveAccessToken(accessToken: string): Promise<void> {
    await this._appPreferences.saveAccessToken(accessToken);
  }

  async saveIsDarkMode(isDarkMode: boolean): Promise<void> {
    await this._appPreferences.saveIsDarkMode(isDarkMode);
  }

  async saveUserPreference(user: User): Promise<void> {
    await this._appPreferences.saveCurrentUser(user);
  }

  async clearCurrentUserData(): Promise<void> {
    await this._appPreferences.clearCurrentUserData();
  }
}
