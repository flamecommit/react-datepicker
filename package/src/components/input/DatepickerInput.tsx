'use client';

import { RefObject, useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue, TIsVisible } from '../../types/props';
import { splitString } from '../../utils/string';
import InputUnit from './InputUnit';

interface IProps {
  valueFormat: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  useClearButton: boolean;
  disabled: boolean;
  setIsVisible: (value: TIsVisible) => void;
  viewDate: string;
  setViewDate: (value: string) => void;
  inputRef: RefObject<HTMLDivElement>;
}

export default function DatepickerInput({
  valueFormat,
  dateValue,
  setDateValue,
  timeValue,
  setTimeValue,
  setIsVisible,
  viewDate,
  setViewDate,
  inputRef,
  useClearButton,
  disabled,
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
            timeValue={timeValue}
            setTimeValue={setTimeValue}
            type={type}
            viewDate={viewDate}
            setViewDate={setViewDate}
            disabled={disabled}
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
