'use client';

import * as React from 'react';
import { NAME_SPACE } from '../constants/core';

interface IProps {
  centuryPage: number;
  setViewDateType: (value: string, type: 'year') => void;
  setViewType: (value: 'decade') => void;
}

function ViewCentury({ centuryPage, setViewDateType, setViewType }: IProps) {
  const handleViewDateType = (year: string) => {
    setViewDateType(year, 'year');
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
