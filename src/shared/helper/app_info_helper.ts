import DeviceInfo from 'react-native-device-info';
import {Log} from 'shared/shared';
import {singleton} from 'tsyringe';

@singleton()
export class AppInfoHelper {
  async applicationId(): Promise<string> {
    return (await DeviceInfo.getAndroidId()) ?? '';
  }

  async appName(): Promise<string> {
    return (await DeviceInfo.getDeviceName()) ?? '';
  }

  versionCode(): string {
    return DeviceInfo.getVersion() ?? '';
  }

  async versionName(): Promise<string> {
    return (await DeviceInfo.getCodename()) ?? '';
  }

  async init(): Promise<void> {
    try {
      Log.d(await this.applicationId(), {name: 'APPLICATION_ID'});
      Log.d(await this.appName(), {name: 'APP_NAME'});
      Log.d(this.versionCode(), {name: 'VERSION_CODE'});
      Log.d(await this.versionName(), {name: 'VERSION_NAME'});
    } catch (error) {
      console.error('Error initializing AppInfo:', error);
    }
  }
}
