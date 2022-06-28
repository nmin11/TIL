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
