import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

export abstract class BaseInterceptor {
  static readonly retryOnErrorPriority: number = 100; // add first
  static readonly connectivityPriority: number = 99; // add second
  static readonly basicAuthPriority: number = 40;
  static readonly refreshTokenPriority: number = 30;
  static readonly apiTokenPriority: number = 20;
  static readonly customLogPriority: number = 1; // add last

  abstract get priority(): number;

  onRequest?(
    config: InternalAxiosRequestConfig<any>,
  ): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>;

  onResponse?<T>(
    response: AxiosResponse<T, any>,
  ): AxiosResponse<T, any> | Promise<AxiosResponse<T, any>>;

  onError?(error: AxiosError): AxiosError | Promise<AxiosError | AxiosResponse>;
}
