import {AppInfoHelper, EnvConstants} from 'shared/shared';
import {DI_Type, container} from './di';

export class AppInitializer {
  static async init(): Promise<void> {
    EnvConstants.init();
    await container.resolve<AppInfoHelper>(DI_Type.AppInfoHelper).init();

    // ViewUtils.setSystemUIOverlayStyle();
    // await SystemChrome.setPreferredOrientations(
    //   getIt.get<DeviceHelper>().deviceType == DeviceType.mobile
    //       ? Constant.mobileOrientation
    //       : Constant.tabletOrientation,
    // );
  }
}
