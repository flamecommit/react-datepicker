'use client';

import * as React from 'react';
import { formatDate } from '../../utils/datetime';
import { NAME_SPACE } from '../../constants/core';

interface IProps {
  startValue: Date | null;
  endValue: Date | null;
  valueFormat: string;
  useClearButton: boolean;
  setStartValue: (value: Date | null) => void;
  setEndValue: (value: Date | null) => void;
  setIsVisible: (value: boolean) => void;
}

function InputRange({
  startValue,
  endValue,
  valueFormat,
  useClearButton,
  setStartValue,
  setEndValue,
  setIsVisible,
}: IProps) {
  const handleFocus = () => {
    setIsVisible(true);
  };

  const setRangeValue = () =>
    `${formatDate(startValue, valueFormat)} - ${formatDate(
      endValue,
      valueFormat
    )}`;

  const clearValue = () => {
    setStartValue(null);
    setEndValue(null);
  };

  return (
    <div className={`${NAME_SPACE}__input-container`}>
      <input
        className={`${NAME_SPACE}__input`}
        type="text"
        value={setRangeValue()}
        readOnly
        onFocus={handleFocus}
      />
      {useClearButton && (startValue || endValue) && (
        <button className={`${NAME_SPACE}__clear`} onClick={clearValue}>
          Clear
        </button>
      )}
    </div>
  );
}

export default InputRange;
