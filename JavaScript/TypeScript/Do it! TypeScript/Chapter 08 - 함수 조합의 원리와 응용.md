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
