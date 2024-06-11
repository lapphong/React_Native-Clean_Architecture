import {appRedux, navigator} from 'app/app';
import {AppNavigator} from 'domain/domain';
import {ExceptionHandler, ExceptionHandlerListener} from 'presentation/presentation';
import {AppExceptionWrapper, DisposeBag} from 'shared/shared';

export class BaseProvider implements ExceptionHandlerListener {
  constructor(public navigator: AppNavigator) {}

  static getInstance(navigator: AppNavigator): BaseProvider {
    if (!BaseProvider.instance) {
      BaseProvider.instance = new BaseProvider(navigator);
    }
    return BaseProvider.instance;
  }

  private static instance: BaseProvider | null = null;
  exceptionHandler: ExceptionHandler = new ExceptionHandler(navigator, this);
  disposeBag: DisposeBag = new DisposeBag();

  dispose(disposeBag: DisposeBag): void {
    disposeBag.dispose();
  }

  async handleException(
    exceptionHandler: ExceptionHandler,
    appExceptionWrapper: AppExceptionWrapper,
  ): Promise<void> {
    await exceptionHandler
      .handleException(appExceptionWrapper, appExceptionWrapper.appException.message)
      .then(_ => appExceptionWrapper.exceptionCompleter?.complete());
  }

  async onRefreshTokenFailed(): Promise<void> {
    await appRedux.onAppLogoutPressed();
  }
}
