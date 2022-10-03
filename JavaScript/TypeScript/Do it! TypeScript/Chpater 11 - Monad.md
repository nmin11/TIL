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

![category theory](https://user-images.githubusercontent.com/75058239/193435539-1217ed05-5ed7-4bc7-b320-a593b04e6ef7.png)

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

![fantasy-land](https://user-images.githubusercontent.com/75058239/193435548-502fbf09-b89d-4ffb-bc67-3beb059e4abb.png)

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

<br>
<br>

## 2. Identity 모나드 이해와 구현

※ [entire source code](https://github.com/nmin11/TIL/tree/main/JavaScript/TypeScript/Do%20it!%20TypeScript/monad/identity-monad)

<br>

### IValuable\<T> 인터페이스

- [source code](https://github.com/nmin11/TIL/blob/main/JavaScript/TypeScript/Do%20it!%20TypeScript/monad/identity-monad/interfaces/IValuable.ts)
- 어떤 타입 `T`가 있을 때 `T[]`는 같은 타입의 아이템을 여러 개 가진 컨테이너
  - 보통 컨테이너란 용어는 이처럼 흔히 배열을 뜻함
- 모든 타입 `T`의 값을 가질 수 있는 제네릭 컨테이너 클래스를 구상해볼 수 있음
  - 이를 **value container**라고 부름

<br>

### 왜 Identity인가?

- 함수형 프로그래밍에서 **Identity**는 항상 다음을 구현함

```ts
const identity = <T>(value: T): T => value;
```

- Identity는 `map` `ap` `of` `chain` 같은 기본 메소드만 구현한 Monad
- 카테고리 이론에서 자신의 타입에서 다른 타입으로 갔다가 돌아올 때 값이 변경되지 않는 카테고리를 Identity라고 함

<br>

### ISetoid\<T> 인터페이스

- [source code](https://github.com/nmin11/TIL/blob/main/JavaScript/TypeScript/Do%20it!%20TypeScript/monad/identity-monad/interfaces/ISetoid.ts)
- fantasy-land 규격에서 **setoid**는 `equals`라는 이름의 메소드를 제공하는 인터페이스를 의미

<br>

### IFunctor\<T> 인터페이스

- [source code](https://github.com/nmin11/TIL/blob/main/JavaScript/TypeScript/Do%20it!%20TypeScript/monad/identity-monad/interfaces/IFunctor.ts)
- fantasy-land 규격에서 **functor**는 `map` 메소드를 제공하는 인터페이스
- 카테고리 이론에서 functor는 **endofunctor**라는 특별한 성질을 만족해야 함

<br>

### what is endofunctor?

- endofunctor: 특정 카테고리에서 출발해도 도착 카테고리는 다시 출발 카테고리가 되게하는 functor
  - **endo**는 일종의 접두사
- 타입 `T`가 `U`로 바뀔 수 있지만, 카테고리는 여전히 Identity에 머물게 함

<br>

### IApply\<T> 인터페이스

- [source code](https://github.com/nmin11/TIL/blob/main/JavaScript/TypeScript/Do%20it!%20TypeScript/monad/identity-monad/interfaces/IApply.ts)
- fantasy-land 규격에서 **apply**는 자신이 functor이면서 동시에 `ap` 메소드를 제공하는 인터페이스
- `IApply`를 구현하는 컨테이너는 값 컨테이너로서뿐만 아니라 고차 함수 컨테이너로서도 동작

<br>

### IApplicative\<T> 인터페이스

- [source code](https://github.com/nmin11/TIL/blob/main/JavaScript/TypeScript/Do%20it!%20TypeScript/monad/identity-monad/interfaces/IApplicative.ts)
- fantasy-land 규격에서 **applicativ**는 자신이 apply이면서 동시에 `of` 클래스 메소드를 제공하는 인터페이스

<br>

### IChain\<T> 인터페이스

- [source code](https://github.com/nmin11/TIL/blob/main/JavaScript/TypeScript/Do%20it!%20TypeScript/monad/identity-monad/interfaces/IChain.ts)
- fantasy-land 규격에서 **chain**은 자신이 apply이면서 동시에 `chain` 메소드를 제공하는 인터페이스
- `chain` 메소드는 functor의 `map`과 달리 endofunctor로 구현할 의무가 없음
  - `map`과 달리 `chain`은 자신이 머무르고 싶은 카테고리를 스스로 정해야 함

<br>

### IMonad\<T> 인터페이스

- [source code](https://github.com/nmin11/TIL/blob/main/JavaScript/TypeScript/Do%20it!%20TypeScript/monad/identity-monad/interfaces/IMonad.ts)
- fantasy-land 규격에서 **monad**는 chain과 applicative를 구현한 것
- 이처럼 선언형 프로그래밍을 염두에 두고 설계되었음
