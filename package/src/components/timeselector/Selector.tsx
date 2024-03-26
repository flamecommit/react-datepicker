'use client';

import { Fragment } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { ITimeStep, ITimeValue, ITimeselector } from '../../types/props';
import TimeselectorSelectorList from './SelectorList';

interface IProps {
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  timeselector: ITimeselector;
  timeStep: ITimeStep;
}

function TimeselectorSelector({
  timeValue,
  setTimeValue,
  timeselector,
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
    <div className={`${NAME_SPACE}__timeselector-selector`}>
      {Object.entries(selectors).map(([key, { items }]) => (
        <Fragment key={key}>
          {timeselector[key as keyof ITimeselector] && (
            <TimeselectorSelectorList
              timeKey={key as keyof ITimeselector}
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

export default TimeselectorSelector;
