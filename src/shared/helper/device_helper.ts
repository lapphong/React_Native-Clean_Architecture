import {singleton} from 'tsyringe';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Dimensions} from 'react-native';

export enum DeviceType {
  mobile,
  tablet,
}

@singleton()
export class DeviceHelper {
  async deviceId(): Promise<string> {
    if (Platform.OS === 'ios') {
      return await DeviceInfo.getUniqueId();
    } else {
      const androidID = await DeviceInfo.getAndroidId();
      return androidID || '';
    }
  }

  async deviceModelName(): Promise<string> {
    if (Platform.OS === 'ios') {
      const iosInfo = await DeviceInfo.getDevice();
      return iosInfo || '';
    } else {
      const androidInfo = DeviceInfo.getBrand() + ' ' + (await DeviceInfo.getDevice());
      return androidInfo || '';
    }
  }

  get deviceType(): DeviceType {
    const {width} = Dimensions.get('window');
    const maxMobileWidthForDeviceType = 550;

    return width < maxMobileWidthForDeviceType ? DeviceType.mobile : DeviceType.tablet;
  }

  get operatingSystem(): string {
    return Platform.OS;
  }
}
