'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { NAME_SPACE } from '../constants/core';
import { ITimeValue, RangePickerProps, TIsVisible } from '../types/props';
import { formatDate } from '../utils/datetime';
import { setMonthPage } from '../utils/page';
import Layer from './common/Layer';
import ControllerContainer from './controller/Container';
import DatePickerCentury from './datePicker/Century';
import DatePickerDecade from './datePicker/Decade';
import DatePickerYear from './datePicker/Year';
import RangePickerInput from './input/RangePickerInput';
import RangePickerMonth from './rangePicker/Month';
import TimePickerHeader from './timePicker/Header';
import TimePickerSelector from './timePicker/Selector';

const NEW_DATE = new Date();

export default function RangePicker({
  startValue = null,
  endValue = null,
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
  onChangeStart,
  onChangeEnd,
}: RangePickerProps) {
  const initialValueFormat = timePicker ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD';
  const comValueFormat = valueFormat ? valueFormat : initialValueFormat;
  const prevStartValue = useRef<Date | null>(startValue);
  const prevEndValue = useRef<Date | null>(endValue);
  const [timeStartValue, setTimeStartValue] = useState<ITimeValue>({
    hour: startValue ? startValue?.getHours() : 0,
    minute: startValue ? startValue?.getMinutes() : 0,
    second: startValue ? startValue?.getSeconds() : 0,
  });
  const [timeEndValue, setTimeEndValue] = useState<ITimeValue>({
    hour: endValue ? endValue?.getHours() : 0,
    minute: endValue ? endValue?.getMinutes() : 0,
    second: endValue ? endValue?.getSeconds() : 0,
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
  const startMonthPage = useMemo(
    () => setMonthPage(viewStartDate),
    [viewStartDate]
  );
  const endMonthPage = useMemo(() => setMonthPage(viewEndDate), [viewEndDate]);
  const inputRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  // const changeTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight || 0);
  }, [isVisible, viewStartDate, viewEndDate]);

  useEffect(() => {
    setTimeStartValue({
      hour: startValue ? startValue?.getHours() : 0,
      minute: startValue ? startValue?.getMinutes() : 0,
      second: startValue ? startValue?.getSeconds() : 0,
    });
    setTimeEndValue({
      hour: endValue ? endValue?.getHours() : 0,
      minute: endValue ? endValue?.getMinutes() : 0,
      second: endValue ? endValue?.getSeconds() : 0,
    });
    setViewStartDate(
      formatDate(startValue || endValue || NEW_DATE, 'YYYY-MM-DD')
    );
    setViewEndDate(
      formatDate(endValue || startValue || NEW_DATE, 'YYYY-MM-DD')
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValue, endValue]);

  // Start 시간 변화 감지
  // useEffect(() => {
  //   if (!startValue) return;

  //   const newDate = new Date(
  //     -1,
  //     setMonthPage(`${startValue.getFullYear() + 2}-${startValue.getMonth()}`),
  //     startValue.getDate(),
  //     timeStartValue.hour,
  //     timeStartValue.minute,
  //     timeStartValue.second
  //   );

  //   setStartValue(newDate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [timeStartValue]);

  // Start 날짜 변화 감지
  // useEffect(() => {
  //   if (
  //     dateStartValue.year === null ||
  //     dateStartValue.month === null ||
  //     dateStartValue.date === null
  //   ) {
  //     setStartValue(null);
  //     return;
  //   }

  //   const newDate = new Date(
  //     -1,
  //     setMonthPage(`${dateStartValue.year + 2}-${dateStartValue.month}`),
  //     Number(dateStartValue.date),
  //     timeStartValue.hour,
  //     timeStartValue.minute,
  //     timeStartValue.second
  //   );

  //   setStartValue(newDate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dateStartValue]);

  // End 시간 변화 감지
  // useEffect(() => {
  //   if (!endValue) return;

  //   const newDate = new Date(
  //     -1,
  //     setMonthPage(`${endValue.getFullYear() + 2}-${endValue.getMonth()}`),
  //     endValue.getDate(),
  //     timeEndValue.hour,
  //     timeEndValue.minute,
  //     timeEndValue.second
  //   );

  //   setEndValue(newDate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [timeEndValue]);

  // End 날짜 변화 감지
  // useEffect(() => {
  //   if (
  //     dateEndValue.year === null ||
  //     dateEndValue.month === null ||
  //     dateEndValue.date === null
  //   ) {
  //     setEndValue(null);
  //     return;
  //   }

  //   const newDate = new Date(
  //     -1,
  //     setMonthPage(`${dateEndValue.year + 2}-${dateEndValue.month}`),
  //     Number(dateEndValue.date),
  //     timeEndValue.hour,
  //     timeEndValue.minute,
  //     timeEndValue.second
  //   );

  //   setEndValue(newDate);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [dateEndValue]);

  // start, end value변화를 감지
  useEffect(() => {
    // start, end 값이 둘 다 있을 때
    if (startValue && endValue) {
      // start가 end 보다 클 때
      if (startValue > endValue) {
        if (prevStartValue.current !== startValue) {
          if (onChangeEnd) {
            onChangeEnd(startValue);
          }
        } else {
          if (onChangeStart) {
            onChangeStart(endValue);
          }
        }
      }
    }
    prevStartValue.current = startValue;
    prevEndValue.current = endValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValue, endValue]);

  return (
    <div className={`${NAME_SPACE}__wrapper ${className}`}>
      <RangePickerInput
        startValue={startValue}
        endValue={endValue}
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        valueFormat={comValueFormat} // YYYY-MM-DD hh:mm:ss
        useClearButton={useClearButton}
        disabled={disabled}
        setIsVisible={setIsVisible}
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
                    <RangePickerMonth
                      type={isVisible}
                      value={isVisible === 'start' ? startValue : endValue}
                      pairValue={isVisible === 'end' ? startValue : endValue}
                      onChange={
                        isVisible === 'start' ? onChangeStart : onChangeEnd
                      }
                      monthPage={
                        (isVisible === 'start'
                          ? startMonthPage
                          : endMonthPage) + index
                      }
                      timeValue={
                        isVisible === 'start' ? timeStartValue : timeEndValue
                      }
                      weekdayLabels={weekdayLabels}
                      holidays={holidays}
                    />
                  )}
                </Fragment>
              ))}
            {viewType === 'year' && (
              <DatePickerYear
                value={startValue}
                setViewType={setViewType}
                viewDate={isVisible === 'start' ? viewStartDate : viewEndDate}
                setViewDate={
                  isVisible === 'start' ? setViewStartDate : setViewEndDate
                }
              />
            )}
            {viewType === 'decade' && (
              <DatePickerDecade
                value={startValue}
                setViewType={setViewType}
                viewDate={isVisible === 'start' ? viewStartDate : viewEndDate}
                setViewDate={
                  isVisible === 'start' ? setViewStartDate : setViewEndDate
                }
              />
            )}
            {viewType === 'century' && (
              <DatePickerCentury
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
        {timePicker && (
          <div
            className={`${NAME_SPACE}__timepicker-container`}
            style={{
              height: containerHeight,
            }}
          >
            <TimePickerHeader
              timeValue={isVisible === 'start' ? timeStartValue : timeEndValue}
              timePicker={timePicker}
            />
            <TimePickerSelector
              value={isVisible === 'start' ? startValue : endValue}
              timeValue={isVisible === 'start' ? timeStartValue : timeEndValue}
              onChange={isVisible === 'start' ? onChangeStart : onChangeEnd}
              timePicker={timePicker}
              timeStep={timeStep}
            />
          </div>
        )}
      </Layer>
    </div>
  );
}
