'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { NAME_SPACE } from '../constants/core';
import {
  IDateValue,
  ITimeValue,
  ITimeselector,
  TIsVisible,
} from '../types/props';
import { formatDate } from '../utils/datetime';
import { setMonthPage } from '../utils/page';
import Layer from './common/Layer';
import ControllerContainer from './controller/Container';
import DatepickerCentury from './datepicker/Century';
import DatepickerDecade from './datepicker/Decade';
import DatepickerYear from './datepicker/Year';
import RangepickerInput from './input/RangepickerInput';
import RangepickerMonth from './rangepicker/Month';
import TimeselectorHeader from './timeselector/Header';
import TimeselectorSelector from './timeselector/Selector';

interface IProps {
  initStartValue?: Date | null;
  initEndValue?: Date | null;
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
  timeselector?: false | ITimeselector;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const NEW_DATE = new Date();

export default function Rangepicker({
  initStartValue = null,
  initEndValue = null,
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
  timeselector = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  onChange,
}: IProps) {
  const initialValueFormat = timeselector
    ? 'YYYY-MM-DD HH:mm:ss'
    : 'YYYY-MM-DD';
  const comValueFormat = valueFormat ? valueFormat : initialValueFormat;
  const [startValue, setStartValue] = useState<Date | null>(initStartValue);
  const [endValue, setEndValue] = useState<Date | null>(initEndValue);
  const [timeStartValue, setTimeStartValue] = useState<ITimeValue>({
    hour: initStartValue?.getHours() || 0,
    minute: initStartValue?.getMinutes() || 0,
    second: initStartValue?.getSeconds() || 0,
  });
  const [dateStartValue, setDateStartValue] = useState<IDateValue>({
    year: initStartValue?.getFullYear() || null,
    month: initStartValue?.getMonth() || null,
    date: initStartValue?.getDate() || null,
  });
  const [timeEndValue, setTimeEndValue] = useState<ITimeValue>({
    hour: initEndValue?.getHours() || 0,
    minute: initEndValue?.getMinutes() || 0,
    second: initEndValue?.getSeconds() || 0,
  });
  const [dateEndValue, setDateEndValue] = useState<IDateValue>({
    year: initEndValue?.getFullYear() || null,
    month: initEndValue?.getMonth() || null,
    date: initEndValue?.getDate() || null,
  });
  const [viewStartDate, setViewStartDate] = useState<string>(
    formatDate(startValue || NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewEndDate, setViewEndDate] = useState<string>(
    formatDate(endValue || NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('month');
  const [isVisible, setIsVisible] = useState<TIsVisible>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const startMonthPage = useMemo(
    () => setMonthPage(viewStartDate),
    [viewStartDate]
  );
  const endMonthPage = useMemo(() => setMonthPage(viewEndDate), [viewEndDate]);
  const inputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight || 0);
  }, [isVisible, viewStartDate, viewEndDate]);

  useEffect(() => {
    if (closesAfterChange && !timeselector && endValue !== null) {
      setIsVisible(false);
    }
    if (onChange && isMounted && endValue !== null) {
      onChange(startValue, endValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endValue]);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 1);
  }, []);

  useEffect(() => {
    if (!startValue) return;

    const newDate = new Date(
      startValue.getFullYear(),
      startValue.getMonth(),
      startValue.getDate(),
      timeStartValue.hour,
      timeStartValue.minute,
      timeStartValue.second
    );

    setStartValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeStartValue]);

  useEffect(() => {
    if (
      dateStartValue.year === null ||
      dateStartValue.month === null ||
      dateStartValue.date === null
    ) {
      setStartValue(null);
      return;
    }

    const newDate = new Date(
      Number(dateStartValue.year),
      Number(dateStartValue.month),
      Number(dateStartValue.date),
      timeStartValue.hour,
      timeStartValue.minute,
      timeStartValue.second
    );

    setStartValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStartValue]);

  useEffect(() => {
    setViewStartDate(
      formatDate(startValue || endValue || NEW_DATE, 'YYYY-MM-DD')
    );
  }, [endValue, startValue]);

  useEffect(() => {
    setViewEndDate(
      formatDate(endValue || startValue || NEW_DATE, 'YYYY-MM-DD')
    );
  }, [endValue, startValue]);

