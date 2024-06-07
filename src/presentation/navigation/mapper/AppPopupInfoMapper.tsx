import {singleton} from 'tsyringe';
import {AppPopupInfo, AppNavigator} from 'domain/domain';
import {Alert} from 'react-native';

export abstract class PopupInfoMapper {
  abstract map(appPopupInfo: AppPopupInfo, navigator: AppNavigator): void;
}

@singleton()
export class AppPopupInfoMapper extends PopupInfoMapper {
  map(appPopupInfo: AppPopupInfo, navigator: AppNavigator): void {
    switch (appPopupInfo.type) {
      case 'confirmDialog':
        return Alert.alert('Thông báo', appPopupInfo.message, [
          {
            text: 'Ok',
            onPress: appPopupInfo.onPressed,
          },
          {
            text: 'Cancel',
            onPress: appPopupInfo.onCancel,
          },
        ]);
      case 'errorWithRetryDialog':
        return Alert.alert('Thông báo', appPopupInfo.message, [
          {
            text: 'Retry',
            onPress: appPopupInfo.onRetryPressed,
          },
          {
            text: 'Cancel',
            onPress: appPopupInfo.onCancel,
          },
        ]);
    }
  }
}
