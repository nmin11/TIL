## 1. nullability

- NullPointerException 오류(NPE)를 피할 수 있도록 돕는 코틀린 타입 시스템의 특성
- 코틀린을 비롯한 최신 언어는 null 관련 에러를 실행 시점이 아닌 컴파일 시점에서 알리고자 함
- 코틀린은 null이 될 수 있는지 여부를 타입 시스템에 추가해서 컴파일 시점에 감지

<br>

### 1.1 nullable type

- 코틀린과 자바의 첫 번째이자 가장 중요한 차이
- nullable type은 프로퍼티나 변수에 null을 허용하게 만드는 방법
- `String?` `Int?` `MyCustomType?` 등 어떤 타입이든 `?`를 붙이면 nullable type이 됨
- 코틀린에서 타입에 `?`가 없다면 null이 들어올 수 없다는 뜻
- nullable type을 사용하면 `var.method()`처럼 메소드를 직접 호출할 수 없음

```java
fun strLenSafe(s: String?): Int =
  if (s != null) s.length else 0
```

<br>

### 1.2 타입의 의미

- [Wikipedia](https://en.wikipedia.org/wiki/Data_type):<br>"타입은 분류로, 어떤 값들이 가능한지와 그 타입에 대해 수행할 수 있는 연산의 종류를 결정한다."
- 자바의 String 변수에는 String이나 null이 들어갈 수 있음
  - 하지만 이 두 종류의 값은 실행할 수 있는 연산이 완전 다름
  - String 값이 들어 있으면 String 클래스의 모든 메소드 호출 가능
  - null 값이 들어 있으면 사용할 수 있는 연산이 적음
- 이는 자바 시스템이 null을 제대로 다루지 못한다는 뜻!
  - 변수를 선언해도 null 여부를 추가로 검사하기 전에는 그 변수에 대해 어떤 연산을 수행할 수 있을지 모름
  - 프로그램을 작성하다 보면 특정 위치에 특정 변수가 null일 수 없음을 확신하고<br>null 검사를 생략하는 경우가 많음
- 참고로, nullable type이 래퍼 타입이 아니고 컴파일 시점에 non-nullable type과 함께 검사되므로,<br>nullable type을 처리하기 위한 별도의 부가 비용이 들지 않음

<br>

### 1.3 `?.` 안전한 호출 연산자

- `?.`은 null 검사와 메소드 호출을 한 번의 연산으로 수행
- ex) `s?.toUpperCase()`<br>→ `if (s != null) s.toUpperCase() else null`
- 안전한 호출의 결과 또한 nullable type이어야만 함
- 메소드 호출뿐 아니라 프로퍼티를 가져올 때도 사용 가능하며, 연쇄해서 가져올 수도 있음

```java
class Address(val streetAddress: String, val zipCode: Int, val city: String, val country: String)
class Company(val name: String, val address: Address?)
class Person(val name: String, val company: Company?)

fun Person.countryName(): String {
  val country = this.company?.address?.country
  return if (country != null) country else "Unknown"
}
```

<br>

### 1.4 `?:` elvis 연산자

- null 대신 사용할 디폴트 값을 지정할 때 사용
- 이름이 elvis인 이유는 시계 방향으로 90도 돌렸을 때 Elvis Presley 특유의 헤어스타일과 눈이 보이기 때문
- 더 심각한 이름을 좋아하는 사람을 위해 null coalescing 연산자라는 이름도 있음

```java
fun foo(s: String?) {
  val t: String = s ?: ""
}
```

- 이항 연산자로, 좌항을 계산한 값이 null이 아니면 좌항 값, null이면 우항 값 적용
- 안전한 호출 연산자 `?.`과 함께 사용할 수 있음

```java
fun strLenSafe(s: String?): Int = s?.length ?: 0
```

※ 이제 1.3의 countryName을 구하는 함수도 한 줄로 표현 가능

```java
fun Person.countryName() = company?.address?.country ?: "Unknown"
```

<br>

