# 람다식이란?

- 최근 들어 함수적 프로그래밍이 다시 부각되고 있음
  - 병렬 처리와 이벤트 지향 프로그래밍에 적합하기 때문
- Java 8 부터 **Lambda Expressions** 지원
- 람다식의 탄생 : 수학자 Alonzo Church가 발표한 람다 계산법에서 사용된 식이며,<br>이를 제자 John McCarthy가 프로그래밍 언어에 도입했음
- Java의 람다식 : 익명 함수를 생성하기 위한 식으로 이용되며,<br>코드를 간결하게 하고, 컬렉션의 요소를 필터링하거나 매핑해서 원하는 결과를 쉽게 집계할 수 있게 해줌

※ 기존 방식

```java
Runnable runnable = new Runnable() {
    public void run() { ··· }
};
```

※ 람다식

```java
Runnable runnable = () -> { ··· };
```

- 람다식은 함수 정의 형태를 띠고 있지만 런타임 시 인터페이스의 익명 구현 객체로 생성됨
  - 어떤 인터페이스를 구현할 것인지는 대입되는 인터페이스가 무엇인지에 달려있음

<br>
<br>

# 람다식 기본 문법

- 기본적인 작성 방법 : `(타입 매개변수) -> { 실행문; }`

```java
(int a) -> { System.out.println(a); }
```

- 매개 변수 타입은 런타임 시 대입되는 값에 따라 자동으로 인식되므로 언급하지 않아도 됨

```java
(a) -> { System.out.println(a); }
```

- 만약 매개 변수가 하나이면 `()`를 생략할 수 있고, 실행문도 하나이면 `{}`를 생략할 수 있음

```java
a -> System.out.println(a);
```

- 만약 매개 변수가 없다면 빈 괄호를 반드시 사용해야 함

```java
() -> System.out.println("a");
```

- `{}` 실행 이후 결과값을 리턴해야 한다면 return문으로 결과값 지정 가능

```java
(x, y) -> { return x + y; };
```

- `{}` 안에 return문만 있을 경우 생략하는 것이 정석

```java
(x, y) -> x + y
```

<br>
<br>

# 타겟 타입과 함수적 인터페이스

- 람다식의 형태는 마치 메소드를 선언하는 것처럼 보여지는데,<br>Java는 메소드를 단독으로 선언할 수 없고 항상 클래스의 구성 멤버로 선언하기 때문에<br>람다식은 단순히 메소드를 선언하는 것이 아니라 이 메소드를 가지고 있는 객체를 생성함
- 람다식은 인터페이스 변수에 대입됨
  - 람다식이 인터페이스의 익명 구현 객체를 생성하고 객체화한다는 뜻
- 람다식은 대입될 인터페이스의 종류에 따라 작성 방법이 달라지는데,<br>람다식이 대입될 인터페이스를 람다식의 **target type** 이라고 함

<br>
<br>

## @FunctionalInterface

- 모든 인터페이스를 람다식의 타겟 타입으로 사용할 수 없음
- 람다식은 하나의 메소드를 정의하기 때문에<br>2개 이상의 추상 메소드가 선언된 인터페이스는 람다식을 이용해서 구현 객체를 생성할 수 없음
- 하나의 추상 메소드가 선언된 인터페이스만이 람다식의 타겟 타입이 될 수 있으며,<br>이러한 인터페이스를 **functional interface** 라고 함
- @FunctionalInterface 어노테이션은 2개 이상의 추상 메소드가 선언되면 컴파일 오류를 발생시켜 줌
  - 이 어노테이션은 선택사항이며, 없어도 하나의 추상 메소드만 있다면 모두 함수적 인터페이스가 됨
  - 실수를 방지하고 싶다면 붙여주는 것이 좋음

<br>
<br>

## 매개 변수와 리턴값이 없는 람다식

```java
@FunctionalInterface
public interface NoParamAndNoReturn {
  public void method();
}
```

```java
NoParamAndNoReturn fun = () -> { ··· }
```

```java
fun.method();
```

<br>
<br>

## 매개 변수가 있는 람다식

```java
@FunctionalInterface
public interface ParamAndNoReturn {
  public void method(int x);
}
```

```java
ParamAndNoReturn fun = x -> { ··· }
```

```java
fun.method(5);
```

<br>
<br>

## 리턴값이 있는 람다식

```java
@FunctionalInterface
public interface ParamAndReturn {
  public int method(int x, int y);
}
```

```java
ParamAndReturn fun = (x, y) -> { 실행문; 리턴문; }
```

```java
int result = fun.method(2, 5);
```
