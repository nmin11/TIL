# 람다식

자바는 객체 지향 프로그래밍이 개발의 주된 패러다임이었던 90년대에 디자인되었다. 객체 지향 프로그래밍 이전에도 함수적 프로그래밍 언어들이 있었는데, 현업에서 큰 호응을 받지 못했다.  
그러나 최근 들어 함수적 프로그래밍이 다시 각광받고 있는데, 병렬 처리와 이벤트 지향 프로그래밍에 적합하기 때문이다. 그래서 객체 지향 프로그래밍과 함수적 프로그래밍을 혼합함으로써 더욱 효율적인 프로그래밍이 될 수 있도록 프로그램 개발 언어의 양상이 변하고 있다.  
자바는 함수적 프로그래밍을 위해 람다식(Lambda Expressions)을 지원하면서 기존의 코드 패턴이 많이 달라졌다. 람다식은 수학자 Alonzo Church가 발표한 람다 계산법에서 사용된 식으로 이를 제자 John McCarthy가 프로그래밍 언어에 도입했다.  
람다식은 익명함수를 생성하기 위한 식으로 객체 지향 언어보다 함수 지향 언어에 가깝다. 자바에서 함수 지향 언어인 람다식을 수용한 이유는 자바 코드가 매우 간결해지고, 컬렉션의 요소를 필터링하거나 매핑해서 원하는 결과를 쉽게 집계할 수 있기 때문이다. 람다식의 형태는 매개변수를 가진 코드 블록이지만, 런타임 식에는 익명 구현 객체를 생성한다.

```java
Runnable runnable = () -> {};
```

람다식은 (매개변수) -> {실행코드} 형태로 작성되는데, 마치 함수 정의 형태를 띠고 있지만 런타임 시에 인터페이스의 익명 구현 객체로 생성된다. 어떤 인터페이스를 구현할 것인가는 대입되는 인터페이스가 무엇이냐에 달려있다.

</br>

## 람다식 기본 문법

```java
// 1. 기본 작성
(타입 매개변수, ...) -> {실행문; ... }

// 2. 매개변수가 1개 일 때
매개변수 -> 실행문;

// 3. 매개변수가 2개 이상이고, 리턴문만 존재할 때는 리턴문을 생략
(매개변수1, 매개변수2) -> 리턴문;

// 4. 매개변수가 2개 이상이고, 실행문을 실행하고 결과값을 리턴할 경우
(매개변수1, 매개변수2) -> { 실행문; ... };
```

'->' 기호는 매개변수를 이용해서 중괄호 {} 실행 블록을 실행한다는 뜻으로 해석하면 된다. 또한, 매개변수의 타입은 런타임 시에 대입되는 값에 따라 자동으로 인식될 수 있기 때문에 람다식에서는 매개변수의 타입을 일반적으로 언급하지 않는다.  
그리고 하나의 매개변수만 있다면 2번 예시와 같이 () 괄호를 생략할 수 있고, 하나의 실행문만 있다면 중괄호 {} 역시 생략이 가능하다. 그러나 만약 매개변수가 없다면 람다식에서 매개변수 자리가 사라지므로 () -> {실행문; ...}의 형태로 빈 괄호 ()를 반드시 사용해야 한다.

</br>

## 타겟 타입과 함수적 인터페이스

그렇다면 어떤 타겟 타입에서 람다식을 사용할 수 있을까? 람다식이 하나의 메소드를 정의하기 때문에 두 개의 추상 메소드가 선언된 인터페이스는 람다식을 이용해서 구현 객체를 생성할 수 없다. 따라서 하나의 추상 메소드가 선언된 인터페이스만이 람다식의 타겟 타입이 될 수 있는데, 이러한 인터페이스를 함수적 인터페이스(functional interface)라고 한다. 함수적 인터페이스를 작성할 때, 두 개 이상의 추상 메소드가 선언되지 않도록 컴파일러가 체크해주는 기능이 있는데 인터페이스 선언 시, @FunctionalInterface 어노테이션을 붙이면 된다. 이 어노테이션은 두 개 이상의 추상 메소드가 선언되면 컴파일 에러를 발생시킨다.

```java
@FunctionalInterface
public interface MyFunctionalInterface {
    public void method();
	//public void otherMethod();
	// -> Invalid '@FunctionalInterface' annotation; MyFunctionalInterface is not a functional interface
}
```