- 코틀린에서 `return` `throw` 등의 연산도 식이므로, elvis 연산자의 우항에 넣을 수 있음
  - 이런 패턴은 함수의 전제 조건을 검사하는 경우 특히 유용

※ 지정한 사람의 회사 주소를 라벨에 인쇄하는 예제

```java
class Address(val streetAddress: String, val zipCode: Int, val city: String, val country: String)
class Company(val name: String, val address: Address?)
class Person(val name: String, val company: Company?)

fun printShippingLabel(person: Person) {
  val address = person.company?.address
    ?: throw IllegalArgumentException("No address")
  with (address) {
    println(streetAddress)
    println("$zipCode $city, $country")
  }
}
```

- 위 함수는 주소가 없더라도 NullPointerException 대신 의미 있는 오류를 발생시킴
- `with` 함수를 사용했기 때문에 `address`를 4번이나 반복하지 않아도 됨

<br>

### 1.5 `as?` 안전한 캐스트

- 2장에서 살펴본 `as`는 자바 타입 캐스트와 마찬가지로 타입 변경이 안되면 **ClassCastException** 발생
- `as`를 사용할 때마다 `is`를 통해 미리 체크해볼 수도 있지만 코틀린이라면 뭔가 지원해주지 않을까?
- `as?`는 지정 타입으로 캐스트하되, 변환이 불가능하면 null 반환
- 안전한 캐스트 사용 시 일반적인 패턴은 캐스트 수행 뒤 elvis 연산자를 사용하는 것

```java
class Person(val firstName: String, val lastName: String) {
  override fun equals(o: Any?): Boolean {
    val otherPerson = o as? Person ?: return false
    return otherPerson.firstName == firstName && otherPerson.lastName == lastName
  }

  override fun hashCode(): Int =
    firstName.hashCode() * 37 + lastName.hashCode()
}
```

<br>

### 1.6 `!!` not-null assertion

- nullable type을 다룰 때 사용할 수 있는 도구 중에서 가장 단순하면서도 무딘 도구
- 어떤 값이든 null이 될 수 없는 타입으로 강제로 바꿈
- 실제 null 값에 대해 `!!`를 적용하면 NPE 발생

```java
fun ignoreNulls(s: String?) {
  val sNotNull: String = s!!
  println(sNotNull.length)
}
```

- `!!`는 컴파일러에게 _"나는 이 값이 null이 아님을 알고 있으며, 예외가 발생해도 감수하겠다"_ 고 말하는 꼴
- `!!`는 컴파일러에게 소리를 지르는 듯한 무례한 느낌이 드는데 이는 의도된 바이며<br>더 나은 방법을 찾아보라고 넌지시 표현하기 위해 이 기호를 선택했음
- 그러나 만약 1번 함수에서 null이 아님을 검증받았다면 2번 함수에서 `!!`를 사용하는 것은 옳은 사용 방법

※ UI 프레임워크에서의 `!!` 사용 예제

```java
class CopyRowAction(val list: JList<String>): AbstractAction() {
  override fun isEnabled(): Boolean =
    list.selectedValue != null
  override fun actionPerformed(e: ActionEvent) {  //isEnabled가 true인 경우에만 호출되는 함수
    val value = list.selectedValue!!
    /* copy value to clipboard */
  }
}
```

- `!!`를 사용한다면 어떤 식에서 예외가 발생했는지를 확실하게 하기 위해서 한 줄에 여러 개를 쓰지 말 것

※ 예외를 파악하기 힘든 안 좋은 예제

```java
person.company!!.address!!.country
```

<br>

### 1.7 `let`

- null이 될 수 있는 식을 더 쉽게 다루도록 해줌
- 안전한 호출 연산자와 함께 사용하면 식에서 null 여부를 검사하고 결과를 변수에 넣는 작업을 간단하게 처리
  - nullable type을 non-nullable type으로 바꿔서 람다에 전달
- 가장 흔한 용례는 nullable type을 받아서 null이 아닌 값만 인자로 넘기는 방식

```java
fun sendEmailTo(email: String) {
  println("Sending email to $email")
}
```

