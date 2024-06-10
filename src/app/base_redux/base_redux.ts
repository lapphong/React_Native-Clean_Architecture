import {CaseReducer, createSelector, createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';
import {AppNavigator} from 'domain/domain';
import {ExceptionHandler} from 'presentation/presentation';
import {
  AppException,
  AppExceptionWrapper,
  CompleterUtils,
  Constants,
  DisposeBag,
  Log,
  NetworkException,
} from 'shared/shared';
import {AppRedux, CommonRedux, AppDispatch, store, RootState} from 'app/app';

export abstract class BaseReduxState {
  constructor() {}
}

export abstract class BaseReduxEvents<S extends BaseReduxState> {
  abstract get name(): string;
  abstract createReducers(): Record<string, CaseReducer<S, PayloadAction<any>>>;
}

export abstract class BaseRedux<S extends BaseReduxState, R extends BaseReduxEvents<S>> {
  private createSlice: Slice<S, Record<string, CaseReducer<S, PayloadAction<any>>>>;

  public navigator!: AppNavigator;
  public appRedux!: AppRedux;
  public exceptionHandler!: ExceptionHandler;
  public disposeBag!: DisposeBag;
  public _commonRedux!: CommonRedux;

  set commonRedux(commonRedux: CommonRedux) {
    this._commonRedux = commonRedux;
  }

  get commonRedux(): CommonRedux {
    return this instanceof CommonRedux ? (this as CommonRedux) : this._commonRedux;
  }

  constructor(initialState: S, reducer: R) {
    this.createSlice = createSlice({
      name: reducer.name,
      initialState: initialState,
      reducers: reducer.createReducers(),
    });
  }

  get slice(): Slice<S, Record<string, CaseReducer<S, PayloadAction<any>>>> {
    return this.createSlice;
  }

  get dispatchApp(): AppDispatch {
    return store.dispatch;
  }

  dispatchActions(actions: Array<{type: string; payload: any}>): void {
    actions.forEach(action => this.dispatchApp(action));
  }

  get getSelector() {
    return createSelector(
      (state: RootState) => state[this.slice.name],
      (state: S) => ({...state}),
    );
  }

  async runReduxCatching({
    action,
    doOnRetry,
    doOnError,
    doOnSubscribe,
    doOnSuccessOrError,
    doOnEventCompleted,
    handleLoading = true,
    handleError = true,
    handleRetry = true,
    maxRetries = Constants.maxRetries,
  }: {
    action: () => Promise<void>;
    doOnRetry?: () => Promise<void>;
    doOnError?: (error: AppException) => Promise<void>;
    doOnSubscribe?: () => Promise<void>;
    doOnSuccessOrError?: () => Promise<void>;
    doOnEventCompleted?: () => Promise<void>;
    handleLoading?: boolean;
    handleError?: boolean;
    handleRetry?: boolean;
    maxRetries?: number;
  }): Promise<void> {
    let recursion: CompleterUtils<void> | undefined;
    try {
      await doOnSubscribe?.();
      if (handleLoading) {
        this.commonRedux.showLoading();
      }

      await action(); // Call usecase

      if (handleLoading) {
        this.commonRedux.hideLoading();
      }
      await doOnSuccessOrError?.();
    } catch (e) {
      if (handleLoading) {
        this.commonRedux.hideLoading();
      }
      await doOnSuccessOrError?.();

      if (e instanceof AppException) {
        await doOnError?.(e);
        if (handleError || this._forceHandleError(e)) {
          await this.commonRedux.addException(
            new AppExceptionWrapper(
              e,
              new CompleterUtils<void>(),
              doOnRetry ??
                (handleRetry && maxRetries !== 1
                  ? async () => {
                      recursion = new CompleterUtils();
                      await this.runReduxCatching({
                        action,
                        doOnRetry,
                        doOnError,
                        doOnSubscribe,
                        doOnSuccessOrError,
                        doOnEventCompleted,
                        handleLoading,
                        handleError,
                        handleRetry,
                        maxRetries: maxRetries?.minus(1),
                      });
                      recursion?.complete();
                    }
                  : null),
            ),
          );
        }
      } else {
        Log.e(e, {name: `Uncaught Exception`});
      }
    } finally {
      await recursion?.future;
      await doOnEventCompleted?.();
    }
  }

  _forceHandleError(appException: AppException): boolean {
    return (
      appException instanceof NetworkException
      // && appException.kind == NetworkExceptionsKind.refreshTokenFailed
    );
  }
}
