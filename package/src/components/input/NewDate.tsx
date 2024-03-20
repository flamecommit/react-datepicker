'use client';

import { useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue } from '../../types/props';
import InputUnit from './InputUnit';

interface IProps {
  value: Date | null;
  valueFormat: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
}

function splitString(str: string): string[] {
  const regex = /([^\w])/g; // 정규식으로 문자열을 분할
  return str.split(regex);
}

function InputNewDate({ value, valueFormat, dateValue, setDateValue }: IProps) {
  const formatArray = useMemo(() => splitString(valueFormat), [valueFormat]);

  return (
    <div className={`${NAME_SPACE}__input-container`}>
      {formatArray.map((o, i) => {
        return (
          <InputUnit
            key={i}
            value={value}
            dateValue={dateValue}
            setDateValue={setDateValue}
            type={o}
          />
        );
      })}
    </div>
  );
}

export default InputNewDate;
