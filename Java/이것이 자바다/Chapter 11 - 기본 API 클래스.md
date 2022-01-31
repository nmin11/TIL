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

<br>
<br>

# Class 클래스

- Java는 클래스와 인터페이스의 메타 데이터를 `java.lang.Class`로 관리함
  - 메타 데이터란 클래스의 이름, 생성자 정보, 필드 정보, 메소드 정보를 뜻함

<br>
<br>

## getClass() / forName() : Class 객체 얻기

```java
Class clazz = obj.getClass();
```

- 프로그램에서 Class 객체를 얻기 위해서는 Object 클래스의 `getClass()` 메소드를 이용하면 됨
  - Object 클래스는 모든 클래스의 최상위 클래스이므로 모든 클래스에서 `getClass()`를 호출할 수 있음
- `getClass()` 메소드는 해당 클래스로 객체를 생성했을 때만 사용 가능

```java
try {
  Class clazz = Class.forName(String className);
} catch (ClassNotFoundException e) {}
```

- `forName()`을 사용하면 객체를 생성하기 전에 직접 Class 객체를 얻을 수 있음
- `forName()` 메소드는 패키지가 포함된 클래스 전체 이름을 매개값으로 받아서 Class 객체를 리턴함

<br>
<br>

## getDeclaredConstructors() / getDeclaredFields() / getDeclaredMethods() : Reflection

```java
Constructor[] constructors = clazz.getDeclaredConstructors();
Field[] fields = clazz.getDeclaredFields();
Method[] methods = clazz.getDeclaredMethods();
```

- Reflection : Class 객체를 이용해서 클래스의 생성자, 필드, 메소드 정보를 얻어내는 것
- Constructor, Field, Method 클래스는 모두 `java.lang.reflect` 패키지에 소속되어 있음
- `getDeclaredFields()`와 `getDeclaredMethods()`는 클래스에 선언된 멤버만 가져오고 상속된 멤버는 가져오지 않음
  - 만약 상속된 멤버도 얻고 싶다면 `getFields()`나 `getMethods()`를 이용해야 함
  - 단, `getFields()`와 `getMethods()`는 public 멤버만 가져옴

<br>
<br>

## newInstance() : 동적 객체 생성

```java
try {
  Class clazz = Class.forName("className");
  Object obj = clazz.newInstance();
} catch (ClassNotFoundException e) {
} catch (InstantiationException e) {
} catch (IllegalAccessException e) {
}
```

- Class 객체를 이용하면 new 연산자를 사용하지 않아도 동적으로 객체를 만들 수 있음
- 이 방법은 코드 작성 시에 클래스 이름을 결정할 수 없고, 런타임 시에 클래스 이름이 결정되는 경우에 매우 유용하게 사용됨
- `newInstance()` 메소드는 기본 생성자를 호출해서 객체를 생성하기 때문에 반드시 클래스에 기본 생성자가 존재해야 함
  - 만약 매개 변수가 있는 생성자를 호출하고 싶다면 reflection으로 Constructor 객체를 얻은 이후에 `newInstance()` 메소드를 호출하면 됨
- `InstantiationException`은 해당 클래스가 추상 클래스이거나 인터페이스일 경우에 발생
- `IllegalAccessException`은 클래스나 생성자가 접근 제한자로 인해 접근할 수 없는 경우에 발생
- `newInstance()`의 리턴 타입은 Object이므로 이것을 원래 클래스 타입으로 변환해야만 메소드를 사용할 수 있음 (강제 타입 변환)

<br>
<br>

# String 클래스

- 어떤 프로그램이건 문자열은 데이터로서 아주 많이 사용됨
- 그러므로 문자열 생성, 추출, 비교, 찾기, 분리, 변환 등에 대한 메소드를 잘 익혀두어야 함

<br>
<br>

## String 생성자

- Java의 문자열은 `java.lang.String` 클래스의 인스턴스로 관리됨
- 소스상에서 문자열 리터럴은 String 객체로 자동 생성되지만, String 클래스의 다양한 생성자를 이용해서 직접 String 객체를 생성할 수도 있음
- String 클래스에는 Deprecated된 생성자를 제외하면 약 13개의 생성자가 존재함

<br>

### byte[] 배열을 문자열로 변환하기

- 파일의 내용을 읽거나 네트워크를 통해 받은 데이터는 보통 `byte[]` 배열이므로 이를 문자열로 변환하기 위한 생성자들이 존재함

```java
String str = new String(byte[] bytes);
```

→ 배열 전체를 String 객체로 생성

```java
String str = new String(byte[] bytes, String charsetName);
```

