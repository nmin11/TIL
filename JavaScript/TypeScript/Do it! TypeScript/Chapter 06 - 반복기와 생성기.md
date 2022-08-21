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
