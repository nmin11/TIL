## 1. 클래스 계층 정의

### 1.1 코틀린 인터페이스

```java
interface Clickable {
  fun click()
}
```

```java
class Button: Clickable {
  override fun click() = println("I was clicked")
}
```

- 자바의 `extends`나 `implements` 대신 `:`으로 클래스든 인터페이스든 모두 처리
- `override` 변경자는 말그대로 상속받았다는 의미
  - 자바와 다르게 반드시 사용해줘야만 함
  - 상위 클래스와 시그니처가 같은 메소드를 우연히 구현하게 되면 컴파일이 안됨

```java
interface Clickable {
  fun click()
  fun showOff() = println("I'm clickable!")
}
```

- 디폴트 구현 제공 가능
  - 자바와 같이 `default` 키워드를 붙일 필요도 없음
  - 상속 받은 클래스는 새로운 동작을 정의할 수도 있고, 그냥 디폴트를 사용할 수도 있음

```java
interface Focusable {
  fun setFocus(b: Boolean) =
    println("I ${if (b) "got" else "lost"} focus.")
  fun showOff() = println("I'm focusable!")
}
```

- 만약 한 클래스에서 Clickable과 Focusable을 동시에 상속받으려고 하면 `showOff` 메소드가 중복되는데,<br>이 경우 어느 쪽도 선택되지 않으며 `showOff` 구현을 대체할 오버라이딩 메소드를 직접 제공해야만 함

```java
class Button: Clickable, Focusable {
  override fun click() = println("I was clicked")
  override fun showOff() {
    super<Clickable>.showOff()
    super<Focusable>.showOff()
  }
}
```

<br>

### 1.2 open, final, abstract 변경자

- 『Effective Java』 - _"상속을 위한 설계와 문서를 갖추거나, 그럴 수 없다면 상속을 금지하라"_
  - 하위 클래스에서 상속받도록 의도된 것이 아니라면 모두 `final`로 만들라는 뜻
- 코틀린의 클래스와 메소드도 기본적으로 `final`
- 상속을 허용하고 싶다면 `open` 변경자를 붙여야 함

※ `open` 사용 예시

```java
open class RichButton: Clickable {  //열려 있는 클래스이므로 다른 클래스가 상속 가능
  fun disable() {}                  //final 함수, override 불가
  open fun animate() {}             //열려 있는 함수, override 가능
  override fun click() {}           //상위에서 열려 있는 메소드를 override, override했으면 기본적으로 열려 있음
}
```

※ 기본적으로 열려 있는 override를 하위에서는 override하지 못하게 하기

```java
open class RichButton: Clickable {
  final override fun click() {}
}
```

※ abstract 사용 예시

```java
abstact class Animated {            //인스턴스를 만들 수 없는 추상 클래스
  abstract fun animate()            //구현이 없는 추상 함수, 반드시 override해야 함
  open fun stopAnimating() {}       //추상 클래스의 비추상 함수는 기본적으로 final
  fun animateTwice() {}
}
```

⭐ interface는 항상 열려 있기에 상속 제어 변경자를 사용하지 않음

|  변경자  |        override        | 설명                                                                         |
| :------: | :--------------------: | :--------------------------------------------------------------------------- |
|  final   |     override 불가      | 클래스 멤버의 기본 변경자                                                    |
|   open   |     override 가능      | 반드시 명시해야 override 가능                                                |
| abstract | 반드시 override해야 함 | 추상 클래스의 멤버에만 붙을 수 있으며,<br>구현이 있어선 안됨                 |
| override | override하고 있는 함수 | 하위로 다시 override하는 것이 열려 있음<br>이를 방지하기 위해선 `final` 명시 |

<br>

### 1.3 가시성 변경자

- 아무 변경자도 없는 경우 기본 가시성은 `public`
- 자바의 기본 가시성인 `package-private`은 없음
  - 코틀린에서 패키지는 namespace를 관리하기 위한 용도로만 사용
- 대안으로 `internal`이라는 가시성 변경자를 도입했음
  - module 내부에서만 볼 수 있는 가시성 변경자
  - module은 한꺼번에 컴파일되는 코틀린 파일들을 의미
  - IntelliJ, Eclipse, Gradle, Maven 등의 프로젝트가 module이 될 수도 있고,<br>ant task가 실행될 때 함께 컴파일되는 파일의 집합이 module이 될 수도 있음
  - module 내부 가시성은 module 구현에 대해 진정한 캡슐화를 제공함
