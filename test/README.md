## install dependencies

npm i -D @types/node @types/react @types/react-dom @shinyongjun/eslint-config eslint prettier react react-dom typescript -w test

npm i -D @types/node @types/react @types/react-dom @shinyongjun/eslint-config eslint prettier react react-dom typescript concurrently cpy-cli -w package

## React Datepicker

## Timezone

```js
// 인수가 문자열 타임스태프 일땐 Month를 1부터 카운트한다. UTC를 기준으로 하기때문에 한국 기준 9시를 반환한다.
const NEW_DATE1 = new Date('2023-09-01');
const NEW_DATE2 = new Date('2023-09-01 17:15:00');
// 인수가 숫자형일땐 Month를 0부터 카운트한다. 시간을 생략하면 00시00분00초를 기준으로 한다.
const NEW_DATE3 = new Date(2023, 9, 1);
const NEW_DATE4 = new Date(2023, 9, 1, 12, 0, 0);
// Z를 붙이면 UCT 기준 표준시 (Javascript에서 UCT와 GMT는 같다)
const NEW_DATE5 = new Date('2023-09-03T00:00:00Z'); // new Date("2023-09-01") 과 같다.
// Z를 생략하면 LOCAL TIME ZONE
const NEW_DATE6 = new Date('2023-09-03T00:00:00');
```
