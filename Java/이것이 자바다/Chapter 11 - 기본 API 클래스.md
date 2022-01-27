# Java API Document

- API : Application Programming Interface
- API는 라이브러리라고 불리기도 하며, 프로그램 개발에 자주 사용되는 클래스 및 인터페이스의 모음을 뜻함
- 흔히 사용해 왔던 `String` 클래스나 `System` 클래스가 모두 API에 속하는 클래스
- API들은 `<JDK 설치 경로>/jre/lib/rt.jar` 경로에 있는 압축 파일에 저장되어 있음
- API Document 주소 : http://docs.oracle.com/javase/8/docs/api/
  - 예시 : `String` 클래스를 확인하고자 할 때,  
    좌측 상단 프레임에서 `java.lang`을 클릭하고 좌측 하단 프레임에서 `String`을 클릭하면  
    중앙 프레임에서 `String` 클래스에 대한 상세한 설명을 확인할 수 있음

<br>
<br>

# java.lang과 java.util 패키지

- Java Application을 개발할 때 공통적으로 많이 사용하는 패키지
  - `java.lang`
  - `java.util`
  - `java.time`

<br>
<br>

## java.lang 패키지

- Java 프로그램의 기본적인 클래스를 담고 있는 패키지
- `import` 없이 사용 가능

|                                      클래스                                      | 용도                                                                                                                               |
| :------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------- |
|                                      Object                                      | Java 클래스의 최상위 클래스로 사용                                                                                                 |
|                                      System                                      | 표준 입력 장치로부터 데이터를 입력받을 때<br>표준 출력 장치로 출력할 때<br>JVM을 종료시킬 때<br>Garbage Collector 실행을 요청할 때 |
|                                      Class                                       | 클래스를 메모리로 로딩할 때                                                                                                        |
|                                      String                                      | 문자열을 저장하고 여러 가지 정보를 얻을 때                                                                                         |
|                          StringBuffer \| StringBuilder                           | 문자열을 저장하고 내부 문자열을 조작할 때                                                                                          |
|                                       Math                                       | 수학 함수를 이용할 때                                                                                                              |
| Wrapper<br>(Byte, Short, Character,<br>Integer, Float, Double,<br>Boolean, Long) | 기본 타입의 데이터를 갖는 객체를 만들 때<br>문자열을 기본 타입으로 변환할 때<br>입력값을 검사할 때                                 |

<br>
<br>

## java.util 패키지

- Java 프로그램 개발에 조미료 같은 역할을 하는 클래스를 담고 있는 패키지
- Collection 클래스들이 대부분을 차지하고 있음

|     클래스      | 용도                                             |
| :-------------: | :----------------------------------------------- |
|     Arrays      | 배열을 조작(비교, 복사, 정렬, 탐색)할 때         |
|    Calendar     | 운영체제의 날짜와 시간을 얻을 때                 |
|      Date       | 날짜와 시간 정보를 저장할 때                     |
|     Objects     | 객체를 비교하거나 null 여부를 조사하는 등의 용도 |
| StringTokenizer | 특정 문자로 구분된 문자열을 뽑아낼 때            |
|     Random      | 난수를 얻을 때                                   |

<br>
<br>

# Object 클래스

- Object는 Java의 최상위 부모 클래스
- 클래스 선언 시 `extends` 키워드로 다른 클래스를 상속하지 않으면 암시적으로 `java.lang.Object` 클래스를 상속하게 됨
- Object 클래스는 필드가 없으며, 메소드들로 구성되어 있음
  - 모든 클래스에서 Object의 메소드들을 사용할 수 있음

<br>
<br>

## equals() : 객체 비교

```java
public boolean equals(Object obj) { ··· }
```

