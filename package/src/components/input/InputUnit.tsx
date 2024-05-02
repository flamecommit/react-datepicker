'use client';

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { NAME_SPACE, VALUE_TYPES } from '../../constants/core';
import { IDateValue, ITimeValue } from '../../types/props';
import { getDateValueUnit, getTimeValueUnit } from '../../utils/datetime';
import { addLeadingZero, isNumeric } from '../../utils/string';

interface IProps {
  type: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  viewDate: string;
  setViewDate: (value: string) => void;
  disabled: boolean;
}

// Function to select text
function selectText(element: HTMLElement) {
  const selection = window.getSelection();
  const range = document.createRange();

  range.selectNodeContents(element);

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

// 형제 Input Element중 NextInputElement를 검색.
function getNextSiblingsWithDataValueTrue(
  currentElement: HTMLElement
): HTMLElement[] {
  const siblingElements: HTMLElement[] = [];
  let nextSibling = currentElement.nextElementSibling as HTMLElement | null;

  while (nextSibling) {
    if (nextSibling.dataset.value === 'true') {
      siblingElements.push(nextSibling);
    }
    nextSibling = nextSibling.nextElementSibling as HTMLElement;
  }

  return siblingElements;
}

function InputUnit({
  type,
  dateValue,
  setDateValue,
  timeValue,
  setTimeValue,
  viewDate,
  setViewDate,
  disabled,
}: IProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLElement>();
  const isValue = useMemo(() => VALUE_TYPES.includes(type), [type]);
  const displayUnit = useMemo((): string => {
    switch (type) {
      case 'YYYY':
      case 'MM':
      case 'DD':
        return getDateValueUnit(dateValue, type);
      case 'hh':
      case 'mm':
      case 'ss':
        return getTimeValueUnit(timeValue, type);
      case ' ':
        return '&nbsp;';
      default:
        return type;
    }
  }, [type, dateValue, timeValue]);
  const [text, setText] = useState<string>(displayUnit);

  const utilSetDateValue = ({
    year,
    month,
    date,
  }: {
    year: number | null;
    month: number | null;
    date: number | null;
  }) => {
    setDateValue({
      year: year !== null ? year : dateValue.year,
      month: month !== null ? month : dateValue.month,
      date: date !== null ? date : dateValue.date,
    });
  };

  const utilSetTimeValue = ({
    hour,
    minute,
    second,
  }: {
    hour: number | null;
    minute: number | null;
    second: number | null;
  }) => {
    setTimeValue({
      hour: hour !== null ? hour : timeValue.hour,
      minute: minute !== null ? minute : timeValue.minute,
      second: second !== null ? second : timeValue.second,
    });
  };

  // Input에서 Focus가 사라졌을 때 입력된 값을 타입에 맞게 value에 저장
  const setValue = (element: HTMLDivElement) => {
    const value = element.textContent || type;

    if (!isNumeric(value)) {
      return setText(type);
    }

    const conditions = {
      YYYY: Number(value) > 9999 ? '9999' : addLeadingZero(value),
      MM: Number(value) > 12 ? '12' : addLeadingZero(value),
      DD: Number(value) > 31 ? '31' : addLeadingZero(value),
      hh: Number(value) > 23 ? '23' : addLeadingZero(value),
      mm: Number(value) > 59 ? '59' : addLeadingZero(value),
      ss: Number(value) > 59 ? '59' : addLeadingZero(value),
    };

    const processedValue = conditions[type as keyof typeof conditions] || value;
    if (text !== processedValue) {
      setText(processedValue);
      // element.innerText = processedValue;
    }
  };

  // Type마다 특정 자리수 입력 시 다음 Input으로 focusing
  const inputHandler = (e: FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const count = target.textContent?.length || 0;
    const value = Number(target.textContent);

    // 숫자 외 입력 방어 코드
    if (target.textContent?.match(/[^0-9]/g)) {
      setText(type);
      target.innerText = type;
      selectText(target);
      return;
    }

    switch (type) {
      case 'YYYY':
        if (count >= 4) {
          if (nextRef.current) {
            nextRef.current.focus();
          } else {
            inputRef.current?.blur();
          }
        }
        return;
      case 'MM':
        if (value >= 2 || count >= 2) {
          if (nextRef.current) {
            nextRef.current.focus();
          } else {
            inputRef.current?.blur();
          }
        }
        return;
      case 'DD':
        if (value >= 4 || count >= 2) {
          if (nextRef.current) {
            nextRef.current.focus();
          } else {
            inputRef.current?.blur();
          }
        }
        return;
      case 'hh':
        if (value >= 3 || count >= 2) {
          if (nextRef.current) {
            nextRef.current.focus();
          } else {
            inputRef.current?.blur();
          }
        }
        return;
      case 'mm':
        if (value >= 6 || count >= 2) {
          if (nextRef.current) {
            nextRef.current.focus();
          } else {
            inputRef.current?.blur();
          }
        }
        return;
      case 'ss':
        if (value >= 6 || count >= 2) {
          if (nextRef.current) {
            nextRef.current.focus();
          } else {
            inputRef.current?.blur();
          }
        }
        return;
      default:
        return;
    }
  };

  // 허용된 입력 외 prevent
  const numberChecker = (e: KeyboardEvent) => {
    const allowKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp',
      'Tab',
    ];

    if (!allowKeys.includes(e.key) && !(e.key >= '0' && e.key <= '9')) {
      e.preventDefault();
    }
  };

  const focusHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    if (disabled) return;
    setTimeout(() => {
      selectText(e.target);
    }, 10);
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!isValue) {
      if (nextRef.current) {
        nextRef.current.focus();
      }
    } else {
      const target = e.target as HTMLElement;
      selectText(target);
    }
  };

  const blurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    if (disabled) return;
    setValue(e.target);
  };

  useEffect(() => {
    setText(displayUnit);
  }, [displayUnit]);

  // Text의 변화를 감지하여 Value에 최종 저장
  useEffect(() => {
    if (!isNumeric(text as string)) return;

    switch (type) {
      case 'YYYY':
        utilSetDateValue({ ...dateValue, year: Number(text) });
        setViewDate(
          `${text}-${viewDate.split('-')[1]}-${viewDate.split('-')[2]}`
        );
        return;
      case 'MM':
        utilSetDateValue({ ...dateValue, month: Number(text) - 1 });
        setViewDate(
          `${viewDate.split('-')[0]}-${text}-${viewDate.split('-')[2]}`
        );
        return;
      case 'DD':
        utilSetDateValue({ ...dateValue, date: Number(text) });
        return;
      case 'hh':
        utilSetTimeValue({ ...timeValue, hour: Number(text) });
        return;
      case 'mm':
        utilSetTimeValue({ ...timeValue, minute: Number(text) });
        return;
      case 'ss':
        utilSetTimeValue({ ...timeValue, second: Number(text) });
        return;
      default:
        return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // 다음 Input Unit을 nextRef에 저장.
  useEffect(() => {
    if (inputRef.current) {
      const nextSiblings = getNextSiblingsWithDataValueTrue(inputRef.current);

      if (nextSiblings.length) {
        nextRef.current = nextSiblings[0];
      }
    }
  }, []);

  return (
    <div
      role="presentation"
      ref={inputRef}
      data-value={isValue}
      className={`${NAME_SPACE}__input-unit`}
      dangerouslySetInnerHTML={{ __html: text }}
      contentEditable={isValue && !disabled}
      suppressContentEditableWarning={true}
      onFocus={focusHandler}
      onClick={clickHandler}
      onInput={inputHandler}
      onKeyDown={numberChecker}
      onBlur={blurHandler}
      inputMode="numeric"
    />
  );
}

export default InputUnit;
