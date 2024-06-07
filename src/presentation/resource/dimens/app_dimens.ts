import {Constants, Log, LogConfig} from 'shared/shared';

export enum ScreenType {
  mobile = 'mobile',
  tablet = 'tablet',
  ultraTablet = 'ultraTablet',
}

export class AppDimen {
  private constructor(
    public screenWidth: number,
    public screenHeight: number,
    public devicePixelRatio: number,
    public screenType: ScreenType,
  ) {}

  static current: AppDimen;

  static of(screenWidth: number, screenHeight: number, devicePixelRatio: number): AppDimen {
    const screenType = this._getScreenType(screenWidth);
    const screen = new AppDimen(screenWidth, screenHeight, devicePixelRatio, screenType);

    this.current = screen;
    if (LogConfig.enableGeneralLog) {
      Log.d(this.current.toString, {name: 'AppDimen'});
    }

    return this.current;
  }

  responsiveDimens({
    mobile,
    tablet,
    ultraTablet,
  }: {
    mobile: number;
    tablet?: number;
    ultraTablet?: number;
  }): number {
    switch (this.screenType) {
      case ScreenType.mobile:
        return mobile;
      case ScreenType.tablet:
        return tablet ?? (mobile * Constants.maxMobileWidth) / Constants.designDeviceWidth;
      case ScreenType.ultraTablet:
        return ultraTablet ?? (mobile * Constants.maxMobileWidth) / Constants.designDeviceWidth;
      default:
        return mobile;
    }
  }

  private static _getScreenType(screenWidth: number): ScreenType {
    if (screenWidth <= Constants.maxMobileWidth) {
      return ScreenType.mobile;
    } else if (screenWidth <= Constants.maxTabletWidth) {
      return ScreenType.tablet;
    } else {
      return ScreenType.ultraTablet;
    }
  }

  get toString(): string {
    return `{AppDimen: screenWidth = ${this.screenWidth}, screenHeight = ${this.screenHeight}, devicePixelRatio = ${this.devicePixelRatio}, screenType = ${this.screenType}}`;
  }
}

declare global {
  interface Number {
    responsive(options?: {tablet?: number; ultraTablet?: number}): number;
    rps: number;
  }
}

Number.prototype.responsive = function ({tablet, ultraTablet} = {}): number {
  return AppDimen.current.responsiveDimens({
    mobile: parseFloat((this as number).toString()),
    tablet,
    ultraTablet,
  });
};

Object.defineProperty(Number.prototype, 'rps', {
  get: function () {
    return this.responsive();
  },
});

// Usage example
// const mobileValueRps = 20?.rps;
// Or
// const mobileValueRps = (20).rps;
