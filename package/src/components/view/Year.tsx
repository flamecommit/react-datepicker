'use client';

import * as React from 'react';
import { NAME_SPACE } from '../constants/core';
import { addLeadingZero } from '../../utils/string';

interface Iprops {
  setViewDateByType: (value: string, type: 'month') => void;
  setViewType: (value: 'month') => void;
}

function ViewYear({ setViewDateByType, setViewType }: Iprops) {
  const handleViewDateType = (month: string) => {
    setViewDateByType(month, 'month');
    setViewType('month');
  };

  return (
    <div className={`${NAME_SPACE}__year-view`}>
      {Array.apply(0, Array(12)).map((x, i) => {
        const month = addLeadingZero(i + 1);
        return (
          <button
            type="button"
            key={i}
            onClick={() => handleViewDateType(month)}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

export default ViewYear;
