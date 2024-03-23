'use client';

import { useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, TIsVisible } from '../../types/props';
import { formatDate, formatDateValue } from '../../utils/datetime';

interface Iprops {
  type: TIsVisible;
  dateValue: IDateValue;
  pairValue: IDateValue;
  valueFormat: string;
  monthPage: number;
  weekdayLabels: string[];
  setDateValue: (value: IDateValue) => void;
}

export default function RangepickerMonth({
  type, // start | end
  dateValue,
  pairValue,
  setDateValue,
  valueFormat,
  monthPage,
  weekdayLabels,
}: Iprops) {
  const year = Math.ceil(monthPage / 12);
  const month = monthPage % 12 || 12;
  const firstDay = new Date(year, month - 1, 1).getDay(); // 이달 1일의 요일
  const lastDateValue = new Date(year, month, 0); // 이달 말 일의 Date 객체
  const lastDate = lastDateValue.getDate(); // 이달 말 일
  const lastDay = lastDateValue.getDay(); // 이달 말 일의 요일
  const prevLastDate = new Date(year, month - 1, 0).getDate(); // 이전달의 말 일
  const formatedDateValue = useMemo(
    () => formatDateValue(dateValue, valueFormat),
    [dateValue, valueFormat]
  );
  const formatedPairValue = useMemo(
    () => formatDateValue(pairValue, valueFormat),
    [pairValue, valueFormat]
  );
  const formatedStartValue = useMemo(() => {
    return type === 'start' ? formatedDateValue : formatedPairValue;
  }, [formatedDateValue, formatedPairValue, type]);
  const formatedEndValue = useMemo(() => {
    return type === 'end' ? formatedDateValue : formatedPairValue;
  }, [formatedDateValue, formatedPairValue, type]);

  const renderDateButton = (
    month: number,
    date: number,
    classNameModifier = ''
  ) => {
    const buttonDate = new Date(-1, month, date);
    const day = buttonDate.getDay();
    const formatedThisValue = formatDate(buttonDate, valueFormat);

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
      setDateValue({
        year: buttonDate.getFullYear(),
        month: buttonDate.getMonth(),
        date: buttonDate.getDate(),
      });
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
          formatedStartValue &&
          formatedEndValue &&
          buttonDate > new Date(formatedStartValue) &&
          buttonDate < new Date(formatedEndValue)
        }
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
