import {CaseReducer, PayloadAction, Draft} from '@reduxjs/toolkit';
import {BaseRedux, BaseReduxEvents, BaseReduxState} from 'app/base_redux/base_redux';
import {LoadMoreOutput, Msg, NotiUsecase} from 'domain/domain';
import {AppException, CompleterUtils} from 'shared/shared';
import {inject, injectable} from 'tsyringe';

export class NotiState extends BaseReduxState {
  isShimmerLoading: boolean = false;
  notifications: LoadMoreOutput<Msg> = new LoadMoreOutput({data: []});
  loadNotiException: AppException | null = null;
}

export class NotiEvents extends BaseReduxEvents<NotiState> {
  get name(): string {
    return 'NotiRedux';
  }

  createReducers(): Record<string, CaseReducer<NotiState, PayloadAction<any>>> {
    return {
      shimmerLoading: (state: Draft<NotiState>, action: PayloadAction<any>) => {
        return {...state, isShimmerLoading: action.payload};
      },
      setDataNotifications: (state: Draft<NotiState>, action: PayloadAction<any>) => {
        return {
          ...state,
          notifications: action.payload.notifications,
          loadNotiException: action.payload.loadNotiException,
        };
      },
      setExceptionNotifications: (state: Draft<NotiState>, action: PayloadAction<any>) => {
        return {
          ...state,
          loadNotiException: action.payload.loadNotiException,
          notifications: action.payload.notifications,
        };
      },
    };
  }
}

@injectable()
export class NotiRedux extends BaseRedux<NotiState, NotiEvents> {
  constructor(@inject('NotiUsecase') private _notiUsecase: NotiUsecase) {
    super(new NotiState(), new NotiEvents());
  }

  async onNotiPageInitiated(): Promise<void> {
    await this._getNotification({
      isInitialLoad: true,
      doOnSubscribe: async () => {
        this.dispatchApp(this.slice.actions.shimmerLoading(true));
      },
      doOnSuccessOrError: async () => {
        this.dispatchApp(this.slice.actions.shimmerLoading(false));
      },
    });
  }

  async onNotiLoadMore(): Promise<void> {
    await this._getNotification({isInitialLoad: false});
  }

  async onNotiPageRefreshed(completer: CompleterUtils<void>): Promise<void> {
    await this._getNotification({
      isInitialLoad: true,
      doOnSubscribe: async () => {
        this.dispatchApp(this.slice.actions.shimmerLoading(true));
      },
      doOnSuccessOrError: async () => {
        this.dispatchApp(this.slice.actions.shimmerLoading(false));

        if (!completer.isCompleted) {
          completer.complete();
        }
      },
    });
  }

  async _getNotification({
    isInitialLoad,
    doOnSubscribe,
    doOnSuccessOrError,
  }: {
    isInitialLoad: boolean;
    doOnSubscribe?: () => Promise<void>;
    doOnSuccessOrError?: () => Promise<void>;
  }): Promise<void> {
    return await this.runReduxCatching({
      action: async () => {
        const output = await this._notiUsecase.execute(isInitialLoad);
        this.dispatchApp(
          this.slice.actions.setDataNotifications({
            notifications: output,
            loadNotiException: null,
          }),
        );
      },
      doOnError: async e => {
        this.dispatchApp(
          this.slice.actions.setExceptionNotifications({
            notifications: [],
            loadNotiException: e,
          }),
        );
      },
      doOnSubscribe: doOnSubscribe,
      doOnSuccessOrError: doOnSuccessOrError,
      handleLoading: false,
    });
  }
}
