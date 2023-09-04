import * as React from 'react';
import { Datepicker } from '@shinyongjun/react-datepicker';
import { useState } from 'react';

function App() {
  const [dateValue] = useState<Date>(new Date('2001-11-11'));

  return (
    <div>
      <Datepicker
        initValue={dateValue}
        onChange={(value) => {
          console.log('value', value);
        }}
      />
      <Datepicker />
      <Datepicker isClearButton />
    </div>
  );
}

export default App;
