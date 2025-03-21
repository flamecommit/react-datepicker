'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { NAME_SPACE } from '../constants/core';
import { DatePickerProps, ITimeValue, TIsVisible } from '../types/props';
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
  const [viewDate, setViewDate] = useState<string>(
    formatDate(value || NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('month');
  const [isVisible, setIsVisible] = useState<TIsVisible>(false);
  const monthPage = useMemo(() => setMonthPage(viewDate), [viewDate]);
  const inputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight || 0);
  }, [isVisible, viewDate]);

  useEffect(() => {
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
        value={value}
        onChange={onChange}
        valueFormat={comValueFormat}
        useClearButton={useClearButton}
        disabled={disabled}
        inputRef={inputRef}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
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
                      holidays={holidays}
                      minDate={minDate}
                      maxDate={maxDate}
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
              value={value}
              timeValue={timeValue}
              timePicker={timePicker}
              timeStep={timeStep}
              onChange={onChange}
            />
          </div>
        )}
      </Layer>
    </div>
  );
}

export default DatePicker;
