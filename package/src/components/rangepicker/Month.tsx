'use client';

import * as React from 'react';
import { NAME_SPACE } from '../../constants/core';
import { formatDate } from '../../utils/datetime';

interface Iprops {
  startValue: Date | null;
  endValue: Date | null;
  hoverValue: Date | null;
  valueFormat: string;
  monthPage: number;
  setStartValue: (value: Date | null) => void;
  setEndValue: (value: Date | null) => void;
  setHoverValue: (value: Date | null) => void;
}

function RangepicerMonth({
  startValue,
  endValue,
  hoverValue,
  valueFormat,
  monthPage,
  setStartValue,
  setEndValue,
  setHoverValue,
}: Iprops) {
  const year = Math.ceil(monthPage / 12);
  const month = monthPage % 12 || 12;
  const firstDay = new Date(year, month - 1, 1).getDay(); // 이달 1일의 요일
  const lastDateValue = new Date(year, month, 0); // 이달 말 일의 Date 객체
  const lastDate = lastDateValue.getDate(); // 이달 말 일
  const lastDay = lastDateValue.getDay(); // 이달 말 일의 요일
  const prevLastDate = new Date(year, month - 1, 0).getDate(); // 이전달의 말 일
  const formatedStartValue = formatDate(startValue, valueFormat);
  const formatedEndValue = formatDate(endValue, valueFormat);

  const clickHandler = (thisValue: Date) => {
    if (startValue && endValue) {
      // 이미 값이 존재 한다면
      setStartValue(thisValue);
      setEndValue(null);
    } else if (startValue && thisValue < startValue) {
      // startValue보다 이전 날짜 선택 했다면
      setStartValue(thisValue);
    } else if (startValue && thisValue > startValue) {
      setEndValue(thisValue);
    } else {
      setStartValue(thisValue);
    }
  };

  const mouseEnterHandler = (thisValue: Date) => {
    setHoverValue(thisValue);
  };

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
        data-hover-active={
          startValue &&
          hoverValue &&
          endValue === null &&
          thisValue > startValue &&
          thisValue <= hoverValue
        }
        data-range-active={
          startValue &&
          endValue &&
          thisValue > startValue &&
          thisValue < endValue
        }
        data-start-active={formatedStartValue === formatedThisValue}
        data-end-active={formatedEndValue === formatedThisValue}
        onClick={() => clickHandler(thisValue)}
        onMouseEnter={() => mouseEnterHandler(thisValue)}
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

export default RangepicerMonth;