- 매개 타입이 Object이므로 모든 객체가 매개값으로 대입될 수 있음
- 두 객체가 동일하면 `true`를, 그렇지 않다면 `false`를 리턴함
- `==` 비교가 객체의 참조 번지를 비교하는 것과 달리, 객체의 실제 값을 가지고 비교할 수 있음
  - 만약 `Member`라는 클래스와 `User`라는 클래스의 필드값이 모두 동일하다면 이 때에도 `true`가 리턴될 수 있으니,  
    `instanceof` 연산자를 추가로 활용하여 기준 객체와 동일한 타입인지도 확인해주면 좋음

<br>
<br>

## hashCode() : 객체 해시코드

- 객체 해시코드란 객체를 식별할 하나의 정수값을 뜻함
- 객체의 메모리 번지를 이용해서 해시코드를 만들어 리턴하기 때문에 객체마다 다른 값을 가지고 있음
- 컬렉션 프레임워크의 `HashSet`, `HashMap`, `HashTable`은 다음 방법으로 두 객체가 동등한지 비교함
  1. `hashCode()` 메소드를 실행해서 리턴된 해시코드 값이 같은지 확인
  2. 해시코드 값이 다르면 다른 객체로 판단, 같으면 `equals()` 메소드로 다시 비교
  3. `equals()` 메소드로 비교했을 때에도 같으면 같은 객체로 판단, 아니면 다른 객체로 판단

<br>
<br>

## toString() : 객체 문자 정보

- 객체의 문자 정보란 객체를 문자열로 표현한 값을 뜻함
- 기본적으로 Object 클래스의 `toString()` 메소드는 `클래스명@16진수해시코드`로 구성된 문자 정보를 리턴함

```java
Object obj = new Object();
System.out.println(obj.toString());

/*
java.lang.Object@de6ced
*/
```

- Object의 `toString()` 메소드의 리턴값은 Java 애플리케이션에서는 별 값어치가 없는 정보이므로,  
  Object 하위 클래스는 `toString()` 메소드를 재정의하여 간결하고 유익한 정보를 리턴하도록 되어 있음
  - 예를 들어 `java.util.Date` 클래스는 `toString()` 메소드를 재정의하여 현재 시스템의 날짜와 시간 정보를 리턴하도록 변경했음
  - 우리가 만드는 클래스도 `toString()` 메소드를 재정의하여 활용해볼 수도 있음

<br>
<br>

## clone() : 객체 복제

- 객체 복제란 원본 객체의 필드값과 동일한 값을 가지는 새로운 객체를 생성하는 것을 뜻함
- 객체를 복제하는 이유는 원본 객체를 안전하게 보호하기 위함
- 객체를 복제하는 방법에는 **얕은 복제** 와 **깊은 복제** 가 있음

<br>

### 얕은 복제 (thin clone)

- 얕은 복제란 단순히 필드값을 복사해서 객체를 복제하는 것을 뜻함
- 필드가 기본 타입일 경우 값을 복사하고, 참조 타입일 경우 객체의 번지를 복사함
- `clone()` 메소드는 자신과 동일한 필드값을 가진 얕은 복제된 객체를 리턴함
  - 이 메소드로 객체를 복제하려면 원본 객체는 반드시 `java.lang.Cloneable` 인터페이스를 구현하고 있어야 함
  - 그렇지 않을 경우 `clone()` 메소드를 호출할 때 `CloneNotSupportedException` 예외가 발생하여 복제에 실패함
  - `clone()`은 위의 예외 처리가 필요한 메소드이기 때문에 `try-catch` 구문도 필요함

```java
public class Member implements Cloneable {
  public String id;
  public String name;
  public String password;
  public int age;
  public boolean adult;

  public Member(String id, String name, String password, int age, boolean adult) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.age = age;
    this.adult = adult;
  }

  public Member getMember() {
    Member cloned = null;
    try {
      cloned = (Member) clone();  //clone()의 리턴 타입은 Object이므로 캐스팅 필요
    } catch(CloneNotSupportedException e) {}
    return cloned;
  }
}
```

```java
public class MemberExample {
  public static void main(String[] args) {
    Member original = new Member("존잘남", "로코", "1124", 28, true);
    Member cloned = original.getMember();
  }
}
```

<br>

### 깊은 복제 (deep clone)

