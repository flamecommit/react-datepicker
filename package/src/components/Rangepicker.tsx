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
import DatepickerYear from './datepicker/Year';
import RangepickerInput from './input/RangepickerInput';
import RangepickerMonth from './rangepicker/Month';
import TimepickerHeader from './timepicker/Header';
import TimepickerSelector from './timepicker/Selector';

interface IProps {
  initStartValue?: Date | null;
  initEndValue?: Date | null;
  useClearButton?: boolean;
  showsMultipleCalendar?: boolean;
  valueFormat?: string;
  labelFormat?: string;
  weekdayLabels?: string[];
  withPortal?: boolean;
  className?: string;
  disabled?: boolean;
  /** 시간선택기 사용 여부를 결정합니다. */
  timepicker?: false | ITimepicker;
  timeStep?: ITimeStep;
  /** value의 변화를 감지하여 Callback함수를 실행합니다. */
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
  holidays?: string[]; // [01-01, 12-25, 2024-06-27]
}

const NEW_DATE = new Date();

export default function Rangepicker({
  initStartValue = null,
  initEndValue = null,
  useClearButton = false,
  showsMultipleCalendar = false,
  valueFormat = '',
  labelFormat = 'YYYY / MM',
  weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  withPortal = false,
  className = '',
  disabled = false,
  timepicker = false,
  timeStep = { hour: 1, minute: 1, second: 1 },
  holidays = [],
  onChange,
}: IProps) {
  const initialValueFormat = timepicker ? 'YYYY-MM-DD hh:mm:ss' : 'YYYY-MM-DD';
  const comValueFormat = valueFormat ? valueFormat : initialValueFormat;
  const [startValue, setStartValue] = useState<Date | null>(initStartValue);
  const [endValue, setEndValue] = useState<Date | null>(initEndValue);
  const prevStartValue = useRef<Date | null>(initStartValue);
  const prevEndValue = useRef<Date | null>(initEndValue);
  const [timeStartValue, setTimeStartValue] = useState<ITimeValue>({
    hour: initStartValue !== null ? initStartValue?.getHours() : 0,
    minute: initStartValue !== null ? initStartValue?.getMinutes() : 0,
    second: initStartValue !== null ? initStartValue?.getSeconds() : 0,
  });
  const [dateStartValue, setDateStartValue] = useState<IDateValue>({
    year: initStartValue !== null ? initStartValue?.getFullYear() : null,
    month: initStartValue !== null ? initStartValue?.getMonth() : null,
    date: initStartValue !== null ? initStartValue?.getDate() : null,
  });
  const [timeEndValue, setTimeEndValue] = useState<ITimeValue>({
    hour: initEndValue !== null ? initEndValue?.getHours() : 0,
    minute: initEndValue !== null ? initEndValue?.getMinutes() : 0,
    second: initEndValue !== null ? initEndValue?.getSeconds() : 0,
  });
  const [dateEndValue, setDateEndValue] = useState<IDateValue>({
    year: initEndValue !== null ? initEndValue?.getFullYear() : null,
    month: initEndValue !== null ? initEndValue?.getMonth() : null,
    date: initEndValue !== null ? initEndValue?.getDate() : null,
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
  const changeTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setContainerHeight(containerRef.current?.offsetHeight || 0);
  }, [isVisible, viewStartDate, viewEndDate]);

  useEffect(() => {
    // if (closesAfterChange && !timepicker && endValue !== null) {
    //   setIsVisible(false);
    // }
    if (onChange && isMounted) {
      clearTimeout(changeTimeout.current);
      changeTimeout.current = setTimeout(() => {
        onChange(startValue, endValue);
      }, 50);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValue, endValue]);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 1);
  }, []);

  useEffect(() => {
    setViewStartDate(
      formatDate(startValue || endValue || NEW_DATE, 'YYYY-MM-DD')
    );
    setViewEndDate(
      formatDate(endValue || startValue || NEW_DATE, 'YYYY-MM-DD')
    );
  }, [endValue, startValue]);

  // Start 시간 변화 감지
  useEffect(() => {
    if (!startValue) return;

    const newDate = new Date(
      -1,
      setMonthPage(`${startValue.getFullYear() + 2}-${startValue.getMonth()}`),
      startValue.getDate(),
      timeStartValue.hour,
      timeStartValue.minute,
      timeStartValue.second
    );

    setStartValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeStartValue]);

  // Start 날짜 변화 감지
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
      -1,
      setMonthPage(`${dateStartValue.year + 2}-${dateStartValue.month}`),
      Number(dateStartValue.date),
      timeStartValue.hour,
      timeStartValue.minute,
      timeStartValue.second
    );

    setStartValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStartValue]);

  // End 시간 변화 감지
  useEffect(() => {
    if (!endValue) return;

    const newDate = new Date(
      -1,
      setMonthPage(`${endValue.getFullYear() + 2}-${endValue.getMonth()}`),
      endValue.getDate(),
      timeEndValue.hour,
      timeEndValue.minute,
      timeEndValue.second
    );

    setEndValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeEndValue]);

  // End 날짜 변화 감지
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
      -1,
      setMonthPage(`${dateEndValue.year + 2}-${dateEndValue.month}`),
      Number(dateEndValue.date),
      timeEndValue.hour,
      timeEndValue.minute,
      timeEndValue.second
    );

    setEndValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateEndValue]);

  // start, end value변화를 감지
  useEffect(() => {
    // start, end 값이 둘 다 있을 때
    if (startValue && endValue) {
      // start가 end 보다 클 때
      if (startValue > endValue) {
        if (prevStartValue.current !== startValue) {
          setDateEndValue(dateStartValue);
          setTimeEndValue(timeStartValue);
        } else {
          setDateStartValue(dateEndValue);
          setTimeStartValue(timeEndValue);
        }
      }
    }
    prevStartValue.current = startValue;
    prevEndValue.current = endValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startValue, endValue]);

  // browser에서 focus가 사라졌을 때 picker close
  // const windowBlurHandler = () => {
  //   setIsVisible(false);
  // };

  // useEffect(() => {
  //   window.addEventListener('blur', windowBlurHandler);
  //   return () => {
  //     window.removeEventListener('blur', windowBlurHandler);
  //   };
  // }, []);

  return (
    <div className={`${NAME_SPACE}__wrapper ${className}`}>
      <RangepickerInput
        valueFormat={comValueFormat} // YYYY-MM-DD hh:mm:ss
        dateStartValue={dateStartValue} // { year, month, date }
        setDateStartValue={setDateStartValue}
        timeStartValue={timeStartValue} // { hour, minute, second }
        setTimeStartValue={setTimeStartValue}
        dateEndValue={dateEndValue}
        setDateEndValue={setDateEndValue}
        timeEndValue={timeEndValue}
        setTimeEndValue={setTimeEndValue}
        useClearButton={useClearButton}
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
                      valueFormat={comValueFormat}
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
        {timepicker && (
          <div
            className={`${NAME_SPACE}__timepicker-container`}
            style={{
              height: containerHeight,
            }}
          >
            <TimepickerHeader
              timeValue={isVisible === 'start' ? timeStartValue : timeEndValue}
              timepicker={timepicker}
            />
            <TimepickerSelector
              timeValue={isVisible === 'start' ? timeStartValue : timeEndValue}
              setTimeValue={
                isVisible === 'start' ? setTimeStartValue : setTimeEndValue
              }
              timepicker={timepicker}
              timeStep={timeStep}
            />
          </div>
        )}
      </Layer>
    </div>
  );
}
