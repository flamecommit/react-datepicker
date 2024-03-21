'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { NAME_SPACE, VALUE_TYPES } from '../../constants/core';
import { IDateValue, ITimeValue } from '../../types/props';
import { getValueUnit } from '../../utils/datetime';
import { addLeadingZero, isNumeric } from '../../utils/string';

interface IProps {
  value: Date | null;
  type: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
}

// Function to select text
function selectText(element: HTMLDivElement) {
  const selection = window.getSelection();
  const range = document.createRange();

  range.selectNodeContents(element);

  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

function InputUnit({
  value,
  type,
  dateValue,
  setDateValue,
  timeValue,
  setTimeValue,
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
    if (!element.textContent || !isNumeric(element.textContent)) return;

    let value: string | number = element.textContent;

    switch (type) {
      case 'YYYY':
        value = Number(value) > 9999 ? '9999' : addLeadingZero(value);
        setText(value);
        element.innerText = value;
        return;
      case 'MM':
        value = Number(value) > 12 ? '12' : addLeadingZero(value);
        setText(value);
        element.innerText = value;
        return;
      case 'DD':
        value = Number(value) > 31 ? '31' : addLeadingZero(value);
        setText(value);
        element.innerText = value;
        return;
      case 'HH':
        value = Number(value) > 23 ? '23' : addLeadingZero(value);
        setText(value);
        element.innerText = value;
        return;
      case 'mm':
        value = Number(value) > 59 ? '59' : addLeadingZero(value);
        setText(value);
        element.innerText = value;
        return;
      case 'ss':
        value = Number(value) > 59 ? '59' : addLeadingZero(value);
        setText(value);
        element.innerText = value;
        return;
      case ' ':
        return '&nbsp;';
      default:
        return type;
    }
  };

  // Text의 변화를 감지하여 Value에 최종 저장
  useEffect(() => {
    switch (type) {
      case 'YYYY':
        utilSetDateValue({ year: text });
        return;
      case 'MM':
        utilSetDateValue({ month: text });
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

    if (type === 'YYYY' && count >= 4) {
      if (nextRef.current) {
        nextRef.current.focus();
      } else {
        inputRef.current?.blur();
      }
    }

    if (type === 'MM' && count >= 2) {
      if (nextRef.current) {
        nextRef.current.focus();
      } else {
        inputRef.current?.blur();
      }
    }

    if (type === 'DD' && count >= 2) {
      if (nextRef.current) {
        nextRef.current.focus();
      } else {
        inputRef.current?.blur();
      }
    }

    if (type === 'HH' && count >= 2) {
      if (nextRef.current) {
        nextRef.current.focus();
      } else {
        inputRef.current?.blur();
      }
    }

    if (type === 'mm' && count >= 2) {
      if (nextRef.current) {
        nextRef.current.focus();
      } else {
        inputRef.current?.blur();
      }
    }

    if (type === 'ss' && count >= 2) {
      if (nextRef.current) {
        nextRef.current.focus();
      } else {
        inputRef.current?.blur();
      }
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

  return (
    <div
      ref={inputRef}
      data-value={isValue}
      className={`${NAME_SPACE}__input-unit`}
      dangerouslySetInnerHTML={{ __html: displayUnit }}
      contentEditable={isValue}
      suppressContentEditableWarning={true}
      onFocus={(e) => setTimeout(() => selectText(e.target), 1)}
      onInput={handleInput}
      onBlur={(e) => {
        setValue(e.target);
      }}
    />
  );
}

export default InputUnit;