→ 지정한 문자셋으로 디코딩

```java
String str = new String(byte[] bytes, int offset, int length);
```

→ 배열의 offset 인덱스 위치부터 length만큼 String 객체로 생성

```java
String str = new String(byte[] bytes, int offset, int length, String charsetName);
```

→ 지정한 문자셋으로 디코딩

```java
public class ByteToStringExample {
  public static void main(String[] args) {
    byte[] bytes = { 72, 101, 108, 108, 111, 32, 74, 97, 118, 97 };

    String str1 = new String(bytes);
    System.out.println(str1);

    String str2 = new String(bytes, 6, 4);
    System.out.println(str2);
  }
}

/*
Hello Java
Java
*/
```

<br>
<br>

## String 메소드

| 리턴 타입 | 메소드                                                    | 설명                                              |
| :-------: | :-------------------------------------------------------- | :------------------------------------------------ |
|   char    | charAt(int index)                                         | 특정 위치의 문자 리턴                             |
|  boolean  | equals(Object o)                                          | 두 문자열 비교                                    |
|  byte[]   | getBytes()                                                | byte[]로 리턴                                     |
|  byte[]   | getBytes(Charset charset)                                 | 주어진 문자셋으로 인코딩한 byte[]로 리턴          |
|    int    | indexOf(String str)                                       | 문자열 내에서 주어진 문자열의 위치 리턴           |
|    int    | length()                                                  | 총 문자의 수 리턴                                 |
|  String   | replace(CharSequence target,<br>CharSequence replacement) | target 부분을 replacement로 대치한 문자열 리턴    |
|  String   | substring(int beginIndex)                                 | beginIndex에서 끝까지 잘라낸 문자열 리턴          |
|  String   | sunstring(int beginIndex,<br>int endIndex)                | beginIndex에서 endIndex 전까지 잘라낸 문자열 리턴 |
|  String   | toLowerCase()                                             | 알파벳 소문자로 변환한 문자열 리턴                |
|  String   | toUpperCase()                                             | 알파벳 대문자로 변환한 문자열 리턴                |
|  String   | trim()                                                    | 앞뒤 공백을 제거한 문자열 리턴                    |
|  String   | valueOf(int i)<br>valueOf(double d)                       | 기본 타입값을 문자열로 리턴                       |

<br>

### charAt() : 문자 추출

- 매개값으로 주어진 인덱스의 문자를 리턴

<br>

### equals() : 문자열 비교

- 기본 타입 변수의 값을 비교할 때는 `==` 연산자를 사용하지만, 문자열을 비교할 때에는 `eqauls()` 사용이 권장됨
  - 문자열 리터럴이 같더라도 참조하는 번지가 다를 수 있기 때문
- 원래 `equals()`는 Object의 번지 비교 메소드이지만, String 클래스가 오버라이딩해서 문자열 리터럴을 비교하도록 변경했음

<br>

### getBytes() : byte 배열로 변환

```java
byte[] bytes = "문자열".getBytes();
byte[] bytes = "문자열".getBytes(Charset charset);
```

- 종종 문자열을 byte 배열로 변환하는 경우가 있음
  - 네트워크 문자열을 전송하거나, 문자열을 암호화할 때
- 매개 변수가 없는 `getBytes()`는 시스템의 기본 문자셋으로 인코딩된 byte 배열을 리턴
- 특정 문자셋으로 인코딩된 byte 배열을 얻으려면 문자셋을 매개 변수로 넣어줘야 함

```java
try {
  byte[] bytes = "문자열".getBytes("EUC-KR");
  byte[] bytes = "문자열".getBytes("UTF-8");
} catch (UnsupportedEncodingException e) {}
```

- byte 배열을 다시 문자열로 디코딩할 때에는 어떤 문자셋으로 인코딩된 byte 배열이냐에 따라서 디코딩 방법이 다름

```java
String str = new String(byte[] bytes, String charsetName);
```

- 만약 문자셋을 매개 변수로 주지 않을 경우 시스템 기본 문자셋으로 디코딩하게 됨

<br>

### indexOf() : 문자열 찾기

- 매개값으로 주어진 문자열이 시작되는 인덱스 리턴
- 만약 주어진 문자열이 포함되어 있지 않으면 `-1` 리턴

<br>

### length() : 문자열 길이

- 문자열의 길이(문자의 수) 리턴

<br>

### replace() : 문자열 대치

- 첫 번째 매개값 문자열을 찾아 두 번째 매개값 문자열로 대치한 새로운 문자열을 생성하고 리턴

<br>

### substring() : 문자열 잘라내기