@FunctionalInterface 어노테이션은 선택사항이다. 이 어노테이션이 없더라도 하나의 추상 메소드만 있다면 모두 함수적 인터페이스이다. 그러나 실수로 두 개 이상의 추상 메소드를 선언하는 것을 방지하고 싶다면 붙여주는 것이 좋다. 람다식은 타겟 타입인 함수적 인터페이스가 가지고 있는 추상 메소드의 선언 형태에 따라서 작성 방식이 달라진다. 이를 자세하게 알아보도록 하자.

</br>

### 매개변수와 반환값이 없는 람다식

```java
@FunctionalInterface
public interface MyFunctionalInterface {
   public void method();
}
```

이 함수적 인터페이스는 매개변수와 반환값이 없다. 매개변수가 없는 이유는 method()가 매개변수를 가지지 않기 때문이다. 이 인터페이스를 타겟 타입으로 갖는 람다식은 다음과 같은 형태로 작성해야 한다.

```java
MyFunctionalInterface funcInter = () -> { ... };

//funcInter.method();
```

람다식이 대입된 인터페이스의 참조 변수는 위 코드 중의 주석 부분과 같이 method()를 호출할 수 있다. method()의 호출은 람다식의 중괄호 {}를 실행시킨다.  
매개변수와 반환값이 없는 경우의 람다식을 좀 더 활용하면 다음과 같이 사용할 수 있다.

```java
public class MyFunctionalInterfaceExample {
   public static void main(String[] args) throws Exception {
      MyFunctionalInterface funcInter;
      funcInter = () -> {
         String str = "Calling Method, First";
         System.out.println(str);
      };
      funcInter.method();

      funcInter = () -> System.out.println("Calling method, Second");
         //실행문이 하나라면 중괄호 { }는 생략 가능
      funcInter.method();
   }
}

/*
Calling Method, First
Calling method, Second
*/
```

</br>

### 매개변수가 있는 람다식

```java
@FunctionalInterface
public interface MyFunctionalInterface {
   public void method(int x);
}
```

```java
public class MyFunctionalInterfaceExample {
   public static void main(String[] args) throws Exception {
      MyFunctionalInterface funcInter;
      funcInter = (x) -> {
         int result = x * 5;
         System.out.println(result);
      };
      funcInter.method(2);

      funcInter = (x) -> System.out.println(x*5);
      funcInter.method(2);
   }
}
```

</br>

### 반환값이 있는 람다식

```java
@FunctionalInterface
public interface MyFunctionalInterface {
   public void method(int x, int y);
}
```

```java
public class MyFunctionalInterfaceExample {
   public static void main(String[] args) throws Exception {
      MyFunctionalInterface funcInter;
      funcInter = (x, y) -> {
         int result = x + y;
         return result;
      };
      int res1 = funcInter.method(2, 5);
      System.out.println(res1);
		//7

      funcInter = (x,y) -> { return x + y; };
      int res2 = funcInter.method(2,5);
      System.out.println(res2);
		//7

      funcInter = (x,y) ->  x + y;
		//return문 만 있을 경우, 중괄호 {}와 return문 생략가능
      int res3 = funcInter.method(2,5);
      System.out.println(res3);
		//7

      funcInter = (x,y) -> sum(x, y);
		//return문 만 있을 경우, 중괄호 {}와 return문 생략가능
      int res4 = funcInter.method(2,5);
      System.out.println(res4);
		//7

   }

   public static int sum(int x, int y){
      return x + y;
   }
}
```

</br>
</br>

# 표준 API의 함수적 인터페이스

자바에서 제공되는 표준 API에서 한 개의 추상 메소드를 가지는 인터페이스들은 모두 람다식을 이용해서 익명 구현 객체로 표현할 수 있다. 자바에서는 빈번하게 사용되는 함수적 인터페이스는 java.util.function 표준 API 패키지로 제공한다. 이 패키지에서 제공하는 함수적 인터페이스의 목적은 메소드 또는 생성자의 매개 타입으로 사용되어 람다식을 대입할 수 있도록 하기 위해서이다.  
java.util.function 패키지의 함수적 인터페이스는 크게 Consumer, Supplier, Function, Operator, Predicate로 구분된다. 이 구분 기준은 인터페이스에 선언된 추상 메소드의 매개값과 반환값의 유무이다.

