'use client';

import * as React from 'react';
import { NAME_SPACE } from '../constants/core';
import { getFormatDatetime } from '../../utils/datetime';

interface Iprops {
  monthPage: number;
  setActiveDate: (value: Date) => void;
}

function ViewMonth({ monthPage, setActiveDate }: Iprops) {
  const year = Math.ceil(monthPage / 12);
  const month = monthPage % 12 || 12;
  const firstDay = new Date(year, month - 1, 1).getDay(); // 이달 1일의 요일
  const lastDateValue = new Date(year, month, 0); // 이달 말 일의 Date 객체
  const lastDate = lastDateValue.getDate(); // 이달 말 일
  const lastDay = lastDateValue.getDay(); // 이달 말 일의 요일
  const prevLastDate = new Date(year, month - 1, 0).getDate(); // 이전달의 말 일

  console.log(firstDay);

  return (
    <div className={`${NAME_SPACE}__month-view`}>
      {Array.apply(0, Array(firstDay)).map((x, i) => {
        // prevMonth

        const date = prevLastDate - (firstDay - i - 1);
        const value = new Date(year, month - 2, date);
        const day = value.getDay();
        const title = getFormatDatetime(value, 'YYYY-MM-DD');

        return (
          <button
            type="button"
            key={i}
            title={title}
            data-day={day}
            onClick={() => setActiveDate(value)}
          >
            {date}
          </button>
        );
      })}
      {Array.apply(0, Array(lastDate)).map((x, i) => {
        // thisMonth
        const date = i + 1;
        const value = new Date(year, month - 1, date);
        const day = value.getDay();
        const title = getFormatDatetime(value, 'YYYY-MM-DD');

        return (
          <button
            type="button"
            key={i}
            title={title}
            data-day={day}
            onClick={() => setActiveDate(value)}
          >
            {date}
          </button>
        );
      })}
      {Array.apply(0, Array(6 - lastDay)).map((x, i) => {
        const date = i + 1;
        const value = new Date(year, month, date);
        const day = value.getDay();
        const title = getFormatDatetime(value, 'YYYY-MM-DD');

        return (
          <button
            type="button"
            key={i}
            title={title}
            data-day={day}
            onClick={() => setActiveDate(value)}
          >
            {date}
          </button>
        );
      })}
    </div>
  );
}

export default ViewMonth;
