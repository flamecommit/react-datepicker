'use client';

import * as React from 'react';
import { NAME_SPACE } from '../constants/core';
import {
  setCenturyPage,
  setDecadePage,
  setMonthPage,
  setYearPage,
} from '../utils/page';
import { addLeadingZero } from '../utils/string';
import { formatLabel } from '../utils/datetime';

type TviewType = 'century' | 'decade' | 'year' | 'month';

interface IProps {
  viewType: TviewType;
  setViewType: (value: TviewType) => void;
  viewDate: string;
  labelFormat: string;
  isMultipleCalendar: boolean;
  setViewDateByType: (
    value: string | number,
    type: 'year' | 'month' | 'date'
  ) => void;
}

function Controller({
  viewDate,
  viewType,
  labelFormat,
  setViewType,
  isMultipleCalendar,
  setViewDateByType,
}: IProps) {
  const setMonthLabel = (date: string, addMonth = 0) => {
    const monthPage = setMonthPage(date);
    const year = Math.ceil((monthPage + addMonth) / 12);
    const month = addLeadingZero((monthPage + addMonth) % 12 || 12);

    return formatLabel(`${year}-${month}`, labelFormat);
  };

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
      return setMonthLabel(date);
    }
    return '';
  };

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
      {/* {viewType !== 'century' && (
        <button
          className={`${NAME_SPACE}__controller-arrow ${NAME_SPACE}__controller-extra-prev`}
          onClick={() => handleControl('extraPrev')}
        >
          Extra Previous
        </button>
      )} */}
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
        {setLabel(viewDate, viewType)}
      </button>
      {isMultipleCalendar && viewType === 'month' && (
        <button
          type="button"
          className={`${NAME_SPACE}__label`}
          onClick={handleLabelClick}
        >
          {setMonthLabel(viewDate, 1)}
        </button>
      )}
      <button
        className={`${NAME_SPACE}__controller-arrow ${NAME_SPACE}__controller-next`}
        onClick={() => handleControl('next')}
      >
        Next
      </button>
      {/* {viewType !== 'century' && (
        <button
          className={`${NAME_SPACE}__controller-arrow ${NAME_SPACE}__controller-extra-next`}
          onClick={() => handleControl('extraNext')}
        >
          Extra Next
        </button>
      )} */}
    </div>
  );
}

export default Controller;
