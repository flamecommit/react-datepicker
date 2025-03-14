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
  inputRef: RefObject<HTMLDivElement>;
  isVisible: TIsVisible;
  setIsVisible: (value: TIsVisible) => void;
}

export default function DatePickerInput({
  value,
  onChange,
  valueFormat,
  inputRef,
  useClearButton,
  disabled,
  isVisible,
  setIsVisible,
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
      <button
        type="button"
        className={`${NAME_SPACE}__input-value`}
        onClick={triggerHandler}
        disabled={disabled}
        data-active={isVisible}
      >
        <span className={`${NAME_SPACE}__input-value-text`}>
          {formatDate(value, valueFormat)}
        </span>
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
