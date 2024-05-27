import {singleton} from 'tsyringe';
import {User} from 'domain/domain';
import {Constants} from 'shared/shared';
import * as Keychain from 'react-native-keychain';

@singleton()
export class AppPreferences {
  // ****************************** Handle Method Keychain ******************************
  private async getItem(key: string): Promise<string | null> {
    const credentials = await Keychain.getGenericPassword({service: key});
    return credentials ? credentials.password : null;
  }

  private async setItem(key: string, value: string): Promise<void> {
    await Keychain.setGenericPassword(key, value, {service: key});
  }

  private async removeItem(key: string): Promise<void> {
    await Keychain.resetGenericPassword({service: key});
  }

  // ****************************** Handle AppPreferences ******************************
  get isFirstLogin(): Promise<boolean> {
    return this.getItem(Constants.isFirstLogin).then(value => {
      return value !== null ? JSON.parse(value) : true;
    });
  }

  get isDarkMode(): Promise<boolean> {
    return this.getItem(Constants.isDarkMode).then(value => {
      return value !== null ? JSON.parse(value) : false;
    });
  }

  get languageCode(): Promise<string | null> {
    return this.getItem(Constants.languageCode);
  }

  get isFirstLaunchApp(): Promise<boolean> {
    return this.getItem(Constants.isFirstLaunchApp).then(value => {
      return value !== null ? JSON.parse(value) : true;
    });
  }

  get accessToken(): Promise<string | null> {
    return this.getItem(Constants.accessToken);
  }

  get refreshToken(): Promise<string | null> {
    return this.getItem(Constants.refreshToken);
  }

  get isLoggedIn(): Promise<boolean> {
    return this.getItem(Constants.accessToken).then(value => {
      return value !== null ?? false;
    });
  }

  get getCurrentUser(): Promise<User | null> {
    return this.getItem(Constants.currentUser).then(user => {
      return user ? User.fromJson(JSON.parse(user)) : null;
    });
  }

  async saveIsFirstLogin(isFirstLogin: boolean): Promise<void> {
    await this.setItem(Constants.isFirstLogin, JSON.stringify(isFirstLogin));
  }

  async saveIsFirstLaunchApp(isFirstLaunchApp: boolean): Promise<void> {
    await this.setItem(Constants.isFirstLaunchApp, JSON.stringify(isFirstLaunchApp));
  }

  async saveAccessToken(token: string): Promise<void> {
    await this.setItem(Constants.accessToken, token);
  }

  async saveRefreshToken(token: string): Promise<void> {
    await this.setItem(Constants.refreshToken, token);
  }

  async saveCurrentUser(user: User): Promise<void> {
    await this.setItem(Constants.currentUser, JSON.stringify(user));
  }

  async clearCurrentUserData(): Promise<void> {
    await Promise.all([
      this.removeItem(Constants.currentUser),
      this.removeItem(Constants.accessToken),
      this.removeItem(Constants.refreshToken),
    ]);
  }

  async saveIsDarkMode(isDarkMode: boolean): Promise<void> {
    await this.setItem(Constants.isDarkMode, JSON.stringify(isDarkMode));
  }

  async saveLanguageCode(languageCode: string): Promise<void> {
    await this.setItem(Constants.languageCode, languageCode);
  }
}
