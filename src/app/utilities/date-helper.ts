import { TimePeriods } from '@app/shared/app.enum';
import { format as dateFnsFormat, formatDuration } from 'date-fns';
import {
  utcToZonedTime,
  format as dateFnsTzFormat,
  zonedTimeToUtc
} from 'date-fns-tz';

declare global {
  interface Date {
    isToday: () => boolean;

    isYesterday: () => boolean;

    isNextDate: () => boolean;

    isNextWeek: () => boolean;

    isNextMonth: () => boolean;

    getMonday: () => Date;

    getSunday: () => Date;

    getNextMonday: () => Date;

    getNextSunday: () => Date;

    getFirstDay: () => Date;

    specifyUTCKind: () => Date;

    getDateOnly: () => Date;

    toFormatDate: (format?: string) => string;

    toFormatToUTCString: (format?: string) => string;

    compareDate(date: Date): number;

    compareTime(date: Date): number;

    compareDateTime(date: Date | string | number): number;

    getTimespan(format?: string): string;

    toUTCDate(): Date;
  }
}

Date.prototype.isToday = function (): boolean {
  const today: Date = new Date();
  return this.compareDate(today) === 0;
};

Date.prototype.isYesterday = function (): boolean {
  const today: Date = new Date();
  const yesterday: Date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  return this.compareDate(yesterday) === 0;
};


Date.prototype.isNextDate = function (): boolean {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const diff = tomorrow.compareDate(this);
  return diff === 0;
};

Date.prototype.isNextWeek = function (): boolean {
  const nextMonday = (new Date()).getNextMonday();
  const nextSunday = (new Date()).getNextSunday();

  return this.compareDate(nextMonday) >= 0 && this.compareDate(nextSunday) <= 0;
};

Date.prototype.isNextMonth = function (): boolean {
  const today = new Date();
  const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
  const lastDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  return this.compareDate(firstDayOfNextMonth) >= 0 && this.compareDate(lastDayOfNextMonth) <= 0;
};

Date.prototype.compareDate = function (date: Date): number {
  // To avoid override the current data of parameters
  const firstDate: Date = new Date(this);
  const secondDate: Date = new Date(date);

  const firstDateTime: number = new Date(firstDate.setHours(0, 0, 0, 0)).getTime();
  const secondDateTime: number = new Date(secondDate.setHours(0, 0, 0, 0)).getTime();
  if (firstDateTime > secondDateTime) {
    return 1;
  }
  if (firstDateTime === secondDateTime) {
    return 0;
  }
  if (firstDateTime < secondDateTime) {
    return -1;
  }
};

Date.prototype.compareTime = function (date: Date): number {
  const firstDate = new Date().setHours(this.getHours(), this.getMinutes(), this.getSeconds());
  const secondDate = new Date().setHours(date.getHours(), date.getMinutes(), date.getSeconds());
  if (firstDate > secondDate) {
    return 1;
  }
  if (firstDate === secondDate) {
    return 0;
  }
  if (firstDate < secondDate) {
    return -1;
  }
};

Date.prototype.compareDateTime = function (date: Date | string | number): number {
  const firstDate: number = this.getTime();

  let secondDate: number = 0;
  if (date instanceof Date) {
    secondDate = date.getTime();
  } else if (typeof date === 'string') {
    secondDate = new Date(date).getTime();
  } else if (typeof date === 'number') {
    secondDate = date;
  }

  if (firstDate > secondDate) {
    return 1;
  }
  if (firstDate === secondDate) {
    return 0;
  }
  if (firstDate < secondDate) {
    return -1;
  }
};

Date.prototype.toUTCDate = function (): Date {
  return new Date((this.getTime() as number) + this.getTimezoneOffset() * 60000);
};

Date.prototype.getFirstDay = function () {
  return new Date(this.getFullYear(), this.getMonth(), 1);
};

Date.prototype.specifyUTCKind = function (): Date {
  return new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
};

Date.prototype.getDateOnly = function (): Date {
  // To avoid override the current data of parameters
  return new Date(new Date(this).setHours(0, 0, 0, 0));
};

