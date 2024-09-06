'use client';

import { NAME_SPACE } from '../../constants/core';
import { ITimePicker, ITimeValue } from '../../types/props';
import { addLeadingZero } from '../../utils/string';

interface IProps {
  timeValue: ITimeValue;
  timePicker: ITimePicker;
}

export default function TimePickerHeader({ timeValue, timePicker }: IProps) {
  return (
    <div className={`${NAME_SPACE}__timepicker-header`}>
      {timePicker.hour && (
        <div className="hour">{addLeadingZero(timeValue.hour)}</div>
      )}
      {timePicker.hour && timePicker.minute && (
        <div className="delimiter">:</div>
      )}
      {timePicker.minute && (
        <div className="minute">{addLeadingZero(timeValue.minute)}</div>
      )}
      {timePicker.minute && timePicker.second && (
        <div className="delimiter">:</div>
      )}
      {timePicker.second && (
        <div className="second">{addLeadingZero(timeValue.second)}</div>
      )}
    </div>
  );
}