- 얕은 복제의 단점 : 참조 타입 필드의 경우 번지만 복제되기 때문에 얕은 복제 이후 참조 타입 필드를 수정하면 원본 객체도 수정됨
- 깊은 복제란 참조하고 있는 객체도 복제하는 것을 뜻함
- 깊은 복제를 하려면 `clone()` 메소드를 재정의해서 참조 객체를 복제하는 코드를 직접 작성해야 함

```java
public class Member implements Cloneable {
  public String name;
  public int age;
  public int[] scores;
  public Car car;

  public Member(String name, int age, int[] scores, Car car) {
    this.name = name;
    this.age = age;
    this.scores = scores;
    this.car = car;
  }

  @Override
  protected Object clone() throws CloneNotSupportedException {
    Member cloned = (Member) super.clone();
    cloned.scores = Arrays.copyOf(this.scores, this.scores.length);
    cloned.car = new Car(this.car.model);
    return cloned;
  }

  public Member getMember() {
    Member cloned = null;
    try {
      cloned = (Member) clone();
    } catch(CloneNotSupportedException e) {
      e.printStackTrace();
    }
    return cloned;
  }
}
```

```java
public class Car {
  public String model;

  public Car(String model) {
    this.model = model;
  }
}
```

```java
public class MemberExample {
  public static void main(String[] args) {
    Member original = new Member("로코", 28, new int[] {100, 100}, new Car("페라리"));
    Member cloned = original.getMember();
  }
}
```

<br>
<br>

## finalize() : 객체 소멸자

- 참조하지 않는 배열이나 객체는 **Garbage Collector** 가 힙 영역에서 자동적으로 소멸시킴
- Garbage Collector는 객체를 소멸하기 직전에 마지막으로 `finalize()`를 실행시킴
- Object의 `finalize()`는 기본적으로 실행 내용이 없음
- 만약 객체가 소멸되기 전에 마지막으로 사용했던 자원을 닫고 싶거나, 중요한 데이터를 저장하고 싶다면 `finalize()`를 재정의하면 됨
- Garbage Collector는 메모리가 부족할 때, CPU가 한가할 때 JVM에 의해 자동 실행되므로 `finalize()`의 호출 시점이 명확하지 않음
  - 즉시 자원을 해제하거나 즉시 데이터를 최종적으로 저장해야 한다면 프로그램이 종료될 때 명시적으로 메소드를 호출할 것

<br>
<br>

# Objects 클래스

- Object와 유사한 이름을 가진 `java.util.Objects` 클래스는 정적 메소드들로 구성된 Object의 유틸리티 클래스

| 리턴 타입 | 메소드                                                   | 설명                                                                       |
| :-------: | :------------------------------------------------------- | :------------------------------------------------------------------------- |
|    int    | compare(T a, T b, Comparator\<T> c)                      | 두 객체를 `Comparator`를 사용해서 비교                                     |
|  boolean  | deepEquals(Object a, Object b)                           | 두 객체의 깊은 비교                                                        |
|  boolean  | equals(Object a, Object b)                               | 두 객체의 얕은 비교                                                        |
|    int    | hash(Object... values)                                   | 매개값이 저장된 배열의 해시코드 생성                                       |
|    int    | hashCode(Object o)                                       | 객체의 해시코드 생성                                                       |
|  boolean  | isNull(Object o)                                         | 객체가 null인지 조사                                                       |
|  boolean  | nonNull(Object o)                                        | 객체가 null이 아닌지 조사                                                  |
|     T     | requireNonNull(T obj)                                    | 객체가 null인 경우 예외 발생                                               |
|     T     | requireNonNull(T obj, String message)                    | 객체가 null인 경우 메시지를 포함한 예외 발생                               |
|     T     | requireNonNull(T obj, Supplier\<String> messageSupplier) | 객체가 null인 경우 람다식이 만든 메시지를 포함한 예외 발생                 |
|  String   | toString(Object o)                                       | 객체의 `toString()` 값 리턴                                                |
|  String   | toString(Object o, String nullDefault)                   | 첫 번째 매개값이 null이면 두 번째 매개값 리턴, 아니면 `toString()` 값 리턴 |