|   종류    | 추상 메소드 특징                                                           |
| :-------: | :------------------------------------------------------------------------- |
| Consumer  | 매개값은 있고 반환값은 없음                                                |
| Supplier  | 매개값은 없고 반환값은 있음                                                |
| Function  | 매개값도 있고 반환값도 있음, 주로 매개값을 반환값으로 매핑(타입 변환)      |
| Operator  | 매개값도 있고 반환값도 있음, 주로 매개값을 연산하고 결과 반환              |
| Predicate | 매개값은 있고 반환 타입은 boolean, 매개값을 조사해서 boolean 타입으로 반환 |

</br>

## Consumer 함수적 인터페이스

Consumer 함수적 인터페이스의 특징은 반환값이 없는 accept() 메소드를 가지고 있다. accept() 메소드는 단지 매개값을 소비하는 역할만 한다.

|     인터페이스 명      |          추상 메소드           | 설명                           |
| :--------------------: | :----------------------------: | :----------------------------- |
|     Consumer< T >      |        void accept(T t)        | 객체 T를 받아 소비             |
|   BiConsumer< T, U >   |     void accept(T t, U u)      | 객체 T와 U를 받아 소비         |
|     DoubleConsumer     |   void accept(double value)    | double 값을 받아 소비          |
|      IntConsumer       |     void accept(int value)     | int 값을 받아 소비             |
|      LongConsumer      |    void accept(long value)     | long 값을 받아 소비            |
| ObjDoubleConsumer< T > | void accept(T t, double value) | 객체 T와 double 값을 받아 소비 |
|  ObjIntConsumer< T >   |  void accept(T t, int value)   | 객체 T와 int 값을 받아 소비    |
|  ObjLongConsumer< T >  |  void accept(T t, long value)  | 객체 T와 long 값을 받아 소비   |

Consumer 인터페이스를 타겟 타입으로 하는 람다식과 Consumer 인터페이스를 사용하는 예제는 다음과 같다.

```java
Consumer<String> consumer = t -> {t를 소비하는 실행문;};

BiConsumer<String, String> consumer = (t, u) -> {t와 u를 소비하는 실행문;};

DoubleConsumer consumer = d -> {d를 소비하는 실행문;};

ObjIntConsumer<String> consumer = (t, i) -> {t와 i를 소비하는 실행문;};
```

```java
public class ConsumerExample {
   public static void main(String[] args) throws Exception {
      Consumer<String> consumer = t -> System.out.println(t + " 재밌어요");
      consumer.accept("Java");

      BiConsumer<String, String> bigConsumer = (t, u) -> System.out.println(t + u);
      bigConsumer.accept("Java ", "재밌어요");

      DoubleConsumer doubleConsumer = d -> System.out.println("Java" + d);
      doubleConsumer.accept(11.0);

      ObjIntConsumer<String> objIntConsumer = (t, i) -> System.out.println(t + i);
      objIntConsumer.accept("Java", 11);
   }
}
```

</br>

## Supplier 함수적 인터페이스

Supplier 함수적 인터페이스의 특징은 매개변수가 없고 반환값이 있는 getOOO() 메소드를 가진다는 점이다. 이 메소드들은 실행 후 호출한 곳으로 데이터를 반환(공급)하는 역할을 한다.

|  인터페이스 명  |      추상 메소드       |       설명        |
| :-------------: | :--------------------: | :---------------: |
|  Supplier< T >  |        T get()         |   T 객체를 반환   |
| BooleanSupplier | boolean getAsBoolean() | boolean 값을 반환 |
| DoubleSupplier  |  double getAsDouble()  | double 값을 반환  |
|   IntSupplier   |     int getAsInt()     |   int 값을 반환   |
|  LongSupplier   |    long getAsLong()    |  long 값을 반환   |

Supplier 인터페이스는 get() 메소드가 매개값을 가지지 않으므로 람다식도 빈 괄호 ()를 사용한다. 그리고 람다식의 중괄호 {}는 반드시 한 개의 T 객체를 반환하도록 해야 한다.

```java
Supplier<String> supplier = () -> { ...; return "문자열";};
```

```java
public class SupplierExample {
   public static void main(String[] args) throws Exception {
      Supplier<String> supplier = () -> "Hello World!";
      System.out.println(supplier.get());
   }
}
```

</br>

## Function 함수적 인터페이스

Function 함수적 인터페이스의 특징은 매개값과 반환값이 있는 applyOOO() 메소드를 가지고 있다는 점이다. 이 메소드들은 매개값을 반환값으로 매핑(타입 변환)하는 역할을 한다.

