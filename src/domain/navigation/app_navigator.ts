import {AppPopupInfo} from 'domain/domain';

export type PageRouteInfo = {
  name: string;
  params?: Record<string, unknown>;
};

export abstract class AppNavigator {
  constructor() {}

  abstract get canPopSelfOrChildren(): boolean;

  abstract get currentBottomTab(): number;

  abstract getCurrentRouteName(useRootNavigator?: boolean): string; // false

  abstract popUntilRootOfCurrentBottomTab(): void;

  abstract navigateToBottomTab(index: number, notify?: boolean): void; // true

  abstract push<T extends object | null>(pageRouteInfo: PageRouteInfo): Promise<T | null>;

  abstract replace<T extends object | null>(pageRouteInfo: PageRouteInfo): Promise<T | null>;

  abstract replaceAll(listRouteInfo: PageRouteInfo[]): Promise<void>;

  abstract pop<T extends object | null>({
    result,
    useRootNavigator, // false
  }: {
    result?: T | null;
    useRootNavigator?: boolean;
  }): Promise<boolean>;

  abstract popAndPush<T extends object | null, R extends object | null>(
    pageRouteInfo: PageRouteInfo,
    {result, useRootNavigator}: {result?: R | null; useRootNavigator?: boolean}, // false
  ): Promise<T | null>;

  abstract popUntilRoot({useRootNavigator}: {useRootNavigator?: boolean}): void; // false

  abstract popUntilRouteName(routeName: string): void;

  abstract removeUntilRouteName(routeName: string): boolean;

  abstract removeAllRoutesWithName(routeName: string): boolean;

  abstract removeLast(): boolean;

  abstract showDialog<T extends object | null>(
    appPopupInfo: AppPopupInfo,
    {
      barrierDismissible, // true
      useSafeArea, // false
      useRootNavigator, // true
    }: {
      barrierDismissible?: boolean;
      useSafeArea?: boolean;
      useRootNavigator?: boolean;
    },
  ): Promise<T | null>;

  abstract showGeneralDialog<T extends object | null>(
    appPopupInfo: AppPopupInfo,
    {
      transitionBuilder,
      transitionDuration, // Constants.defaultGeneralDialogTransitionDuration,
      barrierDismissible, // true
      barrierColor, // '0x80000000'
      useRootNavigator, // true
    }: {
      transitionBuilder?: (
        context: any,
        animation: any,
        secondaryAnimation: any,
        child: JSX.Element,
      ) => JSX.Element;
      transitionDuration?: number;
      barrierDismissible?: boolean;
      barrierColor?: string;
      useRootNavigator?: boolean;
    },
  ): Promise<T | null>;

  abstract showModalBottomSheet<T extends object | null>(
    appPopupInfo: AppPopupInfo,
    {
      isScrollControlled, // false
      useRootNavigator, // fasle
      isDismissible, // true
      enableDrag, // true
      barrierColor, // '#000000'
      backgroundColor,
    }: {
      isScrollControlled?: boolean;
      useRootNavigator?: boolean;
      isDismissible?: boolean;
      enableDrag?: boolean;
      barrierColor?: string;
      backgroundColor?: string;
    },
  ): Promise<T | null>;

  abstract showErrorSnackBar(message: string, duration?: number): void;

  abstract showSuccessSnackBar(message: string, duration?: number): void;
}
