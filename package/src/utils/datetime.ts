import { addLeadingZero } from './string';

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

export const formatDate = (dateObj: Date | null, format: string) => {
  if (!dateObj) return '';
  const dateStr = toLocalISOString(dateObj).split('T')[0] as string;

  const year = dateStr.split('-')[0];
  const month = dateStr.split('-')[1];
  const date = dateStr.split('-')[2];

  if (
    /.*YYYY.*/.test(format) &&
    /.*MM.*/.test(format) &&
    /.*DD.*/.test(format)
  ) {
    return format
      .replace(/YYYY/g, String(year))
      .replace(/MM/g, String(month))
      .replace(/DD/g, String(date));
  }

  return dateStr;
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