```java
var email: String? = "kotlin@example.com"
email?.let { sendEmailTo(it) }
```

- `let`을 사용하면 결과를 저장하는 변수를 따로 만들 필요가 없음

※ 명시적인 if 검사 예제

```java
val person: Person? = getTheBestPersonInTheWorld()
if (person != null) sendEmailTo(person.email)
```

↓

※ 이 경우 `person` 변수는 굳이 추가할 필요가 없음

```java
getTheBestPersonInTheWorld()?.let { sendEmailTo(it.email) }
```

- `let`은 지나치게 중첩시켜 사용하면 코드가 복잡해지므로 `if`를 사용하는 게 나은 경우도 있음

<br>

### 1.8 `lateinit` 나중에 초기화할 프로퍼티

- 객체 인스턴스를 일단 생성하고 나중에 초기화하는 프레임워크가 많음
  - 안드로이드에서는 `onCreate`에서 activity 초기화
  - JUnit에서는 `@Before` 어노테이션이 붙은 메소드 안에서 초기화 로직 수행
- 코틀린에서는 일반적으로 생성자에서 모든 프로퍼티를 초기화해야 함
- 따라서 nullable type의 초기화에 null 검사 로직이나 `!!`를 넣어야 하는데, 그러면 코드가 번잡해짐

※ `!!`를 사용하는 못생긴 예제

```java
class MyService {
  fun performAction(): String = "foo"
}

class MyTest {
  private var myService: MyService? = null

  @Before
  fun setUp() {
    myService = MyService()
  }

  @Test
  fun testAction() {
    Assert.assertEquals("foo", myService!!.performAction())
  }
}
```

- `lateinit`을 사용하면 프로퍼티를 나중에 초기화할 수 있음

```java
class MyService {
  fun performAction(): String = "foo"
}

class MyTest {
  private lateinit var myService: MyService

  @Before
  fun setUp() {
    myService = MyService()
  }

  @Test
  fun testAction() {
    Assert.assertEquals("foo", myService.performAction())
  }
}
```

- `lateinit` 변수는 항상 `var`이어야만 함
  - `val`은 `final` 필드이며, 반드시 생성자 안에서 초기화되어야 하므로
- `lateinit`을 사용하면 nullable type이라도 생성자 안에 초기화할 필요가 없어짐
- 초기화를 하지 않아서 에러가 발생하더라도 NPE가 아닌, `lateinit` 관련 에러가 발생
- `lateinit`은 DI 프레임워크와 함께 사용되는 경우가 많음

<br>

### 1.9 nullable type 확장

- nullable type에 대한 확장 함수를 정의하면 null 값을 다루는 강력한 도구로 활용 가능
- null 검사 없이 직접 변수에 대해 메소드를 호출해도 확장 함수인 메소드가 알아서 null을 처리
  - 이런 처리는 확장 함수에서만 가능
  - 일반 멤버 호출은 객체 인스턴스를 통해 직접 dispatch 되므로 null 여부를 검사하지 않음
- 예를 들어 `String?` 타입의 수신 객체에 대해 호출 가능한 `isNullOrEmpty`나 `isNullOrBlank`가 있음

```java
fun verifyUserInput(input: String?) {
  if (input.isNullOrBlank()) {
    println("Please fill in the required fields")
  }
}
```

- 안전한 호출 없이도 nullable type을 적절히 처리함
- 이 확장 함수들을 사용한다고 해서 `input`이 non-nullable type이 되는 것은 아님

```java
fun String?.isNullOrBlank(): Boolean =
  this == null || this.isBlank()
```

- 확장 함수 내부에서 `this`는 null이 될 수 있으므로 명시적으로 null 여부를 검사해야 함
- 자바와 달리 코틀린에서는 `this`가 null이 될 수 있음
- 하지만 만약 직접 확장 함수를 작성한다면 일단 non-nullable로 설계하고,<br>나중에 nullable 호출이 대부분일 때가 되면 변경해주는 방식이 좋음

<br>

### 1.10 타입 파라미터의 null 가능성

