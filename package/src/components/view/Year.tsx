'use client';

import * as React from 'react';
import { NAME_SPACE } from '../constants/core';
import { addLeadingZero } from '../../utils/string';

interface Iprops {
  value: Date;
  yearPage: number;
  setViewDateByType: (value: string, type: 'month') => void;
  setViewType: (value: 'month') => void;
}

function ViewYear({ value, yearPage, setViewDateByType, setViewType }: Iprops) {
  const handleViewDateType = (month: string) => {
    setViewDateByType(month, 'month');
    setViewType('month');
  };

  const valueYear = value.getFullYear();
  const valueMonth = value.getMonth();

  return (
    <div className={`${NAME_SPACE}__year-view`}>
      {Array.apply(0, Array(12)).map((x, i) => {
        const month = addLeadingZero(i + 1);
        return (
          <button
            type="button"
            className={`${NAME_SPACE}__datepicker-button`}
            key={i}
            onClick={() => handleViewDateType(month)}
            data-active={valueYear === yearPage && valueMonth === i}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

export default ViewYear;