- 주어진 인덱스에서 문자열 추출
- 매개값이 하나일 경우 해당 인덱스부터 끝까지 추출
- 매개값이 둘일 경우 두 인덱스 사이의 문자열 추출
  - beginIndex를 포함하고, endIndex를 포함하지 않는 그 이전까지의 문자열

<br>

### toLowerCase() / toUpperCase() : 알파벳 소·대문자 변경

- `toLowerCase()`는 문자열을 모두 소문자로 바꾼 새로운 문자열 리턴
- `toUpperCase()`는 문자열을 모두 대문자로 바꾼 새로운 문자열 리턴
- 주로 영어로 된 두 문자열을 대소문자와 관계없이 비교할 때 이용됨
  - 두 문자열을 비교하기 전에 두 메소드 중 하나를 둘 다에 적용하여 대소문자를 맞춘 이후에 서로 비교하는 방식
  - 아니면 굳이 변환할 필요 없이 `equalsIgnoreCase()` 메소드를 사용해서 이 작업을 생략할 수도 있음

<br>

### trim() : 문자열 앞뒤 공백 잘라내기

- 문자열의 앞뒤 공백을 제거한 새로운 문자열을 생성하고 리턴

<br>

### valueOf() : 문자열 변환

```java
static String valueOf(boolean b)
static String valueOf(char c)
static String valueOf(int i)
static String valueOf(long l)
static String valueOf(double d)
static String valueOf(float f)
```

- 기본 타입의 값을 문자열로 변환

<br>
<br>

# StringTokenizer 클래스

- 문자열을 특정 구분자를 기준으로 분리하는 방법
  - String의 `split()` 메소드 이용하기
    - 정규표현식으로 구분함
  - `java.util.StringTokenizer` 클래스 이용하기
    - 문자로 구분함

<br>
<br>

## split()

```java
String[] result = "문자열".split("정규표현식");
```

- 정규표현식을 구분자로 해서 문자열을 분리한 후 배열에 저장하고 리턴함

```java
public class StringSplitExample {
  public static void main(String[] args) {
    String text = "홍길동&이수홍,박연수,김자바-최명호";
    String[] names = text.split("&|,|-");

    for (String name : names) {
      System.out.println(name);
    }
  }
}

/*
홍길동
이수홍
박연수
김자바
최명호
*/
```

<br>
<br>

## StringTokenizer 클래스

```java
StringTokenizer st = new StringTokenizer("문자열", "구분자");
```

- 구분자가 한 종류일 경우에는 StringTokenizer 클래스를 사용해서 손쉽게 문자열을 분리해낼 수 있음
- 구분자를 생략할 경우 공백이 기본 구분자가 됨

```java
String text = "홍길동/이수홍/박연수";
StringTokenizer st = new StringTokenizer(text, "/");
```

- 추가적으로 토큰과 관련된 메소드들을 제공해줌

| 리턴 타입 | 메소드          | 설명                          |
| :-------: | :-------------- | :---------------------------- |
|    int    | countTokens()   | 꺼내지 않고 남아 있는 토큰 수 |
|  boolean  | hasMoreTokens() | 남아 있는 토큰이 있는지 여부  |
|  String   | nextToken()     | 토큰을 하나씩 꺼내옴          |

- `nextToken()` 메소드로 토큰을 하나씩 꺼내오면 StringTokenizer 객체에는 해당 토큰이 없어짐
  - 더 이상 가져올 토큰이 없다면 `java.util.NoSuchElementException` 발생
  - 그러므로 토큰을 가져오기 전에 미리 `hasMoreTokens()`를 사용해서 확인해주면 좋음

```java
public class StringTokenizerExample {
  public static void main(String[] args) {
    String text = "홍길동/이수홍/박연수";

    // 전체 토큰 수를 얻어서 for문으로 루핑하는 방법
    StringTokenizer st = new StringTokenizer(text, "/");
    int count = st.countTokens();
    for (int i = 0; i < count; i++) {
      String token = st.nextToken();
      System.out.println(token);
    }

    System.out.println();

    // 남아 있는 토큰을 확인하면서 while문으로 루핑하는 방법
    st = new StringTokenizer(text, "/");
    while (st.hasMoreTokens()) {
      String token = st.nextToken();
      System.out.println(token);
    }
  }
}

/*
홍길동
이수홍
박연수

홍길동
이수홍
박연수
*/
```

<br>
<br>

# StringBuffer, StringBuilder 클래스

- 문자열을 저장하는 String은 내부의 문자열을 수정할 수 없음
  - 예를 들어 `replace()` 메소드는 내부의 문자를 대치하는 것이 아닌, 대치된 새로운 문자열을 리턴하는 것

