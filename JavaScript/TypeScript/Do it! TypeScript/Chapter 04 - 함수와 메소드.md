## 1. 함수 선언문

- JS는 `function` 키워드 혹은 `=>` 기호로 함수 선언 가능
- TS는 JS 함수 선언문에서 매개변수와 반환값에 타입 주석을 붙이는 형태로 구성

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

<br>

### 매개변수와 반환값의 타입 주석 생략

- 변수와 마찬가지로 함수 선언문에서도 매개변수와 반환값에 대한 타입 주석은 생략 가능
- 하지만 **함수의 구현 의도**를 명확하게 하기 위해서 타입 주석을 명시해주는 것을 권장함

<br>

### void 타입

- 값을 반환하지 않는 함수의 반환 타입
- 오직 함수의 반환 타입으로만 사용 가능한 타입

```ts
function printMe(name: string, age: number): void {
  console.log(`name: ${name}, age: ${age}`);
}
```

<br>

### function signature

- 변수에 타입이 있듯, 함수에도 타입이 있음

```ts
let printMe: (string, number) => void = function (
  name: string,
  age: number
): void {};
```

- 위 함수 시그니쳐는 `(string, number) => void`

<br>

### type alias

- `type` 키워드를 사용하면 기존에 존재하는 타입을 이름만 바꿔서 사용할 수 있게 됨

```ts
type stringNumberFunc = (string, number) => void;
let f: stringNumberFunc = function (a: string, b: number): void {};
```

- 매개변수의 개수나 타입, 반환 타입을 잘못 사용하는 경우를 방지할 수 있게 함

<br>

### undefined 관련 주의 사항

```ts
interface INameable {
  name: string;
}

function getName(o: INameable) {
  return o.name;
}

let n = getName(undefined);
```

- `undefined`는 `INameable`의 자식 타입이 될 수 있으므로 문제가 없음
- 하지만 `undefined.name`을 참조하려고 할 때 문제 발생
- 이런 오류를 방지하려면 매개변수 값이 `undefined`인지 여부를 판별하는 코드를 작성해야 함

```ts
interface INameable {
  name: string;
}

function getName(o: INameable) {
  return o != undefined ? o.name : "unknown name";
}
```

<br>

### optional parameter

- 인터페이스와 마찬가지로 함수도 `?` 기호를 통해 선택적 매개변수를 가질 수 있음

```ts
function fn(arg1: string, arg2?: number): void {}
```

- 함수 시그니쳐에도 선택적 매개변수 적용 가능

```ts
type OptionalArgFunc = (string, number?) => void;
```

<br>
<br>

## 2. 함수 표현식

### 함수는 객체다

- JS는 함수형 언어 sheme과 프로토타입 기반 객체지향 언어 self를 모델로 만들어졌음
- JS에서 함수는 **Function** 클래스의 instance
- **function expression** : 함수 선언문에서 이름을 제외한 `function(a, b) { return a + b }`와 같은 코드

<br>

### first-class function

- 프로그래밍 언어가 일등 함수 기능을 제공하면 '함수형 프로그래밍 언어'라고 불림
- JS와 TS 모두 일등 함수 기능이 존재
- **일등 함수** : 함수와 변수를 구분하지 않는 것

```ts
let f = function (a, b) {
  return a + b;
};
f = function (a, b) {
  return a - b;
};
```

<br>

### expression

- 프로그래밍 언어에서 표현식은 literal, 연산자, 변수, 함수 호출 등이 복합적으로 구성된 코드 형태를 의미
- 표현식은 항상 컴파일러에 의해 계산법이 적용되어 어떤 값이 됨

<br>

### function expression

- 변수에 함수를 대입하는 경우, 대입하는 함수 부분을 함수 표현식이라고 할 수 있음

<br>

### evaluation

- 컴파일러는 표현식을 만나면 계산법을 적용해서 어떤 값을 만듦
- eager evaluation : 상수를 계산할 때는 즉시 계산
- lazy evaluation : 참조하는 변수가 있다면 변수값을 알기 위해 지연된 계산

