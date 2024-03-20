'use client';

import { useMemo, useState } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue } from '../../types/props';
import { getValueUnit } from '../../utils/datetime';

interface IProps {
  value: Date | null;
  type: string;
  dateValue: IDateValue;
  setDateValue: (value: IDateValue) => void;
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

const VALUE_TYPES = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss'];

function InputUnit({ value, type, dateValue, setDateValue }: IProps) {
  const isValue = useMemo(() => VALUE_TYPES.includes(type), [type]);
  const [text, setText] = useState<string | null>();
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
    year?: string | null;
    month?: string | null;
    date?: string | null;
  }) => {
    setDateValue({
      year: year ? year : dateValue.year,
      month: month ? Number(month) - 1 : dateValue.month,
      date: date ? date : dateValue.date,
    });
  };

  const setValue = () => {
    console.log(text);
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
      case 'mm':
      case 'ss':
        return getValueUnit(value, type);
      case ' ':
        return '&nbsp;';
      default:
        return type;
    }
  };

  return (
    <div
      className={`${NAME_SPACE}__input-unit`}
      dangerouslySetInnerHTML={{ __html: displayUnit }}
      contentEditable={isValue}
      suppressContentEditableWarning={true}
      onInput={(e) => setText(e.currentTarget.textContent)}
      onFocus={(e) => selectText(e.target)}
      onBlur={() => setValue()}
    />
  );
}

export default InputUnit;