- 코틀린은 최상위 선언에 대해 `private`을 허용
  - 이 선언이 있는 파일 내부에서만 사용 가능
- 코틀린의 `protected`는 오직 어떤 클래스나 그 클래스를 상속한 클래서 안에서만 보임

|  변경자   |           클래스 멤버           |          최상위 선언          |
| :-------: | :-----------------------------: | :---------------------------: |
|  public   |     모든 곳에서 볼 수 있음      |    모든 곳에서 볼 수 있음     |
| internal  |  같은 모듈 안에서만 볼 수 있음  | 같은 모듈 안에서만 볼 수 있음 |
| protected | 하위 클래스 안에서만 볼 수 있음 |       최상위 선언 불가        |
|  private  | 같은 클래스 안에서만 볼 수 있음 | 같은 파일 안에서만 볼 수 있음 |

<br>

### 1.4 내부 클래스와 중첩된 클래스

- 코틀린에서도 클래스 안에 다른 클래스 선언 가능
- 코틀린의 nested class는 명시적으로 요청하지 않는 한 바깥쪽 클래스 인스턴스에 대한 접근 권한이 없음

```java
interface State: Serializable

interface View {
  fun getCurrentState(): State
  fun restoreState(state: State) {}
}
```

```java
class Button: View {
  override fun getCurrentState(): State = ButtonState()
  override fun restoreState(state: State) {}
  class ButtonState: State {}
}
```

- 자바의 경우에는 중첩 클래스 ButtonState가 static이어야만 직렬화 가능
- 코틀린에서는 중첩 클래스는 기본적으로 static
- 코틀린의 **내부 클래스**의 경우에는 `inner` 변경자를 붙여야 함

|        클래스 B 안의 클래스 A        |    in Java     |   in Kotlin   |
| :----------------------------------: | :------------: | :-----------: |
| 중첩 클래스(바깥 클래스 참조 저장 X) | static class A |    class A    |
| 내부 클래스(바깥 클래스 참조 저장 O) |    class A     | inner class A |

- 코틀린에서 바깥쪽 클래스의 인스턴스를 가리키는 참조를 표기하는 방법도 자바와 다름

```java
class Outer {
  inner class Inner {
    fun getOuterReference(): Outer = this@Outer
  }
}
```

<br>

### 1.5 봉인된 클래스

※ 2.3.5에서 살펴본 노드 계산 식 다시 보기

```java
interface Expr
class Num(val value: Int): Expr
class Sum(val left: Expr, val right: Expr): Expr
fun eval(e: Expr): Int =
  when (e) {
    is Num -> e.value
    is Sum -> eval(e.right) + eval(e.left)
    else ->
      throw IllegalArgumentException("Unknown expression")
  }
```

- 코틀린의 `when`은 디폴트 분기 `else`를 강제함
  - 항상 디폴트 분기를 추가하는 것은 편리하지 못함
  - 오히려 새로운 기능 추가할 때 새로운 처리를 잊어버렸더라도<br>디폴트 분기가 선택되기 때문에 심각한 버그가 발생할 수 있음
- `sealed` 클래스를 사용하면 하위 클래스에서 정의를 재현할 수 있게 됨

```java
sealed class Expr {
  class Num(val value: Int): Expr()
  class Sum(val left: Expr, val right: Expr): Expr()
}

fun eval(e: Expr): Int =
  when (e) {
    is Expr.Num -> e.value
    is Expr.Sum -> eval(e.right) + eval(e.left)
  }
```

- `sealed` 클래스는 모두 `open`이며, `when`의 디폴트 분기가 필요 없음
- 나중에 `sealed` 클래스의 새로운 하위 클래스를 추가하면<br>`when` 식이 컴파일되지 않으므로 수정할 부분을 쉽게 알 수 있음

<br>
<br>

## 2. 뻔하지 않은 생성자와 프로퍼티를 갖는 클래스 선언

- 코틀린은 primary constructor와 secondary constructor를 구분함
- 또한 initializer block을 통해 초기화 로직을 추가할 수 있음

<br>

### 2-1. 클래스 초기화: 주 생성자와 초기화 블록

```java
class User constructor(_nickname: String) {
  val nickname: String
  init {
    nickname = _nickname
  }
}
```

