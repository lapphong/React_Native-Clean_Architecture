import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {AppExceptionWrapper} from 'shared/shared';
import {injectable} from 'tsyringe';
import {BaseReduxState, BaseReduxEvents, BaseRedux} from './base_redux';

export class CommonReduxState extends BaseReduxState {
  appExceptionWrapper?: AppExceptionWrapper;
  loadingCount: number = 0;
  isLoading: boolean = false;
}

export class CommonReduxEvents extends BaseReduxEvents<CommonReduxState> {
  get name(): string {
    return 'CommonRedux';
  }

  createReducers(): Record<string, CaseReducer<CommonReduxState, PayloadAction<any>>> {
    return {
      loadingVisibilityEmitted: (state: Draft<CommonReduxState>, action: PayloadAction<any>) => {
        return {
          ...state,
          isLoading:
            state.loadingCount === 0 && action.payload.isLoading
              ? true
              : (state.loadingCount === 1 && !action.payload.isLoading) || state.loadingCount <= 0
              ? false
              : state.isLoading,
          loadingCount: action.payload.isLoading
            ? state.loadingCount.plus(1)
            : state.loadingCount.minus(1),
        };
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

  showLoading(): void {
    this.dispatchApp(this.slice.actions.loadingVisibilityEmitted({isLoading: true}));
  }

  hideLoading(): void {
    this.dispatchApp(this.slice.actions.loadingVisibilityEmitted({isLoading: false}));
  }

  async addException(appExceptionWrapper: AppExceptionWrapper): Promise<void> {
    this.dispatchApp(
      this.slice.actions.exceptionEmitted({appExceptionWrapper: appExceptionWrapper}),
    );
    return appExceptionWrapper.exceptionCompleter?.future;
  }
}
