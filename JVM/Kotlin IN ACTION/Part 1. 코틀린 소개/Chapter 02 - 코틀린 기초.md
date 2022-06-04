## 1. 기본 요소: 함수와 변수

### 1.1 Hello, World!

```java
fun main(args: Array<String>) {
  println("Hello, World!")
}
```

이렇게 간단한 코드에서도 알 수 있는 코틀린 문법이나 특성들

- 함수를 선언할 때 `fun` 키워드 사용
  - 실제로도 코틀린 프로그래밍은 수많은 fun을 만드는 fun한 일!
- 파라미터 이름 뒤에 타입을 씀
  - 변수를 선언할 때도 같은 방식으로 타입을 지정
- 함수를 최상위 수준에 정의할 수 있음
  - Java처럼 꼭 클래스 안에 함수를 넣을 필요가 없음
- 배열도 일반적인 클래스
  - Java처럼 배열 처리를 위한 문법이 따로 있지 않음
- `System.out.println` 대신 `println` 사용
  - 이는 코틀린 표준 라이브러리가 자바 표준 라이브러리 함수를<br>간결하게 사용할 수 있도록 제공하는 wrapper
- 최신 프로그래밍 언어의 트렌드에 따라, `;`을 붙이지 않도록 함

<br>

### 1.2 함수

```java
fun max(a: Int, b: Int): Int {
  return if (a > b) a else b
}
```

※ 코틀린 if는 값을 만들어내지 못하는 문(statement)이 아니고, 결과를 만드는 식(expression)이다!

- 식: 값을 만들어 내며 다른 식의 하위 요소로 계산에 참여 가능
- 문: 자신을 둘러싸고 있는 가장 안쪽 블록의 최상위 요소로 존재하며 값을 만들지 못함
- 자바에서는 모든 제어 구조가 **문**인 반면 코틀린에서는 루프를 제외한 대부분의 제어 구조가 **식**
- 제어 구조를 식으로 다루면서, 여러 일반적인 패턴을 아주 간결하게 표현 가능
- 반면 대입문은 자바에서 **식**이지만 코틀린에서는 **문**

<br>

**식이 본문인 함수**

```java
fun max(a: Int, b: Int): Int = if (a > b) a else b
```

- `return`을 제거하고 `=`를 사용해서 간결하게 표현 가능
- 본문이 중괄호로 둘러싸인 함수를 **블록이 본문인 함수**라 부르고,<br>등호와 식으로 이뤄진 함수를 **식이 본문인 함수**라고 부름
- IntelliJ IDEA는 `Convert to expression body`와 `Convert to block body` 기능을 제공함
- 코틀린에서는 식이 본문인 함수가 자주 쓰임
- 식이 본문인 함수에 한해서만 **타입 추론**을 통해 반환 타입을 생략하는 것이 가능해짐

```java
fun max(a: Int, b: Int) = if (a > b) a else b
```

<br>

### 1.3 변수

```java
val question = "삶, 우주, 그리고 모든 것에 대한 궁극적인 질문"
val answer = 42
```

- 타입을 지정하지 않아도 컴파일러가 초기화 식을 분석해서 타입을 지정함
- 초기화 식 없이 변수를 선언할 때는 타입을 반드시 명시해야 함

```java
val answer: Int
answer = 42
```

<br>

**변경 가능한 변수와 변경 불가능한 변수**

- val
  - value에서 따옴
  - immutable 참조
  - 초기화 이후 재대입이 불가능
  - Java로 말하자면 `final` 변수
- var
  - variable에서 따옴
  - mutable 참조
  - 변수의 값은 바뀔 수 있음
  - Java의 일반 변수에 해당
- 기본적으로는 val을 사용하고, 나중에 꼭 필요할 때에만 var로 사용하길 권장
  - side effect를 줄이고, 함수형 코드에 가까워지기 위해서
- val 변수 초기화 시, 오직 한 초기화 문장만 실행됨을<br>컴파일러가 확인할 수 있다면 조건에 따라 다르게 초기화하는 것도 가능

