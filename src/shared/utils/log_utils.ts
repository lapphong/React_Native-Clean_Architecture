import {DateTimeUtils, LogConfig} from 'shared/shared';

export enum LogColor {
  bright = '\x1b[1m',
  black = '\x1B[30m',
  white = '\x1B[37m',
  red = '\x1b[31m',
  green = '\x1B[32m',
  yellow = '\x1B[33m',
  blue = '\x1B[34m',
  puple = '\x1B[38;2;118;74;188m',
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

  static readonly maxNameLength = 25;
  private static padName(name: string, logPosition: number): string {
    const nameWithBrackets = `[${name}]`;
    const paddingNeeded = logPosition - nameWithBrackets.length;
    return nameWithBrackets + ' '.repeat(paddingNeeded > 0 ? paddingNeeded : 0);
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
      const paddedName = this.padName(name, this.maxNameLength);
      console.log(
        LogColor.bright + LogColor.yellow + `[${time}]` + color + paddedName + ' | ' + message,
      );

      if (error) console.error(LogColor.bright + LogColor.red + error);

      if (stackTrace) console.error(LogColor.bright + LogColor.red + stackTrace);
    }
  }
}
