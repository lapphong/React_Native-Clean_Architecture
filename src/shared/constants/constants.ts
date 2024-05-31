class Constants {
  private constructor() {}

  // QueryClient
  static readonly staleTime = 5 * 60 * 1000;
  static readonly gcTime = 10 * 60 * 1000;
  static readonly refetchOnWindowFocus = false;
  static readonly refetchOnReconnect = true;
  static readonly refetchInterval = false;

  // Header
  static readonly basicAuthorization = 'Authorization';
  static readonly jwtAuthorization = 'JWT-Authorization';
  static readonly userAgentKey = 'User-Agent';
  static readonly bearer = 'Bearer';

  // API config
  static readonly connectTimeout = 30 * 1000; // milliseconds
  static readonly receiveTimeout = 30 * 1000; // milliseconds
  static readonly sendTimeout = 30 * 1000; // milliseconds
  static maxRetries = 3;
  static retryInterval = 3 * 1000; // milliseconds

  // Firebase
  static readonly myCollection = 'myCollection';

  // Device
  static readonly designDeviceWidth = 375.0;
  static readonly designDeviceHeight = 667.0;

  static readonly maxMobileWidth = 450;
  static readonly maxTabletWidth = 900;

  static readonly maxMobileWidthForDeviceType = 550;

  // Paging
  static readonly initialPage = 1;
  static readonly itemsPerPage = 30;
  static readonly defaultInvisibleItemsThreshold = 3;

  // SharedPreferenceKeys
  static readonly accessToken = 'accessToken';
  static readonly refreshToken = 'refreshToken';
  static readonly currentUser = 'currentUser';
  static readonly isDarkMode = 'isDarkMode';
  static readonly deviceToken = 'deviceToken';
  static readonly isFirstLogin = 'isFirstLogin';
  static readonly isFirstLaunchApp = 'isFirstLaunchApp';
  static readonly languageCode = 'languageCode';

  // Duration
  static readonly defaultListGridTransitionDuration = 500; // milliseconds
  static readonly defaultEventTransformDuration = 500; // milliseconds
  static readonly defaultGeneralDialogTransitionDuration = 200; // milliseconds
  static readonly defaultSnackBarDuration = 3 * 1000; // milliseconds
  static readonly defaultErrorVisibleDuration = 3 * 1000; // milliseconds
  static readonly defaultSuccessVisibleDuration = 1 * 1000; // milliseconds

  // DateTime Format
  static readonly uiDateDmy = 'dd/MM/yyyy';
  static readonly uiTimeHm = 'HH:mm';
  static readonly uiDateTime = 'dd/MM/yyyy HH:mm';

  static readonly appServerRequest = 'yyyy-MM-dd';

  static readonly appServerResponse: string | null = null; // null <=> Iso8601
  static readonly defaultFormat = '#,###';

  // Locale && Response
  static readonly en = 'en';
  static readonly ja = 'ja';
  static readonly defaultLocale = 'en';
  static readonly male = 0;
  static readonly female = 1;
  static readonly other = 2;
  static readonly unknown = -1;
}

export default Constants;
