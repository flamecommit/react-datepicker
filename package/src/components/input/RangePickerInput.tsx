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
      <div
        className={`${NAME_SPACE}__input-range-container`}
        data-active={isVisible === 'start'}
      >
        <div>{formatDate(startValue, valueFormat)}</div>
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
        <div>{formatDate(endValue, valueFormat)}</div>
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
          onClick={clearHandler}
        >
          Clear
        </button>
      )}
    </div>
  );
}
