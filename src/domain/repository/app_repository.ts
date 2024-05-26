import {User} from 'domain/domain';
import {Observable} from 'rxjs';

export abstract class AppRepository {
  abstract get isLoggedIn(): Promise<boolean>;
  abstract get isFirstLaunchApp(): Promise<boolean>;
  abstract get isFirstLogin(): Promise<boolean>;
  abstract get isDarkMode(): Promise<boolean>;
  // abstract get languageCode(): LanguageCode;

  abstract get onConnectivityChanged(): Observable<boolean>;

  // abstract get getUserPreference(): User;

  abstract clearCurrentUserData(): Promise<void>;

  abstract saveIsFirstLogin(isFirstLogin: boolean): Promise<void>;

  abstract saveIsFirstLaunchApp(isFirstLaunchApp: boolean): Promise<void>;

  abstract saveIsDarkMode(isDarkMode: boolean): Promise<void>;

  // abstract saveLanguageCode(languageCode: LanguageCode): Promise<boolean>;

  abstract saveAccessToken(accessToken: string): Promise<void>;

  abstract saveUserPreference(user: User): Promise<void>;

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
