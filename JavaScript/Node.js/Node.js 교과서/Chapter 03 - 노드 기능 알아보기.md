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

<br>
<br>

## 노드 내장 모듈

- 노드는 웹 브라우저에서의 JS보다 더 많은 기능을 갖추기 위해 내장 모듈을 제공함
- 노드에서 미리 `require`를 통해 가져올 수 있는 파일을 만들어두었다고 생각하면 편함

<br>

### os

- 운영체제의 정보를 담고 있음

※ 운영체제 정보

- `os.arch()`
- `os.platform()`
- `os.type()` : 운영체제 종류
- `os.uptime()` : 운영체제 부팅 이후 흐른 시간 (초 단위)
- `os.hostname()` : 컴퓨터 이름
- `os.release` : 운영체제 버전

※ 경로

- `os.homedir()` : 홈 디렉토리의 경로
- `os.tmpdir()` : 임시 파일 저장 경로

※ CPU 정보

- `os.cpus()` : 컴퓨터의 코어 정보
- `os.cpus().length` : 컴퓨터 코어 갯수

※ 메모리 정보

- `os.freemem()` : 사용 가능한 RAM 메모리 용량
- `os.totalmem()` : 전체 메모리 용량

<br>

### path

- 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
- 운영체제마다 경로를 구분하는 문자가 다른데, 이에 대한 처리를 용이하게 해줌
  - Windows는 `\`로 구분하지만 유닉스 기반의 POSIX는 `/` 사용
- `path.sep` : 경로 구분자 (Windows `\` POSIX `/`)
- `path.delimiter` : 환경 변수 구분자 (Windows `;` POSIX `:`)
- `path.dirname(path)` : 파일이 위치한 폴더의 경로
- `path.extname(path)` : 파일의 확장자
- `path.basename(path, ext)` : 파일 이름 표시 (2번째 인자 유무에 따라 확장자를 숨기거나 보일 수 있음)
- `path.parse(path)` : 파일 경로를 root, dir, base, ext, name으로 분리
- `path.format(obj)` : `path.parse()` 되어있는 객체를 다시 하나의 파일 경로로 합쳐줌
- `path.normalize(path)` : `/`와 `\`를 실수로 여러 번 사용했거나 혼용했을 때 정상 경로로 변환
- `path.isAbsolute(path)` : 파일 경로가 절대 경로면 true, 상대 경로면 false 반환
- `path.relative(path1, path2)` : 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려줌
- `path.join(path, ...)` : 여러 경로를 하나로 합쳐줌 / 상대 경로로 처리
- `path.resolve(path, ...)` : 여러 경로를 하나로 합쳐줌 / 절대 경로로 처리

<br>

### url

- 인터넷 주소를 쉽게 조작하도록 도와주는 모듈
- url 처리 방식은 크게 2가지
  - 노드 7 버전에서 추가된 WHATWG 방식
  - 예전부터 노드에서 사용하던 방식
  - 2가지 다 알아두면 좋음

(img | WHATWG url)

- 위쪽이 기존 노드 방식, 아래쪽이 WHATWG 방식
- 외울 필요는 없고 필요할 때 옆에 두고 확인해보도록 하자
- 특히, url 중에 hostname이 생략되고 pathname만 있을 경우 WHATWG 방식은 처리할 수 없으므로 기존 노드 방식을 혼용해야 함

**기존 노드 방식 메소드**

- `url.parse(url)` : 주소 분해
- `url.format(obj)` : 분해된 url 객체를 다시 조립

**searchParams**

- WHATWG 방식에서 querystring 처리를 도와주는 객체
- `getAll(key)` : 키에 해당하는 모든 값들을 가져옴
- `get(key)` : 키에 해당하는 첫 번째 값만 가져옴
- `has(key)` : 해당 키가 있는지 여부
- `keys()` : searchParams의 모든 키를 Iterator 객체로 가져옴
- `values()` : searchParams의 모든 값을 Iterator 객체로 가져옴
- `append(key, value)` : 키 추가 / 같은 키가 있을 경우 유지하면서 하나 더 추가
- `set(key, value)` : 같은 키의 값을 모두 지우고 새로 추가
- `delete(key)` : 키 삭제
- `toString()` : 조작한 searchParams 객체를 다시 문자열로 만듦

<br>

**querystring**

- 기존 노드에서 url의 search 부분을 객체로 만들어주는 모듈
- `querystring.parse(query)` : url의 query 부분을 JS 객체로 분해
- `querystring.stringify(obj)` : 분해된 query 객체를 다시 문자열로 조립
- query를 단순하게만 다룰 때 사용하기에 용이

<br>

### crypto

- 성능을 다소 잡아먹기 때문에 멀티 쓰레딩 지원!

**단방향 암호화**

- 단방향 암호화는 복호화할 수 없음
- 그렇기 때문에 암호화라고 표현하는 대신 해시 함수라고도 부름
- 사실 유저의 비밀번호는 복호화할 필요가 없기 때문에 자주 사용됨
  - 비밀번호 대신 해시 값만을 DB에 저장하고, 유저가 비밀번호를 입력할 때마다 암호화해서 비교하면 됨

```js
const crypto = require("crypto");
crypto.createHash("sha512").update("password").digest("base64");
```

- `createHash(algorithm)` : md5, sha1, sha256, sha512 등 어떤 해시 알고리듬을 사용할지 결정
  - 참고로 md5와 sha1은 취약점이 발견되어서 deprecated
- `update(string)` : 변환할 문자열
- `digest(incoding)` : base64, hex, latin1 등 어떤 인코딩 알고리듬을 사용할지 결정
  - base64가 결과 문자열이 가장 짧아서 애용되고 있음
- 가끔 다른 문자열 값을 넣었는데 같은 결과값이 나올 수도 있는데, 이를 '충돌이 발생했다'고 함
- 현재는 주로 pbkdf2, bcrypt, scrypt라는 알고리듬으로 암호화하고 있음

※ 노드에서 지원하는 pbkdf2

```js
const crypto = require("crypto");

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  console.log("salt: ", salt);
  crypto.pbkdf2("password", salt, 100000, 64, "sha512", (err, key) => {
    console.log("password: ", key.toString("base64"));
  });
});
```

- `randomBytes()` : 지정 byte 길이의 문자열을 만들어서 salt로 둠
- `pbkdf2()` : 비밀번호, salt, 반복 횟수, 출력 byte, hash algorithm을 인수로 가짐
- 내부적으로 스레드풀을 사용하기 때문에 멀티 스레딩으로 동작
- pbkdf2는 bcrypt나 scrypt에 비해 취약함

**양방향 대칭형 암호화**

- 복호화를 위해 key가 사용됨
- 복호화할 때는 암호화할 때 사용한 키와 같은 키를 사용해야 함

```js
const cipher = crypto.createCipheriv(algorithm, key, iv);
let result1 = cipher.update("암호화 문장", "utf8", "base64");
result1 += cipher.final("base64");
console.log("암호화: ", result1);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result1, "base64", "utf8");
result2 += decipher.final("utf8");
console.log("복호화: ", result2);
```

- `crypto.createCipheriv(algorithm, key, iv)` : 어떻게 암호화할지 결정
- `cipher.update(str, incoding, output-incoding)` : 암호화 대상, 대상에 대한 인코딩, 출력에 대한 인코딩 설정
- `cipher.final(output-incoding)` : 출력 결과물의 인코딩까지 넣음으로써 암호화 완료
- `crypto.createDecipheriv(algorithm, key, iv)` : 복호화할 때 사용하며, 암호화할 때와 같은 인자값들을 넣어야 함
- `decipher.update(str, incoding, output-incoding)` : 암호화된 문장, 그 문장의 인코딩, 복호화할 인코딩 설정
- `decipher.final(output-incoding)` : 복호화 결과물의 인코딩을 넣어서 복호화 완료
- 노드에서의 다른 암호화 방식은 https://nodejs.org/api/crypto.html 에서 확인 가능
- 사실 위 코드는 암호학을 공부하지 않았다면 이해하기 힘든 코드
- 좀 더 간단하게 암호화하고 싶다면 npm package인 [crypto-js](https://www.npmjs.com/package/crypto-js) 추천

※ 제로초의 암호화 추천 : 단방향 - SHA512 / 대칭 양방향 - AES / 비대칭 양방향 - RSA
※ 암호를 관리하기 위해 AWS KMS 등의 외부 서비스를 사용하기도 함 (하지만 뚜렷한 정답이란 아직 없음)

<br>

### util

- 각종 편의 기능을 모아둔 모듈
- `deprecated`와 `promisify`가 자주 쓰임

```js
const util = require("util");
const crypto = require("crypto");

