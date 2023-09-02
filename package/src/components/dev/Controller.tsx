'use client';

import * as React from 'react';
import { useState } from 'react';

interface IProps {
  setViewDate: (viewDate: string) => void;
}

function DevController({ setViewDate }: IProps) {
  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="controller">
      <input type="text" value={value} onChange={handleChange} />
      <button type="button" onClick={() => setViewDate(value)}>
        set view date
      </button>
    </div>
  );
}

export default DevController;
