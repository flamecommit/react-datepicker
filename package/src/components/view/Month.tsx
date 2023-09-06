'use client';

import * as React from 'react';
import { NAME_SPACE } from '../../constants/core';
import { formatDate } from '../../utils/datetime';

interface Iprops {
  value: Date | null;
  valueFormat: string;
  monthPage: number;
  setValue: (value: Date) => void;
}

function ViewMonth({ value, valueFormat, monthPage, setValue }: Iprops) {
  const year = Math.ceil(monthPage / 12);
  const month = monthPage % 12 || 12;
  const firstDay = new Date(year, month - 1, 1).getDay(); // 이달 1일의 요일
  const lastDateValue = new Date(year, month, 0); // 이달 말 일의 Date 객체
  const lastDate = lastDateValue.getDate(); // 이달 말 일
  const lastDay = lastDateValue.getDay(); // 이달 말 일의 요일
  const prevLastDate = new Date(year, month - 1, 0).getDate(); // 이전달의 말 일
  const formatedValue = formatDate(value, valueFormat);

  const renderDateButton = (
    date: number,
    thisValue: Date,
    classNameModifier = ''
  ) => {
    const day = thisValue.getDay();
    const formatedThisValue = formatDate(thisValue, valueFormat);

    return (
      <button
        type="button"
        className={`${NAME_SPACE}__datepicker-button ${classNameModifier}`}
        key={date}
        title={formatedThisValue}
        data-day={day}
        data-active={formatedValue === formatedThisValue}
        onClick={() => setValue(thisValue)}
      >
        {date}
      </button>
    );
  };

  return (
    <div className={`${NAME_SPACE}__month-view`}>
      {Array.apply(0, Array(firstDay)).map((x, i) => {
        const date = prevLastDate - (firstDay - i - 1);
        const thisValue = new Date(-1, monthPage + 22, date);

        return renderDateButton(
          date,
          thisValue,
          `${NAME_SPACE}__neighbor-button`
        );
      })}
      {Array.apply(0, Array(lastDate)).map((x, i) => {
        const date = i + 1;
        const thisValue = new Date(-1, monthPage + 23, date);

        return renderDateButton(date, thisValue);
      })}
      {Array.apply(0, Array(6 - lastDay)).map((x, i) => {
        const date = i + 1;
        const thisValue = new Date(-1, monthPage + 24, date);

        return renderDateButton(
          date,
          thisValue,
          `${NAME_SPACE}__neighbor-button`
        );
      })}
    </div>
  );
}

export default ViewMonth;
