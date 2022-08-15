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

### const 키워드와 함수 표현식

- 함수 표현식을 담는 변수는 `const`를 사용하여 선언하는 것이 바람직
