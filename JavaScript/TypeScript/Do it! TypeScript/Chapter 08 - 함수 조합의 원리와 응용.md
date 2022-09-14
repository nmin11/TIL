## 1. 함수형 프로그래밍이란?

- 순수 함수와 선언형 프로그래밍의 토대 위에<br>function composition과 monadic composition으로 코드를 설계하고 구현하는 기법

<br>

### 함수형 프로그래밍의 기반이 되는 3가지 수학 이론

1. ramda calculus: 조합 논리와 카테고리 이론의 토대가 되는 논리 수학
2. combinatory logic: 함수 조합의 이론적 배경
3. category theory: 모나드 조합과 고차 타입의 이론적 배경

<br>

### 함수형 프로그래밍의 구성 요소들

- static type
- automatic memory management
- evaluation
- type inference
- first-class function
- monad
- high order type

=> 다만 함수형 프로그래밍 언어라고 해서 위의 모든 기능을 제공하는 것은 아님

<br>

### 함수형 프로그래밍 역사

- 1958년에 만들어진, 인공지능 언어라고도 불리는 LISP에 기반을 둠
- LISP는 meta language(ML)로 진화되었고, 메타 언어는 다시 Haskell 언어로 발전했음
- 하스켈 언어는 개발자들에게 친숙한 C 언어와 비슷한 구문을 갖추며 Scala로 발전했음
- TypeScript는 Scala 언어의 구문을 좀 더 JavaScript 친화적으로 발전시켰음
- 이러한 관점으로 볼 때 TS는 사실상 세상에서 제일 쉬운 함수형 프로그래밍 언어
- TS는 함수형 언어에서 중요하게 여겨지는 패턴 매칭과 고차 타입이라는 기능을 생략해서 구문을 쉽게 만듦
  - 다른 고급 함수형 언어들의 구문이 어렵게 느껴지는 이유는 패턴 매칭과 고차 타입 관련 구문 때문!
  - 이런 이유로 Kotlin이나 Swift도 패턴 매칭 구문만 있고 고차 타입 구문은 존재하지 않음

<br>
<br>

## 2. 제네릭 함수

### TypeScript의 제네릭 함수 구문

```ts
function g1<T>(a: T): void {}
function g2<T, Q>(a: T, b: Q): void {}
```

- TS에서 제네릭 타입은 함수와 인터페이스, 클래스, 타입 별칭에 적용 가능
- `<T>` `<T, Q>`와 같은 형식으로 표현

```ts
type TypeFunc<T, Q, R> = (T, Q) => R;
```

- 타입 별칭에 제네릭 타입을 적용할 수 있음

<br>

### 함수의 역할

- 수학에서 함수는 `x`에 수식 `f`를 적용해서 또 다른 값 `y`를 만드는 것

```ts
(x) => (f) => y;
```

- 프로그래밍 언어로 수학의 함수를 구현할 때는 변수들의 타입을 고려해야 함

```ts
(x: T) => f => (y: R)
```

- 수학에서는 이러한 관계를 일대일 관계라 하며, 이러한 함수를 mapping 혹은 map 이라고 표현

```ts
type MapFunc<T, R> = (T) => R;
```

<br>

### Identity 함수

- 맵 함수의 가장 단순한 형태는 입력값 `x`를 가공 없이 그대로 반환하는 것
  - 입력과 출력이 같음
- 함수형 프로그래밍에서는 이러한 함수를 `identity` 혹은 `I`로 표기

```ts
type MapFunc(T, R) = (T) => R
type IdentityFunc<T> = MapFunc<T, T>

const numberIdentity: IdentityFunc<number> = (x: number): number => x
const stringIdentity: IdentityFunc<string> = (x: string): string => x
const objectIdentity: IdentityFunc<object> = (x: object): object => x
const arrayIdentity: IdentityFunc<any[]> = (x: any[]): any[] => x
```

<br>
<br>

## 3. 고차 함수와 커리

- 함수에서 매개변수의 개수를 arity 라고 함
- `f()`는 arity 0개, `f(x)`는 arity 1개
- 만약 함수 f, g, h 모두 arity가 1이라면 연결해서 사용 가능

```ts
x -> f -> g -> h -> y
```

- 이를 프로그래밍 언어로 표현하면 다음과 같음

```ts
y = h(g(f(x)));
```

- 함수형 프로그래밍 언어에서는 `compose`나 `pipe`라는 이름의 함수를 사용해서 새로운 함수를 만들 수 있음
- 이를 이해하기 위해 먼저 고차 함수가 무엇인지 알아야 함
