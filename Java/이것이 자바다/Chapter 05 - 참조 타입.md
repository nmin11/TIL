# 데이터 타입 분류

- 프로그램이 하는 일은 결국 데이터를 처리하는 것이므로, 데이터를 얼마나 잘 다루느냐가 관건
- Java의 Data Type
  - primitive type
    - 정수 타입
    - 실수 타입
    - 논리 타입
  - reference type
    - 배열 타입
    - 열거 타입
    - 클래스
    - 인터페이스
- 기본 타입 변수와 참조 타입 변수의 차이점은 **저장되는 값이 무엇이냐**
  - 기본 타입 변수는 **실제 값** 을 저장하지만, 참조 타입 변수는 **메모리의 번지** 를 값으로 저장함
    - **번지를 통해 객체를 참조한다** 는 뜻에서 참조 타입이라고 부름

<br>
<br>

# 메모리 사용 영역

- java.exe로 JVM이 시작되면 JVM은 운영체제에서 할당받은 메모리 영역(Runtime Data Area)을 다음과 같이 세부 영역으로 구분해서 사용함

<br>

![JVM Runtime Data Area](https://github.com/nmin11/TIL/blob/main/Java/%EC%9D%B4%EA%B2%83%EC%9D%B4%20%EC%9E%90%EB%B0%94%EB%8B%A4/img/JVM-runtime-data-area.jpg)

<br>
<br>

## Method 영역

- 코드에서 사용되는 클래스(\*.class)들을 클래스 로더로 읽어 클래스별로 Runtime Constant Pool, Field Data, Method Data, Method Code, Constructor Code 등을 분류해서 저장
- 메소드 영역은 JVM이 시작할 때 생성되며, 모든 Thread가 공유하는 영역

<br>
<br>

## Heap 영역

- 객체와 배열이 생성되는 영역
- 힙 영역에 생성된 객체와 배열은 JVM Stack 영역의 변수나 다른 객체의 필드에서 참조함
- 참조하는 변수나 필드가 없을 경우 Garbage Collector를 실행시켜 쓰레기 객체를 힙 영역에서 자동으로 제거
  - 개발자는 객체를 제거하기 위해 별도의 코드를 작성할 필요가 없음
  - 사실 Java는 코드로 객체를 직접 제거하는 방법을 제공하지 않음

<br>
<br>

## JVM Stack 영역

- 각 Thread마다 하나씩 존재하며 Thread가 시작될 때 할당됨
- Java 프로그램에서 추가적으로 Thread를 생성하지 않았다면 main Thread만 존재하므로 JVM Stack도 하나
- 메소드를 호출할 때마다 Frame을 추가(push)하고 메소드가 종료되면 해당 Frame을 제거(pop)하는 동작 수행
- 예외 발생 시 printStackTrace() 메소드로 보여주는 Stack Trace의 각 라인은 하나의 Frame을 표현
- Frame 내부에 로컬 변수 스택이 있으며, 여기에 기본 타입 변수와 참조 타입 변수가 push되거나 pop됨
  - 변수가 이 로컬 변수 스택에 생성되는 시점은 초기화될 때
  - 변수는 선언된 블록 안에서만 스택에 존재하고, 블록을 벗어나면 스택에서 제거됨
- 기본 타입 변수는 스택 영역에 직접 값을 가지고 있지만, 참조 타입 변수는 값이 아니라 힙 영역이나 메소드 영역의 객체 주소를 가짐
  - 참고로 Java에서는 배열을 객체로 취급

<br>
<br>

# 참조 변수의 ==, != 연산

- 동일한 객체를 참조하는지, 다른 객체를 참조하는지 알아볼 때 사용됨
- 참조 타입 변수의 값은 힙 영역의 객체 주소이므로 결국 주소 값을 비교하는 것이 됨

<br>
<br>

# null과 NullPointerException

- 참조 타입 변수는 힙 영역의 객체를 참조하지 않는다는 뜻으로 null 값을 가질 수 있음
- null 값도 초기값으로 사용할 수 있기 때문에 null로 초기화된 참조 변수는 스택 영역에 생성됨
- 참조 타입 변수를 사용하면서 가장 많이 발생하는 예외 중 하나가 `NullPointerException`
  - 참조 타입 변수를 사용하는 것은 곧 객체를 사용하는 것을 의미하는데, 참조할 객체가 null이면 사용할 수 없게 됨

```java
int[] intArray = null;
intArray[0] = 10;       //NullPointerException

String str = null;
int len = str.length(); //NullPointerException
```

<br>
<br>

# String 타입

- String 타입은 다음과 같이 선언 및 문자열 저장 가능

```java
String name;
name = "로코";
String hobby = "코딩";
```

- 사실 문자열을 String 변수에 저장한다는 말은 틀린 표현
  - 문자열이 직접 변수에 저장되는 것이 아니라, 문자열은 String 객체로 생성되고 변수는 String 객체를 참조
  - 하지만 일반적으로 문자열을 String 변수에 저장한다는 표현을 주로 사용함
- Java는 문자열 리터럴이 동일하다면 String 객체를 공유하도록 되어 있음

```java
String name1 = "로코";
String name2 = "로코";
```

위의 두 변수는 동일한 String 객체를 참조한다.

<br>

- 일반적으로 문자열을 저장할 때 문자열 리터럴을 주로 사용하지만 new 연산자를 사용해서 직접 String 객체를 생성시킬 수도 있음
  - new 연산자는 힙 영역에 새로운 객체를 만들 때 사용하는 연산자로, **객체 생성 연산자** 라고 함

```java
String name1 = new String("로코");
String name2 = new String("로코");
```

위의 두 변수는 서로 다른 String 객체를 참조한다.

- 일반적인 방법을 통해 동일한 문자열 리터럴로 String 객체를 생성한 이후 `==` 비교를 하면 `true`가 나오지만,<br>new 연산자를 통해 동일한 문자열 리터럴로 String 객체를 생성한 이후 `==` 비교를 하면 `false`가 나옴
  - 참조하는 객체가 똑같든 말든 문자열 리터럴만 비교하고 싶을 때는 String 객체의 equals 메소드를 사용해야 함

```java
boolean result = str1.equals(str2);
```

- String 변수도 참조 타입이므로 초기값으로 null을 가질 수 있음

```java
String hobby = "여행";
hobby = null;
```

참조를 잃은 String 객체("여행")는 JVM에서 참조되지 않은 쓰레기 객체로 취급하여 Garbage Collector를 구동하고 메모리에서 자동 제거함
