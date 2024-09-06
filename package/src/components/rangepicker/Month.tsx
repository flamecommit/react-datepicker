'use client';

import { useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue, TIsVisible } from '../../types/props';
import {
  checkHoliday,
  formatDate,
  formatDateValue,
} from '../../utils/datetime';
import { setMonthPage } from '../../utils/page';

interface Iprops {
  type: TIsVisible;
  dateValue: IDateValue;
  pairValue: IDateValue;
  valueFormat: string;
  monthPage: number;
  weekdayLabels: string[];
  setDateValue: (value: IDateValue) => void;
  timeValue: ITimeValue;
  holidays: string[];
  setIsVisible: (value: TIsVisible) => void;
}

export default function RangepickerMonth({
  type, // start | end
  dateValue,
  pairValue,
  setDateValue,
  valueFormat,
  monthPage,
  weekdayLabels,
  timeValue,
  holidays,
  setIsVisible,
}: Iprops) {
  const year = Math.ceil(monthPage / 12);
  const month = monthPage % 12 || 12;
  const firstDay = new Date(year, month - 1, 1).getDay(); // 이달 1일의 요일
  const lastDateValue = new Date(year, month, 0); // 이달 말 일의 Date 객체
  const lastDate = lastDateValue.getDate(); // 이달 말 일
  const lastDay = lastDateValue.getDay(); // 이달 말 일의 요일
  const prevLastDate = new Date(year, month - 1, 0).getDate(); // 이전달의 말 일
  const startValue = useMemo(
    () => (type === 'start' ? dateValue : pairValue),
    [dateValue, pairValue, type]
  );
  const endValue = useMemo(
    () => (type === 'end' ? dateValue : pairValue),
    [dateValue, pairValue, type]
  );
  const formatedDateValue = useMemo(
    () => formatDateValue(dateValue, timeValue, valueFormat),
    [dateValue, timeValue, valueFormat]
  );
  const formatedPairValue = useMemo(
    () => formatDateValue(pairValue, timeValue, valueFormat),
    [pairValue, timeValue, valueFormat]
  );
  const formatedStartValue = useMemo(() => {
    return type === 'start' ? formatedDateValue : formatedPairValue;
  }, [formatedDateValue, formatedPairValue, type]);
  const formatedEndValue = useMemo(() => {
    return type === 'end' ? formatedDateValue : formatedPairValue;
  }, [formatedDateValue, formatedPairValue, type]);

  const parsedValueToDate = (value: IDateValue) => {
    return new Date(
      -1,
      setMonthPage(`${value.year! + 2}-${value.month!}`),
      value.date!,
      timeValue.hour,
      timeValue.minute,
      timeValue.second
    );
  };

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
    const formatedThisValue = formatDate(buttonDate, valueFormat);
    const isHoliday = checkHoliday(formatedThisValue, holidays);

    const handleClick = () => {
      // if (
      //   (type === 'start' && buttonDate > new Date(formatedEndValue)) ||
      //   (type === 'end' && buttonDate < new Date(formatedStartValue))
      // ) {
      //   setPairValue({
      //     year: null,
      //     month: null,
      //     date: null,
      //   });
      // }
      console.log(type);
      setDateValue({
        year: buttonDate.getFullYear(),
        month: buttonDate.getMonth(),
        date: buttonDate.getDate(),
      });

      if (type === 'start') {
        return setIsVisible('end');
      }

      if (type === 'end') {
        return setIsVisible(false);
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
          buttonDate > parsedValueToDate(startValue) &&
          buttonDate < parsedValueToDate(endValue)
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
