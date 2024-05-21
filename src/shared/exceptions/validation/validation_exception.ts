import {AppException, AppExceptionType} from 'shared/shared';

export class ValidationException extends AppException {
  constructor(public readonly kind: ValidationExceptionKind) {
    super(AppExceptionType.validation);
  }

  get message(): string {
    switch (this.kind) {
      case ValidationExceptionKind.emptyEmail:
        return 'Email đang bỏ trống';
      case ValidationExceptionKind.invalidEmail:
        return 'Không đúng định dạng email';
      case ValidationExceptionKind.invalidPassword:
        return 'Không đúng định dạng mật khẩu';
      case ValidationExceptionKind.invalidUserName:
        return 'Không đúng định dạng username';
      case ValidationExceptionKind.invalidPhoneNumber:
        return 'Số điện thoại gồm 10 chữ số';
      case ValidationExceptionKind.invalidDateTime:
        return 'Không đúng định dạng ngày';
      case ValidationExceptionKind.passwordsAreNotMatch:
        return 'Mật khẩu không trùng khớp';
    }
  }

  toString(): string {
    return `ValidationException: {kind: ${this.kind}}`;
  }
}

export enum ValidationExceptionKind {
  invalidEmail,
  emptyEmail,
  invalidPassword,
  invalidUserName,
  invalidPhoneNumber,
  invalidDateTime,
  passwordsAreNotMatch,
}
