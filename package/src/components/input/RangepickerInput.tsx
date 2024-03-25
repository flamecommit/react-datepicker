'use client';

import { RefObject, useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue, TIsVisible } from '../../types/props';
import { splitString } from '../../utils/string';
import InputUnit from './InputUnit';

interface IProps {
  valueFormat: string;
  startValue: Date | null;
  dateStartValue: IDateValue;
  setDateStartValue: (value: IDateValue) => void;
  timeStartValue: ITimeValue;
  setTimeStartValue: (value: ITimeValue) => void;
  endValue: Date | null;
  dateEndValue: IDateValue;
  setDateEndValue: (value: IDateValue) => void;
  timeEndValue: ITimeValue;
  setTimeEndValue: (value: ITimeValue) => void;
  useClearButton: boolean;
  placeholder: string;
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
  startValue,
  dateStartValue,
  setDateStartValue,
  timeStartValue,
  setTimeStartValue,
  endValue,
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
}: IProps) {
  const formatArray = useMemo(() => splitString(valueFormat), [valueFormat]);

  return (
    <div className={`${NAME_SPACE}__input-container`} ref={inputRef}>
      <div
        className={`${NAME_SPACE}__input-range-container`}
        data-active={isVisible === 'start'}
      >
        {formatArray.map((type, i) => {
          return (
            <InputUnit
              key={i}
              visibleType="start"
              value={startValue}
              dateValue={dateStartValue}
              setDateValue={setDateStartValue}
              timeValue={timeStartValue}
              setTimeValue={setTimeStartValue}
              setIsVisible={setIsVisible}
              type={type}
              viewDate={viewStartDate}
              setViewDate={setViewStartDate}
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
              value={endValue}
              dateValue={dateEndValue}
              setDateValue={setDateEndValue}
              timeValue={timeEndValue}
              setTimeValue={setTimeEndValue}
              setIsVisible={setIsVisible}
              type={type}
              viewDate={viewEndDate}
              setViewDate={setViewEndDate}
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
