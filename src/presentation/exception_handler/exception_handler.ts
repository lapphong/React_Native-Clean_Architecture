import {AppNavigator, AppPopupInfo} from 'domain/domain';
import {
  AppExceptionType,
  AppExceptionWrapper,
  Constants,
  NetworkException,
  NetworkExceptionsKind,
} from 'shared/shared';

export class ExceptionHandler {
  constructor(public navigator: AppNavigator, public listener: ExceptionHandlerListener) {}

  async handleException(appExceptionWrapper: AppExceptionWrapper, message: string): Promise<void> {
    switch (appExceptionWrapper.appException.appExceptionType) {
      case AppExceptionType.remote:
        const exception = appExceptionWrapper.appException as NetworkException;
        switch (exception.kind) {
          case NetworkExceptionsKind.noInternetConnection:
            await this._showErrorDialogWithRetry({
              message: message,
              onRetryPressed: async () => {
                this.navigator.pop({useRootNavigator: false});
                await appExceptionWrapper.doOnRetry?.();
              },
            });
          case NetworkExceptionsKind.refreshTokenFailed:
            await this._showErrorDialog({
              isRefreshTokenFailed: true,
              message: message,
              onPressed: () => this.navigator.pop({useRootNavigator: false}),
            });
          default:
            this._showErrorSnackBar({message: message});
            break;
        }
      case AppExceptionType.parse:
        return this._showErrorSnackBar({message: message});
      case AppExceptionType.validation:
        await this._showErrorDialog({message: message});
    }
  }

  _showErrorSnackBar({
    message,
    duration = Constants.defaultErrorVisibleDuration,
  }: {
    message: string;
    duration?: number;
  }): void {
    this.navigator.showErrorSnackBar(message, duration);
  }

  async _showErrorDialog({
    message,
    onPressed,
    isRefreshTokenFailed = false,
  }: {
    message: string;
    onPressed?: () => void;
    isRefreshTokenFailed?: boolean;
  }): Promise<void> {
    await this.navigator
      .showDialog(AppPopupInfo.confirmDialog({message: message, onPressed}))
      .then(_ => {
        if (isRefreshTokenFailed) {
          this.listener.onRefreshTokenFailed();
        }
      });
  }

  async _showErrorDialogWithRetry({
    message,
    onRetryPressed,
  }: {
    message: string;
    onRetryPressed?: () => void;
  }): Promise<void> {
    await this.navigator.showDialog(
      AppPopupInfo.errorWithRetryDialog({message: message, onRetryPressed: onRetryPressed}),
    );
  }
}

export abstract class ExceptionHandlerListener {
  abstract onRefreshTokenFailed(): void;
}
