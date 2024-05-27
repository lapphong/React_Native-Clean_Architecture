import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {AxiosErrorMapper} from 'data/data';
import {DI_Type, container} from 'initializer/initializer';

export enum RestMethod {
  get,
  post,
  put,
  patch,
  delete,
}

export class AxiosRestApi {
  constructor(private axiosInstance: AxiosInstance) {}

  async request<T>({
    method,
    path,
    queryParameters,
    body,
    decoder = false,
    options,
  }: {
    method: RestMethod;
    path: string;
    queryParameters?: Record<string, any>;
    body?: any;
    decoder?: boolean;
    options?: AxiosRequestConfig;
  }): Promise<T | null> {
    try {
      const response = await this._requestByMethod({
        method,
        path: path.startsWith(options?.baseURL!) ? path.substring(options?.baseURL!.length!) : path,
        queryParameters,
        body,
        options,
      });

      if (response.data === null) {
        return null;
      }

      if (decoder) {
        return JSON.parse(response.data) as T;
      }

      return response.data as T;
    } catch (error) {
      throw container.resolve<AxiosErrorMapper>(DI_Type.AxiosErrorMapper).map(error);
    }
  }

  private async _requestByMethod({
    method,
    path,
    queryParameters,
    body,
    options,
  }: {
    method: RestMethod;
    path: string;
    queryParameters?: Record<string, any>;
    body?: any;
    options?: AxiosRequestConfig;
  }): Promise<AxiosResponse<any>> {
    switch (method) {
      case RestMethod.get:
        return this.axiosInstance.get(path, {params: queryParameters, ...options});
      case RestMethod.post:
        return this.axiosInstance.post(path, body, {params: queryParameters, ...options});
      case RestMethod.patch:
        return this.axiosInstance.patch(path, body, {params: queryParameters, ...options});
      case RestMethod.put:
        return this.axiosInstance.put(path, body, {params: queryParameters, ...options});
      case RestMethod.delete:
        return this.axiosInstance.delete(path, {params: queryParameters, ...options});
    }
  }
}
