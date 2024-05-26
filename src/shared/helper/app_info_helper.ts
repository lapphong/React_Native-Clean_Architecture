import DeviceInfo from 'react-native-device-info';
import {Log} from 'shared/shared';
import {singleton} from 'tsyringe';

@singleton()
export class AppInfoHelper {
  get applicationId(): Promise<string> {
    return DeviceInfo.getAndroidId() ?? '';
  }

  get appName(): Promise<string> {
    return DeviceInfo.getDeviceName() ?? '';
  }

  get versionCode(): string {
    return DeviceInfo.getVersion() ?? '';
  }

  get versionName(): Promise<string> {
    return DeviceInfo.getCodename() ?? '';
  }

  async init(): Promise<void> {
    try {
      Log.d(await this.applicationId, {name: 'APPLICATION_ID'});
      Log.d(await this.appName, {name: 'APP_NAME'});
      Log.d(this.versionCode, {name: 'VERSION_CODE'});
      Log.d(await this.versionName, {name: 'VERSION_NAME'});
    } catch (error) {
      console.error('Error initializing AppInfo:', error);
    }
  }
}