```java
String str = "ABC";
str += "DEF";
```

※ 이런 연산을 하게 되면 String 객체는 내부 데이터를 수정할 수 없으므로 새로운 String 객체를 만들어내야 한다.  
문자열을 결합하는 + 연산을 많이 하면 할수록 그만큼 String 객체의 수가 늘어나기 때문에 프로그램 성능을 느리게 하는 요인이 된다.

→ 그렇기 때문에 문자열을 합칠 때는 `java.lang` 패키지의 **StringBuffer** 또는 **StringBuilder** 클래스를 사용하는 것이 권장됨

- 두 클래스는 내부 buffer(데이터를 임시 저장하는 메모리)에 문자열을 저장해두고, 그 안에서 추가, 수정, 삭제 작업을 할 수 있도록 설계되어 있음
- String과는 달리 새로운 객체를 만들지 않고도 문자열을 조작할 수 있음
- 두 클래스의 사용 방법은 동일
- 두 클래스의 차이점
  - StringBuffer는 멀티 스레드 환경에서 사용할 수 있도록 동기화가 적용되어 있어 스레드에 안전함
  - StringBuilder는 단일 스레드 환경에서만 사용하도록 설계되어 있음

※ 아직 스레드를 학습하지 않았기 때문에 **StringBuilder** 클래스를 자세히 살펴볼 것

<br>

## StringBuilder 클래스

- StringBuilder의 생성자들
  - 기본 생성자는 16개의 문자들을 저장할 수 있는 초기 buffer를 만듦
  - `StringBuilder(int capacity)` 생성자는 capacity로 주어진 개수만큼 문자들을 저장할 수 있는 초기 buffer를 만듦
    - StringBuilder는 buffer가 부족할 경우 자동으로 buffer 크기를 늘리기 때문에 사실 초기 buffer의 크기는 그다지 중요하지 않음
  - `StringBuilder(String str)` 생성자는 str로 주어진 매개값을 buffer의 초기값으로 저장

```java
StringBuilder sb = new StringBuilder();
StringBuilder sb = new StringBuilder(16);
StringBuilder sb = new StringBuilder("Java");
```

- StringBuilder의 메소드들
  - `append()`와 `insert()` 메소드는 매개 변수가 다양한 타입으로 오버로딩되어 있기 때문에 대부분의 값을 대입할 수 있음

| 메소드                                  | 설명                                              |
| :-------------------------------------- | :------------------------------------------------ |
| append(···)                             | 문자열 끝에 주어진 매개값 추가                    |
| insert(int offset, ···)                 | 문자열 중간에 주어진 매개값 추가                  |
| delete(int start, int end)              | 문자열의 일부분 삭제                              |
| deleteCharAt(int index)                 | 문자열에서 주어진 index의 문자 삭제               |
| replace(int start, int end, String str) | 문자열의 일부분을 다른 문자열로 대치              |
| reserve()                               | 문자열의 순서를 뒤바꿈                            |
| setCharAt(int index, char ch)           | 문자열에서 주어진 index의 문자를 다른 문자로 대치 |

```java
public class StringBuilderExample {
  public static void main(String[] args) {
    StringBuilder sb = new StringBuilder();

    sb.append("Java ");
    sb.append("Program Study");
    System.out.println(sb.toString());

    sb.insert(4, "2");
    System.out.println(sb.toString());

    sb.setCharAt(4, '3');
    System.out.println(sb.toString());

    sb.replace(6, 13, "Book");
    System.out.println(sb.toString());

    sb.delete(4, 5);
    System.out.println(sb.toString());

    int length = sb.length();
    System.out.println("문자수" + length);
  }
}

/*
Java Program Study
Java2 Program Study
Java3 Program Study
Java3 Book Study
Java Book Study
*/
```

<br>
<br>

# 정규 표현식과 Pattern 클래스

- 문자열이 정해져 있는 형식(정규표현식 : Regular Expression)으로 구성되어 있는지 검증해야 하는 경우가 있음
  - 예를 들어 이메일, 전화번호 등

<br>
<br>

## 정규 표현식 작성 방법

- API Document에서 `java.util.regex.Pattern` 클래스의 **Summary of regular-expression constructs** 를 참조하면 되지만 이해하기가 쉽지 않음
- 간단히 말해서 정규 표현식은 문자 또는 숫자 기호와 반복 기호가 결합된 문자열

