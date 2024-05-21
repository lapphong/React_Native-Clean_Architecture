import {ParseException, ParseExceptionKind} from 'shared/shared';

export class ParseUtils {
  private constructor() {}

  static parseStringToInt(value: string): number {
    try {
      return parseInt(value, 10);
    } catch (e) {
      throw new ParseException(ParseExceptionKind.invalidSourceFormat, (e as Error).message);
    }
  }

  static parseStringToDouble(value: string): number {
    try {
      return parseFloat(value);
    } catch (e) {
      throw new ParseException(ParseExceptionKind.invalidSourceFormat, (e as Error).message);
    }
  }
}
