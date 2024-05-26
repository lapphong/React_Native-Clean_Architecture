import 'reflect-metadata';
import {container} from 'tsyringe';
import {AppInfoHelper, ConnectivityHelper, DeviceHelper} from 'shared/shared';
import {
  AppNavigator,
  AppRepository,
  AppUsecase,
  AuthRepository,
  AuthUsecase,
  NotiRepository,
  NotiUsecase,
} from 'domain/domain';
import {
  ApiTokenInterceptor,
  AppPreferences,
  AppRepositoryImpl,
  AuthRepositoryImpl,
  AxiosErrorMapper,
  ConnectivityInterceptor,
  NetworkingFactory,
  NotiRepositoryImpl,
} from 'data/data';
import {AppNavigatorImpl} from 'presentation/presentation';

export enum DI_Type {
  NetworkingFactory = 'NetworkingFactory',
  AxiosErrorMapper = 'AxiosErrorMapper',
  ConnectivityHelper = 'ConnectivityHelper',
  AppInfoHelper = 'AppInfoHelper',
  ConnectivityInterceptor = 'ConnectivityInterceptor',
  DeviceHelper = 'DeviceHelper',
  AppNavigator = 'AppNavigator',
  AppPreferences = 'AppPreferences',
  AppRepository = 'AppRepository',
  AppUsecase = 'AppUsecase',
  ApiTokenInterceptor = 'ApiTokenInterceptor',
  AuthRepository = 'AuthRepository',
  AuthUsecase = 'AuthUsecase',
  NotiRepository = 'NotiRepository',
  NotiUsecase = 'NotiUsecase',
}

container.registerSingleton<NetworkingFactory>(DI_Type.NetworkingFactory, NetworkingFactory);
container.registerSingleton<AxiosErrorMapper>(DI_Type.AxiosErrorMapper, AxiosErrorMapper);
container.registerSingleton<AppInfoHelper>(DI_Type.AppInfoHelper, AppInfoHelper);
container.registerSingleton<ConnectivityHelper>(DI_Type.ConnectivityHelper, ConnectivityHelper);
container.register<ConnectivityInterceptor>(DI_Type.ConnectivityInterceptor, {
  useFactory: c =>
    new ConnectivityInterceptor(c.resolve<ConnectivityHelper>(DI_Type.ConnectivityHelper)),
});
container.registerSingleton<DeviceHelper>(DI_Type.DeviceHelper, DeviceHelper);
container.register<AppNavigator>(DI_Type.AppNavigator, {
  useFactory: c => new AppNavigatorImpl(),
});
container.registerSingleton<AppPreferences>(DI_Type.AppPreferences, AppPreferences);
container.register<AppRepository>(DI_Type.AppRepository, {
  useFactory: c => new AppRepositoryImpl(c.resolve<AppPreferences>(DI_Type.AppPreferences)),
});
container.register<AppUsecase>(DI_Type.AppUsecase, {
  useFactory: c =>
    new AppUsecase(
      c.resolve<AppRepository>(DI_Type.AppRepository),
      c.resolve<AppNavigator>(DI_Type.AppNavigator),
    ),
});
container.register<ApiTokenInterceptor>(DI_Type.ApiTokenInterceptor, {
  useFactory: c =>
    new ApiTokenInterceptor(
      c.resolve<AppInfoHelper>(DI_Type.AppInfoHelper),
      c.resolve<DeviceHelper>(DI_Type.DeviceHelper),
      c.resolve<AppPreferences>(DI_Type.AppPreferences),
    ),
});
container.register<AuthRepository>(DI_Type.AuthRepository, {
  useFactory: c =>
    new AuthRepositoryImpl(
      c.resolve<NetworkingFactory>(DI_Type.NetworkingFactory),
      c.resolve<AppPreferences>(DI_Type.AppPreferences),
    ),
});
container.register<AuthUsecase>(DI_Type.AuthUsecase, {
  useFactory: c => new AuthUsecase(c.resolve<AuthRepository>(DI_Type.AuthRepository)),
});
container.register<NotiRepository>(DI_Type.NotiRepository, {
  useFactory: c => new NotiRepositoryImpl(c.resolve<NetworkingFactory>(DI_Type.NetworkingFactory)),
});
container.register<NotiUsecase>(DI_Type.NotiUsecase, {
  useFactory: c => new NotiUsecase(c.resolve<NotiRepository>(DI_Type.NotiRepository)),
});

export {container};
