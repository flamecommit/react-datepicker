import { IDateValue, ITimeValue } from '../types/props';
import { TDateUnitType } from '../types/unit';
import { setMonthPage } from './page';
import { addLeadingZero } from './string';

export const checkHoliday = (
  formatedDate: string,
  holidays: string[]
): boolean => {
  const regex1 = /^\d{4}-\d{2}-\d{2}$/;
  const regex2 = /^\d{2}-\d{2}$/;

  return holidays.some((holiday) => {
    return (
      (regex1.test(holiday) && formatedDate === holiday) ||
      (regex2.test(holiday) && formatedDate.endsWith(holiday))
    );
  });
};

export const toLocalISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const formatDate = (dateObj: Date | null, format: string): string => {
  if (!dateObj) return format;
  let result = format;

  const localDate = toLocalISOString(dateObj);
  const [dateStr, timeStr] = localDate.split('T') as [string, string];
  const [year, month, date] = dateStr.split('-');
  const removeMS = timeStr.split('.')[0] as string;
  const [hour, minute, second] = removeMS.split(':');

  if (/.*YYYY.*/.test(format)) result = result.replace(/YYYY/g, String(year));
  if (/.*MM.*/.test(format)) result = result.replace(/MM/g, String(month));
  if (/.*DD.*/.test(format)) result = result.replace(/DD/g, String(date));
  if (/.*hh.*/.test(format)) result = result.replace(/hh/g, String(hour));
  if (/.*mm.*/.test(format)) result = result.replace(/mm/g, String(minute));
  if (/.*ss.*/.test(format)) result = result.replace(/ss/g, String(second));

  return result;
};

export const formatDateValue = (
  dateValue: IDateValue,
  timeValue: ITimeValue,
  format: string
): string => {
  return formatDate(
    dateValue.year !== null &&
      dateValue.month !== null &&
      dateValue.date !== null
      ? new Date(
          -1,
          setMonthPage(`${dateValue.year + 2}-${dateValue.month}`),
          Number(dateValue.date),
          timeValue.hour,
          timeValue.minute,
          timeValue.second
        )
      : null,
    format
  );
};

export const getDateUnit = (
  value: Date | null,
  unitType: TDateUnitType
): string => {
  if (value === null) return '';

  switch (unitType) {
    case 'YYYY': {
      return `${value.getFullYear()}`;
    }
    case 'MM': {
      return addLeadingZero(value.getMonth() + 1);
    }
    case 'DD': {
      return addLeadingZero(value.getDate());
    }
    default: {
      return '';
    }
  }
};

export const getDateValueUnit = (
  value: IDateValue,
  unitType: string
): string => {
  switch (unitType) {
    case 'YYYY':
      return value.year !== null ? `${value.year}` : 'YYYY';
    case 'MM':
      return value.month !== null
        ? addLeadingZero(Number(value.month) + 1)
        : 'MM';
    case 'DD':
      return value.date !== null ? addLeadingZero(value.date) : 'DD';
    default:
      return '';
  }
};

export const getTimeValueUnit = (value: ITimeValue, unit: string): string => {
  switch (unit) {
    case 'hh':
      return addLeadingZero(value.hour);
    case 'mm':
      return addLeadingZero(value.minute);
    case 'ss':
      return addLeadingZero(value.second);
    default:
      return '';
  }
};

export const formatLabel = (label: string, format: string) => {
  const year = label.split('-')[0];
  const month = label.split('-')[1];

  if (/.*YYYY.*/.test(format) && /.*MM.*/.test(format)) {
    return format.replace(/YYYY/g, String(year)).replace(/MM/g, String(month));
  }

  return label;
};

export const getMonthArray = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0, 9, 0, 0).getDate();
  const monthArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day, 12, 0, 0);
    const formattedDate = formatDate(date, 'YYYY-MM-DD');
    const dayValue = date.getDate();
    const dayOfWeek = date.getDay();

    monthArray.push({
      ISO: formattedDate,
      date: dayValue,
      day: dayOfWeek,
    });
  }

  return monthArray;
};

export const setViewDateByType = (
  origin: string,
  value: string | number,
  type: 'year' | 'month' | 'date'
) => {
  type TSplit = string | number;
  const split: TSplit[] = origin.split('-');
  const valueNum = Number(value);

  if (type === 'year') {
    if (valueNum < 1) {
      split[0] = 1;
    } else {
      split[0] = valueNum;
    }
  }
  if (type === 'month') {
    if (valueNum === 0) {
      if (Number(split[0]) > 1) {
        split[0] = Number(split[0]) - 1;
        split[1] = 12;
      }
    } else if (valueNum === 13) {
      split[0] = Number(split[0]) + 1;
      split[1] = 1;
    } else {
      split[1] = valueNum;
    }
    split[1] = addLeadingZero(split[1] as string);
  }
  if (type === 'date') split[2] = addLeadingZero(valueNum);

  return split.join('-');
};

/**
 * most pupolar date format
 * YYYY-MM-DD - 국제 표준
 * DD/MM/YYYY
 * DD-MM-YYYY
 * MM/DD/YYYY
 * MM-DD-YYYY
 * YYYY년 MM월 DD일 (한국 스타일)
 * DD Month YYYY (영국 스타일) - 04 September 2023
 * Month DD, YYYY (미국 스타일) - September 04, 2023
 */

export const valueToDateObj = (
  date: Date | null,
  time: ITimeValue
): Date | null => {
  if (date === null) return null;
  const newDate = new Date(date);
  newDate.setHours(time.hour, time.minute, time.second, 0);
  return newDate;
};
