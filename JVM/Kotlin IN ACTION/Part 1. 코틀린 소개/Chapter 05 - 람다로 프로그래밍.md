## 1. 람다 식과 멤버 참조

### 1.1 람다 소개: 코드 블록을 함수 인자로 넘기기

- 일련의 동작을 변수에 저장하거나, 함수에 넘겨야 하는 경우가 자주 있음
- 자바에서는 예전에 무명 내부 클래스를 통해 이를 해결했지만 번거로운 방식
- 함수형 프로그래밍에서는 함수를 값처럼 다루는 접근 방법으로 이 문제를 해결함
  - 클래스의 인스턴스를 함수에 넘기는 대신 함수를 직접 함수에 전달
- 람다 식을 사용하면 함수를 선언할 필요가 없고 코드 블록을 직접 함수의 인자로 전달 가능

※ 자바 무명 객체 사용 예시

```java
button.setOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View view) {
    /* 클릭 시 실행 동작 */
  }
});
```

※ 람다로 간소화한 예시

```java
button.setOnClickListener { /* 클릭 시 실행 동작 */ }
```

- 이 예제들은 람다를 메소드가 하나뿐인 무명 객체를 대신해서 사용할 수 있다는 점을 보여줌

<br>

### 1.2 람다와 컬렉션

※ 람다를 사용해서 컬렉션을 검색하는 예시

```java
val people = listOf(Person("Alice", 29), Person("Bob", 31))
println(people.maxBy { it.age })

//Person(name=Bob, age=31)
```

※ 위 코드를 **멤버 참조**를 사용해서 더욱 간략화하기

```java
people.maxBy(Person::age)
```

<br>

### 1.3 람다 식의 문법

```java
{ x: Int, y: Int -> x + y }
```

- 람다는 값처럼 여기저기 전달할 수 있는 동작의 모음
- 람다를 따로 변수에 저장할 수도 있지만, 인자로 넘기며 바로 람다를 정의하는 경우가 대부분
- 코틀린 람다 식은 항상 중괄호로 둘러싸여 있음
- 인자 목록 주변에 괄호가 없으며, `->`가 인자 목록과 람다 본문을 구분

※ 람다를 변수에 저장하기

```java
val sum = { x: Int, y: Int -> x + y }
println(sum(1, 2))

//3
```

※ `run`을 사용하면 코드의 일부분을 블록으로 둘러싸서 바로 실행할 수 있음

```java
run { println(42) }
```

※ 람다와 컬렉션 예제를 람다로 다시 작성하기

```java
people.maxBy({ p: Person -> p.age })
```

- 멤버 참조 예시보다는 코드가 좀 더 있지만, 어떤 일이 벌어지고 있는지 명확히 알 수 있음
  - 중괄호는 람다 식이고 그 람다 식을 `maxBy` 함수에 넘김
  - 람다 식은 Person 타입의 값을 인자로 받아서 인자의 age 반환
- 하지만 이 코드는 번잡합
  - 구분자가 너무 많이 쓰여서 가독성이 떨어짐
  - 컴파일러가 문맥으로부터 유추할 수 있는 인자 타입을 굳이 적었음
  - 인자가 단 하나뿐인 경우 인자에 이름을 붙일 필요가 없음

※ 번잡한 코드를 줄인 예시

```java
people.maxBy { it.age }
```

- `it` 사용은 코드를 아주 간단하게 만들어주지만 가독성을 위해 명시적으로 풀어야 할 때도 있음
- 특히 람다를 변수에 저장할 때는 파라미터의 타입을 추론할 수 없으니 타입을 명시해야 함

```java
val getAge = { p: Person -> p.age }
people.maxBy(getAge)
```

※ 3장에서 개선했던 `joinToString` 예제 다시 보기

```java
val people = listOf(Person("로코", 20), Person("남궁민", 29))
val names = people.joinToString(" ", { p: Person -> p.name })
println(names)

//로코 남궁민
```

※ 위 예제에서 람다를 괄호 밖으로 빼서 간소화하기

```java
people.joinToString(" ") { p -> p.name }
```

※ IntelliJ IDEA에서 지원하는 람다 식

- 람다 식을 괄호 밖으로 이동하기 (Move lambda expression out of parentheses)
- 람다 식을 괄호 안으로 이동하기 (Move lambda expression into parentheses)

※ 본문이 여러 줄인 람다 식

```java
val sum = { x: Int, y: Int ->
  println("Computung the sum of $x and $y...")
  x + y
}
println(sum(1, 2))

//Computung the sum of 1 and 2...
//3
```

