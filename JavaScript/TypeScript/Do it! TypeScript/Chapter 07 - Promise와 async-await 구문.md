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
