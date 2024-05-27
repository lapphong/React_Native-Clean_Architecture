import {singleton} from 'tsyringe';
import {
  ApiTokenInterceptor,
  AppPreferences,
  AxiosBuilder,
  AxiosRestApi,
  ConnectivityInterceptor,
  CustomLogInterceptor,
  RetryOnErrorInterceptor,
} from 'data/data';
import {DI_Type, container} from 'initializer/di';
import {
  AppInfoHelper,
  ConnectivityHelper,
  DeviceHelper,
  LogConfig,
  UrlConstants,
} from 'shared/shared';

@singleton()
export class NetworkingFactory extends AxiosRestApi {
  constructor() {
    super(
      AxiosBuilder.createAxiosInstance({baseURL: UrlConstants.appApiBaseUrl}, axios => {
        const interceptors = [];
        if (LogConfig.logApi) {
          interceptors.push(new CustomLogInterceptor());
        }
        interceptors.push(
          new ConnectivityInterceptor(
            container.resolve<ConnectivityHelper>(DI_Type.ConnectivityHelper),
          ),
          new RetryOnErrorInterceptor(axios),
          new ApiTokenInterceptor(
            container.resolve<AppInfoHelper>(DI_Type.AppInfoHelper),
            container.resolve<DeviceHelper>(DI_Type.DeviceHelper),
            container.resolve<AppPreferences>(DI_Type.AppPreferences),
          ),
          // RefreshTokenInterceptor(dio, getIt.get<AppPreferences>()),
        );
        return interceptors;
      }),
    );
  }
}
