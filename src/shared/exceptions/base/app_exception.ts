export enum AppExceptionType {
  remote,
  parse,
  validation,
}

export abstract class AppException {
  constructor(public appExceptionType: AppExceptionType) {}

  abstract get message(): string;

  toString(): string {
    return `message: ${this.message}`;
  }
}
