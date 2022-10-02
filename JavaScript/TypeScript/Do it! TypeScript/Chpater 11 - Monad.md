## 1. Monad 이해하기

- 수학의 category theory 분야에서 사용되는 용어
- 프로그래밍에서는 일종의 design pattern으로서 몇 개의 인터페이스를 구현한 클래스

<br>

### type class

- 모나드를 이해하는 첫걸음은 type class가 왜 필요한지 아는 것

```ts
class Monad<T> {
  constructor(public value: T) {}
  static of<U>(value: U): Monad<U> {
    return new Monad<U>(value);
  }
  map<U>(fn: (x: T) => U): Monad<U> {
    return new Monad<U>(fn(this.value));
  }
}
```

- `Monad<T>`와 같은 클래스를 **type class**라고 부름
- type class는 함수를 만들 때 특별한 타입으로 제약하지 않아도 되게 해줌

```ts
const callMonad = (fn) => (b) => Monad.of(b).map(fn).value; // map 함수를 적용할 수 있다는 것이 이미 보장되어 있음
```

- 타입 안정성을 보장하면서도 코드 재사용성이 뛰어난 범용 함수로 작용

```ts
callMonad((a: number) => a + 1)(1); // 2
callMonad((a: number[]) => a.map((value) => value + 1))([1, 2, 3, 4]); // [2, 3, 4, 5]
```

<br>

### higher-kinded type

- `Monad<T>`는 타입 `T`를 `Monad<T>` 타입으로 변경했다가 때가 되면 다시 타입 `T`로 변환
- 이와 같이 타입 `T`를 한 단계 더 높은 타입으로 변환하는 용도의 타입을 **higher-kinded type**이라고 부름
- 고차 타입은 카테고리 이론에서 아이디어를 얻었음
- 참고로 TS는 `Monad<T>`와 같은 2차 고차 타입은 만들 수 있지만 3차 고차 타입은 만들 수 없음

<br>

### category theory

- 1940년대에 시작된 수학의 한 분야로, 함수형 프로그래밍 언어의 중요한 이론적 배경이 되었음

(이미지 첨부 - 카테고리 이론 대표 이미지)

- X, Y, Z: category
- f, g: morphism
- g˚f: composition

<br>

- 수학에서 집합(set)은 프로그래밍에서 타입
- 수학에서 category는 '집합의 집합'으로 이해할 수 있음
- 따라서 프로그래밍에서의 category는 고차 타입으로 이해할 수 있음

<br>

### fantasy-land 규격

- Monad는 category theory에서 사용되는 용어이면서, 하스켈의 Prelude라는 표준 라이브러리에서 사용되기도 하는 용어
- Monad는 **Monad raw** 라고 하는 코드 설계 원칙에 맞춰 구현된 클래스를 의미

※ fantasy-land 규격 이미지

(이미지 첨부 - fantasy-land)

- fantasy-land 규격은 하스켈 표준 라이브러리 구조를 JS 방식으로 재구성한 것
- Monad는 4가지 요소를 구현한 것으로, 이 4가지를 만족한다면 해당 클래스는 Monad
  - Functor: `map`이라는 인스턴스 메소드를 가지는 클래스
  - Apply: Functor이면서 `ap`이라는 인스턴스 메소드를 가지는 클래스
  - Applicative: Apply이면서 `of`라는 클래스 메소드를 가지는 클래스
  - Chain: Apply이면서 `chain`이라는 메소드를 가지는 클래스

<br>

### Monad raw

- Monad 클래스의 이름이 `M`이고 클래스의 인스턴스가 `m`이라고 할 때, 다음 2가지 조건을 만족해야 함

<br>

1. left identity: `M.of(a).chain(f) == f(a)`
2. right identity: `m.chain(M.of) == m`

<br>

- 하스켈 `Prelude` 표준 라이브러리는 `Maybe`와 같은 미리 구현된 Monad 제공
- TS는 표준 라이브러리가 없으므로 fantasy-land 규격에 맞춰 필요한 Monad를 직접 작성해야 함
