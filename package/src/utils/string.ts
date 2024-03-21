export function addLeadingZero(input: number | string | null): string {
  if (input === null) return '';
  const inputStr = String(input);
  return inputStr.length === 1 ? `0${inputStr}` : inputStr;
}

export function isNumeric(text: string | null): boolean {
  if (text === null) return false;
  return /^[0-9]+$/.test(text);
}