const doNotUseMe = util.deprecated((x, y) => {
  console.log(x + y);
}, "This function is deprecated!");
doNotUseMe(1, 2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
  .then((buf) => {
    console.log(buf.toString("base64"));
  })
  .catch((error) => {
    console.log(error);
  });
```

- `util.deprecate` : 함수가 deprecated 되었음을 알림
  - 첫 번째 인자로 함수, 두 번째 인자로 deprecated 메시지를 넣음
- `util.promisify` : 콜백 패턴을 프로미스 패턴으로 바꿈
  - `util.callbackify`도 있지만 잘 사용되지 않음

<br>

### worker-threads

- 노드에서 Multi-Thread 방식으로 작업하기 위한 모듈
- 노드에서 멀티 쓰레딩이 가능은 하다는 정도로 인지하자
  - 각 쓰레드의 작업들을 수동으로 설정하는 과정이 번거로움
- 메인 쓰레드는 `new Worker`를 통해서 현재 파일 (\_\_filename)을 워커 쓰레드에서 실행시킬 수 있음
  - 물론 다른 파일에 대한 작업을 워커에게 부여할 수도 있음
- `isMainThread` : 현재 코드가 메인 쓰레드에서 실행 중인지 여부
- `worker.postMessage` : 부모에서 워커로 데이터를 보냄
- `parentPort.on(data)` : 부모로부터 데이터를 받음

※ 간단한 사용 예시

```js
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on("message", (message) => console.log("from worker", message));
  worker.on("exit", () => console.log("worker exit"));
  worker.postMessage("ping");
} else {
  parentPort.on("message", (value) => {
    console.log("from parent", value);
    parentPort.postMessage("pong");
    parentPort.close();
  });
}
```

※ 2 ~ 1,000만 까지 소수가 몇 개 있는지를 `worker_threads`와 함께 알아내기

```js
const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  let end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
    isPrime = true;
  }
}

