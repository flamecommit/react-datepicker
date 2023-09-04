export const toLocalISOString = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const getFormatDatetime = (datetime: Date | null, format: string) => {
  if (!datetime) return '';
  const origin = toLocalISOString(datetime).split('T')[0] as string;

  const year = origin.split('-')[0];
  const month = origin.split('-')[1];
  const date = origin.split('-')[2];

  const result = format
    .replace(/YYYY/g, String(year))
    .replace(/MM/g, String(month))
    .replace(/DD/g, String(date));

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
