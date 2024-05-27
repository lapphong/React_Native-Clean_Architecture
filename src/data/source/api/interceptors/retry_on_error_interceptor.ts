import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import {BaseInterceptor} from 'data/data';
import {Constants} from 'shared/shared';

export class RetryOnErrorInterceptor extends BaseInterceptor {
  constructor(private axiosInstance: AxiosInstance) {
    super();
  }

  readonly _retryHeaderKey = 'isRetry';
  readonly _retryCountKey = 'retryCount';

  get priority(): number {
    return BaseInterceptor.retryOnErrorPriority;
  }

  onRequest(config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> {
    if (config.headers && !(this._retryHeaderKey in config.headers)) {
      config.headers[this._retryCountKey] = Constants.maxRetries;
    }

    return config;
  }

  async onError(error: AxiosError): Promise<AxiosError | AxiosResponse<unknown, any>> {
    if (error.config!.headers[this._retryCountKey] !== null) {
      const retryCount: number = error.config!.headers[this._retryCountKey] as number;
      if (retryCount > 0 && this._shouldRetry(error)) {
        await new Promise<void>(resolve => setTimeout(resolve, Constants.retryInterval));
        const response = await this.axiosInstance.request({
          headers: {
            ...error.config!.headers,
            [this._retryHeaderKey]: true,
            [this._retryCountKey]: retryCount - 1,
          },
          method: error.config?.method,
          url: error.config?.url,
          data: error.config?.data,
          params: error.config?.params,
        });
        if (isAxiosError(response)) {
          return Promise.reject(error);
        }
        return Promise.resolve(response);
      }
    }
    return Promise.reject(error);
  }

  _shouldRetry = (error: AxiosError): boolean =>
    error.code !== AxiosError.ERR_CANCELED &&
    error.code !== AxiosError.ERR_BAD_RESPONSE &&
    (error.code === AxiosError.ETIMEDOUT || error.code === AxiosError.ECONNABORTED);
}
