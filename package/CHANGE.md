## 3.4.0

- value 관리 로직 변경
- 자동 닫힘 기능 제거

## 3.3.0

- Keyboard 입력 기능 제거

## 3.2.0

- <DatePicker /> 옵션 추가
  - minDate?: Date - minDate 이전 날짜는 선택할 수 없습니다.
  - maxDate?: Date - maxDate 이후 날짜는 선택할 수 없습니다.

## 3.1.0

- timePicker 옵션이 비활성화일 때 valueFormat에 시간(hh:mm:ss)이 포함되어 있더라도 input이 불가능 하도록 변경되었습니다.

# 3.0.0

- 컴포넌트 이름 변경
  - Datepicker => DatePicker
  - Rangepicker => RangePicker
- 옵션명 변경
  - timepicker => timePicker
- DatePicker
  - value: 외부와 양방향 데이터 바인딩이 가능해졌습니다.
  - onChange: DatePicker의 내부 value의 변화를 감지하여 실행되는 이벤트입니다. setValue 또는 사용자 함수를 할당할 수 있습니다.
  - value와 onChange은 필수 옵션이나 다름없습니다. 이 두 옵션이 할당되어 있지 않으면 DatePicker의 값이 변경되지 않습니다.
- RangePicker
  - startValue, endValue: DatePicker의 value와 마찬가지로 양방향 데이터 바인딩이 가능해졌습니다.
  - onChangeStart, onChangeEnd: DatePicker의 onChange와 같은 기능을 합니다.

## 2.4.0

- RangePicker: 시작 날짜 선택시 자동으로 종료 달력이 활성화 되는 로직 추가.
- RangePicker: 종료 날짜 선택시 달력 닫히는 로직 추가

## 2.3.0

- holidays: 공휴일 옵션 추가

## 2.2.0

- InputUnit에 focus시 datepicker가 자동으로 열리지 않고 Trigger버튼이 추가되었습니다. (이벤트간 충돌 Fix)
- 0~100년 구간의 value가 정상적으로 입력되지 않던 현상을 수정했습니다.

## 2.1.0

- hourStep, minuteStep, secondStep 옵션이 사라지고 timeStep 옵션으로 합쳐집니다.

## 2.0.0

- DatePicker와 RangePicker에 키보드 입력 기능이 추가되었습니다.
- RangePicker에 Timeselector기능이 추가되었습니다.
- RangePicker에 closesAfterChange 옵션이 삭제됩니다.
- onChange Callback의 오작동이 fix되었습니다.

## 1.12.10

- onChange Dependencies 수정 (value의 변화만 감지하도록 변경)

## 1.12.8

- CSS 종속성 제거

## 1.8.0

### What's New?

- add props `initStartValue` of `RangePicker`
- add props `initEndValue` of `RangePicker`
- add props `onChange` of `RangePicker`

## 1.7.0

### What's New?

- add props weekdayLabels - An option that allows you to label the day of the week in any format that you want.

## 1.6.0

### What's New?

- add props - closesAfterChange
- rangepicker default value

## 1.5.0

### What's New?

- add RangePicker
- change props name - isMultipleCalendar > showsMultipleCalendar, isClearButton > useClearButton

## 1.4.0

### What's New?

- remove ExtraController
- New Props = isMultipleCalendar

## 1.3.0

### What's New?

- New Props - valueFormat
- New Props - labelFormat

## 1.2.0

### What's New?

- New Props - isClearButton

## 1.1.2

### Fix

- datepicker-container - added z-index value 1000.

## 1.1.1

### What's New?

- Add active style in Calendar Button

## 1.1.0

### What's New?

- Add Props - initValue : DatePicker component allows you to declare the initial value.
- Add Props - onChange : Triggered whenever the value of the DatePicker changes.
