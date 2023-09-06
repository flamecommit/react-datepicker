'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { setDecadePage } from '../../utils/page';
import { NAME_SPACE } from '../../constants/core';
import { setViewDateByType } from '../../utils/datetime';

interface IProps {
  value: Date | null;
  viewDate: string;
  setViewDate: (value: string) => void;
  setViewType: (value: 'year') => void;
}

function ViewDecade({ value, viewDate, setViewDate, setViewType }: IProps) {
  const decadePage = useMemo(() => setDecadePage(viewDate), [viewDate]);
  const valueYear = value?.getFullYear();

  const handleViewDateType = (year: string) => {
    setViewDate(setViewDateByType(viewDate, year, 'year'));
    setViewType('year');
  };

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
