'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { NAME_SPACE } from '../constants/core';
import { useElementSize } from '../hooks/useElementSize';
import useOutsideClick from '../hooks/useOutsideClick';
import { IDateValue, ITimeValue, ITimeselector } from '../types/props';
import { formatDate } from '../utils/datetime';
import { setMonthPage } from '../utils/page';
import Layer from './common/Layer';
import ControllerContainer from './controller/Container';
import DatepickerCentury from './datepicker/Century';
import DatepickerDecade from './datepicker/Decade';
import DatepickerMonth from './datepicker/Month';
import DatepickerYear from './datepicker/Year';
import InputDate from './input/Date';
import TimeselectorHeader from './timeselector/Header';
import TimeselectorSelector from './timeselector/Selector';

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
  timeselector?: false | ITimeselector;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  onChange?: (activeDate: Date | null) => void;
}

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
  timeselector = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  onChange,
}: IProps) {
  const NEW_DATE = new Date();
  const initialValueFormat = timeselector
    ? 'YYYY-MM-DD HH:mm:ss'
    : 'YYYY-MM-DD';
  const comValueFormat = valueFormat ? valueFormat : initialValueFormat;
  const [value, setValue] = useState<Date | null>(initValue);
  const [timeValue, setTimeValue] = useState<ITimeValue>({
    hour: initValue?.getHours() || 0,
    minute: initValue?.getMinutes() || 0,
    second: initValue?.getSeconds() || 0,
  });
  const [dateValue, setDateValue] = useState<IDateValue>({
    year: initValue?.getFullYear() || null,
    month: initValue?.getMonth() || null,
    date: initValue?.getDate() || null,
  });
  const [viewDate, setViewDate] = useState<string>(
    formatDate(value || NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('month');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const monthPage = useMemo(() => setMonthPage(viewDate), [viewDate]);
  const layer = useRef(null);
  const [, datepickerContainerRef, { height: datepickerContainerHeight }] =
    useElementSize();

  useOutsideClick(layer, () => {
    setIsVisible(false);
  });

  useEffect(() => {
    if (closesAfterChange && !timeselector) {
      setIsVisible(false);
    }
    if (onChange) {
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, onChange, setViewDate]);

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
    )
      return;

    const newDate = new Date(
      dateValue.year,
      dateValue.month,
      dateValue.date,
      timeValue.hour,
      timeValue.minute,
      timeValue.second
    );

    setValue(newDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateValue]);

  return (
    <div className={`${NAME_SPACE}__wrapper ${className}`}>
      <InputDate
        value={value}
        valueFormat={comValueFormat}
        useClearButton={useClearButton}
        placeholder={placeholder}
        disabled={disabled}
        setValue={setValue}
        setIsVisible={setIsVisible}
      />
      <Layer
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        withPortal={withPortal}
      >
        <div
          className={`${NAME_SPACE}__datepicker-container`}
          ref={datepickerContainerRef}
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
        {timeselector && (
          <div
            className={`${NAME_SPACE}__timeselector-container`}
            style={{
              height: datepickerContainerHeight,
            }}
          >
            <TimeselectorHeader
              timeValue={timeValue}
              timeselector={timeselector}
            />
            <TimeselectorSelector
              timeValue={timeValue}
              setTimeValue={setTimeValue}
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

export default Datepicker;
