import {StatusBar} from 'react-native';

class UiConstants {
  private constructor() {}

  /// shimmer
  static readonly shimmerItemCount = 20;

  /// material app
  static readonly materialAppTitle = 'Base Clean_Architecture';

  static readonly taskMenuMaterialAppColor = '#999aff';

  // /// orientation
  // static mobileOrientation = [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown];

  // static tabletOrientation = [
  //   DeviceOrientation.portraitUp,
  //   DeviceOrientation.portraitDown,
  //   DeviceOrientation.landscapeLeft,
  //   DeviceOrientation.landscapeRight,
  // ];

  static readonly systemUiOverlay = () => {
    StatusBar.setBackgroundColor('#999aff');
    StatusBar.setBarStyle('light-content');
  };

  static readonly textFieldTextStyleHeight = 1.3;
}

export default UiConstants;
