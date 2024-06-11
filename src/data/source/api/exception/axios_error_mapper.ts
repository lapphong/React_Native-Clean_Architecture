import axios, {AxiosError, AxiosResponse} from 'axios';
import {ResponeException} from 'data/data';
import {ExceptionMapper, NetworkException, NetworkExceptionsKind} from 'shared/shared';
import {singleton} from 'tsyringe';

@singleton()
export class AxiosErrorMapper extends ExceptionMapper<NetworkException> {
  constructor() {
    super();
  }

  map(exception: any): NetworkException {
    if (exception instanceof NetworkException) {
      return exception;
    }
    if (axios.isAxiosError(exception)) {
      switch (exception.code) {
        case AxiosError.ERR_NETWORK:
          return new NetworkException(NetworkExceptionsKind.noInternetConnection);

        case AxiosError.ERR_BAD_RESPONSE:
        case AxiosError.ERR_BAD_OPTION:
        case AxiosError.ERR_BAD_OPTION_VALUE:
        case AxiosError.ERR_BAD_REQUEST:
          return this.handleBadResponse(exception.response);

        case AxiosError.ERR_NOT_SUPPORT:
        case AxiosError.ERR_DEPRECATED:
          return new NetworkException(NetworkExceptionsKind.serviceUnavailable);

        case AxiosError.ERR_INVALID_URL:
          return new NetworkException(NetworkExceptionsKind.notFound, exception.message);

        case AxiosError.ERR_CANCELED:
          return new NetworkException(NetworkExceptionsKind.requestCancelled);

        case AxiosError.ECONNABORTED:
          return new NetworkException(NetworkExceptionsKind.sendTimeout);

        case AxiosError.ETIMEDOUT:
          return new NetworkException(NetworkExceptionsKind.requestTimeout);
        default:
          if (exception.response instanceof NetworkException) {
            return exception.response as NetworkException;
          }
      }
    } else {
      if (exception.toString().valueOf() === 'is not a subtype of') {
        return new NetworkException(NetworkExceptionsKind.unableToProcess);
      }
    }
    return new NetworkException(NetworkExceptionsKind.unexpectedError);
  }

  handleBadResponse(response?: AxiosResponse): NetworkException {
    let responeException: ResponeException | null = null;

    try {
      responeException = ResponeException.fromJson(response?.data);
    } catch (e) {}

    let status: number = response?.status ?? 0;
    switch (status) {
      case 400:
        return new NetworkException(
          NetworkExceptionsKind.badRequest,
          responeException?.message ?? 'Not Found',
        );
      case 401:
        return new NetworkException(
          NetworkExceptionsKind.unauthorizedRequest,
          responeException?.message ?? 'Not Found',
        );
      case 403:
        return new NetworkException(
          NetworkExceptionsKind.unauthorizedRequest,
          responeException?.message ?? 'Not Found',
        );
      case 404:
        return new NetworkException(
          NetworkExceptionsKind.notFound,
          responeException?.message ?? 'Not Found',
        );
      case 405:
        return new NetworkException(NetworkExceptionsKind.methodNotAllowed);
      case 409:
        return new NetworkException(NetworkExceptionsKind.conflict);
      case 408:
        return new NetworkException(NetworkExceptionsKind.requestTimeout);
      case 500:
        return new NetworkException(NetworkExceptionsKind.internalServerError);
      case 503:
        return new NetworkException(NetworkExceptionsKind.serviceUnavailable);
      default:
        return new NetworkException(
          NetworkExceptionsKind.defaultError,
          `Received invalid status code: ${status}`,
        );
    }
  }
}
