'use client';

import { RefObject } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue, TIsVisible } from '../../types/props';
import { formatDateValue } from '../../utils/datetime';

interface IProps {
  valueFormat: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  useClearButton: boolean;
  disabled: boolean;
  setIsVisible: (value: TIsVisible) => void;
  inputRef: RefObject<HTMLDivElement>;
}

export default function DatePickerInput({
  valueFormat,
  dateValue,
  setDateValue,
  timeValue,
  setTimeValue,
  setIsVisible,
  inputRef,
  useClearButton,
  disabled,
}: IProps) {
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
      <div>{formatDateValue(dateValue, timeValue, valueFormat)}</div>
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
