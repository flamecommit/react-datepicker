'use client';

import { RefObject, useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue, TIsVisible } from '../../types/props';
import { splitString } from '../../utils/string';
import InputUnit from './InputUnit';

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
  viewStartDate: string;
  setViewStartDate: (value: string) => void;
  viewEndDate: string;
  setViewEndDate: (value: string) => void;
  inputRef: RefObject<HTMLDivElement>;
  isVisible: TIsVisible;
  onChangeStart?: (newValue: Date | null) => void;
  onChangeEnd?: (newValue: Date | null) => void;
  isMounted: boolean;
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
  viewStartDate,
  setViewStartDate,
  viewEndDate,
  setViewEndDate,
  inputRef,
  isVisible,
  useClearButton,
  disabled,
  onChangeStart,
  onChangeEnd,
  isMounted,
}: IProps) {
  const formatArray = useMemo(() => splitString(valueFormat), [valueFormat]);

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
        {formatArray.map((type, i) => {
          return (
            <InputUnit
              key={i}
              dateValue={dateStartValue}
              setDateValue={setDateStartValue}
              timeValue={timeStartValue}
              setTimeValue={setTimeStartValue}
              type={type}
              viewDate={viewStartDate}
              setViewDate={setViewStartDate}
              disabled={disabled}
              onChange={onChangeStart}
              isMounted={isMounted}
            />
          );
        })}
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
        {formatArray.map((type, i) => {
          return (
            <InputUnit
              key={i}
              dateValue={dateEndValue}
              setDateValue={setDateEndValue}
              timeValue={timeEndValue}
              setTimeValue={setTimeEndValue}
              type={type}
              viewDate={viewEndDate}
              setViewDate={setViewEndDate}
              disabled={disabled}
              onChange={onChangeEnd}
              isMounted={isMounted}
            />
          );
        })}
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
