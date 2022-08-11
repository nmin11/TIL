## 1. TypeScript 변수 선언문

### TypeScript 기본 제공 타입

number / boolean / string / object

<br>

### let & const

- var는 ESNext에서 deprecated
- let은 mutable, const는 immutable
  - const 변수 선언 시 초기값이 꼭 필요함

<br>

### type annotation

- 변수 선언문을 확장해서 타입 명시 가능

```ts
let n: number = 1;
let b: boolean = true;
let s: string = "hello";
let o: object = {};
```

<br>

### type inference

- JS와의 호환성을 위해 타입 주석 생략 가능
- 생략할 경우, 우항의 값에 따라 타입을 추론

```ts
let n = 1;
let b = true;
let s = "hello";
let o = {};
```

<br>

### any 타입

- JS와의 호환을 위해 제공
- 어떤 종류의 값이라도 저장 가능
- 모든 타입의 최상위 타입

```ts
let a: any = 0;
a = "hello";
a = true;
a = {};
```

<br>

### undefined 타입

- JS에서의 undefined는 값
- TS에서는 타입이기도 하고 값이기도 함
- undefined 타입은 undefined 값만 가질 수 있는 최하위 타입

```ts
let u: undefined = undefined;
```

<br>

### template string

- 변수에 담긴 값을 조합해서 문자열을 만드는 방법

```ts
let count = 10,
  message = "Your count";
let result = `${message} is ${count}`;
```

<br>
<br>

## 2. 객체와 인터페이스

**object 타입**

- 클래스와 인터페이스의 상위 타입
- object 타입으로 선언된 변수는 number, boolean, string 타입의 값을 가질 수 없음
- 속성 이름이 다른 객체를 모두 자유롭게 담을 수 있음
- 마치 객체를 대상으로 하는 any 타입과도 같음

```ts
let o: object = { name: "Loko", age: 28 };
```

<br>

### 인터페이스 선언문

- interface 타입 : 객체의 타입을 정의할 수 있게 해줌
- 객체를 의미하는 `{}`를 사용해서 타입들을 나열

```ts
interface IPerson {
  name: string;
  age: number;
}
```

<br>

### optional property

- 인터페이스 설계 시 있어도 되고 없어도 되는 속성 지정 가능
- `?` 기호를 사용해서 표현

```ts
interface IPerson {
  name: string;
  age: number;
  etc?: boolean;
}
```

<br>

### anonymous interface

- interface 키워드 및 이름도 없이 인터페이스를 만들 수 있음

```ts
let ai: {
  name: string;
  age: number;
  etc?: boolean;
} = { name: "Loko", age: 28 };
```
