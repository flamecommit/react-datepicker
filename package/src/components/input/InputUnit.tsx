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
import { IDateValue, ITimeValue, TIsVisible } from '../../types/props';
import { getValueUnit } from '../../utils/datetime';
import { addLeadingZero, isNumeric } from '../../utils/string';

interface IProps {
  visibleType?: TIsVisible;
  value: Date | null;
  type: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
  setIsVisible: (value: TIsVisible) => void;
  viewDate: string;
  setViewDate: (value: string) => void;
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

function InputUnit({
  visibleType = true,
  value,
  type,
  dateValue,
  setDateValue,
  timeValue,
  setTimeValue,
  setIsVisible,
  viewDate,
  setViewDate,
}: IProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLElement>();
  const isValue = useMemo(() => VALUE_TYPES.includes(type), [type]);
  const [text, setText] = useState<string | number | null>();
  const displayUnit = useMemo((): string => {
    switch (type) {
      case 'YYYY':
      case 'MM':
      case 'DD':
      case 'HH':
      case 'mm':
      case 'ss':
        return getValueUnit(value, type);
      case ' ':
        return '&nbsp;';
      default:
        return type;
    }
  }, [type, value]);

  const utilSetDateValue = ({
    year,
    month,
    date,
  }: {
    year?: string | number | null;
    month?: string | number | null;
    date?: string | number | null;
  }) => {
    setDateValue({
      year: year ? year : dateValue.year,
      month: month ? Number(month) - 1 : dateValue.month,
      date: date ? date : dateValue.date,
    });
  };

  const utilSetTimeValue = ({
    hour,
    minute,
    second,
  }: {
    hour?: string | number | null;
    minute?: string | number | null;
    second?: string | number | null;
  }) => {
    setTimeValue({
      hour: hour ? Number(hour) : timeValue.hour,
      minute: minute ? Number(minute) : timeValue.minute,
      second: second ? Number(second) : timeValue.second,
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
      HH: Number(value) > 23 ? '23' : addLeadingZero(value),
      mm: Number(value) > 59 ? '59' : addLeadingZero(value),
      ss: Number(value) > 59 ? '59' : addLeadingZero(value),
    };

    const processedValue = conditions[type as keyof typeof conditions] || value;
    setText(processedValue);
    element.innerText = processedValue;
  };

  // Text의 변화를 감지하여 Value에 최종 저장
  useEffect(() => {
    if (!isNumeric(text as string)) return;

    switch (type) {
      case 'YYYY':
        utilSetDateValue({ year: text });
        setViewDate(
          `${text}-${viewDate.split('-')[1]}-${viewDate.split('-')[2]}`
        );
        return;
      case 'MM':
        utilSetDateValue({ month: text });
        setViewDate(
          `${viewDate.split('-')[0]}-${text}-${viewDate.split('-')[2]}`
        );
        return;
      case 'DD':
        utilSetDateValue({ date: text });
        return;
      case 'HH':
        utilSetTimeValue({ hour: text });
        return;
      case 'mm':
        utilSetTimeValue({ minute: text });
        return;
      case 'ss':
        utilSetTimeValue({ second: text });
        return;
      default:
        return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  // Type마다 특정 자리수 입력 시 다음 Input으로 focusing
  const handleInput = (e: FormEvent<HTMLDivElement>) => {
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
      case 'HH':
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

  // 다음 Input Unit을 nextRef에 저장.
  useEffect(() => {
    if (inputRef.current) {
      const nextSiblings = getNextSiblingsWithDataValueTrue(inputRef.current);

      if (nextSiblings.length) {
        nextRef.current = nextSiblings[0];
      }
    }
  }, []);

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

  return (
    <div
      role="presentation"
      ref={inputRef}
      data-value={isValue}
      className={`${NAME_SPACE}__input-unit`}
      dangerouslySetInnerHTML={{ __html: displayUnit }}
      contentEditable={isValue}
      suppressContentEditableWarning={true}
      onFocus={(e) => {
        setTimeout(() => {
          setIsVisible(visibleType);
          selectText(e.target);
        }, 1);
      }}
      onClick={(e) => {
        if (!isValue) return;
        const target = e.target as HTMLElement;
        selectText(target);
      }}
      onInput={handleInput}
      onKeyDown={numberChecker}
      onBlur={(e) => {
        setValue(e.target);
      }}
      inputMode="numeric"
    />
  );
}

export default InputUnit;
