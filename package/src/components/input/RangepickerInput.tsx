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
}

export default function RangepickerInput({
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
}: IProps) {
  const formatArray = useMemo(() => splitString(valueFormat), [valueFormat]);

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
              visibleType="start"
              dateValue={dateStartValue}
              setDateValue={setDateStartValue}
              timeValue={timeStartValue}
              setTimeValue={setTimeStartValue}
              setIsVisible={setIsVisible}
              type={type}
              viewDate={viewStartDate}
              setViewDate={setViewStartDate}
              disabled={disabled}
            />
          );
        })}
      </div>
      <div className={`${NAME_SPACE}__input-range-separator`}> ~ </div>
      <div
        className={`${NAME_SPACE}__input-range-container`}
        data-active={isVisible === 'end'}
      >
        {formatArray.map((type, i) => {
          return (
            <InputUnit
              key={i}
              visibleType="end"
              dateValue={dateEndValue}
              setDateValue={setDateEndValue}
              timeValue={timeEndValue}
              setTimeValue={setTimeEndValue}
              setIsVisible={setIsVisible}
              type={type}
              viewDate={viewEndDate}
              setViewDate={setViewEndDate}
              disabled={disabled}
            />
          );
        })}
      </div>
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
