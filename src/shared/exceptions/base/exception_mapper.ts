import {AppException} from 'shared/shared';

export abstract class ExceptionMapper<T extends AppException> {
  abstract map(exception: any): T;
}
