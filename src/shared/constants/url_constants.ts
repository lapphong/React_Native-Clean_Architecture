import {EnvConstants, Flavor} from 'shared/shared';

class UrlConstants {
  private constructor() {}

  /// Url
  // static readonly termUrl = 'https://www.chatwork.com/';
  // static readonly lineApiBaseUrl = 'https://api.line.me/';
  // static readonly twitterApiBaseUrl = 'https://api.twitter.com/';
  // static readonly goongApiBaseUrl = 'https://rsapi.goong.io/';
  // static readonly firebaseStorageBaseUrl = 'https://firebasestorage.googleapis.com/';

  // static readonly mockApiBaseUrl = 'https://api.jsonbin.io/';

  /// Path
  // static readonly remoteConfigPath = '/config/RemoteConfig.json';
  // static readonly settingsPath = '/mypage/settings';

  static get appApiBaseUrl(): string {
    switch (EnvConstants.flavor) {
      case Flavor.develop:
        return 'https://sos-backend.smartlook.com.vn:50003/';
      case Flavor.qa:
        return 'https://sos-backend.smartlook.com.vn:50003/';
      case Flavor.staging:
        return 'https://sos-backend.smartlook.com.vn:50003/';
      case Flavor.production:
        return 'https://sos-backend.smartlook.com.vn:50003/';
    }
  }
}

export default UrlConstants;