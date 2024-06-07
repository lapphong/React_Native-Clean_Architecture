import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {AppExceptionWrapper} from 'shared/shared';
import {injectable} from 'tsyringe';
import {BaseReduxState, BaseReduxEvents, BaseRedux} from './base_redux';

export class CommonReduxState extends BaseReduxState {
  appExceptionWrapper?: AppExceptionWrapper;
  isLoading: boolean = false;
}

export class CommonReduxEvents extends BaseReduxEvents<CommonReduxState> {
  get name(): string {
    return 'CommonRedux';
  }

  createReducers(): Record<string, CaseReducer<CommonReduxState, PayloadAction<any>>> {
    return {
      loadingVisibilityEmitted: (state: Draft<CommonReduxState>, action: PayloadAction<any>) => {
        return {...state, isLoading: action.payload};
      },
      exceptionEmitted: (state: Draft<CommonReduxState>, action: PayloadAction<any>) => {
        return {...state, appExceptionWrapper: action.payload};
      },
    };
  }
}

@injectable()
export class CommonRedux extends BaseRedux<CommonReduxState, CommonReduxEvents> {
  constructor() {
    super(new CommonReduxState(), new CommonReduxEvents());
  }

  private _loadingCount: number = 0;

  showLoading(): void {
    if (this._loadingCount <= 0) {
      this.dispatchApp(this.slice.actions.loadingVisibilityEmitted({isLoading: true}));
    }

    this._loadingCount++;
  }

  hideLoading(): void {
    if (this._loadingCount <= 1) {
      this.dispatchApp(this.slice.actions.loadingVisibilityEmitted({isLoading: false}));
    }

    this._loadingCount--;
  }

  async addException(appExceptionWrapper: AppExceptionWrapper): Promise<void> {
    this.dispatchApp(
      this.slice.actions.exceptionEmitted({appExceptionWrapper: appExceptionWrapper}),
    );
    return appExceptionWrapper.exceptionCompleter?.future;
  }
}
