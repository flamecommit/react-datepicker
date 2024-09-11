'use client';

import { RefObject, useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import {
  IDateValue,
  ITimePicker,
  ITimeValue,
  TIsVisible,
} from '../../types/props';
import { splitString } from '../../utils/string';
import InputUnit from './InputUnit';

interface IProps {
  valueFormat: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
  onChange?: (newValue: Date | null) => void;
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  useClearButton: boolean;
  disabled: boolean;
  setIsVisible: (value: TIsVisible) => void;
  viewDate: string;
  setViewDate: (value: string) => void;
  inputRef: RefObject<HTMLDivElement>;
  isMounted: boolean;
  timePicker: false | ITimePicker;
}

export default function DatePickerInput({
  valueFormat,
  dateValue,
  setDateValue,
  onChange,
  timeValue,
  setTimeValue,
  setIsVisible,
  viewDate,
  setViewDate,
  inputRef,
  useClearButton,
  disabled,
  isMounted,
  timePicker,
}: IProps) {
  const formatArray = useMemo(() => splitString(valueFormat), [valueFormat]);

  const triggerHandler = () => {
    if (disabled) return;
    setIsVisible(true);
  };

  return (
    <div
      className={`${NAME_SPACE}__input-container`}
      ref={inputRef}
      aria-disabled={disabled}
    >
      {formatArray.map((type, i) => {
        return (
          <InputUnit
            key={i}
            dateValue={dateValue}
            setDateValue={setDateValue}
            onChange={onChange}
            timeValue={timeValue}
            setTimeValue={setTimeValue}
            type={type}
            viewDate={viewDate}
            setViewDate={setViewDate}
            disabled={disabled}
            isMounted={isMounted}
            timePicker={timePicker}
          />
        );
      })}
      <button
        type="button"
        className={`${NAME_SPACE}__trigger`}
        onClick={triggerHandler}
        disabled={disabled}
      >
        Trigger
      </button>
      {useClearButton && (
        <button
          type="button"
          className={`${NAME_SPACE}__clear`}
          onClick={() => {
            setDateValue({
              year: null,
              month: null,
              date: null,
            });
            setTimeValue({
              hour: 0,
              minute: 0,
              second: 0,
            });
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
}
