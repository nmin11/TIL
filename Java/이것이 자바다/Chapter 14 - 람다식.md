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

<br>
<br>

# 클래스 멤버와 로컬 변수 사용

- 람다식의 실행 블록에는 클래스의 필드와 메소드, 그리고 로컬 변수 사용 가능
- 클래스의 멤버는 제약 사항 없이 사용 가능하지만 로컬 변수는 제약 사항이 따름

<br>
<br>

## 클래스의 멤버 사용

- 클래스의 멤버 사용에는 제약 사항이 없지만 `this` 키워드 사용 시에는 주의가 필요
- 람다식에서 `this`는 내부적으로 생성되는 익명 객체의 참조가 아닌 **람다식을 실행한 객체의 참조**

<br>
<br>

## 로컬 변수 사용

- 메소드의 매개 변수 또는 로컬 변수를 사용하려면 `final` 특성을 가져야 함

<br>
<br>

# 표준 API의 함수적 인터페이스

- Java에서 제공되는 표준 API에서 1개의 추상 메소드를 가지는 인터페이스들은<br>모두 람다식을 이용해서 익명 구현 객체로 표현 가능

※ Runnable은 `run()` 메소드만 존재하기 때문에 람다식으로 정의 가능

```java
Thread thread = new Thread(() -> {
  for (int i = 0; i < 10; i++) {
    System.out.println(i);
  }
});
```

- Java 8 부터 빈번하게 사용되는 함수적 인터페이스는 `java.util.function` 표준 API 패키지로 제공함
- 이 함수적 인터페이스들의 목적은<br>메소드 또는 생성자의 매개 타입으로 사용되어 람다식을 대입할 수 있도록 하기 위함
- `java.util.function`의 함수적 인터페이스는 크게<br>**Consumer**, **Supplier**, **Function**, **Operator**, **Predicate** 로 구분됨

<br>
<br>

## Consumer 함수적 인터페이스

- 특징 : 리턴값이 없는 `accept()` 메소드를 가짐
  - `accept()`는 단지 매개값을 소비하는 역할만 수행

|     인터페이스명      | 추상 메소드                    | 설명                           |
| :-------------------: | :----------------------------- | :----------------------------- |
|     Consumner\<T>     | void accept(T t)               | 객체 T를 받아 소비             |
|   BiConsumer\<T, U>   | void accept(T t, U u)          | 객체 T와 U를 받아 소비         |
|    DoubleConsumer     | void accept(double value)      | double 값을 받아 소비          |
|      IntConsumer      | void accept(int value)         | int 값을 받아 소비             |
|     LongConsumer      | void accept(long value)        | long 값을 받아 소비            |
| ObjDoubleConsumer\<T> | void accept(T t, double value) | 객체 T와 double 값을 받아 소비 |
|  ObjIntConsumer\<T>   | void accept(T t, int value)    | 객체 T와 int 값을 받아 소비    |
|  ObjLongConsumer\<T>  | void accept(T t, long value)   | 객체 T와 long 값을 받아 소비   |

```java
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.DoubleConsumer;
import java.util.function.ObjIntConsumer;

public class ConsumerExample {
  public static void main(String[] args) {
    Consumer<String> consumer = t -> System.out.println(t + "8");
    consumer.accept("Java");

    BiConsumer<String, String> bigConsumer = (t, u) -> System.out.println(t + u);
    bigConsumer.accept("Java", "8");

    DoubleConsumer doubleConsumer = d -> System.out.println("Java" + d);
    doubleConsumer.accept(8.0);

    ObjIntConsumer<String> objIntConsumer = (t, i) -> System.out.println(t + i);
    consumer.accept("Java", 8);
  }
}

/*
Java8
Java8
Java8.0
Java8
*/
```

<br>
<br>

## Supplier 함수적 인터페이스

- 특징 : 매개 변수가 없고 리턴값이 있는 `get()` 메소드를 가지고 있음

|  인터페이스명   | 추상 메소드            | 설명            |
| :-------------: | :--------------------- | :-------------- |
|  Supplier\<T>   | T get()                | T 객체 리턴     |
| BooleanSupplier | boolean getAsBoolean() | boolean 값 리턴 |
| DoubleSupplier  | double getAsDouble()   | double 값 리턴  |
|   IntSupplier   | int getAsInt()         | int 값 리턴     |
|  LongSupplier   | long getAsLong()       | long 값 리턴    |

```java
import java.util.function.IntSupplier;

public class SupplierExample {
  public static void main(String[] args) {
    IntSupplier is = () -> {
      int num = (int) (Math.random() * 6) + 1;
      return num;
    };

    int num = is.getAsInt();
  }
}
```

<br>
<br>

## Function 함수적 인터페이스

- 특징 : 매개값과 리턴값이 있는 `apply()` 메소드를 가지고 있음
  - `apply()`는 매개값을 리턴값으로 매핑하는 역할을 수행