- 클래스 이름 뒤 `()` 부분이 **primary constructor**
  - 생성자 파라미터를 정하고 그 생성자 파라미터에 의해 초기화되는 프로퍼티 정의
- `constructor` 키워드는 주 생성자나 부 생성자 정의를 시작할 때 사용
- `init` 키워드는 초기화 블록을 시작
  - 초기화 블록은 주 생성자와 함께 사용됨
  - 주 생성자는 제한적이기 때문에 별도의 코드를 포함할 수 없으므로 초기화 블록이 필요
  - 필요하다면 여러 초기화 블록을 선언할 수 있음
- `_` 부분은 프로퍼티와 생성자 파라미터를 구분해줌
  - 자바처럼 `this.nickname = nickname` 방식을 사용해도 좋음
- 사실 위 코드에서 `constructor` 키워드와 `init` 키워드는 생략 가능

```java
class User(_nickname: String) {
  val nickname = _nickname
}
```

- 위 코드는 주 생성자 파라미터 앞에 `val`을 붙여서 더욱 간략화할 수 있음

```java
class User(val nickname: String)
```

- 생성자 파라미터도 디폴트 값 정의 가능

```java
class User(val nickname: String,
           val isSubscribed: Boolean = true)
```

- 클래스의 인스턴스 생성은 `new` 키워드 없이 생성자를 직접 호출하면 됨

```java
val min = User("Min", false)
```

- 기반 클래스가 있다면 기반 클래스의 생성자를 호출해야 함

```java
open class User(val nickname: String) { ··· }
class TwitterUser(nickname: String): User(nickname) { ··· }
```

- 클래스를 상속받은 경우 반드시 빈 생성자 `()`라도 붙여야 하지만 인터페이스는 필요 없음
  - 이를 통해 클래스를 상속받았는지, 인터페이스를 상속받았는지 구분할 수 있음
- 클래스 외부에서 인스턴스화하지 못하게 막고 싶다면 모든 생성자에 `private` 변경자를 붙이면 됨
  - 유틸리티 함수를 담아두는 용도이거나 싱글턴인 경우 사용할 수 있음

```java
class Secretive private constructor() {}
```

- 실제로 대부분의 경우 클래스의 생성자는 아주 단순
  - 그래서 코틀린은 간단한 주 생성자 문법을 제공
- 하지만 어려운 경우에 대비해서 필요에 따라 다양한 생성자를 정의할 수 있게 해두었음

<br>

### 2.2 부 생성자

- 일반적으로 코틀린에서는 자바처럼 여러 개의 생성자를 갖는 경우가 드묾
- 그래도 프레임워크 클래스를 확장하는 등의 경우 여러 방법으로 인스턴스 초기화 가능

```java
open class View {
  constructor(ctx: Context) {}
  constructor(ctx: Context, attr: AttributeSet) {}
}
```

- 부 생성자는 `constructor` 키워드와 함께 시작
- 클래스 확장 시 부모와 똑같이 부 생성자를 정의할 수도 있음

```java
class MyButton: View {
  constructor(ctx: Context)
    : super(ctx) {}
  constructor(ctx: Context, attr: AttributeSet)
    : super(ctx, attr) {}
}
```

- 자바처럼 `this()`를 사용해서 자신의 다른 생성자 호출도 가능

```java
class MyButton: View {
  constructor(ctx: Context): this(ctx, MY_STYLE) {}
}
```

<br>

### 2.3 인터페이스에 선언된 프로퍼티 구현

```java
interface User {
  val nickname: String
}
```

- 위 인터페이스는 추성 프로퍼티 선언이 있음
- User 인터페이스를 구현하는 클래스는 nickname의 값을 얻을 수 있는 방법을 제공해야 함

```java
class PrivateUser(override val nickname: String): User
class SubscribingUser(val email: String): User {
  override val nickname: String
    get() = email.substringBefore('@')
}
class FacebookUser(val accountId: Int): User {
  override val nickname = getFacebookName(accountId)
}
```

- 인터페이스에서도 getter와 setter가 있는 프로퍼티 선언 가능

```java
interface User {
  val email: String
  val nickname: String
    get() = email.substringBefore('@')
}
```

- 위 인터페이스를 상속받는 경우 email은 반드시 override해야 하지만,<br>nickname은 override 없이도 상속 가능

<br>

### 2.4 getter와 setter에서 뒷받침하는 필드에 접근

