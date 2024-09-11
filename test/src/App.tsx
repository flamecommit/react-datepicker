import { DatePicker, RangePicker } from '@shinyongjun/react-datepicker';
import '@shinyongjun/react-datepicker/css';
import { useState } from 'react';

function App() {
  // const [dateValue] = useState<Date>(new Date('2001-11-11'));
  const [value, setValue] = useState<Date | null>(new Date());
  const [startValue, setStartValue] = useState<Date | null>(new Date());
  const [endValue, setEndValue] = useState<Date | null>(new Date());
  const [value2, setValue2] = useState<Date | null>(new Date());

  return (
    <div>
      <section>
        <h3>DatePicker TimeInput Disabled</h3>
        <DatePicker
          value={value2}
          onChange={setValue2}
          valueFormat="YYYY-MM-DD hh:mm:ss"
        />
        {startValue?.toString()}
      </section>
      <section>
        <h3>RangePicker</h3>
        <RangePicker
          startValue={startValue}
          endValue={endValue}
          onChangeStart={setStartValue}
          onChangeEnd={setEndValue}
        />
        start: {startValue?.toString()}
        <br />
        end: {endValue?.toString()}
      </section>
      <section>
        <h3>DatePicker & TimePicker</h3>
        <DatePicker
          value={value}
          onChange={setValue}
          timePicker={{
            hour: true,
            minute: true,
            second: true,
          }}
        />
        {value?.toString()}
      </section>
      <section>
        <h3>DatePicker No Value</h3>
        <DatePicker />
      </section>
      <section>
        <h3>DatePicker</h3>
        <DatePicker value={value} onChange={setValue} />
        {value?.toString()}
      </section>
      {/* <section>
        <h3>RangePicker - holidays</h3>
        <RangePicker holidays={['01-01', '2024-06-27']} />
      </section>
      <section>
        <h3>DatePicker - holidays</h3>
        <DatePicker holidays={['01-01', '2024-06-27']} />
      </section>
      <section>
        <h3>RangePicker - disabled</h3>
        <RangePicker disabled />
      </section>
      <section>
        <h3>useClearButton</h3>
        <RangePicker
          initStartValue={new Date('2001-11-11 20:13:12')}
          initEndValue={new Date('2001-11-19 20:13:12')}
          timePicker={{
            hour: true,
            minute: true,
            second: true,
          }}
          useClearButton
        />
      </section>
      <section>
        <h3>initStartValue, initEndValue</h3>
        <RangePicker
          initStartValue={new Date('2001-11-11 20:13:12')}
          initEndValue={new Date('2001-11-19 20:13:12')}
          timePicker={{
            hour: true,
            minute: true,
            second: true,
          }}
        />
      </section>
      <section>
        <h3>TimePicker timeStep</h3>
        <DatePicker
          timePicker={{
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
        <h3>TimePicker</h3>
        <DatePicker
          timePicker={{
            hour: true,
            minute: true,
            second: true,
          }}
          useClearButton
          value={new Date('2001-11-11 20:13:12')}
          valueFormat="YYYY-MM-DD hh:mm:ss"
          withPortal
        />
      </section>
      <section>
        <h3>TimePicker</h3>
        <DatePicker
          timePicker={{
            hour: true,
            minute: true,
            second: true,
          }}
          useClearButton
          value={new Date('2001-11-11 01:02:03')}
          valueFormat="YYYY-MM-DD hh:mm:ss"
        />
      </section>
      <section>
        <h3>DatePicker</h3>
        <DatePicker valueFormat="YYYY-MM-DD hh/mm/ss" />
      </section>
      <section>
        <h3>initValue</h3>
        <DatePicker
          value={dateValue}
          onChange={(value) => {
            console.log('value', value);
          }}
        />
      </section>
      <section>
        <h3>showsMultipleCalendar</h3>
        <DatePicker showsMultipleCalendar />
      </section>
      <section>
        <h3>useClearButton</h3>
        <DatePicker useClearButton />
      </section>
      <section>
        <h3>valueFormat=MM/DD/YYYY</h3>
        <DatePicker
          valueFormat="MM/DD/YYYY"
          value={new Date('2001-11-11 14:13:12')}
        />
      </section>
      <section>
        <h3>labelFormat=YYYY년 MM월</h3>
        <DatePicker labelFormat="YYYY년 MM월" />
      </section>
      <section>
        <h3>RangePicker</h3>
        <RangePicker />
      </section>
      <section>
        <h3>RangePicker - showsMultipleCalendar</h3>
        <RangePicker showsMultipleCalendar />
      </section>
      <section>
        <h3>RangePicker - showsMultipleCalendar, closesAfterChange</h3>
        <RangePicker
          weekdayLabels={['일', '월', '화', '수', '목', '금', '토']}
          showsMultipleCalendar
        />
      </section>
      <section>
        <h3>onChange</h3>
        <RangePicker
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
      </section> */}
    </div>
  );
}

export default App;
