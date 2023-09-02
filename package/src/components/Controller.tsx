'use client';

import * as React from 'react';
import { useMemo, useState } from 'react';
import { NAME_SPACE } from './constants/core';
import { setCenturyPage, setDecadePage, setYearPage } from '../utils/page';

type TviewType = 'century' | 'decade' | 'year' | 'month';

interface IProps {
  viewType: TviewType;
  setViewType: (value: TviewType) => void;
  viewDate: string;
}

function Controller({ viewDate, viewType, setViewType }: IProps) {
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

  return (
    <div className={`${NAME_SPACE}__controller`}>
      <button
        type="button"
        className={`${NAME_SPACE}__controller-label`}
        onClick={handleLabelClick}
        disabled={viewType === 'century'}
      >
        {label}
      </button>
    </div>
  );
}

export default Controller;
