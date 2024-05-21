import {AppException, CompleterUtils} from 'shared/shared';

export class AppExceptionWrapper {
  constructor(
    public appException: AppException,
    public exceptionCompleter: CompleterUtils<void> | null = null,
    public doOnRetry: (() => Promise<void>) | null = null,
  ) {}

  toString(): string {
    return `AppExceptionWrapper(appException: ${this.appException}, exceptionCompleter: ${this.exceptionCompleter}, doOnRetry: ${this.doOnRetry})`;
  }
}
