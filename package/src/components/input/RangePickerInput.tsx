'use client';

import { RefObject } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue, TIsVisible } from '../../types/props';
import { formatDateValue } from '../../utils/datetime';

interface IProps {
  valueFormat: string;
  dateStartValue: IDateValue;
  setDateStartValue: (value: IDateValue) => void;
  timeStartValue: ITimeValue;
  setTimeStartValue: (value: ITimeValue) => void;
  dateEndValue: IDateValue;
  setDateEndValue: (value: IDateValue) => void;
  timeEndValue: ITimeValue;
  setTimeEndValue: (value: ITimeValue) => void;
  useClearButton: boolean;
  disabled: boolean;
  setIsVisible: (value: TIsVisible) => void;
  inputRef: RefObject<HTMLDivElement>;
  isVisible: TIsVisible;
}

export default function RangePickerInput({
  valueFormat,
  dateStartValue,
  setDateStartValue,
  timeStartValue,
  setTimeStartValue,
  dateEndValue,
  setDateEndValue,
  timeEndValue,
  setTimeEndValue,
  setIsVisible,
  inputRef,
  isVisible,
  useClearButton,
  disabled,
}: IProps) {
  const triggerHandler = (type: 'start' | 'end') => {
    if (disabled) return;
    setIsVisible(type);
  };

  return (
    <div
      className={`${NAME_SPACE}__input-container`}
      ref={inputRef}
      aria-disabled={disabled}
    >
      <div
        className={`${NAME_SPACE}__input-range-container`}
        data-active={isVisible === 'start'}
      >
        <div>
          {formatDateValue(dateStartValue, timeStartValue, valueFormat)}
        </div>
      </div>
      <button
        type="button"
        className={`${NAME_SPACE}__trigger`}
        onClick={() => triggerHandler('start')}
        disabled={disabled}
      >
        Trigger
      </button>
      <div className={`${NAME_SPACE}__input-range-separator`}> ~ </div>
      <div
        className={`${NAME_SPACE}__input-range-container`}
        data-active={isVisible === 'end'}
      >
        <div>{formatDateValue(dateEndValue, timeEndValue, valueFormat)}</div>
      </div>
      <button
        type="button"
        className={`${NAME_SPACE}__trigger`}
        onClick={() => triggerHandler('end')}
        disabled={disabled}
      >
        Trigger
      </button>
      {useClearButton && (
        <button
          type="button"
          className={`${NAME_SPACE}__clear`}
          onClick={() => {
            setDateStartValue({
              year: null,
              month: null,
              date: null,
            });
            setDateEndValue({
              year: null,
              month: null,
              date: null,
            });
            setTimeStartValue({
              hour: 0,
              minute: 0,
              second: 0,
            });
            setTimeEndValue({
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
