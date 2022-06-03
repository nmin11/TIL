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
  - 마이그레이션할 때 문제가 발생할 수 있음
