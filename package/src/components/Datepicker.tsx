'use client';

import * as React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NAME_SPACE } from '../constants/core';
import useOutsideClick from '../hooks/useOutsideClick';
import { formatDate } from '../utils/datetime';
import { setMonthPage } from '../utils/page';
import Layer from './common/Layer';
import ControllerContainer from './controller/Container';
import DatepickerCentury from './datepicker/Century';
import DatepickerDecade from './datepicker/Decade';
import DatepickerMonth from './datepicker/Month';
import DatepickerYear from './datepicker/Year';
import InputDate from './input/Date';

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
  onChange?: (activeDate: Date | null) => void;
}

function Datepicker({
  initValue = null,
  useClearButton = false,
  showsMultipleCalendar = false,
  valueFormat = 'YYYY-MM-DD',
  labelFormat = 'YYYY / MM',
  closesAfterChange = true,
  weekdayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  withPortal = false,
  className = '',
  placeholder = '',
  disabled = false,
  onChange,
}: IProps) {
  // 인수가 없을 땐 LOCAL 기준 현재 시간을 반환한다.
  const NEW_DATE = new Date();
  const [value, setValue] = useState<Date | null>(initValue);
  const [viewDate, setViewDate] = useState<string>(
    formatDate(value || NEW_DATE, 'YYYY-MM-DD')
  );
  const [viewType, setViewType] = useState<
    'century' | 'decade' | 'year' | 'month'
  >('month');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const monthPage = useMemo(() => setMonthPage(viewDate), [viewDate]);
  const layer = useRef(null);

  useOutsideClick(layer, () => {
    setIsVisible(false);
  });

  useEffect(() => {
    // setViewDate(formatDate(value || NEW_DATE, 'YYYY-MM-DD'));
    if (closesAfterChange) {
      setIsVisible(false);
    }
    if (onChange) {
      onChange(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, onChange, setViewDate]);

  return (
    <div className={`${NAME_SPACE}__wrapper ${className}`}>
      <InputDate
        value={value}
        valueFormat={valueFormat}
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
        <div className={`${NAME_SPACE}__datepicker-container`}>
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
                <DatepickerMonth
                  value={value}
                  valueFormat={valueFormat}
                  monthPage={monthPage}
                  weekdayLabels={weekdayLabels}
                  setValue={setValue}
                />
                {showsMultipleCalendar && (
                  <DatepickerMonth
                    value={value}
                    valueFormat={valueFormat}
                    monthPage={monthPage + 1}
                    weekdayLabels={weekdayLabels}
                    setValue={setValue}
                  />
                )}
              </>
            )}
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
      </Layer>
    </div>
  );
}

export default Datepicker;
