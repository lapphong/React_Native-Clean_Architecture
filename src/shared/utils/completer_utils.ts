export class CompleterUtils<T> {
  promise: Promise<T>;
  private _resolve!: (value: T | PromiseLike<T>) => void;
  private _reject!: (reason?: any) => void;
  private _isCompleted: boolean = false;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this._resolve = (value: T | PromiseLike<T>) => {
        if (!this._isCompleted) {
          this._isCompleted = true;
          resolve(value);
        }
      };
      this._reject = (reason?: any) => {
        if (!this._isCompleted) {
          this._isCompleted = true;
          reject(reason);
        }
      };
    });
  }

  /**
   * Completes the promise with a value.
   * @param value The value to complete the promise with.
   */
  complete(value: T): void {
    this._resolve(value);
  }

  /**
   * Completes the promise with an error.
   * @param reason The reason for rejecting the promise.
   */
  completeError(reason?: any): void {
    this._reject(reason);
  }

  /**
   * Returns the promise associated with this completer.
   */
  get future(): Promise<T> {
    return this.promise;
  }

  /**
   * Checks if the completer has been completed.
   */
  get isCompleted(): boolean {
    return this._isCompleted;
  }
}
