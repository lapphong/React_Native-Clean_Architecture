export class CompleterUtils<T> {
  promise: Promise<T>;
  private _resolve!: (value: T | PromiseLike<T>) => void;
  private _reject!: (reason?: any) => void;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  complete(value: T) {
    this._resolve(value);
  }

  completeError(reason?: any) {
    this._reject(reason);
  }

  get future(): Promise<T> {
    return this.promise;
  }
}
