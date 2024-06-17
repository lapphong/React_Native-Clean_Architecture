import {injectable, inject} from 'tsyringe';
import {AuthRepository, Gender} from 'domain/domain';
import {ValidationException, ValidationExceptionKind, ValidationUtils} from 'shared/shared';

@injectable()
export class AuthUsecase {
  constructor(@inject('AuthRepository') private _authRepository: AuthRepository) {}

  async loginUsecase({username, password}: {username: string; password: string}): Promise<void> {
    if (!ValidationUtils.isNotEmpty(username)) {
      throw new ValidationException(ValidationExceptionKind.invalidUserName);
    }

    if (!ValidationUtils.isNotEmpty(password)) {
      throw new ValidationException(ValidationExceptionKind.invalidPassword);
    }

    await this._authRepository.login(username, password);
  }

  async resetPasswordUsecase({
    token,
    email,
    password,
    confirmPassword,
  }: {
    token: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> {
    if (!ValidationUtils.isNotEmpty(password)) {
      throw new ValidationException(ValidationExceptionKind.invalidPassword);
    }
    if (!ValidationUtils.isNotEmpty(confirmPassword)) {
      throw new ValidationException(ValidationExceptionKind.invalidPassword);
    }
    if (password !== confirmPassword) {
      throw new ValidationException(ValidationExceptionKind.passwordsAreNotMatch);
    }
    if (!ValidationUtils.isValidEmail(email)) {
      throw new ValidationException(ValidationExceptionKind.invalidEmail);
    }

    await this._authRepository.resetPassword(token, email, password, confirmPassword);
  }

  async forgotPasswordUsecase(email: string): Promise<void> {
    if (!ValidationUtils.isNotEmpty(email)) {
      throw new ValidationException(ValidationExceptionKind.emptyEmail);
    }
    if (!ValidationUtils.isValidEmail(email)) {
      throw new ValidationException(ValidationExceptionKind.invalidEmail);
    }
    await this._authRepository.forgotPassword(email);
  }

  async registerUsecase({
    username,
    email,
    password,
    gender,
  }: {
    username: string;
    email: string;
    password: string;
    gender: Gender;
  }): Promise<void> {
    if (!ValidationUtils.isNotEmpty(email)) {
      throw new ValidationException(ValidationExceptionKind.emptyEmail);
    }

    if (!ValidationUtils.isValidEmail(email)) {
      throw new ValidationException(ValidationExceptionKind.invalidEmail);
    }

    if (!ValidationUtils.isNotEmpty(password)) {
      throw new ValidationException(ValidationExceptionKind.invalidPassword);
    }

    await this._authRepository.register(username, email, password, gender);
  }
}
