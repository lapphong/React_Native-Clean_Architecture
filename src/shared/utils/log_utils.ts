import {DateTimeUtils, LogConfig} from 'shared/shared';

enum LogColor {
  bright = '\x1b[1m',
  black = '\x1B[30m',
  white = '\x1B[37m',
  red = '\x1b[31m',
  green = '\x1B[32m',
  yellow = '\x1B[33m',
  blue = '\x1B[34m',
  cyan = '\x1B[36m',
}

export class Log {
  private constructor() {}

  static readonly _enableLog = LogConfig.enableGeneralLog;

  static d(
    message: any,
    {color = LogColor.cyan, name = ''}: {color?: LogColor; name?: string} = {},
  ): void {
    this._log(`💡 ${message}`, {color, name});
  }

  static e(
    errorMessage: any,
    {
      color = LogColor.red,
      name = '',
      errorObject,
      stackTrace,
    }: {color?: LogColor; name?: string; errorObject?: any; stackTrace?: string} = {},
  ): void {
    this._log(`💢 ${errorMessage}`, {color, name, errorObject, stackTrace});
  }

  static prettyJson(json: {[key: string]: any}): string {
    const prettyJson = JSON.stringify(json, null, 4);
    return prettyJson.replace(/^{/, '{').replace(/}$/, '}').replace(/\n/g, '\n   ');
  }

  private static _log(
    message: string,
    {
      color = LogColor.cyan,
      name = '',
      error,
      stackTrace,
      errorObject,
    }: {
      color?: LogColor;
      name?: string;
      error?: any;
      stackTrace?: string;
      errorObject?: any;
    } = {},
  ): void {
    if (this._enableLog) {
      const time = DateTimeUtils.getCurrentTimeFormatted();
      console.log(
        LogColor.bright + LogColor.yellow + `[${time}]` + color + `[${name}]\t| ` + message,
      );

      if (error) console.error(LogColor.bright + LogColor.red + error);

      if (stackTrace) console.error(LogColor.bright + LogColor.red + stackTrace);
    }
  }
}