```java
val message: String
if (canPerformOperation()) {
  message = "Success"
} else {
  message = "Failed"
}
```

- val 참조 자체는 불변이지만 그 참조가 가리키는 객체 내부 값은 변경될 수 있음

```java
val languages = arrayListOf("Java")
languages.add("Kotlin")
```

- var 키워드를 사용하더라도 객체의 타입까지 바꿔가면서 사용할 순 없음

```java
var answer = 42
answer = "no answer"    //Error: type mismatch
```

<br>

### 1.4 문자열 템플릿

```java
fun main(args: Array<String>) {
  val name = if (args.size > 0) args[0] else "Kotlin"
  println("Hello, $name!")
}
```

- `$`를 사용해서 변수를 문자열 안에서 사용 가능
- Java의 문자열 접합 연산(StringBuilder)을 사용해서 효율적
- 컴파일러는 static하게 검사하기 때문에 존재하지 않는 변수라면<br>문자열 템플릿 안에서 컴파일 에러 발생
- 만약 `$` 문자를 사용하고 싶다면 `println("\$")`처럼 사용하면 됨
- 변수 이름 뿐만 아니라 복잡한 식도 `{}`로 둘러싸서 넣을 수 있음

```java
fun main(args: Array<String>) {
  if (args.size > 0) {
    println("Hello, ${args[0]}!")
  }
}
```

- 중괄호로 둘러싼 식 안에서 큰 따옴표 사용 가능

```java
fun main(args: Array<String>) {
  println("Hello, ${if (args.size > 0) args[0] else "someone"}!")
}
```

※ 한글과 함께 사용할 때 에러가 발생할 수 있으니 `${name}님!` 처럼 감싸주면 좋음<br>사실 `{}`를 습관적으로 써주는 것이 코드를 읽으며 식별하기에 더욱 간편함

<br>
<br>

## 2. 클래스와 프로퍼티

※ 클래스 선언 Java to Kotlin

```java
public class Person {
  private final String name;

  public Person(String name) {
    this.name = name;
  }

  public String getName() {
    return name;
  }
}
```

↓

```java
class Person(val name: String)
```

- 이렇게 코드 없이 데이터만 저장하는 클래스를 **value object**라고 부름
- `public` 키워드는 코틀린의 기본 가시성이므로 생략 가능

<br>

### 2.1 프로퍼티

클래스의 개념

- 데이터를 캡슐화해서 한 주체 아래 가두는 것

<br>

Java에서의 클래스

- 데이터를 필드에 저장, 멤버 필드의 가시성은 보통 `private`
- 클라이언트가 데이터에 접근할 수 있도록 **accessor method** 제공
  - 보통은 필드를 읽기 위한 getter를 제공하고, 변경을 허용할 경우 setter도 제공
- 필드와 접근자를 묶어서 **property**라고 부름

<br>

Kotlin property

- 언어 기본 기능으로 제공
- Java의 필드와 접근자 메소드를 완전히 대신함
- 프로퍼티 선언은 변수 선언과 마찬가지로 `val` 혹은 `var` 사용
  - `val`은 getter 제공, `var`는 getter 및 setter 제공
- Java의 `person.getName()` 방식 대신 `person.name` 방식으로 호출 가능
  - getter 호출 대신 프로퍼티 직접 사용
  - setter의 경우에도 `person.name = Loko`라고 써주면 됨

<br>

### 2.2 커스텀 접근자

```java
class Rectangle(val: height: Int, val width: Int) {
  val isSquare: Boolean
    get() {
      return height == width
    }
}
```

- 사각형이 정사각형인지 여부를 별도의 필드에 저장하는 대신 그때그때 조회할 수 있게 하는 코드
- 블록 대신 `get() = height == width`라고 해도 됨
- 구현이나 성능상 차이는 없고, 가독성을 고려해야 함

<br>

### 2.3 코틀린 소스코드 구조: 디렉토리와 패키지

