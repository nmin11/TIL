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
