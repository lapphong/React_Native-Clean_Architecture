import {Keyboard, findNodeHandle, UIManager, View} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {UiConstants} from 'shared/shared';

export class ViewUtils {
  static showAppSnackBar(
    message: string,
    duration?: number,
    textColor?: string,
    backgroundColor?: string,
  ): void {
    Snackbar.dismiss();
    Snackbar.show({
      text: message,
      duration: duration ?? Snackbar.LENGTH_SHORT,
      backgroundColor: backgroundColor ?? '#3E3E46',
      textColor: textColor ?? '#A6A8FE',
    });
  }

  static hideKeyboard(): void {
    Keyboard.dismiss();
  }

  //   static setPreferredOrientations(orientations: DeviceOrientation[]): void {
  //     if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  //       UIManager.setLayoutAnimationEnabledExperimental(true);
  //     }
  //     DeviceOrientation.lockAllAsync();
  //   }

  static setSystemUIOverlayStyle(): void {
    UiConstants.systemUiOverlay();
  }

  // **************************** Chưa Test ****************************
  static getWidgetPosition(ref: React.RefObject<View>): Promise<Offset | null> {
    return this.measureSingleDimension<Offset>(ref, (x, y) => ({x, y}));
  }

  static getWidgetWidth(ref: React.RefObject<View>): Promise<number | null> {
    return this.measureSingleDimension<number>(ref, (x, y, width) => width);
  }

  static getWidgetHeight(ref: React.RefObject<View>): Promise<number | null> {
    return this.measureSingleDimension<number>(ref, (x, y, width, height) => height);
  }

  private static measureSingleDimension<T>(
    ref: React.RefObject<View>,
    dimensionExtractor: (x: number, y: number, width: number, height: number) => T | null,
  ): Promise<T | null> {
    return new Promise<T | null>((resolve, reject) => {
      const handle = findNodeHandle(ref.current);
      if (!handle) {
        resolve(null);
        return;
      }

      UIManager.measure(handle, (x, y, width, height) => {
        resolve(dimensionExtractor(x, y, width, height));
      });
    });
  }
}

interface Offset {
  x: number;
  y: number;
}