- 코틀린에서 함수나 클래스의 모든 타입 파라미터는 기본적으로 null이 될 수 있음
- 따라서 타입 파라미터 `T`를 클래스나 함수 안에서<br>타입 이름으로 사용하면 `?`가 없더라도 `T`는 nullable type

```java
fun <T> printHashCode(t: T) {
  println(t?.hashCode())
}
```

- 위 코드에서 `t`는 nullable type이므로 안전한 호출을 사용해야만 함
- `T`의 타입은 `Any?`로 추론됨
- 이 때 타입 파라미터가 null이 아님을 확실히 하려면 **upper bound** 를 지정해야 함

```java
fun <T: Any> printHashCode(t: T) {
  println(t.hashCode())
}
```

<br>

### 1.11 Nullable과 자바

- 자바에서도 `@Nullable` 어노테이션을 사용하면 코틀린에서 `?`를 붙인 타입과 같아짐
  - 그 반대의 어노테이션은 `@NotNull`
- 코틀린은 JSR-305 표준, 안드로이드, 젯브레인스 도구 등이 지원하는 Nullable 어노테이션을 알아봄
- 그리고 이런 Nullable 어노테이션이 자바에 없는 경우, 자바의 타입은 **platform type** 이 됨

#### platform type

- 코틀린이 null 관련 정보를 알 수 없는 타입
- 해당 타입을 nullable type으로 처리해도 되고, non-nullable type으로 처리해도 됨
- 컴파일러는 모든 연산을 허용
- 즉, platform type 처리에 대한 책임은 온전히 개발자에게 있다는 것
- 자바의 대부분의 라이브러리는 null 관련 어노테이션을 사용하지 않으므로<br>마치 모든 타입이 null이 아닌 것처럼 다루기 쉽지만 그렇게 하면 오류가 발생할 수 있음
- 코틀린에서 platform type을 선언할 수 없고, 자바 코드에서 가져온 타입만 platform type이 됨
- `String!`과 같은 형태로 뒤에 `!`가 붙어서 전달되며, 이는 null 가능성에 대한 정보가 없다는 뜻

<br>

#### 상속

- 코틀린에서 자바 메소드를 override 하려면 파라미터와 반환 타입에 대한 nullable 여부를 결정해야 함

```java
interface StringProcessor {
  void process(String value);
}
```

- 위와 같은 자바 코드를 상속할 때, 코틀린은 다음 두 구현을 다 받아들임

```java
class StringPrinter: StringProcessor {
  override fun process(value: String) {
    println(value)
  }
}

class NullableStringPrinter: StringProcessor {
  override fun process(value: String?) {
    if (value != null) {
      println(value)
    }
  }
}
```

- 자바 클래스나 인터페이스를 코틀린에서 구현할 때 nullable을 제대로 처리하는 것이 중요!
- 코틀린 컴파일러는 non-nullable type에 대해 non-null 검사를 하는 단언문을 만들어줌
  - 만약 자바에서 이 메소드에 null을 넘기면 예외 발생

<br>
<br>

## 2. 코틀린의 원시 타입

- `Int` `Boolean` `Any` 등의 원시 타입에 대해 살펴볼 것
- 코틀린은 원시 타입과 래퍼 타입을 구분하지 않음
  - 코틀린 내부에서 원시 타입에 대한 래핑이 어떻게 작동하는지 살펴볼 것
- `Object` `Void` 등의 자바 타입과 코틀린 타입 간의 대응 관계에 대해서도 살펴볼 것

<br>

### 2.1 원시 타입

- 자바는 **primitive type**에 값을 직접 넣고, **reference type**에 메모리상 객체 위치를 넣음
- 원시 타입의 값이 더 효율적으로 저장되며 여기저기 전달 가능
- 하지만 원시 타입 값에 대해 메소드를 호출하거나 그 값을 컬렉션에 담을 수 없음
- 자바는 이런 경우에 래퍼 타입으로 원시 타입 값을 감싸서 사용
  - 예시 : `Collection<Integer>`
- 반면에 코틀린은 원시 타입과 래퍼 타입을 구분하지 않음
- 더 나아가 원시 타입 값에 대해 메소드 호출도 가능

