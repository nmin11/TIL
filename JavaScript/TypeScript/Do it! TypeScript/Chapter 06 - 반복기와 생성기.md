## 1. 반복기

※ `tsconfig.json`에서 `compilerOptions` 하위의 `downlevelIteration` 값을 true 로 줄 것

<br>

### 반복기와 반복기 제공자

- for of 구문은 타입에 무관하게 배열에 담긴 값을 차례대로 얻는 데 활용됨
- for of 구문은 다른 프로그래밍 언어에서도 **Iterator** 라는 주제로 쉽게 찾아볼 수 있음
- 대부분의 프로그래밍 언어에서의 반복기가 가지는 특징
  - `next`라는 이름의 메소드 제공
  - `next` 메소드는 `value`와 `done`이라는 속성을 가진 객체 반환

```ts
export const createRangeIterable = (from: number, to: number) => {
  let currentValue = from;
  return {
    next() {
      const value = currentValue < to ? currentValue++ : undefined;
      const done = value == undefined;
      return { value, done };
    },
  };
};
```

- 위와 같이 반복기를 제공하는 역할을 하는 함수를 **Iterable** 이라고 부름

```ts
import { createRangeIterable } from "./createRangeIterable";

const iterator = createRangeIterable(1, 3 + 1);
while (true) {
  const { value, done } = iterator.next();
  if (done) break;
  console.log(value);
}
```

<br>

### 반복기는 왜 필요한가?

※ `range` 함수 다시 보기

```ts
export const range = (from, to) =>
  from < to ? [from, ...range(from + 1, to)] : [];
```

- `range` 함수는 값이 필요한 시점 이전에 미리 값을 생성하지만, 반복기를 활용한 함수는 값이 필요한 시점에 생성함

<br>

### Iterable\<T> & Iterator\<T> 인터페이스

```ts
export class StringIterable implements Iterable<string> {
  constructor(
    private strings: string[] = [],
    private currentIndex: number = 0
  ) {}
  [Symbol.iterator](): Iterator<string> {
    const that = this;
    let currentIndex = that.currentIndex,
      length = that.strings.length;

    const iterator: Iterator<string> = {
      next(): { value: string; done: boolean } {
        const value =
          currentIndex < length ? that.strings[currentIndex++] : undefined;
        const done = value == undefined;
        return { value, done };
      },
    };
    return iterator;
  }
}
```

```ts
import { StringIterable } from "./StringIterable";

for (let value of new StringIterable(["hello", "world", "!"]))
  console.log(value);
```

<br>
<br>

## 2. 생성기

- ESNext JS와 TS는 `yield` 키워드 제공
- `yield`는 마치 `return`처럼 값을 반환
- `yield`는 반드시 `function*` 키워드를 사용한 함수에서만 호출 가능
- `function*` 키워드로 만든 함수를 **generator** 라고 부름

```ts
export function* generator() {
  console.log("generator started");
  let value = 1;
  while (value < 4) yield value++;
  console.log("generator finished");
}
```

<br>

### setInterval 함수와 생성기의 유사성

- 생성기가 동작하는 방식을 **semi-coroutine** 이라고 부름
  - single-thread 로 동작하는 프로그래밍 언어가 마치 multi-thread 로 동작하는 것처럼 보이게 하는 기능

```ts
const period = 1000;
let count = 0;
console.log("program started");
const id = setInterval(() => {
  if (count >= 3) {
    clearInterval(id);
    console.log("program finished");
  } else {
    console.log(++count);
  }
}, period);
```

- `function*` `setInterval` 이 둘의 작동 방식은 구분할 수 없을 정도로 비슷

<br>

### function\* 키워드

- 오직 `function*` 키워드로만 선언 가능하며, 화살표 함수로는 생성기를 만들 수 없음
- 생성기는 반복기 제공자로서 동작

<br>

### yield 키워드

- operator 형태로 동작
- 반복기 자동 생성
- 반복기 제공자 역할도 수행

<br>

### 반복기 제공자의 메소드로 동작하는 생성기 구현

```ts
export class IterableUsingGenerator<T> implements Iterable<T> {
  constructor(private values: T[] = [], private currentIndex: number = 0) {}
  [Symbol.iterator] = function* () {
    while (this.currentIndex < this.values.length)
      yield this.values[this.currentIndex++];
  };
}
```

```ts
import { IterableUsingGenerator } from "./IterableUsingGenerator";

for (let item of new IterableUsingGenerator([1, 2, 3])) console.log(item);
for (let item of new IterableUsingGenerator(["hello", "world", "!"]))
  console.log(item);
```

<br>

### yield\* 키워드

- `yield`는 값을 대상으로 동작, `yield*`는 다른 생성기나 배열을 대상으로 동작

```ts
function* gen12() {
  yield 1;
  yield 2;
}

export function* gen12345() {
  yield* gen12();
  yield* [3, 4];
  yield 5;
}
```

<br>

### yield 반환값

```ts
export function* gen() {
  let count = 5;
  let select = 0;
  while (count--) {
    select = yield `you select ${select}`;
  }
}

export const random = (max, min = 0) =>
  Math.round(Math.random() * (max - min)) + min;
```

```ts
import { random, gen } from "./yield-return";

const iter = gen();
while (true) {
  const { value, done } = iter.next(random(10, 1));
  if (done) break;
  console.log(value);
}
```
