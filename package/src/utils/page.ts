export const setCenturyPage = (v: string): number => {
  const year = Number(v.split('-')[0]);

  return Math.ceil(year / 100);
};

export const setDecadePage = (v: string): number => {
  const year = Number(v.split('-')[0]);

  return Math.ceil(year / 10);
};

export const setYearPage = (v: string): number => {
  const year = Number(v.split('-')[0]);

  return year;
};

export const setMonthPage = (v: string): number => {
  const year = Number(v.split('-')[0]);
  const month = Number(v.split('-')[1]);

  return (year - 1) * 12 + month;
};
