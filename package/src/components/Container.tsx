'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import { getFormatDatetime } from '../utils/datetime';
import {
  setCenturyPage,
  setDecadePage,
  setYearPage,
  setMonthPage,
} from '../utils/page';
import ViewCentury from './view/Century';
import { NAME_SPACE } from './constants/core';
import Controller from './Controller';
import ViewDecade from './view/Decade';
import ViewYear from './view/Year';
import ViewMonth from './view/Month';

function Container() {
  // 인수가 없을 땐 LOCAL 기준 현재 시간을 반환한다.
  const NEW_DATE = new Date();
  const [activeDate, setActiveDate] = useState<Date>(NEW_DATE);
  const [viewDate, setViewDate] = useState<string>(
    getFormatDatetime(NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('century');

  const centuryPage = useMemo(() => setCenturyPage(viewDate), [viewDate]);
  const decadePage = useMemo(() => setDecadePage(viewDate), [viewDate]);
  const yearPage = useMemo(() => setYearPage(viewDate), [viewDate]);
  const monthPage = useMemo(() => setMonthPage(viewDate), [viewDate]);

  const setViewDateByType = (
    value: string,
    type: 'year' | 'month' | 'date'
  ) => {
    const split = viewDate.split('-');

    if (type === 'year') split[0] = value;
    if (type === 'month') split[1] = value;
    if (type === 'date') split[2] = value;

    setViewDate(split.join('-'));
  };

  // const [centuryPage, setCenturyPage] = useState<number>(0);
  // const [decadePage, setDecadePage] = useState<number>(0);
  // const [yearPage, setYearPage] = useState<number>(0);
  // const [monthPage, setMonthPage] = useState<number>(0);

  // 2041-07-15
  // centuryPage 21
  // decadePage 205
  // yearPage 2041
  // monthPage 24487

  console.log(NEW_DATE);

  return (
    <div className={`${NAME_SPACE}__wrapper`}>
      <div className={`${NAME_SPACE}__input-container`}>
        <input
          type="text"
          value={getFormatDatetime(activeDate, 'YYYY-MM-DD')}
          readOnly
        />
      </div>
      <div className={`${NAME_SPACE}__datepicker-container`}>
        <Controller
          viewType={viewType}
          setViewType={setViewType}
          viewDate={viewDate}
        />
        <div className={`${NAME_SPACE}__datepicker`}>
          {viewType === 'month' && (
            <ViewMonth monthPage={monthPage} setActiveDate={setActiveDate} />
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
      <div
        className="dashboard"
        style={{
          position: 'fixed',
          top: 50,
          right: 50,
          textAlign: 'right',
        }}
      >
        <div>Century : {centuryPage}</div>
        <div>Decade : {decadePage}</div>
        <div>Year : {yearPage}</div>
        <div>Month : {monthPage}</div>
        <div>activeDate : {activeDate.toString()}</div>
        <div>viewDate : {viewDate}</div>
      </div>
    </div>
  );
}

export default Container;
