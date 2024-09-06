'use client';

import { Fragment } from 'react';
import { NAME_SPACE } from '../../constants/core';
import {
  IDateValue,
  ITimePicker,
  ITimeStep,
  ITimeValue,
} from '../../types/props';
import TimePickerSelectorList from './SelectorList';

interface IProps {
  timeValue: ITimeValue;
  timePicker: ITimePicker;
  timeStep: ITimeStep;
  dateValue: IDateValue;
  onChange?: (newValue: Date | null) => void;
}

export default function TimePickerSelector({
  timeValue,
  timePicker,
  timeStep,
  dateValue,
  onChange,
}: IProps) {
  const generateArray = (step: number, max: number) => {
    const hours = [];
    for (let i = 0; i <= max; i += step) {
      hours.push(i);
    }
    return hours;
  };

  const selectors = {
    hour: {
      items: generateArray(timeStep.hour || 1, 23),
    },
    minute: {
      items: generateArray(timeStep.minute || 1, 59),
    },
    second: {
      items: generateArray(timeStep.second || 1, 59),
    },
  };

  return (
    <div className={`${NAME_SPACE}__timepicker-selector`}>
      {Object.entries(selectors).map(([key, { items }]) => (
        <Fragment key={key}>
          {timePicker[key as keyof ITimePicker] && (
            <TimePickerSelectorList
              timeKey={key as keyof ITimePicker}
              items={items}
              timeValue={timeValue}
              dateValue={dateValue}
              onChange={onChange}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
