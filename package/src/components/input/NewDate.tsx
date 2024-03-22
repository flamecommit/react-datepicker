'use client';

import { useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue } from '../../types/props';
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
  setIsVisible: (value: boolean) => void;
  viewDate: string;
  setViewDate: (value: string) => void;
}

function splitString(str: string): string[] {
  const regex = /([^\w])/g; // 정규식으로 문자열을 분할
  return str.split(regex);
}

function InputNewDate({
  value,
  valueFormat,
  dateValue,
  setDateValue,
  timeValue,
  setTimeValue,
  setIsVisible,
  viewDate,
  setViewDate,
}: IProps) {
  const formatArray = useMemo(() => splitString(valueFormat), [valueFormat]);

  return (
    <div className={`${NAME_SPACE}__input-container`}>
      <button
        type="button"
        className={`${NAME_SPACE}__trigger-button`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsVisible(true);
          }
        }}
      ></button>
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
    </div>
  );
}

export default InputNewDate;
