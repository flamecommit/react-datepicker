'use client';

import * as React from 'react';
import { NAME_SPACE } from '../../constants/core';
import { ITimeValue, ITimeselector } from '../../types/props';
import { addLeadingZero } from '../../utils/string';

interface IProps {
  timeValue: ITimeValue;
  timeselector: ITimeselector;
}

function TimeselectorHeader({ timeValue, timeselector }: IProps) {
  return (
    <div className={`${NAME_SPACE}__timeselector-header`}>
      {timeselector.hour && (
        <div className="hour">{addLeadingZero(timeValue.hour)}</div>
      )}
      {timeselector.hour && timeselector.minute && (
        <div className="delimiter">:</div>
      )}
      {timeselector.minute && (
        <div className="minute">{addLeadingZero(timeValue.minute)}</div>
      )}
      {timeselector.minute && timeselector.second && (
        <div className="delimiter">:</div>
      )}
      {timeselector.second && (
        <div className="second">{addLeadingZero(timeValue.second)}</div>
      )}
    </div>
  );
}

export default TimeselectorHeader;