```java
class User(val name: String) {
  var address: String = "unspecified"
    set(value: String) {
      println("""
        Address was changed for $name:
        "$field" -> "$value".""".trimIndent())
      field = value
    }
}
```

- var 프로퍼티의 getter나 setter 중 한쪽만 직접 정의해도 됨

<br>

### 2.5 접근자의 가시성 변경

```java
class LengthCounter {
  var counter: Int = 0
    private set
  fun addWord(word: String) {
    counter += word.length
  }
}
```

- 위 코드의 경우 전체 길이 저장은 public이지만, 외부에서 값을 임의로 설정할 수는 없음

<br>
<br>

## 3. 컴파일러가 생성한 메소드

- 자바 플랫폼에서는 클래스가 `equals` `hashCode` `toString` 등의 메소드를 구현해야 함
  - 이런 메소드들은 보통 비슷한 방법을 통해 기계적으로 구현 가능
  - IDE들이 자동 생성을 지원해주지만 코드가 지저분한 건 어쩔 수 없음
- 코틀린 컴파일러는 이러한 기계적인 작업들을 보이지 않는 곳에서 해결해줌

<br>

### 3.1 모든 클래스가 정의해야 하는 메소드

- 코틀린 클래스도 `toString` `equals` `hashCode` 등을 오버라이드할 수 있음

<br>

**toString()**

```java
class Client(val name: String, val postalCode: Int) {
  override fun toString() = "Client(name=$name, postalCode=$postalCode)"
}
```

<br>

**equals()**

※ 코틀린에서 `==`는 원시 타입 비교 뿐만 아니라 객체 비교도 가능<br>참조 비교를 위해서는 `===` 사용

```java
class Client(val name: String, val postalCode: Int) {
  override fun equals(other: Any?): Boolean {
    if (other == null || other !is Client)
      return false
    return name == other.name &&
      postalCode == other.postalCode
  }
}
```

- `is` 검사는 자바의 `instanceof`와 같음
- `override`는 필수이기 때문에 받는 매개 타입도 `Any?`이어야만 함

<br>

**hashCode()**

```java
class Client(val name: String, val postalCode: Int) {
  override fun hashCode(): Int = name.hashCode() * 31 + postalCode
}
```

- 자바에서는 `equals`를 override할 때 반드시 `hashCode`도 함께 override해야 함
- JVM 언어에서는 `equals()`가 `true`인 두 객체는<br>반드시 같은 `hashCode()`를 반환해야 한다는 제약이 있음

<br>

### 3.2 데이터 클래스

```java
data class Client(val name: String, val postalCode: Int)
```

- `data class`는 필요한 메소드를 컴파일러가 자동으로 만들어줌
- 주 생성자에 나열된 모든 프로퍼티를 기반으로 자바에서 요구하는 모든 메소드를 자동 생성
  - 주 생성자 밖에 정의된 프로퍼티는 고려 대상이 아님에 유의
- 3.1에서 살펴본 3가지 메소드 외에도 몇 가지 유용한 메소드를 더 생성해줌

<br>

**copy()**

- 데이터 클래스의 프로퍼티가 꼭 `val`일 필요는 없지만 불변성을 위해 권장됨
- `copy` 메소드는 객체를 복사하면서 일부 프로퍼티를 바꿀 수 있게 해줌
- 복사본은 원본과 다른 생명주기를 가지기에 일부 변경되어도 원본에 영향을 끼치지 않음

<br>

### 3.3 by: 클래스 위임

- 객체지향 시스템에서 시스템을 취약하게 만드는 문제는 보통 구현 상속에 의해 발생
  - 하위 클래스는 상위 클래스에 의존하는데, 상위 클래스에 변경이 일어나면<br>하위 클래스에서 코드가 정상 작동하지 않게 될 수 있음
- 그렇기 때문에 코틀린 개발자들이 클래스의 디폴트를 `final`로 둔 것
  - 이렇게 하면 상속을 염두에 둔 클래스만 `open` 키워드를 통해 열어줘야 함
- 하지만 종종 상속을 허용하지 않는 클래스에 새로운 동작을 추가해야 할 때가 있는데,<br>이 때 사용하는 일반적인 방법이 **Decorator 패턴**
  - 이 패턴의 핵심 : 상속을 허용하지 않는 클래스 대신 새로 사용할 클래스를 만들되<br>기존 클래스를 Decorator 내부에 필드로 유지함
  - 단점 : 준비 코드가 상당히 많이 필요함

