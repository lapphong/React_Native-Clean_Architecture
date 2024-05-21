import {AppException} from 'shared/shared';

export class Result<T> {
  private constructor(data?: T, exception?: AppException) {}

  static success<T>(data: T): Result<T> {
    return new Result(data);
  }

  static failure<T>(exception: AppException): Result<T> {
    return new Result(undefined, exception);
  }

  static fromSyncAction<T>({action}: {action: () => T}): Result<T> {
    try {
      return Result.success(action());
    } catch (e) {
      if (e instanceof AppException) {
        return Result.failure(e);
      } else {
        throw e;
      }
    }
  }

  static async fromAsyncAction<T>({action}: {action: () => Promise<T>}): Promise<Result<T>> {
    try {
      const output = await action();
      return Result.success(output);
    } catch (e) {
      if (e instanceof AppException) {
        return Result.failure(e);
      } else {
        throw e;
      }
    }
  }
}
