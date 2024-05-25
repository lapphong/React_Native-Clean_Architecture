import DeviceInfo from 'react-native-device-info';
import {Log} from 'shared/shared';
import {singleton} from 'tsyringe';

@singleton()
export class AppInfoHelper {
  get applicationId(): Promise<string> {
    return DeviceInfo.getAndroidId().then(value => value ?? '');
  }

  get appName(): Promise<string> {
    return DeviceInfo.getDeviceName().then(value => value ?? '');
  }

  get versionCode(): string {
    return DeviceInfo.getVersion() ?? '';
  }

  get versionName(): Promise<string> {
    return DeviceInfo.getCodename().then(value => value ?? '');
  }

  async init(): Promise<void> {
    try {
      Log.d(this.applicationId, {name: 'APPLICATION_ID'});
      Log.d(this.appName, {name: 'APP_NAME'});
      Log.d(this.versionCode, {name: 'VERSION_CODE'});
      Log.d(this.versionName, {name: 'VERSION_NAME'});
    } catch (error) {
      console.error('Error initializing AppInfo:', error);
    }
  }
}