※ Collection 인터페이스를 아무 기능 추가 없이 Decorator를 만드는 예제

```java
class DelegatingCollection<T>: Collection<T> {
  private val innerList = arrayListOf<T>()
  override val size: Int get() = innerList.size
  override fun isEmpty(): Boolean = innerList.isEmpty()
  override fun contains(element: T): Boolean = innerList.contains(element)
  override fun iterator(): Iterator<T> = innerList.iterator()
  override fun containsAll(elements: Collection<T>): Boolean =
    innerList.containsAll(elements)
}
```

- 이러한 구현은 코틀린의 `by` 키워드로 단순화할 수 있음

```java
class DelegatingCollection<T>(
  innerList: Collection<T> = ArrayList<T>()
): Collection<T> by innerList {}
```

- 클래스 안에 메소드를 명시해줄 필요가 없음
  - 컴파일러가 자동 생성해주기 때문
- 기존 클래스의 메소드 구현으로 충분하다면 override를 하지 않아도 기본 구현을 따름

※ 원소를 추가하려고 시도한 횟수를 기록하는 Collection 구현해보기

```java
class CountingSet<T>(
  val innerSet: MutableCollection<T> = HashSet<T>()
): MutableCollection<T> by innerSet {
  var objectsAdded = 0
  override fun add(element: T): Boolean {
    objectsAdded++
    return innerSet.add(element)
  }
  override fun addAll(c: Collection<T>): Boolean {
    objectAdded += c.size
    return innerSet.addAll(c)
  }
}
```

- override하려는 메소드 외에는 다 내부 컨테이너에게 위임

<br>
<br>

## 4. object 키워드: 클래스 선언 & 인스턴스 생성

`object` 키워드란?

- 클래스를 정의하면서 동시에 인스턴스를 생성
- object declaration은 싱글턴을 정의하는 방법 중 하나
- companion object는 인스턴스 메소드는 아니지만 관련 있는 메소드 및 팩토리 메소드를 담을 때 쓰임
- object expression은 자바의 anonymous inner class 대신 쓰임

<br>

### 4.1 객체 선언: 싱글턴 쉽게 만들기

- 객체지향 시스템을 설계하다 보면 인스턴스가 하나만 필요한 클래스가 유용한 경우가 많음
- 자바에서는 싱글턴 패턴을 통해 구현하지만<br>코틀린은 **객체 선언** 기능을 통해 싱글턴을 언어에서 기본 지원
- 객체 선언은 클래스 선언과 해당 클래스에 속한 단일 인스턴스의 선언을 합친 선언

※ 회사 급여 대장을 싱글턴으로 만드는 예제

```java
object Payroll {
  val allEmployees = arrayListOf<Person>()
  fun calculateSalary() {
    for (person in allEmployees) {
      ···
    }
  }
}
```

- 클래스와 마찬가지로 프로퍼티, 메소드, 초기화 블록 등이 들어갈 수 있지만 생성자는 사용 불가
  - 선언문이 있는 위치에서 즉시 객체가 만들어지기 때문
- 객체 이름 뒤에 `.`을 붙이면 객체에 속한 메소드나 프로퍼티에 접근 가능

```java
Payroll.allEmployees.add(Person(...))
Payroll.calculateSalary()
```

- 객체 선언도 클래스나 인터페이스 상속 가능
  - 프레임워크를 사용하기 위해 특정 인터페이스를 구현해야 하는 경우 유용

※ 두 파일을 대소문자 구분 없이 비교해주는 객체 예시

```java
object CaseInsensitiveFileComparator: Comparator<File> {
  override fun compare(file1: File, file2: File): Int {
    return file1.path.compareTo(file2.path, ignoreCase = true)
  }
}
```

※ 코틀린과 싱글턴

- 싱글톤 패턴에서도 단점이듯, 객체 선언도 대규모 시스템에서는 적합하지 않음
- 객체 생성을 제어할 방법이 없고 생성자 파라미터를 지정할 수 없기 때문
- 그렇기에 단위 테스트나 요구 사항 변경에 대한 대응이 어려워짐
- 그래서 자바와 마찬가지로 의존관계 주입 프레임워크를 사용하기도 함
  - Guice 사용 가능

<br>

### 4.2 동반 객체

