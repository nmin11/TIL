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
