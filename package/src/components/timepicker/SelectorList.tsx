'use client';

import { useEffect, useRef } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { ITimeValue, ITimepicker } from '../../types/props';
import { addLeadingZero } from '../../utils/string';

interface IProps {
  timeKey: keyof ITimepicker;
  items: number[];
  timeValue: ITimeValue;
  setTimeValue: (value: ITimeValue) => void;
}

export default function TimepickerSelectorList({
  timeKey,
  items,
  timeValue,
  setTimeValue,
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

  return (
    <div className={`${NAME_SPACE}__timepicker-list`} ref={listRef}>
      {items.map((item, index) => (
        <div key={index} className={`${NAME_SPACE}__timepicker-list-item`}>
          <button
            type="button"
            className={`${NAME_SPACE}__timepicker-list-button`}
            data-active={item === timeValue[timeKey]}
            onClick={() =>
              setTimeValue({
                ...timeValue,
                [timeKey]: item,
              })
            }
          >
            {addLeadingZero(item)}
          </button>
        </div>
      ))}
    </div>
  );
}