- 본문의 맨 마지막에 있는 식이 람다의 결과가 됨

<br>

### 1.4 현재 영역에 있는 변수에 접근

- 람다를 함수 안에 정의하면 함수의 로컬 변수까지 람다에서 사용 가능
- `forEach`는 컬렉션의 모든 원소에 대해 람다를 호출해줌

```java
fun printNameWithPrefix(names: Collection<String>, prefix: String) {
  messages.forEach {
    println("$prefix $it")
  }
}

val names = listOf("로코", "남궁민")
printNameWithPrefix(names, "존잘남")

//존잘남 로코
//존잘남 남궁민
```

- 자바와 다른 또 한 가지 중요한 점은 파이널 변수가 아닌 변수에 접근할 수 있다는 점
  - 또한 람다 안에서 바깥 변수를 변경할 수도 있음

```java
fun printProblemCounts(responses: Collection<String>) {
  var clientErrors = 0
  var serverErrors = 0
  responses.forEach {
    if (it.startsWith("4")) {
      clientErrors++
    } else if (it.startsWith("5")) {
      serverErrors++
    }
  }
  println("$clientErrors client errors, $serverErrors server errors")
}

val responses = listOf("200 OK", "418 I'm a teapot", "500 Internal Server Error")
printProblemCounts(response)

//1 client errors, 1 server errors
```

- 이처럼 람다 안에서 사용하는 외부 변수를 **람다가 포획(capture)한 변수**라고 부름
- 하지만 람다를 비동기적으로 실행되는 코드로 활용할 경우에는<br>호출 이후 로컬 변수가 변경될 수도 있음

```java
fun tryToCountButtonClicks(button: Button): Int {
  var clicks = 0
  button.onClick { clicks++ }
  return clicks
}
```

- 이 함수는 항상 0을 반환
- 핸들러가 함수를 반환한 다음에 호출되기 때문!
- 이 함수를 제대로 구현하려면 함수 내부의 프로퍼티가 아닌 클래스의 프로퍼티나 전역 프로퍼티를 사용해야 함

<br>

### 1.5 멤버 참조

- 지금까지는 람다를 사용해서 코드 블록을 다른 함수에게 인자로 넘기는 방법을 배웠음
- 하지만 넘기려는 코드가 이미 함수로 선언된 경우라면? 함수를 직접 넘길 순 없을까?

```java
val getAge = Person::age
```

- 코틀린에서는 자바 8과 마찬가지로 함수를 값으로 바꿀 수 있음
- `::`를 사용하는 식을 **member reference**라고 부름
- 멤버 참조는 프로퍼티나 메소드를 단 하나만 호출하는 함수 값을 만들어줌
- 참조 대상이 함수인지 프로퍼티인지와는 관계 없이 멤버 참조 뒤에는 괄호를 넣어선 안됨

※ 위 코드를 람다 식으로 표현하면?

```java
val getAge = { person: Person -> person.age }
```

※ 멤버 참조와 람다는 같은 타입이므로 자유롭게 바꿔쓰는 것도 가능

```java
people.maxBy(Person::age)
people.maxBy { p -> p.age }
people.maxBy { it.age }
```

※ 최상위에 선언되었으며, 다른 클래스의 멤버가 아닌 함수나 프로퍼티 참조 가능

```java
fun salute() = println("Salute!")
run(::salute)
```

※ 람다가 인자가 여럿인 다른 함수한테 작업을 위임하는 경우

```java
val action = { person: Person, message: String ->
  sendEmail(person, message)
}
val nextAction = ::sendEmail
```

※ constructor reference를 사용하면 클래스 생성 작업을 연기하거나 저장해둘 수 있음

```java
data class Person(val name: String, val age: Int)
```

```java
val createPerson = ::Person
val p = createPerson("Alice", 29)
println(p)
```

※ 확장 함수도 멤버 함수와 똑같은 방식으로 참조 가능

```java
fun Person.isAdult() = age >= 21
val predicate = Person::isAdult
```

<br>
<br>

## 2. 컬렉션 함수형 API

- 함수형 프로그래밍 스타일은 컬렉션을 다룰 때 편리
  - 대부분의 작업에 라이브러리 함수를 활용할 수 있기에 코드를 간결하게 해줌

<br>

### 2.1 filter & map

```java
val list = listOf(1, 2, 3, 4)
println(list.filter { it % 2 == 0 })

//[2, 4]
```

