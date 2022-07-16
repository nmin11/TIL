## REPL

- JS는 스크립트 언어이기 때문에 즉석으로 코드 실행 가능
- Read, Evaluate, Print, Loop
  - 코드를 읽고, 해석하고, 결과를 반환하고, 종료할 때까지 반복
- cmd에 `node` 명령어를 입력하면 간단하게 사용 가능
  - 종료를 원할 땐 Ctrl + C 2번 또는 `.exit` 입력
- REPL은 가끔 한 줄 짜리 코드 실행할 때 아니면 거의 쓸 때가 없음

<br>
<br>

## JS 파일 실행

- `node [js 파일 경로]` 명령으로 실행
- 확장자 `.js`는 생략 가능

<br>
<br>

## module로 만들기

- 노드는 JS 코드를 모듈로 만들 수 있음
- module : 특정 기능을 수행하는 변수 및 함수들의 집합
- 모듈은 여러 프로그램에서 재사용 가능
- 브라우저에서도 ES2015부터 모듈이 지원되기는 함
- 코드가 길 때 여러 파일로 잘게 쪼갤 수가 있음!

※ var.js

```js
const odd = "홀수";
const even = "짝수";

module.exports = {
  odd,
  even,
};
```

※ func.js

```js
const { odd, even } = require("./var");

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;
```

※ index.js

```js
const { odd, even } = require("./var");
const checkNumber = require("./func");

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkNumber("hello"));
console.log(checkStringOddOrEven("hello"));
```

- `module.exports`로 내보내면 `require`로 받아올 수 있음
- 모듈은 그 자체로도 하나의 프로그램이면서 다른 프로그램의 부품이 될 수 있는 것
- 보통은 파일 하나가 모듈 하나가 됨
- 반드시 객체로만 exports 해야 하는 것은 아니지만 통상적으로 객체를 사용하긴 함

<br>

### ES2015 module

```js
import { odd, even } from "./var";

function checkOddOrEven(num) {
  if (num % 2) {
    return odd;
  }
  return even;
}

export default checkOddOrEven;
```

- `require` & `module.exports` → `import` & `export default`
- 노드에서도 ES2015 모듈 시스템을 사용할 순 있지만 사용하려면 확장자를 `mjs`로 사용해야 함
  - `js` 확장자를 사용하면서 ES2015 module을 사용하려면 `package.json`에 `type: "module"` 속성을 넣으면 됨

<br>
<br>

## 노드 내장 객체

- `require`나 `module`을 사용할 수 있는 것은 노드가 기본적으로 제공해주기 때문
- 브라우저의 `window` 객체와도 비슷하게, 노드 내장 객체 및 내장 모듈을 사용할 수 있음

<br>

### global

- 노드의 전역 객체이며, 브라우저의 `window`와 같음
- 모든 파일에서 접근 가능
- `window`처럼 생략 가능
  - `console` `require` 등은 사실 `global`의 하위 속성
- 브라우저와의 통일을 위해 `globalThis`를 사용하기도 함
- `global` 속성의 값을 변경에서 여러 파일들에 함께 사용 가능하지만 매우 안 좋은 방법

<br>

### console

- 보통 디버깅을 위해 사용
- `console.log` 말고도 다른 로깅 함수들이 많음
- `console.dir` : 객체 확인에 용이
- `console.time` `console.timeEnd` : `time`부터 `timeEnd`까지 걸린 시간 (코드의 효율을 알기에 좋음)
- `console.error` : 에러 로깅
- `console.trace` : 함수 호출 스택 로깅 (anonymous까지)
- `console.table` : 배열 안 객체들을 테이블 형식으로 깔끔하게 보여줌

<br>

### 타이머

- `setTimeout(callback, millisecond)` : 주어진 밀리초 이후 콜백 함수 실행
- `setInterval(callback, millisecond)` : 주어진 밀리초마다 콜백 함수 반복 실행
- `setImmediate(callback)` : 콜백 함수 즉시 실행
- `clearTimeout(id)` : setTimeout 취소
- `clearInterval(id)` : setInterval 취소
- `clearImmediate(id)` : setImmediate 취소

```js
const timeout = setTimeout(() => {
  console.log("1.5초 후 실행");
}, 1500);

const interval = setInterval(() => {
  console.log("1초마다 실행");
}, 1000);

const timeout2 = setTimeout(() => {
  console.log("실행되지 않음");
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log("즉시 실행");
});

const immediate2 = setImmediate(() => {
  console.log("실행되지 않음");
});

clearImmediate(immediate2);
```
