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
