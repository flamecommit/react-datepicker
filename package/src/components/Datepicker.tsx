'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { NAME_SPACE } from '../constants/core';
import {
  IDateValue,
  ITimeStep,
  ITimeValue,
  ITimepicker,
  TIsVisible,
} from '../types/props';
import { formatDate } from '../utils/datetime';
import { setMonthPage } from '../utils/page';
import Layer from './common/Layer';
import ControllerContainer from './controller/Container';
import DatepickerCentury from './datepicker/Century';
import DatepickerDecade from './datepicker/Decade';
import DatepickerMonth from './datepicker/Month';
import DatepickerYear from './datepicker/Year';
import DatepickerInput from './input/DatepickerInput';
import TimepickerHeader from './timepicker/Header';
import TimepickerSelector from './timepicker/Selector';

interface IProps {
  initValue?: Date | null;
  useClearButton?: boolean;
  showsMultipleCalendar?: boolean;
  valueFormat?: string;
  labelFormat?: string;
  closesAfterChange?: boolean;
  weekdayLabels?: string[];
  withPortal?: boolean;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  timepicker?: false | ITimepicker;
  timeStep?: ITimeStep;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  onChange?: (activeDate: Date | null) => void;
}

const NEW_DATE = new Date();

function Datepicker({
  initValue = null,
  useClearButton = false,
  showsMultipleCalendar = false,
  valueFormat = '',
  labelFormat = 'YYYY / MM',
  closesAfterChange = true,
  weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  withPortal = false,
  className = '',
  placeholder = '',
  disabled = false,
  timepicker = false,
  timeStep = { hour: 1, minute: 1, second: 1 },
  onChange,
}: IProps) {
  const initialValueFormat = timepicker ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD';
  const comValueFormat = valueFormat ? valueFormat : initialValueFormat;
  const [value, setValue] = useState<Date | null>(initValue);
  const [timeValue, setTimeValue] = useState<ITimeValue>({
    hour: initValue !== null ? initValue?.getHours() : 0,
    minute: initValue !== null ? initValue?.getMinutes() : 0,
    second: initValue !== null ? initValue?.getSeconds() : 0,
  });
  const [dateValue, setDateValue] = useState<IDateValue>({
    year: initValue !== null ? initValue?.getFullYear() : null,
    month: initValue !== null ? initValue?.getMonth() : null,
    date: initValue !== null ? initValue?.getDate() : null,
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
    if (onChange && isMounted) {
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 1);
  }, []);

  useEffect(() => {
    if (!value) return;

    const newDate = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate(),
      timeValue.hour,
      timeValue.minute,
      timeValue.second
    );

    setValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeValue]);

  useEffect(() => {
    if (
      dateValue.year === null ||
      dateValue.month === null ||
      dateValue.date === null
    ) {
      setValue(null);
      return;
    }

    const newDate = new Date(
      Number(dateValue.year),
      Number(dateValue.month),
      Number(dateValue.date),
      timeValue.hour,
      timeValue.minute,
      timeValue.second
    );

    setValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue]);

  useEffect(() => {
    setViewDate(formatDate(value || NEW_DATE, 'YYYY-MM-DD'));
  }, [value]);

  return (
    <div className={`${NAME_SPACE}__wrapper ${className}`}>
      <DatepickerInput
        valueFormat={comValueFormat}
        dateValue={dateValue}
        setDateValue={setDateValue}
        timeValue={timeValue}
        setTimeValue={setTimeValue}
        useClearButton={useClearButton}
        placeholder={placeholder}
        disabled={disabled}
        setIsVisible={setIsVisible}
        viewDate={viewDate}
        setViewDate={setViewDate}
        inputRef={inputRef}
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
                    <DatepickerMonth
                      dateValue={dateValue}
                      setDateValue={setDateValue}
                      valueFormat={comValueFormat}
                      monthPage={monthPage + index}
                      weekdayLabels={weekdayLabels}
                      timeValue={timeValue}
                      closesAfterChange={closesAfterChange}
                      timepicker={timepicker}
                      setIsVisible={setIsVisible}
                    />
                  )}
                </Fragment>
              ))}
            {viewType === 'year' && (
              <DatepickerYear
                value={value}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
            {viewType === 'decade' && (
              <DatepickerDecade
                value={value}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
            {viewType === 'century' && (
              <DatepickerCentury
                value={value}
                viewDate={viewDate}
                setViewDate={setViewDate}
                setViewType={setViewType}
              />
            )}
          </div>
        </div>
        {timepicker && (
          <div
            className={`${NAME_SPACE}__timepicker-container`}
            style={{
              height: containerHeight,
            }}
          >
            <TimepickerHeader timeValue={timeValue} timepicker={timepicker} />
            <TimepickerSelector
              timeValue={timeValue}
              setTimeValue={setTimeValue}
              timepicker={timepicker}
              timeStep={timeStep}
            />
          </div>
        )}
      </Layer>
    </div>
  );
}

export default Datepicker;
