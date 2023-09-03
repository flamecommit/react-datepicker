import * as React from 'react';
import { Datepicker } from '@shinyongjun/react-datepicker';
import { useState } from 'react';

function App() {
  const [dateValue, setDateValue] = useState<Date>(new Date('2001-11-11'));

  return (
    <div>
      <Datepicker
        initValue={dateValue}
        onChange={(value) => {
          console.log('value', value);
        }}
      />
    </div>
  );
}

export default App;
