import {User} from 'domain/domain';
import {Observable} from 'rxjs';

export abstract class AppRepository {
  abstract get isLoggedIn(): boolean;
  abstract get isFirstLaunchApp(): boolean;
  abstract get isFirstLogin(): boolean;
  abstract get isDarkMode(): boolean;
  // abstract get languageCode(): LanguageCode;

  abstract get onConnectivityChanged(): Observable<boolean>;

  // abstract getUserPreference(): User;

  abstract clearCurrentUserData(): Promise<void>;

  abstract saveIsFirstLogin(isFirstLogin: boolean): Promise<boolean>;

  abstract saveIsFirstLaunchApp(isFirstLaunchApp: boolean): Promise<boolean>;

  abstract saveIsDarkMode(isDarkMode: boolean): Promise<boolean>;

  // abstract saveLanguageCode(languageCode: LanguageCode): Promise<boolean>;

  abstract saveAccessToken(accessToken: string): Promise<void>;

  abstract saveUserPreference(user: User): Promise<boolean>;

  abstract getMe(): Promise<User>;

  abstract logout(): Promise<void>;

  /// ----- Store objectbox(*Local database*) -----
  // abstract putLocalUser(user: User): number;

  // abstract getLocalUsersStream(): Stream<User[]>;

  // abstract getLocalUsers(): User[];

  // abstract getLocalUser(id: number): User | undefined;

  // abstract deleteImageUrl(id: number): boolean;

  // abstract deleteAllUsersAndImageUrls(): number;
}
