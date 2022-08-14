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
