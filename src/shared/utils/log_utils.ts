import {LogConfig} from 'shared/shared';

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
    {color = LogColor.cyan, name = '', time}: {color?: LogColor; name?: string; time?: Date} = {},
  ): void {
    this._log(`💡 ${message}`, {color, name, time});
  }

  static e(
    errorMessage: any,
    {
      color = LogColor.red,
      name = '',
      errorObject,
      stackTrace,
      time,
    }: {color?: LogColor; name?: string; errorObject?: any; stackTrace?: string; time?: Date} = {},
  ): void {
    this._log(`💢 ${errorMessage}`, {color, name, errorObject, stackTrace, time});
  }

  static prettyJson(json: {[key: string]: any}): string {
    const indent = '  '.repeat(2);
    const prettyJson = JSON.stringify(json, null, indent);

    return prettyJson;
  }

  private static _log(
    message: string,
    {
      color = LogColor.cyan,
      name = '',
      time,
      error,
      stackTrace,
      errorObject,
    }: {
      color?: LogColor;
      name?: string;
      time?: Date;
      error?: any;
      stackTrace?: string;
      errorObject?: any;
    } = {},
  ): void {
    if (this._enableLog) {
      const timeLog = time ? ` [Time:${time}]` : '';

      console.log(LogColor.bright + color + `[${name}] ` + message + timeLog);

      if (error) console.error(LogColor.bright + LogColor.red + error + timeLog);

      if (stackTrace) console.error(LogColor.bright + LogColor.red + stackTrace + timeLog);
    }
  }
}
