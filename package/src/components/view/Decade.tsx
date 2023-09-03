'use client';

import * as React from 'react';
import { NAME_SPACE } from '../constants/core';

interface IProps {
  value: Date;
  decadePage: number;
  setViewDateByType: (value: string, type: 'year') => void;
  setViewType: (value: 'year') => void;
}

function ViewDecade({
  value,
  decadePage,
  setViewDateByType,
  setViewType,
}: IProps) {
  const handleViewDateType = (year: string) => {
    setViewDateByType(year, 'year');
    setViewType('year');
  };
  const valueYear = value.getFullYear();

  return (
    <div className={`${NAME_SPACE}__decade-view`}>
      {Array.apply(0, Array(10)).map((x, i) => {
        const year = String(decadePage * 10 - (9 - i));

        return (
          <button
            type="button"
            className={`${NAME_SPACE}__datepicker-button`}
            key={i}
            onClick={() => handleViewDateType(year)}
            data-active={valueYear === Number(year)}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}

export default ViewDecade;
