export class LogConfig {
  static readonly logApi: boolean = __DEV__;
  static readonly enableGeneralLog: boolean = __DEV__;
  static readonly isPrettyJson: boolean = __DEV__;

  // bloc observer
  static readonly logOnBlocChange: boolean = false;
  static readonly logOnBlocCreate: boolean = false;
  static readonly logOnBlocClose: boolean = false;
  static readonly logOnBlocError: boolean = false;
  static readonly logOnBlocEvent: boolean = __DEV__;
  static readonly logOnBlocTransition: boolean = false;

  // navigator observer
  static readonly enableNavigatorObserverLog: boolean = __DEV__;

  // disposeBag
  static readonly enableDisposeBagLog: boolean = false;

  // stream event log
  static readonly logOnStreamListen: boolean = false;
  static readonly logOnStreamData: boolean = false;
  static readonly logOnStreamError: boolean = false;
  static readonly logOnStreamDone: boolean = false;
  static readonly logOnStreamCancel: boolean = false;

  // log interceptor
  static readonly enableLogInterceptor: boolean = __DEV__;
  static readonly enableLogRequestInfo: boolean = __DEV__;
  static readonly enableLogSuccessResponse: boolean = __DEV__;
  static readonly enableLogErrorResponse: boolean = __DEV__;

  // enable log usecase
  static readonly enableLogUseCaseInput: boolean = __DEV__;
  static readonly enableLogUseCaseOutput: boolean = __DEV__;
  static readonly enableLogUseCaseError: boolean = __DEV__;
}