```java
val people = listOf(Person("Alice", 29), Person("Bob", 31))
println(people.filter { it.age > 30 })

//[Person(name=Bob, age=31)]
```

- `filter` 함수는 컬렉션에서 원치 않는 원소를 제거
- `map` 함수는 원소를 변환

```java
val list = listOf(1, 2, 3, 4)
println(list.map { it * it })

//[1, 4, 9, 16]
```

```java
val people = listOf(Person("Alice", 29), Person("Bob", 31))
println(people.map { it.name })

//[Alice, Bob]
```

※ 위 코드는 멤버 참조를 사용해서 더 멋지게 작성 가능

```java
people.map(Person::name)
```

※ 위와 같은 호출을 연쇄하는 것도 가능

```java
people.filter { it.age > 30 }.map(Person::name)

//[Bob]
```

**가장 나이 많은 사람의 이름을 찾는 예제**

```java
people.filter { it.age == people.maxBy(Person::age)!!.age }
```

- 목록에 있는 사람들의 나이의 최대값을 구하고 나이가 최대값과 같은 모든 사람을 반환하는 방식
- 하지만 이 연산은 순회하면서 최대값을 구하는 작업을 계속 반복하게 되므로 비효율적

```java
val maxAge = people.maxBy(Person::age)!!.age
people.filter { it.age == maxAge }
```

- 최대값을 한번만 계산하도록 만들었음
- 이처럼 람다를 사용할 때는 겉으로는 단순해 보이는 식이 내부적으로 엄청나게 불합리한 계산식이 될 때가 있음
- 그러므로 작성하는 코드로 인해 어떤 일이 벌어질지 명확히 이해해야만 함

**Map 구조에서의 filter & map**

```java
val numbers = mapOf(0 to "zero", 1 to "one")
println(numbers.mapValues { it.value.toUpperCase() })

//{0=ZERO, 1=ONE}
```

- `filterKeys` `mapKeys` : 키를 걸러내거나 변환
- `filterValues` `mapValues` : 값을 걸러내거나 변환

<br>

### 2.2 all, any, count, find

- `all` `any` : 모든 원소가 어떤 조건을 만족하는지 판단
- `count` : 조건을 만족하는 원소의 개수 반환
- `find` : 조건을 만족하는 첫 번째 원소 반환

```java
val canBeInClub27 = { p: Person -> p.age <= 27 }
val people = listOf(Person("Alice", 27), Person("Bob", 31))
```

```java
println(people.all(canBeInClub27))
//false
```

```java
println(people.any(canBeInClub27))
//true
```

- `!all`은 `any`와 같고, `!any`는 `all`과 같으므로 굳이 혼용하여 사용하지 않는 편이 좋음

```java
val people = listOf(Person("Alice", 27), Person("Bob", 31))
println(people.count(canBeInClub27))

//1
```

<br>

※ `count`와 `size` 짚고 넘어가기

```java
println(people.filter(canBeInClub27).size)

//1
```

- 이렇게 처리하면 조건을 만족하는 모든 원소가 들어가는 중간 컬렉션이 생겨버림
- 따라서 count가 훨씬 효율적

<br>

```java
val people = listOf(Person("Alice", 27), Person("Bob", 31))
println(people.find(canBeInClub27))

//Person(name=Alice, age=27)
```

- `find` 조건에 해당하는 원소가 전혀 없는 경우에는 `null` 반환
  - 그러므로 `firstOrNull`과도 같음

<br>

### 2.3 groupBy

- 컬렉션의 모든 원소를 어떤 특성에 따라 여러 그룹으로 나눠주는 기능

```java
val people = listOf(Person("Alice", 31), Person("Bob", 29), Person("Carol", 31))
println(people.groupBy { it.age })

/*
{29=[Person(name=Bob, age=29)],
31=[Person(name=Alice, age=31), Person(name=Carol, age=31)]}
*/
```

- 위 예제의 경우 결과 타입은 `Map<Int, List<Person>>`

<br>

※ 멤버 참조를 활용해서 문자열을 첫 글자에 따라 분류하기

```java
val list = listOf("a", "ab", "b")
println(list.groupBy(String::first))

//{a=[a, ab], b=[b]}
```

- `first`는 멤버가 아닌 확장 함수이지만 여전히 멤버 참조를 사용해서 접근 가능

<br>

### 2.4 flatMap, flatten

```java
val strings = listOf("abc", "def")
println(strings.flatMap { it.toList() })

//[a, b, c, d, e, f]
```

