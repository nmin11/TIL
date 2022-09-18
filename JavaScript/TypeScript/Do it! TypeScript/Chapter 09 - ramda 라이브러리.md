## 1. ramda 라이브러리 소개

- TS 언어와 100% 호환
- `compose`와 `pipe` 함수 제공
- auto curry 기능 제공
- 포인트가 없는 고차 도움 함수 제공
- combinatory logic 함수 일부 제공

<br>

### ramda 패키지 구성

utility function 문서

- https://ramdajs.com/docs/
  - 함수를 알파벳 순서로 분류
- https://devdocs.io/ramda/
  - 함수를 기능 위주로 분류

<br>
<br>

## 2. ramda 기본 사용법

### range 함수

- `range(min, max)` 형식으로 사용
- `[min, min + 1, ... max - 1]` 형태의 배열 반환

<br>

### tap 디버깅용 함수

- `tap(callback)(arr)` 형식의 2차 고차 함수로 사용
- 현재 값을 파악할 수 있게 해줌

```ts
import { range, tap } from "ramda";

const numbers: number[] = range(1, 10);
tap((n) => console.log(n))(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

### pipe 함수

```ts
import { range, pipe } from "ramda";

const array: number[] = range(1, 10);
pipe(tap((n) => console.log(n)))(array); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

### pointless function

- ramda 라이브러리 대부분의 함수는 2차 함수 형태
- 2차 함수는 pointless function 형태로 사용 가능

```ts
import { pipe, tap } from "ramda";

export const dump = pipe(tap((n) => console.log(n)));
```

```ts
import { range } from "ramda";
import { dump } from "./dump";

dump(range(1, 10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

<br>

### auto curry

```ts
import { add } from "ramda";

console.log(add(1, 2), add(1)(2));
```

- ramda 라이브러리 함수들은 매개변수가 2개인 일반 함수처럼 사용할 수도 있고 2차 함수로 사용할 수도 있음
- 이를 **auto curry** 라고 부름

<br>

### curryN 함수

- `curryN(N, func)` 형식으로 사용
- N개의 매개변수를 갖는 1차 함수 → N개의 curry를 갖는 N차 함수

```ts
export const sum = (...numbers: number[]): number =>
  numbers.reduce((result: number, sum: number) => result + sum, 0);
```

```ts
import { curryN } from "ramda";
import { sum } from "./sum";

export const curriedSum = curryN(4, sum);
```

<br>

### pure function

- ramda 라이브러리는 pure function을 고려해서 설계되었음
- 따라서 함수들은 항상 입력 변수의 상태를 변화시키지 않고 새로운 값을 반환

<br>
<br>

## 3. 배열에 담긴 수 다루기

### declarative programming

- 선언형 프로그래밍에서 모든 입력 데이터는 단순 데이터보다는 배열 형태를 주로 사용

※ 단순 데이터 형식

```ts
const value = 1;
const newValue = inc(value);
```

※ 배열 형태

```ts
const newArray = pipe(map(inc))([value]);
```

- `tap`을 활용해서 `console.log()`를 직접 찍지 않는 것도 같은 이유

<br>

### 사칙 연산 함수

```ts
add(a: number)(b: number)
subtract(a: number)(b: number)
multiply(a: number)(b: number)
divide(a: number)(b: number)
```

<br>

### addIndex 함수

- `Array.map`은 2번째 매개변수로 index 제공
- `ramda.map`은 index를 기본 매개변수로 제공하지 않음
- `ramda.map`이 `Array.map`처럼 동작하려면 `ramda.addIndex` 함수를 이용해야 함

```ts
import { add, pipe, map, addIndex, tap, range } from "ramda";

const plusIndex = pipe(
  addIndex(map)(add),
  tap((a) => console.log(a)) // [1, 3, 5, 7, 9, 11, 13, 15, 17]
);

const newNumbers = plusIndex(range(1, 10));
```

<br>

### flip 함수

- `subtract` 함수와 `divide` 함수는 매개변수의 순서에 따라 값이 달라짐
- `flip` 함수를 활용하면 매개변수 순서를 바꿔줄 수 있음

```ts
import { flip, subtract, pipe, map, tap, range } from "ramda";

const reverseSubtract = flip(subtract);
const newArray = pipe(
  map(reverseSubtract(10)),
  tap((a) => console.log(a)) // [-9, -8, -7, -6, -5, -4, -3, -2, -1]
)(range(1, 10));
```

<br>
<br>

## 4. 서술자와 조건 연산

- `Array.filter`처럼 콜백 함수가 boolean 타입 값을 반환해서<br>조건을 만족하는지 확인하는 함수를 **predicate(서술자)** 라고 부름

<br>

### 수의 크기를 판단하는 서술자

```ts
lt(a)(b): boolean   // a < b
lte(a)(b): boolean  // a <= b
gt(a)(b): boolean   // a > b
gte(a)(b): boolean  // a >= b
```

- 주로 다른 함수와 결합해서 포인트 없는 함수 형태로 사용됨

```ts
import { pipe, filter, lte, tap, range } from "ramda";

pipe(
  filter(lte(3)),
  tap((n) => console.log(n)) // [3, 4, 5, 6, 7, 8, 9, 10]
)(range(1, 11));
```

- 이는 직관적으로 `3 <= x`의 의미로 와닿지 않기 때문에 `flip(gte(3))`처럼 변형해서 사용하기도 함
