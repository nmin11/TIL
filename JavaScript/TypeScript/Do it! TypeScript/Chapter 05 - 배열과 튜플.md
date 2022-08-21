## 1. 배열 이해하기

### JS에서 배열은 객체다

- JS의 배열은 `Array` 클래스의 인스턴스이며, 클래스의 인스턴스는 곧 객체

<br>

### 배열의 비구조화 할당

- 객체처럼 배열도 비구조화 할당 가능

```ts
let arr: number[] = [1, 2, 3, 4, 5];
let [first, second, third, ...rest] = arr;
```

<br>

### for in 문

- ESNext JS와 TS에서 for문을 좀 더 쉽게 사용하도록 제공
- 객체를 대상으로 하지만 배열에서도 사용 가능
- 객체가 가진 속성을 대상으로 순회

```ts
let names = ["Jack", "Jane", "Steve"];
for (let index in names) {
  const name = names[index];
  console.log(`[${index}]: ${name}`);
}
```

```ts
let jack = { name: "Jack", age: 32 };
for (let property in jack) console.log(`${property}: ${jack[property]}`);
```

<br>

### for of 문

- ESNext JS와 TS에서 제공하는 또다른 for문 용법
- 배열의 아이템값을 대상으로 순회

```ts
for (let name of ["Jack", "Jane", "Steve"]) console.log(name);
```

<br>

### 제네릭 함수의 타입 추론

```ts
const identity = <T>(n: T): T => n;
```

<br>

## 2. 선언형 프로그래밍과 배열

- 함수형 프로그래밍은 선언형 프로그래밍과 깊은 관련이 있음
  - 함수형 프로그래밍이 넓은 범위에서 선언형 프로그래밍을 포함
- 배열은 선언형 프로그래밍을 구현할 때 절대적으로 필요한 문법 기능
- 명령형이 CPU 친화적인 low-level 이라면 선언형은 인간 친화적인 high-level

<br>
<br>

## 4. 순수 함수와 배열

### 순수 함수란?

**side effect 가 없는 함수**

- 함수 몸통에 입출력 관련 코드가 없을 것
- 함수 몸통에서 매개변수값을 변경시키지 않을 것 (const 혹은 readonly 만 사용)
- 함수는 몸통에서 만들어진 결과를 즉시 반환할 것
- 함수 내부에 전역 변수나 정적 변수를 사용하지 않을 것
- 함수가 예외를 발생하지 않을 것
- 함수가 콜백 함수로 구현되거나 콜백 함수를 사용하지 않을 것
- 함수 몸통에 비동기 방식으로 동작하는 코드가 없을 것

<br>

### readonly

- 순수 함수 구현을 쉽게 하도록 제공하는 키워드
- 이 키워드와 함께 선언된 매개변수값은 수정할 수 없음
- `const`가 있는데도 이 키워드가 필요한 이유는 인터페이스, 클래스, 함수의 매개변수 등에는 `const`를 붙일 수 없기 때문

<br>

### 깊은 복사와 얕은 복사

- 순수 함수를 구현할 때는 매개변수가 불변성을 유지해야 하므로 깊은 복사를 해야 함
  - 복사본이 수정되어도 원본이 수정되지 않도록 해야 함

<br>

### 전개 연산자와 깊은 복사

- 전개 연산자를 사용해서 배열을 복사하면 깊은 복사 가능

```ts
const oArray = [1, 2, 3, 4];
const deepCopiedArray = [...oArray];
deepCopiedArray[0] = 0;
console.log(oArray, deepCopiedArray); // [ 1, 2, 3, 4 ] [ 0, 2, 3, 4 ]
```

<br>

### sort, filter, map 메소드와 깊은 복사

- `sort` 메소드는 원본 배열의 내용을 변경하므로 전개 연산자 등을 활용한 깊은 복사를 사용해서 정렬해야 순수 함수가 됨
- `filter` `map` 메소드는 깊은 복사 형태로 동작

<br>

### 가변 인수 함수

```ts
export const mergeArray = <T>(...arrays: readonly T[][]): T[] => {
  let result: T[] = [];
  for (let i = 0; i < arrays.length; i++) {
    const array: T[] = arrays[i];
    result = [...result, ...array];
  }

  return result;
};
```

- `...` 부분은 여기에서 전개 연산자가 아닌, 가변 인수를 표현하게 됨

<br>

※ 순수 함수를 고려하면 JS 배열이 제공하는 많은 메소드를 사용할 수 없으므로,<br>전개 연산자 등의 메커니즘을 적극 활용해야 함

<br>
<br>

## 5. Tuple

```ts
const tuple: [boolean, string] = [true, "the result is ok"];
```

### tuple & alias

- 보통 tuple을 사용할 때는 alias로 tuple의 의미를 명확하게 함

```ts
export type ResultType = [boolean, string];
```

```ts
import { ResultType } from "./ResultType";

export const doSomething = (): ResultType => {
  try {
    throw new Error("Some error occurs...");
  } catch (e) {
    return [false, e.message];
  }
};
```

<br>

### tuple과 비구조화 할당

- tuple은 물리적으로는 배열이므로 배열과 같이 인덱스 연산자나 비구조화 할당문 사용 가능

```ts
import { doSomething } from "./doSomething";

const [result, errorMessage] = doSomething();
```
