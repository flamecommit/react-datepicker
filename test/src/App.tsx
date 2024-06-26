import { Datepicker, Rangepicker } from '@shinyongjun/react-datepicker';
import '@shinyongjun/react-datepicker/css';
import { useState } from 'react';

function App() {
  const [dateValue] = useState<Date>(new Date('2001-11-11'));

  return (
    <div>
      <section>
        <h3>Rangepicker - holidays</h3>
        <Rangepicker holidays={['01-01', '2024-06-27']} />
      </section>
      <section>
        <h3>Datepicker - holidays</h3>
        <Datepicker holidays={['01-01', '2024-06-27']} />
      </section>
      <section>
        <h3>Rangepicker - disabled</h3>
        <Rangepicker disabled />
      </section>
      <section>
        <h3>useClearButton</h3>
        <Rangepicker
          initStartValue={new Date('2001-11-11 20:13:12')}
          initEndValue={new Date('2001-11-19 20:13:12')}
          timepicker={{
            hour: true,
            minute: true,
            second: true,
          }}
          useClearButton
        />
      </section>
      <section>
        <h3>initStartValue, initEndValue</h3>
        <Rangepicker
          initStartValue={new Date('2001-11-11 20:13:12')}
          initEndValue={new Date('2001-11-19 20:13:12')}
          timepicker={{
            hour: true,
            minute: true,
            second: true,
          }}
        />
      </section>
      <section>
        <h3>Timepicker timeStep</h3>
        <Datepicker
          timepicker={{
            hour: true,
            minute: true,
            second: true,
          }}
          timeStep={{
            hour: 1,
            minute: 15,
            second: 10,
          }}
        />
      </section>
      <section>
        <h3>Timepicker</h3>
        <Datepicker
          timepicker={{
            hour: true,
            minute: true,
            second: true,
          }}
          useClearButton
          initValue={new Date('2001-11-11 20:13:12')}
          valueFormat="YYYY-MM-DD hh:mm:ss"
          withPortal
        />
      </section>
      <section>
        <h3>Timepicker</h3>
        <Datepicker
          timepicker={{
            hour: true,
            minute: true,
            second: true,
          }}
          useClearButton
          initValue={new Date('2001-11-11 01:02:03')}
          valueFormat="YYYY-MM-DD hh:mm:ss"
        />
      </section>
      <section>
        <h3>Datepicker</h3>
        <Datepicker valueFormat="YYYY-MM-DD hh/mm/ss" />
      </section>
      <section>
        <h3>initValue</h3>
        <Datepicker
          initValue={dateValue}
          onChange={(value) => {
            console.log('value', value);
          }}
        />
      </section>
      <section>
        <h3>showsMultipleCalendar</h3>
        <Datepicker showsMultipleCalendar />
      </section>
      <section>
        <h3>useClearButton</h3>
        <Datepicker useClearButton />
      </section>
      <section>
        <h3>valueFormat=MM/DD/YYYY</h3>
        <Datepicker
          valueFormat="MM/DD/YYYY"
          initValue={new Date('2001-11-11 14:13:12')}
        />
      </section>
      <section>
        <h3>labelFormat=YYYY년 MM월</h3>
        <Datepicker labelFormat="YYYY년 MM월" />
      </section>
      <section>
        <h3>Rangepicker</h3>
        <Rangepicker />
      </section>
      <section>
        <h3>Rangepicker - showsMultipleCalendar</h3>
        <Rangepicker showsMultipleCalendar />
      </section>
      <section>
        <h3>Rangepicker - showsMultipleCalendar, closesAfterChange</h3>
        <Rangepicker
          weekdayLabels={['일', '월', '화', '수', '목', '금', '토']}
          showsMultipleCalendar
        />
      </section>
      <section>
        <h3>onChange</h3>
        <Rangepicker
          weekdayLabels={['일', '월', '화', '수', '목', '금', '토']}
          showsMultipleCalendar
          onChange={(startDate, endDate) => {
            console.log(startDate, endDate);
          }}
        />
      </section>
      <section>
        <h3>datetime-local</h3>
        <input type="datetime-local" />
      </section>
    </div>
  );
}

export default App;
