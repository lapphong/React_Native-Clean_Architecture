export class NetworkExceptions {
  constructor(public type: NetworkExceptionsKind, public reason?: string) {}
}

export enum NetworkExceptionsKind {
  requestCancelled,
  unauthorizedRequest,
  badRequest,
  notFound,
  methodNotAllowed,
  requestTimeout,
  sendTimeout,
  conflict,
  internalServerError,
  notImplemented,
  serviceUnavailable,
  noInternetConnection,
  refreshTokenFailed,
  formatExceptions,
  unableToProcess,
  defaultError,
  unexpectedError,
}
