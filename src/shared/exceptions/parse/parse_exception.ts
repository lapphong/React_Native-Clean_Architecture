import {AppException, AppExceptionType} from '../../shared';

export class ParseException extends AppException {
  constructor(public kind: ParseExceptionKind, public rootException: any) {
    super(AppExceptionType.parse);
  }

  get message(): string {
    switch (this.kind) {
      case ParseExceptionKind.invalidSourceFormat:
        return 'Lỗi phân tích dữ liệu';
    }
  }

  toString(): string {
    return `ParseException: {kind: ${this.kind}, rootException: ${this.rootException}}`;
  }
}

export enum ParseExceptionKind {
  invalidSourceFormat,
}
