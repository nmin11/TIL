## 1. 제네릭 타입

- 인터페이스, 클래스, 함수, 타입 별칭 등에 사용할 수 있는 기능
- 해당 심볼의 타입을 미리 지정하지 않고 다양한 타입에 대응하려고 할 때 사용

```ts
// generic interface
interface IValuable<T> {
  value: T;
}

// generic function
function identity<T>(arg: T): T {
  return arg;
}

// generic type alias
type IValuable<T> = {
  value: T;
};

// generic class
class Valuable<T> {
  constructor(public value: T) {}
}
```

<br>
<br>

## 2. generic type constraint

- 타입 변수에 적용할 수 있는 타입의 범위를 한정하는 기능

```ts
import { IValuable } from "./IValuable";

export const printValueT = <Q, T extends IValuable<Q>>(o: T) =>
  console.log(o.value);
export { IValuable };
```

<br>

### new 타입 제약

**factory function** : `new` 연산자를 사용해서 객체를 생성하는 기능을 하는 함수

- 보통 객체를 생성하는 방법이 지나치게 복잡할 때 이를 단순화하기 위해 사용

```ts
const create = <T>(type: { new (...args): T }, ...args): T => new type(...args);
```

<br>

### index 타입 제약

- 객체의 일정 속성들만 추려서 좀 더 단순한 객체를 만들 수 있음

```ts
const obj = { name: "Jane", age: 22, city: "Seoul", country: "Korea" };
pick(obj, ["name", "age"]);
```

- 만약 `['nam', 'agge']` 처럼 오타가 발생하면 에러 발생
- TS는 이를 방지할 목적으로 `keyof T` 형태로 index type constraint를 설정할 수 있게 해줌

```ts
<T, K extends keyof T>
```

```ts
export const pick = <T, K extends keyof T>(obj: T, keys: K[]) =>
  keys
    .map((key) => ({ [key]: obj[key] }))
    .reduce((result, value) => ({ ...result, ...value }), {});
```
