import {injectable, inject} from 'tsyringe';
import {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {AxiosErrorMapper, BaseInterceptor} from 'data/data';
import {ConnectivityHelper} from 'shared/shared';
import {container, DI_Type} from 'initializer/initializer';

@injectable()
export class ConnectivityInterceptor extends BaseInterceptor {
  constructor(@inject('ConnectivityHelper') private _connectivityHelper: ConnectivityHelper) {
    super();
  }

  get priority(): number {
    return BaseInterceptor.connectivityPriority;
  }

  async onRequest(
    config: InternalAxiosRequestConfig<any>,
  ): Promise<InternalAxiosRequestConfig<any>> {
    if (!(await this._connectivityHelper.isNetworkAvailable)) {
      const error: AxiosError = {
        code: AxiosError.ERR_NETWORK,
        name: 'ConnectivityError',
        message: 'No Internet Connection',
        isAxiosError: true,
        toJSON: () => ({code: AxiosError.ERR_NETWORK}),
      };
      throw container.resolve<AxiosErrorMapper>(DI_Type.AxiosErrorMapper).map(error);
    }
    return config;
  }
}