/* eslint-disable @typescript-eslint/restrict-plus-operands */
Date.prototype.toFormatDate = function (format: string = 'dd/MM/yyyy'): string {
  const date: number = this.getDate();
  const month: number = this.getMonth() + 1;
  const year: number = this.getFullYear();

  switch (format) {
    case 'MM/dd/yyyy':
      return `${month > 9 ? month : '0' + month}/${date > 9 ? date : '0' + date}/${year}`;
    case 'yyyy/MM/dd':
      return `${year}/${month > 9 ? month : '0' + month}/${date > 9 ? date : '0' + date}`;
    case 'dd/MM/yyyy':
      return `${date > 9 ? date : '0' + date}/${month > 9 ? month : '0' + month}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month > 9 ? month : '0' + month}-${date > 9 ? date : '0' + date}`;
    default:
      return `${date > 9 ? date : '0' + date}/${month > 9 ? month : '0' + month}/${year}`;
  }
};

Date.prototype.toFormatToUTCString = function (format: string = 'yyyy-MM-dd'): string {
  const date: number = this.getUTCDate();
  const month: number = this.getUTCMonth() + 1;
  const year: number = this.getUTCFullYear();

  switch (format) {
    case 'MM/dd/yyyy':
      return `${month > 9 ? month : '0' + month}/${date > 9 ? date : '0' + date}/${year}`;
    case 'yyyy/MM/dd':
      return `${year}/${month > 9 ? month : '0' + month}/${date > 9 ? date : '0' + date}`;
    case 'dd/MM/yyyy':
      return `${date > 9 ? date : '0' + date}/${month > 9 ? month : '0' + month}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month > 9 ? month : '0' + month}-${date > 9 ? date : '0' + date}`;
    default:
      return `${date > 9 ? date : '0' + date}/${month > 9 ? month : '0' + month}/${year}`;
  }
};

/* eslint-disable @typescript-eslint/restrict-plus-operands */
Date.prototype.getTimespan = function (format: string = 'h:mm:ss'): string {
  const hours: number = this.getHours();
  const minutes: number = this.getMinutes();
  const seconds: number = this.getSeconds();

  switch (format) {
    case 'h:mm:ss':
      return `${hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
    case 'h:mm':
      return `${hours}:${minutes > 9 ? minutes : '0' + minutes}`;
    default:
      return `${hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
  }
};

export class DateHelper {
  public static convertToISOString(date: Date | number | string): string {
    if (!date) {
      return null;
    }
    //
    if (date instanceof Date) {
      return date.toISOString();
    } else {
      // type = string | number | Moment | others
      return new Date(date).toISOString();
    }
  }

  public static convertUtcToZonedDateTime(date: Date | number | string, timezoneIana: string): Date {
    if (!timezoneIana) {
      return new Date(date);
    }
    //
    const iosDate: string = this.convertToISOString(date);
    return utcToZonedTime(iosDate, timezoneIana);
  }

  public static formatZonedDateTime(zonedDateTime: Date, timezoneIana: string, format: string): string {
    const defaultFormat: string = 'MMM dd, yyyy h:mm:ss aaa'; // Aug 20, 2021 15:30:48 am
    return !!timezoneIana
      ? dateFnsTzFormat(zonedDateTime, format ? format : defaultFormat, { timeZone: timezoneIana })
      : dateFnsFormat(zonedDateTime, defaultFormat);
  }

  public static convertZonedDateTimeToUtc(zonedDateTime: Date | number | string, timezoneIana: string): Date {
    if (!zonedDateTime || !timezoneIana) {
      return null;
    }
    return zonedTimeToUtc(zonedDateTime, timezoneIana);
  }
}

export class TimeHelper {
  public static getHours(time: number): number {
    return Math.floor(time / 60);
  }

  public static getMinutes(time: number): number {
    return time % 60;
  }

  public static getPeriod(time: number): number {
    switch (true) {
      case time === 0:
      case time < (12 * 60):
        return TimePeriods.AM;
      case time === (12 * 60):
      case time < (24 * 60):
        return TimePeriods.PM;
    }
  }

  public static getFormatDuration(time: number, format: string = 'hh mm'): string {
    const hours: number = this.getHours(time);
    const minutes: number = this.getMinutes(time);
    //
    switch (format) {
      case 'hh mm':
        return formatDuration({ hours: hours, minutes: minutes });
      case 'd hh mm':
        break;
      case 'w d hh mm':
        break;
    }
  }
}
