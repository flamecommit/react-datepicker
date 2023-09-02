'use client';

import * as React from 'react';
import { NAME_SPACE } from '../constants/core';

interface IProps {
  centuryPage: number;
  setViewDateByType: (value: string, type: 'year') => void;
  setViewType: (value: 'decade') => void;
}

function ViewCentury({ centuryPage, setViewDateByType, setViewType }: IProps) {
  const handleViewDateType = (year: string) => {
    setViewDateByType(year, 'year');
    setViewType('decade');
  };

  return (
    <div className={`${NAME_SPACE}__century-view`}>
      {Array.apply(0, Array(10)).map((x, i) => {
        const decade = centuryPage * 100 - (10 - i) * 10;
        const startYear = String(decade + 1);
        const endYear = String(decade + 10);

        return (
          <button
            type="button"
            className={`${NAME_SPACE}__datepicker-button`}
            key={i}
            onClick={() => handleViewDateType(startYear)}
          >
            {startYear} - {endYear}
          </button>
        );
      })}
    </div>
  );
}

export default ViewCentury;
