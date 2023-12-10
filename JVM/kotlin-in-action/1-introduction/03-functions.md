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

third
14
```

<br>
<br>

## 2. 함수를 호출하기 쉽게 만들기

toString 호출하기

```java
val list = listOf(1, 2, 3)
println(list)

[1, 2, 3]
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

(1; 2; 3)
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
1, 2, 3
joinToString(list)
1, 2, 3
joinToString(list, "; ")
1; 2; 3
```

- 이렇게 하면 일부 인자를 생략해서 호출하는 것이 가능해짐
- 지정하고 싶은 인자를 이름을 붙여서 순서와 관계없이 지정할 수도 있음

```java
joinToString(list, postfix=";", prefix="# ")

# 1, 2, 3;
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

1 2 3
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

one two three
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

n
Kotlin!
```

- 일반적인 프로퍼티와 같지만 수신 객체 클래스가 추가되었을 뿐
- 기본 getter 구현이 제공되지 않으므로 꼭 정의해야 함
  - 초기화 코드도 사용 불가

<br>
<br>

## 4. 컬렉션 처리

- `vararg` : 호출 시 인자 개수가 달라질 수 있는 함수 정의
- infix 함수 호출 구문 : 인자가 하나뿐인 메소드를 간편하게 호출
- destructuring declaration : 복합적인 값을 분해해서 여러 변수에 나눠 담음

<br>

### 4.1 자바 컬렉션 API 확장

- `list.last()`나 `set.max()`는 사실 모두 확장 함수
- 코틀린 표준 라이브러리는 수많은 확장 함수를 포함

<br>

### 4.2 가변 인자 함수

```java
fun listOf<T>(vararg values: T): List<T> { ··· }
```

- `vararg`는 메소드 호출 시 원하는 개수만큼 값을 인자로 넘기면<br>컴파일러가 배열에 그 값들을 넣어주는 기능
- 자바에서는 타입 뒤에 `...`을 사용하지만 코틀린에서는 타입 앞에 `vararg` 사용
- 이미 배열이 있는 경우 자바는 그냥 배열을 넘기면 되지만 코틀린에서는 배열을 명시적으로 풀어야 함

```java
fun main(args: Array<String>) {
  val list = listOf("args: ", *args)
  println(list)
}
```

- 기술적으로는 spread 연산자를 사용할 수도 있지만, 위와 같이 배열 앞에 `*`을 붙여도 됨

<br>

### 4.3 값의 쌍 다루기: 중위 호출과 구조 분해 선언

```java
val map = mapOf(1 to "one", 7 to "seven", 53 to "fifty-three")
```

- 이 코드는 **infix call**이라는 특별한 방식으로
- 중위 호출은 객체와 유일한 메소드 인자 사이에 메소드 이름을 넣음

```java
infix fun Any.to(other: Any) = Pair(this, other)
```

- 함수를 중위 호출되도록 허용할 때는 위처럼 `infix` 변경자를 함수 앞에 추가해야 함
- Pair는 코틀린 표준 라이브러리 클래스로, 이름 그대로 두 원소로 이뤄진 순서쌍을 표현

```java
val (number, name) = 1 to "one"
```

- Pair의 내용으로 두 변수를 즉시 초기화할 수 있음
- 이를 destructuring declaration이라고 부름
- Pair 인스턴스 외 다른 객체에도 구조 분해 적용 가능
  - 예를 들어 key와 value, index와 element

<br>
<br>

## 5. 문자열과 정규식 다루기

### 5.1 문자열 나누기

- 자바의 String.split 메소드는 정규식을 사용하기 때문에 `.`으로 분리할 수 없음
- 코틀린에서는 다른 조합의 파라미터를 받는 확장 함수를 통해 이를 해결함

```java
println("12.345-6.A".split("\\.|-".toRegex()))

