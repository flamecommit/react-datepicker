'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { NAME_SPACE } from '../constants/core';
import {
  DatePickerProps,
  IDateValue,
  ITimeValue,
  TIsVisible,
} from '../types/props';
import { formatDate } from '../utils/datetime';
import { setMonthPage } from '../utils/page';
import Layer from './common/Layer';
import ControllerContainer from './controller/Container';
import DatePickerCentury from './datePicker/Century';
import DatePickerDecade from './datePicker/Decade';
import DatePickerMonth from './datePicker/Month';
import DatePickerYear from './datePicker/Year';
import DatePickerInput from './input/DatePickerInput';
import TimePickerHeader from './timePicker/Header';
import TimePickerSelector from './timePicker/Selector';

const NEW_DATE = new Date();

function DatePicker({
  value = null,
  useClearButton = false,
  showsMultipleCalendar = false,
  valueFormat = '',
  labelFormat = 'YYYY / MM',
  closesAfterChange = true,
  weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  withPortal = false,
  className = '',
  disabled = false,
  timePicker = false,
  timeStep = { hour: 1, minute: 1, second: 1 },
  holidays = [],
  minDate,
  maxDate,
  onChange,
}: DatePickerProps) {
  const initialValueFormat = timePicker ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD';
  const comValueFormat = valueFormat ? valueFormat : initialValueFormat;
  const [timeValue, setTimeValue] = useState<ITimeValue>({
    hour: value !== null ? value?.getHours() : 0,
    minute: value !== null ? value?.getMinutes() : 0,
    second: value !== null ? value?.getSeconds() : 0,
  });
  const [dateValue, setDateValue] = useState<IDateValue>({
    year: value !== null ? value?.getFullYear() : null,
    month: value !== null ? value?.getMonth() : null,
    date: value !== null ? value?.getDate() : null,
  });
  const [viewDate, setViewDate] = useState<string>(
    formatDate(value || NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('month');
  const [isVisible, setIsVisible] = useState<TIsVisible>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const monthPage = useMemo(() => setMonthPage(viewDate), [viewDate]);
  const inputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight || 0);
  }, [isVisible, viewDate]);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 1);
  }, []);

  useEffect(() => {
    setDateValue({
      year: value !== null ? value?.getFullYear() : null,
      month: value !== null ? value?.getMonth() : null,
      date: value !== null ? value?.getDate() : null,
    });
    setTimeValue({
      hour: value !== null ? value?.getHours() : 0,
      minute: value !== null ? value?.getMinutes() : 0,
      second: value !== null ? value?.getSeconds() : 0,
    });
    setViewDate(formatDate(value || NEW_DATE, 'YYYY-MM-DD'));
  }, [value]);

  return (
    <div className={`${NAME_SPACE}__wrapper ${className}`}>
      <DatePickerInput
        valueFormat={comValueFormat}
        dateValue={dateValue}
        setDateValue={setDateValue}
        onChange={onChange}
        timeValue={timeValue}
        setTimeValue={setTimeValue}
        useClearButton={useClearButton}
        disabled={disabled}
        setIsVisible={setIsVisible}
        viewDate={viewDate}
        setViewDate={setViewDate}
        inputRef={inputRef}
        isMounted={isMounted}
        timePicker={timePicker}
      />
      <Layer
        inputRef={inputRef}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        withPortal={withPortal}
      >
        <div
          className={`${NAME_SPACE}__datepicker-container`}
          ref={containerRef}
        >
          <ControllerContainer
            viewDate={viewDate}
            viewType={viewType}
            labelFormat={labelFormat}
            showsMultipleCalendar={showsMultipleCalendar}
            setViewType={setViewType}
            setViewDate={setViewDate}
          />
          <div className={`${NAME_SPACE}__datepicker`}>
            {viewType === 'month' &&
              [true, showsMultipleCalendar].map((isShow, index) => (
                <Fragment key={index}>
                  {isShow && (
                    <DatePickerMonth
                      value={value}
                      onChange={onChange}
                      valueFormat={comValueFormat}
                      monthPage={monthPage + index}
                      weekdayLabels={weekdayLabels}
                      timeValue={timeValue}
                      closesAfterChange={closesAfterChange}
                      timePicker={timePicker}
                      holidays={holidays}
                      minDate={minDate}
                      maxDate={maxDate}
                      setIsVisible={setIsVisible}
                    />
                  )}
                </Fragment>
              ))}
            {viewType === 'year' && (
              <DatePickerYear
                value={value}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
            {viewType === 'decade' && (
              <DatePickerDecade
                value={value}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
            {viewType === 'century' && (
              <DatePickerCentury
                value={value}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
          </div>
        </div>
        {timePicker && (
          <div
            className={`${NAME_SPACE}__timepicker-container`}
            style={{
              height: containerHeight,
            }}
          >
            <TimePickerHeader timeValue={timeValue} timePicker={timePicker} />
            <TimePickerSelector
              timeValue={timeValue}
              timePicker={timePicker}
              timeStep={timeStep}
              dateValue={dateValue}
              onChange={onChange}
            />
          </div>
        )}
      </Layer>
    </div>
  );
}

export default DatePicker;
