## 1. 비동기 콜백 함수

- Node.js에서 제공하는 `readFile`과 같은 API를 실행하기 위한 함수
  - 따라서 Node.js 관련 패키지 필요

```sh
npm i -D typescript ts-node @types/node
```

<br>

### 동기와 비동기 API

- `fs` 패키지는 동기 방식으로 파일을 읽는 `readFileSync`와, 비동기 방식으로 파일을 읽는 `readFile` 메소드 제공
  - `readFile`은 **비동기 콜백 함수(asynchronous callback function)** 이라고 볼 수 있음

※ 동기 방식으로 파일 읽기

```ts
const buffer: Buffer = readFileSync("./package.json");
console.log(buffer.toString());
```

※ Promise와 async/await 구문을 사용해서 파일 읽기

```ts
const readFilePromise = (filename: string): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    readFile(filename, (error: Error, buffer: Buffer) => {
      if (error) reject(error);
      else resolve(buffer.toString());
    });
  });

(async () => {
  const content = await readFilePromise("./package.json");
  console.log(content);
})();
```

- `Buffer`는 Node.js에서 제공하는 클래스이며, binary 데이터를 저장하는 기능을 수행
  - `Buffer.toString` 메소드를 통해 데이터를 문자열로 만들 수 있음
- Node.js에서 API 이름이 `~Sync` 방식이라면 모두 동기 방식으로 동작

<br>

### single-thread 와 비동기 API

- JS는 single-thread 이므로, 될 수 있으면 `readFileSync`와 같은 동기 API를 사용하지 말아야 함
  - TS 또한 ES5 JS 로 변환되어서 실행되므로 마찬가지
- 동기 API를 실행하면 작업을 중단하고 결과를 기다리게 되기 때문에 프로그램의 반응성을 떨어뜨림

<br>

### 콜백 지옥

- 비동기 API를 사용하면 콜백 함수에서 또 다른 비동기 API를 호출할 때 코드가 매우 복잡해짐

```ts
import { readFile } from "fs";

readFile("./package.json", (err: Error, buffer: Buffer) => {
  if (err) throw err;
  else {
    const content: string = buffer.toString();
    console.log(content);

    readFile("./tsconfig.json", (err: Error, buffer: Buffer) => {
      if (err) throw err;
      else {
        const content: string = buffer.toString();
        console.log(content);
      }
    });
  }
});
```

- `Promise`는 이런 콜백 지옥에서 빠져나오고 좀 더 다루기 쉬운 형태의 코드로 만들기 위해 고안됨

<br>
<br>

## 2. Promise

- 클래스이므로 `new` 연산자를 적용해서 객체를 만들어야 함
- `resolve` `reject` 2개의 매개변수를 가짐

※ 기본 형태

```ts
new Promise<T>((resolve: (successValue: T) => void, reject: (any) => void) => {
  // code implement
});
```

<br>

### resolve, reject 함수

```ts
import { readFile } from "fs";

export const readFilePromise = (filename: string): Promise<string> =>
  new Promise<string>(
    (resolve: (value: string) => void, reject: (error: Error) => void) => {
      readFile(filename, (err: Error, buffer: Buffer) => {
        if (err) reject(err);
        else resolve(buffer.toString());
      });
    }
  );
```

- 에러가 발생했을 때는 `reject` 함수 호출, 정상 실행되었을 때는 `resolve` 함수 호출

```ts
import { readFilePromise } from "./readFilePromise";

readFilePromise("./package.json")
  .then((content: string) => {
    console.log(content);
    return readFilePromise("./tsconfig.json");
  })
  .then((content: string) => {
    console.log(content);
    return readFilePromise("."); // 고의로 에러 발생
  })
  .catch((error: Error) => console.log("error:", err.message))
  .finally(() => console.log("Finish"));
```

- `readFilePromise` 함수에서 `resolve` 함수를 호출한 값은 `then` 메소드의 콜백 함수에 전달<br>`reject` 함수를 호출한 값은 `catch` 메소드의 콜백 함수에 전달

