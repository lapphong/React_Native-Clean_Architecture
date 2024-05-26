import {Observable, finalize, tap} from 'rxjs';
import {Log} from 'shared/shared';

declare module 'rxjs' {
  interface Observable<T> {
    log(
      name: string,
      {
        logOnData,
        logOnError,
        logOnDone,
        logOnCancel,
      }: {
        logOnData?: boolean;
        logOnError?: boolean;
        logOnDone?: boolean;
        logOnCancel?: boolean;
      },
    ): Observable<T>;
  }
}

Observable.prototype.log = function <T>(
  this: Observable<T>,
  name: string,
  {
    logOnData = false,
    logOnError = false,
    logOnDone = false,
    logOnCancel = false,
  }: {
    logOnData?: boolean;
    logOnError?: boolean;
    logOnDone?: boolean;
    logOnCancel?: boolean;
  } = {},
): Observable<T> {
  return this.pipe(
    tap({
      next: event => {
        if (logOnData) {
          Log.d(`🟢 onEvent: ${event}`, {name});
        }
      },
      error: error => {
        if (logOnError) {
          Log.d(`🔴 onError: ${error}`, {name});
        }
      },
      complete: () => {
        if (logOnDone) {
          Log.d('☑️️ onCompleted', {name});
        }
      },
    }),
    finalize(() => {
      if (logOnCancel) {
        Log.d('🟡 onCanceled', {name});
      }
    }),
  );
};

export {};