[12, 345, 6, A]
```

- 사실 이렇게 간단한 식에 정규식을 사용할 필요는 없음

```java
println("12.345-6.A".split('.', '-'))
```

- 확장 함수 중에는 구분 문자를 하나 이상 인자로 받는 함수가 존재

<br>

### 5.2 정규식과 3중 따옴표로 묶은 문자열

파일 전체 경로를 구분하는 예제

- String 확장 함수를 사용하는 버전

```java
fun parsePath(path: String) {
  val directory = path.substringBeforeLast("/")
  val fullName = path.substringAfterLast("/")
  val fileName = fullName.substringBeforeLast(".")
  val extension = fullName.substringAfterLast(".")
  println("Dir: $directory, name: $fileName, ext: $extension")
}
```

```java
parsePatg("/Users/min/kotlin/TIL.md")

Dir: /Users/min/kotlin, name: TIL, ext: md
```

- 정규식을 활용한 버전

```java
fun parsePath(path: String) {
  val regex = """(.+)/(.+)\.(.+)""".toRegex()
  val matchResult = regex.matchEntire(path)
  if (matchResult != null) {
    val (directory, filename, extension) = matchResult.destructured
    println("Dir: $directory, name: $filename, ext: $extension")
  }
}
```

- 3중 따옴표 문자열에서는 `\`를 포함한 어떤 문자도 이스케이프할 필요가 없음
- 위 코드에서는 `/`와 `.`을 기준으로 경로를 세 그룹으로 분리
- 패턴 `.`은 임의의 문자와 매치
  - 그래서 첫 번째 그룹의 `(.+)`는 마지막 `/`까지 모든 문자와 매치되는 것
  - 마찬가지로 두 번째 그룹의 `(.+)`는 마지막 `.` 전까지 모든 문자가 들어감
  - 세 번째 그룹은 남은 모든 문자

<br>

### 5.3 여러 줄 3중 따옴표 문자열

- 3중 따옴표는 이스케이프만을 위한 것이 아니라, 줄 바꿈을 표현할 수도 있음

```java
val kotlinLogo = """|  //
                    | //
                    | / \ """
println(kotlinLogo.trimMargin("."))

|  //
| //
| / \
```

- 들여쓰기나 줄 바꿈을 포함한 모든 문자가 들어감
- 그러나 문자열 템플릿을 사용할 때 쓰는 `$`를 사용하기에 불편함
  - 사용하고자 한다면 `"""${'$'}99.9"""`처럼 `'$'` 문자를 사용해야 함

<br>
<br>

## 6. 코드 다듬기: 로컬 함수와 확장

- 자바 코드를 작성할 때 **DRY**(Don't Repeat Yourself)를 피하기 어려움
- 메소드 추출 리팩토링을 통해 메소드를 부분부분 나눠서 재활용할 수도 있지만<br>그런 경우에는 작은 메소드가 많아지고 메소드 간의 관계 파악이 힘들어짐
- 코틀린에서는 함수에서 추출한 함수를 원 함수 내부에 중첩시킬 수 있음

※ 코드 중복 예제

```java
class User(val id: Int, val name: String, val address: String)

fun saveUser(user: User) {
  if (user.name.isEmpty()) {
    throw IllegalArgumentException(
      "Can't save user ${user.id}: empty Name")
  }
  if (user.address.isEmpty()) {
    throw IllegalArgumentException(
      "Can't save user ${user.id}: empty Address")
  }
}
```

※ 로컬 함수로 코드 중복 줄이기

```java
class User(val id: Int, val name: String, val address: String)

fun saveUser(user: User) {
  fun validate(value: String, fieldName: String) {
    if (value.isEmpty()) {
      throw IllegalArgumentException(
        "Can't save user ${user.id}: empty $fieldName")
    }
  }

  validate(user.name, "Name")
  validate(user.addredd, "Address")
}
```

※ 확장 함수로 추출하기

```java
class User(val id: Int, val name: String, val address: String)

fun User.validateBeforeSave() {
  fun validate(value: String, fieldName: String) {
    if (value.isEmpty()) {
      throw IllegalArgumentException(
        "Can't save user $id: empty $fieldName")
    }
  }

  validate(name, "Name")
  validate(addredd, "Address")
}

fun saveUser(user: User) {
  user.validateBeforeSave()
}
```
