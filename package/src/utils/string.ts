export function addLeadingZero(input: number | string): string {
  const inputStr = String(input);
  return inputStr.length === 1 ? `0${inputStr}` : inputStr;
}