|   기호   | 설명                                |
| :------: | :---------------------------------- |
|  [abc]   | a, b, c 중 하나의 문자              |
|  [^abc]  | a, b, c 이외의 하나의 문자          |
| [a-zA-Z] | a~z, A~Z 중 하나의 문자             |
|    \d    | 1개의 숫자 [0-9]                    |
|    \s    | 공백                                |
|    \w    | 1개의 알파벳 또는 숫자 [a-zA-Z_0-9] |
|    ?     | 없거나 1개                          |
|    \*    | 없거나 1개 이상                     |
|    +     | 1개 이상                            |
|   {n}    | 정확히 n개                          |
|   {n,}   | 최소한 n개                          |
|  {n,m}   | n개에서 m개까지                     |
|    ()    | Grouping                            |

<br>

### 전화번호 정규 표현식 예시

```java
(02|010)-\d{3,4}-\d{4}
```

|   기호    | 설명                  |
| :-------: | :-------------------- |
| (02\|010) | 02 또는 010           |
|     -     | - 포함                |
|  \d{3,4}  | 3자리 또는 4자리 숫자 |

<br>

### 이메일 정규 표현식 예시

```java
\w+@\w+\.\w+(\.\w+)?
```

|   기호   | 설명                               |
| :------: | :--------------------------------- |
|   \w+    | 1개 이상의 알파벳 또는 숫자        |
|    \.    | .                                  |
| (\.\w+)? | \.\w+이 없거나 한 번 더 올 수 있음 |

<br>
<br>

## Pattern 클래스

- `java.util.regex.Pattern` 클래스의 정적 메소드 `matches()`를 활용해서 문자열을 정규 표현식으로 검증할 수 있음

```java
boolean result = Pattern.matches("정규식", "검증할 문자열");
```

<br>
<br>

# Arrays 클래스

- Arrays 클래스는 배열 복사, 항목 정렬, 항목 검색과 같은 배열 조작 기능을 가지고 있음
- Arrays 클래스의 모든 메소드는 static이므로 Arrays 클래스를 통해서 바로 사용 가능함

| 리턴 타입 | 메소드                            | 설명                                                                                     |
| :-------: | :-------------------------------- | :--------------------------------------------------------------------------------------- |
|    int    | binarySearch(배열, 찾는값)        | 전체 항목에서 찾는 값이 있는 인덱스 리턴                                                 |
| 타겟 배열 | copyOf(원본배열, 복사길이)        | 원본 배열에서 복사할 길이만큼 복사한 배열 리턴<br>원본 배열의 길이보다 길 경우 전체 복사 |
| 타겟 배열 | copyOfRange(원본배열, start, end) | 원본 배열의 시작 인덱스에서 끝 인덱스까지 복사한 배열 리턴                               |
|  boolean  | deepEquals(배열, 배열)            | 두 배열의 깊은 비교                                                                      |
|  boolean  | equals(배열, 배열)                | 두 배열의 얕은 비교                                                                      |
|   void    | fill(배열, 값)                    | 전체 배열 항목에서 동일한 값을 저장                                                      |
|   void    | fill(배열, start, end, 값)        | 시작 인덱스부터 끝 인덱스까지의 항목에 동일한 값을 저장                                  |
|   void    | sort(배열)                        | 배열의 전체 항목을 오름차순으로 정렬                                                     |
|  String   | toString(배열)                    | 배열을 문자열로 변환해서 리턴                                                            |

<br>
<br>

## 배열 복사

- `copyOf(원본배열, 복사길이)`와 `copyOfRange(원본배열, start, end)` 사용 가능
- `copyOf(원본배열, 복사길이)`는 원본 배열의 0번 인덱스에서 복사한 길이만큼 복사한 배열을 리턴
  - 복사할 길이가 원본 배열의 길이보다 크거나 같을 경우, 원본 배열이 그대로 복사됨

```java
char[] arr1 = {'J', 'A', 'V', 'A'};
char[] arr2 = Arrays.copyOf(arr1, arr1.length);
```

- `copyOfRange(원본배열, start, end)`는 원본 배열의 시작 인덱스에서 끝 인덱스 직전까지 복사한 배열을 리턴

```java
char[] arr1 = {'J', 'A', 'V', 'A'};
char[] arr2 = Arrays.copyOfRange(arr1, 1, 3);
```

- 단순히 배열을 복사할 목적이라면 `System.arraycopy()` 메소드를 사용할 수도 있음

```java
System.arraycopy(Object src, int srcPos, Object dest, int destPos, int length)
```

<br>
<br>

## 배열 항목 비교

- `equals()`와 `deepEquals()` 사용 가능
- `equals()`는 1차 항목의 값만 비교
- `deepEquals()`는 중첩된 배열의 항목까지 비교

