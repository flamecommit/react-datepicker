'use client';

import '../../assets/ReactDatepicker.css';
import * as React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { getFormatDatetime } from '../utils/datetime';
import { setCenturyPage, setDecadePage, setMonthPage } from '../utils/page';
import ViewCentury from './view/Century';
import { NAME_SPACE } from './constants/core';
import Controller from './Controller';
import ViewDecade from './view/Decade';
import ViewYear from './view/Year';
import ViewMonth from './view/Month';
import { addLeadingZero } from '../utils/string';
import useOutsideClick from '../hooks/useOutsideClick';

interface Iprops {
  initValue?: Date;
  onChange?: (activeDate: Date) => void;
}

function Container({ initValue = new Date(), onChange }: Iprops) {
  // 인수가 없을 땐 LOCAL 기준 현재 시간을 반환한다.
  const [value, setValue] = useState<Date>(initValue);
  const [viewDate, setViewDate] = useState<string>(
    getFormatDatetime(initValue, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('month');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const centuryPage = useMemo(() => setCenturyPage(viewDate), [viewDate]);
  const decadePage = useMemo(() => setDecadePage(viewDate), [viewDate]);
  // const yearPage = useMemo(() => setYearPage(viewDate), [viewDate]);
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
    if (onChange) {
      onChange(value);
    }
  }, [value, onChange]);

  // const [centuryPage, setCenturyPage] = useState<number>(0);
  // const [decadePage, setDecadePage] = useState<number>(0);
  // const [yearPage, setYearPage] = useState<number>(0);
  // const [monthPage, setMonthPage] = useState<number>(0);

  // 2041-07-15
  // centuryPage 21
  // decadePage 205
  // yearPage 2041
  // monthPage 24487

  return (
    <div className={`${NAME_SPACE}__wrapper`}>
      <div className={`${NAME_SPACE}__input-container`}>
        <input
          type="text"
          value={getFormatDatetime(value, 'YYYY-MM-DD')}
          readOnly
          onFocus={handleFocus}
        />
      </div>
      {isVisible && (
        <div className={`${NAME_SPACE}__datepicker-container`} ref={container}>
          <Controller
            viewType={viewType}
            setViewType={setViewType}
            viewDate={viewDate}
            setViewDateByType={setViewDateByType}
          />
          <div className={`${NAME_SPACE}__datepicker`}>
            {viewType === 'month' && (
              <ViewMonth monthPage={monthPage} setValue={setValue} />
            )}
            {viewType === 'year' && (
              <ViewYear
                setViewDateByType={setViewDateByType}
                setViewType={setViewType}
              />
            )}
            {viewType === 'decade' && (
              <ViewDecade
                decadePage={decadePage}
                setViewDateByType={setViewDateByType}
                setViewType={setViewType}
              />
            )}
            {viewType === 'century' && (
              <ViewCentury
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