<br>
<br>

## compare(T a, T b, Compare\<T> c) : 객체 비교

```java
public interface Comparator<T> {
  int compare(T a, T b);
}
```

- `Objects.compare(T a, T b, Comparator<T> c)` 메소드는 두 객체를 `Comparator`로 비교해서 int 값을 리턴함
- `java.util.Comparator<T>`는 제네릭 인터페이스 타입으로, 두 객체를 비교하는 `compare(T a, T b)` 메소드가 내장되어 있음
- a가 b보다 작으면 음수, 같으면 0, 크면 양수를 리턴하도록 구현 클래스를 만들어야 함

```java
class StudentComparator implements Comparator<Student> {
  @Override
  public int compare(Student a, Student b) {
    if (a.sno < b.sno) return -1;
    else if (a.sno == b.sno) return 0;
    else return 1;
    // return Integer.compare(a.sno, b.sno);
  }
}
```

<br>
<br>

## equals() / deepEquals() : 동등 비교

- `Objects.equals(Object a, Object b)`는 두 객체의 동등을 비교하여 다음과 같은 결과를 리턴함

|    a     |    b     |  Objects.equals(a, b)  |
| :------: | :------: | :--------------------: |
| not null | not null | `a.equals(b)`의 리턴값 |
|   null   | not null |         false          |
| not null |   null   |         false          |
|   null   |   null   |          true          |

- `Objects.deepEquals(Object a, Object b)` 역시 두 객체의 동등을 비교하지만,<br>a와 b가 서로 다른 배열일 경우 항목 값이 모두 같아야 `true`를 리턴함
  - 이 경우 `Arrays.deepEquals(Object[] a, Object[] b)`와 동일함

|          a           |          b           |        Objects.equals(a, b)        |
| :------------------: | :------------------: | :--------------------------------: |
| not null (not array) | not null (not array) |       `a.equals(b)`의 리턴값       |
|   not null (array)   |   not null (array)   | `Arrays.deepEquals(a, b)`의 리턴값 |
|         null         |       not null       |               false                |
|       not null       |         null         |               false                |
|         null         |         null         |                true                |

<br>
<br>

## hash() / hashCode() : 해시코드 생성

- `Objects.hash(Object··· values)`는 매개값으로 주어진 값들을 이용해서 해시 코드를 생성해줌
- 주어진 매개값들로 배열을 생성하고 `Arrays.hashCode(Object[])`를 호출해서 해시코드를 얻고 이 값을 리턴함
- `Objects.hashCode(Object o)`와 `o.hashCode()`는 같음

<br>
<br>

## isNull() / nonNull() / requireNonNull() : null 여부 조사

- `Objects.isNull(Object o)`은 매개값이 null일 경우 true
- `Objects.nonNull(Object o)`은 매개값이 not null일 경우 true
- `Objects.requireNonNull()`은 다음 3가지로 오버로딩되어 있음

| 리턴 타입 | 메소드                                               | 설명                                                             |
| :-------: | :--------------------------------------------------- | :--------------------------------------------------------------- |
|     T     | requireNonNull(T obj)                                | not null → obj<br>null → NullPointerException                    |
|     T     | requireNonNull(T obj, String message)                | not null → obj<br>null → NullPointerException(message)           |
|     T     | requireNonNull(T obj, Supplier\<String> msgSupplier) | not null → obj<br>null → NullPointerException(msgSupplier.get()) |

<br>
<br>

## toString() : 객체 문자 정보

- `Objects.toString()`은 객체의 문자 정보를 리턴하는데, 다음 2가지로 오버로딩되어 있음

| 리턴 타입 | 메소드                                 | 설명                                          |
| :-------: | :------------------------------------- | :-------------------------------------------- |
|  String   | toString(Object o)                     | not null → o.toString()<br>null → "null"      |
|  String   | toString(Object o, String nullDefault) | not null → o.toString()<br>null → nullDefault |