<br>
<br>

## 배열 항목 정렬

- 기본 타입 또는 String으로 이루어진 배열은 `Arrays.sort()`를 이용해서 자동으로 오름차순 정렬 가능
- 사용자 정의 클래스 타입일 경우에는 클래스가 **Comparable** 인터페이스를 구현하고 있어야 정렬이 됨

```java
public class Member implements Comparable<Member> {
  String name;
  Member(String name) {
    this.name = name;
  }

  @Override
  public int compareTo(Member o) {
    return name.compareTo(o.name);
  }
}
```

<br>
<br>

## 배열 항목 검색

- `Arrays.binarySearch(배열, 찾는값)` 메소드를 활용해서 해당 항목의 인덱스를 찾아낼 수 있음

<br>
<br>

# Wrapper 클래스

- Java는 Wrapper 객체를 통해 기본 타입의 값을 갖는 객체를 생성할 수 있음
- Wrapper 객체는 기본 타입의 값을 내부에 두고 포장하는 객체
- 포장하고 있는 기본 타입 값은 외부에서 변경할 수 없으며, 내부 값을 변경하고 싶다면 새로운 포장 객체를 만들어야 함

| 기본 타입 | 포장 클래스 |
| :-------: | :---------: |
|   byte    |    Byte     |
|   char    |  Character  |
|   short   |    Short    |
|    int    |   Integer   |
|   long    |    Long     |
|   float   |    Float    |
|  double   |   Double    |
|  boolean  |   Boolean   |

<br>
<br>

## Boxing과 Unboxing

- 기본 타입의 값을 포장 객체로 만드는 과정을 박싱이라 하고, 반대로 포장 객체에서 기본 타입의 값을 얻어내는 과정을 언박싱이라 함
- 박싱을 하기 위해서는 포장 클래스의 생성자 매개값으로 기본 타입의 값 또는 문자열을 넘겨주면 됨

```java
Byte obj = new Byte(10);
Character obj = new Character('가');
Short obj = new Short(100);
Integer obj = new Integer(1000);
Long obj = new Long(10000);
Float obj = new Float(2.5F);
Double obj = new Double(3.5);
Boolean obj = new Boolean(true);
```

- 생성자 대신 각 포장 클래스가 가지고 있는 정적 메소드 `valueOf()`를 사용할 수도 있음

```java
Integer obj = Integer.valueOf(1000);
```

- 언박싱을 하기 위해서는 각 포장 클래스가 가지고 있는 `기본타입명Value()` 메소드를 호출하면 됨

```java
byte num = obj.byteValue();
char ch = obj.charValue();
short num = obj.shortValue();
int num = obj.intValue();
long num = obj.longValue();
float num = obj.floatValue();
double num = obj.doubleValue();
boolean bool = obj.booleanValue();
```

<br>
<br>

## 자동 박싱과 언박싱

- 자동 박싱은 포장 클래스 타입에 기본값이 대입될 경우에 발생함

```java
Integer obj = 100;
```

- 자동 언박싱은 기본 타입에 포장 객체가 대입될 경우에 발생함

```java
Integer obj = new Integer(100);
int value = obj;
```

<br>
<br>

## 문자열을 기본 타입 값으로 변환

- 대부분의 포장 클래스는 정적 메소드 `parser기본타입()`을 제공함

```java
byte num = Byte.parseByte("10");
short num = Short.parseShort("100");
int num = Integer.parseInt("1000");
long num = Long.parseLong("10000");
float num = Float.parseFloat("2.5F");
double num = Double.parseDouble("3.5");
boolean bool = Boolean.parseBoolean("true");
```

<br>
<br>

## 포장 값 비교

- 포장 객체는 내부의 값을 비교하기 위해 `==` 연산자와 `!=` 연산자를 사용할 수 없음
- 직접 내부 값을 언박싱해서 비교하거나, `equals()` 메소드로 비교하는 것이 좋음

<br>
<br>

# Math, Random 클래스

## Math 클래스

- `java.lang.Math` 클래스는 수학 계산에 사용할 수 있는 메소드를 제공함
- 모두 static 메소드이므로 Math 클래스를 통해 바로 사용 가능

| 메소드                                                  |      설명       |
| :------------------------------------------------------ | :-------------: |
| int abs(int a)<br>double abs(double a)                  |     절대값      |
| double ceil(double a)                                   |     올림값      |
| double floor(double a)                                  |     내림값      |
| int max(int a, int b)<br>double max(double a, double b) |     최대값      |
| int min(int a, int b)<br>double min(double a, double b) |     최소값      |
| double random()                                         |     랜덤값      |
| double rint(double a)                                   | 반올림값 (실수) |
| long round(double a)                                    | 반올림값 (정수) |