※ 값을 특정 범위로 제한하는 메소드 `coerceIn`

```java
fun showProgress(progress: Int) {
  val percent = progress.coerceIn(0, 100)
  println("We're ${percent}% done!")
}
```

```java
showProgress(146)
// We're 100% done!
```

- `Int`와 같은 타입은 항상 객체로 표현되는 것이 아님
  - 실행 시점에 가능한 한 가장 효율적인 방식으로 표현
  - 대부분의 경우 코틀린의 `Int` 타입은 자바의 `int` 타입으로 컴파일
  - 컬렉션과 같은 제네릭 클래스를 사용하는 경우에만 `Integer` 타입으로 컴파일
- 자바 원시 타입은 non-nullable이므로, 코틀린에서도 non-nullable로 취급

<br>

### 2.2 nullable 원시 타입

- 자바에서 null 참조는 참조 타입의 변수만 가능
  - 그러므로 코틀린의 원시 타입에 `?`를 붙여서 nullable로 사용하면 래퍼 타입으로 컴파일

```java
val listOfInts = listOf(1, 2, 3)
```

- 위 예제는 null 값 혹은 nullable 타입을 전혀 사용하지 않았지만 `Integer` 타입으로 이뤄진 리스트가 됨
  - 코틀린은 제네릭 클래스 사용 시 원시 타입을 넘겨도 래퍼 타입으로 사용
  - JVM이 타입 인자로 원시 타입을 허용하지 않기 때문에<br>자바나 코틀린 모두 제네릭 클래스는 항상 래퍼 타입 사용
