'use client';

import * as React from 'react';
import { NAME_SPACE } from '../../constants/core';
import {
  setCenturyPage,
  setDecadePage,
  setMonthPage,
  setYearPage,
} from '../../utils/page';
import { addLeadingZero } from '../../utils/string';
import { formatLabel } from '../../utils/datetime';

type TViewType = 'century' | 'decade' | 'year' | 'month';

interface IProps {
  viewDate: string;
  viewType: TViewType;
  labelFormat: string;
  showsMultipleCalendar: boolean;
  setViewType: (value: TViewType) => void;
}

function ControllerLabel({
  viewDate,
  viewType,
  labelFormat,
  showsMultipleCalendar,
  setViewType,
}: IProps) {
  const setMonthLabel = (date: string, addMonth = 0) => {
    const monthPage = setMonthPage(date);
    const year = Math.ceil((monthPage + addMonth) / 12);
    const month = addLeadingZero((monthPage + addMonth) % 12 || 12);

    return formatLabel(`${year}-${month}`, labelFormat);
  };

  const setLabel = (date: string, type: TViewType): string => {
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

  return (
    <>
      <button
        type="button"
        className={`${NAME_SPACE}__label`}
        onClick={handleLabelClick}
        disabled={viewType === 'century'}
      >
        {setLabel(viewDate, viewType)}
      </button>
      {showsMultipleCalendar && viewType === 'month' && (
        <button
          type="button"
          className={`${NAME_SPACE}__label`}
          onClick={handleLabelClick}
        >
          {setMonthLabel(viewDate, 1)}
        </button>
      )}
    </>
  );
}

export default ControllerLabel;