| 인터페이스 명              | 추상 메소드                      | 설명                       |
| :------------------------- | :------------------------------- | :------------------------- |
| Function< T, R >           | R apply(T t)                     | 객체 T를 객체 R로 매핑     |
| BiFunction< T, U, R >      | R apply(T t, U u)                | 객체 T와 U를 객체 R로 매핑 |
| DoubleFunction< R >        | R apply(double value)            | double을 객체 R로 매핑     |
| IntFunction< R >           | R apply(int value)               | int를 객체 R로 매핑        |
| IntToDoubleFunction        | double applyAsDouble(int value)  | int를 double로 매핑        |
| IntToLongFunction          | long applyAsLong(int value)      | int를 long으로 매핑        |
| LongToDoubleFunction       | double applyAsDouble(long value) | long을 double로 매핑       |
| LongToIntFunction          | int applyAsInt(long value)       | long을 int로 매핑          |
| ToDoubleBiFunction< T, U > | double applyAsDouble(T t, U u)   | 객체 T와 U를 double로 매핑 |
| ToDoubleFunction< T >      | double applyAsDouble(T t)        | 객체 T를 double로 매핑     |
| ToIntBiFunction< T >       | int applyAsInt(T t, U u)         | 객체 T와 U를 Int로 매핑    |
| ToIntFunction< T >         | int applyAsInt(T t)              | 객체 T를 int로 매핑        |
| ToLongBiFunction< T >      | long applyAsLong(T t, U u)       | 객체 T와 U를 long으로 매핑 |
| ToLongFunction< T >        | long applyAsLong(T t)            | 객체 T를 long으로 매핑     |

다음은 Function< T, R > 인터페이스를 타겟 타입으로 하는 람다식 작성 방법이다.

```java
Function<Student, String> function = t -> {return t.getName();};
//or
Function<Student, String> function = t -> t.getName();

ToIntFunction<Student> function = t -> {return t.getScore();};
//or
ToIntFunction<Student> function = t -> t.getScore();
```

위 인터페이스를 활용해서 List에 저장된 학생 객체를 하나씩 꺼내서 이름과 점수를 출력해보자.

```java
//Student.java
public class Student {
   private String name;
   private int englishScore;
   private int mathScore;

   public Student(String name, int englishScore, int mathScore) {
      this.name = name;
      this.englishScore = englishScore;
      this.mathScore = mathScore;
   };

   public String getName() {
      return name;
   }

   public int getEnglishScore() {
      return englishScore;
   }

   public int getMathScore() {
      return mathScore;
   }
}

//FunctionExample.java
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.function.ToIntFunction;

public class App {

   private static List<Student> list = Arrays.asList(
      new Student("김코딩", 100, 100),
      new Student("이자바", 90, 90));

   public static void printString(Function<Student, String> function) {
      for (Student student : list) {
         System.out.println(function.apply(student) + " ");
			//람다식 실행
      }
      System.out.println("\n");
   }

   public static void printInt(ToIntFunction<Student> function) {
      for (Student student : list) {
         System.out.println(function.applyAsInt(student) + " ");
			//람다식 실행
      }
      System.out.println("\n");
   }

   public static void main(String[] args) throws Exception {
      System.out.println("학생이름");
      printString(t -> t.getName());

      System.out.println("영어점수");
      printInt(t -> t.getEnglishScore());

      System.out.println("수학점수");
      printInt(t -> t.getMathScore());
   }
}
```

printString() 메소드는 Function<ㅠ Student, String > 매개변수를 가지고 있고 printInt() 메소드는 ToIntFunction 매개변수를 가지고 있으므로 이 메소드들을 호출할 때 매개값으로 람다식을 사용할 수 있다.

</br>

## Operator 함수적 인터페이스

Operator 함수적 인터페이스는 Function과 동일하게 매개변수와 반환값이 있는 applyOOO() 메소드를 가지고 있다. 하지만 이 메소드들은 매개값을 이용해서 연산을 수행한 후 동일한 타입으로 반환값을 제공하는 역할을 한다.

| 인터페이스 명        | 추상 메소드                          | 설명                     |
| :------------------- | :----------------------------------- | :----------------------- |
| BinaryOperator< T >  | T apply(T t)                         | T와 T를 연산한 후 T 반환 |
| UnaryOperator< T >   | T apply(T t)                         | T를 연산한 후 T 반환     |
| DoubleBinaryOperator | double applyAsDouble(double, double) | 두 개의 double 연산      |
| DoubleUnaryOperator  | double applyAsDouble(double)         | 한 개의 double 연산      |
| IntBinaryOperator    | int applyAsInt(int, int)             | 두 개의 int 연산         |
| IntUnaryOperator     | int applyAsInt(int)                  | 한 개의 int 연산         |
| LongBinaryOperator   | long applyAsLong(long, long)         | 두 개의 long 연산        |
| LongUnaryOperator    | long applyAsLong(long)               | 한 개의 long 연산        |

