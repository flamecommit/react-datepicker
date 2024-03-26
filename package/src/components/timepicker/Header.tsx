'use client';

import { NAME_SPACE } from '../../constants/core';
import { ITimeValue, ITimepicker } from '../../types/props';
import { addLeadingZero } from '../../utils/string';

interface IProps {
  timeValue: ITimeValue;
  timepicker: ITimepicker;
}

export default function TimepickerHeader({ timeValue, timepicker }: IProps) {
  return (
    <div className={`${NAME_SPACE}__timepicker-header`}>
      {timepicker.hour && (
        <div className="hour">{addLeadingZero(timeValue.hour)}</div>
      )}
      {timepicker.hour && timepicker.minute && (
        <div className="delimiter">:</div>
      )}
      {timepicker.minute && (
        <div className="minute">{addLeadingZero(timeValue.minute)}</div>
      )}
      {timepicker.minute && timepicker.second && (
        <div className="delimiter">:</div>
      )}
      {timepicker.second && (
        <div className="second">{addLeadingZero(timeValue.second)}</div>
      )}
    </div>
  );
}
