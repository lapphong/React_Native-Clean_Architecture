import {AppPopupInfo} from 'domain/domain';

export type PageRouteInfo = {
  name: string;
  params?: Record<string, unknown>;
};

export abstract class AppNavigator {
  constructor() {}

  abstract get canPopSelfOrChildren(): boolean;

  abstract get currentBottomTab(): number;

  abstract getCurrentRouteName(): string;

  abstract popUntilRootOfCurrentBottomTab(): void;

  abstract push(pageRouteInfo: PageRouteInfo): void;

  abstract replace(pageRouteInfo: PageRouteInfo): void;

  abstract replaceAll(pageRouteInfo: PageRouteInfo): void;

  abstract pop({result, useRootNavigator}: {result?: any; useRootNavigator?: boolean}): void;

  abstract popAndPush<T extends object | null, R extends object | null>(
    pageRouteInfo: PageRouteInfo,
    {result, useRootNavigator}: {result?: R | null; useRootNavigator?: boolean}, // false
  ): Promise<T | null>;

  abstract popUntilRoot({useRootNavigator}: {useRootNavigator?: boolean}): void; // false

  abstract popUntilRouteName(routeName: string): void;

  abstract removeUntilRouteName(routeName: string): boolean;

  abstract removeAllRoutesWithName(routeName: string): boolean;

  abstract removeLast(): boolean;

  abstract showDialog(appPopupInfo: AppPopupInfo): Promise<void>;

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
