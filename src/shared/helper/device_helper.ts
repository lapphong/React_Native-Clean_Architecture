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
  get deviceId(): Promise<string> {
    if (Platform.OS === 'ios') {
      return DeviceInfo.getUniqueId();
    } else {
      return DeviceInfo.getAndroidId().then(androidID => androidID ?? '');
    }
  }

  get deviceModelName(): Promise<string> {
    if (Platform.OS === 'ios') {
      return DeviceInfo.getDevice().then(iosInfo => iosInfo ?? '');
    } else {
      const deviceBrand: string = DeviceInfo.getBrand() + ' ';
      const androidInfo = DeviceInfo.getDevice().then(
        device => deviceBrand + device ?? deviceBrand,
      );

      return androidInfo;
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
