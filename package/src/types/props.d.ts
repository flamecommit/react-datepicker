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
