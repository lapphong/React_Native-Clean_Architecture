import {BaseRedux, BaseReduxEvents, BaseReduxState, appRedux, commonRedux} from 'app/app';
import {AppNavigator} from 'domain/domain';
import {DI_Type, container} from 'initializer/initializer';
import {ExceptionHandler, ExceptionHandlerListener} from 'presentation/presentation';
import {AppExceptionWrapper, DisposeBag} from 'shared/shared';

export type Redux = BaseRedux<BaseReduxState, BaseReduxEvents<BaseReduxState>>;

export class BaseProvider<B extends Redux> implements ExceptionHandlerListener {
  constructor(public redux: B) {
    this.setupRedux(this.commonRedux);

    this.redux = container.resolve<B>(`${this.redux.slice.name}`);
    this.redux.commonRedux = this.commonRedux;
    this.setupRedux(this.redux);
  }

  setupRedux(redux: any) {
    redux.navigator = this.navigator;
    redux.disposeBag = this.disposeBag;
    redux.appRedux = this.appRedux;
    redux.exceptionHandler = this.exceptionHandler;
  }

  appRedux = appRedux;
  commonRedux = commonRedux;
  navigator = container.resolve<AppNavigator>(DI_Type.AppNavigator);
  exceptionHandler: ExceptionHandler = new ExceptionHandler(this.navigator, this);
  disposeBag: DisposeBag = new DisposeBag();

  dispose(): void {
    this.disposeBag.dispose();
  }

  handleException(appExceptionWrapper: AppExceptionWrapper): void {
    this.exceptionHandler
      .handleException(appExceptionWrapper, appExceptionWrapper.appException.message)
      .then(_ => appExceptionWrapper.exceptionCompleter?.complete());
  }

  async onRefreshTokenFailed(): Promise<void> {
    await appRedux.onAppLogoutPressed();
  }
}
