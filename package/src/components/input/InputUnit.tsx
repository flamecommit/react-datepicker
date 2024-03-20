'use client';

import { useMemo, useState } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimeValue } from '../../types/props';
import { getValueUnit } from '../../utils/datetime';

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

const VALUE_TYPES = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss'];

function InputUnit({
  value,
  type,
  dateValue,
  setDateValue,
  timeValue,
  setTimeValue,
}: IProps) {
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
    hour?: number;
    minute?: number;
    second?: number;
  }) => {
    setTimeValue({
      hour: hour || timeValue.hour,
      minute: minute || timeValue.minute,
      second: second || timeValue.second,
    });
  };

  const setValue = (element: HTMLDivElement) => {
    let newData = '';

    switch (type) {
      case 'YYYY':
        utilSetDateValue({ year: text });
        return;
      case 'MM':
        newData = Number(text) > 12 ? '12' : `${Number(text)}`;
        element.innerText = newData;
        utilSetDateValue({ month: newData });
        return;
      case 'DD':
        newData = Number(text) > 31 ? '31' : `${Number(text)}`;
        element.innerText = newData;
        utilSetDateValue({ date: newData });
        return;
      case 'HH':
        utilSetTimeValue({ hour: Number(text) });
        return;
      case 'mm':
        utilSetTimeValue({ minute: Number(text) });
        return;
      case 'ss':
        utilSetTimeValue({ second: Number(text) });
        return;
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
      onBlur={(e) => setValue(e.target)}
    />
  );
}

export default InputUnit;
