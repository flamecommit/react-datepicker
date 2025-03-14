'use client';

import { useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { ITimeValue, TIsVisible } from '../../types/props';
import { checkHoliday, formatDate } from '../../utils/datetime';

interface Iprops {
  type: TIsVisible;
  value: Date | null;
  pairValue: Date | null;
  onChange?: (newValue: Date | null) => void;
  monthPage: number;
  weekdayLabels: string[];
  timeValue: ITimeValue;
  holidays: string[];
}

export default function RangePickerMonth({
  type, // start | end
  value,
  pairValue,
  onChange,
  monthPage,
  weekdayLabels,
  timeValue,
  holidays,
}: Iprops) {
  const year = Math.ceil(monthPage / 12);
  const month = monthPage % 12 || 12;
  const firstDay = new Date(year, month - 1, 1).getDay(); // 이달 1일의 요일
  const lastDateValue = new Date(year, month, 0); // 이달 말 일의 Date 객체
  const lastDate = lastDateValue.getDate(); // 이달 말 일
  const lastDay = lastDateValue.getDay(); // 이달 말 일의 요일
  const prevLastDate = new Date(year, month - 1, 0).getDate(); // 이전달의 말 일
  const defaultFormat = 'YYYY-MM-DD';
  const startValue = useMemo(
    () => (type === 'start' ? value : pairValue),
    [value, pairValue, type]
  );
  const endValue = useMemo(
    () => (type === 'end' ? value : pairValue),
    [value, pairValue, type]
  );
  const formatedDateValue = useMemo(
    () => formatDate(value, defaultFormat),
    [value]
  );
  const formatedStartValue = useMemo(() => {
    return type === 'start'
      ? formatDate(value, defaultFormat)
      : formatDate(pairValue, defaultFormat);
  }, [value, pairValue, type]);
  const formatedEndValue = useMemo(() => {
    return type === 'end'
      ? formatDate(value, defaultFormat)
      : formatDate(pairValue, defaultFormat);
  }, [value, pairValue, type]);

  const renderDateButton = (
    month: number,
    date: number,
    classNameModifier = ''
  ) => {
    const buttonDate = new Date(
      -1,
      month,
      date,
      timeValue.hour,
      timeValue.minute,
      timeValue.second
    );
    const day = buttonDate.getDay();
    const formatedThisValue = formatDate(buttonDate, defaultFormat);
    const isHoliday = checkHoliday(formatedThisValue, holidays);

    const handleClick = () => {
      if (onChange) {
        onChange(buttonDate);
      }
    };

    return (
      <button
        type="button"
        className={`${NAME_SPACE}__datepicker-button ${classNameModifier}`}
        key={date}
        title={formatedThisValue}
        data-day={day}
        data-active={formatedDateValue === formatedThisValue}
        data-start-active={formatedStartValue === formatedThisValue}
        data-end-active={formatedEndValue === formatedThisValue}
        data-range-active={
          startValue &&
          endValue &&
          buttonDate > startValue &&
          buttonDate < endValue
        }
        data-holiday={isHoliday}
        onClick={handleClick}
      >
        {date}
      </button>
    );
  };

  return (
    <div className={`${NAME_SPACE}__month-view`}>
      {weekdayLabels.map((day, index) => (
        <div className={`${NAME_SPACE}__weekday`} data-day={index} key={day}>
          {day}
        </div>
      ))}
      {Array.apply(0, Array(firstDay)).map((x, i) => {
        const date = prevLastDate - (firstDay - i - 1);

        return renderDateButton(
          monthPage + 22,
          date,
          `${NAME_SPACE}__neighbor-button`
        );
      })}
      {Array.apply(0, Array(lastDate)).map((x, i) => {
        const date = i + 1;

        return renderDateButton(monthPage + 23, date);
      })}
      {Array.apply(0, Array(6 - lastDay)).map((x, i) => {
        const date = i + 1;

        return renderDateButton(
          monthPage + 24,
          date,
          `${NAME_SPACE}__neighbor-button`
        );
      })}
    </div>
  );
}
