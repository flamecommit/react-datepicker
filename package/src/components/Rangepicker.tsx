'use client';

import * as React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { formatDate } from '../utils/datetime';
import { setMonthPage } from '../utils/page';
import { NAME_SPACE } from '../constants/core';
import RangepickerMonth from './rangepicker/Month';
import DatepickerYear from './datepicker/Year';
import DatepickerDecade from './datepicker/Decade';
import DatepickerCentury from './datepicker/Century';
import useOutsideClick from '../hooks/useOutsideClick';
import ControllerContainer from './controller/Container';
import InputRange from './input/Range';

interface IProps {
  // initValue?: Date | null;
  initStartValue?: Date | null;
  initEndValue?: Date | null;
  useClearButton?: boolean;
  showsMultipleCalendar?: boolean;
  valueFormat?: string;
  labelFormat?: string;
  closesAfterChange?: boolean;
  weekdayLabels?: string[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
}

function Rangepicker({
  initStartValue = null,
  initEndValue = null,
  useClearButton = false,
  showsMultipleCalendar = false,
  valueFormat = 'YYYY-MM-DD',
  labelFormat = 'YYYY / MM',
  closesAfterChange = true,
  weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  className = '',
  placeholder = '',
  disabled = false,
  onChange,
}: IProps) {
  // 인수가 없을 땐 LOCAL 기준 현재 시간을 반환한다.
  const NEW_DATE = new Date();
  const [startValue, setStartValue] = useState<Date | null>(initStartValue);
  const [endValue, setEndValue] = useState<Date | null>(initEndValue);
  const [hoverValue, setHoverValue] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState<string>(
    formatDate(startValue || NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('month');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const monthPage = useMemo(() => setMonthPage(viewDate), [viewDate]);
  const container = useRef(null);

  useOutsideClick(container, () => {
    setIsVisible(false);
  });

  useEffect(() => {
    if (closesAfterChange && endValue !== null) {
      setIsVisible(false);
      // setIsVisible(false);
      // setViewDate(formatDate(startValue || NEW_DATE, 'YYYY-MM-DD'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endValue, onChange, setViewDate]);

  useEffect(() => {
    if (onChange) {
      onChange(startValue, endValue);
    }
  }, [startValue, endValue, onChange]);

  return (
    <div className={`${NAME_SPACE}__wrapper ${className}`}>
      <InputRange
        startValue={startValue}
        endValue={endValue}
        valueFormat={valueFormat}
        useClearButton={useClearButton}
        placeholder={placeholder}
        disabled={disabled}
        setIsVisible={setIsVisible}
        setStartValue={setStartValue}
        setEndValue={setEndValue}
      />
      {isVisible && (
        <div className={`${NAME_SPACE}__datepicker-container`} ref={container}>
          <ControllerContainer
            viewDate={viewDate}
            viewType={viewType}
            labelFormat={labelFormat}
            showsMultipleCalendar={showsMultipleCalendar}
            setViewType={setViewType}
            setViewDate={setViewDate}
          />
          <div className={`${NAME_SPACE}__datepicker`}>
            {viewType === 'month' && (
              <>
                <RangepickerMonth
                  startValue={startValue}
                  endValue={endValue}
                  hoverValue={hoverValue}
                  valueFormat={valueFormat}
                  monthPage={monthPage}
                  weekdayLabels={weekdayLabels}
                  setStartValue={setStartValue}
                  setEndValue={setEndValue}
                  setHoverValue={setHoverValue}
                />
                {showsMultipleCalendar && (
                  <RangepickerMonth
                    startValue={startValue}
                    endValue={endValue}
                    hoverValue={hoverValue}
                    valueFormat={valueFormat}
                    monthPage={monthPage + 1}
                    weekdayLabels={weekdayLabels}
                    setStartValue={setStartValue}
                    setEndValue={setEndValue}
                    setHoverValue={setHoverValue}
                  />
                )}
              </>
            )}
            {viewType === 'year' && (
              <DatepickerYear
                value={startValue}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
            {viewType === 'decade' && (
              <DatepickerDecade
                value={startValue}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
            {viewType === 'century' && (
              <DatepickerCentury
                value={startValue}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Rangepicker;
