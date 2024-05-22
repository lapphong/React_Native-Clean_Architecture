import {Gender} from 'domain/domain';

export abstract class AuthRepository {
  abstract login(username: string, password: string): Promise<void>;

  abstract resetPassword(
    token: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<void>;

  abstract forgotPassword(email: string): Promise<void>;

  abstract register(
    username: string,
    email: string,
    password: string,
    gender: Gender,
  ): Promise<void>;
}
