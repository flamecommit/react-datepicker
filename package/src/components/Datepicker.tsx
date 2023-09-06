'use client';

import '../../assets/ReactDatepicker.css';
import * as React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { formatDate } from '../utils/datetime';
import {
  setCenturyPage,
  setDecadePage,
  setYearPage,
  setMonthPage,
} from '../utils/page';
import ViewCentury from './view/Century';
import { NAME_SPACE } from '../constants/core';
import Controller from './Controller';
import ViewDecade from './view/Decade';
import ViewYear from './view/Year';
import ViewMonth from './view/Month';
import { addLeadingZero } from '../utils/string';
import useOutsideClick from '../hooks/useOutsideClick';

interface Iprops {
  initValue?: Date | null;
  isClearButton?: boolean;
  valueFormat?: string;
  labelFormat?: string;
  onChange?: (activeDate: Date | null) => void;
}

function Container({
  initValue = null,
  isClearButton = false,
  valueFormat = 'YYYY-MM-DD',
  labelFormat = 'YYYY / MM',
  onChange,
}: Iprops) {
  // 인수가 없을 땐 LOCAL 기준 현재 시간을 반환한다.
  const NEW_DATE = new Date();
  const [value, setValue] = useState<Date | null>(initValue);
  const [viewDate, setViewDate] = useState<string>(
    formatDate(value || NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('month');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const centuryPage = useMemo(() => setCenturyPage(viewDate), [viewDate]);
  const decadePage = useMemo(() => setDecadePage(viewDate), [viewDate]);
  const yearPage = useMemo(() => setYearPage(viewDate), [viewDate]);
  const monthPage = useMemo(() => setMonthPage(viewDate), [viewDate]);
  const container = useRef(null);

  useOutsideClick(container, () => {
    setIsVisible(false);
  });

  const setViewDateByType = (
    value: string | number,
    type: 'year' | 'month' | 'date'
  ) => {
    type Tsplit = string | number;
    const split = viewDate.split('-') as [Tsplit, Tsplit, Tsplit];
    const valueNum = Number(value);

    if (type === 'year') {
      if (valueNum < 1) {
        split[0] = 1;
      } else {
        split[0] = valueNum;
      }
    }
    if (type === 'month') {
      if (valueNum === 0) {
        if (Number(split[0]) > 1) {
          split[0] = Number(split[0]) - 1;
          split[1] = 12;
        }
      } else if (valueNum === 13) {
        split[0] = Number(split[0]) + 1;
        split[1] = 1;
      } else {
        split[1] = valueNum;
      }
      split[1] = addLeadingZero(split[1]);
    }
    if (type === 'date') split[2] = addLeadingZero(valueNum);

    setViewDate(split.join('-'));
  };

  const handleFocus = () => {
    setIsVisible(true);
  };

  useEffect(() => {
    setIsVisible(false);
    setViewDate(formatDate(value || NEW_DATE, 'YYYY-MM-DD'));
    if (onChange) {
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, onChange, setViewDate]);

  return (
    <div className={`${NAME_SPACE}__wrapper`}>
      <div className={`${NAME_SPACE}__input-container`}>
        <input
          className={`${NAME_SPACE}__input`}
          type="text"
          value={formatDate(value, valueFormat)}
          readOnly
          onFocus={handleFocus}
        />
        {isClearButton && value && (
          <button
            className={`${NAME_SPACE}__clear`}
            onClick={() => setValue(null)}
          >
            Clear
          </button>
        )}
      </div>
      {isVisible && (
        <div className={`${NAME_SPACE}__datepicker-container`} ref={container}>
          <Controller
            viewType={viewType}
            setViewType={setViewType}
            viewDate={viewDate}
            labelFormat={labelFormat}
            setViewDateByType={setViewDateByType}
          />
          <div className={`${NAME_SPACE}__datepicker`}>
            {viewType === 'month' && (
              <ViewMonth
                value={value}
                valueFormat={valueFormat}
                monthPage={monthPage}
                setValue={setValue}
              />
            )}
            {viewType === 'year' && (
              <ViewYear
                value={value}
                yearPage={yearPage}
                setViewDateByType={setViewDateByType}
                setViewType={setViewType}
              />
            )}
            {viewType === 'decade' && (
              <ViewDecade
                value={value}
                decadePage={decadePage}
                setViewDateByType={setViewDateByType}
                setViewType={setViewType}
              />
            )}
            {viewType === 'century' && (
              <ViewCentury
                value={value}
                centuryPage={centuryPage}
                setViewDateByType={setViewDateByType}
                setViewType={setViewType}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Container;