IntBinaryOperator를 타겟 타입으로 하는 람다식은 다음과 같이 작성한다.  
applyAsInt() 메소드는 매개값으로 두 개의 int를 가지므로 람다식도 두 개의 int 매개변수를 사용한다. 그리고 applyAsInt() 메소드의 반환타입이 int이므로 람다식의 중괄호 반환값도 int가 된다.

```java
IntBinaryOperator operator = (a,b) -> { ...; return int값; };
```

다음은 int[] 배열에서 최댓값과 최솟값을 얻는 예제이다.

```java
public class App {
   private static int[] scores = { 93, 45, 77, 89 };

   public static int maxOrMin(IntBinaryOperator op) {
      int result = scores[0];
      for (int score : scores) {
         result = op.applyAsInt(result, score);
      }
      return result;
    }

   public static void main(String[] args) throws Exception {
      //최대값 얻기
      int max = maxOrMin(
         (a, b) -> {
            if (a >= b)
               return a;
            else
               return b;
         }
      );
      System.out.println("max  : " + max);

      //최소값 얻기
      int min = maxOrMin(
         (a, b) -> {
            if (a < b)
               return a;
            else
               return b;
         }
      );
      System.out.println("min : " + min);
   }
}
```

</br>

## Predicate 함수적 인터페이스

Predicate 함수적 인터페이스는 매개변수와 boolean 반환값이 있는 testOOO() 메소드를 가지고 있다. 이 메소드들은 매개값을 조사해서 true 또는 false를 반환한다.

|    인터페이스 명    |        추상 메소드         |          설명          |
| :-----------------: | :------------------------: | :--------------------: |
|   Predicate< T >    |     boolean test(T t)      |     객체 T를 조사      |
| BiPredicate< T, U > |   boolean test(T t, U u)   | 객체 T와 U를 비교 조사 |
|   DoublePredicate   | boolean test(double value) |    double 값을 조사    |
|    IntPredicate     |  boolean test(int value)   |     int 값을 조사      |
|    LongPredicate    |  boolean test(long value)  |     long 값을 조사     |

다음 예재는 List에 저장된 성별에 따른 학생들의 평균 점수를 출력한다.

```java
Predicate<Student> predicate = t -> { return t.getGender().eqauls("여성"); };
//or
Predicate<Student> predicate = t -> t.getGender().equals("여성");
```

```java
public class App {
   private static List<Student> list = Arrays.asList(
      new Student("김코딩", 80, "남성"),
      new Student("이자바", 87, "여성"),
      new Student("김인기", 95, "남성"),
      new Student("최한나", 99, "여성")
   );

   public static double avg(Predicate<Student> predicate) {
      int count = 0;
      int sum = 0;

      for (Student student : list) {
         if (predicate.test(student)) {
            count++;
            sum += student.getScore();
         }
      }
      return (double) sum / count;
   };
   public static void main(String[] args) throws Exception {
      double maleAvg = avg(t -> t.getGender().equals("남성"));
      System.out.println("남학생 평균 점수 : " + maleAvg);

      double femaleAvg = avg(t -> t.getGender().equals("여성"));
      System.out.println("여학생 평균 점수 : " + femaleAvg);
   }
}

/*
남학생 평균 점수 : 87.5
여학생 평균 점수 : 93.0
*/
```

</br>

## andThen()과 compose() 디폴트 메소드

디폴트 및 정적 메소드는 추상 메소드가 아니기 때문에 함수적 인터페이스에 선언되어도 여전히 함수적 인터페이스 성질을 잃지 않는다. 여기서 함수적 인터페이스 성질이란, 하나의 추상 메소드를 가지고 있고, 람다식으로 익명 구현 객체를 생성할 수 있는 것을 의미한다. java.util.function 패키지의 함수적 인터페이스는 하나 이상의 디폴트 및 정적 메소드를 가지고 있다.  
Consumer, Function, Operator 종류의 함수적 인터페이스는 andThen()과 compose() 디폴트 메소드를 가지고 있다. andThen()과 compose() 디폴트 메소드는 두 개의 함수적 인터페이스를 순차적으로 연결하고, 첫 번째 처리 결과를 두 번째 매개값으로 제공해서 최종 결과값을 얻을 때 사용한다. 두 메소드의 차이점은 어떤 함수적 인터페이스부터 먼저 처리하느냐이다.  
andThen()부터 살펴보도록 하자.

