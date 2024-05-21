import moment from 'moment';
import {Observable, finalize, tap} from 'rxjs';
import {DateTimeUtils, Log} from 'shared/shared';

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
  const currentTime = moment().format('DD/MM/YYYY HH:mm:ss');
  const parsedDate =
    DateTimeUtils.tryParse(currentTime, {format: 'DD/MM/YYYY HH:mm:ss'}) ??
    DateTimeUtils.localToUtc(Date.now());

  return this.pipe(
    tap({
      next: event => {
        if (logOnData) {
          Log.d(`🟢 onEvent: ${event}`, {time: parsedDate, name});
        }
      },
      error: error => {
        if (logOnError) {
          Log.d(`🔴 onError: ${error}`, {time: parsedDate, name});
        }
      },
      complete: () => {
        if (logOnDone) {
          Log.d('☑️️ onCompleted', {time: parsedDate, name});
        }
      },
    }),
    finalize(() => {
      if (logOnCancel) {
        Log.d('🟡 onCanceled', {time: parsedDate, name});
      }
    }),
  );
};

export {};