- `Math.round(double d)` 메소드는 항상 소수점 첫째 자리에서 반올림한 정수값을 리턴함
  - 원하는 소수점 자릿수에서 반올림하려면 반올림할 자릿수가 소수점 첫째 자리가 되도록 10ⁿ을 곱한 후, `round()`의 리턴값을 다시 10ⁿ.0으로 나눠줘야 함
- `Math.random()` 메소드는 0.0과 1.0 사이의 범위에 속하는 하나의 double 값을 리턴함
  - 예시1 - 주사위 번호 뽑기 : `int num = (int) (Math.random() * 6) + 1`
  - 예시2 - 로또 번호 뽑기 : `int num = (int) (Math.random() * 45) + 1`

<br>
<br>

## Random 클래스

- `java.util.Random` 클래스는 난수를 얻어내기 위해 다양한 메소드를 제공함
- boolean, int, long, float, double 난수를 얻을 수 있음
- 난수를 만드는 알고리즘에 사용되는 **seed** 를 설정할 수 있음

| 생성자            | 설명                                            |
| :---------------- | :---------------------------------------------- |
| Random()          | 호출마다 다른 종자값 자동 설정 (현재 시간 이용) |
| Random(long seed) | 매개값으로 주어진 종자값 설정                   |

| 메소드                | 설명                                |
| :-------------------- | :---------------------------------- |
| boolean nextBoolean() | boolean 타입의 난수 리턴            |
| double nextDouble()   | double 타입의 난수 리턴 (0.0 ~ 1.0) |
| int nextInt()         | int 타입의 난수 리턴 (2³¹ ~ 2³¹-1)  |
| int nextInt(int n)    | int 타입의 난수 리턴 (0 ~ n)        |

```java
public class RandomExample {
  public static void main(String[] args) {
    int[] selectNumber = new int[6];
    Random random = new Random();
    System.out.print("선택 번호 : ");

    for (int i = 0; i < 6; i++) {
      selectNumber[i] = random.nextInt(45) + 1;
      System.out.print(selectNumber[i] + " ");
    }
  }
}
```

<br>
<br>

# Date, Calendar 클래스

## Date 클래스

- 날짜를 표현하는 클래스
- 객체 간에 날짜 정보를 주고 받을 때 주로 사용됨
- 여러 개의 생성자가 선언되어 있지만 대부분 Deprecated 되어, 현재는 기본 생성자만 주로 사용함
  - 기본 생성자는 현재 날짜를 읽어서 Date 객체로 만들어줌
- Date 객체의 날짜를 문자열로 얻고 싶다면 `toString()` 메소드를 사용하면 됨
  - 해당 메소드는 영문으로 된 날짜를 리턴하는데, 특정 문자열 포맷으로 얻고 싶다면 `java.text.SimpleDateFormat` 클래스를 이용하면 됨

```java
public class DateExample {
  public static void main(String[] args) {
    Date now = new Date();
    String str = now.toString();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일 hh시 mm분 ss초");
    String form = sdf.format(now);
  }
}
```

<br>
<br>

## Calendar 클래스

- 달력을 표현하는 클래스
- abstract 클래스이므로 new 연산자를 사용해서 인스턴스를 생성할 수 없음
  - 그 이유는 날짜와 시간을 계산하는 방법이 지역과 문화, 나라에 따라 다르기 때문
  - 그래서 Calendar 클래스에는 날짜와 시간을 계산하는데 꼭 필요한 메소드들만 선언되어 있음
  - 특별한 역법을 따르는 계산 로직은 하위 클래스에서 구현하도록 되어 있음
  - 특별한 역법이 아닌 경우라면 Calendar 클래스의 정적 메소드인 `getInstance()` 메소드를 사용해서<br>현재 운영체제에 설정되어 있는 TimeZone을 기준으로 한 Calendar 하위 객체를 얻을 수 있음

```java
Calendar now = Calendar.getInstance();
int year = now.get(Calendar.YEAR);
int month = now.get(Calendar.MONTH) + 1;
int day = now.get(Calendar.DAY_OF_MONTH);
int week = now.get(Calendar.DAY_OF_WEEK);
int amPm = now.get(Calendar.AM_PM);
int hour = now.get(Calendar.HOUR);
int minute = now.get(Calendar.MINUTE);
int second = now.get(Calendar.SECOND);
```