<br>
<br>

# System 클래스

- Java 프로그램은 운영체제 상에서 바로 실행되는 것이 아니라, JVM 위에서 실행됨
- 따라서 운영체제의 모든 기능을 Java 코드로 직접 접근하기는 어려움
- 이런 점을 보완하기 위해 `java.lang.System` 클래스는 운영체제의 일부 기능을 이용할 수 있도록 해줌
  - 프로그램 종료, 키보드 입력, 모니터 출력, 메모리 정리, 현재 시간 읽기, 시스템 프로퍼티 읽기, 환경 변수 읽기 등
- System 클래스의 모든 필드와 메소드는 **정적 필드** 와 **정적 메소드** 로 구성되어 있음

<br>
<br>

## exit() : 프로그램 종료

```java
System.exit(0);
```

- 현재 실행하고 있는 프로세스를 강제 종료시키는 역할
- int 매개값을 지정하도록 되어 있는데, 이 값을 **종료 상태값** 이라고 함
  - 일반적인 정상 종료의 경우 `0`
  - 어떤 값을 주더라도 종료가 되는데, 만약 특정 값이 입력되었을 경우에만 종료하고 싶다면 Java의 보안 관리자를 직접 실행해서 종료 상태값을 확인해야 함
  - 보안 관리자를 활용하고 싶다면 `checkExit()` 메소드를 재정의할 것

<br>
<br>

## gc() : Garbage Collector 실행

```java
System.gc();
```

- JVM은 메모리를 알아서 자동으로 관리해줌
  - 메모리가 부족할 때와 CPU가 한가할 때 Garbage Collector를 실행시켜서 사용하지 않는 객체를 자동 제거
- Garbage Collector는 개발자가 직접 코드로 실행할 수 없지만, 가능한 한 빨리 실행해 달라고 요청할 수는 있음
- Garbage Collector가 너무 자주 작동하면 프로그램 전체의 성능이 떨어지므로, `gc()` 메소드를 쓸 일은 거의 없음

<br>
<br>

## currentTimeMillis() / nanoTime() : 현재 시각 읽기

```java
long time = System.currentTimeMillis();
long time = System.nanoTime();
```

- 컴퓨터의 시계로부터 현재 시간을 읽어서 밀리세컨드(1/10³) 단위와 나노세컨드(1/10⁹) 단위의 long 값 리턴
- 주로 프로그램의 실행 소요 시간 측정에 사용됨

```java
public class SystemTimeExample {
  public static void main(String[] args) {
    long startTime = System.nanoTime();

    int sum = 0;
    for (int i = 1; i <= 1000000; i++) {
      sum += i;
    }

    long finishTime = System.nanoTime();

    System.out.println("1 ~ 1000000 까지의 합 : " + sum);
    System.out.println("소요 시간 : " + (finishTime - startTime) + " nano second");
  }
}
```

<br>
<br>

## getProperty() : System Property 읽기

```java
String value = System.getProperty(String key);
```

- System Property는 JVM이 시작할 때 자동 설정되는 시스템의 속성값을 뜻함
- System Property는 key와 value로 구성되어 있음
- 매개 변수 없이 사용하면 모든 속성들을 불러올 수 있음

|      key       | 설명                             |
| :------------: | :------------------------------- |
|  java.version  | Java 버전                        |
|   java.home    | JRE 파일의 경로                  |
|    os.name     | OS 이름                          |
| file.separator | 파일 구분자                      |
|   user.name    | 사용자 이름                      |
|   user.home    | 사용자의 홈 디렉토리             |
|    user.dir    | 사용자가 현재 작업 중인 디렉토리 |

<br>
<br>

## getenv() : 환경 변수 읽기

```java
String value = System.getenv(String name);
```

- 대부분의 운영체제는 실행되는 프로그램들에게 유용한 정보를 제공할 목적으로 **환경 변수(Environment Variable)** 를 제공함
  - 사용자가 직접 설정할 수도 있음