if (isMainThread) {
  const max = 10000000;
  const threadCount = 8;
  const threads = new Set();
  const range = Math.floor((max - min) / threadCount);
  let start = min;
  console.time("prime");
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(
      new Worker(__filename, { workerData: { start: wStart, range } })
    );
    start += range;
  }
  threads.add(
    new Worker(__filename, { workerData: { start, range: max - start } })
  );
  for (let worker of threads) {
    worker.on("error", (err) => {
      throw err;
    });
    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd("prime");
        console.log(primes.length);
      }
    });
    worker.on("message", (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
```

- 8개의 쓰레드가 일을 나눠서 처리
- 멀티 쓰레딩은 일을 나눠서 처리하는 부분이 까다로움
- 이번 예제는 다행히 작업의 범위가 명확히 정해져 있기 때문에 예측이 가능함
- 쓰레드를 생성하고 쓰레드 사이에서 통신하는 데에 드는 비용이 상당하므로 시간 격차를 잘 계산해서 사용해야 함

<br>

### child_process

- 다른 프로그램이나 명령어를 실행하고 싶을 때 사용하는 모듈
- 다른 언어의 코드를 실행하고 결과값을 받을 수 있음
- 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고 결과를 알려주기 때문에 `child_process`라고 부름

※ 명령 프롬프트 사용 예제

```js
const exec = require("child_process").exec;
const process = exec("ls");

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.error(data.toString());
});
```

※ python 사용 예제

```js
const spawn = require("child_process").spawn;
const process = spawn("python", ["test.py"]);

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function (data) {
  console.error(data.toString());
});
```

- `stdout` : 표준 출력
- `stderr` : 표준 에러
- 이런 방식으로 접근하는 것은 효율적이지 않고, 자주 사용되진 않지만 알아두면 좋음

<br>

### 기타 모듈들

- `assert` : 값을 비교하여 프로그램 정상 작동 확인 테스트
- `dns` : 도메인 이름에 대한 IP 주소 조회
- `net` : HTTP에 비해 low level인 TCP나 IPC 통신을 할 때 사용
- `string_decoder` : 버퍼 데이터를 문자열로 변환
- `tls` : TLS 및 SSL 관련 작업
- `tty` : 터미널 관련 작업
- `dgram` : UDP 관련 작업
- `v8` : V8 엔진 직접 접근
- `vm` : 가상 머신 직접 접근

<br>
<br>

## fs

- 파일 시스템에 접근하는 모듈
- 파일 및 폴더 생성, 삭제, 읽기, 쓰기 기능
- 웹 브라우저에서는 파일 접근 기능이 제한되어 있으나 노드에서는 권한을 가질 수 있음
  - 권한이 있는 만큼 보안에 각별히 신경써야 함

※ 기본 사용 예제

```js
const fs = require("fs");