  useEffect(() => {
    if (!endValue) return;

    const newDate = new Date(
      endValue.getFullYear(),
      endValue.getMonth(),
      endValue.getDate(),
      timeEndValue.hour,
      timeEndValue.minute,
      timeEndValue.second
    );

    setEndValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeEndValue]);

  useEffect(() => {
    if (
      dateEndValue.year === null ||
      dateEndValue.month === null ||
      dateEndValue.date === null
    ) {
      setEndValue(null);
      return;
    }

    const newDate = new Date(
      Number(dateEndValue.year),
      Number(dateEndValue.month),
      Number(dateEndValue.date),
      timeEndValue.hour,
      timeEndValue.minute,
      timeEndValue.second
    );

    setEndValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateEndValue]);

  return (
    <div className={`${NAME_SPACE}__wrapper ${className}`}>
      <RangepickerInput
        valueFormat={comValueFormat}
        startValue={startValue}
        dateStartValue={dateStartValue}
        setDateStartValue={setDateStartValue}
        timeStartValue={timeStartValue}
        setTimeStartValue={setTimeStartValue}
        endValue={endValue}
        dateEndValue={dateEndValue}
        setDateEndValue={setDateEndValue}
        timeEndValue={timeEndValue}
        setTimeEndValue={setTimeEndValue}
        useClearButton={useClearButton}
        placeholder={placeholder}
        disabled={disabled}
        setIsVisible={setIsVisible}
        viewStartDate={viewStartDate}
        setViewStartDate={setViewStartDate}
        viewEndDate={viewEndDate}
        setViewEndDate={setViewEndDate}
        inputRef={inputRef}
        isVisible={isVisible}
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
            viewType={viewType}
            labelFormat={labelFormat}
            showsMultipleCalendar={showsMultipleCalendar}
            setViewType={setViewType}
            viewDate={isVisible === 'start' ? viewStartDate : viewEndDate}
            setViewDate={
              isVisible === 'start' ? setViewStartDate : setViewEndDate
            }
          />
          <div className={`${NAME_SPACE}__datepicker`}>
            {viewType === 'month' &&
              [true, showsMultipleCalendar].map((isShow, index) => (
                <Fragment key={index}>
                  {isShow && (
                    <RangepickerMonth
                      type={isVisible}
                      dateValue={
                        isVisible === 'start' ? dateStartValue : dateEndValue
                      }
                      pairValue={
                        isVisible === 'end' ? dateStartValue : dateEndValue
                      }
                      setDateValue={
                        isVisible === 'start'
                          ? setDateStartValue
                          : setDateEndValue
                      }
                      setPairValue={
                        isVisible === 'end'
                          ? setDateStartValue
                          : setDateEndValue
                      }
                      valueFormat={comValueFormat}
                      monthPage={
                        (isVisible === 'start'
                          ? startMonthPage
                          : endMonthPage) + index
                      }
                      weekdayLabels={weekdayLabels}
                    />
                  )}
                </Fragment>
              ))}
            {viewType === 'year' && (
              <DatepickerYear
                value={startValue}
                setViewType={setViewType}
                viewDate={isVisible === 'start' ? viewStartDate : viewEndDate}
                setViewDate={
                  isVisible === 'start' ? setViewStartDate : setViewEndDate
                }
              />
            )}
            {viewType === 'decade' && (
              <DatepickerDecade
                value={startValue}
                setViewType={setViewType}
                viewDate={isVisible === 'start' ? viewStartDate : viewEndDate}
                setViewDate={
                  isVisible === 'start' ? setViewStartDate : setViewEndDate
                }
              />
            )}
            {viewType === 'century' && (
              <DatepickerCentury
                value={startValue}
                setViewType={setViewType}
                viewDate={isVisible === 'start' ? viewStartDate : viewEndDate}
                setViewDate={
                  isVisible === 'start' ? setViewStartDate : setViewEndDate
                }
              />
            )}
          </div>
        </div>
        {timeselector && (
          <div
            className={`${NAME_SPACE}__timeselector-container`}
            style={{
              height: containerHeight,
            }}
          >
            <TimeselectorHeader
              timeValue={timeStartValue}
              timeselector={timeselector}
            />
            <TimeselectorSelector
              timeValue={timeStartValue}
              setTimeValue={setTimeStartValue}
              timeselector={timeselector}
              hourStep={hourStep}
              minuteStep={minuteStep}
              secondStep={secondStep}
            />
          </div>
        )}
      </Layer>
    </div>
  );
}
