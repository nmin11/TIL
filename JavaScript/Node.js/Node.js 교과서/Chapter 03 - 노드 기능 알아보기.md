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

<br>

### \_\_filename & \_\_dirname

- `__filename` : 현재 파일 경로
- `__dirname` : 현재 폴더 경로
- 노드는 파일 시스템 접근 관련 보안이 허술
- 생각보다 자주 쓰임
  - 나중에 배울 `path`와 함께 쓰임

<br>

### module, exports, require

- `module`은 생략 가능
- `exports`는 처음부터 빈 객체로 존재

```js
exports.odd = "홀수";
exports.even = "짝수";
```

- 주의사항 : `exports` 객체를 사용할 땐 `module.exports`와의 참조 관계가 깨지지 않도록 주의해야 함
  - `module.exports`에는 어떤 값이든 대입할 수 있지만 `exports`에는 반드시 객체처럼 속성명과 속성값을 대입해야 함
  - 만약 `exports`에 객체 대신 다른 값을 대입하면 `module`과의 참조 관계가 끊겨버림
  - 한 모듈에 `exports`와 `module.exports`를 동시에 사용하지 않는 것이 좋음

**this**

- 노드에서 최상위 스코프의 `this`는 `module.exports`를 가리킴
- 함수 선언문 내부의 `this`는 `global` 객체를 가리킴
- 그 외에는 브라우저의 JS와 동일

**require**

- `require.cache` : 한 번 require한 모듈에 대한 캐싱 정보가 들어있음
  - `require`로 파일을 불러왔다면 그 정보를 다시 조회할 때 캐시를 활용해서 파일을 다시 조회하지 않도록 해줌
- `require.main` : 노드 실행 시 첫 모듈
  - 노드를 실행한 첫 파일 이름
- 여기에 있는 정보들 또한 마음껏 다루기엔 위험하고, 사실 초보가 다루기에는 다소 deep한 내용

**순환 참조**

- 2개의 모듈이 서로를 `require`하는 상황을 기피해야 함

※ dep1.js

```js
const dep2 = require("./dep2");
console.log("require dep2", dep2);
module.exports = () => {
  console.log("dep2", dep2);
};
```

※ dep2.js

```js
const dep1 = require("./dep1");
console.log("require dep1", dep1);
module.exports = () => {
  console.log("dep1", dep1);
};
```

※ dep-run.js

```js
const dep1 = require("./dep1");
const dep2 = require("./dep2");
dep1();
dep2();
```

- `dep-run.js`를 실행하면 `dep1`의 `module.exports`는 빈 객체로 표시됨
- 노드는 순환 참조되는 대상을 빈 객체로 만들어버림
- 에러가 발생하지 않고 조용히 빈 객체가 되어버리므로, 개발자가 특히 조심해서 설계해야 하는 부분

<br>

### process

- `process.version` : 노드 버전
- `process.arch` : 프로세서 아키텍처 정보 / x64, arm, ia32 등
- `process.platform` : 운영체제 플랫폼 정보
- `process.pid` : 현재 프로세스의 ID
- `process.uptime()` : 프로세스가 시작된 후 흐른 시간 (초 단위)
- `process.execPath` : 노드 경로
- `process.cwd()` : 현재 프로세스가 실행되는 위치
- `process.cpuUsage()` : 현재 CPU 사용량
- 이 밖에 `env` `nextTick` `exit()`은 중요하니 따로 정리

**process.env**

- 시스템 환경 변수들이 들어있는 객체
- 일부 환경 변수들은 노드 실행 시에 영향을 미침
  - `NODE_OPTIONS` : 노드 실행 옵션들
  - `UV_THREADPOOL_SIZE` : 노드에서 기본적으로 사용할 스레드풀의 스레드 개수 조절
- 서버나 DB의 비밀번호, 각종 API 키를 담아두기 위해 상당히 자주 사용됨

**process.nextTick(callback)**

- event loop는 다른 콜백 함수보다 `nextTick`의 콜백 함수를 우선 처리함
- 남용하면 다른 함수들의 실행 속도를 늦춰버림
- 비슷한 경우로 `Promise`가 있음
  - `setImmediate`보다 `Promise`와 `process.nextTick`이 우선 실행됨
  - 그래서 `Promise`와 `process.nextTick`을 **microtask**라고 따로 구분지어 부름

```js
setImmediate(() => {
  console.log("immediate");
});
process.nextTick(() => {
  console.log("nextTick");
});
Promise.resolve().then(() => console.log("promise"));
```

**process.exit(code)**

- 현재 프로세스 중지
- code 값이 없거나 0이면 정상 종료 / 그 외의 code 값을 가진다면 비정상 종료
- 서버에서는 서버가 종료되니 잘 사용하지 않지만 독립적인 프로그램에서 수동으로 노드를 멈추기 위해 사용됨
