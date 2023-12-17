## 1. 산술 연산자 오버로딩

### 1.1 이항 산술 연산 오버로딩

```kotlin
data class Point(val x: Int, val y: Int) {
  operator fun plus(other: Point): Point {
    return Point(x + other.x, y + other.y)
  }
}
```

- 연산자를 오버로딩하는 함수 앞에는 꼭 `operator` 키워드를 붙여야 함
- `operator` 키워드는 함수가 관례를 따르는 함수임을 명확히 나타냄
- 실수로 관례에서 사용하는 함수 이름을 `operator` 없이 사용하면 `operator modifier is required` 에러 발생

```kotlin
operator fun Point.plus(other: Point): Point {
  return Point(x + other.x, y + other.y)
}
```

- 클래스에 대한 확장 함수로 연산자를 오버로딩하는 것이 일반적인 패턴!
- 프로그래머가 직접 연산자를 만들 수 없고 언어에서 미리 정해둔 연산자만 오버로딩 가능

❖ 오버로딩 가능한 이항 산술 연산자

| 식 | 함수 이름 |
| --- | --- |
| a + b | plus |
| a - b | minus |
| a * b | times |
| a / b | div |
| a % b | rem |
| a..b | rangeTo |

```kotlin
operator fun Point.times(scale: Double): Point {
  return Point((x * scale).toInt(), (y * scale).toInt())
}
```

- 연산자를 정의할 때 두 피연산자가 같은 타입일 필요는 없음

### 1.2 복합 대입 연산자 오버로딩

- `+=` `-=` 등에 해당하는 연산자

❖ 오버로딩 가능한 복합 대입 연산자

| 식 | 함수 이름 |
| --- | --- |
| a += b | plusAssign |
| a -= b | minusAssign |
| a *= b | timesAssign |
| a /= b | divAssign |
| a %= b | remAssign |

- 이론적으로 `+=` 연산자는 `plus` `plusAssign` 양쪽으로 컴파일 가능
  - 그러므로 클래스가 두 함수를 모두 정의하고 둘 다 `+=` 쪽으로 사용 가능하면 컴파일 에러 발생
  - 그러므로 `plus` `plustAssign` 둘 중 하나만 정의하는 설계가 가장 좋음
- 컬렉션 관련
  - `+` `-` 연산자는 항상 새로운 컬렉션 반환
  - 변경 가능 컬렉션의 `+=` `-=` 연산자는 객체 상태를 변경
  - 읽기 전용 컬렉션의 `+=` `-=` 연산자는 변경을 적용한 복사본 반환

### 1.3 단항 연산자 오버로딩

```kotlin
operator fun Point.unaryMinus(): Point {
  return Point(-x, -y)
}
```

❖ 오버로딩 가능한 단항 연산자

| 식 | 함수 이름 |
| --- | --- |
| +a | unaryPlus |
| -a | unaryMinus |
| !a | not |
| ++a, a++ | inc |
| --a, a-- | dec |

## 2. 비교 연산자 오버로딩

- 자바와 달리 코틀린은 객체에 대해 `==` `!=` 연산자를 직접 사용할 수 있음

### 2.1 equals

- `==` `!=` 연산자는 내부에서 인자가 null인지 검사하므로 nullable 타입에도 사용 가능
  - `a == b` 는 `a?.equals(b) ?: (b === null)` 로 컴파일됨
  - 즉 null이 아닐 때만 `a.equals(b)` 호출
  - a가 null이면 b도 null이어야 true 반환

```kotlin
data class Point(val x: Int, val y: Int) {
  override fun equals(other: Any?): Boolean {
    if (this === other) return true
    if (other !is Point) return false
    return x == other.x && y == other.y
  }
}
```

- `===` 연산자를 사용해서 자기 자신과의 비교를 최적화하는 것이 좋음
  - `===` 는 참조 동등성을 검사하므로 `==` 보다 더 빠름
  - `===` 를 오버로딩할 수는 없음
- 다른 연산자와 달리 `equals` 는 `Any` 에 정의된 메소드이므로 `operator` 대신 `override` 사용
  - 확장 함수로도 정의할 수 없게 됨
    - `Any` 에서 상속받은 `equals` 가 확장 함수보다 우선순위가 높기 때문!
- 위 예제는 `!=` 호출 또한 `equals` 메소드를 호출한다는 사실을 알려줌

### 2.2 compareTo

- 코틀린도 자바와 같이 `Comparable` 인터페이스 지원
- 게다가 `Comparable` 인터페이스의 `compareTo` 메소드를 호출하는 컨벤션 제공
- 따라서 `<` `>` `<=` `>=` 연산자는 `compareTo` 메소드를 호출하도록 컴파일됨

```kotlin
class Person(val firstName: String, val lastName: String): Comparable<Person> {
  override fun compareTo(other: Person): Int {
    return compareValuesBy(this, other, Person::lastName, Person::firstName)
  }
}
```

