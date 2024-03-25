'use client';

import { RefObject, useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue, TIsVisible } from '../../types/props';
import { splitString } from '../../utils/string';
import InputUnit from './InputUnit';

interface IProps {
  value: Date | null;
  valueFormat: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  useClearButton: boolean;
  placeholder: string;
  disabled: boolean;
  setIsVisible: (value: TIsVisible) => void;
  viewDate: string;
  setViewDate: (value: string) => void;
  inputRef: RefObject<HTMLDivElement>;
}

export default function DatepickerInput({
  value,
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
}: IProps) {
  const formatArray = useMemo(() => splitString(valueFormat), [valueFormat]);

  return (
    <div className={`${NAME_SPACE}__input-container`} ref={inputRef}>
      {formatArray.map((type, i) => {
        return (
          <InputUnit
            key={i}
            value={value}
            dateValue={dateValue}
            setDateValue={setDateValue}
            timeValue={timeValue}
            setTimeValue={setTimeValue}
            setIsVisible={setIsVisible}
            type={type}
            viewDate={viewDate}
            setViewDate={setViewDate}
          />
        );
      })}
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
