'use client';

import { RefObject } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { TIsVisible } from '../../types/props';
import { formatDate } from '../../utils/datetime';

interface IProps {
  value: Date | null;
  onChange?: (value: Date | null) => void;
  valueFormat: string;
  useClearButton: boolean;
  disabled: boolean;
  setIsVisible: (value: TIsVisible) => void;
  inputRef: RefObject<HTMLDivElement>;
}

export default function DatePickerInput({
  value,
  onChange,
  valueFormat,
  setIsVisible,
  inputRef,
  useClearButton,
  disabled,
}: IProps) {
  const triggerHandler = () => {
    if (disabled) return;
    setIsVisible(true);
  };

  const clearHandler = () => {
    if (onChange) {
      onChange(null);
    }
  };

  return (
    <div
      className={`${NAME_SPACE}__input-container`}
      ref={inputRef}
      aria-disabled={disabled}
    >
      <div>{formatDate(value, valueFormat)}</div>
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
          onClick={clearHandler}
        >
          Clear
        </button>
      )}
    </div>
  );
}
