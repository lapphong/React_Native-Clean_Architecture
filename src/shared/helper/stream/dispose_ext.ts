import {Subscription, Subject} from 'rxjs';
import {Disposable} from './disposable';
import {DisposeBag} from 'shared/shared';

declare module 'rxjs' {
  interface Subscription {
    disposeBy(disposeBag: DisposeBag): void;
  }

  interface Subject<T> {
    disposeBy(disposeBag: DisposeBag): void;
  }
}

Subscription.prototype.disposeBy = function (disposeBag: DisposeBag): void {
  disposeBag.addDisposable(this);
};

Subject.prototype.disposeBy = function (disposeBag: DisposeBag): void {
  disposeBag.addDisposable(this);
};

declare module './disposable' {
  interface Disposable {
    disposeBy(disposeBag: DisposeBag): void;
  }
}

Disposable.prototype.disposeBy = function (disposeBag: DisposeBag): void {
  disposeBag.addDisposable(this);
};

export {};
