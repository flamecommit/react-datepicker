import * as React from 'react';
import { Datepicker, Rangepicker } from '@shinyongjun/react-datepicker';
import '@shinyongjun/react-datepicker/css';
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
      <Datepicker showsMultipleCalendar />
      <Datepicker useClearButton />
      <Datepicker valueFormat="MM/DD/YYYY" />
      <Datepicker labelFormat="YYYY년 MM월" />
      <Rangepicker />
      <Rangepicker showsMultipleCalendar />
      <Rangepicker closesAfterChange={false} />
      <Rangepicker
        weekdayLabels={['일', '월', '화', '수', '목', '금', '토']}
        showsMultipleCalendar
        closesAfterChange={false}
      />
      <Rangepicker
        weekdayLabels={['일', '월', '화', '수', '목', '금', '토']}
        showsMultipleCalendar
        closesAfterChange={false}
        onChange={(startDate, endDate) => {
          console.log(startDate, endDate);
        }}
      />
      <Rangepicker
        initStartValue={new Date(2023, 7, 1)}
        initEndValue={new Date(2023, 8, 7)}
      />
    </div>
  );
}

export default App;
