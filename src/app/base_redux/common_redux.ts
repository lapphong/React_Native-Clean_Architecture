import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {AppExceptionWrapper} from 'shared/shared';
import {injectable} from 'tsyringe';
import {BaseReduxState, BaseReduxEvents, BaseRedux} from './base_redux';

export class CommonState extends BaseReduxState {
  appExceptionWrapper: AppExceptionWrapper | null = null;
  isLoading: boolean = false;
}

export class CommonEvents extends BaseReduxEvents<CommonState> {
  get name(): string {
    return 'CommonRedux';
  }

  createReducers(): Record<string, CaseReducer<CommonState, PayloadAction<any>>> {
    return {
      loadingVisibilityEmitted: (state: Draft<CommonState>, action: PayloadAction<any>) => {
        return {...state, isLoading: action.payload};
      },
      exceptionEmitted: (state: Draft<CommonState>, action: PayloadAction<any>) => {
        return {...state, appExceptionWrapper: action.payload};
      },
    };
  }
}

@injectable()
export class CommonRedux extends BaseRedux<CommonState, CommonEvents> {
  constructor() {
    super(new CommonState(), new CommonEvents());
  }

  private _loadingCount: number = 0;

  showLoading(): void {
    if (this._loadingCount <= 0) {
      this.dispatchApp(this.slice.actions.loadingVisibilityEmitted(true));
    }

    this._loadingCount++;
  }

  hideLoading(): void {
    if (this._loadingCount <= 1) {
      this.dispatchApp(this.slice.actions.loadingVisibilityEmitted(false));
    }

    this._loadingCount--;
  }

  async addException(appExceptionWrapper: AppExceptionWrapper): Promise<void> {
    this.dispatchApp(this.slice.actions.exceptionEmitted(appExceptionWrapper));
    return appExceptionWrapper.exceptionCompleter?.future;
  }
}