- 만약 원시 타입으로 이뤄진 대규모 컬렉션을 사용하고 싶다면 [trove4J](http://trove.starlight-systems.com) 등을 사용해볼 것

<br>

### 2.3 숫자 변환

- 코틀린과 자바의 가장 큰 차이점 중 하나
- 코틀린은 한 타입의 숫자를 다른 타입의 숫자로 자동 변환하지 않음
  - 원래 타입보다 더 넓은 범위를 허용하는 타입으로도 자동 변환할 수 없음

```java
val i = 1
val l: Long = i

//"Error: type mismatch" 컴파일 에러 발생
```

- 대신 직접 변환 메소드를 호출해야 함

```java
val i = 1
val l: Long = i.toLong()
```

- 코틀린은 `Boolean`을 제외한 모든 원시 타입에 대해 변환 함수를 제공
  - `toByte()` `toShort()` `toChar()` 등 양방향 변환 함수 모두 제공
  - 표현 범위가 더 넓은 타입으로도, 더 좁은 타입으로도 변환 가능
    - 좁은 타입으로 변환 시 변환하면서 값을 벗어나게 되면 일부를 잘라냄

```java
val x = 1
val list = listOf(1L, 2L, 3L)
x in list
```

- 위 예제에서 `x in list`는 false
  - 코틀린에서는 타입을 명시적으로 변환해서 같은 타입의 값으로 만든 후 비교해야 함
  - 코틀린은 개발자의 혼란을 피하기 위해 타입 변환을 명시하기로 결정했음

```java
val x = 1
val list = listOf(1L, 2L, 3L)
x.toLong() in list
```

- 숫자 리터럴을 사용할 때는 변환 함수를 호출할 필요가 없음
  - `42L`이나 `42.0f`처럼 상수 뒤에 타입을 표현하는 문자를 붙이면 변환이 필요 없음
- 직접 변환하지 않더라도 숫자 리터럴을 타입이 알려진 변수에 대입하거나<br>함수 인자로 넘기면 컴파일러가 자동 변환해줌
- 산술 연산자는 적당한 타입의 값을 받아들일 수 있게 오버로드되어 있음

```java
fun foo(l: Long) = println(l)
```

```java
val b: Byte = 1   //상수 값은 적절한 타입으로 해석됨
val l = b + 1L    //+는 Byte와 Long을 인자로 받을 수 있음
foo(42)           //컴파일러는 42를 Long으로 해석
```

- 코틀린 산수 연산자도 자바와 같이 **overflow** 발생 가능
  - 그러나 코틀린은 overflow를 검사하는 추가 비용이 들지 않음

<br>

### 2.4 `Any` `Any?` 최상위 타입

- 자바에서 `Object`가 클래스 계층의 최상위 타입이듯<br>코틀린에서는 `Any` 타입이 모든 non-nullable 타입의 조상 타입
- 하지만 자바에서는 참조 타입만 `Object`를 정점으로 하는 타입 계층에 포함
  - 자바에서 `Object` 타입의 객체가 필요하면 `Integer`와 같은 래퍼 타입으로 감싸야만 함
- 하지만 코틀린에서는 `Any`가 `Int` 등의 원시 타입을 포함한 모든 타입의 조상 타입
- 그래도 JVM 내부적으로 코틀린의 `Any`는 자바의 `Object`로 컴파일됨
- `toString` `equals` `hashCode`는 모두 `Any`에 정의된 메소드를 상속받은 것
  - 하지만 `Object`에 있는 `wait`이나 `notify` 등의 다른 메소드는 `Any`에서 사용 불가
- 자바와 마찬가지로 코틀린도 원시 타입 값을 `Any` 변수에 대입하면 자동으로 값을 객체로 감쌈

```java
val answer: Any = 42
```

<br>

### 2.5 `Unit` 코틀린의 void

- 관심을 가질 만한 내용을 전혀 반환하지 않는 함수의 반환 타입으로 사용 가능

```java
fun f(): Unit { ... }
```

- 이는 반환 타입 선언 없이 정의한 블록이 본문인 함수와 같음

```java
fun f() { ... }
```

- 대부분의 경우 `void`와 `Unit`의 차이는 없음
  - 함수의 반환 타입이 `Unit`이고 제네릭 함수를 override하지 않는다면<br>그 함수는 내부적으로 자바의 `void`로 컴파일됨
- `Unit`과 `void`의 차이점
  - `Unit`은 모든 기능을 갖는 일반적인 타입
  - `void`와 달리 `Unit`을 타입 인자로 사용 가능
  - `Unit` 타입에 속한 값은 하나뿐이며, 그 이름도 `Unit`
  - `Unit` 타입의 함수는 `Unit` 값을 묵시적으로 반환
  - 그러므로 제네릭 파라미터를 반환하는 함수를 override하면서 반환 타입을 `Unit`으로 사용할 때 유용

```java
interface Processor<T> {
  fun process(): T
}

class NoResultProcessor: Processor<Unit> {
  override fun process() {
    // 업무 처리 코드
  }
}
```

- 위 코드에서 `process` 함수는 어떤 값을 반환하라고 요구
  - `Unit` 타입도 `Unit` 값을 제공하기 때문에 `Unit` 값 반환에 문제 없음
  - `NoResultProcess`에서 명시적으로 `Unit`을 반환할 필요 없음
  - 컴파일러가 묵시적으로 `return Unit`을 넣어줌
- 자바에서도 이런 '값 없음' 문제를 깔끔하게 해결하려면 `Void` 타입을 사용해야 할 것
  - 하지만 `Void` 타입에 대응하는 유일한 값 null을 반환하기 위해 `return null`을 명시해야 함
- `Unit`이라는 이름을 고른 이유는 함수형 프로그래밍에서 전통적으로 '단 하나의 인스턴스만 갖는 타입'을<br>의미해 왔고 바로 이 차이가 자바의 `void`와 구분 짓는 가장 큰 차이이기 때문

<br>

### 2.6 `Nothing` 결코 정상적으로 끝나지 않는 함수

- 코틀린에는 결코 성공적으로 값을 돌려주지 않아 '반환 값'이 의미 없는 함수가 일부 존재
- 예를 들어 테스트 라이브러리들은 `fail` 함수를 제공해서 메시지와 함께 테스트를 실패시킬 수 있게 함
- 이러한 함수를 호출하는 코드를 분석하는 경우 함수가 정상적으로 끝나지 않는다는 것을 알면 유용
- 이런 경우를 표현하기 위해 코틀린에서는 `Nothing`이라는 특별한 반환 타입 제공

```java
fun fail(message: String): Nothing {
  throw IllegalStateException(message)
}
```

```java
fail("Error occurred")
// java.lang.IllegalStateException: Error occurred
```

- `Nothing` 타입은 아무 값도 포함하지 않음
  - 따라서 함수의 반환 타입이나 반환 타입으로 쓰일 타입 파라미터로만 사용 가능
  - 그 외 용도로 사용하려는 경우에는 선언하더라도 아무 값도 저장할 수 없으므로 아무 의미가 없음
- `Nothing`을 반환하는 함수를 elvis 연산자의 우항에 사용해서 precondition을 검사할 수 있음

```java
val address = company.address ?: fail("No address")
println(address.city)
```

- 컴파일러는 `Noting`이 반환 타입인 함수가 결코 정상 종료되지 않음을 알고 호출 코드를 분석해줌
- 위 예제에서는 `address`의 값이 null이 될 수 없음을 추론하게 해줌

<br>
<br>

## 3. 컬렉션과 배열

### 3.1 nullable과 컬렉션

```java
fun readNumbers(reader: BufferedReader): List<Int?> {
  val result = ArrayList<Int?>()
  for (line in reader.lineSequence()) {
    try {
      val number = line.toInt()
      result.add(number)
    } catch(e: NumberFormatException) {
      result.add(null)
    }
  }
  return result
}
```

- `List<Int?>`에는 Int 혹은 null 저장 가능
- 사실 `String.toIntOrNull`을 사용하면 이 예제를 훨씬 단축할 수 있음
- 리스트에서 nullable을 다룰 때 조심해야 하는 점 : null이 될 수 있는 건 컬렉션의 원소인가 컬렉션 자체인가?
  - 둘 다 nullable하다면 `List<Int?>?`로 표현해야 함
  - 둘 다 nullable한 경우, 리스트에 대해서 null 검사를 한 이후에 각 원소에 대해 다시 null 검사를 해야 함
- nullable 값으로 이뤄진 컬렉션에서 null 검사는 자주 하므로 코틀린 표준 라이브러리는 `filterNotNull` 함수 제공

```java
fun addValidNumbers(numbers: List<Int?>) {
  val validNumbers = numbers.filterNotNull()
  println("Sum of valid numbers: ${validNumbers.sum()}")
  println("Invalid numbers: ${numbers.size - validNumbers.size}")
}
```

- `filterNotNull`은 컬렉션 안에 null 값이 없음을 보장해주므로 `validNumbers`는 `List<Int>` 타입

<br>

### 3.2 읽기 전용과 변경 가능한 컬렉션

- 코틀린에서는 컬렉션 안의 데이터에 접근하는 인터페이스와 변경하는 인터페이스를 분리했음
- 이 구분은 코틀린 컬렉션을 다루는 패키지는 `kotlin.collections`부터 시작
  - `kotlin.collections.Collection`
  - `kotlin.collections.MutableCollection`
- `Collection`은 원소에 대한 iteration, 크기 얻기, 어떤 값이 안에 있는지 여부 등 데이터를 읽는 연산들을 수행
  - 원소를 추가하거나 제거하는 메소드가 없음
  - `size` `iterator()` `contains()`
- `MutableCollection`은 `Collection`을 확장하면서 원소 추가, 삭제, 모두 제거 등의 메소드 제공
  - `add()` `remove()` `clear()`
- 가능하면 항상 읽기 전용 인터페이스 사용을 원칙으로 삼을 것
  - 코드가 컬렉션을 변경할 필요가 있을 때만 변경 가능한 버전 사용
- `val`과 `var` 구분과 마찬가지로, 이렇게 구분하는 이유는 프로그램에서 데이터에 어떤 일이 벌어지는지 예측하기 위함
- 컬렉션 안의 원소는 다른 컬렉션에 대한 참조인 경우도 있으니 변경 가능성에 대해 신중을 기해야 함