<br>

### function call operator

- 변수가 함수 표현식을 달고 있을 때 변수 이름 뒤에 `()`를 붙여서 호출 가능
- 함수 호출 : 함수 표현식의 몸통 부분을 실행한다는 뜻
- 만약 함수가 매개변수를 요구한다면 `()` 안에 필요한 매개변수 명시

```ts
let functionExpression = function (a, b) {
  return a + b;
};
let value = functionExpression(1, 2);
```

- 컴파일러는 함수 호출문을 만났을 때 eager evaluation을 적용해서 함수 표현식을 값으로 바꿈

<br>

### anonymous function

- 함수 표현식은 사실 다른 프로그래밍 언어에서 자주 등장하는 익명 함수의 다른 표현

```js
let value = (function (a, b) {
  return a + b;
})(1, 2);
```

<br>
<br>

## 3. 화살표 함수와 표현식 문

- ESNext JS와 TS는 `=>` 기호로 만드는 화살표 함수 제공
- 화살표 함수의 몸통은 `{}`를 사용하거나 생략할 수 있음

```ts
const arrow1 = (a: number, b: number): number => {
  return a + b;
};
const arrow2 = (a: number, b: number): number => a + b;
```

- `{}` 사용 여부에 따라 TS는 **실행문** 방식과 **표현식 문** 방식으로 달라짐

<br>

### 실행문과 표현식 문

- 프로그래밍 언어는 실행문 지향 언어와 표현식 지향 언어로 구분되어 왔음
- ES5는 실행문 지향이지만 ESNext와 TS는 실행문과 표현식 문을 동시 지원
  - 이러한 언어를 multi-paradigm language 라고 부름
- 실행문 : CPU에서 실행되는 코드, return 문이 없다면 결과를 알려주지 않음
- 표현식 문 : return문이 없어도 결과를 알려줌

<br>

## 4. 일등 함수 살펴보기

- 매개변수 형태로 동작하는 함수를 **callback function** 이라고 부름

```ts
export const init = (callback: () => void): void => {
  console.log("default initialization finished.");
  callback();
  console.log("all initialization finished.");
};
```

- 위의 `init` 함수는 중간에 매개변수로 받은 `callback` 함수를 실행

```ts
import { init } from "./init";
init(() => console.log("custom initialization finished."));
```

<br>

### 중첩 함수

- 함수 안에 또 다른 함수를 중첩해서 구현 가능

```ts
const calc = (value: number, cb: (number) => void): void => {
  let add = (a, b) => a + b;
  function multiply(a, b) {
    return a * b;
  }
  let result = multiply(add(1, 2), value);
  cb(result);
};

calc(30, (result: number) => console.log(`result is ${result}`));
```

<br>

### 고차 함수, 클로저, 부분 함수

- **high-order function** 은 또 다른 함수를 반환하는 함수
  - 함수형 프로그래밍에서 매우 중요한 기능

```ts
export type NumberToNumberFunc = (number) => number;
export const add = (a: number): NumberToNumberFunc => {
  const _add: NumberToNumberFunc = (b: number): number => {
    return a + b;
  };
  return _add;
};
```

- `return a + b` 부분을 **closure** 라고 부름
  - 고차 함수는 closure 기능이 반드시 필요

```ts
import { NumberToNumberFunc, add } from "./add";

let fn: NumberToNumberFunc = add(1);
let result = fn(2);

console.log(result); //3
console.log(add(1)(2)); //3
```

- `add(1)` 만을 변수에 담았을 때는 단지 임시 변수의 역할만 하며,<br>나머지 값을 함수 호출연산자를 통해 받아야만 값이 됨

```ts
const multiply = (a) => (b) => (c) => a * b * c;
```

- `multiply` 함수는 함수 호출연산자가 3개 필요
- 함수 호출연산자를 1개 혹은 2개 사용했다면 이를 partial application 혹은 partially applied function 이라고 부름
