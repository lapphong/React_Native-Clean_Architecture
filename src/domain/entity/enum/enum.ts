import {Constants} from 'shared/shared';

export enum Gender {
  male = Constants.male,
  female = Constants.female,
  other = Constants.other,
  unknown = Constants.unknown,
}

export namespace Gender {
  export const defaultValue: Gender = Gender.unknown;

  export function toJson(gender: Gender): string {
    return Gender[gender];
  }
}

export enum LanguageCode {
  en = 'en',
  ja = 'ja',
}

export namespace LanguageCode {
  export const defaultValue: LanguageCode = LanguageCode.ja;
}

export enum BottomTab {
  home = 'home',
  notifications = 'notifications',
  setting = 'settings',
}

export namespace BottomTab {
  export interface TabIcon {
    icon: BottomTab;
    activeIcon: BottomTab;
  }

  export const tabIcons: Record<BottomTab, TabIcon> = {
    home: {
      icon: BottomTab.home,
      activeIcon: BottomTab.home,
    },
    notifications: {
      icon: BottomTab.notifications,
      activeIcon: BottomTab.notifications,
    },
    settings: {
      icon: BottomTab.setting,
      activeIcon: BottomTab.setting,
    },
  };

  export function getLabel(tab: BottomTab): string {
    switch (tab) {
      case BottomTab.home:
        return 'Home';
      case BottomTab.notifications:
        return 'Noti';
      case BottomTab.setting:
        return 'Setting';
      default:
        return '';
    }
  }
}