- 디스크상 어느 디렉토리에 소스코드 파일을 위치시키든 상관 없고,<br>kt 파일을 패키지처럼 다룰 수도 있음
- 하지만 대부분의 경우 Java와 같이 패키지별로 디렉토리를 구성하는 것이 좋음
  - 그렇지 않으면 마이그레이션할 때 문제가 발생할 수 있음

<br>
<br>

## 3. 선택 표현과 처리: enum과 when

### 3.1 enum 클래스 정의

```java
enum class Color(
  val r: Int, val g: Int, val b: Int
) {
  RED(255, 0, 0), ORANGE(255, 165, 0),
  YELLOW(255, 255, 0), GREEN(0, 255, 0), BLUE(0, 0, 255),
  INDIGO(75, 0, 130), VIOLET(238, 130, 238);
  fun rgb() = (r * 256 + g) * 256 + b
}
```

- 자바에선 `enum`으로 선언하지만 코틀린에선 `enum class`라고 선언해야 함
  - 코틀린에서 enum이 **soft keyword**이기 때문
- `()`에서 상수의 프로퍼티를 정의하고 `{}`에서 프로퍼티 값 지정
- enum 클래스 안에 메소드를 정의할 경우 반드시 상수 목록과 메소드 사이에 `;`이 있어야 함

<br>

### 3.2 when으로 enum 클래스 다루기

```java
fun getMnemonic(color: Color) =
  when (color) {
    Color.RED -> "Richard"
    Color.ORANGE -> "Of"
    Color.YELLOW -> "York"
    Color.GREEN -> "Gave"
    Color.BLUE -> "Battle"
    Color.INDIGO -> "In"
    Color.VIOLET -> "Vain"
  }
```

- 자바의 `switch`에 해당하는 코틀린의 `when`
- 코틀린의 `if`와 마찬가지로 값을 만들어내는 식
- 자바와 달리 각 분기 끝에 `break`를 넣지 않아도 됨
- 한 분기 안에 여러 값을 매치 패턴으로 사용할 수도 있음

```java
fun getWarmth(color: Color) = when(color) {
  Color.RED, Color.ORANGE, Color.YELLOW -> "warm"
  Color.GREEN -> "neutral"
  Color.BLUE, Color.INDIGI, Color.VIOLET -> "cold"
}
```

- 반복되는 `Color`들을 줄이기 위해 상수값들을 import할 수도 있음

<br>

### 3.3 when과 임의의 객체를 함께 사용

```java
fun mix(c1: Color, c2: Color) =
  when (setOf(c1, c2)) {
    setOf(RED, YELLOW) -> ORANGE
    setOf(YELLOW, BLUE) -> GREEN
    setOf(BLUE, VIOLET) -> INDIGO
    else -> throw Exception("Dirty color")
  }
```

- 자바의 `switch`는 enum 상수나 숫자 리터럴만 사용할 수 있지만,<br>코틀린의 `when`은 임의의 객체를 허용함
- `setOf`는 인자로 받은 객체들을 Set 객체로 만드는 함수 (코틀린 표준 라이브러리)
  - 동등성 비교 시 순서를 따지지 않고 비교할 수 있음

<br>

### 3.4 인자 없는 when 사용

- 사실 위의 `setOf`를 사용하는 로직은 Set 인스턴스를 지나치게 많이 생성하므로 비효율적
- 불필요한 객체 생성을 막기 위해 인자 없는 when 식을 사용하는 것이 좋음
- 그러려면 각 분기의 조건이 boolean 결과를 계산하는 식이어야 함
- 추가 객체를 만들지 않는다는 장점이 있지만 가독성은 더 떨어짐

```java
fun mixOptimized(c1: Color, c2: Color) =
  when {
    (c1 == RED && c2 == YELLOW) ||
    (c1 == YELLOW && c2 == RED) -> ORANGE
    (c1 == YELLOW && c2 == BLUE) ||
    (c1 == BLUE && c2 == YELLOW) -> GREEN
    (c1 == BLUE && c2 == VIOLET) ||
    (c1 == VIOLET && c2 == BLUE) -> INDIGO
    else -> throw Exception("Dirty color")
  }
```

