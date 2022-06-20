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
