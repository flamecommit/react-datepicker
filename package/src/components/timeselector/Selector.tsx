'use client';

import * as React from 'react';
import { Fragment } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { ITimeValue, ITimeselector } from '../../types/props';
import TimeselectorSelectorList from './SelectorList';

interface IProps {
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  timeselector: ITimeselector;
  hourStep: number;
  minuteStep: number;
  secondStep: number;
}

function TimeselectorSelector({
  timeValue,
  setTimeValue,
  timeselector,
  hourStep,
  minuteStep,
  secondStep,
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
      items: generateArray(hourStep, 23),
    },
    minute: {
      items: generateArray(minuteStep, 59),
    },
    second: {
      items: generateArray(secondStep, 59),
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
