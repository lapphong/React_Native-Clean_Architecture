import {
  AppException,
  AppExceptionType,
  NetworkExceptions,
  NetworkExceptionsKind,
} from 'shared/shared';

export class NetworkException extends AppException {
  constructor(public kind: NetworkExceptions) {
    super(AppExceptionType.remote);
  }

  get message(): string {
    switch (this.kind.type) {
      case NetworkExceptionsKind.requestCancelled:
        return `Yêu cầu đã bị hủy`;
      case NetworkExceptionsKind.unauthorizedRequest:
        return `Yêu cầu không được phép ${this.kind.reason}`;
      case NetworkExceptionsKind.badRequest:
        return `Yêu cầu không hợp lệ ${this.kind.reason}`;
      case NetworkExceptionsKind.notFound:
        return `Không tìm thấy ${this.kind.reason}`;
      case NetworkExceptionsKind.methodNotAllowed:
        return `Phương thức không được phép`;
      case NetworkExceptionsKind.requestTimeout:
        return `Yêu cầu đã hết thời gian chờ`;
      case NetworkExceptionsKind.sendTimeout:
        return `Yêu cầu đã hết thời gian gửi`;
      case NetworkExceptionsKind.conflict:
        return `Xung đột`;
      case NetworkExceptionsKind.internalServerError:
        return `Lỗi máy chủ nội bộ`;
      case NetworkExceptionsKind.notImplemented:
        return `Chưa được triển khai`;
      case NetworkExceptionsKind.serviceUnavailable:
        return `Dịch vụ không khả dụng`;
      case NetworkExceptionsKind.noInternetConnection:
        return `Không có kết nối internet`;
      case NetworkExceptionsKind.refreshTokenFailed:
        return `Token Expired`;
      case NetworkExceptionsKind.formatExceptions:
        return `Lỗi định dạng`;
      case NetworkExceptionsKind.unableToProcess:
        return `Không thể xử lý yêu cầu`;
      case NetworkExceptionsKind.defaultError:
        return `Lỗi mặc định ${this.kind.reason}`;
      case NetworkExceptionsKind.unexpectedError:
        return `Lỗi không mong đợi`;
    }
  }

  toString(): string {
    return `NetworkException: {kind: ${this.kind.type}}`;
  }
}
