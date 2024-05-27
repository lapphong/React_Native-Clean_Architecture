import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {BaseInterceptor} from 'data/data';
import {Constants, UrlConstants} from 'shared/shared';

export class AxiosBuilder {
  static createAxiosInstance(
    options?: AxiosRequestConfig,
    interceptors?: (axiosInstance: AxiosInstance) => BaseInterceptor[],
  ): AxiosInstance {
    const axiosInstance = axios.create({
      timeout: options?.timeout ?? Constants.connectTimeout,
      baseURL: options?.baseURL ?? UrlConstants.appApiBaseUrl,
    });

    const sortedInterceptors = (interceptors?.(axiosInstance) ?? []).sort(
      (a, b) => (b.priority || -1) - (a.priority || -1),
    );

    sortedInterceptors.forEach(interceptor => {
      axiosInstance.interceptors.request.use(interceptor.onRequest?.bind(interceptor));

      axiosInstance.interceptors.response.use(
        interceptor.onResponse?.bind(interceptor),
        interceptor.onError?.bind(interceptor),
      );
    });

    return axiosInstance;
  }
}