<br>

### 3.5 스마트 캐스트: 타입 검사와 타입 캐스트를 조합

- 여기서는 식을 트리 구조로 저장하는 간단한 덧셈 연산을 하는 함수를 만들어볼 것
- 노드는 Sum이나 Num 중 하나
  - Num은 항상 leaf 노드, Sum은 자식들이 있는 중간 노드
- 예를 들어, (1+2)+4를 계산한다면 Sum(Sum(Num(1), Num(2)), Num(4))라는 구조의 객체가 생김

※ 식을 표현할 클래스 계층

```java
interface Expr
class Num(val value: Int): Expr
class Sum(val left: Expr, val right: Expr): Expr
```

`interface Expr`의 2가지 계산 방법

- 식이 Num이라면 그 값을 반환
- 식이 Sum이라면 좌항과 우항의 값을 더해서 반환

```java
fun eval(e: Expr): Int {
  if (e is Num) {
    val n = e as Num
    return n.value
  }
  if (e is Sum) {
    return eval(e.right) + eval(e.left)
  }
  throw IllegalArgumentException("Unknown expression")
}
```

- 코틀린에서는 `is`를 사용해서 변수 타입을 검사
  - 자바의 `instanceof`와 비슷하지만 자바에서는 확인 후 그 타입에 속한 멤버에 접근하기 위해<br>명시적으로 변수 타입을 캐스팅해야 하는 반면, 코틀린에서는 컴파일러가 캐스팅해줌
  - `is` 검사 후에는 변수가 원하는 타입으로 선언된 것처럼 사용 가능하며,<br>이를 **smart cast**라고 부름
  - `is`의 스마트 캐스트는 검사 후 그 값이 바뀔 수 있는 경우에만 작동
    - 이번 예제의 경우 프로퍼티는 반드시 val이어야 하며, 커스텀 접근자 사용도 안됨
    - 커스텀 접근자는 해당 프로퍼티에 대한 접근이 항상 같은 값을 내놓는다고 확신을 못함
  - 원하는 타입으로 명시적으로 타입 캐스팅하려면 `as` 키워드를 사용해야 함

<br>

### 3.6 리팩토링: if를 when으로 변경

- 자바의 `a > b ? a: b`는 코틀린에서 `if (a < b) a else b`
- 따라서 코틀린에서는 3항 연산자가 따로 없음
- 이 특성을 활용해서 앞의 `eval` 함수에서 `return`문과 `{}`를 없앨 수 있음

```java
fun eval(e: Expr): Int =
  if (e is Num) {
    e.value
  } else if (e is Sum) {
    eval(e.right) + eval(e.left)
  } else {
    throw IllegalArgumentException("Unknown expression")
  }
```

이 코드를 `when`을 사용해서 더 다듬는다면···

```java
fun eval(e: Expr): Int =
  when (e) {
    is Num ->
      e.value
    is Sum ->
      eval(e.right) + eval(e.left)
    else ->
      throw IllegalArgumentException("Unknown expression")
  }
```

<br>

### 3.7 if와 when 분기에서 블록 사용

```java
fun evalWithLogging(e: Expr): Int =
  while (e) {
    is Num -> {
      println("num: ${e.value}")
      e.value
    }
    is Sum -> {
      val left = evalWithLogging(e.left)
      val right = evalWithLogging(e.right)
      println("sum: $left + $right")
      left + right
    }
    else -> throw IllegalArgumentException("Unknown expression")
  }
```

- **식이 본문인 함수에서 블록을 사용하면 마지막 식이 블록의 결과**
  - 즉, 위 예제에서 Num인 경우에는 `e.value`가, Sum인 경우에는 `left + right`가 반환됨
  - 블록이 본문인 함수라면 반드시 `return`이 있어야 함
