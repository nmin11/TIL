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

- 이처럼 람다 안에서 사용하는 외부 변수를 **'람다가 포획(capture)한 변수'**라고 부름
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
