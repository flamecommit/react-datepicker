export const getFormatDatetime = (datetime: Date, format: string) => {
  const origin = datetime.toISOString();

  const year = format.includes('YYYY')
    ? origin.substring(0, 4)
    : origin.substring(2, 4);
  const month = origin.substring(5, 7);
  const date = origin.substring(8, 10);
  const hour = origin.substring(11, 13);
  const minute = origin.substring(14, 16);

  const result = format
    .replace(/YYYY/g, year)
    .replace(/YY/g, year)
    .replace(/MM/g, month)
    .replace(/DD/g, date)
    .replace(/HH/g, hour)
    .replace(/mm/g, minute);

  return result;
};

export const getMonthArray = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0, 9, 0, 0).getDate();
  const monthArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day, 12, 0, 0);
    const formattedDate = getFormatDatetime(date, 'YYYY-MM-DD');
    const dayValue = date.getDate();
    const dayOfWeek = date.getDay();

    monthArray.push({
      ISO: formattedDate,
      date: dayValue,
      day: dayOfWeek,
    });
  }

  return monthArray;
};
