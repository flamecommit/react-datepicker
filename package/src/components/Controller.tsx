'use client';

import * as React from 'react';
import { useMemo } from 'react';
import { NAME_SPACE } from './constants/core';
import {
  setCenturyPage,
  setDecadePage,
  setMonthPage,
  setYearPage,
} from '../utils/page';
import { addLeadingZero } from '../utils/string';

type TviewType = 'century' | 'decade' | 'year' | 'month';

interface IProps {
  viewType: TviewType;
  setViewType: (value: TviewType) => void;
  viewDate: string;
  setViewDateByType: (
    value: string | number,
    type: 'year' | 'month' | 'date'
  ) => void;
}

function Controller({
  viewDate,
  viewType,
  setViewType,
  setViewDateByType,
}: IProps) {
  const setLabel = (date: string, type: TviewType): string => {
    if (type === 'century') {
      const centuryPage = setCenturyPage(date);
      const start = centuryPage * 100 - 99;
      const end = centuryPage * 100;

      return `${start} - ${end}`;
    }
    if (type === 'decade') {
      const decadePage = setDecadePage(date);
      const start = decadePage * 10 - 9;
      const end = decadePage * 10;

      return `${start} - ${end}`;
    }
    if (type === 'year') {
      const yearPage = setYearPage(date);

      return `${yearPage}`;
    }
    if (type === 'month') {
      const monthPage = setMonthPage(date);
      const year = Math.ceil(monthPage / 12);
      const month = addLeadingZero(monthPage % 12 || 12);

      return `${year}-${month}`;
    }
    return '';
  };

  const label = useMemo(
    () => setLabel(viewDate, viewType),
    [viewDate, viewType]
  );

  const handleLabelClick = () => {
    if (viewType === 'decade') {
      setViewType('century');
    }
    if (viewType === 'year') {
      setViewType('decade');
    }
    if (viewType === 'month') {
      setViewType('year');
    }
  };

  const getViewDateUnit = (type: string): number => {
    if (type === 'year') return Number(viewDate.split('-')[0]);
    else if (type === 'month') return Number(viewDate.split('-')[1]);
    else return Number(viewDate.split('-')[2]);
  };

  const handleControl = (action: string) => {
    console.log(viewDate);

    const isExtra = action.startsWith('extra');
    const unit = viewType === 'month' && !isExtra ? 'month' : 'year';

    const deltas: { [key: string]: number } = {
      month: 1,
      year: 1,
      decade: 10,
      century: 100,
    };

    let delta = deltas[viewType] as number;

    if (viewType !== 'month' && isExtra) {
      delta *= 10;
    }

    if (action === 'extraPrev' || action === 'prev') {
      delta *= -1;
    }

    setViewDateByType(getViewDateUnit(unit) + delta, unit);
  };

  return (
    <div className={`${NAME_SPACE}__controller`}>
      {viewType !== 'century' && (
        <button
          className={`${NAME_SPACE}__controller-arrow ${NAME_SPACE}__controller-extra-prev`}
          onClick={() => handleControl('extraPrev')}
        >
          Extra Previous
        </button>
      )}
      <button
        className={`${NAME_SPACE}__controller-arrow ${NAME_SPACE}__controller-prev`}
        onClick={() => handleControl('prev')}
      >
        Previous
      </button>
      <button
        type="button"
        className={`${NAME_SPACE}__label`}
        onClick={handleLabelClick}
        disabled={viewType === 'century'}
      >
        {label}
      </button>
      <button
        className={`${NAME_SPACE}__controller-arrow ${NAME_SPACE}__controller-next`}
        onClick={() => handleControl('next')}
      >
        Extra Next
      </button>
      {viewType !== 'century' && (
        <button
          className={`${NAME_SPACE}__controller-arrow ${NAME_SPACE}__controller-extra-next`}
          onClick={() => handleControl('extraNext')}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Controller;
