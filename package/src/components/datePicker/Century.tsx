'use client';

import { useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { setViewDateByType } from '../../utils/datetime';
import { setCenturyPage } from '../../utils/page';

interface IProps {
  value: Date | null;
  viewDate: string;
  setViewDate: (value: string) => void;
  setViewType: (value: 'decade') => void;
}

function DatePickerCentury({
  value,
  viewDate,
  setViewDate,
  setViewType,
}: IProps) {
  const centuryPage = useMemo(() => setCenturyPage(viewDate), [viewDate]);
  const valueYear = value?.getFullYear();

  const handleViewDateType = (year: string) => {
    setViewDate(setViewDateByType(viewDate, year, 'year'));
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
            data-active={
              valueYear &&
              valueYear >= Number(startYear) &&
              valueYear <= Number(endYear)
            }
          >
            {startYear} - {endYear}
          </button>
        );
      })}
    </div>
  );
}

export default DatePickerCentury;
