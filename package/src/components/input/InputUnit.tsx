'use client';

import { useMemo } from 'react';
import { NAME_SPACE } from '../../constants/core';
import { addLeadingZero } from '../../utils/string';

interface IProps {
  type: string;
  value: Date | null;
}

function InputUnit({ value, type }: IProps) {
  const displayUnit = useMemo((): string => {
    if (value === null) return '';

    switch (type) {
      case 'YYYY':
        return `${value.getFullYear()}`;
      case 'MM':
        return addLeadingZero(value.getMonth() + 1);
      case 'DD':
        return addLeadingZero(value.getDate());
      case 'HH':
        return addLeadingZero(value.getHours());
      case 'mm':
        return addLeadingZero(value.getMinutes());
      case 'ss':
        return addLeadingZero(value.getSeconds());
      case ' ':
        return '&nbsp;';
      default:
        return type;
    }
  }, [value, type]);

  return (
    <div
      className={`${NAME_SPACE}__input-unit`}
      dangerouslySetInnerHTML={{ __html: displayUnit }}
    />
  );
}

export default InputUnit;
