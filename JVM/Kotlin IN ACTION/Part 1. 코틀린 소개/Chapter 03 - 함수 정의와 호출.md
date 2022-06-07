## 1. 코틀린에서 컬렉션 만들기

```java
val set = hashSetOf(1, 7, 53)
val list = arrayListOf(1, 7, 53)
val map = hashMapOf(1 to "one", 7 to "seven", 53 to "fifty-three")
```

- 이렇게 생성한 컬렉션들은 모두 Java 컬렉션들
- Java 컬렉션과 똑같은 클래스이면서 더 많은 기능 사용 가능

```java
val strings = listOf("first", "second", "third")
println(strings.last())

val numbers = setOf(1, 14, 2)
println(numbers.max())

//third
//14
```

<br>
<br>

## 2. 함수를 호출하기 쉽게 만들기

toString 호출하기

```java
val list = listOf(1, 2, 3)
println(list)

//[1, 2, 3]
```

이제부터 toString을 위와 같은 디폴트 형식이 아닌 `(1; 2; 3)` 형식으로 출력하는 연습을 해볼 것

```java
fun <T> joinToString(
  collection: Collection<T>,
  separator: String,
  prefix: String,
  postfix: String
): String {
  val result = StringBuilder(prefix)
  for ((index, element) in collection.withIndex()) {
    if (index > 0) result.append(separator)
    result.append(element)
  }
  result.append(postfix)
  return result.toString()
}
```

```java
val list = listOf(1, 2, 3)
println(joinToString(list, "; ", "(", ")"))

//(1; 2; 3)
```

- 다음으로 이 함수를 좀 더 코틀린답게 변형할 것

<br>

### 2.1 이름 붙인 인자

```java
joinToString(collection, separator=" ", prefix=" ", postfix=".")
```

- 인자의 이름 명시 가능
  - 하나라도 명시했을 경우 혼동을 막기 위해 나머지 모든 인자도 명시할 것

<br>

### 2.2 디폴트 파라미터 값

```java
fun <T> joinToString(
  collection: Collection<T>,
  separator: String = ", ",
  prefix: String = "",
  postfix: String = ""
): String
```

```java
joinToString(list, ", ", "", "")
//1, 2, 3
joinToString(list)
//1, 2, 3
joinToString(list, "; ")
//1; 2; 3
```

- 이렇게 하면 일부 인자를 생략해서 호출하는 것이 가능해짐
- 지정하고 싶은 인자를 이름을 붙여서 순서와 관계없이 지정할 수도 있음

```java
joinToString(list, postfix=";", prefix="# ")
//# 1, 2, 3;
```

<br>

### 2.3 정적인 유틸리티 클래스 없애기: 최상위 함수와 프로퍼티

- Java에서는 모든 코드를 클래스의 메소드로 작성해야 함
  - 하지만 실전에서는 어느 한 클래스에 포함시키기 어려운 코드가 많이 생김
  - Collections와 같이, 다양한 정적 메소드를 모아두는 역할만 담당하며,<br>특별한 상태나 인스턴스 메소드는 없는 클래스가 생겨나게 됨
- Kotlin은 이런 무의미한 클래스가 없도록 함수를 최상위 수준에 위치시킬 수 있음

```java
package strings

fun joinToString(...): String { ... }
```

- 컴파일러는 이 파일을 컴파일할 때 새로운 클래스를 정의해줌
- 최상위 함수는 모두 새롭게 컴파일된 클래스의 정적 메소드가 됨

<br>

최상위 프로퍼티

```java
package strings

const val UNIX_LINE_SEPARATOR = "\n"
```

- 함수와 마찬가지로 프로퍼티도 파일의 최상위 수준에 놓을 수 있음
- 이런 경우는 흔치 않지만 가끔 유용할 때가 있음
- 최상위 프로퍼티의 값 또한 정적 필드에 저장됨
- 최상위 상수를 저장해둘 수도 있음
  - 이 경우 `public static final`을 사용해야 자연스러우니, `const val`로 초기화하면 됨
  - `const` 키워드는 원시 타입과 String에만 사용 가능

<br>
<br>

## 3. 메소드를 다른 클래스에 추가: 확장 함수와 확장 프로퍼티

