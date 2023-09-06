'use client';

import * as React from 'react';
import { NAME_SPACE } from '../../constants/core';
import ControllerArrow from './Arrow';
import ControllerLabel from './Label';

type TViewType = 'century' | 'decade' | 'year' | 'month';

interface IProps {
  viewDate: string;
  viewType: TViewType;
  labelFormat: string;
  isMultipleCalendar: boolean;
  setViewType: (value: TViewType) => void;
  setViewDate: (value: string) => void;
}

function ControllerContainer({
  viewDate,
  viewType,
  labelFormat,
  isMultipleCalendar,
  setViewType,
  setViewDate,
}: IProps) {
  return (
    <div className={`${NAME_SPACE}__controller`}>
      <ControllerArrow
        direction="prev"
        viewDate={viewDate}
        viewType={viewType}
        setViewDate={setViewDate}
      />
      <ControllerLabel
        viewDate={viewDate}
        viewType={viewType}
        isMultipleCalendar={isMultipleCalendar}
        labelFormat={labelFormat}
        setViewType={setViewType}
      />
      <ControllerArrow
        direction="next"
        viewDate={viewDate}
        viewType={viewType}
        setViewDate={setViewDate}
      />
    </div>
  );
}

export default ControllerContainer;