```java
인터페이스AB = 인터페이스A.andThen(인터페이스B);
결과 = 인터페이스AB.method();
```

인터페이스 AB의 method()를 호출하면 우선 인터페이스 A부터 처리하고 결과를 인터페이스 B의 매개값으로 제공한다. 인터페이스 B는 제공받은 매개값을 가지고 처리한 후 최종 결과를 반환한다.  
</br>
다음은 compose를 살펴보도록 하자.

```java
인터페이스AB = 인터페이스A.compose(인터페이스B);
결과 = 인터페이스AB.method();
```

인터페이스 AB의 method()를 호출하면 우선 인터페이스 B부터 처리하고 결과를 인터페이스 A의 매개값으로 제공한다. 인터페이스는 제공받은 매개값을 가지고 처리한 후 최종 결과를 반환한다.  
</br>
다음은 andThen(), compose() 디폴트 메소드를 제공하는 java.util.function 패키지의 함수적 인터페이스들이다.

|   종류   |   함수적 인터페이스   | andThen() | compose() |
| :------: | :-------------------: | :-------: | :-------: |
| Consumer |     Consumer< T >     |     O     |           |
|    ·     |  BiConsumer< T, U >   |     O     |           |
|    ·     |    DoubleConsumer     |     O     |           |
|    ·     |      IntConsumer      |     O     |           |
|    ·     |     LongConsumer      |     O     |           |
| Function |   Function< T, R >    |     O     |     O     |
|    ·     | BiFunction< T, U, R > |     O     |           |
| Operator |  BinaryOperator< T >  |     O     |           |
|    ·     |  DoubleUnaryOperator  |     O     |     O     |
|    ·     |   IntUnaryOperator    |     O     |     O     |
|    ·     |   LongUnaryOperator   |     O     |     O     |

</br>

### Consumer의 순차적 연결

Consumer 종류의 함수적 인터페이스는 처리 결과를 반환하지 않기 때문에 andThen() 디폴트 메소드는 함수적 인터페이스의 호출 순서만 정한다.  
예제를 통해서 이해해보도록 하자.

```java
//Member.java
public class Member {
   private String name;
   private String id;
   private Address address;

   public Member(String name, String id, Address address) {
      this.name = name;
      this.id = id;
      this.address = address;
   }

   public String getName() {
      return name;
   }

   public String getId() {
      return id;
   }

   public Address getAddress() {
      return address;
   }
}

//Address.java
public class Address {
   private String country;
   private String city;

   public Address(String country, String city) {
      this.country = country;
      this.city = city;
   }

   public String getCountry() {
      return country;
   }

   public String getCity() {
      return city;
   }
}

//ConsumerAndThen.java
import java.util.function.Consumer;

public class ConsumerAndThen {
   public static void main(String[] args) throws Exception {
      Consumer<Member> consumerA = (m) -> {
         System.out.println("consumerA : " + m.getName());
      };

      Consumer<Member> consumerB = (m) -> {
         System.out.println("consumerB : " + m.getId());
      };

      Consumer<Member> consumerAB = consumerA.andThen(consumerB);
      consumerAB.accept(new Member("김코딩", "1", null));
   }
}

/*
consumerA : 김코딩
consumerB : 1
*/
```

위 예제는 인터페이스 두 개를 순차적으로 연결해서 실행한다. 첫 번째 Consumer는 이름을 출력하고, 두 번째 Consumer는 아이디를 출력한다.

</br>

### Function의 순차적 연결

Function과 Operator 종류의 함수적 인터페이스는 먼저 실행한 함수적 인터페이스의 결과를 다음 함수적 인터페이스의 매개값으로 넘겨주고, 최종 처리 결과를 반환한다. 다음 예시를 보도록 하자.

