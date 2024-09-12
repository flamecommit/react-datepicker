export interface DatePickerProps {
  value?: Date | null;
  useClearButton?: boolean;
  showsMultipleCalendar?: boolean;
  valueFormat?: string;
  labelFormat?: string;
  closesAfterChange?: boolean;
  weekdayLabels?: string[];
  withPortal?: boolean;
  className?: string;
  disabled?: boolean;
  timePicker?: false | ITimePicker;
  timeStep?: ITimeStep;
  onChange?: (newValue: Date | null) => void;
  holidays?: string[]; // [01-01, 12-25, 2024-06-27]
  minDate?: Date;
  maxDate?: Date;
}

export interface RangePickerProps {
  startValue?: Date | null;
  endValue?: Date | null;
  useClearButton?: boolean;
  showsMultipleCalendar?: boolean;
  valueFormat?: string;
  labelFormat?: string;
  weekdayLabels?: string[];
  withPortal?: boolean;
  className?: string;
  disabled?: boolean;
  /** 시간선택기 사용 여부를 결정합니다. */
  timePicker?: false | ITimePicker;
  timeStep?: ITimeStep;
  /** value의 변화를 감지하여 Callback함수를 실행합니다. */
  onChangeStart?: (newValue: Date | null) => void;
  onChangeEnd?: (newValue: Date | null) => void;
  holidays?: string[]; // [01-01, 12-25, 2024-06-27]
}

export interface ITimePicker {
  hour?: boolean;
  minute?: boolean;
  second?: boolean;
}

export interface ITimeValue {
  hour: number;
  minute: number;
  second: number;
}

export interface IDateValue {
  year: number | null;
  month: number | null;
  date: number | null;
}

export interface ITimeStep {
  hour?: number;
  minute?: number;
  second?: number;
}

export type TIsVisible = boolean | 'start' | 'end';