- 위 예제에서 문자열에 `toList`를 사용하면 문자열에 속한 모든 문자로 이뤄진 리스트가 만들어짐
- `flatMap` : 인자로 주어진 람다를 컬렉션의 모든 객체에 적용하고,<br>얻어지는 여러 리스트를 한 리스트로 모음
- `flatten` : 중첩된 리스트를 특별한 변환 없이 펼쳐서 반환

<br>

※ 저자가 여러 명일 수 있는 책의 저자들만 모으는 예제

```java
class Book(val title: String, val authors: List<String>)
```

```java
val books = listOf(Book("Thursday Next", listOf("Jasper Fforde")),
Book("Mort", listOf("Terry Pratchett")),
Book("Good Omens", listOf("Terry Pratchett", "Neil Gaiman")))
println(books.flatMap { it.authors }.toSet())

//[Jasper Fforde, Terry Pratchett, Neil Gaiman]
```

- `toSet`은 리스트에서 중복을 없애고 집합으로 만들어줌
  - `Terry Pratchett`이 한번만 있는 이유

<br>
<br>

## lazy 컬렉션 연산

- 앞서 살펴본 `map` `filter`와 같은 함수들은 결과 컬렉션을 **즉시(eagerly)** 생성함
- 이는 컬렉션 함수를 연쇄하면 매 단계마다 중간 결과를 새로운 컬렉션에 임시로 담는다는 뜻
- **sequence**를 사용하면 중간 임시 컬렉션을 사용하지 않고도 연쇄할 수 있음

<br>

※ 2번 연쇄하는 예제

```java
people.map(Person::name).filter { it.startsWith("A") }
```

- `filter`와 `map`은 리스트를 반환하므로, 이 연쇄 호출은 2개의 리스트를 만듦

※ sequence를 활용해서 최적화하기

```java
people.asSequence()
    .map(Person::name)
    .filter { it.startsWith("A") }
    .toList()
```

- 코틀린 지연 계산 시퀀스는 `Sequence` 인터페이스에서 시작
  - 이 인터페이스는 단지 한 번에 하나씩 열거될 수 있는 원소의 시퀀스를 표현할 뿐
  - `iterator`라는 단 하나의 메소드를 통해 시퀀스로부터 원소 값을 얻음
  - 시퀀스의 원소는 필요할 때 비로소 계산되므로, 중간 결과를 저장하지 않음
  - `asSequence` 확장 함수를 통해 어떤 컬렉션이든 시퀀스로 바꿀 수 있음
  - 시퀀스를 리스트로 만들 때는 `toList` 사용
    - 굳이 시퀀스를 컬렉션으로 되돌리는 이유는 API 메소드를 더욱 다양하게 사용하기 위해서

<br>

### 3.1 시퀀스 연산 실행

- **intermediate 연산**
  - 다른 시퀀스 반환
  - 반환하는 시퀀스는 최초 시퀀스의 원소를 변환하는 방법을 앎
  - 항상 지연 계산
- **terminal 연산**
  - 결과를 반환
  - 결과는 최초 컬렉션에 대해 변환을 적용한 시퀀스로부터<br>일련의 계산을 수행해서 얻을 수 있는 컬렉션이나 원소, 숫자 또는 객체

<br>

```java
listOf(1, 2, 3, 4).asSequence()
    .map { print("map($it) "); it * it }
    .filter { print("filter($it) "); it % 2 == 0 }
```

- 위 코드를 실행하면 결과를 얻을 필요가 없으므로 출력되는 내용이 없음

```java
listOf(1, 2, 3, 4).asSequence()
    .map { print("map($it) "); it * it }
    .filter { print("filter($it) "); it % 2 == 0 }
    .toList()

//map(1) filter(1) map(2) filter(4) map(3) filter(9) map(4) filter(16)
```

- 위 출력에서 유심히 살펴봐야 할 것은 **연산 수행 순서**
  - 컬렉션의 경우 `map` `filter` 연산을 통해 각각 새로운 컬렉션을 반환
  - 시퀀스의 경우 각 원소에 대해 `map` `filter` 연산을 순차적으로 적용
  - 따라서 무조건적으로 모든 원소를 연산하는 컬렉션에 비해 성능적 이점을 가짐

<br>

### 3.2 시퀀스 만들기

```java
val naturalNumbers = generateSequence(0) { it + 1 }
val numbersTo100 = naturalNumbers.takeWhile { it <= 100 }
println(numbersTo100.sum())

//5050
```