|       인터페이스명        | 추상 메소드                      | 설명                      |
| :-----------------------: | :------------------------------- | :------------------------ |
|      Function\<T, R>      | R apply(T t)                     | 객체 T를 객체 R로 매핑    |
|   BiFunction\<T, U, R>    | R apply(T t, U u)                | 객체 T, U를 객체 R로 매핑 |
|    DoubleFunction\<R>     | R apply(double value)            | double을 객체 R로 매핑    |
|      IntFunction\<R>      | R apply(int value)               | int를 객체 R로 매핑       |
|    IntToDoubleFunction    | double applyAsDouble(int value)  | int를 double로 매핑       |
|     IntToLongFunction     | long applyAsLong(int value)      | int를 long으로 매핑       |
|   LongToDoubleFunction    | double applyAsDouble(long value) | long을 double로 매핑      |
|     LongToIntFunction     | int applyAsInt(long value)       | long을 int로 매핑         |
| ToDoubleBiFunction\<T, U> | double applyAsDouble(T t, U u)   | 객체 T, U를 double로 매핑 |
|   ToDoubleFunction\<T>    | double applyAsDouble(T t)        | 객체 T를 double로 매핑    |
|  ToIntBiFunction\<T, U>   | int applyAsInt(T t, U u)         | 객체 T, U를 int로 매핑    |
|     ToIntFunction\<T>     | int applyAsInt(T t)              | 객체 T를 int로 매핑       |
|  ToLongBiFunction\<T, U>  | long applyAsLong(T t, U u)       | 객체 T, U를 long으로 매핑 |
|    ToLongFunction\<T>     | long applyAsLong(T t)            | 객체 T를 long으로 매핑    |

```java
public class Student {
  private String name;
  private int englishScore;
  private int mathScore;

  public Student(String name, int englishScore, int mathScore) {
    this.name = name;
    this.englishScore = englishScore;
    this.mathScore = mathScore;
  }

  public String getName() { return name; }
  public int getEnglishScore() { return englishScore; }
  public int getMathScore() { return mathScore; }
}
```

```java
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.function.ToIntFunction;

public class FunctionExample1 {
  private static List<Student> list = Arrays.asList(
    new Student("남궁민", 90, 96);
    new Student("로코", 95, 93);
  );

  public static void printString(Function<Student, String> function) {
    for (Student student : list) {
      System.out.print(function.apply(student) + " ");
    }
    System.out.println();
  }

  public static void printInt(ToIntFunction<Student> function) {
    for (Student student : list) {
      System.out.print(function.applyAsInt(student) + " ");
    }
    System.out.println();
  }

  public static double avg(ToIntFunction<Student> function) {
    int sum = 0;
    for (Student student : list) {
      sum += function.applyAsInt(student);
    }
    double avg = (double) sum / list.size();
    return avg;
  }

  public static void main(String[] args) {
    System.out.println("[학생 이름]");
    printString(t -> t.getName());

    System.out.println("[영어 점수]");
    printInt(t -> t.getEnglishScore());

    System.out.println("[수학 점수]");
    printInt(t -> t.getMathScore());

    double englishAvg = avg(s -> s.getEnglishScore());
    System.out.println("영어 평균 점수 : " + englishAvg);

    double mathAvg = avg(s -> s.getMathScore());
    System.out.println("수학 평균 점수 : " + mathAvg);
  }
}
```

<br>
<br>

## Operator 함수적 인터페이스

- 특징 : Function과 동일하게 매개 변수와 리턴값이 있는 `apply()` 메소드를 가지고 있음
  - Operator의 `apply()`는 매개값을 이용해서 연산을 수행한 후 동일한 타입으로 리턴값을 제공하는 역할 수행

|     인터페이스명     | 추상 메소드                          | 설명                     |
| :------------------: | :----------------------------------- | :----------------------- |
|  BinaryOperator\<T>  | T apply(T, T)                        | T와 T를 연산한 후 T 리턴 |
|  UnaryOperator\<T>   | T apply(T)                           | T를 연산한 후 T 리턴     |
| DoubleBinaryOperator | double applyAsDouble(double, double) | 2개의 double 연산        |
| DoubleUnaryOperator  | double applyAsDouble(double)         | 1개의 double 연산        |
|  IntBinaryOperator   | int applyAsInt(int, int)             | 2개의 int 연산           |
|   IntUnaryOperator   | int applyAsInt(int)                  | 1개의 int 연산           |
|  LongBinaryOperator  | long applyAsLong(long, long)         | 2개의 long 연산          |
|  LongUnaryOperator   | long applyAsLong(long)               | 1개의 long 연산          |

```java
import java.util.function.IntBinaryOperator;

public class OperatorExample {
  private static int[] scores = { 92, 95, 87 };

  public static int maxOrMin(IntBinaryOperator operator) {
    int result = scores[0];
    for (int score : scores) {
      result = operator.applyAsInt(result, score);
    }
    return result;
  }

  public static void main(String[] args) {
    int max = maxOrMin(
      (a, b) -> {
        if (a >= b) return a;
        else return b;
      }
    );
    System.out.println("최대값 : " + max);

    int min = maxOrMin(
      (a, b) -> {
        if (a <= b) return a;
        else return b;
      }
    );
    System.out.println("최소값 : " + min);
  }
}
```
