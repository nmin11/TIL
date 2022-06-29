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
