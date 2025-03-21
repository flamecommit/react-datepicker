'use client';

import { NAME_SPACE } from '../../constants/core';
import { ITimeValue } from '../../types/props';
import { checkHoliday, formatDate } from '../../utils/datetime';

interface Iprops {
  value: Date | null;
  valueFormat: string;
  monthPage: number;
  weekdayLabels: string[];
  onChange?: (newValue: Date | null) => void;
  timeValue: ITimeValue;
  holidays: string[];
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePickerMonth({
  value,
  onChange,
  valueFormat,
  monthPage,
  weekdayLabels,
  timeValue,
  holidays,
  minDate,
  maxDate,
}: Iprops) {
  const year = Math.ceil(monthPage / 12);
  const month = monthPage % 12 || 12;
  const firstDay = new Date(year, month - 1, 1).getDay(); // 이달 1일의 요일
  const lastDateValue = new Date(year, month, 0); // 이달 말 일의 Date 객체
  const lastDate = lastDateValue.getDate(); // 이달 말 일
  const lastDay = lastDateValue.getDay(); // 이달 말 일의 요일
  const prevLastDate = new Date(year, month - 1, 0).getDate(); // 이전달의 말 일
  const formatedValue = formatDate(value, valueFormat);

  const renderDateButton = (
    month: number,
    date: number,
    classNameModifier = ''
  ) => {
    let isDisabled = false;
    const buttonDate = new Date(
      -1,
      month,
      date,
      timeValue.hour,
      timeValue.minute,
      timeValue.second
    );
    const day = buttonDate.getDay();
    const formatedThisValue = formatDate(buttonDate, valueFormat);
    const isHoliday = checkHoliday(formatedThisValue, holidays);

    if (minDate && buttonDate < minDate) isDisabled = true;
    if (maxDate && buttonDate > maxDate) isDisabled = true;

    const handleClick = () => {
      if (onChange) {
        onChange(buttonDate);
      }
      // setDateValue({
      //   year: buttonDate.getFullYear(),
      //   month: buttonDate.getMonth(),
      //   date: buttonDate.getDate(),
      // });
    };

    return (
      <button
        type="button"
        className={`${NAME_SPACE}__datepicker-button ${classNameModifier}`}
        key={date}
        title={formatedThisValue}
        data-day={day}
        data-active={formatedValue === formatedThisValue}
        data-holiday={isHoliday}
        onClick={handleClick}
        disabled={isDisabled}
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
