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

<br>
<br>

## 3. 대수 데이터 타입

- 객체지향 프로그래밍 언어에서 ADT는 abstract data type
- 함수형 프로그래밍 언어에서 ADT는 algebraic data type
- TS에서 대수 데이터 타입은 union type과 intersection type 2가지가 있음
- 객체지향 언어들은 상속에 기반을 두지만 함수형 언어들은 대수 데이터 타입을 선호함

### union type

- `|` 기호를 연결해서 만든 타입

```ts
type NumberOrString = number | string;
let ns: NumberOrString = 1;
ns = "hello";
```

<br>

### intersection type

- `&` 기호를 연결해서 만든 타입
- 대표적인 예는 2개의 객체를 통합해서 새로운 객체를 만들 때

```ts
export const mergeObject = <T, U>(a: T, b: U): T & U => ({ ...a, ...b });
```

<br>

### discriminated union

- 식별 합집합 구문을 사용하려면 인터페이스들이 모두 같은 속성을 가지고 있어야 함

```ts
export interface ISquare {
  tag: "square";
  size: number;
}
export interface IRectangle {
  tag: "rectangle";
  width: number;
  height: number;
}
export interface ICircle {
  tag: "circle";
  radius: number;
}

export type IShape = ISquare | IRectangle | ICircle;
```

- 이제 `tag` 속성을 활용해서 각각의 타입을 '식별'할 수 있음

```ts
import { IShape } from "./IShape";

export const calcArea = (shape: IShape): number => {
  switch (shape.tag) {
    case "square":
      return shape.size * shape.size;
    case "rectangle":
      return shape.width * shape.height;
    case "circle":
      return Math.PI * shape.radius * shape.radius;
  }
  return 0;
};
```

<br>
<br>

## 4. type guard

### instanceof 연산자

```ts
export class Bird {
  fly() {
    console.log(`I'm flying.`);
  }
}
export class Fish {
  swim() {
    console.log(`I'm swimming.`);
  }
}
```

```ts
import { Bird, Fish } from "./BirdAndFish";

export const flyOrSwim = (o: Bird | Fish): void => {
  if (o instanceof Bird) {
    (o as Bird).fly();
  } else if (o instanceof Fish) {
    (<Fish>o).swim();
  }
};
```

<br>

### type guard

- TS에서 `instanceof` 연산자는 type guard 기능을 가짐
- 타입 가드를 통해 변환하지 않는 코드로 인한 프로그램 비정상 종료를 막아줌

```ts
import { Bird, Fish } from "./BirdAndFish";

export const flyOrSwim = (o: Bird | Fish): void => {
  if (o instanceof Bird) {
    o.fly();
  } else if (o instanceof Fish) {
    o.swim();
  }
};
```

```ts
import { Bird, Fish } from "./BirdAndFish";
import { flyOrSwim } from "./flyOrSwim";

[new Bird(), new Fish()].forEach(flyOrSwim); // I'm flying. I'm swimming
```

<br>

## 5. F-바운드 다형성

### this 타입과 F-바운드 다형성

- TS에서 `this` 키워드는 타입으로도 사용됨
- 이로 인해 객체지향 언어의 다형성(polymorphism) 효과가 나타남
- `this` 타입으로 인한 다형성을 일반적인 다형성과 구분하기 위해 **F-bound polymorphism**이라고 부름

**F-바운드 타입**

- 자신을 구현하거나 상속하는 subtype을 포함하는 타입

```ts
export interface IAddable<T> {
  add(value: T): this;
}
```

```ts
import { IValueProvider, IAddable } from "../interfaces";

class Calculator implements IValueProvider<number>, IAddable<number> {
  constructor(private _value: number = 0) {}
  value(): number {
    return this._value;
  }
  add(value: number): this {
    this._value = this._value + value;
    return this;
  }
}
```

```ts
import { Calculator } from "../classes/Calculator";

const value = new Calculator(1).add(2).add(3).value(); // 6
```

- `IValueProvider` `IAddable` 같은 함수는 자신을 구현한 클래스에 따라 다르게 동작할 수 있게 됨

<br>

## 6. nullable 타입과 프로그램 안정성

### what is nullable type?

- JS와 TS의 변수는 초기화되지 않으면 `undefined`를 기본값으로 가짐
- `null`은 `undefined`와 사실상 같은 의미로, 심지어 같은 타입인 마냥 서로 호환됨

```ts
let u: undefined = undefined;
let n: null = null;
u = null;
n = undefined;
```

- `undefined`와 `null` 타입을 통틀어서 **nullable 타입**이라고 함

```ts
export type nullable = undefined | null;
export const nullable: nullable = undefined;
```

- nullable 타입들은 프로그램을 비정상 종료시키는 주요 원인이 되기도 하여, 프로그램의 안정성을 해침
- 함수형 언어들은 이를 방지하기 위한 연산자나 클래스를 제공해줌

<br>

### option chaining operator

- `?.` 연산자를 활용하는 기능

```ts
let longitude = person?.location?.coords?.longitude;
```

- 이를 **safe navigation operator**라고 부르기도 함

<br>

### nullish coalescing operator

- `??` 연산자를 활용하는 기능

```ts
let longitude = person?.location?.coords?.longitude ?? 0;
```

- 체이닝 연산자 부분이 `undefined`이면 0을 반환
