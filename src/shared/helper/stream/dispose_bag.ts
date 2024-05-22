import {Disposable, Log, LogConfig} from 'shared/shared';
import {Subscription, Subject} from 'rxjs';

export class DisposeBag {
  readonly _enableLogging = LogConfig.enableDisposeBagLog;

  private _disposable: Object[] = [];

  public addDisposable(disposable: Object): void {
    this._disposable.push(disposable);
  }

  public dispose(): void {
    this._disposable.forEach(disposable => {
      if (disposable instanceof Subscription) {
        disposable.unsubscribe();
        if (this._enableLogging) Log.d(`Canceled ${disposable}`, {name: 'DisposeBag Subscription'});
      } else if (disposable instanceof Subject) {
        disposable.complete();
        if (this._enableLogging) Log.d(`Closed ${disposable}`, {name: 'DisposeBag Subject'});
      } else if (disposable instanceof Disposable) {
        disposable.dispose();
      }
    });
    this._disposable = [];
  }
}