fs.readFile("./readme.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
  console.log(data.toString());
});
```

- 여기서의 파일 경로는 현재 파일 경로가 아닌 `node` 명령어를 실행하는 콘솔 기준
- `console.log(data)`는 2진법이 16진법으로 변형된 `Buffer`가 출력됨
- fs 모듈은 또한, Promise 형식으로도 사용 가능!
  - 대부분의 경우 promises 방식으로 사용하기를 추천!

※ promises 활용 예제

```js
const fs = require("fs").promises;

fs.readFile("./readme.txt")
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
```

※ 파일 쓰기 예제

```js
const fs = require("fs").promises;

fs.writeFile("./writeme.txt", "글 작성!")
  .then(() => {
    return fs.readFile("./writeme.txt");
  })
  .then(() => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
```

<br>

### 동기 메소드와 비동기 메소드

- 노드는 대부분의 메소드를 비동기 처리
- 하지만 몇몇 메소드는 동기 방식으로도 사용 가능하며, fs 모듈에 특히 그런 메소드들이 많음

※ Note: 동기와 비동기, blocking과 non-blocking

- 동기와 비동기 : 백그라운드 작업 완료 확인 여부
- blocking과 non-blocking : 함수가 바로 return 되는지 여부
- 노드에서는 **동기 - blocking** 방식과 **비동기 - non-blocking** 방식이 대부분
- 동기 - blocking : 백그라운드 작업 완료 여부를 계속 확인하면서, 해당 작업이 끝나야 return
- 비동기 - non-blocking : 호출한 함수를 바로 return하고 다음 작업으로 넘어가며, 나중에 백그라운드가 알림을 줄 때 비로소 처리

※ 같은 파일을 여러 번 읽는 작업을 동기 메소드로

```js
const fs = require("fs");

let data = fs.readFileSync("./readme.txt");
console.log("1번", data.toString());
data = fs.readFileSync("./readme.txt");
console.log("2번", data.toString());
data = fs.readFileSync("./readme.txt");
console.log("3번", data.toString());
```

- `readFileSync` 메소드를 사용하면 코드를 순서대로, 동기적으로 처리
- 하지만 그만큼 백그라운드 작업이 길어질 동안 메인 쓰레드가 아무 것도 하지 못하게 되어버림
- 백그라운드는 fs 작업을 동시에 처리할 수 있는데 `Sync` 메소드를 사용하면 동시 처리도 안됨
- `writeFileSync`도 있지만 마찬가지의 이유로 거의 사용되지 않음
- 프로그램 처음 실행 시 초기화 용도로만 사용하기를 권장
- 비동기 방식으로도 순서대로 실행하고 싶다면
  - 콜백 지옥을 만들어서 구현 가능
  - Promise나 async/await으로도 구현 가능

※ 같은 파일을 여러 번 읽는 작업을 Promise로

```js
const fs = require("fs").promises;

fs.readFile("./readme.txt")
  .then((data) => {
    console.log("1번", data.toString());
    return fs.readFile("./readme.txt");
  })
  .then((data) => {
    console.log("2번", data.toString());
    return fs.readFile("./readme.txt");
  })
  .then((data) => {
    console.log("3번", data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
```

※ 같은 파일을 여러 번 읽는 작업을 async/await으로

```js
const fs = require("fs").promises;

async function main() {
  let data = await fs.readFile("./readme.txt");
  console.log("1번", data.toString());
  data = await fs.readFile("./readme.txt");
  console.log("2번", data.toString());
  data = await fs.readFile("./readme.txt");
  console.log("3번", data.toString());
}

main();
```

<br>

### Buffer와 Stream

- 파일을 읽거나 쓰는 방식은 크게 Buffer와 Stream 2가지
- Buffer : 일정한 크기로 모아두는 데이터
  - 일정한 크기가 되면 한번에 처리
  - 버퍼링 : 버퍼에 데이터를 채울 때까지 모으는 작업
- Stream : 데이터의 흐름
  - 일정한 크기로 나눠서 여러 번에 걸쳐서 처리
  - 버퍼 또는 청크의 크기를 작게 만들어서 주기적으로 데이터 전달
  - 스트리밍 : 일정한 크기의 데이터를 지속적으로 전달하는 작업
- 대부분의 경우 스트림이 효율적
  - 서버의 메모리를 적게 차지하면서 데이터를 보낼 수 있음

**Buffer 객체의 메소드**

- `from(str)` : 문자열을 버퍼로, length 속성으로 버퍼의 크기 조회 가능 (byte 단위)
- `toString(buffer)` : 버퍼를 문자열로, base64나 hex 인수를 함께 넣어서 인코딩 가능
- `concat(arr)` : 배열 안의 버퍼들을 하나로 합침
- `alloc(byte)` : byte 크기의 빈 버퍼 생성

**Stream**

※ Stream으로 파일 읽기

```js
const fs = require("fs");

const readStream = fs.createReadStream("./readme.txt", { highWaterMark: 16 });
const data = [];

readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data: ", chunk, chunk.length);
});

readStream.on("end", () => {
  console.log("end: ", Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
  console.log("error: ", err);
});
```

- `highWaterMark`는 버퍼 크기를 byte 단위로 지정
  - 지정하지 않으면 기본값 64KB
- `createReadStream`은 event listener와 함께 사용
  - 보통 `data` `end` `error` 사용

※ Stream으로 파일 쓰기

```js
const fs = require("fs");

const writeStream = fs.createWriteStream("./writeme.txt");
writeStream.on("finish", () => {
  console.log("파일 쓰기 완료");
});

writeStream.write("글 작성");
writeStream.end();
```

- `createWriteStream`의 첫번째 인수는 출력 파일명
- 마찬가지로 event listener 사용
  - `finish`는 파일 쓰기가 종료될 때 사용되는 콜백 함수 지정

※ 파일을 읽은 스트림을 전달받아 스트림으로 파일 쓰기 (파이핑)

```js
const fs = require("fs");

const readStream = fs.createReadStream("readme.txt");
const writeStream = fs.createWriteStream("writeme.txt");
readStream.pipe(writeStream);
```

- `pipe` 메소드 하나로 이벤트 처리도 없이 전달할 수 있어서 편리
- 그러나 노드 8.5 버전 이후에는 새로운 파일 복사 방식 사용 (다음 내용에)

※ gzip 압축 예제

```js
const zlib = require("zlib");
const fs = require("fs");

const readStream = fs.createReadStream("./readme.txt");
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream("./readme.txt.gz");
readStream.pipe(zlibStream).pipe(writeStream);
```

- zlib의 `createGzip` 메소드는 스트림 지원
- `readStream`과 `writeStream` 중간에 파이핑을 해서 데이터를 압축 및 전달

<br>

### 기타 fs 메소드들

- `fs.access(path, opt, callback)` : 폴더 및 파일에 접근할 수 있는지 여부
- `fs.mkdir(path, callback)` : 폴더 만들기, 이미 폴더가 있다면 에러 발생
- `fs.open(path, opt, callback)` : 파일의 ID를 가져옴, 파일이 없다면 파일 생성 후 그 ID를 가져옴
- `fs.rename(origin-path, new-path, callback)` : 파일 이름 변경
- `fs.readdir(path, callback)` : 폴더 안 확인
- `fs.unlink(path, callback)` : 파일 삭제, 파일이 없다면 에러 발생
- `fs.rmdir(path, callback)` : 폴더 삭제, 폴더 안에 파일이 있어도 에러 발생
- `fs.copyFile(origin, copied)` : 파일 복사
- `fs.watch(path, callback)` : 파일에 대한 이벤트 감지

<br>
<br>

## Event

- Stream 같은 모듈 내부의 이벤트 말고도, 개발자가 직접 이벤트를 만들 수도 있음

```js
const EventEmitter = require("events");

const myEvent = new EventEmitter();
const listener1 = () => {
  console.log("Event 1");
};
myEvent.addListener("event1", listener1);
myEvent.on("event2", () => {
  console.log("Event 2");
});
myEvent.once("event3", () => {
  console.log("Event 3");
});
myEvent.emit("event1");
myEvent.emit("event2");
myEvent.emit("event3");
myEvent.removeAllListeners("event2");
console.log(myEvent.listenerCount("event1"));
myEvent.removeListener("event1", listener1);
```

- `events` 모듈 사용
- `on(name, callback)` : 이벤트 이름과 이벤트 발생 시의 콜백 연결, 하나의 이벤트명에 여러 이벤트 할당 가능
- `addListener(name, callback)` : `on`과 기능이 같음
- `emit(name)` : 이벤트 호출 메소드
- `once(name, callback)` : 한번만 실행되는 이벤트
- `removeAllListeners(name)` : 이벤트에 연결된 모든 이벤트 리스너 제거
- `removeListener(name, listener)` : 이벤트에 연결된 리스너 제거
- `off(name, callback)` : `removeListener`와 기능이 같음
- `listenerCount` : 현재 연결된 리스너 개수