- 완전히 코틀린으로만 이뤄진 프로젝트조차 자바 라이브러리를 기반으로 만들어지는데,<br>그러면 기존 자바 API를 처리할 수 있어야 함
- 기존 자바 API를 재작성하지 않도록 코틀린이 지원하는 것이 **extension function**

```java
package strings

fun String.lastChar(): Char = this.get(this.length - 1)
```

- 추가하려는 함수 이름 앞에 그 함수가 확장할 클래스 이름을 붙이기만 하면 됨
  - 앞의 클래스 이름 : receiver type
  - 호출되는 대상이 되는 값(this 부분) : receiver object
- 어떤 면에서 이는 String 클래스에 새로운 메소드를 추가하는 것과 같음
- 일반 메소드와 마찬가지로 `this` 키워드는 생략 가능

```java
package strings

fun String.lastChar(): Char = get(length - 1)
```

- 캡슐화를 깨지 않음
  - private 멤버나 protected 멤버를 사용할 수 없음

<br>

### 3.1 임포트와 확장 함수

- 확장 함수를 정의해도 프로젝트 안의 모든 소스코드에서 그걸 사용할 수 있는 것은 아님
- 사용하기 위해서는 임포트가 필요함

```java
import strings.lastChar

val c = "Kotlin".lastChar()
```

- `*`를 사용한 임포트도 가능
- `as` 키워드를 사용하면 다른 이름으로 부를 수도 있음
  - 한 파일 안에 다른 여러 패키지의 이름이 같은 함수를 불러올 때<br>이름을 바꿔주면 충돌을 피할 수 있음

```java
import strings.lastChar as last

val c = "Kotlin".last()
```

<br>

### 3.2 자바에서 확장 함수 호출

- 내부적으로 확장 함수는 수신 객체를 첫 번째 인자로 받는 정적 메소드
  - 확장 함수 호출 시 다른 adapter 객체나 실행 부가 비용이 들지 않음
- 최상위 함수와 마찬가지로 확장 함수가 있는 파일 이름에 따라 결정됨

```java
char c = StringUtilKt.lastChar("Java");
```

<br>

### 3.3 확장 함수로 유틸리티 함수 정의

joinToString 최종 버전 만들기

```java
fun <T> Collection<T>.joinToString(
  separator: String = ", ",
  prefix: String = "",
  postfix: String = ""
): String {
  val result = StringBuilder(prefix)
  for ((index, element) in this.withIndex()) {
    if (index > 0) result.append(separator)
    result.append(element)
  }
  result.append(postfix)
  return result.toString()
}
```

```java
val list = arrayListOf(1, 2, 3)
println(list.joinToString(" "))
//1 2 3
```

String에 대해서만 호출할 수 있는 join 함수

```java
fun Collection<String>.join(
  separator: String = ", ",
  prefix: String = "",
  postfix: String = ""
) = joinToString(separator, prefix, postfix)
```

```java
println(listOf("one", "two", "three").join(" "))
//one two three
```

<br>

### 3.4 확장 함수는 오버라이드할 수 없다

- 확장 함수는 클래스의 일부가 아닌, 클래스 밖에 선언된 것
- 정적 타입에 의존하기 때문에 호출할 수 없음

```java
View view = new Button();
ExtensionsKt.showOff(view);
```

<br>

### 3.5 확장 프로퍼티

- 기존 클래스 객체에 대해 프로퍼티 형식으로 사용할 API를 추가할 수 있음
- 상태를 저장할 방법이 없기에 아무 상태도 가질 수 없음
- 더 짧게 코드를 작성할 수 있기에 편리함

```java
val String.lastChar: Char
  get() = get(length - 1)
  set(value: Char) {
    this.setCharAt(length - 1, value)
  }
```

```java
println("Kotlin".lastChar)
val sb = StringBuilder("Kotlin?")
sb.lastChar = '!'
println(sb)

//n
//Kotlin!
```

- 일반적인 프로퍼티와 같지만 수신 객체 클래스가 추가되었을 뿐
- 기본 getter 구현이 제공되지 않으므로 꼭 정의해야 함
  - 초기화 코드도 사용 불가
