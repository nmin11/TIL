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