```java
public class FunctionAndThenCompose {
   public static void main(String[] args) throws Exception {
      Function<Member, Address> functionA;
      Function<Address, String> functionB;
      Function<Member, String> functionAB;
      String city;

      functionA = (m) -> m.getAddress();
      functionB = (a) -> a.getCity();

      functionAB = functionA.andThen(functionB);
      city = functionAB.apply(new Member("김코딩", "1", new Address("한국", "서울")));
      System.out.println("거주도시 : " + city);

      functionAB = functionB.compose(functionA);
      city = functionAB.apply(new Member("김코딩", "1", new Address("한국", "서울")));
      System.out.println("거주도시 : " + city);
   }
}

/*
거주도시 : 서울
거주도시 : 서울
*/
```

위 코드는 Function< Member, Address >와 Function< Address, String >을 순차적으로 연결해서 Function< Member, String >을 생성한다. Address는 두 함수적 인터페이스 간의 전달 데이터 역할을 한다. Address는 내부적으로 전달되기 때문에 최종 함수적 인터페이스의 형태는 입력데이터가 Member, 출력데이터가 String이 되는 <ㅠ Member, String >이 된다.

</br>

## and(), or(), negate() 디폴트 메소드와 isEqual() 정적 메소드

Predicate 종류의 함수적 인터페이스는 and(), or(), negate() 디폴트 메소드를 가지고 있다. 이 메소드들은 각각 논리 연산자인 &&, ||, ! 하고 대응된다고 볼 수 있다.  
다음 예제에서는 2의 배수와 3의 배수를 조사하는 두 Predicate를 논리 연산한 새로운 Predicate를 생성한다.

```java
import java.util.function.IntPredicate;

public class AndOrNegateExample {
   public static void main(String[] args) throws Exception {
      IntPredicate predicateA = a -> a % 2 == 0;
      IntPredicate predicateB = b -> b % 3 == 0;

      IntPredicate predicateAB;
      boolean result;

      predicateAB = predicateA.and(predicateB);
      result = predicateAB.test(9);
      System.out.println("9는 2와 3의 배수입니까? " + result);

      predicateAB = predicateA.or(predicateB);
      result = predicateAB.test(9);
      System.out.println("9는 2 또는 3의 배수입니까? " + result);

      predicateAB = predicateA.negate();
      result = predicateAB.test(9);
      System.out.println("9는 홀수입니까? " + result);

   }
}

/*
9는 2와 3의 배수입니까? false
9는 2 또는 3의 배수입니까? true
9는 홀수입니까? true
*/
```

Predicate 함수적 인터페이스는 and(), or, negate() 디폴트 메소드 이외에 isEqual() 정적 메소드를 추가로 제공한다.  
isEqual() 메소드는 test() 매개값인 sourceObject와 isEqual()의 매개값인 targetObject를 java.util.Objects 클래스의 equals()의 매개값으로 제공하고, Objects.equals(sourceObject, targetObject)의 반환값을 얻어 새로운 Predicate를 생성한다.  
Objects.equal(sourceObject, targetObject)은 다음과 같은 반환값을 제공한다.

| sourceObject | targetObject |                   반환값                   |
| :----------: | :----------: | :----------------------------------------: |
|     null     |     null     |                    true                    |
|   not null   |     null     |                   false                    |
|     null     |   not null   |                   false                    |
|   not null   |   not null   | sourceObject.equals(targetObject)의 반환값 |

</br>
</br>

# 메소드 참조

메소드 참조는 말 그대로 메소드를 참조해서 매개변수의 정보 및 반환 타입을 알아내어 람다식에서 불필요한 매개변수를 제거하는 것이 목적이다.람다식은 종종 기존 메소드를 단순히 호출만 하는 경우가 많다. 다음 예시코드는 두 개의 값을 받아 큰 수를 반환하는 Math 클래스의 max() 정적 메소드를 호출하는 람다식이다.

```java
(left, right) -> Math.max(left, right);
```

람다식은 단순히 두 개의 값을 Math.max() 메소드의 매개값으로 전달하는 역할만 하기 때문에 다소 불편해 보인다. 이럴 경우 다음과 같이 메소드 참조를 이용하면 매우 깔끔하게 처리할 수 있다.

```java
Math :: max;
```

메소드 참조도 람다식과 마찬가지로 인터페이스의 익명 구현 객체로 생성되므로 타겟 타입인 인터페이스의 추상 메소드가 어떤 매개변수를 가지고, 반환 타입이 무엇인가에 따라 달라진다.  
IntBinaryOperator 인터페이스는 두 개의 int 매개값을 받아 int 값을 반환하므로, Math :: max 메소드 참조를 대입할 수 있다.

```java
IntBinaryOperator operato = Math :: max;
```

</br>

## 정적 메소드와 인스턴스 메소드 참조

