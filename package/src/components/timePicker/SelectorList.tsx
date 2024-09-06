'use client';

import { useEffect, useRef } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { IDateValue, ITimePicker, ITimeValue } from '../../types/props';
import { valueToDateObj } from '../../utils/datetime';
import { addLeadingZero } from '../../utils/string';

interface IProps {
  timeKey: keyof ITimePicker;
  items: number[];
  timeValue: ITimeValue;
  dateValue: IDateValue;
  onChange?: (newValue: Date | null) => void;
}

export default function TimePickerSelectorList({
  timeKey,
  items,
  timeValue,
  dateValue,
  onChange,
}: IProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll 가운데 정렬
    if (!listRef.current) return;
    const clientHeight = listRef.current?.clientHeight;
    const scrollHeight = listRef.current?.scrollHeight;
    const itemsCount = items.length;
    const itemHeight = scrollHeight / itemsCount;
    const activeIndex = items.findIndex((item) => item === timeValue[timeKey]);
    listRef.current?.scrollTo({
      top: activeIndex * itemHeight - (clientHeight - itemHeight) / 2,
    });
  }, [items, timeKey, timeValue]);

  const handleClick = (value: number) => {
    const newTimeValue = {
      ...timeValue,
      [timeKey]: value,
    };
    const newDate = valueToDateObj(dateValue, newTimeValue);

    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <div className={`${NAME_SPACE}__timepicker-list`} ref={listRef}>
      {items.map((item, index) => (
        <div key={index} className={`${NAME_SPACE}__timepicker-list-item`}>
          <button
            type="button"
            className={`${NAME_SPACE}__timepicker-list-button`}
            data-active={item === timeValue[timeKey]}
            onClick={() => handleClick(item)}
          >
            {addLeadingZero(item)}
          </button>
        </div>
      ))}
    </div>
  );
}
