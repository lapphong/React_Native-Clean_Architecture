import {AppPreferences, NetworkingFactory, RestMethod} from 'data/data';
import {AuthRepository, Gender, User} from 'domain/domain';
import {inject, injectable} from 'tsyringe';

class AuthApiConstant {
  static readonly login: string = 'User/login';
  // static const String login = 'auth/get-access-token';
  // static const String getCurrentUser = 'user/me';
  // static const String test401 = 'auth/refresh-token111';
  // static const String logout = 'auth/logout';
}

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @inject('NetworkingFactory') private _networkingFactory: NetworkingFactory,
    @inject('AppPreferences') private _appPreferences: AppPreferences,
  ) {}

  async login(username: string, password: string): Promise<void> {
    const response = await this._networkingFactory.request<User>({
      method: RestMethod.post,
      path: AuthApiConstant.login,
      body: {username: username, password: password},
    });

    await Promise.all([
      this._appPreferences.saveAccessToken(response?.token ?? ''),
      this._appPreferences.saveRefreshToken(response?.token ?? ''),
    ]);
  }

  resetPassword(
    token: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  forgotPassword(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  register(username: string, email: string, password: string, gender: Gender): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