<br>

### Promise.resolve

- Promise 클래스는 `resolve`라는 정적 메소드를 제공
- `Promise.resolve(value)` 형태로 호출하면 `value` 값은 `then` 메소드에서 얻을 수 있음

```ts
Promise.resolve([1, 2, 3]).then((value) => console.log(value));
```

<br>

### Promise.reject

- `Prmise.reject(Error)` 메소드에서 Error 객체는 `catch` 메소드의 콜백 함수에서 얻을 수 있음

```ts
Promise.reject(new Error("에러 발생")).catch((err: Error) =>
  console.log("error:", err.message)
);
```

<br>

### then-chain

- `then` 인스턴스 메소드의 콜백 함수는 값을 반환할 수 있음
- 이 때 반환하는 값은 또 다른 `then` 메소드를 호출해서 값을 수신할 수 있음
- 반환된 값이 Promise 타입이라면 이를 resolve한 값을 받게 됨

```ts
Promise.resolve(1)
  .then((value: number) => {
    console.log(value);
    return Promise.resolve(true);
  })
  .then((value: boolean) => {
    console.log(value);
    return [1, 2, 3];
  })
  .then((value: number[]) => {
    console.log(value);
    return { name: "jack", age: 32 };
  })
  .then((value: { name: string; age: number }) => {
    console.log(value);
  });
```

<br>

### Promise.all

- Promise 객체들을 배열 형태로 받아서 모든 객체를 대상으로 resolve 된 값들의 배열 반환
- resolve 된 배열을 Promise 타입으로 반환하므로 이 배열은 then 메소드를 호출해서 얻어야 함
- 배열에 담긴 객체 중 reject 객체가 발생하면 해당 reject value 를 담은 Promise.reject 반환
  - catch 메소드로 reject 값을 얻음

```ts
const getAllResolvedResult = <T>(promises: Promise<T>[]) =>
  Promise.all(promises);

getAllResolvedResult<any>([
  Promise.resolve(true),
  Promise.resolve("hello"),
]).then((result) => console.log(result));

getAllResolvedResult<any>([
  Promise.reject(new Error("error")),
  Promise.resolve(1),
])
  .then((result) => console.log(result))
  .catch((error) => console.log("error:", error.message));
```

<br>

### Promise.race

- 배열에 담긴 Promise 객체 중 하나라도 resolve 되면 이 값을 담은 Promise.resolve 객체 반환
- 만약 reject 값이 가장 먼저 발생하면 Promise.reject 객체 반환

```ts
Promise.race([Promise.resolve(true), Promise.resolve("hello")]).then((value) =>
  console.log(value)
);

Promise.race([Promise.resolve(true), Promise.reject(new Error("hello"))])
  .then((value) => console.log(value))
  .catch((error) => console.log(error.message));

Promise.race([Promise.reject(new Error("error")), Promise.resolve(true)])
  .then((value) => console.log(value))
  .catch((error) => console.log(error.message));
```

<br>
<br>

## 2. async / await 구문

- 2013년 MS에서 C# 5.0을 발표하면서 처음으로 async / await 구문 등장
- 이후 JS에서 이 구문을 차용

```js
const test = async () => {
  const value = await Promise.resolve(1);
  console.log(value);
};
test();
```

<br>

### await 키워드

- operand 의 값을 반환
- 만일 operand 가 Promise 객체이면 then 메소드를 호출해서 얻은 값 반환

<br>

### async 함수 수정자

- `await` 키워드는 `async`라는 함수 수정자가 있는 함수 몸통이 반드시 필요

<br>

### async 함수의 2가지 성질

- 일반 함수처럼 사용 가능
- Promise 객체로 사용 가능

<br>

### async 함수가 반환하는 값의 의미

- async 함수의 반환값은 Promise 형태로 변환되므로 then 메소드 호출을 통해 얻을 수 있음

```ts
const asyncReturn = async () => {
  return [1, 2, 3];
};

asyncReturn.then((value) => console.log(value));
```
