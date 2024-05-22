import {container} from 'tsyringe';
import {AppInfoHelper, ConnectivityHelper, DeviceHelper} from 'shared/shared';

export enum DI_Type {
  ConnectivityHelper = 'ConnectivityHelper',
  AppInfoHelper = 'AppInfoHelper',
  DeviceHelper = 'DeviceHelper',
}

container.registerSingleton<ConnectivityHelper>(DI_Type.ConnectivityHelper, ConnectivityHelper);
container.registerSingleton<AppInfoHelper>(DI_Type.AppInfoHelper, AppInfoHelper);
container.registerSingleton<DeviceHelper>(DI_Type.DeviceHelper, DeviceHelper);