- 코틀린은 `static` 키워드를 지원하지 않기 때문에 클래스 안에 정적인 멤버가 없음
  - 대신 패키지 수준의 최상위 함수와 객체 선언을 활용할 수 있으며, 대부분의 경우 최상위 함수 활용
  - 하지만 최상위 함수는 `private` 클래스에 접근 불가
  - 이런 경우 클래스에 중첩된 객체 선언의 멤버 함수로 정의해야 함
- 클래스 안의 객체에 `companion` 키워드를 붙여서 **동반 객체**를 만들 수 있음
  - 동반 객체의 프로퍼티나 메소드에 접근하려면 동반 객체가 정의된 클래스 이름 사용

```java
class A {
  companion object {
    fun bar() {
      println("Companion object called")
    }
  }
}
```

```java
A.bar()
```

- 동반 객체는 `private` 생성자를 호출하기 좋은 위치
  - 동반 객체는 자신을 둘러싼 클래스의 모든 `private` 멤버에 접근 가능
  - 바깥쪽 객체의 `private` 생성자 호출도 가능
  - 따라서 동반 객체는 팩토리 패턴을 구현하기 가장 적합한 위치

※ 부 생성자가 여럿 있는 클래스 예제

```java
class User {
  val nickname: String
  constructor(email: String) {
    nickname = email.substringBefore('@')
  }
  constructor(facebookAccountId: Int) {
    nickname = getFacebookName(facebookAccountId)
  }
}
```

※ 위 예제를 팩토리 메소드로 대체하기

```java
class User private constructor(val nickname: String) {
  companion object {
    fun newSubscribingUser(email: String) =
      User(email.substringBefore('@'))
    fun newFacebookUser(accountId: Int) =
      User(getFacebookName(accountId))
  }
}
```

팩토리 메소드의 장단점

- 팩토리 메소드의 목적에 따라 이름을 정할 수 있음
- 생성할 필요가 없는 객체를 생성하지 않을 수 있음
- 하지만 클래스를 확장하는 경우 동반 객체 멤버를 하위 클래스에서 override 할 수 없음
  - 이런 경우에는 여러 생성자를 사용하는 편이 더 나음

<br>

### 4.3 동반 객체를 일반 객체처럼 사용

- 동반 객체는 클래스 안에 정의된 일반 객체
- 따라서 이름을 붙이거나, 인터페이스를 상속하거나, 안에 확장 함수와 프로퍼티를 정의할 수 있음
  - 이름을 지었을 경우, 이름으로 참조할 수도 있고 아니면 생략해서 참조할 수도 있음

**동반 객체에서 인터페이스 구현**

```java
interface JSONFactory<T> {
  fun fromJSON(jsonText: String): T
}

class Person(val name: String) {
  companion object : JSONFactory<Person> {
    override fun fromJSON(jsonText: String): Person = ...
  }
}
```

**동반 객체 확장**

```java
// 비즈니스 로직 모듈
class Person(val firstName: String, val lastName: String) {
  companion object { /* 비어있는 동반 객체 */ }
}

// 클라이언트 / 서버 통신 모듈
fun Person.Companion.fromJSON(json: String): Person {
  ...
}

val p = Person.fromJSON(json)
```

- 확장을 통해 마치 동반 객체 안에서 `fromJSON` 함수를 정의한 것처럼 호출 가능
- 이렇게 하려면 비어있는 객체라도 꼭 동반 객체를 부모 클래스에 선언해두어야 함

<br>

### 4.4 object expression

- `object` 키워드는 싱글턴 패턴을 구현하고 그 객체에 이름을 짓기 위해서만 존재하는 것이 아님
- **anonymous object**를 정의할 때에도 `object` 키워드 사용
- 무명 객체는 자바의 무명 내부 클래스를 대신하는 것

※ 사용 예시

```java
window.addMouseListener(
  object : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) {}
    override fun mouseEntered(e: MouseEvent) {}
  }
)
```

- 객체 선언과 비슷하지만 한 가지 뚜렷한 차이점은 이름이 없다는 것
- 객체 식은 클래스를 정의하고 인스턴스를 생성하지만, 클래스나 인스턴스에 이름을 붙이지 않음
- 객체 식이 객체 선언과 또 다른 점은 싱글턴이 아니기에 쓰일 때마다 새 인스턴스를 생성한다는 것
- 자바의 무명 객체와 다른 점
  - 여러 개의 인터페이스를 구현할 수 있음
  - final이 아닌 변수도 객체 식 안에서 사용 가능