- 위 코드에서 `naturalNumbers`와 `numbersTo100`은 모두 시퀀스이며 연산을 지연 계산
- 최종 연산 `sum`을 하기 전까지 시퀀스의 각 숫자는 계산되지 않음

<br>
<br>

## 4. 자바 함수형 인터페이스 활용

- 코틀린을 사용하면서도 사실 자바 API를 상당수 활용하게 될 것
- 다행인 점은 코틀린 람다를 자바 API에서 사용해도 문제가 없음

<br>

※ 자바에서 Button 클래스의 setOnClickListener 설정 예제

```java
public class Button {
  public void setOnClickListener(OnClickListener 1) { ... }
}
```

```java
public interface OnClickListener {
  void onClick(View v);
}
```

- 람다가 없던 자바 8 이전에는 무명 클래스의 인스턴스를 만들어야만 했음

```java
button.setOnClickListener(new OnClickListener() {
  @Override
  public void onClick(View v) { ... }
});
```

- 코틀린에서는 무명 클래스 인스턴스 대신 람다를 넘길 수 있음

```java
button.setOnClickListener { view -> ... }
```

- `view`의 타입은 `View`인데, `OnClickListener`의 추상 메소드가<br>단 1개이기 때문에 타입을 추론할 수 있는 것
- 추상 메소드가 하나만 있는 인터페이스를 **functional interface** 또는 **SAM interface** 라고 함
  - SAM : single abstract method
- 자바 API에는 `Runnable`이나 `Callable` 같은 함수형 인터페이스를 활용하는 메소드가 많음
- 코틀린은 무명 클래스 인스턴스를 정의하고 활용할 필요가 없으므로 코틀린다운 코드로 남아있을 수 있음

<br>

### 4.1 자바 메소드에 람다를 인자로 전달

- 함수형 인터페이스를 인자로 원하는 자바 메소드에 코틀린 람다 전달 가능

```java
void postponeComputation(int delay, Runnable computation);
```

```java
postponeComputation(1000) { println(42) }
```

- 컴파일러는 자동으로 람다를 `Runnable` 인스턴스로 변환
- 'Runnable 인스턴스'라는 말은 실제로 'Runnable을 구현한 무명 클래스의 인스턴스'라는 뜻
- 무명 클래스의 유일한 추상 메소드를 구현할 때 람다 본문을 메소드 본문으로 사용
  - 위 예제의 `Runnable`의 `run`이 바로 그 추상 메소드

※ Runnable을 변수에 저장하고 메소드를 호출할 때마다 그 인스턴스를 사용하게 할 수 있음

```java
val runnable = Runnable { println(42) }
fun handleComputation() {
  postponeComputation(1000, runnable)
}
```

※ 주변 영역의 변수를 포획하여 구현하는 방식도 가능

```java
fun handleComputation(id: String) {
  postponeComputation(1000) { println(id) }
}
```

<br>

### 4.2 SAM 생성자

- 람다를 함수형 인터페이스의 인스턴스로 변환할 수 있게 컴파일러가 자동으로 생성한 함수
- 컴파일러가 자동으로 람다를 함수형 인터페이스 무명 클래스로 바꾸지 못하는 경우에 사용

```java
fun createAllDoneRunnable(): Runnable {
  return Runnable { println("All done!") }
}
```

```java
createAllDoneRunnable().run()

//All done!
```

- SAM 생성자의 이름은 사용하려는 함수형 인터페이스의 이름과 같음
- 함수형 인터페이스의 유일 추상 메소드의 본문에 사용할 람다만을 인자로 받아서<br>함수형 인터페이스를 구현하는 클래스의 인스턴스 반환

<br>

※ 람다로 생성한 함수형 인터페이스 인스턴스를 변수에 저장하는 경우에도 SAM 생성자 사용 가능

```java
val listener = OnClickListener { view ->
  val text = when (view.id) {
    R.id.button1 -> "First button"
    R.id.button2 -> "Second button"
    else -> "Unknown button"
  }
  toast(text)
}

button1.setOnClickListener(listener)
button2.setOnClickListener(listener)
```

- 어떤 버튼이 클릭됐는지에 따라 다른 동작을 구현할 때 사용하기에 좋음
- 가끔 오버로드한 메소드 중 어떤 타입의 메소드를 선택해서 람다를 변환해 넘겨줄지 모호한 경우<br>명시적으로 SAM 생성자를 사용하는 것이 좋음

<br>

※ 람다와 this