정적 메소드를 참조할 경우에는 클래스 이름 뒤에 :: 기호를 붙이고 정적 메소드 이름을 기술하면 된다.

```java
클래스 :: 메소드
```

인스턴스 메소드의 경우에는 먼저 객체를 생성한 다음 참조 변수 뒤에 :: 기호를 붙이고 인스턴스 메소드 이름을 기술하면 된다.

```java
참조 변수 :: 메소드
```

다음 예제는 Calculator의 정적 및 인스턴스 메소드를 참조한다.

```java
//Calculator.java
public class Calculator {
   public static int staticMethod(int x, int y) {
      return x + y;
   }

   public int instanceMethod(int x, int y) {
      return x * y;
   }
}

public class MethodReferences {
   public static void main(String[] args) throws Exception {
      IntBinaryOperator operator;

      //static method
      operator = Calculator::staticMethod;
      System.out.println("정적메소드 결과 : " + operator.applyAsInt(3, 5));

      //instance method
      Calculator calculator = new Calculator();
      operator = calculator::instanceMethod;
      System.out.println("인스턴스 메소드 결과 : "+ operator.applyAsInt(3, 5));
   }
}
/*
정적메소드 결과 : 8
인스턴스 메소드 결과 : 15
*/
```

</br>

## 매개변수의 메소드 참조

메소드는 람다식 외부의 클래스 멤버일 수도 있고, 람다식에서 제공되는 매개변수의 멤버일 수도 있다. 이전 예제는 람다식 외부의 클래스 멤버인 메소드를 호출했다. 그러나 다음과 같이 람다식에서 제공되는 a 매개변수의 메소드를 호출해서 b 매개변수를 매개값으로 사용하는 경우도 있다.

```java
(a,b) -> {a.instanceMethod(b);};
```

이것을 메소드 참조로 표현하면 다음과 같다. a 클래스 이름 뒤에 :: 기호를 붙이고 메소드 이름을 기술하면 된다. 작성 방법은 정적 메소드 참조와 동일하지만 a의 인스턴스 메소드가 참조되므로 전혀 다른 코드가 실행된다.

```java
클래스 :: instanceMethod
```

</br>

## 생성자 참조

메소드 참조는 생성자 참조도 포함한다. 생성자를 참조한다는 것은 객체 생성을 의미한다. 단순히 메소드 호출로 구성도니 람다식을 메소드 참조로 대치할 수 있듯이, 단순히 객체를 생성하고 반환하도록 구성된 람다식은 생성자 참조로 대치 가능하다.

```java
(a,b) -> {return new 클래스(a,b);};
```

이 경우 생성자 참조로 표현하면 다음과 같다. 클래스 이름 뒤에 :: 기호를 붙이고 new 연산자를 기술하면 된다. 생성자가 오버로딩되어 여러 개가 있을 경우 컴파일러는 함수적 인터페이스의 추상 메소드와 동일한 매개변수 타입과 개수를 가지고 있는 생성자를 찾아 실행한다. 만약 해당 생성자가 존재하지 않으면 컴파일 오류가 발생한다.

```java
클래스 :: new
```

다음 예제는 생성자 참조를 이용해서 두 가지 방법으로 Member 객체를 생성한다. 하나는 Function< String, Member > 함수적 인터페이스의 Member apply(String) 메소드를 이용해서 Member 객체를 생성하고, 다른 하나는 BiFunction< String, String, Member > 함수적 인터페이스의 Member 객체를 생성된다.  
이 때 생성자 참조는 두 가지 방법 모두 동일하지만, 실행되는 Member 생성자가 다른 것을 확인할 수 있다.

```java
//Member.java
public class Member {
   private String name;
   private String id;

   public Member() {
      System.out.println("Member() 실행");
   }

   public Member(String id) {
      System.out.println("Member(String id) 실행");
      this.id = id;
   }

   public Member(String name, String id) {
      System.out.println("Member(String name, String id) 실행");
      this.id = id;
      this.name = name;
   }

   public String getName() {
      return name;
   }

   public String getId() {
      return id;
   }
}

public class ConstructorRef {
   public static void main(String[] args) throws Exception {
      Function<String, Member> function1 = Member::new;
      Member member1 = function1.apply("kimcoding");

      BiFunction<String, String, Member> function2 = Member::new;
      Member member2 = function2.apply("kimcoding", "김코딩");
   }
}

/*
Member(String id) 실행
Member(String name, String id) 실행
*/
```
