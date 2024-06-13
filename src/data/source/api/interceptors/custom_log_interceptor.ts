import {AxiosError, AxiosResponse, InternalAxiosRequestConfig, isAxiosError} from 'axios';
import {BaseInterceptor} from 'data/data';
import {Log, LogConfig} from 'shared/shared';

export class CustomLogInterceptor extends BaseInterceptor {
  constructor(
    private enableLogRequestInfo: boolean = LogConfig.enableLogRequestInfo,
    private enableLogSuccessResponse: boolean = LogConfig.enableLogSuccessResponse,
    private enableLogErrorResponse: boolean = LogConfig.enableLogErrorResponse,
  ) {
    super();
  }

  static readonly _enableLogInterceptor = LogConfig.enableLogInterceptor;

  get priority(): number {
    return BaseInterceptor.customLogPriority;
  }

  onRequest(config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> {
    if (!CustomLogInterceptor._enableLogInterceptor || !this.enableLogRequestInfo) {
      return config;
    }

    const log: string[] = [];
    log.push('\n************ Request ************');
    log.push(`🌐 Request: [${config.method?.toUpperCase()}][${config.url}]`);
    if (config.headers && Object.keys(config.headers).length > 0) {
      log.push('🌐 Request Headers:');
      log.push(`🌐 ${this._prettyResponse(config.headers)}`);
    }

    if (config.data !== null && config.data !== undefined) {
      log.push('🌐 Request Body:');
      if (config.data instanceof FormData) {
        const data = config.data as FormData;
        const fileLogs: string[] = [];
        // if (data.getAll().length > 0) {
        //   for (const [key, value] of Array.from(data.getAll().entries())) {
        //     fileLogs.push(`${key}: ${value}`);
        //   }
        // }
        // if (data.getParts().length > 0) {
        //   const parts = data.getParts();
        //   for (const part of parts) {
        //     if ('uri' in part) {
        //       const fileInfo = `File name: ${part.name}, Content type: ${
        //         part.type || part.headers['Content-Type']
        //       }, Length: ${part.headers['Content-Length']}`;
        //       fileLogs.push(`🌐 ${part.name}: ${fileInfo}`);
        //     }
        //   }

        //   log.push(`🌐 Files: ${this._prettyResponse(fileLogs)}`);
        // }
      } else {
        log.push(`🌐 ${this._prettyResponse(config.data)}`);
      }
    }

    if (config.params !== null && config.params !== undefined) {
      log.push('🌐 Request QueryParameters:');
      log.push(`🌐 ${this._prettyResponse(config.params)}`);
    }
    log.push('***********************************');

    Log.d(log.join('\n'), {name: 'Request'});
    return config;
  }

  onResponse<T>(
    response: AxiosResponse<T, any>,
  ): AxiosResponse<T, any> | Promise<AxiosResponse<T, any>> {
    if (!CustomLogInterceptor._enableLogInterceptor || !this.enableLogSuccessResponse) {
      return response;
    }
    if (response.data === null) {
      Log.d(response.config.headers, {name: 'RESPONE'});
      return Promise.reject(AxiosError);
    }
    const log: string[] = [];
    log.push('\n************ Request Response ************');
    log.push(`🎉 Response: [${response.config.method}][${response.config.url}]`);
    log.push(`🎉 Request Body: ${this._prettyResponse(response.config.data)}`);
    log.push(`🎉 Request QueryParameters: ${this._prettyResponse(response.config.params)}`);
    log.push(`🎉 Success Code: ${response.status}`);
    log.push(`🎉 ${this._prettyResponse(response.data)}`);
    log.push('********************************************');

    Log.d(log.join('\n'), {name: 'Response'});
    return response;
  }

  onError(error: AxiosError): AxiosError | Promise<AxiosError> {
    if (isAxiosError(error)) {
      if (!CustomLogInterceptor._enableLogInterceptor || !this.enableLogErrorResponse) {
        return error;
      }
      const log: string[] = [];
      log.push('\n************ Request Error ************');
      log.push(`⛔️ Error: [${error.config!.method?.toUpperCase()}][${error.config!.url}]`);
      log.push(`⛔️ Error Code: ${error.response?.status ?? 'unknown status code'}`);
      log.push(`⛔️ Json: ${this._prettyResponse(error.response?.data ?? 'No response data')}`);
      log.push('*****************************************');

      Log.e(log.join('\n'), {name: 'Request Error'});
    }

    return Promise.reject(error);
  }

  private _prettyResponse(data: any): string {
    if (typeof data === 'object' && data !== null) {
      return Log.prettyJson(data as Record<string, any>);
    }

    return data;
  }
}
