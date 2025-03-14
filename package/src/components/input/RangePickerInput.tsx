'use client';

import { RefObject } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { TIsVisible } from '../../types/props';
import { formatDate } from '../../utils/datetime';

interface IProps {
  valueFormat: string;
  startValue: Date | null;
  endValue: Date | null;
  useClearButton: boolean;
  disabled: boolean;
  setIsVisible: (value: TIsVisible) => void;
  inputRef: RefObject<HTMLDivElement>;
  isVisible: TIsVisible;
  onChangeStart?: (value: Date | null) => void;
  onChangeEnd?: (value: Date | null) => void;
}

export default function RangePickerInput({
  valueFormat,
  startValue,
  endValue,
  setIsVisible,
  inputRef,
  isVisible,
  useClearButton,
  disabled,
  onChangeStart,
  onChangeEnd,
}: IProps) {
  const triggerHandler = (type: 'start' | 'end') => {
    if (disabled) return;
    setIsVisible(type);
  };

  const clearHandler = () => {
    if (onChangeStart) {
      onChangeStart(null);
    }
    if (onChangeEnd) {
      onChangeEnd(null);
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
        data-active={isVisible === 'start'}
        onClick={() => triggerHandler('start')}
        disabled={disabled}
      >
        <span className={`${NAME_SPACE}__input-value-text`}>
          {formatDate(startValue, valueFormat)}
        </span>
      </button>
      <div className={`${NAME_SPACE}__input-range-separator`}> ~ </div>
      <button
        type="button"
        className={`${NAME_SPACE}__input-value`}
        data-active={isVisible === 'end'}
        onClick={() => triggerHandler('end')}
        disabled={disabled}
      >
        <span className={`${NAME_SPACE}__input-value-text`}>
          {formatDate(endValue, valueFormat)}
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
