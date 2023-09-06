'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { setYearPage } from '../../utils/page';
import { NAME_SPACE } from '../../constants/core';
import { addLeadingZero } from '../../utils/string';
import { setViewDateByType } from '../../utils/datetime';

interface Iprops {
  value: Date | null;
  viewDate: string;
  setViewDate: (value: string) => void;
  setViewType: (value: 'month') => void;
}

function ViewYear({ value, viewDate, setViewDate, setViewType }: Iprops) {
  const yearPage = useMemo(() => setYearPage(viewDate), [viewDate]);
  const valueYear = value?.getFullYear();
  const valueMonth = value?.getMonth();

  const handleViewDateType = (month: string) => {
    setViewDate(setViewDateByType(viewDate, month, 'month'));
    setViewType('month');
  };

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
