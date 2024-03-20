export interface ITimeselector {
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
  year: number | string | null;
  month: number | string | null;
  date: number | string | null;
}
