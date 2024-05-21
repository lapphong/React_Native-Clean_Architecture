import * as clock from 'clock';
import moment from 'moment';

export class DateTimeUtils {
  private constructor() {}

  static daysBetween(from: Date, to: Date): number {
    const fromWithoutTime = moment(from).startOf('day');
    const toWithoutTime = moment(to).startOf('day');

    return toWithoutTime.diff(fromWithoutTime, 'days');
  }

  static timezoneOffset(): number {
    return moment().utcOffset() / 60;
  }

  static utcToLocal(utcTimestampMillis: number): Date {
    return moment.utc(utcTimestampMillis).local().toDate();
  }

  static localToUtc(localTimestampMillis: number): Date {
    return moment(localTimestampMillis).utc().toDate();
  }

  static tryParse(
    dateTime: string | null,
    options?: {utc?: boolean; format?: string},
  ): Date | null {
    if (dateTime === null) return null;

    if (!options || !options.format) return moment(dateTime).toDate();

    const dateFormat = options.format;
    try {
      return moment(dateTime, dateFormat).toDate();
    } catch (e) {
      return null;
    }
  }
}

const now = clock.systemClock.now();
const today = moment(now).startOf('day');