- 람다에는 인스턴스 자신을 가리키는 `this`가 없음
- 람다 안에서 `this`는 람다를 둘러싼 클래스의 인스턴스
- 이벤트 리스너가 이벤트 처리 후 리스너 등록을 해제하려면 무명 객체를 사용해야 함

<br>
<br>

## 5. 수신 객체 지정 람다: with & apply

- 자바의 람다에는 없는 코틀린 람다의 독특한 기능
- 그 기능은 바로 수신 객체를 명시하지 않고<br>람다의 본문 안에서 다른 객체의 메소드를 호출할 수 있게 하는 것
- 그러한 람다를 **lambda with receiver** 라고 부름

<br>

### 5.1 with 함수

※ 알파벳 만들기 예제

```java
fun alphabet(): String {
  val result = StringBuilder()
  for (letter in 'A' .. 'Z') {
    result.append(letter)
  }
  result.append("\nNow I know the alphabet!")
  return result.toString()
}
```

- result에 대해 여러 메소드를 호출했음
- 이 정도 반복은 나쁘지 않지만 코드가 훨씬 길거나 더 자주 반복했다면?

<br>

※ `with`을 활용한 리팩토링 예제

```java
fun alphabet(): String {
  val sb = StringBuilder()
  return with(sb) {                       //메소드를 호출할 수신 객체 지정
    for (letter in 'A' .. 'Z') {
      this.append(letter)                 //this를 명시해서 수신 객체의 메소드 호출
    }
    append("\nNow I know the alphabet!")  //this를 생략하고 수신 객체의 메소드 호출
    this.toString()                       //람다에서 값을 반환
  }
}
```

- `with`의 파라미터는 2개
  - 위 예제에서 첫 번째 파라미터는 `sb`, 두 번째 파라미터는 람다
  - 물론 이 방식 대신 `with(sb, {...})`처럼 사용할 수도 있지만 가독성이 나쁨
- 수신 객체 지정 람다는 일반 함수에 확장 함수가 있듯이,<br>일반 람다에도 수신 객체 지정 람다가 있다고 볼 수 있음

<br>

※ `sb` 변수를 없애는 예제

```java
fun alphabet() = with(StringBuilder()) {
  for (letter in 'A' .. 'Z') {
    append(letter)
  }
  append("\nNow I know the alphabet!")
  toString()
}
```

- 식의 결과를 바로 반환하게 되므로, 식을 본문으로 하는 함수로 표현 가능
- 이 경우 내부적으로 `StringBuilder`의 인스턴스를 만들고 즉시 `with`으로 넘기게 됨
- `with`이 반환하는 값은 람다 코드를 실행한 결과이며,<br>그 결과는 람다 식의 본문에 있는 마지막 식의 값

<br>

### 5.2 apply 함수

- 거의 `with`과 같음
- 차이점은 항상 자신에게 전달된 객체를 반환한다는 점뿐

<br>

※ `apply`를 사용한 알파벳 만들기 예제

```java
fun alphabet() = StringBuilder().apply {
  for (letter in 'A' .. 'Z') {
    append(letter)
  }
  append("\nNow I know the alphabet!")
}.toString()
```

- `apply`는 확장 함수로 정의되어 있음
- 위 함수에서 `apply`를 실행한 결과는 `StringBuilder` 객체
- 객체의 인스턴스를 만들면서 즉시 프로퍼티 중 일부를 초기화해야 하는 경우 유용
- 자바에서는 보통 별도의 `Builder` 객체가 이런 역할을 담당하지만<br>코틀린에서는 라이브러리의 지원 없이도 `apply` 사용 가능

<br>

※ `TextView` 초기화 예제

```java
fun createViewWithCustomerAttributes(ctx: Context) =
  TextView(ctx).apply {
    text = "Sample Text"
    textSize = 20.0
    setPadding(10, 0, 0, 0)
  }
```

- `apply`를 활용하여 수신 객체의 프로퍼티 값들을 설정할 수 있음

<br>

※ 표준 라이브러리 함수 `buildString`으로 알파벳 만들기

```java
fun alphabet() = buildString {
  for (letter in 'A' .. 'Z') {
    append(letter)
  }
  append("\nNow I know the alphabet!")
}
```

- `builderString` 함수는 `StringBuilder`를 활용해서 `String`을 만드는 경우 사용할 수 있는 우아한 해법

⭐ 수신 객체 지정 람다는 **Domain Specific Language**를 다룰 때 더욱 흥미진진한 예제를 볼 수 있음