- `compareTo` 도 마찬가지로 `operator` 대신 `override` 사용
- 코틀린 표준 라이브러리의 `compareValuesBy` 함수를 사용하면 여러 필드를 비교하는 `compareTo` 메소드를 쉽게 구현 가능
  - 두 객체와 여러 비교 함수를 인자로 받음
  - 비교 함수들은 순차적으로 호출되며, 비교 결과가 0이 아니면 그 결과를 반환하고, 0이면 다음 비교 함수를 호출
  - 모든 함수가 0을 반환하면 0을 반환
  - 각 비교 함수는 람다나 프로퍼티/메소드 참조일 수 있음
- 하지만 필드를 직접 비교하면 코드는 복잡해지지만 더 빠름
  - 우선 쉽고 간결하게 코드를 작성하고, 성능이 중요한 상황에서만 최적화를 고려하자!

## 3. 컬렉션과 범위에 대해 쓸 수 있는 관례

### 3.1 get set

```kotlin
operator fun Point.get(index: Int): Int {
  return when (index) {
    0 -> x
    1 -> y
    else -> throw IndexOutOfBoundsException("Invalid coordinate $index")
  }
}
```

- `x[a, b]` → `x.get(a, b)`

```kotlin
operator fun MutablePoint.set(index: Int, value: Int) {
  when (index) {
    0 -> x = value
    1 -> y = value
    else -> throw IndexOutOfBoundsException("Invalid coordinate $index")
  }
}
```

- `x[a, b] = c` → `x.set(a, b, c)`

### 3.2 in

```kotlin
data class Rectangle(val upperLeft: Point, val lowerRight: Point)
operator fun Rectangle.contains(p: Point): Boolean {
  return p.x in upperLeft.x until lowerRight.x &&
    p.y in upperLeft.y until lowerRight.y
}
```

- `a in b` → `b.contains(a)`

### 3.3 rangeTo

- `a..b` → `a.rangeTo(b)`

### 3.4 iterator

- `for (x in list) { ... }` 문장은 `list.iterator()` 를 호출해서 `Iterator` 객체를 얻은 다음 `hasNext` 와 `next` 호출을 반복하는 방식
- 코틀린에서는 `iterator` 메소드를 확장 함수로 정의 가능

```kotlin
operator fun ClosedRange<LocalDate>.iterator(): Iterator<LocalDate> =
  object : Iterator<LocalDate> {
    var current = start
    override fun hasNext() = current <= endInclusive
    override fun next() = current.apply { current = plusDays(1) }
  }
```

- `LocalDate` 의 범위 객체를 for 루프에 사용할 수 있게 됨

## 4. 구조 분해 선언과 component 함수

- `val (x, y) = p` → `val x = p.component1()` `val y = p.component2()`
- 구조 분해 선언은 각 변수를 초기화하기 위해 `componentN` 함수를 호출
- data class 에서는 컴파일러가 `componentN` 함수를 자동으로 만들어줌

### 4.1 구조 분해 선언과 루프

```kotlin
fun printEntries(map: Map<String, String>) {
  for ((key, value) in map) {
    println("$key -> $value")
  }
}
```

- 이 간단한 예제는 `Map.Entry` 객체의 컬렉션의 `component1` `component2` 를 호출하는 방식으로 동작

```kotlin
for (entry in map) {
  val key = entry.component1()
  val value = entry.component2()
  println("$key -> $value")
}
```

## 5. delegated properties

- 코틀린이 제공하는 관례에 의존하는 독특하면서 강력한 기능
- 위임 프로퍼티를 사용하면 값을 필드에 단순히 저장하는 것 이상의 더 복잡한 방식의 프로퍼티 구현 가능
  - 프로퍼티가 자신의 값을 필드가 아닌 DB 테이블, 브라우저 세션, 맵 등에 저장할 수 있게 됨
- **위임** : 객체가 직접 작업을 수행하지 않고 다른 도우미 객체가 그 작업을 처리하게 맡기는 디자인 패턴
- **위임 객체 (delegate)** : 작업을 처리하는 도우미 객체
- 프레임워크를 만들 때 아주 유용

### 5.1 위임 프로퍼티

```kotlin
class Foo {
  var p: Type by Delegate()
}
```

- p 프로퍼티는 접근자 로직을 Delegate 객체에 위임
  - `by` 키워드 뒤에 있는 식을 계산해서 위임에 쓰일 객체를 얻음
  - 프로퍼티 위임 객체가 따라야 하는 관례를 따르는 모든 객체를 위임에 사용 가능

❖ 컴파일러가 자동으로 생성하는 코드

```kotlin
class Foo {
  private val delegate = Delegate()
  var p: Type
    get() = delegate.getValue(this, this::p)
    set(value: Type) = delegate.setValue(this, this::p, value)
}
```

- 프로퍼티 위임 관례를 따르는 객체는 getValue 와 setValue 메소드를 제공해야 함

### 5.2 by lazy

- **지연 초기화 (lazy initialization)** : 객체의 일부분을 초기화하지 않고 남겨뒀다가 실제로 사용할 때 초기화하는 패턴
  - 초기화 과정에 자원을 많이 사용하거나, 객체를 사용할 때마다 꼭 초기화하지 않아도 되는 프로퍼티인 경우

