'use client';

import { Fragment } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { ITimeStep, ITimeValue, ITimepicker } from '../../types/props';
import TimepickerSelectorList from './SelectorList';

interface IProps {
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  timepicker: ITimepicker;
  timeStep: ITimeStep;
}

export default function TimepickerSelector({
  timeValue,
  setTimeValue,
  timepicker,
  timeStep,
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
          {timepicker[key as keyof ITimepicker] && (
            <TimepickerSelectorList
              timeKey={key as keyof ITimepicker}
              items={items}
              timeValue={timeValue}
              setTimeValue={setTimeValue}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
}