- 다른 시간대에 해당하는 날짜와 시간을 출력하고자 한다면,<br>Calendar 클래스에 오버로딩된 다른 `getInstance()` 메소드를 사용하면 됨

```java
TimeZone tz = TimeZone.getTimeZone("America/Los_Angeles");
Calendar now = Calendar.getInstance(tz);
```

- `TimeZone.getAvailableIDs()` 메소드를 사용해서 다른 사용 가능한 시간대들을 확인할 수 있음

```java
public class PrintTimeZoneID {
  public static void main(String[] args) {
    String[] availableIDs = TimeZone.getAvailableIDs();
    for (String id : availableIDs) {
      System.out.println(id);
    }
  }
}
```

<br>
<br>

# Format 클래스

- `java.text.Format`
- Format 클래스가 필요한 경우에 대한 예시
  - 정수 세 자리마다 `,`를 넣고 싶을 때
  - 많은 수의 점수를 소수점 한 자리로 일정하게 맞추어 출력하고자 할 때
  - 날짜를 원하는 문자열 형태로 출력하고자 할 때
- sub 클래스들
  - **DecimalFormat** : 숫자 형식
  - **SimpleDateFormat** : 날짜 형식
  - **MessageFormat** : 매개 변수화된 문자열 형식

<br>
<br>

## DecimalFormat

|  기호  |             의미              |                    패턴 예시 |                     1234567.89 적용 예시 |
| :----: | :---------------------------: | ---------------------------: | ---------------------------------------: |
|   0    | 10진수 (빈자리는 0으로 채움)  | 0<br>0.0<br>0000000000.00000 | 1234568<br>1234567.9<br>0001234567.89000 |
|   #    | 10진수 (빈자리는 채우지 않음) | #<br>#.#<br>##########.##### |       1234568<br>1234567.9<br>1234567.89 |
|   .    |            소수점             |                          #.0 |                                1234567.9 |
|   -    |           음수 기호           |                 +#.0<br>-#.0 |                 +1234567.9<br>-1234567.9 |
|   ,    |           단위 구분           |                      #,###.0 |                              1,234,567.9 |
|   E    |           지수 문자           |                        0.0E0 |                                    1.2E6 |
|   ;    |    양수와 음수 패턴 구분자    |              +#,### ; -#,### |                 +1,234,568<br>-1,234,568 |
|   %    |   100을 곱한 후 % 문자 삽입   |                         #.#% |                               123456789% |
| \u00A4 |           통화 기호           |                 \u00A4 #,### |                              ₩ 1,234,568 |

```java
DecimalFormat df = new DecimalFormat("#,###.0");
String result = df.format(1234567.89)
```

<br>
<br>

## SimpleDateFormat

| 패턴 문자 |           의미            |
| :-------: | :-----------------------: |
|     y     |            년             |
|     M     |            월             |
|     d     |            일             |
|     D     | 월 구분 없는 일 (1 ~ 365) |
|     E     |           요일            |
|     a     |         오전/오후         |
|     w     |      년의 몇 번째 주      |
|     W     |      월의 몇 번째 주      |
|     H     |        시 (0 ~ 23)        |
|     h     |        시 (1 ~ 12)        |
|     K     |        시 (0 ~ 11)        |
|     k     |        시 (1 ~ 24)        |
|     m     |            분             |
|     s     |            초             |
|     S     |  밀리세컨드 (1/1000 초)   |

```java
SimpleDateFormat sdf = new SimpleDateFormat("yyyy년 MM월 dd일");
String str = sdf.format(new Date());
```

<br>
<br>

## MessageFormat

- 데이터를 파일에 저장하거나, 네트워크로 전송할 때, SQL문을 작성할 때 사용
- 문자열에 데이터가 들어갈 자리를 표시해 두고, 프로그램이 실행하면서 동적으로 데이터를 삽입해 문자열을 완성시키는 방식

```java
public class MessageFormatExample {
  public static void main(String[] args) {
    String id = "Loko";
    String name = "남궁민";
    String tel = "010-1357-2468";

    Strint text = "회원 ID : {0}\n회원 이름 : {1}\n회원 전화 : {2}";
    String result1 = MessageFormat.format(text, id, name, tel);
    System.out.println(result1);
    System.out.println();

    String sql = "insert into member values({0}, {1}, {2})";
    Object[] arguments = {"'Loko'", "'남궁민'", "'010-1357-2468'"};
    String result2 = MessageFormat.format(sql, arguments);
    System.out.println(result2);
  }
}

/*
회원 ID : Loko
회원 이름 : 남궁민
회원 전화 : 010-1357-2468

insert into member values('Loko', '남궁민', '010-1357-2468')
*/
```