```kotlin
class Person(val name: String) {
  val emails by lazy { loadEmails(this) }
}
```

- `lazy` 함수는 코틀린 관례에 맞는 시그니처의 `getValue` 메소드가 들어있는 객체를 반환
  - 따라서 `by lazy` 키워드를 통해 위임 프로퍼티를 만들 수 있음
- `lazy` 함수의 인자는 값을 초기화하는 람다
- `lazy` 함수는 기본적으로 스레드 안전

### 5.3 위임 프로퍼티 구현

```kotlin
class ObservableProperty(
  var propValue: T,
  val changeSupport: PropertyChangeSupport
) {
  operator fun getValue(p: Person, prop: KProperty<*>): T = propValue
  operator fun setValue(p: Person, prop: KProperty<*>, newValue: T) {
    val oldValue = propValue
    propValue = newValue
    changeSupport.firePropertyChange(prop.name, oldValue, newValue)
  }
}
```

- `getValue` `setValue` 함수에 `operator` 키워드를 붙여야 함
- `getValue` `setValue` 는 프로퍼티가 포함된 객체와 프로퍼티를 표현하는 객체를 파라미터로 받아야 함
  - 코틀린은 `KProperty` 타입의 객체를 사용해 프로퍼티를 표현

```kotlin
class Person(
  val name: String, age: Int, salary: Int
) : PropertyChangeAware() {
  var age: Int by ObservableProperty(age, changeSupport)
  var salary: Int by ObservableProperty(salary, changeSupport)
}
```

- `by` 오른쪽의 객체는 **위임 객체 (delegate)**
- 코틀린은 위임 객체를 감춰진 프로퍼티에 저장하고 주 객체의 프로퍼티를 읽거나 쓸 때마다 위임 객체의 `getValue` `setValue` 를 호출

```kotlin
class Person(
  val name: String, age: Int, salary: Int
) : PropertyChangeAware() {
  private val observer = {
    prop: KProperty<*>, oldValue: Int, newValue: Int ->
    changeSupport.firePropertyChange(prop.name, oldValue, newValue)
  }
  var age: Int by Delegates.observable(age, observer)
  var salary: Int by Delegates.observable(salary, observer)
}
```

- `by` 오른쪽의 식이 꼭 새 인스턴스를 만들 필요는 없음
  - 함수 호출, 다른 프로퍼티, 다른 식 등이 올 수도 있음
  - 다만 계산 결과 객체는 컴파일러가 호출할 수 있는 올바른 타입의 `getValue` `setValue` 를 제공해야 함

### 5.4 위임 프로퍼티 컴파일 규칙

```kotlin
class C {
  var prop: Type by MyDelegate()
}
```

- 컴파일러는 `MyDelegate` 클래스의 인스턴스를 감춰진 프로퍼티에 저장
- 감춰진 프로퍼티는 `<delegate>` 라고 부름
- 또한 컴파일러는 프로퍼티를 표현하기 위해 `KProperty` 타입의 객체를 사용하며 이 객체를 `<property>` 라고 부름

❖ 컴파일러가 생성하는 코드

```kotlin
class C {
  private val <delegate> = MyDelegate()
  var prop: Type
    get() = <delegate>.getValue(this, this::prop)
    set(value: Type) = <delegate>.setValue(this, this::prop, value)
}
```

- `val x = c.prop` → `val x = c.<delegate>.getValue(c, c::prop)`
- `c.prop = x` → `c.<delegate>.setValue(c, c::prop, x)`

### 5.5 프로퍼티 값을 맵에 저장

```kotlin
class Person {
  private val _attributes = hashMapOf<String, String>()
  fun setAttribute(attrName: String, value: String) {
    _attributes[attrName] = value
  }
  val name: String by _attributes
}
```

- 위 예제는 표준 라이브러리 `Map` `MutableMap` 인터페이스의 `getValue` `setValue` 확장 함수를 활용하는 방식

### 5.6 프레임워크에서 위임 프로퍼티 사용

```kotlin
object Users : IdTable() {
  val name = varchar("name", 50).index()
  val age = integer("age")
}

class User(id: EntityID) : Entity(id) {
  var name: String by Users.name
  var age: Int by Users.age
}
```

- `Users` 객체는 하나만 존재할 수 있는 테이블을 표현 (싱글턴)
- `Entity` 클래스는 DB 컬럼을 엔티티의 속성값으로 매핑
- 프레임워크는 `Column` 클래스 안에 `getValue` `setValue` 정의
  - 두 메소드는 DB에서 컬럼 값을 읽고 쓰는 기능
- 이 프레임워크를 사용하면 DB 매핑으로부터 필요한 값을 가져오고, 엔티티를 갱신하는 방식으로 변경할 수 있어서 편리해짐
- 이 예제의 완전한 구현은 [Exposed 프레임워크 소스코드](https://github.com/JetBrains/Exposed)에 있음
