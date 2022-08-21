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
